import { getXRay } from "@refinedev/devtools-internal";
import {
  type UseQueryOptions,
  type UseQueryResult,
  useQuery,
} from "@tanstack/react-query";

import { useAuthBindingsContext, useLegacyAuthContext } from "@contexts/auth";
import { useKeys } from "@hooks/useKeys";

import type { PermissionResponse } from "../../../contexts/auth/types";

export type UsePermissionsLegacyProps<
  TData = any,
  TParams extends Record<string, any> = Record<string, any>,
> = {
  v3LegacyAuthProviderCompatible: true;
  options?: UseQueryOptions<TData>;
  params?: TParams;
};

export type UsePermissionsProps<
  TData = PermissionResponse,
  TParams extends Record<string, any> = Record<string, any>,
> = {
  v3LegacyAuthProviderCompatible?: false;
  options?: UseQueryOptions<TData>;
  params?: TParams;
};

export type UsePermissionsCombinedProps<
  TData = any,
  TParams extends Record<string, any> = Record<string, any>,
> = {
  v3LegacyAuthProviderCompatible: boolean;
  options?: UseQueryOptions<TData> | UseQueryOptions<PermissionResponse>;
  params?: TParams;
};

export type UsePermissionsLegacyReturnType<TData = any> = UseQueryResult<
  TData,
  unknown
>;

export type UsePermissionsReturnType<TData = PermissionResponse> =
  UseQueryResult<TData, unknown>;

export type UsePermissionsCombinedReturnType<TData = any> =
  | UseQueryResult<TData, unknown>
  | UseQueryResult<PermissionResponse, unknown>;

export function usePermissions<
  TData = any,
  TParams extends Record<string, any> = Record<string, any>,
>(
  props: UsePermissionsLegacyProps<TData, TParams>,
): UsePermissionsLegacyReturnType<TData>;

export function usePermissions<
  TData = PermissionResponse,
  TParams extends Record<string, any> = Record<string, any>,
>(props?: UsePermissionsProps<TData, TParams>): UsePermissionsReturnType<TData>;

export function usePermissions<
  TData = any,
  TParams extends Record<string, any> = Record<string, any>,
>(
  props?: UsePermissionsCombinedProps<TData, TParams>,
): UsePermissionsCombinedReturnType<TData>;

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
>({
  v3LegacyAuthProviderCompatible = false,
  options,
  params,
}:
  | UsePermissionsProps<TData, TParams>
  | UsePermissionsLegacyProps<TData, TParams> = {}):
  | UsePermissionsReturnType
  | UsePermissionsLegacyReturnType<TData> {
  const { getPermissions: legacyGetPermission } = useLegacyAuthContext();
  const { getPermissions } = useAuthBindingsContext();
  const { keys, preferLegacyKeys } = useKeys();

  const queryResponse = useQuery<TData>({
    queryKey: keys().auth().action("permissions").get(preferLegacyKeys),
    // Enabled check for `getPermissions` is enough to be sure that it's defined in the query function but TS is not smart enough to know that.
    queryFn: (getPermissions
      ? () => getPermissions(params)
      : () => Promise.resolve(undefined)) as (
      params?: unknown,
    ) => Promise<TData>,
    enabled: !v3LegacyAuthProviderCompatible && !!getPermissions,
    ...(v3LegacyAuthProviderCompatible ? {} : options),
    meta: {
      ...(v3LegacyAuthProviderCompatible ? {} : options?.meta),
      ...getXRay("usePermissions", preferLegacyKeys),
    },
  });

  const legacyQueryResponse = useQuery<TData>({
    queryKey: [
      ...keys().auth().action("permissions").get(preferLegacyKeys),
      "v3LegacyAuthProviderCompatible",
    ],
    // Enabled check for `getPermissions` is enough to be sure that it's defined in the query function but TS is not smart enough to know that.
    queryFn: (legacyGetPermission
      ? () => legacyGetPermission(params)
      : () => Promise.resolve(undefined)) as (
      params?: unknown,
    ) => Promise<TData>,
    enabled: v3LegacyAuthProviderCompatible && !!legacyGetPermission,
    ...(v3LegacyAuthProviderCompatible ? options : {}),
    meta: {
      ...(v3LegacyAuthProviderCompatible ? options?.meta : {}),
      ...getXRay("usePermissions", preferLegacyKeys),
    },
  });

  return v3LegacyAuthProviderCompatible ? legacyQueryResponse : queryResponse;
}
