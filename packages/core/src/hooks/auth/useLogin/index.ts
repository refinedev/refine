import {
    useMutation,
    UseMutationOptions,
    UseMutationResult,
} from "@tanstack/react-query";
import qs from "qs";

import { useNavigation, useRouterContext, useNotification } from "@hooks";
import { useAuthBindingsContext, useLegacyAuthContext } from "@contexts/auth";

import { TLoginData } from "../../../interfaces";
import { AuthActionResponse } from "src/interfaces/bindings/auth";

export type UseLoginLegacyProps<TVariables> = {
    legacy: true;
    mutationOptions?: Omit<
        UseMutationOptions<TLoginData, Error, TVariables, unknown>,
        "mutationFn" | "onError" | "onSuccess"
    >;
};

export type UseLoginProps<TVariables> = {
    legacy?: false;
    mutationOptions?: Omit<
        UseMutationOptions<AuthActionResponse, Error, TVariables, unknown>,
        "mutationFn" | "onSuccess"
    >;
};

export type UseLoginCombinedProps<TVariables> = {
    legacy: boolean;
    mutationOptions?: Omit<
        UseMutationOptions<
            AuthActionResponse | TLoginData,
            Error,
            TVariables,
            unknown
        >,
        "mutationFn" | "onSuccess"
    >;
};

export type UseLoginLegacyReturnType<TVariables> = UseMutationResult<
    TLoginData,
    Error,
    TVariables,
    unknown
>;

export type UseLoginReturnType<TVariables> = UseMutationResult<
    AuthActionResponse,
    Error,
    TVariables,
    unknown
>;

export type UseLoginCombinedReturnType<TVariables> = UseMutationResult<
    AuthActionResponse | TLoginData,
    Error,
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
    legacy,
    mutationOptions,
}: UseLoginProps<TVariables> | UseLoginLegacyProps<TVariables> = {}):
    | UseLoginLegacyReturnType<TVariables>
    | UseLoginReturnType<TVariables> {
    const { replace } = useNavigation();
    const { useLocation } = useRouterContext();
    const { search } = useLocation();
    const { close, open } = useNotification();
    const { login: legacyLoginFromContext } = useLegacyAuthContext();
    const { login: loginFromContext } = useAuthBindingsContext();

    const { to } = qs.parse(search, {
        ignoreQueryPrefix: true,
    });

    const queryResponse = useMutation<
        AuthActionResponse,
        Error,
        TVariables,
        unknown
    >(["useLogin"], loginFromContext, {
        onSuccess: ({ success, redirectTo, error }) => {
            if (success) {
                close?.("login-error");
            }

            if (redirectTo) {
                replace(redirectTo);
            }

            if (error) {
                open?.({
                    message: error.name,
                    description: error.message,
                    key: "login-error",
                    type: "error",
                });
            }
        },
        ...(legacy === true ? {} : mutationOptions),
    });

    const queryResponseLegacy = useMutation<
        TLoginData,
        Error,
        TVariables,
        unknown
    >(["useLogin"], legacyLoginFromContext, {
        onSuccess: (redirectPathFromAuth) => {
            if (to) {
                return replace(to as string);
            }

            if (redirectPathFromAuth !== false) {
                if (typeof redirectPathFromAuth === "string") {
                    replace(redirectPathFromAuth);
                } else {
                    replace("/");
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
        ...(legacy ? mutationOptions : {}),
    });

    return legacy ? queryResponseLegacy : queryResponse;
}
