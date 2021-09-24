import React from "react";
import { ConfigProvider, notification } from "antd";
import { ConfigProviderProps } from "antd/lib/config-provider";
import { ConfigProps } from "antd/lib/notification";
import { RouteProps } from "react-router-dom";
import {
    QueryClientProvider,
    QueryClient,
    QueryCache,
    MutationCache,
    DefaultOptions,
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { AuthContextProvider } from "@contexts/auth";
import { DataContextProvider } from "@contexts/data";
import {
    defaultProvider,
    TranslationContextProvider,
} from "@contexts/translation";
import { ResourceContextProvider, IResourceItem } from "@contexts/resource";
import { RefineContextProvider } from "@contexts/refine";
import { NotificationContextProvider } from "@contexts/notification";
import { UnsavedWarnContextProvider } from "@contexts/unsavedWarn";
import {
    RouteProvider,
    ReadyPage as DefaultReadyPage,
    RouteChangeHandler,
    Resource,
    NextRouteComponent,
} from "@components";
import { defaultConfigProviderProps } from "@definitions";
import {
    MutationMode,
    IDataContextProvider,
    IAuthContext,
    I18nProvider,
    LayoutProps,
    TitleProps,
} from "../../../interfaces";
import { useWarnAboutChange } from "@hooks/refine";

import * as H from "history";
import { ResourceProps } from "../resource";

interface QueryClientConfig {
    queryCache?: QueryCache;
    mutationCache?: MutationCache;
    defaultOptions?: DefaultOptions;
}

interface IResource extends IResourceItem, ResourceProps {}

export interface RefineProps {
    authProvider?: IAuthContext;
    dataProvider: IDataContextProvider;
    resources?: IResource[];
    i18nProvider?: I18nProvider;
    catchAll?: React.ReactNode;
    LoginPage?: React.FC;
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
    reactQueryClientConfig?: QueryClientConfig;
    notifcationConfig?: ConfigProps;
    useHistory: () => H.History;
    useLocation: <S = H.LocationState>() => H.Location<S>;
    useParams: <
        Params extends { [K in keyof Params]?: string } = {},
    >() => Params;
    BrowserRouter: any;
    Switch: any;
    Route: any;
    Prompt: any;
    Link: any;
    Redirect: any;
}

/**
 * {@link https://refine.dev/docs/api-references/components/refine-config `<Refine> component`} is the entry point of a refine app.
 * It is where the highest level of configuration of the app occurs.
 * Only a dataProvider is required to bootstrap the app. After adding a dataProvider, {@link https://refine.dev/docs/api-references/components/resource `<Resource>`}'s can be added as children.
 *
 * @see {@link https://refine.dev/docs/api-references/components/refine-config} for more details.
 */
export const Refine: React.FC<RefineProps> = ({
    authProvider,
    dataProvider,
    resources: resourcesFromProps,
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
    reactQueryClientConfig,
    notifcationConfig,
    useHistory,
    useLocation,
    useParams,
    BrowserRouter,
    Switch,
    Route,
    Prompt,
    Link,
    Redirect,
}) => {
    const queryClient = new QueryClient({
        ...reactQueryClientConfig,
        defaultOptions: {
            ...reactQueryClientConfig?.defaultOptions,
            queries: {
                refetchOnWindowFocus: false,
                keepPreviousData: true,
                ...reactQueryClientConfig?.defaultOptions?.queries,
            },
        },
    });

    notification.config({ ...notifcationConfig });

    let isSSr = true;
    const resources: IResourceItem[] = [];

    resourcesFromProps?.map((resource) => {
        resources.push({
            name: resource.name,
            label: resource.options?.label,
            icon: resource.icon,
            route: resource.options?.route ?? resource.name,
            canCreate: !!resource.create,
            canEdit: !!resource.edit,
            canShow: !!resource.show,
            canDelete: resource.canDelete,
            create: resource.create,
            show: resource.show,
            list: resource.list,
            edit: resource.edit,
        });
    });

    React.Children.map(children, (child: any) => {
        if (!child) {
            return;
        }

        if (child.type === Resource) {
            isSSr = false;

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
        }
    });

    if (resources.length === 0) {
        return ReadyPage ? <ReadyPage /> : <DefaultReadyPage />;
    }

    return (
        <QueryClientProvider client={queryClient}>
            <AuthContextProvider {...authProvider} isProvided={!!authProvider}>
                <DataContextProvider {...dataProvider}>
                    <ResourceContextProvider resources={resources}>
                        <TranslationContextProvider i18nProvider={i18nProvider}>
                            <ConfigProvider {...configProviderProps}>
                                <NotificationContextProvider>
                                    <RefineContextProvider
                                        mutationMode={mutationMode}
                                        warnWhenUnsavedChanges={
                                            warnWhenUnsavedChanges
                                        }
                                        syncWithLocation={syncWithLocation}
                                        Title={Title}
                                        undoableTimeout={undoableTimeout}
                                        customRoutes={routes}
                                        Layout={Layout}
                                        Sider={Sider}
                                        Footer={Footer}
                                        Header={Header}
                                        OffLayoutArea={OffLayoutArea}
                                        hasDashboard={!!DashboardPage}
                                        useHistory={useHistory}
                                        useLocation={useLocation}
                                        useParams={useParams}
                                        Prompt={Prompt}
                                        Link={Link}
                                    >
                                        <UnsavedWarnContextProvider>
                                            {isSSr ? (
                                                children
                                            ) : (
                                                <MainRouter
                                                    BrowserRouter={
                                                        BrowserRouter
                                                    }
                                                >
                                                    <>
                                                        <RouteProvider
                                                            resources={
                                                                resources
                                                            }
                                                            catchAll={catchAll}
                                                            DashboardPage={
                                                                DashboardPage
                                                            }
                                                            LoginPage={
                                                                LoginPage
                                                            }
                                                            ReadyPage={
                                                                ReadyPage
                                                            }
                                                            customRoutes={
                                                                routes
                                                            }
                                                            Switch={Switch}
                                                            Route={Route}
                                                            Redirect={Redirect}
                                                        />
                                                        <RouteChangeHandler
                                                            useLocation={
                                                                useLocation
                                                            }
                                                        />
                                                    </>
                                                </MainRouter>
                                            )}
                                        </UnsavedWarnContextProvider>
                                    </RefineContextProvider>
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

const MainRouter: React.FC<{ BrowserRouter: any }> = ({
    children,
    BrowserRouter,
}) => {
    const { setWarnWhen } = useWarnAboutChange();

    const getUserConfirmation: (
        message: string,
        callback: (ok: boolean) => void,
    ) => void = (message, callback) => {
        const allowTransition = window.confirm(message);
        if (allowTransition) {
            setWarnWhen(false);
        }
        callback(allowTransition);
    };
    return (
        <BrowserRouter getUserConfirmation={getUserConfirmation}>
            {children}
        </BrowserRouter>
    );
};
