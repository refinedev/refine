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
import { ResourceContextProvider, IResourceItem } from "@contexts/resource";
import { Auth } from "@containers/auth";
import { LoginPage } from "@pages";
import { IDataContext, IAuthContext } from "@interfaces";

export interface AdminProps {
    authProvider: IAuthContext;
    dataProvider: IDataContext;
    title?: ReactNode;
    loginPage?: ComponentType | false;
    dashboard?: React.FC;
}

export const Admin: React.FC<AdminProps> = ({
    authProvider,
    dataProvider,
    title,
    dashboard,
    children,
    loginPage = LoginPage,
}) => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
            },
        },
    });

    const resources: IResourceItem[] = [];
    React.Children.map(children, (child: any) => {
        resources.push({
            name: child.props.name,
            label: child.props.options?.label,
            icon: child.props.icon,
        });
    });

    return (
        <QueryClientProvider client={queryClient}>
            <AuthContextProvider {...authProvider}>
                <DataContextProvider {...dataProvider}>
                    <ResourceContextProvider resources={resources}>
                        <Router>
                            <Switch>
                                {loginPage && (
                                    <Route
                                        exact
                                        path="/login"
                                        component={loginPage}
                                    />
                                )}
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
                </DataContextProvider>
            </AuthContextProvider>
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </QueryClientProvider>
    );
};
