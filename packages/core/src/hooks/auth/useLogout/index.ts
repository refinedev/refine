import React from "react";
import { useMutation, UseMutationResult } from "react-query";

import { AuthContext } from "@contexts/auth";
import { IAuthContext } from "../../../interfaces";
import { useNavigation } from "@hooks/navigation";

type LogoutType = (params?: any, redirectPath?: string) => Promise<void>;
type UseLogoutType = () => LogoutType | null;

export const useLogout = (): UseMutationResult<
    void | false | string,
    any,
    string | void,
    unknown
> => {
    const { push } = useNavigation();
    const { logout: logoutFromContext } =
        React.useContext<IAuthContext>(AuthContext);

    const queryResponse = useMutation<
        void | false | string,
        any,
        string | void,
        any
    >("useLogout", logoutFromContext, {
        onSuccess: (redirectPathFromAuth, redirectPath) => {
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

    /*  if (isProvided) {
        const logout: LogoutType = (params?: any, redirectPath?: string) =>
            logoutFromContext(params)
                .then((pathFromAuthProvider) => {
                    if (pathFromAuthProvider !== false) {
                        if (redirectPath) {
                            push(redirectPath);
                        } else if (pathFromAuthProvider) {
                            push(pathFromAuthProvider);
                        } else {
                            push("/login");
                        }
                    }
                    Promise.resolve(pathFromAuthProvider);
                })
                .catch((error) => Promise.reject(error));

        return logout;
    }

    return null; */
};
