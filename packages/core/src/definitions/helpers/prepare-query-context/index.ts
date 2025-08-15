import type { QueryFunctionContext, QueryKey } from "@tanstack/react-query";

type Context =
  | QueryFunctionContext<QueryKey, any>
  | QueryFunctionContext<QueryKey, never>;

export const prepareQueryContext = (
  context: Context,
): Pick<Context, "queryKey" | "signal"> => {
  const queryContext: Pick<Context, "queryKey" | "signal"> = {
    queryKey: context.queryKey,
    signal: undefined as any,
  };

  Object.defineProperty(queryContext, "signal", {
    enumerable: true,
    get: () => {
      return context.signal;
    },
  });

  return queryContext;
};
