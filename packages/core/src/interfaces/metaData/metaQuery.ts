import { QueryFunctionContext } from "@tanstack/react-query";
import { QueryBuilderOptions } from "./queryBuilderOptions";
import { DocumentNode } from "graphql";

export type MetaQuery = {
    [k: string]: any;
    gqlQuery?: DocumentNode;
    queryContext?: Omit<QueryFunctionContext, "meta">;
} & QueryBuilderOptions;
