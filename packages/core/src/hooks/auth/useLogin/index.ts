import React from "react";
import { useMutation, UseMutationResult } from "react-query";

import { AuthContext } from "@contexts/auth";
import { useNotification } from "@hooks";
import { useNavigation } from "@hooks/navigation";

import { IAuthContext } from "../../../interfaces";

export const useLogin = (): UseMutationResult<any, Error, any, unknown> => {
    const { push } = useNavigation();
    const { login: loginFromContext } =
        React.useContext<IAuthContext>(AuthContext);
    const notification = useNotification();

    const queryResponse = useMutation("useLogin", loginFromContext, {
        onSuccess: () => {
            push("/");
        },
        onError: (error: Error) => {
            notification.error({
                message: error?.name || "Login Error",
                description: error?.message || "Invalid credentials",
            });
        },
    });

    return queryResponse;
};
