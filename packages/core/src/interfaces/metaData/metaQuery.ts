import { QueryFunctionContext } from "@tanstack/react-query";
import { QueryBuilderOptions } from "./queryBuilderOptions";

export type MetaQuery = {
    [k: string]: any;
    queryContext?: Omit<QueryFunctionContext, "meta">;
} & QueryBuilderOptions;
