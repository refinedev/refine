import { useContext, useEffect, FC } from "react";
import { AuthContext } from "@contexts/auth";

import { IAuthContext } from "../../interfaces";

export const RouteChangeHandler: FC<{ useLocation: () => any }> = ({
    useLocation,
}) => {
    const { checkAuth } = useContext<IAuthContext>(AuthContext);
    const location = useLocation();

    useEffect(() => {
        checkAuth().catch(() => false);
    }, [location?.pathname]);

    return null;
};
