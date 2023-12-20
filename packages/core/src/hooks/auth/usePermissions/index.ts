import {
    useQuery,
    UseQueryResult,
    UseQueryOptions,
} from "@tanstack/react-query";
import { getXRay } from "@refinedev/devtools-internal";

import { useKeys } from "@hooks/useKeys";

import { useAuthBindingsContext, useLegacyAuthContext } from "@contexts/auth";
import { PermissionResponse } from "../../../interfaces";

export type UsePermissionsLegacyProps<TData = any> = {
    v3LegacyAuthProviderCompatible: true;
    options?: UseQueryOptions<TData>;
};

export type UsePermissionsProps<TData = PermissionResponse> = {
    v3LegacyAuthProviderCompatible?: false;
    options?: UseQueryOptions<TData>;
};

export type UsePermissionsCombinedProps<TData = any> = {
    v3LegacyAuthProviderCompatible: boolean;
    options?: UseQueryOptions<TData> | UseQueryOptions<PermissionResponse>;
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

export function usePermissions<TData = any>(
    props: UsePermissionsLegacyProps<TData>,
): UsePermissionsLegacyReturnType<TData>;

export function usePermissions<TData = PermissionResponse>(
    props?: UsePermissionsProps<TData>,
): UsePermissionsReturnType<TData>;

export function usePermissions<TData = any>(
    props?: UsePermissionsCombinedProps<TData>,
): UsePermissionsCombinedReturnType<TData>;

/**
 * `usePermissions` calls the `getPermissions` method from the {@link https://refine.dev/docs/core/providers/auth-provider `authProvider`} under the hood.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/hooks/auth/usePermissions} for more details.
 *
 * @typeParam TData - Result data of the query
 *
 */
export function usePermissions<TData = any>({
    v3LegacyAuthProviderCompatible = false,
    options,
}: UsePermissionsProps<TData> | UsePermissionsLegacyProps<TData> = {}):
    | UsePermissionsReturnType
    | UsePermissionsLegacyReturnType<TData> {
    const { getPermissions: legacyGetPermission } = useLegacyAuthContext();
    const { getPermissions } = useAuthBindingsContext();
    const { keys, preferLegacyKeys } = useKeys();

    const queryResponse = useQuery<TData>({
        queryKey: keys().auth().action("permissions").get(preferLegacyKeys),
        // Enabled check for `getPermissions` is enough to be sure that it's defined in the query function but TS is not smart enough to know that.
        queryFn:
            (getPermissions as (params?: unknown) => Promise<TData>) ??
            (() => Promise.resolve(undefined)),
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
        queryFn: legacyGetPermission ?? (() => Promise.resolve(undefined)),
        enabled: v3LegacyAuthProviderCompatible && !!legacyGetPermission,
        ...(v3LegacyAuthProviderCompatible ? options : {}),
        meta: {
            ...(v3LegacyAuthProviderCompatible ? options?.meta : {}),
            ...getXRay("usePermissions", preferLegacyKeys),
        },
    });

    return v3LegacyAuthProviderCompatible ? legacyQueryResponse : queryResponse;
}
