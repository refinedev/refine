import React from "react";
import { useMutation, UseMutationResult } from "react-query";
import qs from "qs";

import { AuthContext } from "@contexts/auth";

import { IAuthContext, TUpdatePasswordData } from "../../../interfaces";
import { useNavigation, useRouterContext, useNotification } from "@hooks";

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

    const { useLocation } = useRouterContext();
    const { search } = useLocation();
    const { close, open } = useNotification();

    const { to } = qs.parse(search?.substring(1));

    const queryResponse = useMutation<
        TUpdatePasswordData,
        Error,
        TVariables,
        unknown
    >("useUpdatePassword", updatePasswordFromContext, {
        onSuccess: (redirectPathFromAuth) => {
            if (to) {
                return replace(to as string);
            }

            if (redirectPathFromAuth !== false) {
                if (redirectPathFromAuth) {
                    replace(redirectPathFromAuth);
                } else {
                    replace("/");
                }
            }
            close?.("update-password-error");
        },
        onError: (error: any) => {
            open?.({
                message: error?.name || "Update Password Error",
                description: error?.message || "Invalid credentials",
                key: "update-password-error",
                type: "error",
            });
        },
    });

    return queryResponse;
};
