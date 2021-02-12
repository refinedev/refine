import React, { ComponentType, ReactNode } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "antd/dist/antd.css";

import { AuthContextProvider } from "@contexts/auth";
import { DataContextProvider } from "@contexts/data";
import { ResourceContextProvider } from "@contexts/resource";
import { Auth } from "@containers/auth";
import { LoginPage, ReadyPage } from "@pages";
import { IDataContext, IAuthContext } from "@interfaces";

export interface AdminProps {
    authProvider: IAuthContext;
    dataProvider: IDataContext;
    title?: ReactNode;
    dashboard?: React.FC;
    ready?: ComponentType | true;
}

export const Admin: React.FC<AdminProps> = ({
    authProvider,
    dataProvider,
    title,
    dashboard,
    ready = ReadyPage,
    children,
}) => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
            },
        },
    });

    const resources: string[] = [];
    React.Children.map(children, (child: any) => {
        resources.push(child.props.name);
    });

    return (
        <QueryClientProvider client={queryClient}>
            <AuthContextProvider {...authProvider}>
                <DataContextProvider {...dataProvider}>
                    {resources.length > 2 ? (
                        <ResourceContextProvider resources={resources}>
                            <Router>
                                <Switch>
                                    <Route exact path="/login">
                                        <LoginPage />
                                    </Route>
                                    <Auth title={title} dashboard={dashboard}>
                                        {/* <Switch> */}
                                        {/*  <Route exact path="/"> TODO: router yapısını düzelttiğimizde bu kısmı handle edelim
                                            {dashboard ? (
                                                dashboard
                                            ) : (
                                                <Redirect
                                                    to={`/resources/${resources[0]}`}
                                                />
                                            )}
                                        </Route> */}
                                        {children}
                                        {/*    </Switch> */}
                                    </Auth>
                                </Switch>
                            </Router>
                        </ResourceContextProvider>
                    ) : (
                        <Router>
                            <Switch>
                                <Route exact path="/">
                                    <ReadyPage />
                                </Route>
                            </Switch>
                        </Router>
                    )}
                </DataContextProvider>
            </AuthContextProvider>
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </QueryClientProvider>
    );
};
