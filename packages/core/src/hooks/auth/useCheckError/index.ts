import React from "react";
import { useMutation } from "react-query";

import { AuthContext } from "@contexts/auth";
import { IAuthContext } from "../../../interfaces";
import { useLogout } from "@hooks/auth";

export const useCheckError = () => {
    const { checkError: checkErrorFromContext } =
        React.useContext<IAuthContext>(AuthContext);

    const logout = useLogout();

    const queryResponse = useMutation("useCheckError", checkErrorFromContext, {
        onError: (redirectPath?: string) => {
            logout && logout(undefined, redirectPath);
        },
    });

    return queryResponse;
};
