import React from "react";
import { useDispatch } from "react-redux";

import { UserActions } from "@actions";
import { Layout } from "@components";
import { LoginPage } from "@pages";
import { ILoginForm } from "@pages/login";

export interface IAuthProps {
    login?: (params: ILoginForm) => Promise<any>;
    checkAuth?: () => Promise<any>;
    userIdentity?: () => Promise<any>;
    logout?: () => Promise<any>;
}

export const Auth: React.FC<IAuthProps> = ({
    login,
    checkAuth,
    userIdentity,
    logout,
    children,
}) => {
    const [auth, setAuth] = React.useState(false);
    const [loginError, setLoginError] = React.useState(false);

    const dispatch = useDispatch();

    // check auth
    checkAuth &&
        checkAuth()
            .then(() => setAuth(true))
            .catch(() => setAuth(false));

    if (!auth) {
        const onSubmit = async (values: ILoginForm) => {
            login &&
                login(values)
                    .then(() => {
                        setAuth(true);
                        setLoginError(false);
                    })
                    .catch(() => setLoginError(true));
        };
        return <LoginPage onSubmit={onSubmit} isLoginError={loginError} />;
    }

    // set user identity
    userIdentity &&
        userIdentity().then((data) => {
            dispatch(UserActions.setIdentity(data));
        });

    return (
        <Layout
            menuOnClick={({ key }) => {
                switch (key) {
                    case "logout":
                        logout && logout().then(() => setAuth(false));
                        break;
                }
            }}
        >
            {children}
        </Layout>
    );
};
