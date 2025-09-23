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

import type { AnyObject, CreateDataProviderOptions } from "./types";
import { defaultCreateDataProviderOptions } from "./default.options";

type CreateDataProvider = {
  kyInstance: typeof kyBase;
  dataProvider: DataProvider;
};

export const createDataProvider = (
  apiURL: string,
  baseOptions: CreateDataProviderOptions = defaultCreateDataProviderOptions,
  kyOptions: KyOptions = {},
): CreateDataProvider => {
  const options = dm(defaultCreateDataProviderOptions, baseOptions);

  const ky = kyBase.create({
    prefixUrl: apiURL,
    ...kyOptions,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...kyOptions.headers,
    },
    throwHttpErrors: false,
  });

  return {
    kyInstance: ky,
    dataProvider: {
      getList: async (params) => {
        const endpoint = options.getList.getEndpoint(params);

        const headers = await options.getList.buildHeaders(params);

        const query = await options.getList.buildQueryParams(params);

        const response = await ky(endpoint, {
          headers,
          searchParams: qs.stringify(query, { encodeValuesOnly: true }),
        });

        const data = await options.getList.mapResponse(
          response.clone(),
          params,
        );

        const total = await options.getList.getTotalCount(
          response.clone(),
          params,
        );

        return { data, total };
      },
      getOne: async (params): Promise<GetOneResponse<any>> => {
        const endpoint = options.getOne.getEndpoint(params);

        const headers = await options.getOne.buildHeaders(params);

        const query = await options.getOne.buildQueryParams(params);

        const response = await ky(endpoint, {
          headers,
          searchParams: qs.stringify(query, { encodeValuesOnly: true }),
        });

        const data = await options.getOne.mapResponse(response, params);

        return { data };
      },
      async getMany(params) {
        const endpoint = options.getMany.getEndpoint(params);

        const headers = await options.getMany.buildHeaders(params);

        const query = await options.getMany.buildQueryParams(params);

        const response = await ky(endpoint, {
          headers,
          searchParams: qs.stringify(query, { encodeValuesOnly: true }),
        });

        const data = await options.getMany.mapResponse(response, params);

        return { data };
      },
      create: async (params): Promise<CreateResponse<any>> => {
        const endpoint = options.create.getEndpoint(params);

        const headers = await options.create.buildHeaders(params);

        const query = await options.create.buildQueryParams(params);

        const body = await options.create.buildBodyParams(params);

        const response = await ky(endpoint, {
          method: "post",
          headers,
          searchParams: qs.stringify(query, { encodeValuesOnly: true }),
          body: JSON.stringify(body),
        });

        if (response.ok) {
          const data = await options.create.mapResponse(response, params);

          return { data };
        }

        const error = await options.create.transformError(response, params);

        throw error;
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
          searchParams: qs.stringify(query, { encodeValuesOnly: true }),
          body: JSON.stringify(body),
        });

        if (response.ok) {
          const data = await options.update.mapResponse(response, params);

          return { data };
        }

        const error = await options.update.transformError(response, params);

        throw error;
      },
      deleteOne: async (params): Promise<DeleteOneResponse<any>> => {
        const endpoint = options.deleteOne.getEndpoint(params);

        const headers = await options.deleteOne.buildHeaders(params);

        const query = await options.deleteOne.buildQueryParams(params);

        const response = await ky(endpoint, {
          method: "delete",
          headers,
          searchParams: qs.stringify(query, { encodeValuesOnly: true }),
        });

        const data = await options.deleteOne.mapResponse(response, params);

        return { data };
      },
      custom: async (params): Promise<CustomResponse<any>> => {
        const { method, url } = params;

        let client = kyBase.create({
          method,
          ...kyOptions,
        });

        const headers = await options.custom.buildHeaders(params);
        if (headers) {
          client = client.extend({ headers });
        }

        const query = await options.custom.buildQueryParams(params);
        if (query) {
          client = client.extend({
            searchParams: qs.stringify(query, { encodeValuesOnly: true }),
          });
        }

        if (["post", "put", "patch"].includes(method)) {
          const body = await options.custom.buildBodyParams(params);

          if (body) {
            client = client.extend({ body: JSON.stringify(body) });
          }
        }

        const response = await client<AnyObject>(url);

        const data = await options.custom.mapResponse(response, params);

        return { data };
      },
      getApiUrl: () => apiURL,
    },
  };
};
