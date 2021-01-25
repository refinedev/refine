import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "antd/dist/antd.css";

import { Auth, IAuthProps } from "@containers/auth";
import { DashboardPage, ResourcePage } from "@pages";
import { store } from "@redux/store";

export interface AdminProps {
    authProvider: IAuthProps;
}

export const Admin: React.FC<AdminProps> = ({ authProvider, children }) => {
    return (
        <Router>
            <Provider store={store}>
                <Auth {...authProvider}>
                    {children}
                    <Switch>
                        <Route exact path="/">
                            <DashboardPage />
                        </Route>
                        <Route path="/resources/:name">
                            <ResourcePage />
                        </Route>
                    </Switch>
                </Auth>
            </Provider>
        </Router>
    );
};
