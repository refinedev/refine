import type {
  CreateManyParams,
  CreateParams,
  CustomParams,
  DeleteOneParams,
  GetListParams,
  GetManyParams,
  GetOneParams,
  UpdateParams,
  HttpError,
} from "@refinedev/core";
import type { KyResponse } from "ky";
import type { AnyObject } from "../types";

export const defaultCreateDataProviderOptions = {
  getList: {
    getEndpoint(params: GetListParams): string {
      return `${params.resource}`;
    },
    async buildHeaders(params: GetListParams) {
      return params.meta?.headers ?? {};
    },
    async buildFilters(params: GetListParams) {
      const { filters = [] } = params;

      return filters.reduce((acc, filter) => {
        if ("field" in filter) {
          return {
            ...acc,
            [filter.field]: { [filter.operator]: filter.value },
          };
        }

        return acc;
      }, {});
    },
    async buildPagination(params: GetListParams) {
      const { pagination } = params;

      return pagination ?? {};
    },
    async buildSorters(params: GetListParams) {
      const { sorters = [] } = params;

      return sorters.reduce(
        (acc, sorter) => {
          return {
            sort: {
              ...acc.sort,
              [sorter.field]: sorter.order,
            },
          };
        },
        { sort: {} },
      );
    },
    async buildQueryParams(params: GetListParams) {
      const filters = await this.buildFilters(params);

      const sorters = await this.buildSorters(params);

      const pagination = await this.buildPagination(params);

      const queryParams = {
        ...filters,
        ...sorters,
        ...pagination,
        ...params.meta?.query,
      };

      return queryParams;
    },
    async mapResponse(
      response: KyResponse<AnyObject>,
      params: GetListParams,
    ): Promise<any[]> {
      const body = await response.json();

      return body.records;
    },
    async getTotalCount(
      response: KyResponse<AnyObject>,
      _params: GetListParams,
    ): Promise<number> {
      const body = await response.json();

      return body.totalCount;
    },
  },
  getOne: {
    getEndpoint(params: GetOneParams) {
      return `${params.resource}/${params.id}`;
    },
    async buildHeaders(params: GetOneParams) {
      return params.meta?.headers ?? {};
    },
    async buildQueryParams(params: GetOneParams) {
      return params.meta?.query ?? {};
    },
    async mapResponse(
      response: KyResponse<AnyObject>,
      _params: GetOneParams,
    ): Promise<Record<string, any>> {
      return await response.json();
    },
  },
  getMany: {
    getEndpoint(params: GetManyParams) {
      return `${params.resource}`;
    },
    async buildHeaders(params: GetManyParams) {
      return params.meta?.headers ?? {};
    },
    async buildQueryParams(params: GetManyParams) {
      const queryParams = {
        ids: params.ids.join(","),
      };

      return params.meta?.query ?? queryParams;
    },
    async mapResponse(response: KyResponse<AnyObject>, params: GetManyParams) {
      const body = await response.json();

      return body.records;
    },
  },
  create: {
    getEndpoint(params: CreateParams<any>): string {
      return `${params.resource}`;
    },
    async buildHeaders(params: CreateParams<any>) {
      return params.meta?.headers ?? {};
    },
    async buildQueryParams(params: CreateParams<any>) {
      return params.meta?.query ?? {};
    },
    async buildBodyParams(params: CreateParams<any>) {
      return params.variables;
    },
    async mapResponse(
      response: KyResponse<AnyObject>,
      _params: CreateParams<any>,
    ): Promise<Record<string, any>> {
      return await response.json();
    },
    async transformError(
      response: KyResponse<AnyObject>,
      params: CreateParams<any>,
    ): Promise<HttpError> {
      const body = await response.json();

      return {
        message: JSON.stringify({ ...body, variables: params.variables }),
        statusCode: response.status,
      };
    },
  },
  createMany: {
    getEndpoint(params: CreateManyParams<any>) {
      return `${params.resource}/bulk`;
    },
    async buildHeaders(params: CreateManyParams<any>) {
      return params.meta?.headers ?? {};
    },
    async buildQueryParams(params: CreateManyParams<any>) {
      return params.meta?.query ?? {};
    },
    async buildBodyParams(params: CreateManyParams<any>) {
      return params.variables;
    },
    async mapResponse(
      response: KyResponse<AnyObject[]>,
      _params: CreateManyParams<any>,
    ) {
      return await response.json();
    },
  },
  update: {
    getEndpoint(params: UpdateParams<any>): string {
      return `${params.resource}/${params.id}`;
    },
    getRequestMethod(params: UpdateParams<any>) {
      return params.meta?.method ?? "PATCH";
    },
    async buildHeaders(params: UpdateParams<any>) {
      return params.meta?.headers ?? {};
    },
    async buildQueryParams(params: UpdateParams<any>) {
      return params.meta?.query ?? {};
    },
    async buildBodyParams(params: UpdateParams<any>) {
      return params.variables;
    },
    async mapResponse(
      response: KyResponse<AnyObject>,
      _params: UpdateParams<any>,
    ) {
      return await response.json();
    },

    async transformError(
      response: KyResponse<AnyObject>,
      params: UpdateParams<any>,
    ): Promise<HttpError> {
      const body = await response.json();

      return {
        message: JSON.stringify({
          ...body,
          id: params.id,
          variables: params.variables,
        }),
        statusCode: response.status,
      };
    },
  },
  updateMany: {
    each: true,
  },
  deleteOne: {
    getEndpoint(params: DeleteOneParams<any>) {
      return `${params.resource}/${params.id}`;
    },
    async buildHeaders(params: DeleteOneParams<any>) {
      return params.meta?.headers ?? {};
    },
    async buildQueryParams(params: DeleteOneParams<any>) {
      return params.meta?.query ?? {};
    },
    async mapResponse(
      _response: KyResponse<AnyObject>,
      _params: DeleteOneParams<any>,
    ) {
      return undefined;
    },
  },
  deleteMany: {
    each: true,
  },
  custom: {
    async buildQueryParams(params: CustomParams<any>) {
      return params.query ?? {};
    },
    async buildHeaders(params: CustomParams<any>) {
      return params.headers ?? {};
    },
    async buildBodyParams(params: CustomParams<any>) {
      return params.payload ?? {};
    },
    async mapResponse(
      response: KyResponse<AnyObject | AnyObject[]>,
      params: CustomParams<any>,
    ) {
      return await response.json();
    },
  },
};
