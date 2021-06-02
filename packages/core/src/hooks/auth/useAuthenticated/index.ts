import React, { useContext } from "react";

import { AuthContext } from "@contexts/auth";
import { IAuthContext } from "../../../interfaces";

export const useAuthenticated = () => {
    const { checkAuth } = useContext<IAuthContext>(AuthContext);

    const authenticated = React.useCallback(
        () =>
            checkAuth()
                .then(() => true)
                .catch(() => false),
        [],
    );

    return authenticated;
};
