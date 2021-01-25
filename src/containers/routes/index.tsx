import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { DashboardPage } from "@pages";

export const Routes: React.FC = () => {
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
