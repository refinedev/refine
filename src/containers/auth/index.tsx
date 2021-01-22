import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { DashboardPage, LoginPage } from "@pages";
import { ILoginForm } from "@pages/login";

export interface IAuthProps {
    login?: (params: ILoginForm) => Promise<any>;
    checkAuth?: () => Promise<any>;
}

export const Auth: React.FC<IAuthProps> = ({ login, checkAuth }) => {
    const [auth, setAuth] = React.useState(false);

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
