import { SorterResult } from "antd/lib/table/interface";

export type Identifier = string | number;

export interface BaseRecord {
    id: Identifier;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

export interface Params {
    [key: string]: any;
}

export interface Pagination {
    current?: number;
    pageSize?: number;
}

export type Sort = SorterResult<any> | SorterResult<any>[];

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

export interface GetOneResponse {
    data: BaseRecord;
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
            search?: string;
            sort?: Sort;
            filters?: Filters;
            fields?: string[];
        },
        fields?: string[],
    ) => Promise<GetListResponse>;
    getMany: (resource: string, ids: Identifier[]) => Promise<GetManyResponse>;
    getOne: (
        resource: string,
        id: Identifier,
        fields?: string[],
    ) => Promise<GetOneResponse>;
    create: (resource: string, params: Params) => Promise<CreateResponse>;
    update: (
        resource: string,
        id: Identifier,
        params: Params,
    ) => Promise<UpdateResponse>;
    updateMany: (
        resource: string,
        ids: Identifier[],
        params: Params,
    ) => Promise<UpdateManyResponse>;
    deleteOne: (resource: string, id: Identifier) => Promise<DeleteOneResponse>;
    deleteMany: (
        resource: string,
        ids: Identifier[],
    ) => Promise<DeleteManyResponse>;
    getApiUrl?: () => string;
}
