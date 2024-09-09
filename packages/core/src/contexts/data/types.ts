import type { QueryFunctionContext, QueryKey } from "@tanstack/react-query";
import type { DocumentNode } from "graphql";

import type { UseListConfig } from "../../hooks/data/useList";

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type BaseKey = string | number;
export type BaseRecord = {
  id?: BaseKey;
  [key: string]: any;
};
export type BaseOption = {
  label: any;
  value: any;
};

/**
 * @deprecated Use `BaseOption` instead.
 */
export interface Option extends BaseOption {}

export type NestedField = {
  operation: string;
  variables: QueryBuilderOptions[];
  fields: Fields;
};

export type Fields = Array<string | object | NestedField>;

export type VariableOptions =
  | {
      type?: string;
      name?: string;
      value: any;
      list?: boolean;
      required?: boolean;
    }
  | { [k: string]: any };

export interface QueryBuilderOptions {
  operation?: string;
  fields?: Fields;
  variables?: VariableOptions;
}

export type GraphQLQueryOptions = {
  /**
   * @description GraphQL query to be used by data providers.
   * @optional
   * @example
   * ```tsx
   * import gql from 'graphql-tag'
   * import { useOne } from '@refinedev/core'
   *
   * const PRODUCT_QUERY = gql`
   *   query GetProduct($id: ID!) {
   *     product(id: $id) {
   *       id
   *       name
   *     }
   *   }
   * `
   *
   * useOne({
   *   id: 1,
   *   meta: { gqlQuery: PRODUCT_QUERY }
   * })
   * ```
   */
  gqlQuery?: DocumentNode;
  /**
   * @description GraphQL mutation to be used by data providers.
   * @optional
   * @example
   * ```tsx
   * import gql from 'graphql-tag'
   * import { useCreate } from '@refinedev/core'
   *
   * const PRODUCT_CREATE_MUTATION = gql`
   *   mutation CreateProduct($input: CreateOneProductInput!) {
   *     createProduct(input: $input) {
   *       id
   *       name
   *     }
   *   }
   * `
   * const { mutate } = useCreate()
   *
   * mutate({
   *   values: { name: "My Product" },
   *   meta: { gqlQuery: PRODUCT_QUERY }
   * })
   * ```
   */
  gqlMutation?: DocumentNode;

  /**
   * @description GraphQL Variables to be used for more advanced query filters by data providers. If filters correspond to table columns,
   *  these variables will not be presented in the initial filters selected and will not be reset or set by table column filtering.
   * @optional
   * @example
   * ```tsx
   * import gql from "graphql-tag";
   * import { useTable } from "@refinedev/antd";
   * import type { GetFieldsFromList } from "@refinedev/hasura";
   * import type { GetPostsQuery } from "graphql/types";
   *
   *    const POSTS_QUERY = gql`
   *      query GetPosts(
   *          $offset: Int!
   *          $limit: Int!
   *          $order_by: [posts_order_by!]
   *          $where: posts_bool_exp
   *      ) {
   *          posts(
   *              offset: $offset
   *              limit: $limit
   *              order_by: $order_by
   *              where: $where
   *          ) {
   *              id
   *              title
   *              category {
   *                  id
   *                  title
   *              }
   *          }
   *          posts_aggregate(where: $where) {
   *              aggregate {
   *                  count
   *              }
   *          }
   *      } `;
   *
   *
   *   export const PostList = () => {
   *     const { tableProps } = useTable<
   *       GetFieldsFromList<GetPostsQuery>
   *     >({
   *       meta: {
   *         gqlQuery: POSTS_QUERY,
   *         gqlVariables: {
   *           where: {
   *             _and: [
   *               {
   *                 title: {
   *                   _ilike: "%Updated%",
   *                 },
   *               },
   *               {
   *                 created_at: {
   *                   _gte: "2023-08-04T08:26:26.489116+00:00"
   *                 }
   *               }
   *             ],
   *           },
   *         },
   *       }
   *     });
   *    return ( <Table {...tableProps}/>);
   *  }
   *
   * ```
   */
  gqlVariables?: {
    [key: string]: any;
  };
};

