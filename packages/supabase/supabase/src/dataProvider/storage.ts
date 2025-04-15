import type {
  DataProvider,
  BaseRecord,
  DeleteManyParams,
  CreateManyParams,
  CreateManyResponse,
  CustomParams,
  CustomResponse,
  CreateParams,
  UpdateParams,
  GetOneParams,
  GetOneResponse,
  DeleteOneParams,
  GetManyParams,
  GetListParams,
  GetListResponse,
  CreateResponse,
  UpdateResponse,
  DeleteManyResponse,
  CrudFilter,
  DeleteOneResponse,
  GetManyResponse,
} from "@refinedev/core";
import type { SupabaseClient } from "@supabase/supabase-js";

// Create a type for FileObject since it's no longer exported from supabase-js
type FileObject = {
  name: string;
  id?: string;
  updated_at?: string;
  created_at: string;
  metadata?: {
    size?: number;
    [key: string]: any;
  };
};

export type StorageMeta = {
  bucket?: string;
  options?: {
    cacheControl?: string;
    contentType?: string;
    upsert?: boolean;
  };
  path?: string;
};

export type StorageFile = {
  id?: string;
  name: string | number;
  size: number;
  key: string;
  url: string;
  lastModified: Date;
  metadata: Record<string, any>;
};

// Helper function to parse resource using regex
function parseResource(resource?: string) {
  // Match optional bucket (group 1) and the remaining path (group 2)
  const match = resource?.match(/(?:([^/]+)\/)?(.*)/);
  const bucket = match?.[1] || "public"; // Use index 1 for bucket
  const path = match?.[2] || ""; // Use index 2 for path
  return { bucket, path };
}

