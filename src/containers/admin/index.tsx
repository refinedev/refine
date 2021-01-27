import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "antd/dist/antd.css";

import { AuthContextProvider, IAuthContext } from "@contexts/auth";
import { DataContextProvider, IDataContext } from "@contexts/data";
import { ResourceContextProvider } from "@contexts/resource";
import { Auth } from "@containers/auth";
import { DashboardPage, LoginPage } from "@pages";
import { store } from "@redux/store";

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
                            <Provider store={store}>
                                <Switch>
                                    <Route exact path="/login">
                                        <LoginPage />
                                    </Route>
                                    <Auth>
                                        <Route exact path="/">
                                            <DashboardPage />
                                        </Route>

                                        {children}
                                    </Auth>
                                </Switch>
                            </Provider>
                        </Router>
                    </ResourceContextProvider>
                </DataContextProvider>
            </AuthContextProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};
