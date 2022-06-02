import { useContext, useEffect } from "react";
import { AuthContext } from "@contexts/auth";
import { useRouterContext } from "@hooks";

import { IAuthContext } from "../../interfaces";

export const RouteChangeHandler: React.FC = () => {
    const { useLocation } = useRouterContext();

    const { checkAuth } = useContext<IAuthContext>(AuthContext);
    const location = useLocation();

    useEffect(() => {
        checkAuth?.().catch(() => false);
    }, [location?.pathname]);

    return null;
};
