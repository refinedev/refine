import { stringify } from "query-string";
import type { KyInstance } from "ky";
import { kyInstance, createKyInstance } from "./utils/ky";
import { generateSort, generateFilter } from "../utils";
import type {
  DataProvider,
  GetListParams,
  GetListResponse,
  GetManyParams,
  GetManyResponse,
  BaseRecord,
  Pagination,
  CreateParams,
  CreateResponse,
  UpdateParams,
  UpdateResponse,
  GetOneParams,
  GetOneResponse,
  DeleteOneParams,
  DeleteOneResponse,
  CustomParams,
  CustomResponse,
} from "@refinedev/core";

type MethodTypes = "get" | "delete" | "head" | "options";
type MethodTypesWithBody = "post" | "put" | "patch";
const handleRequest = async (
  httpClient: KyInstance,
  method: MethodTypes | MethodTypesWithBody,
  url: string,
  config?: { headers?: Record<string, string>; json?: unknown },
) => {
  switch (method) {
    case "get":
      return httpClient.get(url, config);
    case "post":
      return httpClient.post(url, config);
    case "put":
      return httpClient.put(url, config);
    case "patch":
      return httpClient.patch(url, config);
    case "delete":
      return httpClient.delete(url, config);
    case "head":
      return httpClient.head(url, config);
    default:
      throw new Error(`Unsupported method: ${method}`);
  }
};

export const dataProvider = (
  apiUrl: string,
  httpClient = kyInstance,
): Omit<
  Required<DataProvider>,
  "createMany" | "updateMany" | "deleteMany"
> => ({
  getApiUrl: () => apiUrl,
  getList: async <TData extends BaseRecord>({
    resource,
    pagination,
    filters,
    sorters,
    meta = {},
  }: GetListParams): Promise<GetListResponse<TData>> => {
    const url = `${apiUrl}/${resource}`;

    const {
      current = 1,
      pageSize = 10,
      mode = "server",
    } = pagination ?? ({} as Pagination);
    const { headers: headersFromMeta, method } = meta ?? {};
    const requestMethod = (method as MethodTypes) ?? "get";

    const queryFilters = generateFilter(filters);

    const query: {
      _start?: number;
      _end?: number;
      _sort?: string;
      _order?: string;
    } = {};

    if (mode === "server") {
      query._start = (current - 1) * pageSize;
      query._end = current * pageSize;
    }

    const generatedSort = generateSort(sorters);
    if (generatedSort) {
      const { _sort, _order } = generatedSort;
      query._sort = _sort.join(",");
      query._order = _order.join(",");
    }

    const combinedQuery = { ...query, ...queryFilters };
    const urlWithQuery = Object.keys(combinedQuery).length
      ? `${url}?${stringify(combinedQuery)}`
      : url;

    const response = await handleRequest(
      httpClient,
      requestMethod,
      urlWithQuery,
      {
        headers: headersFromMeta,
      },
    );

    const data = (await response.json()) as TData[];
    const total = +(response.headers.get("x-total-count") ?? 0) || data.length;

    return { data, total };
  },
  getMany: async <TData extends BaseRecord>({
    resource,
    ids,
    meta = {},
  }: GetManyParams): Promise<GetManyResponse<TData>> => {
    const { headers } = meta;
    const requestMethod = meta.method ?? "get";

    const response = await httpClient.get(
      `${apiUrl}/${resource}?${stringify({ id: ids })}`,
      { headers },
    );

    const data = (await response.json()) as TData[];

    return {
      data,
    };
  },

  create: async <TData extends BaseRecord, TVariables = {}>({
    resource,
    variables,
    meta = {},
  }: CreateParams<TVariables>): Promise<CreateResponse<TData>> => {
    const url = `${apiUrl}/${resource}`;

    const { headers, method } = meta;
    const requestMethod = (method as MethodTypesWithBody) ?? "post";

    const response = await httpClient[requestMethod](url, {
      json: variables,
      headers,
    });

    const data = (await response.json()) as TData;

    return {
      data,
    };
  },

  update: async <TData extends BaseRecord, TVariables = {}>({
    resource,
    id,
    variables,
    meta = {},
  }: UpdateParams<TVariables>): Promise<UpdateResponse<TData>> => {
    const url = `${apiUrl}/${resource}/${id}`;

    const { headers, method } = meta;
    const requestMethod = (method as MethodTypesWithBody) ?? "patch";

    const response = await httpClient[requestMethod](url, {
      json: variables,
      headers,
    });

    const data = (await response.json()) as TData;

    return {
      data,
    };
  },
  getOne: async <TData extends BaseRecord>({
    resource,
    id,
    meta = {},
  }: GetOneParams): Promise<GetOneResponse<TData>> => {
    const url = `${apiUrl}/${resource}/${id}`;

    const { headers, method } = meta;
    const requestMethod = (method as MethodTypes) ?? "get";

    const response = await (httpClient as Record<string, any>)[requestMethod](
      url,
      { headers },
    );

    const data = (await response.json()) as TData;

    return {
      data,
    };
  },
  deleteOne: async <TData extends BaseRecord, TVariables = {}>({
    resource,
    id,
    variables,
    meta = {},
  }: DeleteOneParams<TVariables>): Promise<DeleteOneResponse<TData>> => {
    const url = `${apiUrl}/${resource}/${id}`;

    const { headers, method } = meta;
    const requestMethod = (method as MethodTypesWithBody) ?? "delete";

    const response = await httpClient[requestMethod](url, {
      json: variables,
      headers,
    });

    const data = (await response.json()) as TData;

    return {
      data,
    };
  },

  custom: async <
    TData extends BaseRecord,
    TQuery = unknown,
    TPayload = unknown,
  >({
    url,
    method,
    filters,
    sorters,
    payload,
    query,
    headers,
  }: CustomParams<TQuery, TPayload>): Promise<CustomResponse<TData>> => {
    let requestUrl = `${url}?`;

    if (sorters) {
      const generatedSort = generateSort(sorters);
      if (generatedSort) {
        const { _sort, _order } = generatedSort;
        const sortQuery = {
          _sort: _sort.join(","),
          _order: _order.join(","),
        };
        requestUrl = `${requestUrl}&${stringify(sortQuery)}`;
      }
    }

    if (filters) {
      const filterQuery = generateFilter(filters);
      requestUrl = `${requestUrl}&${stringify(filterQuery)}`;
    }

    if (query) {
      requestUrl = `${requestUrl}&${stringify(query)}`;
    }

    const response = await httpClient[method as MethodTypesWithBody](
      requestUrl,
      {
        json: payload,
        headers,
      },
    );

    const data = await response.json();

    return {
      data: data as TData,
    };
  },
});
