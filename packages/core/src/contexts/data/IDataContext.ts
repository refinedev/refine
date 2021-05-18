import { SorterResult } from "antd/lib/table/interface";

import { BaseRecord, Identifier } from "../../interfaces";

export interface Pagination {
    current?: number;
    pageSize?: number;
}

export type Sort = SorterResult<any> | SorterResult<any>[];

export interface Search {
    field?: string;
    value?: string;
}

// Filters are used as a suffix of a field name:

// | Filter              | Description                    |
// | ------------------- | ------------------------------ |
// | No suffix or `eq`   | Equal                          |
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
    | "null";

export type CrudFilter = {
    field: string;
    operator: CrudOperators;
    value: any;
};

export type CrudFilters = CrudFilter[];

export interface GetListResponse<RecordType = BaseRecord> {
    data: RecordType[];
    total: number;
}

export interface CreateResponse<RecordType = BaseRecord> {
    data: RecordType;
}

export interface CreateManyResponse<RecordType = BaseRecord> {
    data: RecordType[];
}

export interface UpdateResponse<RecordType = BaseRecord> {
    data: RecordType;
}

export interface UpdateManyResponse<RecordType = BaseRecord> {
    data: RecordType[];
}

export interface GetOneResponse<RecordType = BaseRecord> {
    data: RecordType;
}

export interface GetManyResponse<RecordType = BaseRecord> {
    data: RecordType[];
}

export interface DeleteOneResponse<RecordType = BaseRecord> {
    data: RecordType;
}

export interface DeleteManyResponse<RecordType = BaseRecord> {
    data: RecordType[];
}

export interface IDataContext {
    getList: <RecordType extends BaseRecord = BaseRecord>(
        resource: string,
        params: {
            pagination?: Pagination;
            search?: Search;
            sort?: Sort;
            filters?: CrudFilter[];
        },
    ) => Promise<GetListResponse<RecordType>>;
    getMany: <RecordType extends BaseRecord = BaseRecord>(
        resource: string,
        ids: Identifier[],
    ) => Promise<GetManyResponse<RecordType>>;
    getOne: <RecordType extends BaseRecord = BaseRecord>(
        resource: string,
        id: Identifier,
    ) => Promise<GetOneResponse<RecordType>>;
    create: <RecordType extends BaseRecord = BaseRecord>(
        resource: string,
        params: BaseRecord,
    ) => Promise<CreateResponse<RecordType>>;
    createMany: <RecordType extends BaseRecord = BaseRecord>(
        resource: string,
        params: BaseRecord[],
    ) => Promise<CreateManyResponse<RecordType>>;
    update: <RecordType extends BaseRecord = BaseRecord>(
        resource: string,
        id: Identifier,
        params: BaseRecord,
    ) => Promise<UpdateResponse<RecordType>>;
    updateMany: <RecordType extends BaseRecord = BaseRecord>(
        resource: string,
        ids: Identifier[],
        params: BaseRecord,
    ) => Promise<UpdateManyResponse<RecordType>>;
    deleteOne: <RecordType extends BaseRecord = BaseRecord>(
        resource: string,
        id: Identifier,
    ) => Promise<DeleteOneResponse<RecordType>>;
    deleteMany: <RecordType extends BaseRecord = BaseRecord>(
        resource: string,
        ids: Identifier[],
    ) => Promise<DeleteManyResponse<RecordType>>;
    getApiUrl: () => string;
}
