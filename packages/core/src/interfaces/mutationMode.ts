import { BaseRecord, GetListResponse, GetOneResponse } from "../interfaces";
import { QueryKey } from "react-query";

export type MutationMode = "pessimistic" | "optimistic" | "undoable";

export type QueryResponse<T = BaseRecord> =
    | GetListResponse<T>
    | GetOneResponse<T>;

// export type PreviousQuery<TData> = {
//     previousQuery: PreviousQueries<TData>;
// };

export type PreviousQuery<TData> = IPreviousQuery<TData>[];

export interface IPreviousQuery<TData> {
    queryKey: QueryKey;
    data: TData | unknown;
}

export type Context = {
    previousQueries: ContextQuery[] | any;
};
export type PrevContext<TData> = {
    previousQueries: PreviousQuery<TData>[];
};

export type ContextQuery<T = BaseRecord> = {
    query: QueryResponse<T>;
    queryKey: QueryKey;
};
