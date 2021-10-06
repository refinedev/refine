import { useContext } from "react";
import { useQuery, UseQueryResult } from "react-query";

import { AuthContext } from "@contexts/auth";
import { IAuthContext } from "../../../interfaces";
import { useNavigation, useRouterContext } from "@hooks";

/**
 *  `useAuthenticated` calls the `checkAuth` method from the {@link https://refine.dev/docs/api-references/providers/auth-provider `authProvider`} under the hood.
 *
 * @see {@link https://refine.dev/docs/api-references/hooks/auth/useAuthenticated} for more details.
 *
 */
export const useAuthenticated = (
    params?: any,
): UseQueryResult<any, unknown> => {
    const { checkAuth } = useContext<IAuthContext>(AuthContext);

    const { replace } = useNavigation();
    const { useLocation } = useRouterContext();
    const { pathname, search } = useLocation();

    const queryResponse = useQuery(
        ["useAuthenticated", params],
        () => checkAuth(params),
        {
            retry: false,
            onError: () => {
                if (pathname !== "/login") {
                    const toURL = `${pathname}${search}`;
                    replace(`/login?to=${encodeURIComponent(toURL)}`);
                }
            },
        },
    );

    return queryResponse;
};
