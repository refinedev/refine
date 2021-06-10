import React from "react";
import { notification } from "antd";

import { AuthContext } from "@contexts/auth";
import { useNavigation } from "@hooks/navigation";

import { IAuthContext } from "../../../interfaces";

export const useLogin = (): ((params: any) => Promise<any>) => {
    const { push } = useNavigation();
    const authContext = React.useContext<IAuthContext>(AuthContext);

    const login = React.useCallback(
        (params: any) =>
            authContext
                .login(params)
                .then((response) => {
                    push("/");
                    return Promise.resolve(response);
                })
                .catch((error: Error) => {
                    notification.error({
                        message: error.name || "Login Error",
                        description:
                            error.message || "Invalid username or password",
                    });

                    return Promise.reject(error);
                }),
        [push, authContext, notification],
    );

    return login;
};
