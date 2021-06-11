import React from "react";
import { useMutation, UseMutationResult } from "react-query";

import { AuthContext } from "@contexts/auth";
import {
    IAuthContext,
    TLogoutVariables,
    TLogoutData,
} from "../../../interfaces";
import { useNavigation } from "@hooks/navigation";

export const useLogout = (): UseMutationResult<
    TLogoutData,
    unknown,
    TLogoutVariables,
    unknown
> => {
    const { push } = useNavigation();
    const { logout: logoutFromContext } =
        React.useContext<IAuthContext>(AuthContext);

    const queryResponse = useMutation<
        TLogoutData,
        unknown,
        TLogoutVariables,
        unknown
    >("useLogout", logoutFromContext, {
        onSuccess: (redirectPathFromAuth, { redirectPath } = {}) => {
            if (redirectPathFromAuth !== false) {
                if (redirectPath) {
                    push(redirectPath);
                } else if (redirectPathFromAuth) {
                    push(redirectPathFromAuth);
                } else {
                    push("/login");
                }
            }
        },
    });

    return queryResponse;
};
