import type { QueryFunctionContext, QueryKey } from "@tanstack/react-query";

export const prepareQueryContext = (
  context: QueryFunctionContext<QueryKey, any>,
): Omit<QueryFunctionContext<QueryKey, any>, "meta"> => {
  const queryContext = {
    queryKey: context.queryKey,
    pageParam: context.pageParam ?? undefined,
    signal: context.signal,
    client: context.client,
    direction: context.direction ?? ("forward" as any),
  };

  return queryContext;
};
