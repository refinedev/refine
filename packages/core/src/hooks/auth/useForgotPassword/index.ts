import {
    useMutation,
    UseMutationOptions,
    UseMutationResult,
} from "@tanstack/react-query";

import { useAuthBindingsContext, useLegacyAuthContext } from "@contexts/auth";
import { useNavigation, useNotification } from "@hooks";

import {
    AuthActionResponse,
    OpenNotificationParams,
    TForgotPasswordData,
} from "../../../interfaces";

export type UseForgotPasswordLegacyProps<TVariables> = {
    v3LegacyAuthProviderCompatible: true;
    mutationOptions?: Omit<
        UseMutationOptions<TForgotPasswordData, Error, TVariables, unknown>,
        "mutationFn" | "onError" | "onSuccess"
    >;
};

export type UseForgotPasswordProps<TVariables> = {
    v3LegacyAuthProviderCompatible?: false;
    mutationOptions?: Omit<
        UseMutationOptions<AuthActionResponse, Error, TVariables, unknown>,
        "mutationFn"
    >;
};

export type UseForgotPasswordCombinedProps<TVariables> = {
    v3LegacyAuthProviderCompatible: boolean;
    mutationOptions?: Omit<
        UseMutationOptions<
            AuthActionResponse | TForgotPasswordData,
            Error,
            TVariables,
            unknown
        >,
        "mutationFn"
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
    v3LegacyAuthProviderCompatible,
    mutationOptions,
}:
    | UseForgotPasswordProps<TVariables>
    | UseForgotPasswordLegacyProps<TVariables> = {}):
    | UseForgotPasswordReturnType<TVariables>
    | UseForgotPasswordLegacyReturnType<TVariables> {
    const { replace } = useNavigation();
    const {
        forgotPassword: v3LegacyAuthProviderCompatibleForgotPasswordFromContext,
    } = useLegacyAuthContext();
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

            if (error || !success) {
                open?.(buildNotification(error));
            }

            if (redirectTo) {
                replace(redirectTo);
            }
        },
        onError: (error: any) => {
            open?.(buildNotification(error));
        },
        ...(v3LegacyAuthProviderCompatible === true ? {} : mutationOptions),
    });

    const v3LegacyAuthProviderCompatibleQueryResponse = useMutation<
        TForgotPasswordData,
        Error,
        TVariables,
        unknown
    >(
        ["useForgotPassword"],
        v3LegacyAuthProviderCompatibleForgotPasswordFromContext,
        {
            onSuccess: (redirectPathFromAuth) => {
                if (redirectPathFromAuth !== false) {
                    if (redirectPathFromAuth) {
                        replace(redirectPathFromAuth);
                    }
                }
                close?.("forgot-password-error");
            },
            onError: (error: any) => {
                open?.(buildNotification(error));
            },
            ...(v3LegacyAuthProviderCompatible ? mutationOptions : {}),
        },
    );

    return v3LegacyAuthProviderCompatible
        ? v3LegacyAuthProviderCompatibleQueryResponse
        : queryResponse;
}

const buildNotification = (error?: Error): OpenNotificationParams => {
    return {
        message: error?.name || "Forgot Password Error",
        description: error?.message || "Error while resetting password",
        key: "forgot-password-error",
        type: "error",
    };
};
