import { BaseRecord, GetListResponse, GetOneResponse } from "../interfaces";
import { QueryKey } from "react-query";

export type MutationMode = "pessimistic" | "optimistic" | "undoable";

export type QueryResponse<T = BaseRecord> =
    | GetListResponse<T>
    | GetOneResponse<T>;

export type Context = {
    previousQueries: ContextQuery[];
};

export type ContextQuery<T = BaseRecord> = {
    query: QueryResponse<T>;
    queryKey: QueryKey;
};