export type MetaQuery = {
  [k: string]: any;
  queryContext?: Omit<QueryFunctionContext, "meta">;
} & QueryBuilderOptions &
  GraphQLQueryOptions;

export interface Pagination {
  /**
   * Initial page index
   * @default 1
   */
  current?: number;
  /**
   * Initial number of items per page
   * @default 10
   */
  pageSize?: number;
  /**
   * Whether to use server side pagination or not.
   * @default "server"
   */
  mode?: "client" | "server" | "off";
}

/**
 * @deprecated `MetaDataQuery` is deprecated with refine@4, use `MetaQuery` instead, however, we still support `MetaDataQuery` for backward compatibility.
 */
export type MetaDataQuery = {
  [k: string]: any;
  queryContext?: Omit<QueryFunctionContext, "meta">;
} & QueryBuilderOptions;

export interface IQueryKeys {
  all: QueryKey;
  resourceAll: QueryKey;
  list: (
    config?:
      | UseListConfig
      | {
          pagination?: Required<Pagination>;
          hasPagination?: boolean;
          sorters?: CrudSort[];
          filters?: CrudFilter[];
        }
      | undefined,
  ) => QueryKey;
  many: (ids?: BaseKey[]) => QueryKey;
  detail: (id?: BaseKey) => QueryKey;
  logList: (meta?: Record<number | string, any>) => QueryKey;
}

export interface ValidationErrors {
  [field: string]:
    | string
    | string[]
    | boolean
    | { key: string; message: string };
}

export interface HttpError extends Record<string, any> {
  message: string;
  statusCode: number;
  errors?: ValidationErrors;
}

export type RefineError = HttpError;

export type MutationMode = "pessimistic" | "optimistic" | "undoable";

export type QueryResponse<T = BaseRecord> =
  | GetListResponse<T>
  | GetOneResponse<T>;

export type PreviousQuery<TData> = [QueryKey, TData | unknown];

export type PrevContext<TData> = {
  previousQueries: PreviousQuery<TData>[];
  /**
   * @deprecated `QueryKeys` is deprecated in favor of `keys`. Please use `keys` instead to construct query keys for queries and mutations.
   */
  queryKey: IQueryKeys;
};

export type Context = {
  previousQueries: ContextQuery[];
};

export type ContextQuery<T = BaseRecord> = {
  query: QueryResponse<T>;
  queryKey: QueryKey;
};

// Filters are used as a suffix of a field name:

// | Filter              | Description                       |
// | ------------------- | --------------------------------- |
// | `eq`                | Equal                             |
// | ne                  | Not equal                         |
// | lt                  | Less than                         |
// | gt                  | Greater than                      |
// | lte                 | Less than or equal to             |
// | gte                 | Greater than or equal to          |
// | in                  | Included in an array              |
// | nin                 | Not included in an array          |
// | contains            | Contains                          |
// | ncontains           | Doesn't contain                   |
// | containss           | Contains, case sensitive          |
// | ncontainss          | Doesn't contain, case sensitive   |
// | null                | Is null or not null               |
// | startswith          | Starts with                       |
// | nstartswith         | Doesn't start with                |
// | startswiths         | Starts with, case sensitive       |
// | nstartswiths        | Doesn't start with, case sensitive|
// | endswith            | Ends with                         |
// | nendswith           | Doesn't end with                  |
// | endswiths           | Ends with, case sensitive         |
// | nendswiths          | Doesn't end with, case sensitive  |
export type CrudOperators =
  | "eq"
  | "ne"
  | "lt"
  | "gt"
  | "lte"
  | "gte"
  | "in"
  | "nin"
  | "ina"
  | "nina"
  | "contains"
  | "ncontains"
  | "containss"
  | "ncontainss"
  | "between"
  | "nbetween"
  | "null"
  | "nnull"
  | "startswith"
  | "nstartswith"
  | "startswiths"
  | "nstartswiths"
  | "endswith"
  | "nendswith"
  | "endswiths"
  | "nendswiths"
  | "or"
  | "and";

