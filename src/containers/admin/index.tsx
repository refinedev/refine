import React, { ReactNode } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "antd/dist/antd.css";

import { AuthContextProvider } from "@contexts/auth";
import { DataContextProvider } from "@contexts/data";
import { ResourceContextProvider } from "@contexts/resource";
import { LocaleContextProvider } from "@contexts/locale";
import { Auth } from "@containers/auth";
import { DashboardPage, LoginPage } from "@pages";
import { IDataContext, IAuthContext, ICustomLocale } from "@interfaces";

export interface AdminProps {
    authProvider: IAuthContext;
    dataProvider: IDataContext;
    locale?: ICustomLocale;
    title?: ReactNode;
}

export const Admin: React.FC<AdminProps> = ({
    authProvider,
    dataProvider,
    locale,
    title,
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
                    <ResourceContextProvider resources={resources}>
                        <LocaleContextProvider locale={locale ?? {}}>
                            <Router>
                                <Switch>
                                    <Route exact path="/login">
                                        <LoginPage />
                                    </Route>
                                    <Auth title={title}>
                                        <Route exact path="/">
                                            <DashboardPage />
                                        </Route>
                                        {children}
                                    </Auth>
                                </Switch>
                            </Router>
                        </LocaleContextProvider>
                    </ResourceContextProvider>
                </DataContextProvider>
            </AuthContextProvider>
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </QueryClientProvider>
    );
};
