import React from "react";

import { AuthContext } from "@contexts/auth";
import { IAuthContext } from "../../../interfaces";
import { useNavigation } from "@hooks/navigation";

type LogoutType = (params?: any, redirectPath?: string) => Promise<void>;
type UseLogoutType = () => LogoutType | null;

export const useLogout: UseLogoutType = () => {
    const { push } = useNavigation();
    const { isProvided, logout: logoutFromContext } =
        React.useContext<IAuthContext>(AuthContext);

    if (isProvided) {
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

    return null;
};
