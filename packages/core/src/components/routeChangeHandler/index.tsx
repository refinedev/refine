import { useContext, useEffect, FC } from "react";
import { useLocation } from "react-router";
import { AuthContext } from "@contexts/auth";

import { IAuthContext } from "../../interfaces";

export const RouteChangeHandler: FC = () => {
    const { checkAuth } = useContext<IAuthContext>(AuthContext);
    const location = useLocation();

    useEffect(() => {
        checkAuth().catch(() => false);
    }, [location?.pathname]);

    return null;
};