export type SortOrder = "desc" | "asc" | null;

export type LogicalFilter = {
  field: string;
  operator: Exclude<CrudOperators, "or" | "and">;
  value: any;
};

export type ConditionalFilter = {
  key?: string;
  operator: Extract<CrudOperators, "or" | "and">;
  value: (LogicalFilter | ConditionalFilter)[];
};

export type CrudFilter = LogicalFilter | ConditionalFilter;
export type CrudSort = {
  field: string;
  order: "asc" | "desc";
};

export type CrudFilters = CrudFilter[];
export type CrudSorting = CrudSort[];

export interface CustomResponse<TData = BaseRecord> {
  data: TData;
}
export interface GetListResponse<TData = BaseRecord> {
  data: TData[];
  total: number;
  [key: string]: any;
}

export interface CreateResponse<TData = BaseRecord> {
  data: TData;
}

export interface CreateManyResponse<TData = BaseRecord> {
  data: TData[];
}

export interface UpdateResponse<TData = BaseRecord> {
  data: TData;
}

export interface UpdateManyResponse<TData = BaseRecord> {
  data: TData[];
}

export interface GetOneResponse<TData = BaseRecord> {
  data: TData;
}

export interface GetManyResponse<TData = BaseRecord> {
  data: TData[];
}

export interface DeleteOneResponse<TData = BaseRecord> {
  data: TData;
}

export interface DeleteManyResponse<TData = BaseRecord> {
  data: TData[];
}

export interface GetListParams {
  resource: string;
  pagination?: Pagination;
  /**
   * @deprecated `hasPagination` is deprecated, use `pagination.mode` instead.
   */
  hasPagination?: boolean;
  /**
   * @deprecated `sort` is deprecated, use `sorters` instead.
   */
  sort?: CrudSort[];
  sorters?: CrudSort[];
  filters?: CrudFilter[];
  meta?: MetaQuery;
  /**
   * @deprecated `metaData` is deprecated with refine@4, refine will pass `meta` instead, however, we still support `metaData` for backward compatibility.
   */
  metaData?: MetaQuery;
  dataProviderName?: string;
}

export interface GetManyParams {
  resource: string;
  ids: BaseKey[];
  meta?: MetaQuery;
  /**
   * @deprecated `metaData` is deprecated with refine@4, refine will pass `meta` instead, however, we still support `metaData` for backward compatibility.
   */
  metaData?: MetaQuery;
  dataProviderName?: string;
}

export interface GetOneParams {
  resource: string;
  id: BaseKey;
  meta?: MetaQuery;
  /**
   * @deprecated `metaData` is deprecated with refine@4, refine will pass `meta` instead, however, we still support `metaData` for backward compatibility.
   */
  metaData?: MetaQuery;
}

export interface CreateParams<TVariables = {}> {
  resource: string;
  variables: TVariables;
  meta?: MetaQuery;
  /**
   * @deprecated `metaData` is deprecated with refine@4, refine will pass `meta` instead, however, we still support `metaData` for backward compatibility.
   */
  metaData?: MetaQuery;
}

export interface CreateManyParams<TVariables = {}> {
  resource: string;
  variables: TVariables[];
  meta?: MetaQuery;
  /**
   * @deprecated `metaData` is deprecated with refine@4, refine will pass `meta` instead, however, we still support `metaData` for backward compatibility.
   */
  metaData?: MetaQuery;
}

export interface UpdateParams<TVariables = {}> {
  resource: string;
  id: BaseKey;
  variables: TVariables;
  meta?: MetaQuery;
  /**
   * @deprecated `metaData` is deprecated with refine@4, refine will pass `meta` instead, however, we still support `metaData` for backward compatibility.
   */
  metaData?: MetaQuery;
}

