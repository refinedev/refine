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

export interface GetOneResponse {
    data: Record;
}

export interface DeleteOneResponse {
    data: Record;
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
    getOne: (resource: string, id: Identifier) => Promise<GetOneResponse>;
    deleteOne: (resource: string, id: Identifier) => Promise<DeleteOneResponse>;
    create: (resource: string, params: object) => Promise<CreateResponse>;
    update: (
        resource: string,
        id: Identifier,
        params: object,
    ) => Promise<UpdateResponse>;
}
