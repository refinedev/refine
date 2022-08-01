import { QueryFunctionContext } from "@tanstack/react-query";
import { QueryBuilderOptions } from "./queryBuilderOptions";

export type MetaDataQuery = {
    [k: string]: any;
    queryContext?: Omit<QueryFunctionContext, "meta">;
} & QueryBuilderOptions;
