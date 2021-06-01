import React from "react";

import { AuthContext } from "@contexts/auth";
import { IAuthContext } from "../../../interfaces";
import { useNavigation } from "@hooks/navigation";

export const useLogout = () => {
    const { push } = useNavigation();
    const { isProvided, logout: logoutFromContext } =
        React.useContext<IAuthContext>(AuthContext);

    if (isProvided) {
        const logout = (params?: any, redirectPath?: string) =>
            logoutFromContext(params)
                .then((data) => {
                    if (data !== false) {
                        if (redirectPath) {
                            push(redirectPath);
                        } else if (data) {
                            push(data);
                        } else {
                            push("/login");
                        }
                    }
                    Promise.resolve(data);
                })
                .catch((error) => Promise.reject(error));

        return logout;
    }

    return null;
};
