import { useContext } from "react";

import { AuthContext } from "@contexts/auth";
import { IAuthContext } from "../../../interfaces";

export const useIsAuthenticated = () => {
    const { isAuthenticated } = useContext<IAuthContext>(AuthContext);

    return isAuthenticated;
};
