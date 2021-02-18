import React, { ReactNode } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "antd/dist/antd.css";

import { AuthContextProvider } from "@contexts/auth";
import { DataContextProvider } from "@contexts/data";
import { RouteProvider } from "@containers/routeProvider";
import { ResourceContextProvider, IResourceItem } from "@contexts/resource";
import { ReadyPage } from "@pages";

import { IDataContext, IAuthContext } from "@interfaces";

export interface AdminProps {
    authProvider: IAuthContext;
    dataProvider: IDataContext;
    catchAll?: React.ReactNode;
    title?: ReactNode;
    loginPage?: React.FC | false;
    dashboard?: React.FC;
    ready?: React.FC;
}

export const Admin: React.FC<AdminProps> = ({
    authProvider,
    dataProvider,
    title,
    dashboard,
    ready,
    children,
    loginPage,
    catchAll,
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

    if (resources.length === 0) {
        return <ReadyPage />;
    }

    return (
        <QueryClientProvider client={queryClient}>
            <AuthContextProvider {...authProvider}>
                <DataContextProvider {...dataProvider}>
                    <ResourceContextProvider resources={resources}>
                        <Router>
                            <RouteProvider
                                resources={children}
                                catchAll={catchAll}
                                title={title}
                                dashboard={dashboard}
                                loginPage={loginPage}
                            />
                        </Router>
                    </ResourceContextProvider>
                </DataContextProvider>
            </AuthContextProvider>
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </QueryClientProvider>
    );
};
