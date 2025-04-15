import type {
  DataProvider,
  BaseRecord,
  GetOneParams,
  GetOneResponse,
} from "@refinedev/core";
import type { SupabaseClient } from "@supabase/supabase-js";
import { generateFilter, handleError } from "@refinedev/supabase";

export type RPCMeta = {
  schema?: string;
  select?: string;
  args?: Record<string, any>;
  options?: {
    get?: boolean;
    count?: "exact" | "planned" | "estimated";
    head?: boolean;
  };
};

export const generateSupabaseRPCDataProvider = (
  supabaseClient: SupabaseClient<any, any, any>,
): Required<DataProvider> => {
  return {
    getList: async ({ resource, pagination, filters, sorters, meta }) => {
      const { current = 1, pageSize = 10, mode = "server" } = pagination ?? {};

      const client = meta?.schema
        ? supabaseClient.schema(meta.schema)
        : supabaseClient;

      let query = client.rpc(
        resource,
        {
          ...(meta?.args || {}),
          page: current,
          page_size: pageSize,
        },
        {
          count: meta?.options?.count ?? "exact",
          ...(meta?.options || {}),
        },
      );

      if (mode === "server") {
        query = query.range((current - 1) * pageSize, current * pageSize - 1);
      }

      // Apply sorting
      sorters?.forEach((item) => {
        query = query.order(item.field, {
          ascending: item.order === "asc",
        });
      });

      // Apply filters
      filters?.forEach((item) => {
        generateFilter(item, query);
      });

      const { data, count, error } = await query;

      if (error) {
        return handleError(error);
      }

      return {
        data: data || [],
        total: count || 0,
      };
    },

    getMany: async ({ resource, ids, meta }) => {
      const client = meta?.schema
        ? supabaseClient.schema(meta.schema)
        : supabaseClient;

      const { data, error } = await client.rpc(
        resource,
        {
          ...(meta?.args || {}),
          ids,
        },
        meta?.options,
      );

      if (error) {
        return handleError(error);
      }

      return {
        data: data || [],
      };
    },

    create: async ({ resource, variables, meta }) => {
      const client = meta?.schema
        ? supabaseClient.schema(meta.schema)
        : supabaseClient;

      const { data, error } = await client.rpc(
        resource,
        {
          ...(meta?.args || {}),
          ...variables,
        },
        meta?.options,
      );

      if (error) {
        return handleError(error);
      }

      return {
        data: Array.isArray(data) ? data[0] : data,
      };
    },

    createMany: async ({ resource, variables, meta }) => {
      const client = meta?.schema
        ? supabaseClient.schema(meta.schema)
        : supabaseClient;

      const { data, error } = await client.rpc(
        resource,
        {
          ...(meta?.args || {}),
          records: variables,
        },
        meta?.options,
      );

      if (error) {
        return handleError(error);
      }

      return {
        data,
      };
    },

    update: async ({ resource, id, variables, meta }) => {
      const client = meta?.schema
        ? supabaseClient.schema(meta.schema)
        : supabaseClient;

      const { data, error } = await client.rpc(
        resource,
        {
          ...(meta?.args || {}),
          id,
          ...variables,
        },
        meta?.options,
      );

      if (error) {
        return handleError(error);
      }

      return {
        data: Array.isArray(data) ? data[0] : data,
      };
    },

    updateMany: async ({ resource, ids, variables, meta }) => {
      const client = meta?.schema
        ? supabaseClient.schema(meta.schema)
        : supabaseClient;

      const { data, error } = await client.rpc(
        resource,
        {
          ...(meta?.args || {}),
          ids,
          ...variables,
        },
        meta?.options,
      );

      if (error) {
        return handleError(error);
      }

      return {
        data,
      };
    },

    getOne: async <TData extends BaseRecord = BaseRecord>({
      resource,
      id,
      meta,
    }: GetOneParams): Promise<GetOneResponse<TData>> => {
      const client = meta?.schema
        ? supabaseClient.schema(meta.schema)
        : supabaseClient;

      const { data, error } = await client
        .rpc(
          resource,
          {
            ...(meta?.args || {}),
            id,
          },
          meta?.options,
        )
        .single();

      if (error) {
        return handleError(error);
      }

      return {
        data: data as TData,
      };
    },

    deleteOne: async ({ resource, id, meta }) => {
      const client = meta?.schema
        ? supabaseClient.schema(meta.schema)
        : supabaseClient;

      const { data, error } = await client.rpc(
        resource,
        {
          ...(meta?.args || {}),
          id,
        },
        meta?.options,
      );

      if (error) {
        return handleError(error);
      }

      return {
        data: Array.isArray(data) ? data[0] : data,
      };
    },

    deleteMany: async ({ resource, ids, meta }) => {
      const client = meta?.schema
        ? supabaseClient.schema(meta.schema)
        : supabaseClient;

      const { data, error } = await client.rpc(
        resource,
        {
          ...(meta?.args || {}),
          ids,
        },
        meta?.options,
      );

      if (error) {
        return handleError(error);
      }

      return {
        data,
      };
    },

    custom: async ({
      url,
      method: _method,
      filters,
      sorters,
      payload,
      query,
      headers,
      meta,
    }) => {
      const client = meta?.schema
        ? supabaseClient.schema(meta.schema)
        : supabaseClient;

      let rpcQuery = client.rpc(
        url,
        {
          ...payload,
          ...query,
          ...(meta?.args || {}),
        },
        {
          ...headers,
          ...(meta?.options || {}),
        },
      );

      // Apply filters if provided
      filters?.forEach((item) => {
        generateFilter(item, rpcQuery);
      });

      // Apply sorting if provided
      sorters?.forEach((item) => {
        rpcQuery = rpcQuery.order(item.field, {
          ascending: item.order === "asc",
        });
      });

      const { data, error } = await rpcQuery;

      if (error) {
        return handleError(error);
      }

      return {
        data,
      };
    },

    getApiUrl: () => {
      return "";
    },
  };
};
