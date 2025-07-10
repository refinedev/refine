import type {
  GetListParams,
  GetOneParams,
  CreateParams,
  UpdateParams,
  DeleteOneParams,
  CrudOperators,
  CustomParams,
  UpdateManyParams,
  DeleteManyParams,
} from "@refinedev/core";
import type { WretchResponse } from "wretch/types";

const mapOperator = (operator: CrudOperators): string => {
  switch (operator) {
    case "ne":
    case "gte":
    case "lte":
      return `_${operator}`;
    case "contains":
      return "_like";
    default:
      return "";
  }
};

export const simpleRestDataProviderOptions = {
  getList: {
    getEndpoint(params: GetListParams): string {
      return `/${params.resource}`;
    },
    async buildFilters(params: GetListParams) {
      const { filters = [] } = params;

      const queryFilters: Record<string, any> = {};

      filters.map((filter) => {
        if ("field" in filter) {
          const { field, operator, value } = filter;

          if (field === "q") {
            queryFilters[field] = value;
            return;
          }

          const mappedOperator = mapOperator(operator);
          queryFilters[`${field}${mappedOperator}`] = value;
        }
      });

      return queryFilters;
    },
    async buildPagination(params: GetListParams) {
      const { pagination } = params;
      const { current = 1, pageSize = 10 } = pagination ?? {};

      const _start = (current - 1) * pageSize;
      const _end = current * pageSize;

      return { _start, _end };
    },
    async buildSorters(params: GetListParams) {
      const { sorters = [] } = params;

      if (!sorters.length) return {};

      const sort: string[] = [];
      const order: string[] = [];

      sorters.forEach((item) => {
        sort.push(item.field);
        order.push(item.order);
      });

      const _sort = sort.join(",");
      const _order = order.join(",");

      return {
        _sort,
        _order,
      };
    },
    async buildQueryParams(params: GetListParams) {
      const filters = await this.buildFilters(params);

      const sorters = await this.buildSorters(params);

      const pagination = await this.buildPagination(params);

      return { ...filters, ...sorters, ...pagination };
    },
    async mapResponse(
      response: WretchResponse,
      params: GetListParams,
    ): Promise<any[]> {
      return await response.json();
    },
    async getTotalCount(
      response: WretchResponse,
      params: GetListParams,
    ): Promise<number> {
      const totalCount = response.headers.get("x-total-count") ?? 0;

      return +totalCount;
    },
  },
  getOne: {
    getEndpoint(params: GetOneParams) {
      return `/${params.resource}/${params.id}`;
    },
    async buildQueryParams(params: GetOneParams) {
      return {};
    },
    async mapResponse(
      response: WretchResponse,
      params: GetOneParams,
    ): Promise<Record<string, any>> {
      return await response.json();
    },
  },
  getMany: {
    getEndpoint(params: GetListParams) {
      return `/${params.resource}`;
    },
    async buildQueryParams(params: GetListParams) {
      return {};
    },
    async mapResponse(response: WretchResponse, params: GetListParams) {
      return await response.json();
    },
  },
  create: {
    getEndpoint(params: CreateParams<any>): string {
      return `/${params.resource}`;
    },
    async buildQueryParams(params: CreateParams<any>) {
      return {};
    },
    async buildBodyParams(params: CreateParams<any>) {
      return params.variables;
    },
    async mapResponse(
      response: WretchResponse,
      params: CreateParams<any>,
    ): Promise<Record<string, any>> {
      return await response.json();
    },
  },
  createMany: {
    getEndpoint(params: CreateParams<any>) {
      return `/${params.resource}`;
    },
    async buildQueryParams(params: CreateParams<any>) {
      return params.variables;
    },
    async mapResponse(response: WretchResponse, params: CreateParams<any>) {
      return await response.json();
    },
  },
  update: {
    getEndpoint(params: UpdateParams<any>): string {
      return `/${params.resource}/${params.id}`;
    },
    async buildQueryParams(params: UpdateParams<any>) {
      return {};
    },
    async buildBodyParams(params: UpdateParams<any>) {
      return params.variables;
    },
    async mapResponse(response: WretchResponse, params: UpdateParams<any>) {
      return await response.json();
    },
  },
  updateMany: {
    getEndpoint(params: UpdateManyParams<any>) {
      return `/${params.resource}`;
    },
    async buildQueryParams(params: UpdateManyParams<any>) {
      return params.variables;
    },
    async mapResponse(response: WretchResponse, params: UpdateManyParams<any>) {
      return await response.json();
    },
  },
  deleteOne: {
    getEndpoint(params: DeleteOneParams<any>) {
      return `/${params.resource}/${params.id}`;
    },
    async buildQueryParams(params: DeleteOneParams<any>) {
      return {};
    },
    async mapResponse(response: WretchResponse, params: DeleteOneParams<any>) {
      return await response.json();
    },
  },
  deleteMany: {
    getEndpoint(params: DeleteManyParams<any>) {
      return `/${params.resource}`;
    },
    async buildQueryParams(params: DeleteManyParams<any>) {
      return {};
    },
    async mapResponse(response: WretchResponse, params: DeleteManyParams<any>) {
      return await response.json();
    },
  },
  custom: {
    async buildQueryParams(params: CustomParams<any>) {
      return params.query;
    },
    async buildBodyParams(params: CustomParams<any>) {
      return params.payload ?? {};
    },
    async buildHeaders(params: CustomParams<any>) {
      return params.headers ?? {};
    },
    async mapResponse(response: WretchResponse, params: CustomParams<any>) {
      return await response.json();
    },
  },
  defaultHeaders: {
    "Content-Type": "application/json",
  },
  getAuthHeader: async () => {
    return {
      headerName: "Authorization",
      headerValue: `Bearer ${localStorage.getItem("token")}`,
    };
  },
  refreshToken: {
    getEndpoint: (apiURL: string) => "/refresh-token",
    async persistTokens(mapResponseResult: Record<string, any>) {
      localStorage.setItem("token", mapResponseResult.token);
      localStorage.setItem("refreshToken", mapResponseResult.refreshToken);
    },
    async mapResponse(response: WretchResponse) {
      return await response.json();
    },
  },
};
