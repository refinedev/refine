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
import type { KyResponse } from "ky";

export type AnyObject = Record<string, any>;

type GetEndpoint<P> = (params: P) => string;

type BuildQueryParams<P> = (params: P) => Promise<AnyObject>;
type BuildBodyParams<P> = (params: P) => Promise<AnyObject>;
type BuildHeaders<P> = (params: P) => Promise<AnyObject>;

type MapResponse<P, R> = (
  response: KyResponse<unknown>,
  params: P,
) => Promise<R>;

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

    buildBodyParams?: BuildBodyParams<CreateManyParams<any>>;

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
    getRequestMethod?: (params: UpdateParams<any>) => "put" | "patch";
    buildHeaders?: BuildHeaders<UpdateParams>;

    buildQueryParams?: BuildQueryParams<UpdateParams<any>>;

    buildBodyParams?: BuildBodyParams<UpdateParams<any>>;

    mapResponse?: MapResponse<UpdateParams<any>, AnyObject>;
  };
  updateMany?: {
    getEndpoint?: GetEndpoint<UpdateManyParams<any>>;
    getRequestMethod?: (params: UpdateManyParams<any>) => "put" | "patch";
    buildHeaders?: BuildHeaders<UpdateManyParams>;

    buildQueryParams?: BuildQueryParams<UpdateManyParams<any>>;

    buildBodyParams?: BuildBodyParams<UpdateManyParams<any>>;

    mapResponse?: MapResponse<UpdateManyParams<any>, AnyObject | AnyObject[]>;

    /**
     * If `each` is true, it will send a request for each id in the `ids` array.
     * Also, it will call `getRequestMethod`, `buildHeaders`, `buildQueryParams` and `buildBodyParams` for each id.
     * Request URL will be built by calling `getEndpoint` function and appending `/{id}` to it.
     * @default false
     */
    each?: boolean;
  };
  deleteOne?: {
    getEndpoint?: GetEndpoint<DeleteOneParams<any>>;
    buildHeaders?: BuildHeaders<DeleteOneParams<any>>;

    buildQueryParams?: BuildQueryParams<DeleteOneParams<any>>;

    mapResponse?: MapResponse<DeleteOneParams<any>, AnyObject | undefined>;
  };
  deleteMany?: {
    getEndpoint?: GetEndpoint<DeleteManyParams<any>>;
    buildHeaders?: BuildHeaders<DeleteManyParams<any>>;

    buildQueryParams?: BuildQueryParams<DeleteManyParams<any>>;

    mapResponse?: MapResponse<
      DeleteManyParams<any>,
      AnyObject | AnyObject[] | undefined
    >;

    /**
     * If `each` is true, it will send a request for each id in the `ids` array.
     * Also, it will call `buildHeaders`, `buildQueryParams` for each id.
     * Request URL will be built by calling `getEndpoint` function and appending `/{id}` to it.
     * @default false
     */
    each?: boolean;
  };
  custom?: {
    buildHeaders?: BuildHeaders<CustomParams<any>>;

    buildQueryParams?: BuildQueryParams<CustomParams<any>>;

    buildBodyParams?: BuildBodyParams<CustomParams<any>>;

    mapResponse?: MapResponse<CustomParams<any>, AnyObject>;
  };
};
