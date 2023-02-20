import { QueryFunctionContext } from "@tanstack/react-query";
import { QueryBuilderOptions } from "./queryBuilderOptions";

/**
 * @deprecated `MetaDataQuery` is deprecated with refine@4, use `MetaQuery` instead, however, we still support `MetaDataQuery` for backward compatibility.
 */
export type MetaDataQuery = {
    [k: string]: any;
    queryContext?: Omit<QueryFunctionContext, "meta">;
} & QueryBuilderOptions;
