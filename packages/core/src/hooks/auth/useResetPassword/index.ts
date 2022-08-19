import React from "react";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

import { AuthContext } from "@contexts/auth";

import { IAuthContext, TResetPasswordData } from "../../../interfaces";
import { useNavigation, useNotification } from "@hooks";

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

    const { close, open } = useNotification();

    const queryResponse = useMutation<
        TResetPasswordData,
        Error,
        TVariables,
        unknown
    >(["useResetPassword"], resetPasswordFromContext, {
        onSuccess: (redirectPathFromAuth) => {
            if (redirectPathFromAuth !== false) {
                if (redirectPathFromAuth) {
                    replace(redirectPathFromAuth);
                }
            }
            close?.("reset-password-error");
        },
        onError: (error: any) => {
            open?.({
                message: error?.name || "Reset Password Error",
                description: error?.message || "Error while resetting password",
                key: "reset-password-error",
                type: "error",
            });
        },
    });

    return queryResponse;
};
