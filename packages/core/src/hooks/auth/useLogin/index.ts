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
import { useAuthBindingsContext, useLegacyAuthContext } from "@contexts/auth";

import {
    RefineError,
    OpenNotificationParams,
    TLoginData,
} from "../../../interfaces";
import { AuthActionResponse } from "src/interfaces/bindings/auth";
import { useInvalidateAuthStore } from "../useInvalidateAuthStore";

export type UseLoginLegacyProps<TVariables> = {
    v3LegacyAuthProviderCompatible: true;
    mutationOptions?: Omit<
        UseMutationOptions<
            TLoginData,
            Error | RefineError,
            TVariables,
            unknown
        >,
        "mutationFn" | "onError" | "onSuccess"
    >;
};

export type UseLoginProps<TVariables> = {
    v3LegacyAuthProviderCompatible?: false;
    mutationOptions?: Omit<
        UseMutationOptions<
            AuthActionResponse,
            Error | RefineError,
            TVariables,
            unknown
        >,
        "mutationFn"
    >;
};

export type UseLoginCombinedProps<TVariables> = {
    v3LegacyAuthProviderCompatible: boolean;
    mutationOptions?: Omit<
        UseMutationOptions<
            AuthActionResponse | TLoginData,
            Error | RefineError,
            TVariables,
            unknown
        >,
        "mutationFn"
    >;
};

export type UseLoginLegacyReturnType<TVariables> = UseMutationResult<
    TLoginData,
    Error | RefineError,
    TVariables,
    unknown
>;

export type UseLoginReturnType<TVariables> = UseMutationResult<
    AuthActionResponse,
    Error | RefineError,
    TVariables,
    unknown
>;

export type UseLoginCombinedReturnType<TVariables> = UseMutationResult<
    AuthActionResponse | TLoginData,
    Error | RefineError,
    TVariables,
    unknown
>;

export function useLogin<TVariables = {}>(
    props: UseLoginLegacyProps<TVariables>,
): UseLoginLegacyReturnType<TVariables>;

export function useLogin<TVariables = {}>(
    props?: UseLoginProps<TVariables>,
): UseLoginReturnType<TVariables>;

export function useLogin<TVariables = {}>(
    props?: UseLoginCombinedProps<TVariables>,
): UseLoginCombinedReturnType<TVariables>;

/**
 * `useLogin` calls `login` method from {@link https://refine.dev/docs/api-references/providers/auth-provider `authProvider`} under the hood.
 *
 * @see {@link https://refine.dev/docs/core/hooks/auth/useLogin} for more details.
 *
 * @typeParam TData - Result data of the query
 * @typeParam TVariables - Values for mutation function. default `{}`
 *
 */
export function useLogin<TVariables = {}>({
    v3LegacyAuthProviderCompatible,
    mutationOptions,
}: UseLoginProps<TVariables> | UseLoginLegacyProps<TVariables> = {}):
    | UseLoginLegacyReturnType<TVariables>
    | UseLoginReturnType<TVariables> {
    const invalidateAuthStore = useInvalidateAuthStore();
    const routerType = useRouterType();

    const go = useGo();
    const { replace } = useNavigation();

    const parsed = useParsed();

    const { useLocation } = useRouterContext();
    const { search } = useLocation();

    const { close, open } = useNotification();
    const { login: legacyLoginFromContext } = useLegacyAuthContext();
    const { login: loginFromContext } = useAuthBindingsContext();

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

    const mutation = useMutation<
        AuthActionResponse,
        Error | RefineError,
        TVariables,
        unknown
    >(["useLogin"], loginFromContext, {
        onSuccess: async ({ success, redirectTo, error }) => {
            if (success) {
                close?.("login-error");
            }

            if (error || !success) {
                open?.(buildNotification(error));
            }

            await invalidateAuthStore();

            if (to && success) {
                if (routerType === "legacy") {
                    replace(to as string);
                } else {
                    go({ to: to as string, type: "replace" });
                }
            } else if (redirectTo) {
                if (routerType === "legacy") {
                    replace(redirectTo);
                } else {
                    go({ to: redirectTo, type: "replace" });
                }
            } else {
                if (routerType === "legacy") {
                    replace("/");
                }
            }
        },
        onError: (error: any) => {
            open?.(buildNotification(error));
        },
        ...(v3LegacyAuthProviderCompatible === true ? {} : mutationOptions),
    });

    const v3LegacyAuthProviderCompatibleMutation = useMutation<
        TLoginData,
        Error | RefineError,
        TVariables,
        unknown
    >(["useLogin", "v3LegacyAuthProviderCompatible"], legacyLoginFromContext, {
        onSuccess: async (redirectPathFromAuth) => {
            await invalidateAuthStore();

            if (to) {
                replace(to as string);
            }

            if (redirectPathFromAuth !== false && !to) {
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
            open?.(buildNotification(error));
        },
        ...(v3LegacyAuthProviderCompatible ? mutationOptions : {}),
    });

    return v3LegacyAuthProviderCompatible
        ? v3LegacyAuthProviderCompatibleMutation
        : mutation;
}

const buildNotification = (
    error?: Error | RefineError,
): OpenNotificationParams => {
    return {
        message: error?.name || "Login Error",
        description: error?.message || "Invalid credentials",
        key: "login-error",
        type: "error",
    };
};
