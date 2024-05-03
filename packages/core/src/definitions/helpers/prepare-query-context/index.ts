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
      console.log("with getter prepare");
      return context.signal;
    },
  });

  return queryContext;
};
