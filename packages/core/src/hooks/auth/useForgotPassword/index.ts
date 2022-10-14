import React from "react";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

import { AuthContext } from "@contexts/auth";
import { useNavigation, useNotification } from "@hooks";

import { IAuthContext, TForgotPasswordData } from "../../../interfaces";

/**
 * `useForgotPassword` calls `forgotPassword` method from {@link https://refine.dev/docs/api-references/providers/auth-provider `authProvider`} under the hood.
 *
 * @see {@link https://refine.dev/docs/core/hooks/auth/useForgotPassword} for more details.
 *
 * @typeParam TData - Result data of the query
 * @typeParam TVariables - Values for mutation function. default `{}`
 *
 */
export const useForgotPassword = <TVariables = {}>(): UseMutationResult<
    TForgotPasswordData,
    Error,
    TVariables,
    unknown
> => {
    const { replace } = useNavigation();
    const { forgotPassword: forgotPasswordFromContext } =
        React.useContext<IAuthContext>(AuthContext);

    const { close, open } = useNotification();

    const queryResponse = useMutation<
        TForgotPasswordData,
        Error,
        TVariables,
        unknown
    >(["useForgotPassword"], forgotPasswordFromContext, {
        onSuccess: (redirectPathFromAuth) => {
            if (redirectPathFromAuth !== false) {
                if (redirectPathFromAuth) {
                    replace(redirectPathFromAuth);
                }
            }
            close?.("forgot-password-error");
        },
        onError: (error: any) => {
            open?.({
                message: error?.name || "Forgot Password Error",
                description: error?.message || "Error while resetting password",
                key: "forgot-password-error",
                type: "error",
            });
        },
    });

    return queryResponse;
};
