import {
    BaseRecord,
    GetListResponse,
    GetOneResponse,
    IQueryKeys,
} from "../interfaces";
import { QueryKey } from "@tanstack/react-query";

export type MutationMode = "pessimistic" | "optimistic" | "undoable";

export type QueryResponse<T = BaseRecord> =
    | GetListResponse<T>
    | GetOneResponse<T>;

export type PreviousQuery<TData> = [QueryKey, TData | unknown];

export type PrevContext<TData> = {
    previousQueries: PreviousQuery<TData>[];
    queryKey: IQueryKeys;
};

export type Context = {
    previousQueries: ContextQuery[];
};

export type ContextQuery<T = BaseRecord> = {
    query: QueryResponse<T>;
    queryKey: QueryKey;
};
