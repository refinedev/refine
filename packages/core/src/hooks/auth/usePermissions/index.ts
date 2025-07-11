import { getXRay } from "@refinedev/devtools-internal";
import {
  type QueryObserverResult,
  type UseQueryOptions,
  useQuery,
} from "@tanstack/react-query";

import { useAuthBindingsContext } from "@contexts/auth";
import { useKeys } from "@hooks";

export type UsePermissionsProps<TData = any> = {
  queryOptions?: Omit<UseQueryOptions<TData>, "queryKey" | "queryFn">;
};

export type UsePermissionsReturnType<TData = any> = QueryObserverResult<TData>;

/**
 * `usePermissions` calls `getPermissions` method from {@link https://refine.dev/docs/api-reference/core/providers/auth-provider `authProvider`} under the hood.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/hooks/auth/usePermissions} for more details.
 *
 * @typeParam TData - Result data of the query
 *
 */
export function usePermissions<TData = any>({
  queryOptions,
}: UsePermissionsProps<TData> = {}): UsePermissionsReturnType<TData> {
  const { getPermissions } = useAuthBindingsContext();
  const { keys } = useKeys();

  const queryResponse = useQuery<TData>({
    queryKey: keys().auth().action("permissions").get(),
    queryFn: async ({ signal }) => {
      return (await getPermissions?.({ signal })) as TData;
    },
    retry: false,
    ...queryOptions,
    meta: {
      ...queryOptions?.meta,
      ...getXRay("usePermissions"),
    },
  });

  return queryResponse;
}
