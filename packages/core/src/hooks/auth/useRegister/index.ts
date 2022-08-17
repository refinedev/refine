import React from "react";
import { useMutation, UseMutationResult } from "react-query";
import qs from "qs";

import { AuthContext } from "@contexts/auth";

import { IAuthContext, TRegisterData } from "../../../interfaces";
import { useNavigation, useRouterContext, useNotification } from "@hooks";

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

    const { useLocation } = useRouterContext();
    const { search } = useLocation();
    const { close, open } = useNotification();

    const { to } = qs.parse(search?.substring(1));

    const queryResponse = useMutation<
        TRegisterData,
        Error,
        TVariables,
        unknown
    >("useRegister", registerFromContext, {
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
            close?.("register-error");
        },
        onError: (error: any) => {
            open?.({
                message: error?.name || "Register Error",
                description: error?.message || "Invalid credentials",
                key: "register-error",
                type: "error",
            });
        },
    });

    return queryResponse;
};
