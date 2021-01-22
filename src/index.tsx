import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "antd/dist/antd.css";

import { DashboardPage, LoginPage } from "@pages";

export interface AdminProps {
    foo?: string;
}

export const Admin: React.FC<AdminProps> = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <DashboardPage />
                </Route>
                <Route path="/login">
                    <LoginPage />
                </Route>
            </Switch>
        </Router>
    );
};
