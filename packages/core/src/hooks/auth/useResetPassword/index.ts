import React from "react";
import { useMutation, UseMutationResult } from "react-query";
import qs from "qs";

import { AuthContext } from "@contexts/auth";

import { IAuthContext, TResetPasswordData } from "../../../interfaces";
import { useNavigation, useRouterContext, useNotification } from "@hooks";

/**
 * `useResetPassword` calls `resetPassword` method from {@link https://refine.dev/docs/api-references/providers/auth-provider `authProvider`} under the hood.
 *
 * @see {@link https://refine.dev/docs/core/hooks/auth/useResetPassword} for more details.
 *
 * @typeParam TData - Result data of the query
 * @typeParam TVariables - Values for mutation function. default `{}`
 *
 */
export const useResetPassword = <TVariables = {}>(): UseMutationResult<
    TResetPasswordData,
    Error,
    TVariables,
    unknown
> => {
    const { replace } = useNavigation();
    const { resetPassword: resetPasswordFromContext } =
        React.useContext<IAuthContext>(AuthContext);

    const { useLocation } = useRouterContext();
    const { search } = useLocation();
    const { close, open } = useNotification();

    const { to } = qs.parse(search?.substring(1));

    const queryResponse = useMutation<
        TResetPasswordData,
        Error,
        TVariables,
        unknown
    >("useResetPassword", resetPasswordFromContext, {
        onSuccess: (redirectPathFromAuth) => {
            if (to) {
                return replace(to as string);
            }

            if (redirectPathFromAuth !== false) {
                if (redirectPathFromAuth) {
                    replace(redirectPathFromAuth);
                } else {
                    replace("/");
                }
            }
            close?.("reset-password-error");
        },
        onError: (error: any) => {
            open?.({
                message: error?.name || "Reset Password Error",
                description: error?.message || "Invalid credentials",
                key: "reset-password-error",
                type: "error",
            });
        },
    });

    return queryResponse;
};
