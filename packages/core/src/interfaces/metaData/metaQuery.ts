import { QueryFunctionContext } from "@tanstack/react-query";
import { QueryBuilderOptions } from "./queryBuilderOptions";
import { GraphQLQueryOptions } from "./graphqlQueryOptions";

export type MetaQuery = {
  [k: string]: any;
  queryContext?: Omit<QueryFunctionContext, "meta">;
} & QueryBuilderOptions &
  GraphQLQueryOptions;
