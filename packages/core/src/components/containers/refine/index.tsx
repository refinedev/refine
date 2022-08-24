import React from "react";
import {
    QueryClientProvider,
    QueryClient,
    QueryCache,
    MutationCache,
    DefaultOptions,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { AuthContextProvider } from "@contexts/auth";
import { DataContextProvider } from "@contexts/data";
import { LiveContextProvider } from "@contexts/live";
import { TranslationContextProvider } from "@contexts/translation";
import { ResourceContextProvider, IResourceItem } from "@contexts/resource";
import { defaultRefineOptions, RefineContextProvider } from "@contexts/refine";
import { UndoableQueueContextProvider } from "@contexts/undoableQueue";
import { UnsavedWarnContextProvider } from "@contexts/unsavedWarn";
import { RouterContextProvider } from "@contexts/router";
import { AccessControlContextProvider } from "@contexts/accessControl";
import { NotificationContextProvider } from "@contexts/notification";
import { AuditLogContextProvider } from "@contexts/auditLog";
import { ReadyPage as DefaultReadyPage, RouteChangeHandler } from "@components";
import { routeGenerator } from "@definitions";
import { Telemetry } from "@components/telemetry";
import { useDeepMemo } from "@hooks/deepMemo";

import {
    MutationMode,
    IDataContextProvider,
    I18nProvider,
    LayoutProps,
    TitleProps,
    IRouterProvider,
    ResourceProps,
    ILiveContext,
    LiveModeProps,
    IDataMultipleContextProvider,
    AuthProvider,
    NotificationProvider,
    AccessControlProvider,
    AuditLogProvider,
} from "../../../interfaces";

interface QueryClientConfig {
    queryCache?: QueryCache;
    mutationCache?: MutationCache;
    defaultOptions?: DefaultOptions;
}
export interface RefineProps {
    authProvider?: AuthProvider;
    dataProvider: IDataContextProvider | IDataMultipleContextProvider;
    liveProvider?: ILiveContext;
    routerProvider: IRouterProvider;
    notificationProvider?: NotificationProvider | (() => NotificationProvider);
    accessControlProvider?: AccessControlProvider;
    auditLogProvider?: AuditLogProvider;
    resources?: ResourceProps[];
    i18nProvider?: I18nProvider;
    catchAll?: React.ReactNode;
    LoginPage?: React.FC;
    DashboardPage?: React.FC;
    ReadyPage?: React.FC;
    /** 
        @deprecated `mutationMode` property is deprecated at this level. Use it from within `options` instead.
        @example  `options={{ mutationMode: "optimistic" }}`
        @see https://refine.dev/docs/core/components/refine-config/#mutationmode
     */
    mutationMode?: MutationMode;
    /** 
        @deprecated `syncWithLocation` property is deprecated at this level. Use it from within `options` instead.
        @example  `options={{ syncWithLocation: true }}`
        @see https://refine.dev/docs/core/components/refine-config/#syncwithlocation
     */
    syncWithLocation?: boolean;
    /** 
        @deprecated `warnwhenunsavedchanges` property is deprecated at this level. Use it from within `options` instead.
        @example  `options={{ warnwhenunsavedchanges: true }}`
        @see https://refine.dev/docs/core/components/refine-config/#warnwhenunsavedchanges
     */
    warnWhenUnsavedChanges?: boolean;
    /** 
        @deprecated `undoableTimeout` property is deprecated at this level. Use it from within `options` instead.
        @example  `options={{ undoableTimeout: 5000 }}`
        @see https://refine.dev/docs/core/components/refine-config/#undoabletimeout
     */
    undoableTimeout?: number;
    Layout?: React.FC<LayoutProps>;
    Sider?: React.FC;
    Header?: React.FC;
    Footer?: React.FC;
    OffLayoutArea?: React.FC;
    Title?: React.FC<TitleProps>;
    /** 
        @deprecated `reactQueryClientConfig` property is deprecated. Use `clientConfig` in `reactQuery` in `options` instead.
        @example  `options={{ reactQuery: { clientConfig: { queryCache: new QueryCache() } } }}`
        @see https://refine.dev/docs/core/components/refine-config/#clientconfig
     */
    reactQueryClientConfig?: QueryClientConfig;
    /** 
        @deprecated `reactQueryDevtoolConfig` property is deprecated. Use `devtoolConfig` in `reactQuery` in `options` instead.
        @example  `options={{ reactQuery: { devtoolConfig: false } }}`
        @see https://refine.dev/docs/core/components/refine-config/#devtoolConfig
     */
    reactQueryDevtoolConfig?:
        | React.ComponentProps<typeof ReactQueryDevtools>
        | false;

    /** 
        @deprecated `liveMode` property is deprecated. Use it from within `options` instead.
        @example  `options={{ liveMode: "auto" }}`
        @see https://refine.dev/docs/core/components/refine-config/#livemode
     */
    liveMode?: LiveModeProps["liveMode"];
    onLiveEvent?: LiveModeProps["onLiveEvent"];
    children?: React.ReactNode;
    /** 
        @deprecated `disableTelemetry` property is deprecated. Use it from within `options` instead.
        @example  `options={{ disableTelemetry: true }}`
     */
    disableTelemetry?: boolean;
    options?: {
        mutationMode?: MutationMode;
        syncWithLocation?: boolean;
        warnWhenUnsavedChanges?: boolean;
        undoableTimeout?: number;
        liveMode?: LiveModeProps["liveMode"];
        disableTelemetry?: boolean;
        redirect?: {};
        reactQuery?: {
            clientConfig?: QueryClientConfig;
            devtoolConfig?:
                | React.ComponentProps<typeof ReactQueryDevtools>
                | false;
        };
    };
}

/**
 * {@link https://refine.dev/docs/api-references/components/refine-config `<Refine> component`} is the entry point of a refine app.
 * It is where the highest level of configuration of the app occurs.
 * Only a dataProvider is required to bootstrap the app. After adding a dataProvider, resources can be added as property.
 *
 * @see {@link https://refine.dev/docs/api-references/components/refine-config} for more details.
 */
export const Refine: React.FC<RefineProps> = ({
    authProvider,
    dataProvider,
    routerProvider,
    notificationProvider,
    accessControlProvider,
    auditLogProvider,
    resources: resourcesFromProps,
    DashboardPage,
    ReadyPage,
    LoginPage,
    catchAll,
    children,
    liveProvider,
    i18nProvider,
    mutationMode,
    syncWithLocation,
    warnWhenUnsavedChanges,
    undoableTimeout,
    Title,
    Layout,
    Sider,
    Header,
    Footer,
    OffLayoutArea,
    reactQueryClientConfig,
    reactQueryDevtoolConfig,
    liveMode,
    onLiveEvent,
    disableTelemetry,
    options,
}) => {
    const optionsDisableTelemetry = options?.disableTelemetry ?? false;

    const queryClient = useDeepMemo(() => {
        return new QueryClient({
            ...reactQueryClientConfig,
            ...options?.reactQuery?.clientConfig,
            defaultOptions: {
                ...reactQueryClientConfig?.defaultOptions,
                ...options?.reactQuery?.clientConfig?.defaultOptions,
                queries: {
                    refetchOnWindowFocus: false,
                    keepPreviousData: true,
                    ...reactQueryClientConfig?.defaultOptions?.queries,
                    ...options?.reactQuery?.clientConfig?.defaultOptions
                        ?.queries,
                },
            },
        });
    }, [reactQueryClientConfig, options?.reactQuery?.clientConfig]);

    const notificationProviderContextValues = React.useMemo(() => {
        return typeof notificationProvider === "function"
            ? notificationProvider()
            : notificationProvider ?? {};
    }, [notificationProvider]);

    const resources: IResourceItem[] = useDeepMemo(() => {
        const _resources: IResourceItem[] = [];

        resourcesFromProps?.forEach((resource) => {
            _resources.push({
                key: resource.key,
                name: resource.name,
                label: resource.options?.label,
                icon: resource.icon,
                route:
                    resource.options?.route ??
                    routeGenerator(resource, resourcesFromProps),
                canCreate: !!resource.create,
                canEdit: !!resource.edit,
                canShow: !!resource.show,
                canDelete: resource.canDelete,
                create: resource.create,
                show: resource.show,
                list: resource.list,
                edit: resource.edit,
                options: resource.options,
                parentName: resource.parentName,
            });
        });

        return _resources;
    }, [resourcesFromProps]);

    if (resources.length === 0) {
        return ReadyPage ? <ReadyPage /> : <DefaultReadyPage />;
    }

    const { RouterComponent = React.Fragment } = routerProvider;

    return (
        <QueryClientProvider client={queryClient}>
            <NotificationContextProvider {...notificationProviderContextValues}>
                <AuthContextProvider
                    {...(authProvider ?? {})}
                    isProvided={Boolean(authProvider)}
                >
                    <DataContextProvider {...dataProvider}>
                        <LiveContextProvider liveProvider={liveProvider}>
                            <RouterContextProvider {...routerProvider}>
                                <ResourceContextProvider resources={resources}>
                                    <TranslationContextProvider
                                        i18nProvider={i18nProvider}
                                    >
                                        <AccessControlContextProvider
                                            {...(accessControlProvider ?? {})}
                                        >
                                            <AuditLogContextProvider
                                                {...(auditLogProvider ?? {})}
                                            >
                                                <UndoableQueueContextProvider>
                                                    <RefineContextProvider
                                                        mutationMode={
                                                            mutationMode
                                                        }
                                                        warnWhenUnsavedChanges={
                                                            warnWhenUnsavedChanges
                                                        }
                                                        syncWithLocation={
                                                            syncWithLocation
                                                        }
                                                        Title={Title}
                                                        undoableTimeout={
                                                            undoableTimeout
                                                        }
                                                        catchAll={catchAll}
                                                        DashboardPage={
                                                            DashboardPage
                                                        }
                                                        LoginPage={LoginPage}
                                                        Layout={Layout}
                                                        Sider={Sider}
                                                        Footer={Footer}
                                                        Header={Header}
                                                        OffLayoutArea={
                                                            OffLayoutArea
                                                        }
                                                        hasDashboard={
                                                            !!DashboardPage
                                                        }
                                                        liveMode={liveMode}
                                                        onLiveEvent={
                                                            onLiveEvent
                                                        }
                                                        options={{
                                                            ...defaultRefineOptions,
                                                            ...options,
                                                        }}
                                                    >
                                                        <UnsavedWarnContextProvider>
                                                            <RouterComponent>
                                                                {children}
                                                                {!disableTelemetry &&
                                                                    !optionsDisableTelemetry && (
                                                                        <Telemetry />
                                                                    )}
                                                                <RouteChangeHandler />
                                                            </RouterComponent>
                                                        </UnsavedWarnContextProvider>
                                                    </RefineContextProvider>
                                                </UndoableQueueContextProvider>
                                            </AuditLogContextProvider>
                                        </AccessControlContextProvider>
                                    </TranslationContextProvider>
                                </ResourceContextProvider>
                            </RouterContextProvider>
                        </LiveContextProvider>
                    </DataContextProvider>
                </AuthContextProvider>
            </NotificationContextProvider>
            {reactQueryDevtoolConfig === false ||
            options?.reactQuery?.devtoolConfig === false ? null : (
                <ReactQueryDevtools
                    initialIsOpen={false}
                    position="bottom-right"
                    {...(reactQueryDevtoolConfig ?? {})}
                    {...(options?.reactQuery?.devtoolConfig ?? {})}
                />
            )}
        </QueryClientProvider>
    );
};
