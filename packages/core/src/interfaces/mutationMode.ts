import { GetListResponse, GetOneResponse } from "../interfaces";
import { QueryKey } from "react-query";

export type MutationMode = "pessimistic" | "optimistic" | "undoable";

export type QueryResponse = GetListResponse | GetOneResponse;

export type Context = {
    previousQueries: ContextQuery[];
};

export type ContextQuery = {
    query: QueryResponse;
    queryKey: QueryKey;
};
