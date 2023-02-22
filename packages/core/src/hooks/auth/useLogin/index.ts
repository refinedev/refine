import React from "react";
import {
    useMutation,
    UseMutationOptions,
    UseMutationResult,
} from "@tanstack/react-query";
import qs from "qs";

import {
    useNavigation,
    useRouterContext,
    useNotification,
    useRouterType,
    useParsed,
    useGo,
} from "@hooks";
import { AuthContext } from "@contexts/auth";

import { IAuthContext, TLoginData } from "../../../interfaces";

export type UseLoginProps<TVariables> = {
    mutationOptions?: Omit<
        UseMutationOptions<TLoginData, Error, TVariables, unknown>,
        "mutationFn" | "onError" | "onSuccess"
    >;
};

/**
 * `useLogin` calls `login` method from {@link https://refine.dev/docs/api-references/providers/auth-provider `authProvider`} under the hood.
 *
 * @see {@link https://refine.dev/docs/core/hooks/auth/useLogin} for more details.
 *
 * @typeParam TData - Result data of the query
 * @typeParam TVariables - Values for mutation function. default `{}`
 *
 */
export const useLogin = <TVariables = {}>({
    mutationOptions,
}: UseLoginProps<TVariables> = {}): UseMutationResult<
    TLoginData,
    Error,
    TVariables,
    unknown
> => {
    const { login: loginFromContext } =
        React.useContext<IAuthContext>(AuthContext);

    const routerType = useRouterType();

    const go = useGo();
    const { replace } = useNavigation();

    const parsed = useParsed();

    const { useLocation } = useRouterContext();
    const { search } = useLocation();

    const { close, open } = useNotification();

    const to = React.useMemo(() => {
        if (routerType === "legacy") {
            const legacySearch = qs.parse(search, {
                ignoreQueryPrefix: true,
            });
            return legacySearch.to;
        } else {
            return parsed.params?.to;
        }
    }, [routerType, parsed.params, search]);

    const queryResponse = useMutation<TLoginData, Error, TVariables, unknown>(
        ["useLogin"],
        loginFromContext,
        {
            onSuccess: (redirectPathFromAuth) => {
                if (to) {
                    if (routerType === "legacy") {
                        return replace(to as string);
                    } else {
                        return go({ to: to as string, type: "replace" });
                    }
                }

                if (redirectPathFromAuth !== false) {
                    if (typeof redirectPathFromAuth === "string") {
                        if (routerType === "legacy") {
                            replace(redirectPathFromAuth);
                        } else {
                            go({ to: redirectPathFromAuth, type: "replace" });
                        }
                    } else {
                        if (routerType === "legacy") {
                            replace("/");
                        } else {
                            go({ to: "/", type: "replace" });
                        }
                    }
                }
                close?.("login-error");
            },
            onError: (error: any) => {
                open?.({
                    message: error?.name || "Login Error",
                    description: error?.message || "Invalid credentials",
                    key: "login-error",
                    type: "error",
                });
            },
            ...mutationOptions,
        },
    );

    return queryResponse;
};
