import React from "react";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import qs from "qs";

import { AuthContext } from "@contexts/auth";
import { useNavigation, useNotification, useRouterContext } from "@hooks";
import { IAuthContext, TUpdatePasswordData } from "../../../interfaces";

/**
 * `useUpdatePassword` calls `updatePassword` method from {@link https://refine.dev/docs/api-references/providers/auth-provider `authProvider`} under the hood.
 *
 * @see {@link https://refine.dev/docs/core/hooks/auth/useUpdatePassword} for more details.
 *
 * @typeParam TData - Result data of the query
 * @typeParam TVariables - Values for mutation function. default `{}`
 *
 */
export const useUpdatePassword = <TVariables = {}>(): UseMutationResult<
    TUpdatePasswordData,
    Error,
    TVariables,
    unknown
> => {
    const { replace } = useNavigation();
    const { updatePassword: updatePasswordFromContext } =
        React.useContext<IAuthContext>(AuthContext);

    const { close, open } = useNotification();
    const { useLocation } = useRouterContext();

    const { search } = useLocation();

    const queryStrings = qs.parse(search, {
        ignoreQueryPrefix: true,
    });

    const queryResponse = useMutation<
        TUpdatePasswordData,
        Error,
        TVariables,
        unknown
    >(
        ["useUpdatePassword"],
        async (variables) => {
            return updatePasswordFromContext?.({
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
        },
    );

    return queryResponse;
};
