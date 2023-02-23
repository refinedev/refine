import {
    useMutation,
    UseMutationOptions,
    UseMutationResult,
} from "@tanstack/react-query";
import qs from "qs";

import { useAuthBindingsContext, useLegacyAuthContext } from "@contexts/auth";
import { useNavigation, useNotification, useRouterContext } from "@hooks";
import {
    AuthActionResponse,
    TUpdatePasswordData,
    UpdatePasswordFormTypes,
} from "../../../interfaces";

export type UseUpdatePasswordLegacyProps<
    TVariables extends UpdatePasswordFormTypes,
> = {
    v3LegacyAuthProviderCompatible: true;
    mutationOptions?: Omit<
        UseMutationOptions<TUpdatePasswordData, Error, TVariables, unknown>,
        "mutationFn" | "onError" | "onSuccess"
    >;
};

export type UseUpdatePasswordProps<TVariables extends UpdatePasswordFormTypes> =
    {
        v3LegacyAuthProviderCompatible?: false;
        mutationOptions?: Omit<
            UseMutationOptions<AuthActionResponse, Error, TVariables, unknown>,
            "mutationFn" | "onSuccess"
        >;
    };

export type UseUpdatePasswordCombinedProps<
    TVariables extends UpdatePasswordFormTypes,
> = {
    v3LegacyAuthProviderCompatible: boolean;
    mutationOptions?: Omit<
        UseMutationOptions<
            AuthActionResponse | TUpdatePasswordData,
            Error,
            TVariables,
            unknown
        >,
        "mutationFn" | "onSuccess"
    >;
};

export type UseUpdatePasswordLegacyReturnType<
    TVariables extends UpdatePasswordFormTypes,
> = UseMutationResult<TUpdatePasswordData, Error, TVariables, unknown>;

export type UseUpdatePasswordReturnType<
    TVariables extends UpdatePasswordFormTypes,
> = UseMutationResult<AuthActionResponse, Error, TVariables, unknown>;

export type UseUpdatePasswordCombinedReturnType<
    TVariables extends UpdatePasswordFormTypes,
> = UseMutationResult<
    AuthActionResponse | TUpdatePasswordData,
    Error,
    TVariables,
    unknown
>;

export function useUpdatePassword<TVariables extends UpdatePasswordFormTypes>(
    props: UseUpdatePasswordLegacyProps<TVariables>,
): UseUpdatePasswordLegacyReturnType<TVariables>;

export function useUpdatePassword<TVariables extends UpdatePasswordFormTypes>(
    props?: UseUpdatePasswordProps<TVariables>,
): UseUpdatePasswordReturnType<TVariables>;

export function useUpdatePassword<TVariables extends UpdatePasswordFormTypes>(
    props?: UseUpdatePasswordCombinedProps<TVariables>,
): UseUpdatePasswordCombinedReturnType<TVariables>;

/**
 * `useUpdatePassword` calls `updatePassword` method from {@link https://refine.dev/docs/api-references/providers/auth-provider `authProvider`} under the hood.
 *
 * @see {@link https://refine.dev/docs/core/hooks/auth/useUpdatePassword} for more details.
 *
 * @typeParam TData - Result data of the query
 * @typeParam TVariables - Values for mutation function. default `{}`
 *
 */
export function useUpdatePassword<
    TVariables extends UpdatePasswordFormTypes = {},
>({
    v3LegacyAuthProviderCompatible,
    mutationOptions,
}:
    | UseUpdatePasswordProps<TVariables>
    | UseUpdatePasswordLegacyProps<TVariables> = {}):
    | UseUpdatePasswordReturnType<TVariables>
    | UseUpdatePasswordLegacyReturnType<TVariables> {
    const { replace } = useNavigation();
    const { updatePassword: legacyUpdatePasswordFromContext } =
        useLegacyAuthContext();
    const { updatePassword: updatePasswordFromContext } =
        useAuthBindingsContext();
    const { close, open } = useNotification();
    const { useLocation } = useRouterContext();

    const { search } = useLocation();

    const queryStrings = qs.parse(search, {
        ignoreQueryPrefix: true,
    });

    const queryResponse = useMutation<
        AuthActionResponse,
        Error,
        TVariables,
        unknown
    >(
        ["useUpdatePassword"],
        async (variables) => {
            return updatePasswordFromContext?.({
                ...queryStrings,
                ...variables,
            }) as Promise<AuthActionResponse>;
        },
        {
            onSuccess: ({ success, redirectTo, error }) => {
                if (success) {
                    close?.("update-password-error");
                }

                if (redirectTo) {
                    replace(redirectTo);
                }

                if (error) {
                    open?.({
                        message: error.name,
                        description: error.message,
                        key: "update-password-error",
                        type: "error",
                    });
                }
            },
            ...(v3LegacyAuthProviderCompatible === true ? {} : mutationOptions),
        },
    );

    const legacyQueryResponse = useMutation<
        TUpdatePasswordData,
        Error,
        TVariables,
        unknown
    >(
        ["useUpdatePassword"],
        async (variables) => {
            return legacyUpdatePasswordFromContext?.({
                ...queryStrings,
                ...variables,
            });
        },
        {
            onSuccess: (redirectPathFromAuth) => {
                if (redirectPathFromAuth !== false) {
                    if (redirectPathFromAuth) {
                        replace(redirectPathFromAuth);
                    }
                }
                close?.("update-password-error");
            },
            onError: (error: any) => {
                open?.({
                    message: error?.name || "Update Password Error",
                    description:
                        error?.message || "Error while updating password",
                    key: "update-password-error",
                    type: "error",
                });
            },
            ...(v3LegacyAuthProviderCompatible ? mutationOptions : {}),
        },
    );

    return v3LegacyAuthProviderCompatible ? legacyQueryResponse : queryResponse;
}
