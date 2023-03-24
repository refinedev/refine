import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { useAuthBindingsContext, useLegacyAuthContext } from "@contexts/auth";
import { CheckResponse } from "../../../interfaces";

export type UseIsAuthenticatedLegacyProps = {
    v3LegacyAuthProviderCompatible: true;
    params?: any;
};

export type UseIsAuthenticatedProps = {
    v3LegacyAuthProviderCompatible?: false;
    params?: any;
};

export type UseIsAuthenticatedCombinedProps = {
    v3LegacyAuthProviderCompatible: boolean;
    params?: any;
};

export type UseIsAuthenticatedLegacyReturnType = UseQueryResult<any, any>;

export type UseIsAuthenticatedReturnType = UseQueryResult<CheckResponse, any>;

export type UseIsAuthenticatedCombinedReturnType = UseQueryResult<
    CheckResponse | any,
    any
>;

export function useIsAuthenticated(
    props: UseIsAuthenticatedLegacyProps,
): UseIsAuthenticatedLegacyReturnType;

export function useIsAuthenticated(
    props?: UseIsAuthenticatedProps,
): UseIsAuthenticatedReturnType;

export function useIsAuthenticated(
    props?: UseIsAuthenticatedCombinedProps,
): UseIsAuthenticatedCombinedReturnType;

/**
 *  `useIsAuthenticated` calls the `checkAuth` method from the {@link https://refine.dev/docs/core/providers/auth-provider `authProvider`} under the hood.
 *
 * @see {@link https://refine.dev/docs/core/hooks/auth/useAuthenticated} for more details.
 */
export function useIsAuthenticated({
    v3LegacyAuthProviderCompatible = false,
    params,
}: UseIsAuthenticatedProps | UseIsAuthenticatedLegacyProps = {}):
    | UseIsAuthenticatedReturnType
    | UseIsAuthenticatedLegacyReturnType {
    const { checkAuth } = useLegacyAuthContext();
    const { check } = useAuthBindingsContext();

    const queryResponse = useQuery(
        ["useAuthenticated", params],
        async () => (await check?.(params)) ?? {},
        {
            retry: false,
            enabled: !v3LegacyAuthProviderCompatible,
        },
    );

    const legacyQueryResponse = useQuery(
        ["useAuthenticated", params, "v3LegacyAuthProviderCompatible"],
        async () => (await checkAuth?.(params)) ?? {},
        {
            retry: false,
            enabled: v3LegacyAuthProviderCompatible,
        },
    );

    return v3LegacyAuthProviderCompatible ? legacyQueryResponse : queryResponse;
}

/**
 * @deprecated `useAuthenticated` is deprecated with refine@4, use `useIsAuthenticated` instead, however, we still support `useAuthenticated` for backward compatibility.
 */
export const useAuthenticated = useIsAuthenticated;
