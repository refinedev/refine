import {
    useMutation,
    UseMutationOptions,
    UseMutationResult,
} from "@tanstack/react-query";

import { useGo, useNavigation, useNotification, useRouterType } from "@hooks";
import { useAuthBindingsContext, useLegacyAuthContext } from "@contexts/auth";
import {
    RefineError,
    OpenNotificationParams,
    TLogoutData,
} from "../../../interfaces";
import { AuthActionResponse } from "src/interfaces/bindings/auth";
import { useInvalidateAuthStore } from "../useInvalidateAuthStore";

type Variables = {
    redirectPath?: string | false;
};

export type UseLogoutLegacyProps<TVariables> = {
    v3LegacyAuthProviderCompatible: true;
    mutationOptions?: Omit<
        UseMutationOptions<
            TLogoutData,
            Error | RefineError,
            (TVariables & Variables) | void,
            unknown
        >,
        "mutationFn" | "onError" | "onSuccess"
    >;
};

export type UseLogoutProps<TVariables> = {
    v3LegacyAuthProviderCompatible?: false;
    mutationOptions?: Omit<
        UseMutationOptions<
            AuthActionResponse,
            Error | RefineError,
            (TVariables & Variables) | void,
            unknown
        >,
        "mutationFn"
    >;
};

export type UseLogoutCombinedProps<TVariables> = {
    v3LegacyAuthProviderCompatible: boolean;
    mutationOptions?: Omit<
        UseMutationOptions<
            AuthActionResponse | TLogoutData,
            Error | RefineError,
            (TVariables & Variables) | void,
            unknown
        >,
        "mutationFn"
    >;
};

export type UseLogoutLegacyReturnType<TVariables> = UseMutationResult<
    TLogoutData,
    Error | RefineError,
    (TVariables & Variables) | void,
    unknown
>;

export type UseLogoutReturnType<TVariables> = UseMutationResult<
    AuthActionResponse,
    Error | RefineError,
    (TVariables & Variables) | void,
    unknown
>;

export type UseLogoutCombinedReturnType<TVariables> = UseMutationResult<
    AuthActionResponse | TLogoutData,
    Error | RefineError,
    (TVariables & Variables) | void,
    unknown
>;

export function useLogout<TVariables = {}>(
    props: UseLogoutLegacyProps<TVariables>,
): UseLogoutLegacyReturnType<TVariables>;

export function useLogout<TVariables = {}>(
    props?: UseLogoutProps<TVariables>,
): UseLogoutReturnType<TVariables>;

export function useLogout<TVariables = {}>(
    props?: UseLogoutCombinedProps<TVariables>,
): UseLogoutCombinedReturnType<TVariables>;

/**
 * `useLogout` calls the `logout` method from the {@link https://refine.dev/docs/api-references/providers/auth-provider `authProvider`} under the hood.
 *
 * @see {@link https://refine.dev/docs/core/hooks/auth/useLogout} for more details.
 *
 */
export function useLogout<TVariables = {}>({
    v3LegacyAuthProviderCompatible,
    mutationOptions,
}: UseLogoutProps<TVariables> | UseLogoutLegacyProps<TVariables> = {}):
    | UseLogoutLegacyReturnType<TVariables>
    | UseLogoutReturnType<TVariables> {
    const invalidateAuthStore = useInvalidateAuthStore();
    const routerType = useRouterType();
    const go = useGo();
    const { push } = useNavigation();
    const { open, close } = useNotification();
    const { logout: legacyLogoutFromContext } = useLegacyAuthContext();
    const { logout: logoutFromContext } = useAuthBindingsContext();

    const mutation = useMutation<
        AuthActionResponse,
        Error | RefineError,
        (TVariables & Variables) | void,
        unknown
    >(["useLogout"], logoutFromContext, {
        onSuccess: async (data, variables) => {
            const { success, error, redirectTo } = data;
            const { redirectPath } = variables ?? {};

            const redirect = redirectPath ?? redirectTo;

            if (success) {
                close?.("useLogout-error");
            }

            if (error || !success) {
                open?.(buildNotification(error));
            }

            await invalidateAuthStore();

            if (redirect !== false) {
                if (routerType === "legacy") {
                    push(redirect ?? "/login");
                } else {
                    if (redirect) {
                        go({ to: redirect });
                    }
                }
            }
        },
        onError: (error: any) => {
            open?.(buildNotification(error));
        },
        ...(v3LegacyAuthProviderCompatible === true ? {} : mutationOptions),
    });

    const v3LegacyAuthProviderCompatibleMutation = useMutation<
        TLogoutData,
        Error | RefineError,
        (TVariables & Variables) | void,
        unknown
    >(
        ["useLogout", "v3LegacyAuthProviderCompatible"],
        legacyLogoutFromContext,
        {
            onSuccess: async (data, variables) => {
                const redirectPath = variables?.redirectPath ?? data;

                await invalidateAuthStore();

                if (redirectPath === false) {
                    return;
                }

                if (redirectPath) {
                    if (routerType === "legacy") {
                        push(redirectPath);
                    } else {
                        go({ to: redirectPath });
                    }
                    return;
                }

                if (routerType === "legacy") {
                    push("/login");
                } else {
                    go({ to: "/login" });
                }
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
        key: "useLogout-error",
        type: "error",
        message: error?.name || "Logout Error",
        description: error?.message || "Something went wrong during logout",
    };
};
