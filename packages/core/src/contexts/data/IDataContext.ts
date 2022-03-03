import { BaseRecord, BaseKey, MetaDataQuery } from "../../interfaces";

export interface Pagination {
    current?: number;
    pageSize?: number;
}

// Filters are used as a suffix of a field name:

// | Filter              | Description                    |
// | ------------------- | ------------------------------ |
// | `eq`                | Equal                          |
// | ne                  | Not equal                      |
// | lt                  | Less than                      |
// | gt                  | Greater than                   |
// | lte                 | Less than or equal to          |
// | gte                 | Greater than or equal to       |
// | in                  | Included in an array           |
// | nin                 | Not included in an array       |
// | contains            | Contains                       |
// | ncontains           | Doesn't contain                |
// | containss           | Contains, case sensitive       |
// | ncontainss          | Doesn't contain, case sensitive|
// | null                | Is null or not null            |

export type CrudOperators =
    | "eq"
    | "ne"
    | "lt"
    | "gt"
    | "lte"
    | "gte"
    | "in"
    | "nin"
    | "contains"
    | "ncontains"
    | "containss"
    | "ncontainss"
    | "between"
    | "nbetween"
    | "null"
    | "nnull"
    | "or";

export type LogicalFilter = {
    field: string;
    operator: Exclude<CrudOperators, "or">;
    value: any;
};

export type ConditionalFilter = {
    operator: "or";
    value: LogicalFilter[];
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

export interface IDataContext {
    getList: <TData extends BaseRecord = BaseRecord>(params: {
        resource: string;
        pagination?: Pagination;
        sort?: CrudSorting;
        filters?: CrudFilters;
        metaData?: MetaDataQuery;
    }) => Promise<GetListResponse<TData>>;
    getMany: <TData extends BaseRecord = BaseRecord>(params: {
        resource: string;
        ids: BaseKey[];
        metaData?: MetaDataQuery;
    }) => Promise<GetManyResponse<TData>>;
    getOne: <TData extends BaseRecord = BaseRecord>(params: {
        resource: string;
        id: BaseKey;
        metaData?: MetaDataQuery;
    }) => Promise<GetOneResponse<TData>>;
    create: <TData extends BaseRecord = BaseRecord, TVariables = {}>(params: {
        resource: string;
        variables: TVariables;
        metaData?: MetaDataQuery;
    }) => Promise<CreateResponse<TData>>;
    createMany: <
        TData extends BaseRecord = BaseRecord,
        TVariables = {},
    >(params: {
        resource: string;
        variables: TVariables[];
        metaData?: MetaDataQuery;
    }) => Promise<CreateManyResponse<TData>>;
    update: <TData extends BaseRecord = BaseRecord, TVariables = {}>(params: {
        resource: string;
        id: BaseKey;
        variables: TVariables;
        metaData?: MetaDataQuery;
    }) => Promise<UpdateResponse<TData>>;
    updateMany: <
        TData extends BaseRecord = BaseRecord,
        TVariables = {},
    >(params: {
        resource: string;
        ids: BaseKey[];
        variables: TVariables;
        metaData?: MetaDataQuery;
    }) => Promise<UpdateManyResponse<TData>>;
    deleteOne: <TData extends BaseRecord = BaseRecord>(params: {
        resource: string;
        id: BaseKey;
        metaData?: MetaDataQuery;
    }) => Promise<DeleteOneResponse<TData>>;
    deleteMany: <TData extends BaseRecord = BaseRecord>(params: {
        resource: string;
        ids: BaseKey[];
        metaData?: MetaDataQuery;
    }) => Promise<DeleteManyResponse<TData>>;
    getApiUrl: () => string;
    custom: <TData extends BaseRecord = BaseRecord>(params: {
        url: string;
        method:
            | "get"
            | "delete"
            | "head"
            | "options"
            | "post"
            | "put"
            | "patch";
        sort?: CrudSorting;
        filters?: CrudFilter[];
        payload?: {};
        query?: {};
        headers?: {};
        metaData?: MetaDataQuery;
    }) => Promise<CustomResponse<TData>>;
}

export interface IDataContextProvider {
    getList: <TData extends BaseRecord = BaseRecord>(params: {
        resource: string;
        pagination?: Pagination;
        sort?: CrudSorting;
        filters?: CrudFilters;
        metaData?: MetaDataQuery;
        dataProviderName?: string;
    }) => Promise<GetListResponse<TData>>;
    getMany: <TData extends BaseRecord = BaseRecord>(params: {
        resource: string;
        ids: BaseKey[];
        metaData?: MetaDataQuery;
        dataProviderName?: string;
    }) => Promise<GetManyResponse<TData>>;
    getOne: <TData extends BaseRecord = BaseRecord>(params: {
        resource: string;
        id: BaseKey;
        metaData?: MetaDataQuery;
    }) => Promise<GetOneResponse<TData>>;
    create: <TData extends BaseRecord = BaseRecord, TVariables = {}>(params: {
        resource: string;
        variables: TVariables;
        metaData?: MetaDataQuery;
    }) => Promise<CreateResponse<TData>>;
    createMany: <
        TData extends BaseRecord = BaseRecord,
        TVariables = {},
    >(params: {
        resource: string;
        variables: TVariables[];
        metaData?: MetaDataQuery;
    }) => Promise<CreateManyResponse<TData>>;
    update: <TData extends BaseRecord = BaseRecord, TVariables = {}>(params: {
        resource: string;
        id: BaseKey;
        variables: TVariables;
        metaData?: MetaDataQuery;
    }) => Promise<UpdateResponse<TData>>;
    updateMany: <
        TData extends BaseRecord = BaseRecord,
        TVariables = {},
    >(params: {
        resource: string;
        ids: BaseKey[];
        variables: TVariables;
        metaData?: MetaDataQuery;
    }) => Promise<UpdateManyResponse<TData>>;
    deleteOne: <TData extends BaseRecord = BaseRecord>(params: {
        resource: string;
        id: BaseKey;
        metaData?: MetaDataQuery;
    }) => Promise<DeleteOneResponse<TData>>;
    deleteMany: <TData extends BaseRecord = BaseRecord>(params: {
        resource: string;
        ids: BaseKey[];
        metaData?: MetaDataQuery;
    }) => Promise<DeleteManyResponse<TData>>;
    getApiUrl: () => string;
    custom?: <TData extends BaseRecord = BaseRecord>(params: {
        url: string;
        method:
            | "get"
            | "delete"
            | "head"
            | "options"
            | "post"
            | "put"
            | "patch";
        sort?: CrudSorting;
        filters?: CrudFilter[];
        payload?: {};
        query?: {};
        headers?: {};
        metaData?: MetaDataQuery;
    }) => Promise<CustomResponse<TData>>;
}

export interface IDataMultipleContextProvider {
    default?: IDataContextProvider;
    [key: string]: IDataContextProvider | any;
}
