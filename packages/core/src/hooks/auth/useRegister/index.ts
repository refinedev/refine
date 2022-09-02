import React from "react";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

import { AuthContext } from "@contexts/auth";

import { IAuthContext, TRegisterData } from "../../../interfaces";
import { useNavigation, useNotification } from "@hooks";

/**
 * `useRegister` calls `register` method from {@link https://refine.dev/docs/api-references/providers/auth-provider `authProvider`} under the hood.
 *
 * @see {@link https://refine.dev/docs/core/hooks/auth/useRegister} for more details.
 *
 * @typeParam TData - Result data of the query
 * @typeParam TVariables - Values for mutation function. default `{}`
 *
 */
export const useRegister = <TVariables = {}>(): UseMutationResult<
    TRegisterData,
    Error,
    TVariables,
    unknown
> => {
    const { replace } = useNavigation();
    const { register: registerFromContext } =
        React.useContext<IAuthContext>(AuthContext);

    const { close, open } = useNotification();

    const queryResponse = useMutation<
        TRegisterData,
        Error,
        TVariables,
        unknown
    >(["useRegister"], registerFromContext, {
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
    });

    return queryResponse;
};
