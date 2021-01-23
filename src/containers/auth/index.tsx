import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { UserActions } from "@actions";
import { DashboardPage, LoginPage } from "@pages";
import { ILoginForm } from "@pages/login";
import { useDispatch } from "react-redux";

export interface IAuthProps {
    login?: (params: ILoginForm) => Promise<any>;
    checkAuth?: () => Promise<any>;
    userIdentity?: () => Promise<any>;
}

export const Auth: React.FC<IAuthProps> = ({
    login,
    checkAuth,
    userIdentity,
}) => {
    const [auth, setAuth] = React.useState(false);
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
                    .then(() => setAuth(true))
                    .catch(() => console.log("login error"));
        };
        return <LoginPage onSubmit={onSubmit} />;
    }

    // set user identity
    userIdentity &&
        userIdentity().then((data) => {
            dispatch(UserActions.setIdentity(data));
        });

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <DashboardPage />
                </Route>
            </Switch>
        </Router>
    );
};
