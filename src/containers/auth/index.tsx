import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { UserActions } from "@actions";
import { Layout } from "@components";
import { AuthContext, AuthContextProps } from "@providers/auth";

export const Auth: React.FC = ({ children }) => {
    const { checkAuth, userIdentity } = useContext<AuthContextProps>(
        AuthContext,
    );
    const history = useHistory();

    const dispatch = useDispatch();

    // check auth
    checkAuth && checkAuth().catch(() => history.push("/login"));

    // set user identity
    userIdentity &&
        userIdentity().then((data) => {
            dispatch(UserActions.setIdentity(data));
        });

    return <Layout>{children}</Layout>;
};
