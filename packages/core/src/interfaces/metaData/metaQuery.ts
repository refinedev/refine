import { QueryFunctionContext } from "@tanstack/react-query";
import { QueryBuilderOptions } from "./queryBuilderOptions";
import type { DocumentNode } from "graphql";

export type MetaQuery = {
    [k: string]: any;
    gqlQuery?: DocumentNode;
    gqlMutation?: DocumentNode;
    queryContext?: Omit<QueryFunctionContext, "meta">;
} & QueryBuilderOptions;
