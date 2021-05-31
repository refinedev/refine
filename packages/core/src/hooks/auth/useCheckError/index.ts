import React from "react";

import { AuthContext } from "@contexts/auth";
import { IAuthContext } from "../../../interfaces";
import { useLogout } from "@hooks/auth";

export const useCheckError = () => {
    const { isProvided, checkError: checkErrorFromContext } =
        React.useContext<IAuthContext>(AuthContext);

    const logout = useLogout();

    if (isProvided) {
        const checkError = (params: any) =>
            checkErrorFromContext(params)
                .then(() => Promise.resolve())
                .catch((redirectPath) => {
                    console.log("check redirect", redirectPath);
                    return logout && logout(undefined, redirectPath);
                });

        return checkError;
    }

    return null;
};