export const generateSupabaseStorageProvider = (
  supabaseClient: SupabaseClient<any, any, any>,
): Required<DataProvider> => {
  // const storageUrl = supabaseClient.functions.url.replace("/functions/v1", "/storage/v1"); // Reverted: Property 'url' is protected

  return {
    getList: async <TData extends BaseRecord = BaseRecord>({
      resource,
      pagination,
      filters,
      sorters,
      meta,
    }: GetListParams): Promise<GetListResponse<TData>> => {
      const { bucket, path } = parseResource(resource);
      const options = meta?.options || {};

      const { data: files, error } = await supabaseClient.storage
        .from(bucket)
        .list(path, {
          limit: pagination?.pageSize,
          offset: pagination?.current
            ? (pagination.current - 1) * (pagination?.pageSize || 10)
            : 0,
          sortBy: {
            column: sorters?.[0]?.field || "name",
            order: sorters?.[0]?.order || "asc",
          },
          ...options,
        });

      if (error) {
        throw error;
      }

      // Transform files to a consistent format
      const transformedFiles: StorageFile[] = (files || []).map(
        (file: FileObject) => ({
          name: file.name,
          size: file.metadata?.size || 0,
          key: file.id || file.name,
          url: supabaseClient.storage.from(bucket).getPublicUrl(path).data
            .publicUrl,
          lastModified: new Date(file.updated_at || file.created_at),
          metadata: file.metadata || {},
        }),
      );

      // Apply filters if any - Simplified to only handle top-level ConditionalFilters
      const checkFilter = (file: StorageFile, filter: CrudFilter): boolean => {
        // Only process ConditionalFilters, ignore LogicalFilters for now
        if ("field" in filter) {
          const conditionalFilter = filter; // No cast needed if we only check ConditionalFilter
          const fileValue = file[conditionalFilter.field as keyof StorageFile];

          switch (conditionalFilter.operator) {
            case "contains":
              return (
                typeof fileValue === "string" &&
                typeof conditionalFilter.value === "string" &&
                fileValue
                  .toLowerCase()
                  .includes(conditionalFilter.value.toLowerCase())
              );
            case "eq":
              return fileValue == conditionalFilter.value;
            case "gt":
            case "gte":
            case "lt":
            case "lte":
              const numFileValue =
                typeof fileValue === "number" ? fileValue : Number(fileValue);
              const numFilterValue = Number(conditionalFilter.value);
              if (!isNaN(numFileValue) && !isNaN(numFilterValue)) {
                if (conditionalFilter.operator === "gt")
                  return numFileValue > numFilterValue;
                if (conditionalFilter.operator === "gte")
                  return numFileValue >= numFilterValue;
                if (conditionalFilter.operator === "lt")
                  return numFileValue < numFilterValue;
                if (conditionalFilter.operator === "lte")
                  return numFileValue <= numFilterValue;
              }
              return false;
            // Add other operators as needed
            default:
              console.warn(
                `Unsupported filter operator: ${conditionalFilter.operator}`,
              );
              return true; // Default to not filtering if operator is unknown
          }
        } else {
          // Ignore LogicalFilter (and/or)
          console.warn(
            "Logical filters (and/or) are currently ignored by this storage provider.",
          );
          return true;
        }
      };

      const filteredFiles =
        filters && filters.length > 0
          ? transformedFiles.filter((file) =>
              filters.every((f) => checkFilter(file, f)),
            )
          : transformedFiles;

      return {
        data: filteredFiles as unknown as TData[],
        total: filteredFiles.length,
      };
    },

    create: async <TData extends BaseRecord = BaseRecord, TVariables = {}>({
      resource,
      variables,
      meta,
    }: CreateParams<TVariables>): Promise<CreateResponse<TData>> => {
      const { bucket, path } = parseResource(resource);
      const file = variables as File;
      const options = meta?.options || {};
      const filePath = `${path}/${file.name}`;

      if (meta?.destination) {
        const { data, error } = await supabaseClient.storage
          .from(bucket)
          .copy(filePath, meta?.destination as string);

        if (error) {
          throw error;
        }
        return { data: data as unknown as TData };
      }

      // Add fileName to metadata
      const fileOptions = {
        ...options,
        metadata: {
          ...(options.metadata || {}),
          fileName: file.name,
        },
      };

      const { data, error } = await supabaseClient.storage
        .from(bucket)
        .upload(filePath, file, fileOptions);

      if (error) {
        throw error;
      }

      const fileName = fileOptions.metadata.fileName;

      const fileData: StorageFile = {
        name: fileName,
        size: file.size,
        key: data.path,
        url: supabaseClient.storage.from(bucket).getPublicUrl(data.path).data
          .publicUrl,
        lastModified: new Date(),
        metadata: data,
      };

      return {
        data: fileData as unknown as TData,
      };
    },

    update: async <TData extends BaseRecord = BaseRecord, TVariables = {}>({
      resource,
      id,
      variables,
      meta,
    }: UpdateParams<TVariables>): Promise<UpdateResponse<TData>> => {
      const { bucket, path } = parseResource(resource);
      const file = variables as File;
      const options = meta?.options || {};
      const filePath = `${path}/${id}`;

      if (meta?.destination) {
        const { data, error } = await supabaseClient.storage
          .from(bucket)
          .move(filePath, meta?.destination);

        if (error) {
          throw error;
        }
        return { data: data as unknown as TData };
      }

      // First, delete the existing file
      const { error: deleteError } = await supabaseClient.storage
        .from(bucket)
        .remove([filePath]);

      if (deleteError && deleteError.message !== "The resource was not found") {
        throw deleteError;
      }

      // Add fileName to metadata
      const fileOptions = {
        ...options,
        metadata: {
          ...(options.metadata || {}),
          fileName: file.name,
        },
      };

      // Then upload the new file
      const { data, error } = await supabaseClient.storage
        .from(bucket)
        .upload(filePath, file, fileOptions);

      if (error) {
        throw error;
      }

      const fileName = fileOptions.metadata.fileName;

      const fileData: StorageFile = {
        name: fileName,
        size: file.size,
        key: data.path,
        url: supabaseClient.storage.from(bucket).getPublicUrl(data.path).data
          .publicUrl,
        lastModified: new Date(),
        metadata: data,
      };

      return {
        data: fileData as unknown as TData,
      };
    },

    getOne: async <TData extends BaseRecord = BaseRecord>({
      resource,
      id,
      meta,
    }: GetOneParams): Promise<GetOneResponse<TData>> => {
      const { bucket, path } = parseResource(resource);
      const mode = meta?.mode || "public";
      const filePath = `${path}/${id}`;

      if (mode == "signed-url") {
        const { expiresIn = 60 } = meta as { expiresIn?: number };
        const { data, error } = await supabaseClient.storage
          .from(bucket)
          .createSignedUrl(filePath, expiresIn);

        if (error) {
          throw error;
        }
        return { data: data.signedUrl as unknown as TData };
      }

      if (mode == "download") {
        const { data, error } = await supabaseClient.storage
          .from(bucket)
          .download(filePath);

        if (error) {
          throw error;
        }
        return { data: data as unknown as TData };
      }

      // Default to public URL
      const { data: urlData } = supabaseClient.storage
        .from(bucket)
        .getPublicUrl(filePath);

      const { data: listData, error: listError } = await supabaseClient.storage
        .from(bucket)
        .list(path, { search: String(id), limit: 1 });

      if (listError) {
        throw listError;
      }
      const fileObject = listData?.[0];
      if (!fileObject) {
        throw new Error(`File not found at path: ${filePath}`);
      }

      const fileData: StorageFile = {
        id: filePath,
        name: fileObject.name,
        size: fileObject.metadata?.size || 0,
        key: fileObject.id || fileObject.name,
        url: urlData.publicUrl,
        lastModified: new Date(fileObject.updated_at || fileObject.created_at),
        metadata: fileObject.metadata || {},
      };

      return { data: fileData as unknown as TData };
    },

    deleteOne: async <TData extends BaseRecord = BaseRecord, TVariables = {}>({
      resource,
      id,
      meta: _meta,
    }: DeleteOneParams<TVariables>): Promise<DeleteOneResponse<TData>> => {
      const { bucket, path } = parseResource(resource);
      const filePath = `${path}/${id}`;

      const { data: _data, error } = await supabaseClient.storage
        .from(bucket)
        .remove([filePath]);

      if (error) {
        throw error;
      }

      return { data: { id } as unknown as TData };
    },

    getMany: async <TData extends BaseRecord = BaseRecord>({
      resource,
      ids,
      meta: _meta,
    }: GetManyParams): Promise<GetManyResponse<TData>> => {
      const { bucket, path } = parseResource(resource);
      const filesData: StorageFile[] = [];

      for (const id of ids) {
        const filePath = `${path}/${id}`;

        const { data: listData, error: listError } =
          await supabaseClient.storage
            .from(bucket)
            .list(path, { search: String(id), limit: 1 });

        if (listError) {
          console.error(`Error fetching file ${id}:`, listError);
          continue;
        }

        const fileObject = listData?.[0];

        if (fileObject) {
          const { data: urlData } = supabaseClient.storage
            .from(bucket)
            .getPublicUrl(filePath);

          filesData.push({
            name: fileObject.name,
            size: fileObject.metadata?.size || 0,
            key: fileObject.id || fileObject.name,
            url: urlData.publicUrl,
            lastModified: new Date(
              fileObject.updated_at || fileObject.created_at,
            ),
            metadata: fileObject.metadata || {},
          });
        }
      }

      return {
        data: filesData as unknown as TData[],
      };
    },

    createMany: async <TData extends BaseRecord = BaseRecord, TVariables = {}>({
      resource,
      variables,
      meta,
    }: CreateManyParams<TVariables>): Promise<CreateManyResponse<TData>> => {
      const { bucket, path } = parseResource(resource);
      const files = variables as File[];
      const options = meta?.options || {};
      const createdFiles: StorageFile[] = [];
      const errors: Error[] = [];

      for (const file of files) {
        try {
          const filePath = `${path}/${file.name}`;
          const fileOptions = {
            ...options,
            metadata: {
              ...(options.metadata || {}),
              fileName: file.name,
            },
          };

          const { data, error } = await supabaseClient.storage
            .from(bucket)
            .upload(filePath, file, fileOptions);

          if (error) {
            throw error;
          }

          const fileData: StorageFile = {
            name: file.name,
            size: file.size,
            key: data.path,
            url: supabaseClient.storage.from(bucket).getPublicUrl(data.path)
              .data.publicUrl,
            lastModified: new Date(),
            metadata: data,
          };
          createdFiles.push(fileData);
        } catch (error) {
          errors.push(error as Error);
          console.error(`Failed to upload file ${file.name}:`, error);
        }
      }

      if (errors.length > 0 && createdFiles.length === 0) {
        throw errors[0];
      }

      return {
        data: createdFiles as unknown as TData[],
      };
    },

    updateMany: async () => {
      throw new Error("UpdateMany is not implemented for storage provider");
    },

    deleteMany: async <TData extends BaseRecord = BaseRecord, TVariables = {}>({
      resource,
      ids,
      meta: _meta,
    }: DeleteManyParams<TVariables>): Promise<DeleteManyResponse<TData>> => {
      const { bucket, path } = parseResource(resource);
      const filePaths = ids.map((id) => `${path}/${id}`);

      const { data: _data, error } = await supabaseClient.storage
        .from(bucket)
        .remove(filePaths);

      if (error) {
        throw error;
      }

      return { data: ids.map((id) => ({ id })) as unknown as TData[] };
    },

    custom: async <
      TData extends BaseRecord = BaseRecord,
      TQuery = unknown,
      TPayload = unknown,
    >(
      _params: CustomParams<TQuery, TPayload>,
    ): Promise<CustomResponse<TData>> => {
      const {
        url: _url,
        method: _method,
        filters: _filters,
        sorters: _sorters,
        payload: _payload,
        query: _query,
        headers: _headers,
        meta: _meta,
      } = _params;
      console.warn(
        "Custom method not implemented for Supabase Storage provider.",
      );
      return Promise.reject(new Error("Custom method not implemented"));
    },

    getApiUrl: () => {
      return "/storage/v1";
    },
  };
};
