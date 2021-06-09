import React from "react";
import { useQuery, UseQueryResult, useMutation } from "react-query";

import { AuthContext } from "@contexts/auth";
import { IAuthContext } from "../../../interfaces";
import { useLogout } from "@hooks/auth";

export const useCheckError = () => {
    const { isProvided, checkError: checkErrorFromContext } =
        React.useContext<IAuthContext>(AuthContext);

    const logout = useLogout();

    const queryResponse = useMutation("useCheckError", checkErrorFromContext, {
        onError: (redirectPath?: string) => {
            console.log("usecheckerror onerror", redirectPath);
            console.log("usecheckerror logout", logout);
            logout && logout(undefined, redirectPath);
        },
    });

    /* if (isProvided) {
        return { ...queryResponse, checkError: queryResponse.mutate };
    } */

    return { ...queryResponse, checkError: queryResponse.mutate };

    // return null;
};
