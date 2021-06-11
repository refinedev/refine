import React from "react";
import { useMutation, UseMutationResult } from "react-query";
import { notification } from "antd";

import { AuthContext } from "@contexts/auth";
import { useNavigation } from "@hooks/navigation";

import { IAuthContext } from "../../../interfaces";

export const useLogin = <TVariables = any>(): UseMutationResult<
    any,
    Error,
    TVariables,
    unknown
> => {
    const { push } = useNavigation();
    const { login: loginFromContext } =
        React.useContext<IAuthContext>(AuthContext);

    const queryResponse = useMutation<any, Error, TVariables, unknown>(
        "useLogin",
        loginFromContext,
        {
            onSuccess: () => {
                push("/");
            },
            onError: (error: Error) => {
                notification.error({
                    message: error?.name || "Login Error",
                    description: error?.message || "Invalid credentials",
                });
            },
        },
    );

    return queryResponse;
};
