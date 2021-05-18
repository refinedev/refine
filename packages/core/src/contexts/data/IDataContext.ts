import { SorterResult } from "antd/lib/table/interface";

import { BaseRecord, HttpError, Identifier } from "../../interfaces";

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

export interface GetListResponse<RecordType = BaseRecord> {
    data: RecordType[];
    total: number;
}

export interface CreateResponse<TData = BaseRecord> {
    data: TData;
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
            filters?: Filters;
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
    create: <TData extends BaseRecord = BaseRecord, TVariables = {}>(
        resource: string,
        params: TVariables,
    ) => Promise<CreateResponse<TData>>;
    createMany: <TData extends BaseRecord = BaseRecord, TVariables = {}>(
        resource: string,
        params: TVariables[],
    ) => Promise<CreateManyResponse<TData>>;
    update: <TData extends BaseRecord = BaseRecord, TVariables = {}>(
        resource: string,
        id: Identifier,
        params: TVariables,
    ) => Promise<UpdateResponse<TData>>;
    updateMany: <TData extends BaseRecord = BaseRecord, TVariables = {}>(
        resource: string,
        ids: Identifier[],
        params: TVariables,
    ) => Promise<UpdateManyResponse<TData>>;
    deleteOne: <TData extends BaseRecord = BaseRecord>(
        resource: string,
        id: Identifier,
    ) => Promise<DeleteOneResponse<TData>>;
    deleteMany: <TData extends BaseRecord = BaseRecord>(
        resource: string,
        ids: Identifier[],
    ) => Promise<DeleteManyResponse<TData>>;
    getApiUrl: () => string;
}