export interface UpdateManyParams<TVariables = {}> {
  resource: string;
  ids: BaseKey[];
  variables: TVariables;
  meta?: MetaQuery;
  /**
   * @deprecated `metaData` is deprecated with refine@4, refine will pass `meta` instead, however, we still support `metaData` for backward compatibility.
   */
  metaData?: MetaQuery;
}

export interface DeleteOneParams<TVariables = {}> {
  resource: string;
  id: BaseKey;
  variables?: TVariables;
  meta?: MetaQuery;
  /**
   * @deprecated `metaData` is deprecated with refine@4, refine will pass `meta` instead, however, we still support `metaData` for backward compatibility.
   */
  metaData?: MetaQuery;
}

export interface DeleteManyParams<TVariables = {}> {
  resource: string;
  ids: BaseKey[];
  variables?: TVariables;
  meta?: MetaQuery;
  /**
   * @deprecated `metaData` is deprecated with refine@4, refine will pass `meta` instead, however, we still support `metaData` for backward compatibility.
   */
  metaData?: MetaQuery;
}

export interface CustomParams<TQuery = unknown, TPayload = unknown> {
  url: string;
  method: "get" | "delete" | "head" | "options" | "post" | "put" | "patch";
  /**
   * @deprecated `sort` is deprecated, use `sorters` instead.
   */
  sort?: CrudSort[];
  sorters?: CrudSort[];
  filters?: CrudFilter[];
  payload?: TPayload;
  query?: TQuery;
  headers?: {};
  meta?: MetaQuery;
  /**
   * @deprecated `metaData` is deprecated with refine@4, refine will pass `meta` instead, however, we still support `metaData` for backward compatibility.
   */
  metaData?: MetaQuery;
}

export type DataProvider = {
  getList: <TData extends BaseRecord = BaseRecord>(
    params: GetListParams,
  ) => Promise<GetListResponse<TData>>;

  getMany?: <TData extends BaseRecord = BaseRecord>(
    params: GetManyParams,
  ) => Promise<GetManyResponse<TData>>;

  getOne: <TData extends BaseRecord = BaseRecord>(
    params: GetOneParams,
  ) => Promise<GetOneResponse<TData>>;

  create: <TData extends BaseRecord = BaseRecord, TVariables = {}>(
    params: CreateParams<TVariables>,
  ) => Promise<CreateResponse<TData>>;

  createMany?: <TData extends BaseRecord = BaseRecord, TVariables = {}>(
    params: CreateManyParams<TVariables>,
  ) => Promise<CreateManyResponse<TData>>;

  update: <TData extends BaseRecord = BaseRecord, TVariables = {}>(
    params: UpdateParams<TVariables>,
  ) => Promise<UpdateResponse<TData>>;

  updateMany?: <TData extends BaseRecord = BaseRecord, TVariables = {}>(
    params: UpdateManyParams<TVariables>,
  ) => Promise<UpdateManyResponse<TData>>;

  deleteOne: <TData extends BaseRecord = BaseRecord, TVariables = {}>(
    params: DeleteOneParams<TVariables>,
  ) => Promise<DeleteOneResponse<TData>>;

  deleteMany?: <TData extends BaseRecord = BaseRecord, TVariables = {}>(
    params: DeleteManyParams<TVariables>,
  ) => Promise<DeleteManyResponse<TData>>;

  getApiUrl: () => string;

  custom?: <
    TData extends BaseRecord = BaseRecord,
    TQuery = unknown,
    TPayload = unknown,
  >(
    params: CustomParams<TQuery, TPayload>,
  ) => Promise<CustomResponse<TData>>;
};

export type DataProviders = {
  default: DataProvider;
  [key: string]: DataProvider;
};

export type IDataContext = DataProviders;

export type DataBindings = DataProvider | DataProviders;
