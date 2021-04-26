import React, { ReactNode } from "react";
import { ConfigProvider } from "antd";
import { ConfigProviderProps } from "antd/lib/config-provider";
import { BrowserRouter as Router, RouteProps } from "react-router-dom";
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
import { NotificationContextProvider } from "@contexts/notification";
import { ComponentsContextProvider } from "@contexts/components";
import { RouteProvider, ReadyPage as DefaultReadyPage } from "@components";
import { OptionalComponent, defaultConfigProviderProps } from "@definitions";
import {
    MutationMode,
    IDataContext,
    IAuthContext,
    I18nProvider,
} from "../../../interfaces";

export interface AdminProps {
    authProvider?: IAuthContext;
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
    configProviderProps?: ConfigProviderProps;
    components?: ReactNode;
    undoableTimeout?: number;
    layout?: ReactNode;
    sider?: ReactNode;
    header?: ReactNode;
    footer?: ReactNode;
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
    configProviderProps = defaultConfigProviderProps,
    components,
    undoableTimeout = 5000,
    layout,
    sider,
    header,
    footer,
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
                            <ConfigProvider {...configProviderProps}>
                                <NotificationContextProvider>
                                    <AdminContextProvider
                                        mutationMode={mutationMode}
                                        warnWhenUnsavedChanges={
                                            warnWhenUnsavedChanges
                                        }
                                        syncWithLocation={syncWithLocation}
                                        title={title}
                                        undoableTimeout={undoableTimeout}
                                        layout={layout}
                                        sider={sider}
                                        footer={footer}
                                        header={header}
                                    >
                                        <ComponentsContextProvider
                                            components={components}
                                        >
                                            <Router>
                                                <RouteProvider
                                                    resources={resources}
                                                    catchAll={catchAll}
                                                    dashboard={dashboard}
                                                    loginPage={loginPage}
                                                    ready={ready}
                                                    customRoutes={routes}
                                                />
                                            </Router>
                                        </ComponentsContextProvider>
                                    </AdminContextProvider>
                                </NotificationContextProvider>
                            </ConfigProvider>
                        </TranslationContextProvider>
                    </ResourceContextProvider>
                </DataContextProvider>
            </AuthContextProvider>
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </QueryClientProvider>
    );
};
