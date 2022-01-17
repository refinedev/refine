import React from "react";
import { useMutation, UseMutationResult } from "react-query";

import { AuthContext } from "@contexts/auth";
import {
    IAuthContext,
    TLogoutVariables,
    TLogoutData,
} from "../../../interfaces";
import { useNavigation, useNotification } from "@hooks";

/**
 * `useLogout` calls the `logout` method from the {@link https://refine.dev/docs/api-references/providers/auth-provider `authProvider`} under the hood.
 *
 * @see {@link https://refine.dev/docs/api-references/hooks/auth/useLogout} for more details.
 *
 */
export const useLogout = (): UseMutationResult<
    TLogoutData,
    Error,
    TLogoutVariables,
    unknown
> => {
    const { push } = useNavigation();
    const { logout: logoutFromContext } =
        React.useContext<IAuthContext>(AuthContext);
    const { open } = useNotification();

    const queryResponse = useMutation<
        TLogoutData,
        Error,
        TLogoutVariables,
        unknown
    >("useLogout", logoutFromContext, {
        onSuccess: (redirectPathFromAuth, { redirectPath } = {}) => {
            if (redirectPathFromAuth !== false) {
                if (redirectPath) {
                    push(redirectPath);
                } else if (redirectPathFromAuth) {
                    push(redirectPathFromAuth);
                } else {
                    push("/login");
                }
            }
        },
        onError: (error: Error) => {
            open({
                key: "useLogout-error",
                type: "error",
                message: error?.name || "Logout Error",
                description:
                    error?.message || "Something went wrong during logout",
            });
        },
    });

    return queryResponse;
};
