import {
    useMutation,
    UseMutationOptions,
    UseMutationResult,
} from "@tanstack/react-query";

import { useGo, useNavigation, useNotification, useRouterType } from "@hooks";
import { useAuthBindingsContext, useLegacyAuthContext } from "@contexts/auth";

import {
    AuthActionResponse,
    RefineError,
    OpenNotificationParams,
    TForgotPasswordData,
} from "../../../interfaces";

export type UseForgotPasswordLegacyProps<TVariables> = {
    v3LegacyAuthProviderCompatible: true;
    mutationOptions?: Omit<
        UseMutationOptions<
            TForgotPasswordData,
            Error | RefineError,
            TVariables,
            unknown
        >,
        "mutationFn" | "onError" | "onSuccess"
    >;
};

export type UseForgotPasswordProps<TVariables> = {
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

export type UseForgotPasswordCombinedProps<TVariables> = {
    v3LegacyAuthProviderCompatible: boolean;
    mutationOptions?: Omit<
        UseMutationOptions<
            AuthActionResponse | TForgotPasswordData,
            Error | RefineError,
            TVariables,
            unknown
        >,
        "mutationFn"
    >;
};

export type UseForgotPasswordLegacyReturnType<TVariables> = UseMutationResult<
    TForgotPasswordData,
    Error | RefineError,
    TVariables,
    unknown
>;

export type UseForgotPasswordReturnType<TVariables> = UseMutationResult<
    AuthActionResponse,
    Error | RefineError,
    TVariables,
    unknown
>;

export type UseForgotPasswordCombinedReturnType<TVariables> = UseMutationResult<
    AuthActionResponse | TForgotPasswordData,
    Error | RefineError,
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
    const routerType = useRouterType();
    const go = useGo();
    const { replace } = useNavigation();
    const {
        forgotPassword: v3LegacyAuthProviderCompatibleForgotPasswordFromContext,
    } = useLegacyAuthContext();
    const { forgotPassword: forgotPasswordFromContext } =
        useAuthBindingsContext();
    const { close, open } = useNotification();

    const mutation = useMutation<
        AuthActionResponse,
        Error | RefineError,
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
                if (routerType === "legacy") {
                    replace(redirectTo);
                } else {
                    go({ to: redirectTo, type: "replace" });
                }
            }
        },
        onError: (error: any) => {
            open?.(buildNotification(error));
        },
        ...(v3LegacyAuthProviderCompatible === true ? {} : mutationOptions),
    });

    const v3LegacyAuthProviderCompatibleMutation = useMutation<
        TForgotPasswordData,
        Error | RefineError,
        TVariables,
        unknown
    >(
        ["useForgotPassword", "v3LegacyAuthProviderCompatible"],
        v3LegacyAuthProviderCompatibleForgotPasswordFromContext,
        {
            onSuccess: (redirectPathFromAuth) => {
                if (redirectPathFromAuth !== false) {
                    if (redirectPathFromAuth) {
                        if (routerType === "legacy") {
                            replace(redirectPathFromAuth);
                        } else {
                            go({ to: redirectPathFromAuth, type: "replace" });
                        }
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
        ? v3LegacyAuthProviderCompatibleMutation
        : mutation;
}

const buildNotification = (
    error?: Error | RefineError,
): OpenNotificationParams => {
    return {
        message: error?.name || "Forgot Password Error",
        description: error?.message || "Error while resetting password",
        key: "forgot-password-error",
        type: "error",
    };
};
