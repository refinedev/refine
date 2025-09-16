import { CondOperator, RequestQueryBuilder } from "@nestjsx/crud-request";
import type { CreateDataProviderOptions } from "@refinedev/rest";
import {
  handleFilter,
  handleJoin,
  handlePagination,
  handleSort,
} from "./utils";
import type { BaseRecord } from "@refinedev/core";

export const NestjsxCrudDataProviderOptions: CreateDataProviderOptions = {
  getList: {
    getEndpoint: (params) => params.resource,
    buildQueryParams: async (params) => {
      let query = RequestQueryBuilder.create();

      query = handleFilter(query, params.filters);
      query = handleJoin(query, params.meta?.join);
      query = handlePagination(query, params.pagination);
      query = handleSort(query, params.sorters);

      return query.queryObject;
    },
    mapResponse: async (response, params) => {
      const body = await response.json<BaseRecord[] | { data: BaseRecord[] }>();

      if (Array.isArray(body)) {
        return body;
      }

      return body.data;
    },
    getTotalCount: async (response, params) => {
      const body = await response.json<BaseRecord[] | { total: number }>();

      if (Array.isArray(body)) {
        return body.length;
      }

      return body.total;
    },
  },
  getMany: {
    getEndpoint: (params) => params.resource,
    buildQueryParams: async ({ ids, meta }) => {
      let query = RequestQueryBuilder.create().setFilter({
        field: "id",
        operator: CondOperator.IN,
        value: ids,
      });

      query = handleJoin(query, meta?.join);

      return query.queryObject;
    },
    mapResponse: async (response, _params) => await response.json(),
  },
  create: {
    getEndpoint: (params) => params.resource,
    buildBodyParams: ({ variables }) => variables,
    mapResponse: async (response) => await response.json(),
  },
  update: {
    getEndpoint: ({ resource, id }) => `${resource}/${id}`,
    buildBodyParams: ({ variables }) => variables,
    mapResponse: async (response) => await response.json(),
  },
  updateMany: {
    each: true,
    getEndpoint: ({ resource }) => resource,
    buildBodyParams: async ({ variables }) => variables,
    mapResponse: async (response, _params) => await response.json(),
  },
  createMany: {
    getEndpoint: ({ resource }) => `${resource}/bulk`,
    buildBodyParams: async ({ variables }) => ({
      bulk: variables,
    }),
    mapResponse: async (response) => await response.json(),
  },
  getOne: {
    getEndpoint: ({ resource, id }) => `${resource}/${id}`,
    buildQueryParams: async ({ meta }) => {
      let query = RequestQueryBuilder.create();

      query = handleJoin(query, meta?.join);

      return query.queryObject;
    },
    mapResponse: async (response, _params) => await response.json(),
  },
  deleteOne: {
    getEndpoint: ({ resource, id }) => `${resource}/${id}`,
    mapResponse: async (response, _params) => undefined,
  },
  deleteMany: {
    each: true,
    getEndpoint: ({ resource }) => resource,
    mapResponse: async (response, _params) => undefined,
  },
};
