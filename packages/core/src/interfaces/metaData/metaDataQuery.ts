import { QueryFunctionContext } from "@tanstack/react-query";
import { QueryBuilderOptions } from "./queryBuilderOptions";
import { RawQuery } from "./rawQuery";

export type MetaDataQuery = {
    [k: string]: any;
    queryContext?: Omit<QueryFunctionContext, "meta">;
    rawQuery?: RawQuery;
} & QueryBuilderOptions;
