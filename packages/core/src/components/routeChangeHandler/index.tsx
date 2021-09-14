import { useContext, useEffect, FC } from "react";
// import { useLocation } from "react-router";
import { AuthContext } from "@contexts/auth";

import { IAuthContext } from "../../interfaces";

import * as H from "history";

export const RouteChangeHandler: FC<{ useLocation: () => H.Location }> = ({
    useLocation,
}) => {
    const { checkAuth } = useContext<IAuthContext>(AuthContext);
    const location = useLocation();

    useEffect(() => {
        checkAuth().catch(() => false);
    }, [location?.pathname]);

    return null;
};
