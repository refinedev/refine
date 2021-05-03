import React from "react";
import { ConfigProvider } from "antd";
import { ConfigProviderProps } from "antd/lib/config-provider";
import { BrowserRouter as Router, RouteProps } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { AuthContextProvider } from "@contexts/auth";
import { DataContextProvider } from "@contexts/data";
import {
    defaultProvider,
    TranslationContextProvider,
} from "@contexts/translation";
import { ResourceContextProvider, IResourceItem } from "@contexts/resource";
import { AdminContextProvider } from "@contexts/admin";
import { NotificationContextProvider } from "@contexts/notification";
import { RouteProvider, ReadyPage as DefaultReadyPage } from "@components";
import { OptionalComponent, defaultConfigProviderProps } from "@definitions";
import {
    MutationMode,
    IDataContext,
    IAuthContext,
    I18nProvider,
    LayoutProps,
    TitleProps,
} from "../../../interfaces";

export interface AdminProps {
    authProvider?: IAuthContext;
    dataProvider: IDataContext;
    i18nProvider?: I18nProvider;
    catchAll?: React.ReactNode;
    LoginPage?: React.FC | false;
    DashboardPage?: React.FC;
    ReadyPage?: React.FC;
    mutationMode?: MutationMode;
    syncWithLocation?: boolean;
    warnWhenUnsavedChanges?: boolean;
    routes?: RouteProps[];
    configProviderProps?: ConfigProviderProps;
    undoableTimeout?: number;
    Layout?: React.FC<LayoutProps>;
    Sider?: React.FC;
    Header?: React.FC;
    Footer?: React.FC;
    OffLayoutArea?: React.FC;
    Title?: React.FC<TitleProps>;
}

export const Admin: React.FC<AdminProps> = ({
    authProvider,
    dataProvider,
    DashboardPage,
    ReadyPage,
    LoginPage,
    catchAll,
    children,
    i18nProvider = defaultProvider.i18nProvider,
    mutationMode = "pessimistic",
    syncWithLocation = false,
    warnWhenUnsavedChanges = false,
    routes = [],
    configProviderProps = defaultConfigProviderProps,
    undoableTimeout = 5000,
    Title,
    Layout,
    Sider,
    Header,
    Footer,
    OffLayoutArea,
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
            <OptionalComponent optional={ReadyPage}>
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
                                        Title={Title}
                                        undoableTimeout={undoableTimeout}
                                        Layout={Layout}
                                        Sider={Sider}
                                        Footer={Footer}
                                        Header={Header}
                                        OffLayoutArea={OffLayoutArea}
                                    >
                                        <Router>
                                            <RouteProvider
                                                resources={resources}
                                                catchAll={catchAll}
                                                DashboardPage={DashboardPage}
                                                LoginPage={LoginPage}
                                                ReadyPage={ReadyPage}
                                                customRoutes={routes}
                                            />
                                        </Router>
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
