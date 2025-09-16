import type {
  CreateResponse,
  CustomResponse,
  DataProvider,
  DeleteOneResponse,
  GetOneResponse,
  UpdateResponse,
} from "@refinedev/core";
import dm from "deepmerge";
import kyBase, { type Options as KyOptions } from "ky";
import qs from "qs";
import wretch from "wretch";
import queryStringAddon from "wretch/addons/queryString";

import { defaultCreateDataProviderOptions } from "./options/default.options";
import type { AnyObject, CreateDataProviderOptions } from "./types";

export const createDataProvider = (
  apiURL: string,
  baseOptions: CreateDataProviderOptions = defaultCreateDataProviderOptions,
  kyOptions: KyOptions,
): DataProvider => {
  const options = dm(defaultCreateDataProviderOptions, baseOptions);

  const ky = kyBase.create({
    prefixUrl: apiURL,
    ...kyOptions,
    throwHttpErrors: false,
  });

  // let client = wretch(apiURL)
  //   .addon(queryStringAddon)
  //   .headers(options.defaultHeaders);

  // if (options.middlewares?.global) {
  //   client = client.middlewares(
  //     options.middlewares.global.map((middleware) => middleware(client)),
  //   );
  // }

  return {
    getList: async (params) => {
      const endpoint = options.getList.getEndpoint(params);

      const headers = await options.getList.buildHeaders(params);

      const query = await options.getList.buildQueryParams(params);

      const response = await ky(endpoint, {
        headers,
        searchParams: query,
      });

      if (response.ok) {
        const data = await options.getList.mapResponse(response, params);

        const total = await options.getList.getTotalCount(response, params);

        return { data, total };
      }

      const { error } = await response.json<{ error: AnyObject }>();

      throw error;
    },
    getOne: async (params): Promise<GetOneResponse<any>> => {
      const endpoint = options.getOne.getEndpoint(params);

      const headers = await options.getOne.buildHeaders(params);

      const query = await options.getOne.buildQueryParams(params);

      const response = await ky(endpoint, { headers, searchParams: query });

      const data = await options.getOne.mapResponse(response, params);

      return { data };
    },
    async getMany(params) {
      const endpoint = options.getMany.getEndpoint(params);

      const headers = await options.getMany.buildHeaders(params);

      const query = await options.getMany.buildQueryParams(params);

      const response = await ky(endpoint, { headers, searchParams: query });

      const data = await options.getMany.mapResponse(response, params);

      return { data };
    },
    create: async (params): Promise<CreateResponse<any>> => {
      const endpoint = options.create.getEndpoint(params);

      const headers = await options.create.buildHeaders(params);

      const query = await options.create.buildQueryParams(params);

      const body = await options.create.buildBodyParams(params);

      const response = await ky(endpoint, {
        headers,
        searchParams: query,
        body,
      });

      const data = await options.create.mapResponse(response, params);

      return { data };
    },
    async createMany(params) {
      const endpoint = options.createMany.getEndpoint(params);

      const headers = await options.createMany.buildHeaders(params);

      const query = await options.createMany.buildQueryParams(params);

      const body = await options.createMany.buildBodyParams(params);

      const response = await ky(endpoint, {
        headers,
        searchParams: query,
        body: JSON.stringify(body),
      });

      const data = await options.createMany.mapResponse(response, params);

      return { data } as any;
    },
    update: async (params): Promise<UpdateResponse<any>> => {
      const endpoint = options.update.getEndpoint(params);

      // TODO: Validate method name.
      const method = options.update.getRequestMethod(params);

      const headers = await options.update.buildHeaders(params);

      const query = await options.update.buildQueryParams(params);

      const body = await options.update.buildBodyParams(params);

      const response = await ky(endpoint, {
        method,
        headers,
        searchParams: query,
        body,
      });

      const data = await options.update.mapResponse(response, params);

      return { data };
    },
    async updateMany(params) {
      const endpoint = options.updateMany.getEndpoint(params);

      const method = options.updateMany.getRequestMethod(params);

      const headers = await options.updateMany.buildHeaders(params);

      const query = await options.updateMany.buildQueryParams(params);

      const body = await options.updateMany.buildBodyParams(params);

      const response = await ky(endpoint, {
        method,
        headers,
        searchParams: query,
        body,
      });

      const data = await options.updateMany.mapResponse(response, params);

      return { data } as any;
    },
    deleteOne: async (params): Promise<DeleteOneResponse<any>> => {
      const endpoint = options.deleteOne.getEndpoint(params);

      const headers = await options.deleteOne.buildHeaders(params);

      const query = await options.deleteOne.buildQueryParams(params);

      const response = await ky(endpoint, { headers, searchParams: query });

      const data = await options.deleteOne.mapResponse(response, params);

      return { data };
    },
    async deleteMany(params) {
      const endpoint = options.deleteMany.getEndpoint(params);

      const headers = await options.deleteMany.buildHeaders(params);

      const query = await options.deleteMany.buildQueryParams(params);

      const response = await ky(endpoint, { headers, searchParams: query });

      const data = await options.deleteMany.mapResponse(response, params);

      return { data } as any;
    },
    custom: async (params): Promise<CustomResponse<any>> => {
      const { method, url } = params;

      const client = kyBase.create({
        method,
        ...kyOptions,
      });

      const headers = await options.custom.buildHeaders(params);
      if (headers) {
        client.extend({ headers });
      }

      const query = await options.custom.buildQueryParams(params);
      if (query) {
        client.extend({ searchParams: query });
      }

      if (["post", "put", "patch"].includes(method)) {
        const body = await options.custom.buildBodyParams(params);

        if (body) {
          client.extend({ body: JSON.stringify(body) });
        }
      }

      const response = await client<AnyObject>(url);

      const data = await options.custom.mapResponse(response, params);

      return { data };
    },
    getApiUrl: () => apiURL,
  };
};
