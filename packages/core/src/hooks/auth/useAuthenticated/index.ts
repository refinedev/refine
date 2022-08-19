import { useContext } from "react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { AuthContext } from "@contexts/auth";
import { IAuthContext } from "../../../interfaces";

/**
 *  `useAuthenticated` calls the `checkAuth` method from the {@link https://refine.dev/docs/core/providers/auth-provider `authProvider`} under the hood.
 *
 * @see {@link https://refine.dev/docs/core/hooks/auth/useAuthenticated} for more details.
 *
 */
export const useAuthenticated = (
    params?: any,
): UseQueryResult<any, unknown> => {
    const { checkAuth } = useContext<IAuthContext>(AuthContext);

    const queryResponse = useQuery(
        ["useAuthenticated", params],
        async () => (await checkAuth?.(params)) ?? {},
        {
            retry: false,
        },
    );

    return queryResponse;
};
