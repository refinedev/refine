import React, { useContext, ReactNode } from "react";
import { useHistory } from "react-router-dom";

import { Layout } from "@components";
import { AuthContext } from "@contexts/auth";
import { IAuthContext } from "@interfaces";

export interface AuthProps {
    title?: ReactNode;
    dashboard?: ReactNode;
}

export const Auth: React.FC<AuthProps> = ({ children, title, dashboard }) => {
    const { checkAuth } = useContext<IAuthContext>(AuthContext);
    const history = useHistory();

    // const dispatch = useDispatch();

    // check auth
    checkAuth({}).catch(() => history.push("/login"));

    // set user identity
    // userIdentity &&
    //     userIdentity().then((data: any) => {
    //         dispatch(UserActions.setIdentity(data));
    //     });

    return <Layout title={title} dashboard={dashboard}>{children}</Layout>;
};
