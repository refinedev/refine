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
