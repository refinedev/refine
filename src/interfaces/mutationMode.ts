import { GetListResponse, GetOneResponse, BaseRecord } from "@interfaces";
import { QueryKey } from "react-query";

export type MutationMode = "pessimistic" | "optimistic" | "undoable";

export type ListResponse = GetListResponse<BaseRecord>;
export type IGetOneResponse = GetOneResponse;

export type ListQuery = {
    query: ListResponse;
    queryKey: QueryKey;
};
export type GetOneQuery = {
    query: IGetOneResponse;
    queryKey: QueryKey;
};
export type Context = {
    previousListQueries: ListQuery[];
    previousGetOneQueries?: GetOneQuery[];
};
