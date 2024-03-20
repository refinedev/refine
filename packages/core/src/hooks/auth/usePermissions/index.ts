import { getXRay } from "@refinedev/devtools-internal";
import {
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from "@tanstack/react-query";

import { useAuthBindingsContext, useLegacyAuthContext } from "@contexts/auth";
import { useKeys } from "@hooks/useKeys";

export type UsePermissionsProps<TData, TParams> = {
  v3LegacyAuthProviderCompatible?: boolean;
  options?: UseQueryOptions<TData>;
  params?: TParams;
};

export type UsePermissionsReturnType<TData> = UseQueryResult<TData>;

/**
 * `usePermissions` calls the `getPermissions` method from the {@link https://refine.dev/docs/core/providers/auth-provider `authProvider`} under the hood.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/hooks/auth/usePermissions} for more details.
 *
 * @typeParam TData - Result data of the query
 *
 * @typeParam TParams - Params will be passed to the `getPermissions` method of {@link https://refine.dev/docs/core/providers/auth-provider `authProvider`}.
 *
 */
export function usePermissions<
  TData = any,
  TParams extends Record<string, any> = Record<string, any>,
>(
  props?: UsePermissionsProps<TData, TParams>,
): UsePermissionsReturnType<TData> {
  const {
    v3LegacyAuthProviderCompatible = false,
    options,
    params = {},
  } = props ?? {};

  const { getPermissions: legacyGetPermissions } = useLegacyAuthContext();
  const { getPermissions } = useAuthBindingsContext();
  const { keys, preferLegacyKeys } = useKeys();

  const queryKey = keys().auth().action("permissions").get(preferLegacyKeys);

  const xRay = getXRay("usePermissions", preferLegacyKeys);

  const queryEnabled = !v3LegacyAuthProviderCompatible && !!getPermissions;

  const legacyQueryEnabled =
    v3LegacyAuthProviderCompatible && !!legacyGetPermissions;

  const queryResponse = useQuery({
    queryKey,
    enabled: queryEnabled,
    queryFn: async () => getPermissions?.(params),
    ...options,
    meta: {
      ...options?.meta,
      ...xRay,
    },
  });

  const legacyQueryResponse = useQuery<TData>({
    queryKey: [...queryKey, "v3LegacyAuthProviderCompatible"],
    queryFn: async () => legacyGetPermissions?.(params),
    enabled: legacyQueryEnabled,
    ...options,
    meta: {
      ...options?.meta,
      ...xRay,
    },
  });

  return v3LegacyAuthProviderCompatible ? legacyQueryResponse : queryResponse;
}
