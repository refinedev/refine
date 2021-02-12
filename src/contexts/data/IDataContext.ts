type Identifier = string | number;

export interface Record {
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

export interface GetListResponse {
    data: Record[];
    total: number;
}

export interface CreateResponse {
    data: Record;
}

export interface UpdateResponse {
    data: Record;
}

export interface UpdateManyResponse {
    data: Record[];
}

export interface GetOneResponse {
    data: Record;
}

export interface GetManyResponse {
    data: Record[];
}

export interface DeleteOneResponse {
    data: Record;
}

export interface DeleteManyResponse {
    data: Record[];
}

export interface IDataContext {
    getList: (
        resource: string,
        params: {
            pagination?: Pagination;
            search?: string;
            sort?: Sort;
            filter?: object;
        },
    ) => Promise<GetListResponse>;
    getMany: (resource: string, ids: Identifier[]) => Promise<GetManyResponse>;
    getOne: (resource: string, id: Identifier) => Promise<GetOneResponse>;
    deleteOne: (resource: string, id: Identifier) => Promise<DeleteOneResponse>;
    deleteMany: (
        resource: string,
        ids: Identifier[],
    ) => Promise<DeleteManyResponse>;
    create: (resource: string, params: object) => Promise<CreateResponse>;
    update: (
        resource: string,
        id: Identifier,
        params: object,
    ) => Promise<UpdateResponse>;
    updateMany: (
        resource: string,
        ids: Identifier[],
        params: object,
    ) => Promise<UpdateManyResponse>;
}
