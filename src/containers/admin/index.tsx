import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "antd/dist/antd.css";

import { AuthContextProvider, IAuthContext } from "@contexts/auth";
import { DataContextProvider, IDataContext } from "@contexts/data";
import { ResourceContextProvider } from "@contexts/resource";
import { Auth } from "@containers/auth";
import {
    DashboardPage,
    LoginPage,
    ListPage,
    CreatePage,
    EditPage,
    ShowPage,
} from "@pages";

export interface AdminProps {
    authProvider: IAuthContext;
    dataProvider: IDataContext;
}

export const Admin: React.FC<AdminProps> = ({
    authProvider,
    dataProvider,
    children,
}) => {
    const queryClient = new QueryClient();

    const resources: string[] = [];
    React.Children.map(children, (child: any) => {
        resources.push(child.props.name);
    });

    return (
        <QueryClientProvider client={queryClient}>
            <AuthContextProvider {...authProvider}>
                <DataContextProvider {...dataProvider}>
                    <ResourceContextProvider resources={resources}>
                        <Router>
                            <Switch>
                                <Route exact path="/login">
                                    <LoginPage />
                                </Route>
                                <Auth>
                                    <Route exact path="/">
                                        <DashboardPage />
                                    </Route>
                                    <Route
                                        exact
                                        path="/resources/:resourceName"
                                    >
                                        <ListPage />
                                    </Route>
                                    <Route
                                        exact
                                        path="/resources/:resourceName/create"
                                    >
                                        <CreatePage />
                                    </Route>
                                    <Route
                                        exact
                                        path="/resources/:resourceName/edit/:id"
                                    >
                                        <EditPage />
                                    </Route>
                                    <Route
                                        exact
                                        path="/resources/:resourceName/show/:id"
                                    >
                                        <ShowPage />
                                    </Route>
                                </Auth>
                            </Switch>
                        </Router>
                    </ResourceContextProvider>
                </DataContextProvider>
            </AuthContextProvider>
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </QueryClientProvider>
    );
};
