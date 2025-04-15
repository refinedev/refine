import type { AuthProvider } from "@refinedev/core";
import type {
  SupabaseClient,
  User as _User,
  AuthTokenResponse as _AuthTokenResponse,
  UserIdentity as _UserIdentity,
  User,
} from "@supabase/supabase-js";
import {
  AuthError,
  type AuthResponse,
  type OAuthResponse,
  type SignInWithPasswordCredentials,
  type SignUpWithPasswordCredentials,
  type Provider,
} from "@supabase/supabase-js";

// Type definitions for provider options
export interface AuthProviderOptions {
  [key: string]: {
    scopes?: string;
    redirectTo?: string;
    queryParams?: Record<string, string>;
    skipBrowserRedirect?: boolean;
  };
}

// Type definitions for authentication methods parameters
export type LoginParams = {
  providerName?: string;
  email?: string;
  password?: string;
} & Partial<SignInWithPasswordCredentials>;

export type RegisterParams = {
  providerName?: string;
  email?: string;
  password?: string;
  invitation_token?: string;
} & Partial<SignUpWithPasswordCredentials>;

export interface ForgotPasswordParams {
  email: string;
}

export interface UpdatePasswordParams {
  password: string;
  token?: string;
  token_hash?: string;
}
export type AuthIdentity =
  | (User & {
      name: string;
      avatar?: string;
    })
  | null;

export interface AcceptInvitationParams {
  invitation_token: string;
  password: string;
  tenant_id: string;
}

export interface SendInvitationParams {
  email: string;
  tenant_id: string;
  role?: string;
}

// Configuration for auth provider
export interface AuthProviderConfig {
  baseUrl?: string;
  authCallbackPath?: string;
}

// Generate default provider options based on config
const getDefaultProviderOptions = (
  config?: AuthProviderConfig,
): AuthProviderOptions => {
  const baseUrl =
    config?.baseUrl ||
    (typeof window !== "undefined" ? window.location.origin : "");

  return {
    azure: {
      scopes: "User.Read.All",
      redirectTo: `${baseUrl}/azure-auth-callback`,
    },
    google: {
      scopes: "email profile",
      redirectTo: `${baseUrl}/google-auth-callback`,
    },
    github: {
      scopes: "user:email",
      redirectTo: `${baseUrl}/github-auth-callback`,
    },
  };
};

// Error handler utility
const handleAuthError = (
  error: AuthError | null,
): { success: false; error: AuthError } => ({
  success: false,
  error: error || new AuthError("An unknown error occurred", 500),
});

export type SupabaseAuthProvider = AuthProvider & {
  getIdentity: () => Promise<AuthIdentity>;
};

