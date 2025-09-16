import type {
  CreateManyParams,
  CreateParams,
  CustomParams,
  DeleteManyParams,
  DeleteOneParams,
  GetListParams,
  GetManyParams,
  GetOneParams,
  UpdateManyParams,
  UpdateParams,
} from "@refinedev/core";
import { KyResponse } from "ky";
import { AnyObject } from "src/data-provider/types";
import type { WretchResponse } from "wretch/types";
import { generateFilter } from "./utils/generateFilter";
import { normalizeData } from "./utils/normalizeData";
import { transformHttpError } from "./utils/transformHttpError";

export const strapiV4DataProviderOptions = {
  getList: {
    getEndpoint(params: GetListParams): string {
      return `${params.resource}`;
    },
    async buildFilters(params: GetListParams) {
      const { filters = [] } = params;

      const queryFilters = generateFilter(filters);

      return queryFilters;
    },
    async buildPagination(params: GetListParams) {
      const {
        currentPage = 1,
        pageSize = 10,
        mode = "server",
      } = params.pagination ?? {};

      if (mode === "server") {
        return {
          page: currentPage,
          pageSize: pageSize,
        };
      }

      return {};
    },
    async buildSorters(params: GetListParams) {
      const { sorters = [] } = params;

      const _sorters: string[] = [];

      if (sorters) {
        // strapi.com/categories?sort=id:asc
        sorters.map((item) => {
          if (item.order) {
            _sorters.push(`${item.field}:${item.order}`);
          }
        });
      }

      const sort = _sorters.length ? _sorters.join(",") : undefined;

      return sort;
    },
    async buildQueryParams(params: GetListParams) {
      const filters = await this.buildFilters(params);

      const sorters = await this.buildSorters(params);

      const pagination = await this.buildPagination(params);

      const { meta } = params;

      const locale = meta?.locale;
      const fields = meta?.fields;
      const populate = meta?.populate;
      const publicationState = meta?.publicationState;

      const queryParams = {
        pagination,
        locale,
        publicationState,
        fields,
        populate,
        sort: sorters,
        filters,
      };

      return queryParams;
    },
    async mapResponse(
      response: KyResponse<AnyObject>,
      params: GetListParams,
    ): Promise<any[]> {
      const body = await response.json();

      return normalizeData(body);
    },
    async getTotalCount(
      response: KyResponse<AnyObject>,
      params: GetListParams,
    ): Promise<number> {
      const body = await response.json();

      return body.meta?.pagination?.total || normalizeData(body)?.length;
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
      const { meta } = params ?? {};

      const locale = meta?.locale;
      const fields = meta?.fields;
      const populate = meta?.populate;
      const publicationState = meta?.publicationState;

      const queryParams = {
        locale,
        fields,
        populate,
        publicationState,
      };

      return queryParams;
    },
    async mapResponse(
      response: KyResponse<AnyObject>,
      params: GetOneParams,
    ): Promise<Record<string, any>> {
      const body = await response.json();

      return normalizeData(body);
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
      const { ids, meta } = params ?? {};
      const locale = meta?.locale;
      const fields = meta?.fields;
      const populate = meta?.populate;
      const publicationState = meta?.publicationState;

      const filters = generateFilter([
        { field: "id", operator: "in", value: ids },
      ]);

      const query = {
        locale,
        fields,
        populate,
        publicationState,
        filters,
        pagination: { pageSize: ids.length },
      };

      return query;
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

    async buildBodyParams(params: CreateParams<any>) {
      const { resource, variables } = params;
      let bodyParams = { data: variables };

      if (resource === "users") {
        bodyParams = variables;
      }

      return bodyParams;
    },
    async mapResponse(
      response: KyResponse<AnyObject>,
      _params: CreateParams<any>,
    ): Promise<Record<string, any>> {
      if (response.status >= 400) {
        const httpError = transformHttpError(response);

        throw httpError;
      }

      const body = await response.json();

      return body;
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
      response: KyResponse<AnyObject>,
      params: CreateManyParams<any>,
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
      params: UpdateParams<any>,
    ) {
      return await response.json();
    },
  },
  updateMany: {
    getEndpoint(params: UpdateManyParams<any>) {
      return `${params.resource}/bulk`;
    },
    getRequestMethod(params: UpdateManyParams<any>) {
      return params.meta?.method ?? "PATCH";
    },
    async buildHeaders(params: UpdateManyParams<any>) {
      return params.meta?.headers ?? {};
    },
    async buildQueryParams(params: UpdateManyParams<any>) {
      const queryParams = {
        ids: params.ids.join(","),
      };

      return params.meta?.query ?? queryParams;
    },
    async buildBodyParams(params: UpdateManyParams<any>) {
      return params.variables;
    },
    async mapResponse(
      response: KyResponse<AnyObject>,
      params: UpdateManyParams<any>,
    ) {
      return await response.json();
    },
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
      response: KyResponse<AnyObject>,
      params: DeleteOneParams<any>,
    ) {
      return await response.json();
    },
  },
  deleteMany: {
    getEndpoint(params: DeleteManyParams<any>) {
      return `${params.resource}/bulk`;
    },
    async buildHeaders(params: DeleteManyParams<any>) {
      return params.meta?.headers ?? {};
    },
    async buildQueryParams(params: DeleteManyParams<any>) {
      const queryParams = {
        ids: params.ids.join(","),
      };

      return params.meta?.query ?? queryParams;
    },
    async mapResponse(
      response: KyResponse<AnyObject>,
      params: DeleteManyParams<any>,
    ) {
      return await response.json();
    },
  },
  custom: {
    async buildQueryParams(params: CustomParams<any>) {
      return params.query;
    },
    async buildHeaders(params: CustomParams<any>) {
      return params.headers ?? {};
    },
    async buildBodyParams(params: CustomParams<any>) {
      return params.payload ?? {};
    },
    async mapResponse(
      response: KyResponse<AnyObject>,
      params: CustomParams<any>,
    ) {
      return await response.json();
    },
  },
  defaultHeaders: {
    "Content-Type": "application/json",
  },
};
