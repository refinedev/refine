export type Identifier = string | number;

export interface BaseRecord {
    id: Identifier;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

export interface Pagination {
    current?: number;
    pageSize?: number;
}

export interface Sort {
    field?: string;
    order?: string;
}

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
    getList: <TData extends BaseRecord = BaseRecord>(
        resource: string,
        params: {
            pagination?: Pagination;
            search?: string;
            sort?: Sort;
            filters?: Record<string, (string | number | boolean)[] | null>;
        },
    ) => Promise<GetListResponse<TData>>;
    getMany: <TData extends BaseRecord = BaseRecord>(
        resource: string,
        ids: Identifier[],
    ) => Promise<GetManyResponse<TData>>;
    getOne: <TData extends BaseRecord = BaseRecord>(
        resource: string,
        id: Identifier,
    ) => Promise<GetOneResponse<TData>>;
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
}
