import {
  DataProvider,
  BaseRecord,
  GetListResponse,
  GetOneResponse,
  CreateResponse,
  UpdateResponse,
  DeleteOneResponse,
  GetListParams,
  GetOneParams,
  CreateParams,
  UpdateParams,
  DeleteOneParams,
  ValidationErrors,
  CrudFilter,
  GetManyParams,
} from "@refinedev/core";
import type {
  SupabaseClient,
  UserIdentity,
  User,
  Provider,
} from "@supabase/supabase-js";
import type { HttpError } from "@refinedev/core";

// --- Custom Error Class Implementing HttpError ---
class DataProviderError extends Error implements HttpError {
  statusCode: number;
  errors?: ValidationErrors | undefined; // Conforms to interface
  cause?: unknown; // Property to store the original error

  constructor(message: string, statusCode: number, cause?: unknown) {
    super(message);
    this.name = "DataProviderError";
    this.statusCode = statusCode;
    this.cause = cause; // Store original error

    // Initialize errors, potentially formatting a general message
    this.errors =
      cause instanceof Error ? { general: cause.message } : undefined;

    Object.setPrototypeOf(this, DataProviderError.prototype);
  }
}

function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function makeRedirectUri(baseUrl: string, path: string): string {
  return `${baseUrl}${path}`;
}

async function tryToSignIn(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const popup = window.open(url, "_blank", "width=600,height=600");
    const timer = setInterval(() => {
      if (!popup || popup.closed) {
        clearInterval(timer);
        resolve(true);
      }
    }, 500);
    if (!popup) {
      clearInterval(timer);
      console.error("Popup blocked. Cannot complete sign-in flow.");
      resolve(false);
    }
  });
}

export interface IdentityProviderConfig {
  baseUrl?: string;
  authCallbackPath?: string;
}

/**
 * Represents a single linked identity record.
 * We'll store the provider as an `id` for convenience.
 */
export interface IdentityRecord extends BaseRecord {
  id: string;
  provider: string;
  email?: string | null;
  email_verified?: boolean | null;
  phone_verified?: boolean | null;
  sub?: string | null;
  avatar_url?: string | null;
  full_name?: string | null;
  name?: string | null;
  picture?: string | null;
  provider_id?: string | null;
  iss?: string | null;
  hd?: string | null;
  [key: string]: unknown;
}

/**
 * Variables used when linking an identity.
 */
export interface LinkIdentityVariables {
  provider: string;
}

/**
 * Variables used when updating a user.
 */
export interface UpdateUserVariables {
  email?: string;
  password?: string;
  phone?: string;
  data?: { [key: string]: any };
  [key: string]: unknown;
}

/**
 * Factory function that creates a Refine DataProvider.
 * Accepts a Supabase client, returning a data provider that handles
 * `identities` and `user` resources.
 */
