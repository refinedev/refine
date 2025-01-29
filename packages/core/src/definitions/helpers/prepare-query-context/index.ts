import type { QueryFunctionContext, QueryKey } from "@tanstack/react-query";

export const prepareQueryContext = (
  context: QueryFunctionContext<QueryKey, any>,
): Omit<QueryFunctionContext<QueryKey, any>, "meta"> => {
  const queryContext = {
    queryKey: context.queryKey,
    pageParam: context.pageParam,
  };

  Object.defineProperty(queryContext, "signal", {
    enumerable: true,
    get: () => {
      return context.signal;
    },
  });

  Object.defineProperty(queryContext, "direction", {
    enumerable: true,
    get: () => {
      return context.direction;
    },
  });
  return queryContext as QueryFunctionContext<QueryKey, any>;
};
