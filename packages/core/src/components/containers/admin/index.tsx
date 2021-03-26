import React, { ReactNode } from "react";
import { BrowserRouter as Router, Route, RouteProps } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "antd/dist/antd.css";

import { AuthContextProvider } from "@contexts/auth";
import { DataContextProvider } from "@contexts/data";
import {
    defaultProvider,
    TranslationContextProvider,
} from "@contexts/translation";
import { ResourceContextProvider, IResourceItem } from "@contexts/resource";
import { AdminContextProvider } from "@contexts/admin";
import { RouteProvider, ReadyPage as DefaultReadyPage } from "@components";
import { OptionalComponent } from "@definitions";
import { IDataContext, IAuthContext, I18nProvider } from "@interfaces";
import { MutationMode } from "../../../interfaces";
import { NotificationContextProvider } from "@contexts/notification";

export interface AdminProps {
    authProvider: IAuthContext;
    dataProvider: IDataContext;
    i18nProvider?: I18nProvider;
    catchAll?: React.ReactNode;
    title?: ReactNode;
    loginPage?: React.FC | false;
    dashboard?: React.FC;
    ready?: React.FC;
    mutationMode?: MutationMode;
    syncWithLocation?: boolean;
    warnWhenUnsavedChanges?: boolean;
    routes?: RouteProps[];
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
    i18nProvider = defaultProvider.i18nProvider,
    mutationMode = "pessimistic",
    syncWithLocation = false,
    warnWhenUnsavedChanges = false,
    routes = [],
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
            route: child.props.options?.route ?? child.props.name,
            canCreate: !!child.props.create,
            canEdit: !!child.props.edit,
            canShow: !!child.props.show,
            canDelete: child.props.canDelete,
            create: child.props.create,
            show: child.props.show,
            list: child.props.list,
            edit: child.props.edit,
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
                        <TranslationContextProvider i18nProvider={i18nProvider}>
                            <NotificationContextProvider>
                                <AdminContextProvider
                                    mutationMode={mutationMode}
                                    warnWhenUnsavedChanges={warnWhenUnsavedChanges}
                                    syncWithLocation={syncWithLocation}
                                >
                                    <Router>
                                        <RouteProvider
                                            resources={resources}
                                            catchAll={catchAll}
                                            title={title}
                                            dashboard={dashboard}
                                            loginPage={loginPage}
                                            ready={ready}
                                            customRoutes={routes}
                                        />
                                    </Router>
                            </AdminContextProvider>
                            </NotificationContextProvider>
                        </TranslationContextProvider>
                    </ResourceContextProvider>
                </DataContextProvider>
            </AuthContextProvider>
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </QueryClientProvider>
    );
};
