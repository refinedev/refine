import type {
  CreateParams,
  CreateManyParams,
  GetOneParams,
  GetListParams,
  GetManyParams,
  UpdateParams,
  UpdateManyParams,
  DeleteOneParams,
  DeleteManyParams,
  CustomParams,
} from "@refinedev/core";
import type { QueryStringAddon } from "wretch/addons/queryString";
import type {
  WretchResponse,
  ConfiguredMiddleware,
  Wretch,
} from "wretch/types";

export type GlobalMiddleware = (
  client: QueryStringAddon & Wretch<QueryStringAddon, unknown, undefined>,
) => ConfiguredMiddleware;

type AnyObject = Record<string, any>;

type GetEndpoint<P> = (params: P) => string;

type BuildQueryParams<P> = (params: P) => Promise<AnyObject>;
type BuildBodyParams<P> = (params: P) => Promise<AnyObject>;
type BuildHeaders<P> = (params: P) => Promise<AnyObject>;

type MapResponse<P, R> = (response: WretchResponse, params: P) => Promise<R>;

export type CreateDataProviderOptions = {
  getList?: {
    getEndpoint?: GetEndpoint<GetListParams>;
    buildHeaders?: BuildHeaders<GetListParams>;

    buildFilters?: BuildQueryParams<GetListParams>;
    buildSorters?: BuildQueryParams<GetListParams>;
    buildPagination?: BuildQueryParams<GetListParams>;
    buildQueryParams?: BuildQueryParams<GetListParams>;

    mapResponse?: MapResponse<GetListParams, any[]>;
    getTotalCount?: MapResponse<GetListParams, number>;
  };
  create?: {
    getEndpoint?: GetEndpoint<CreateParams<any>>;
    buildHeaders?: BuildHeaders<CreateParams<any>>;

    buildQueryParams?: BuildQueryParams<CreateParams<any>>;

    buildBodyParams?: BuildBodyParams<CreateParams<any>>;

    mapResponse?: MapResponse<CreateParams<any>, AnyObject>;
  };
  createMany?: {
    getEndpoint?: GetEndpoint<CreateManyParams<any>>;
    buildHeaders?: BuildHeaders<CreateManyParams<any>>;

    buildQueryParams?: BuildQueryParams<CreateManyParams<any>>;

    mapResponse?: MapResponse<CreateManyParams<any>, AnyObject[]>;
  };
  getOne?: {
    getEndpoint?: GetEndpoint<GetOneParams>;
    buildHeaders?: BuildHeaders<GetOneParams>;

    buildQueryParams?: BuildQueryParams<GetOneParams>;

    mapResponse?: MapResponse<GetOneParams, any>;
  };
  getMany?: {
    getEndpoint?: GetEndpoint<GetManyParams>;
    buildHeaders?: BuildHeaders<GetManyParams>;

    buildQueryParams?: BuildQueryParams<GetManyParams>;

    mapResponse?: MapResponse<GetManyParams, AnyObject[]>;
  };
  update?: {
    getEndpoint?: GetEndpoint<UpdateParams<any>>;
    getRequestMethod?: (params: UpdateParams<any>) => "PUT" | "PATCH";
    buildHeaders?: BuildHeaders<UpdateParams>;

    buildQueryParams?: BuildQueryParams<UpdateParams<any>>;

    buildBodyParams?: BuildBodyParams<UpdateParams<any>>;

    mapResponse?: MapResponse<UpdateParams<any>, AnyObject>;
  };
  updateMany?: {
    getEndpoint?: GetEndpoint<UpdateManyParams<any>>;
    getRequestMethod?: (params: UpdateManyParams<any>) => "PUT" | "PATCH";
    buildHeaders?: BuildHeaders<UpdateManyParams>;

    buildQueryParams?: BuildQueryParams<UpdateManyParams<any>>;

    mapResponse?: MapResponse<UpdateManyParams<any>, AnyObject[]>;
  };
  deleteOne?: {
    getEndpoint?: GetEndpoint<DeleteOneParams<any>>;
    buildHeaders?: BuildHeaders<DeleteOneParams<any>>;

    buildQueryParams?: BuildQueryParams<DeleteOneParams<any>>;

    mapResponse?: MapResponse<DeleteOneParams<any>, AnyObject>;
  };
  deleteMany?: {
    getEndpoint?: GetEndpoint<DeleteManyParams<any>>;
    buildHeaders?: BuildHeaders<DeleteManyParams<any>>;

    buildQueryParams?: BuildQueryParams<DeleteManyParams<any>>;

    mapResponse?: MapResponse<DeleteManyParams<any>, AnyObject[]>;
  };
  custom?: {
    buildHeaders?: BuildHeaders<CustomParams<any>>;

    buildQueryParams?: BuildQueryParams<CustomParams<any>>;

    buildBodyParams?: BuildBodyParams<CustomParams<any>>;

    mapResponse?: MapResponse<CustomParams<any>, AnyObject>;
  };
  middlewares?: {
    global?: GlobalMiddleware[];
  };
  defaultHeaders?: Record<string, string>;
};
