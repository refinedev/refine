import React from "react";
import { useMutation, UseMutationResult } from "react-query";
import { notification } from "antd";

import { AuthContext } from "@contexts/auth";
import { useNavigation } from "@hooks/navigation";

import { IAuthContext } from "../../../interfaces";
import { useRouterContext } from "@hooks/refine";

export type UseLoginReturnType<TData, TVariables = {}> = UseMutationResult<
    TData,
    unknown,
    TVariables,
    unknown
>;
/**
 * `useLogin` calls `login` method from {@link https://refine.dev/docs/api-references/providers/auth-provider `authProvider`} under the hood.
 *
 * @see {@link https://refine.dev/docs/api-references/hooks/auth/useLogin} for more details.
 *
 * @typeParam TData - Result data of the query
 * @typeParam TVariables - Values for mutation function. default `{}`
 *
 */
export const useLogin = <TData, TVariables = {}>(): UseLoginReturnType<
    TData,
    TVariables
> => {
    const { replace } = useNavigation();
    const { login: loginFromContext } =
        React.useContext<IAuthContext>(AuthContext);

    const { useLocation } = useRouterContext();

    const location = useLocation<{ from: string }>();
    const { from } = location.state || { from: { pathname: "/" } };

    const queryResponse = useMutation<TData, unknown, TVariables, unknown>(
        "useLogin",
        loginFromContext,
        {
            onSuccess: () => {
                replace(from);
                notification.close("login-error");
            },
            onError: (error: any) => {
                notification.error({
                    message: error?.name || "Login Error",
                    description: error?.message || "Invalid credentials",
                    key: "login-error",
                });
            },
        },
    );

    return queryResponse;
};
