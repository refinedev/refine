type Identifier = string | number;

export interface Record {
    id: Identifier;
    [key: string]: any;
}

export interface Pagination {
    current: number;
    pageSize: number;
}

export interface GetListResponse {
    data: Record[];
    total: number;
}

export interface IDataContext {
    getList: (
        resource: string,
        params: {
            pagination: Pagination;
        },
    ) => Promise<GetListResponse>;
}
