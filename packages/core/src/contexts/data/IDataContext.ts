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

export type Filters = Record<string, (string | number | boolean)[] | null>;

export interface GetListResponse<TData extends BaseRecord = BaseRecord> {
    data: TData[];
    total: number;
}

export interface CreateResponse {
    data: BaseRecord;
}

export interface UpdateResponse {
    data: BaseRecord;
}

export interface UpdateManyResponse {
    data: BaseRecord[];
}

export interface GetOneResponse<TData extends BaseRecord = BaseRecord> {
    data: TData;
}

export interface GetManyResponse<TData extends BaseRecord = BaseRecord> {
    data: TData[];
}

export interface DeleteOneResponse {
    data: BaseRecord;
}

export interface DeleteManyResponse {
    data: BaseRecord[];
}

export interface IDataContext {
    getList: (
        resource: string,
        params: {
            pagination?: Pagination;
            search?: Search;
            sort?: Sort;
            filters?: Filters;
        },
    ) => Promise<GetListResponse<BaseRecord>>;
    getMany: (
        resource: string,
        ids: Identifier[],
    ) => Promise<GetManyResponse<BaseRecord>>;
    getOne: (resource: string, id: Identifier) => Promise<GetOneResponse>;
    create: <TParams extends BaseRecord = BaseRecord>(
        resource: string,
        params: TParams,
    ) => Promise<CreateResponse>;
    update: <TParams extends BaseRecord = BaseRecord>(
        resource: string,
        id: Identifier,
        params: TParams,
    ) => Promise<UpdateResponse>;
    updateMany: <TParams extends BaseRecord = BaseRecord>(
        resource: string,
        ids: Identifier[],
        params: TParams,
    ) => Promise<UpdateManyResponse>;
    deleteOne: (resource: string, id: Identifier) => Promise<DeleteOneResponse>;
    deleteMany: (
        resource: string,
        ids: Identifier[],
    ) => Promise<DeleteManyResponse>;
    getApiUrl: () => string;
}