export function supabaseIdentityDataProvider(
  client: SupabaseClient,
  config?: IdentityProviderConfig,
): DataProvider {
  // Get baseUrl from config or use window.location.origin as fallback
  const baseUrl =
    config?.baseUrl ||
    (typeof window !== "undefined" ? window.location.origin : "");
  const authCallbackPath = config?.authCallbackPath || "/auth/callback";

  async function getCurrentUserIdentities(): Promise<UserIdentity[]> {
    const {
      data: { user },
      error,
    } = await client.auth.getUser();
    if (error) {
      // Pass Supabase error as the 'cause' argument
      throw new DataProviderError(error.message, error.status || 400, error);
    }
    return user?.identities ?? [];
  }

  function findIdentity(
    identities: UserIdentity[],
    identity_id: string,
  ): UserIdentity | undefined {
    return identities.find((identity) => identity.identity_id === identity_id);
  }

  function transformIdentity(identity: UserIdentity): IdentityRecord {
    const identityData = identity.identity_data || {};
    return {
      id: identity.identity_id,
      provider: identity.provider,
      provider_display_name: capitalizeFirstLetter(identity.provider),
      email: identityData.email ?? null,
      email_verified: identityData.email_verified ?? null,
      phone_verified: identityData.phone_verified ?? null,
      sub: identityData.sub ?? null,
      avatar_url: identityData.avatar_url ?? identityData.picture ?? null,
      full_name: identityData.full_name ?? identityData.name ?? null,
      name: identityData.name ?? identityData.full_name ?? null,
      picture: identityData.picture ?? identityData.avatar_url ?? null,
      provider_id: identityData.provider_id ?? identityData.sub ?? null,
      iss: identityData.iss ?? null,
      hd: identityData.hd ?? null,
      ...identityData,
    };
  }

  return {
    async getList<TData extends BaseRecord = IdentityRecord>(
      params: GetListParams,
    ): Promise<GetListResponse<TData>> {
      const { resource, pagination, sorters, filters } = params;
      if (resource !== "identities") {
        throw new Error(`getList not implemented for resource: ${resource}`);
      }

      // 1. Fetch all identities
      const identities = await getCurrentUserIdentities();
      let identityRecords = identities.map(transformIdentity);

      // 2. Apply filters if provided
      if (filters && filters.length > 0) {
        identityRecords = identityRecords.filter((record) => {
          // Apply every filter
          return filters.every((filter: CrudFilter) => {
            // Access filter properties with proper typecasting
            // CrudFilter can have different shapes, we'll support LogicalFilter and ConditionalFilter
            if ("field" in filter) {
              // It's a ConditionalFilter
              const field = filter.field as string;
              const operator = filter.operator as string;
              const value = filter.value;

              // Skip fields that don't exist on the record
              if (!(field in record)) return true;

              // Get the field value with proper typing
              const fieldValue = record[field] as unknown;

              // Helper function to safely compare values with proper type checks
              const compareValues = (
                op: string,
                fieldVal: unknown,
                compareVal: unknown,
              ): boolean => {
                // For null/undefined values
                if (fieldVal == null) return false;

                switch (op) {
                  case "eq":
                    return fieldVal === compareVal;
                  case "ne":
                    return fieldVal !== compareVal;
                  case "contains":
                    return (
                      typeof fieldVal === "string" &&
                      typeof compareVal === "string" &&
                      fieldVal.toLowerCase().includes(compareVal.toLowerCase())
                    );
                  case "in":
                    return (
                      Array.isArray(compareVal) && compareVal.includes(fieldVal)
                    );
                  case "nin":
                    return (
                      Array.isArray(compareVal) &&
                      !compareVal.includes(fieldVal)
                    );
                  case "gt":
                    return (
                      typeof fieldVal === "number" &&
                      typeof compareVal === "number" &&
                      fieldVal > compareVal
                    );
                  case "gte":
                    return (
                      typeof fieldVal === "number" &&
                      typeof compareVal === "number" &&
                      fieldVal >= compareVal
                    );
                  case "lt":
                    return (
                      typeof fieldVal === "number" &&
                      typeof compareVal === "number" &&
                      fieldVal < compareVal
                    );
                  case "lte":
                    return (
                      typeof fieldVal === "number" &&
                      typeof compareVal === "number" &&
                      fieldVal <= compareVal
                    );
                  default:
                    return true;
                }
              };

              return compareValues(operator, fieldValue, value);
            } else if ("value" in filter) {
              // It's a LogicalFilter or another type we don't fully support yet
              // For simplicity, we'll return true for these filters
              return true;
            }

            // Default to true for unrecognized filter formats
            return true;
          });
        });
      }

      // 3. Apply sorters if provided
      if (sorters && sorters.length > 0) {
        identityRecords = identityRecords.sort((a, b) => {
          for (const sorter of sorters) {
            const { field, order } = sorter;

            // Skip fields that don't exist
            if (!(field in a) || !(field in b)) continue;

            const aValue = a[field];
            const bValue = b[field];

            // Handle null/undefined values
            if (aValue == null && bValue == null) continue;
            if (aValue == null) return order === "asc" ? -1 : 1;
            if (bValue == null) return order === "asc" ? 1 : -1;

            // Compare values based on type
            if (typeof aValue === "string" && typeof bValue === "string") {
              const comparison = aValue.localeCompare(bValue);
              if (comparison !== 0)
                return order === "asc" ? comparison : -comparison;
            } else {
              if (aValue < bValue) return order === "asc" ? -1 : 1;
              if (aValue > bValue) return order === "asc" ? 1 : -1;
            }
          }
          return 0; // Equal based on all sorters
        });
      }

      // 4. Apply pagination
      const total = identityRecords.length;
      let paginatedData = identityRecords;

      if (pagination) {
        const { current = 1, pageSize = 10 } = pagination;
        const startIndex = (current - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        paginatedData = identityRecords.slice(startIndex, endIndex);
      }

      // 5. Cast to expected return type and return
      return {
        data: paginatedData as unknown as TData[],
        total,
      };
    },

    async getOne<TData extends BaseRecord = IdentityRecord>(
      params: GetOneParams,
    ): Promise<GetOneResponse<TData>> {
      const { resource, id } = params;
      if (resource !== "identities") {
        throw new Error(`getOne not implemented for resource: ${resource}`);
      }
      if (!id) {
        // No specific cause here
        throw new DataProviderError("Missing id to retrieve identity", 400);
      }

      const identities = await getCurrentUserIdentities();
      const found = findIdentity(identities, String(id));
      if (!found) {
        // No specific cause here
        throw new DataProviderError(`No identity found for id: ${id}`, 404);
      }

      const data = transformIdentity(found) as unknown as TData;

      return { data };
    },

    async create<
      TData extends BaseRecord = IdentityRecord,
      TVariables = LinkIdentityVariables,
    >(params: CreateParams<TVariables>): Promise<CreateResponse<TData>> {
      const { resource, variables } = params;

      if (resource !== "identities") {
        throw new Error(`create not implemented for resource: ${resource}`);
      }

      // Extract provider from variables
      const typedVariables = variables as LinkIdentityVariables;
      const provider = typedVariables.provider;

      if (!provider) {
        throw new Error("Provider is required for linking identity");
      }

      // We'll try to authorize with the provider
      try {
        const { data, error } = await client.auth.signInWithOAuth({
          provider: provider as Provider,
          options: {
            redirectTo: makeRedirectUri(baseUrl, authCallbackPath),
            skipBrowserRedirect: true,
          },
        });

        if (error) {
          throw error;
        }

        if (!data?.url) {
          throw new Error("No authorization URL returned");
        }

        // We'll manually handle the redirect
        const signedIn = await tryToSignIn(data.url);

        // Return a placeholder identity since we don't know the result yet
        // After auth completes, the user should refresh the page
        return {
          data: {
            id: `linked_${provider}_${Date.now()}`,
            provider,
            provider_display_name: capitalizeFirstLetter(provider),
          } as unknown as TData,
        };
      } catch (error) {
        // Handle errors and transform to appropriate format
        if (error instanceof Error) {
          throw new DataProviderError(
            `Error linking identity: ${error.message}`,
            400,
            error,
          );
        }
        throw error;
      }
    },

    async update<
      TData extends BaseRecord = { user: User },
      TVariables = UpdateUserVariables,
    >(params: UpdateParams<TVariables>): Promise<UpdateResponse<TData>> {
      const { resource, id, variables } = params;

      if (resource !== "user") {
        throw new Error(
          `update is only implemented for resource: "user", got: ${resource}`,
        );
      }

      if (!variables) {
        // No specific cause here
        throw new DataProviderError(
          "No variables provided to update user.",
          400,
        );
      }

      try {
        const userVars = variables as unknown as UpdateUserVariables;
        const { data, error } = await client.auth.updateUser(userVars);

        if (error) {
          // Pass Supabase error as the 'cause' argument
          throw new DataProviderError(
            error.message,
            error.status || 400,
            error,
          );
        }

        return { data: data as unknown as TData };
      } catch (err: any) {
        if (err instanceof DataProviderError) throw err;
        // Pass caught error as the 'cause' argument
        throw new DataProviderError(
          err?.message || "Update user failed",
          500,
          err,
        );
      }
    },

    async deleteOne<TData extends BaseRecord = IdentityRecord, TVariables = {}>(
      params: DeleteOneParams<TVariables>,
    ): Promise<DeleteOneResponse<TData>> {
      const { resource, id } = params;
      if (resource !== "identities") {
        throw new Error(`deleteOne not implemented for resource: ${resource}`);
      }
      if (!id) {
        // No specific cause here
        throw new DataProviderError("Missing id to delete identity.", 400);
      }

      const identityId = String(id);
      const identities = await getCurrentUserIdentities();
      const found = findIdentity(identities, identityId);

      if (!found) {
        // No specific cause here
        throw new DataProviderError(
          `No identity found for id: ${identityId}`,
          404,
        );
      }

      const { data: unlinkData, error } =
        await client.auth.unlinkIdentity(found);

      if (error) {
        // Pass Supabase error as the 'cause' argument
        throw new DataProviderError(error.message, error.status || 400, error);
      }

      const deletedData = transformIdentity(found) as unknown as TData;

      return { data: deletedData };
    },

    getApiUrl(): string {
      const url = (client as any).supabaseUrl || "";
      return url;
    },

    async getMany<TData extends BaseRecord = IdentityRecord>(
      params: GetManyParams,
    ): Promise<{ data: TData[] }> {
      const { resource, ids } = params;
      if (resource !== "identities" || !ids || !Array.isArray(ids)) {
        throw new Error("getMany: Invalid parameters");
      }

      const identities = await getCurrentUserIdentities();
      const filteredIdentities = identities
        .filter((identity) => ids.includes(identity.identity_id))
        .map(transformIdentity);

      return {
        data: filteredIdentities as unknown as TData[],
      };
    },

    async createMany() {
      throw new Error("createMany not implemented");
    },

    async deleteMany() {
      throw new Error("deleteMany not implemented");
    },

    async updateMany() {
      throw new Error("updateMany not implemented");
    },

    async custom() {
      throw new Error("custom not implemented");
    },
  };
}
