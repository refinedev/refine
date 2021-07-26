import React from "react";
import { useMutation, UseMutationResult } from "react-query";
import { useLocation } from "react-router-dom";
import { notification } from "antd";

import { AuthContext } from "@contexts/auth";
import { useNavigation } from "@hooks/navigation";

import { IAuthContext } from "../../../interfaces";

/**
 * `useLogin` calls `login` method from {@link https://refine.dev/docs/api-references/providers/auth-provider `authProvider`} under the hood.
 *
 * @see {@link https://refine.dev/docs/api-references/hooks/auth/useLogin} for more details.
 *
 * @typeParam TVariables - Values for mutation function
 *
 */
export const useLogin = <TVariables = any>(): UseMutationResult<
    any,
    Error,
    TVariables,
    unknown
> => {
    const { replace } = useNavigation();
    const { login: loginFromContext } =
        React.useContext<IAuthContext>(AuthContext);

    const location = useLocation<{ from: string }>();
    const { from } = location.state || { from: { pathname: "/" } };

    const queryResponse = useMutation<any, Error, TVariables, unknown>(
        "useLogin",
        loginFromContext,
        {
            onSuccess: () => {
                replace(from);
            },
            onError: (error: Error) => {
                notification.error({
                    message: error?.name || "Login Error",
                    description: error?.message || "Invalid credentials",
                });
            },
        },
    );

    return queryResponse;
};
