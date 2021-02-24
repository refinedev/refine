import React, { ReactNode } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "antd/dist/antd.css";

import { AuthContextProvider } from "@contexts/auth";
import { DataContextProvider } from "@contexts/data";
import { TranslationProvider } from "@contexts/translation";
import { RouteProvider } from "@containers/routeProvider";
import { ResourceContextProvider, IResourceItem } from "@contexts/resource";
import { ReadyPage as DefaultReadyPage } from "@pages";
import { OptionalComponent } from "@definitions";
import { IDataContext, IAuthContext, I18nProvider } from "@interfaces";

export interface AdminProps {
    authProvider: IAuthContext;
    dataProvider: IDataContext;
    i18nProvider: I18nProvider;
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
    loginPage,
    catchAll,
    children,
    i18nProvider,
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
        return (
            <OptionalComponent optional={ready}>
                <DefaultReadyPage />
            </OptionalComponent>
        );
    }

    return (
        <QueryClientProvider client={queryClient}>
            <AuthContextProvider {...authProvider}>
                <DataContextProvider {...dataProvider}>
                    <ResourceContextProvider resources={resources}>
                        <TranslationProvider i18nProvider={i18nProvider}>
                            <Router>
                                <RouteProvider
                                    resources={children}
                                    catchAll={catchAll}
                                    title={title}
                                    dashboard={dashboard}
                                    loginPage={loginPage}
                                    ready={ready}
                                />
                            </Router>
                        </TranslationProvider>
                    </ResourceContextProvider>
                </DataContextProvider>
            </AuthContextProvider>
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </QueryClientProvider>
    );
};