export const createAuthProvider = (
  supabaseClient: SupabaseClient,
  authProviderOptions: AuthProviderOptions = {},
  config?: AuthProviderConfig,
): SupabaseAuthProvider => {
  // Merge default options with provided options
  const defaultOptions = getDefaultProviderOptions(config);
  const mergedProviderOptions = { ...defaultOptions, ...authProviderOptions };
  const baseUrl =
    config?.baseUrl ||
    (typeof window !== "undefined" ? window.location.origin : "");
  const authCallback = config?.authCallbackPath || "/auth/callback";

  return {
    login: async ({ email, password, providerName }: LoginParams) => {
      try {
        let authResponse: AuthResponse | OAuthResponse;

        if (providerName) {
          const provider = providerName as Provider;
          authResponse = await supabaseClient.auth.signInWithOAuth({
            provider,
            options: {
              ...mergedProviderOptions[provider],
            },
          });
        } else {
          if (!email || !password) {
            throw new Error(
              "Email and password are required for password login",
            );
          }

          authResponse = await supabaseClient.auth.signInWithPassword({
            email,
            password,
          });
        }

        const { data, error } = authResponse;

        if (error) {
          return handleAuthError(error);
        }

        if ("user" in data && data.user) {
          return {
            success: true,
            redirectTo: "/",
          };
        } else if ("url" in data && data.url) {
          return {
            success: true,
            redirectTo: "/",
          };
        }

        throw new Error("Login failed: No user data or OAuth URL returned");
      } catch (error: any) {
        return handleAuthError(error);
      }
    },

    register: async ({
      email,
      password,
      providerName,
      invitation_token,
      ...rest
    }: RegisterParams) => {
      try {
        if (providerName) {
          const { data, error } = await supabaseClient.auth.signInWithOAuth({
            provider: providerName as Provider,
            options: {
              ...mergedProviderOptions[providerName as Provider],
            },
          });

          if (error) {
            return handleAuthError(error);
          }

          if (data?.url) {
            return {
              success: true,
              redirectTo: "/",
            };
          }
        } else {
          if (!email || !password) {
            throw new Error("Email and password are required for registration");
          }

          const { data: _userData, error } = await supabaseClient.auth.signUp({
            email,
            password,
            options: {
              data: {
                ...rest,
                invitation_token,
              },
              emailRedirectTo: `${baseUrl}${authCallback}`,
            },
          });

          if (error) {
            return handleAuthError(error);
          }

          if (_userData?.user?.user_metadata?.email_verified === false) {
            return {
              success: true,
              redirectTo: "/verify-email",
              accountVerified: false,
              error: {
                name: "Unverified email",
                message: "Please verify your email to complete registration.",
              },
            };
          }

          await supabaseClient.auth.signInWithPassword({ email, password });

          return {
            success: true,
            accountVerified: true,
            redirectTo: invitation_token ? "/tenants" : "/",
            message: "Account verified successfully.",
          };
        }
      } catch (error: any) {
        return handleAuthError(error);
      }

      return handleAuthError(null);
    },

    forgotPassword: async ({ email }: ForgotPasswordParams) => {
      try {
        const { error } = await supabaseClient.auth.resetPasswordForEmail(
          email,
          {
            redirectTo: `${baseUrl}/update-password`,
          },
        );

        if (error) {
          return handleAuthError(error);
        }

        return {
          success: true,
        };
      } catch (error: any) {
        return handleAuthError(error);
      }
    },

    updatePassword: async ({
      password,
      token,
      token_hash,
    }: UpdatePasswordParams) => {
      try {
        if (token_hash) {
          // Verify using token_hash (recovery flow)
          const { error: verifyError } = await supabaseClient.auth.verifyOtp({
            type: "recovery",
            token_hash,
          });

          if (verifyError) {
            return {
              success: false,
              error: {
                message:
                  verifyError.message ||
                  "Update password failed: Invalid recovery token",
                name: verifyError.name || "InvalidTokenHash",
              },
              // Let UI decide redirect based on error.
            };
          }
          // Token hash verified successfully
        } else if (token) {
          // Verify using manual token (email OTP flow)
          const {
            data: { user },
            error: userError,
          } = await supabaseClient.auth.getUser();
          if (userError || !user || !user.email) {
            return {
              success: false,
              error: {
                message:
                  userError?.message ||
                  "Could not retrieve user email for OTP verification.",
                name: "UserEmailError",
              },
            };
          }
          const email = user.email;

          const { error: verifyError } = await supabaseClient.auth.verifyOtp({
            type: "email",
            token,
            email,
          });

          if (verifyError) {
            return {
              success: false,
              error: {
                message:
                  verifyError.message || "Update password failed: Invalid OTP",
                name: verifyError.name || "InvalidToken",
              },
            };
          }
          // Manual token verified successfully
        }
        // If neither token nor token_hash is provided, proceed if the user is authenticated.
        // The `check` method should handle unauthenticated attempts.

        // Update the password
        const { data, error } = await supabaseClient.auth.updateUser({
          password,
        });

        if (error) {
          return {
            success: false,
            error,
          };
        }

        if (data) {
          return {
            success: true,
            redirectTo: "/tenants", // Or wherever appropriate
          };
        }

        // Should not happen if updateUser doesn't throw and returns no data/error
        return handleAuthError(null);
      } catch (error: any) {
        return handleAuthError(error);
      }
    },

    logout: async () => {
      try {
        const { error } = await supabaseClient.auth.signOut();

        if (error) {
          return handleAuthError(error);
        }

        return {
          success: true,
          redirectTo: "/login",
        };
      } catch (error: any) {
        return handleAuthError(error);
      }
    },

    onError: async (error: any) => {
      console.error("Auth Error:", error);
      return { error };
    },

    check: async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabaseClient.auth.getSession();

        if (error) {
          throw error;
        }

        if (!session) {
          return {
            authenticated: false,
            error: {
              message: "No active session found",
              name: "SessionNotFound",
            },
            logout: true,
            redirectTo: "/login",
          };
        }

        // Check if session is expired
        if (
          session.expires_at &&
          new Date(session.expires_at * 1000) < new Date()
        ) {
          await supabaseClient.auth.signOut();
          return {
            authenticated: false,
            error: {
              message: "Session expired",
              name: "SessionExpired",
            },
            logout: true,
            redirectTo: "/login",
          };
        }

        return {
          authenticated: true,
        };
      } catch (error: any) {
        return {
          authenticated: false,
          error: error || {
            message: "Authentication check failed",
            name: "CheckError",
          },
          logout: true,
          redirectTo: "/login",
        };
      }
    },

    getPermissions: async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabaseClient.auth.getUser();

        if (error) {
          throw error;
        }

        return user || null;
      } catch (error) {
        console.error("Error getting permissions:", error);
        return null;
      }
    },

    getIdentity: async (): Promise<AuthIdentity> => {
      try {
        const {
          data: { session },
          error,
        } = await supabaseClient.auth.getSession();

        if (error || !session) {
          throw error || new Error("No user found");
        }

        return {
          ...session.user,
          name: session.user.user_metadata?.full_name || session.user.email,
          avatar: session.user.user_metadata?.avatar_url,
        };
      } catch (error) {
        console.error("Error getting identity:", error);
        return null;
      }
    },
  };
};

export default createAuthProvider;
