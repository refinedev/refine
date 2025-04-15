import type { DataProvider } from "@refinedev/core";
import type { SupabaseClient } from "@supabase/supabase-js";

// Define MIME types for blob download handling
const DOWNLOADABLE_MIME_TYPES = new Set([
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
]);

export function handleError(error: any) {
  return {
    error: error.message,
    status: error.status,
    statusText: error.statusText,
  };
}

export type EdgeFunctionMeta = {
  functionName?: string;
  options?: {
    headers?: Record<string, string>;
    responseType?: "json" | "text" | "blob" | "arraybuffer";
    body?: any;
  };
};

export type EdgeFunctionResponse<T = any> = {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
};

export const generateSupabaseEdgeFunctionProvider = (
  supabaseClient: SupabaseClient<any, any, any>,
): Required<DataProvider> => {
  const invokeFunction = async <T = any>(
    functionName: string,
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    body?: any,
    options?: EdgeFunctionMeta["options"],
  ): Promise<EdgeFunctionResponse<T>> => {
    const { data, error } = await supabaseClient.functions.invoke(
      functionName,
      {
        method,
        headers: options?.headers,
        body,
      },
    );

    if (error) {
      throw error;
    }

    return data as EdgeFunctionResponse<T>;
  };

  return {
    getList: async ({ resource, pagination, filters, sorters, meta }) => {
      const functionName = meta?.functionName || resource;
      const { current = 1, pageSize = 10 } = pagination ?? {};

      const response = await invokeFunction(
        functionName,
        "GET",
        {
          pagination: {
            page: current,
            pageSize,
          },
          filters,
          sorters,
          ...meta?.options?.body,
        },
        meta?.options,
      );

      return {
        data: response.data.items || [],
        total: response.data.total || 0,
      };
    },

    getMany: async ({ resource, ids, meta }) => {
      const functionName = meta?.functionName || resource;

      const response = await invokeFunction(
        functionName,
        "GET",
        {
          ids,
          ...meta?.options?.body,
        },
        meta?.options,
      );

      return {
        data: response.data || [],
      };
    },

    create: async ({ resource, variables, meta }) => {
      const functionName = meta?.functionName || resource;

      const response = await invokeFunction(
        functionName,
        "POST",
        {
          ...variables,
          ...meta?.options?.body,
        },
        meta?.options,
      );

      return {
        data: response.data,
      };
    },

    createMany: async ({ resource, variables, meta }) => {
      const functionName = meta?.functionName || resource;

      const response = await invokeFunction(
        functionName,
        "POST",
        {
          items: variables,
          ...meta?.options?.body,
        },
        meta?.options,
      );

      return {
        data: response.data,
      };
    },

    update: async ({ resource, id, variables, meta }) => {
      const functionName = meta?.functionName || resource;

      const response = await invokeFunction(
        functionName,
        "PATCH",
        {
          id,
          ...variables,
          ...meta?.options?.body,
        },
        meta?.options,
      );

      return {
        data: response.data,
      };
    },

    updateMany: async ({ resource, ids, variables, meta }) => {
      const functionName = meta?.functionName || resource;

      const response = await invokeFunction(
        functionName,
        "PATCH",
        {
          ids,
          ...variables,
          ...meta?.options?.body,
        },
        meta?.options,
      );

      return {
        data: response.data,
      };
    },

    getOne: async ({ resource, id, meta }) => {
      const functionName = meta?.functionName || resource;
      const requestOptions = meta?.options;
      const requestHeaders = { ...requestOptions?.headers };
      // Case-insensitive check for Accept header
      const acceptHeader =
        requestHeaders?.["Accept"] || requestHeaders?.["accept"];
      const normalizedAcceptHeader = acceptHeader?.toLowerCase().trim();

      if (
        normalizedAcceptHeader &&
        DOWNLOADABLE_MIME_TYPES.has(normalizedAcceptHeader)
      ) {
        // Handle blob download request
        const body = { id, ...requestOptions?.body }; // Pass ID and any other body params
        try {
          const { data: fileData, error } =
            await supabaseClient.functions.invoke(functionName, {
              method: "GET", // getOne implies GET
              headers: {
                ...requestHeaders,
                Accept: "application/octet-stream", // Request raw bytes from the function
              },
              body,
            });

          if (error) {
            throw error;
          }

          const blob = new Blob([fileData], { type: acceptHeader }); // Use original Accept header for Blob type
          const fileUrl = window.URL.createObjectURL(blob);
          window?.open(fileUrl, "_blank")?.focus();

          return {
            data: { downloadStarted: true, url: fileUrl } as any, // Return custom response indicating download
          };
        } catch (error) {
          console.error("Error during file download:", error);
          // Rethrow or handle error appropriately, perhaps return an error structure
          throw error;
        }
      } else {
        // Default behavior: Fetch structured data using helper
        const response = await invokeFunction(
          functionName,
          "GET",
          {
            id,
            ...requestOptions?.body,
          },
          requestOptions,
        );

        return {
          data: response.data,
        };
      }
    },

    deleteOne: async ({ resource, id, meta }) => {
      const functionName = meta?.functionName || resource;

      const response = await invokeFunction(
        functionName,
        "DELETE",
        {
          id,
          ...meta?.options?.body,
        },
        meta?.options,
      );

      return {
        data: response.data,
      };
    },

    deleteMany: async ({ resource, ids, meta }) => {
      const functionName = meta?.functionName || resource;

      const response = await invokeFunction(
        functionName,
        "DELETE",
        {
          ids,
          ...meta?.options?.body,
        },
        meta?.options,
      );

      return {
        data: response.data,
      };
    },

    custom: async ({
      url,
      method,
      filters,
      sorters,
      payload,
      query,
      headers,
      meta,
    }) => {
      // Reverted to original implementation - Download logic moved to getOne
      const functionName = url;
      const requestMethod = method as
        | "GET"
        | "POST"
        | "PUT"
        | "PATCH"
        | "DELETE";
      const requestHeaders = {
        ...headers,
        ...meta?.options?.headers,
      };
      const requestBody = {
        ...payload,
        filters,
        sorters,
        query,
        ...meta?.options?.body,
      };

      const response = await invokeFunction(
        functionName,
        requestMethod,
        requestBody,
        {
          ...meta?.options,
          headers: requestHeaders,
        },
      );

      return {
        data: response.data,
      };
    },

    getApiUrl: () => {
      return `/functions/v1`;
    },
  };
};
