import { useContext, useEffect, FC } from "react";
import { useLocation } from "react-router";
import { AuthContext } from "@contexts/auth";

import { useWarnAboutChange } from "@hooks";
import { IAuthContext } from "../../interfaces";

export const RouteChangeHandler: FC = () => {
    const { checkAuth } = useContext<IAuthContext>(AuthContext);
    const { setWarnWhen } = useWarnAboutChange();
    const location = useLocation();

    useEffect(() => {
        checkAuth().catch(() => false);
        setWarnWhen(false);
    }, [location?.pathname]);

    return null;
};
