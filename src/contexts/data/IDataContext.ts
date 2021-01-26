import { AxiosResponse } from "axios";

export interface GetListParams {
    pagination: {
        page: number;
        perPage: number;
    };
    sort: {
        field: string;
        order: string;
    };
}

export interface IDataContext {
    getList: (
        resource: string,
        params: GetListParams,
    ) => Promise<AxiosResponse<any>>;
}
