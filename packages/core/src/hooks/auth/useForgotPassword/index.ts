import {
    useMutation,
    UseMutationOptions,
    UseMutationResult,
} from "@tanstack/react-query";

import { useAuthBindingsContext, useLegacyAuthContext } from "@contexts/auth";
import { useNavigation, useNotification } from "@hooks";

import { AuthActionResponse, TForgotPasswordData } from "../../../interfaces";

export type UseForgotPasswordLegacyProps<TVariables> = {
    legacy: true;
    mutationOptions?: Omit<
        UseMutationOptions<TForgotPasswordData, Error, TVariables, unknown>,
        "mutationFn" | "onError" | "onSuccess"
    >;
};

export type UseForgotPasswordProps<TVariables> = {
    legacy?: false;
    mutationOptions?: Omit<
        UseMutationOptions<AuthActionResponse, Error, TVariables, unknown>,
        "mutationFn" | "onSuccess"
    >;
};

export type UseForgotPasswordCombinedProps<TVariables> = {
    legacy: boolean;
    mutationOptions?: Omit<
        UseMutationOptions<
            AuthActionResponse | TForgotPasswordData,
            Error,
            TVariables,
            unknown
        >,
        "mutationFn" | "onSuccess"
    >;
};

export type UseForgotPasswordLegacyReturnType<TVariables> = UseMutationResult<
    TForgotPasswordData,
    Error,
    TVariables,
    unknown
>;

export type UseForgotPasswordReturnType<TVariables> = UseMutationResult<
    AuthActionResponse,
    Error,
    TVariables,
    unknown
>;

export type UseForgotPasswordCombinedReturnType<TVariables> = UseMutationResult<
    AuthActionResponse | TForgotPasswordData,
    Error,
    TVariables,
    unknown
>;

export function useForgotPassword<TVariables = {}>(
    props: UseForgotPasswordLegacyProps<TVariables>,
): UseForgotPasswordLegacyReturnType<TVariables>;

export function useForgotPassword<TVariables = {}>(
    props?: UseForgotPasswordProps<TVariables>,
): UseForgotPasswordReturnType<TVariables>;

export function useForgotPassword<TVariables = {}>(
    props?: UseForgotPasswordCombinedProps<TVariables>,
): UseForgotPasswordCombinedReturnType<TVariables>;

/**
 * `useForgotPassword` calls `forgotPassword` method from {@link https://refine.dev/docs/api-references/providers/auth-provider `authProvider`} under the hood.
 *
 * @see {@link https://refine.dev/docs/core/hooks/auth/useForgotPassword} for more details.
 *
 * @typeParam TData - Result data of the query
 * @typeParam TVariables - Values for mutation function. default `{}`
 *
 */
export function useForgotPassword<TVariables = {}>({
    legacy,
    mutationOptions,
}:
    | UseForgotPasswordProps<TVariables>
    | UseForgotPasswordLegacyProps<TVariables> = {}):
    | UseForgotPasswordReturnType<TVariables>
    | UseForgotPasswordLegacyReturnType<TVariables> {
    const { replace } = useNavigation();
    const { forgotPassword: legacyForgotPasswordFromContext } =
        useLegacyAuthContext();
    const { forgotPassword: forgotPasswordFromContext } =
        useAuthBindingsContext();
    const { close, open } = useNotification();

    const queryResponse = useMutation<
        AuthActionResponse,
        Error,
        TVariables,
        unknown
    >(["useForgotPassword"], forgotPasswordFromContext, {
        onSuccess: ({ success, redirectTo, error }) => {
            if (success) {
                close?.("forgot-password-error");
            }

            if (redirectTo) {
                replace(redirectTo);
            }

            if (error) {
                open?.({
                    message: error.name,
                    description: error.message,
                    key: "forgot-password-error",
                    type: "error",
                });
            }
        },
        ...(legacy === true ? {} : mutationOptions),
    });

    const legacyQueryResponse = useMutation<
        TForgotPasswordData,
        Error,
        TVariables,
        unknown
    >(["useForgotPassword"], legacyForgotPasswordFromContext, {
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
        ...(legacy ? mutationOptions : {}),
    });

    return legacy ? legacyQueryResponse : queryResponse;
}
