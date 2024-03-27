import { getXRay } from "@refinedev/devtools-internal";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

import { useAuthBindingsContext, useLegacyAuthContext } from "@contexts/auth";
import { useKeys } from "@hooks/useKeys";

import { CheckResponse } from "../../../contexts/auth/types";

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
 * @see {@link https://refine.dev/docs/api-reference/core/hooks/auth/useAuthenticated} for more details.
 */
export function useIsAuthenticated({
  v3LegacyAuthProviderCompatible = false,
  params,
}: UseIsAuthenticatedProps | UseIsAuthenticatedLegacyProps = {}):
  | UseIsAuthenticatedReturnType
  | UseIsAuthenticatedLegacyReturnType {
  const { checkAuth } = useLegacyAuthContext();
  const { check } = useAuthBindingsContext();
  const { keys, preferLegacyKeys } = useKeys();

  const queryResponse = useQuery({
    queryKey: keys()
      .auth()
      .action("check")
      .params(params)
      .get(preferLegacyKeys),
    queryFn: async () => (await check?.(params)) ?? {},
    retry: false,
    enabled: !v3LegacyAuthProviderCompatible,
    meta: {
      ...getXRay("useIsAuthenticated", preferLegacyKeys),
    },
  });

  const legacyQueryResponse = useQuery({
    queryKey: [
      ...keys().auth().action("check").params(params).get(preferLegacyKeys),
      "v3LegacyAuthProviderCompatible",
    ],
    queryFn: async () => (await checkAuth?.(params)) ?? {},
    retry: false,
    enabled: v3LegacyAuthProviderCompatible,
    meta: {
      ...getXRay("useIsAuthenticated", preferLegacyKeys),
    },
  });

  return v3LegacyAuthProviderCompatible ? legacyQueryResponse : queryResponse;
}

/**
 * @deprecated `useAuthenticated` is deprecated with refine@4, use `useIsAuthenticated` instead, however, we still support `useAuthenticated` for backward compatibility.
 */
export const useAuthenticated = useIsAuthenticated;
