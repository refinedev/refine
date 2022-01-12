import React from "react";
import { useMutation, UseMutationResult } from "react-query";
import qs from "qs";

import { AuthContext } from "@contexts/auth";

import { IAuthContext } from "../../../interfaces";
import { useNavigation, useRouterContext, useNotification } from "@hooks";

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
    const { search } = useLocation();
    const { close, open } = useNotification();

    const { to } = qs.parse(search?.substring(1));

    const queryResponse = useMutation<TData, unknown, TVariables, unknown>(
        "useLogin",
        loginFromContext,
        {
            onSuccess: () => {
                replace((to as string) ?? "/");
                close("login-error");
            },
            onError: (error: any) => {
                open({
                    message: error?.name || "Login Error",
                    description: error?.message || "Invalid credentials",
                    key: "login-error",
                    type: "error",
                });
            },
        },
    );

    return queryResponse;
};
