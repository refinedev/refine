import {
    useMutation,
    UseMutationOptions,
    UseMutationResult,
} from "@tanstack/react-query";

import { useAuthBindingsContext, useLegacyAuthContext } from "@contexts/auth";
import { useNavigation, useNotification } from "@hooks";

import {
    AuthActionResponse,
    TLoginData,
    TRegisterData,
} from "../../../interfaces";

export type UseRegisterLegacyProps<TVariables> = {
    v3LegacyAuthProviderCompatible: true;
    mutationOptions?: Omit<
        UseMutationOptions<TRegisterData, Error, TVariables, unknown>,
        "mutationFn" | "onError" | "onSuccess"
    >;
};

export type UseRegisterProps<TVariables> = {
    v3LegacyAuthProviderCompatible?: false;
    mutationOptions?: Omit<
        UseMutationOptions<AuthActionResponse, Error, TVariables, unknown>,
        "mutationFn" | "onSuccess"
    >;
};

export type UseRegisterCombinedProps<TVariables> = {
    v3LegacyAuthProviderCompatible: boolean;
    mutationOptions?: Omit<
        UseMutationOptions<
            AuthActionResponse | TRegisterData,
            Error,
            TVariables,
            unknown
        >,
        "mutationFn" | "onSuccess"
    >;
};

export type UseRegisterLegacyReturnType<TVariables> = UseMutationResult<
    TRegisterData,
    Error,
    TVariables,
    unknown
>;

export type UseRegisterReturnType<TVariables> = UseMutationResult<
    AuthActionResponse,
    Error,
    TVariables,
    unknown
>;

export type UseRegisterCombinedReturnType<TVariables> = UseMutationResult<
    AuthActionResponse | TLoginData,
    Error,
    TVariables,
    unknown
>;

export function useRegister<TVariables = {}>(
    props: UseRegisterLegacyProps<TVariables>,
): UseRegisterLegacyReturnType<TVariables>;

export function useRegister<TVariables = {}>(
    props?: UseRegisterProps<TVariables>,
): UseRegisterReturnType<TVariables>;

export function useRegister<TVariables = {}>(
    props?: UseRegisterCombinedProps<TVariables>,
): UseRegisterCombinedReturnType<TVariables>;

/**
 * `useRegister` calls `register` method from {@link https://refine.dev/docs/api-references/providers/auth-provider `authProvider`} under the hood.
 *
 * @see {@link https://refine.dev/docs/core/hooks/auth/useRegister} for more details.
 *
 * @typeParam TData - Result data of the query
 * @typeParam TVariables - Values for mutation function. default `{}`
 *
 */
export function useRegister<TVariables = {}>({
    v3LegacyAuthProviderCompatible,
    mutationOptions,
}: UseRegisterProps<TVariables> | UseRegisterLegacyProps<TVariables> = {}):
    | UseRegisterReturnType<TVariables>
    | UseRegisterLegacyReturnType<TVariables> {
    const { replace } = useNavigation();
    const { register: legacyRegisterFromContext } = useLegacyAuthContext();
    const { register: registerFromContext } = useAuthBindingsContext();
    const { close, open } = useNotification();

    const queryResponse = useMutation<
        AuthActionResponse,
        Error,
        TVariables,
        unknown
    >(["useRegister"], registerFromContext, {
        onSuccess: ({ success, redirectTo, error }) => {
            if (success) {
                close?.("register-error");
            }

            if (redirectTo) {
                replace(redirectTo);
            }

            if (error) {
                open?.({
                    message: error.name,
                    description: error.message,
                    key: "register-error",
                    type: "error",
                });
            }
        },
        ...(v3LegacyAuthProviderCompatible === true ? {} : mutationOptions),
    });

    const legacyQueryResponse = useMutation<
        TRegisterData,
        Error,
        TVariables,
        unknown
    >(["useRegister"], legacyRegisterFromContext, {
        onSuccess: (redirectPathFromAuth) => {
            if (redirectPathFromAuth !== false) {
                if (redirectPathFromAuth) {
                    replace(redirectPathFromAuth);
                } else {
                    replace("/");
                }
            }
            close?.("register-error");
        },
        onError: (error: any) => {
            open?.({
                message: error?.name || "Register Error",
                description: error?.message || "Error while registering",
                key: "register-error",
                type: "error",
            });
        },
        ...(v3LegacyAuthProviderCompatible ? mutationOptions : {}),
    });

    return v3LegacyAuthProviderCompatible ? legacyQueryResponse : queryResponse;
}
