import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "antd/dist/antd.css";

import { AuthContextProvider, AuthContextProps } from "@providers/auth";
import { Auth } from "@containers/auth";
import { DashboardPage, ResourcePage, LoginPage } from "@pages";
import { store } from "@redux/store";

export interface AdminProps {
    authProvider: AuthContextProps;
}

export const Admin: React.FC<AdminProps> = ({ authProvider, children }) => {
    return (
        <AuthContextProvider {...authProvider}>
            <Router>
                <Provider store={store}>
                    <Switch>
                        <Route exact path="/login">
                            <LoginPage />
                        </Route>
                        <Auth>
                            {children}
                            <Route exact path="/">
                                <DashboardPage />
                            </Route>
                            <Route path="/resources/:resourceName">
                                <ResourcePage />
                            </Route>
                        </Auth>
                    </Switch>
                </Provider>
            </Router>
        </AuthContextProvider>
    );
};
