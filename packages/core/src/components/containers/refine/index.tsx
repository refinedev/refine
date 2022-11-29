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
import { RefineContextProvider } from "@contexts/refine";
import { UndoableQueueContextProvider } from "@contexts/undoableQueue";
import { UnsavedWarnContextProvider } from "@contexts/unsavedWarn";
import { RouterContextProvider } from "@contexts/router";
import { AccessControlContextProvider } from "@contexts/accessControl";
import { NotificationContextProvider } from "@contexts/notification";
import { AuditLogContextProvider } from "@contexts/auditLog";
import { ReadyPage as DefaultReadyPage, RouteChangeHandler } from "@components";
import { handleRefineOptions, routeGenerator } from "@definitions";
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
    DashboardPageProps,
    IRefineOptions,
    INotificationContext,
} from "../../../interfaces";

interface QueryClientConfig {
    queryCache?: QueryCache;
    mutationCache?: MutationCache;
    defaultOptions?: DefaultOptions;
}
export interface RefineProps {
    children?: React.ReactNode;
    /**
     * `resources` is the main building block of a refine app. A resource represents an entity in an endpoint in the API.
     * @type [`ResourceProps[]`](/docs/api-reference/core/components/refine-config/#resources)
     */
    resources?: ResourceProps[];
    /**
     * **refine** needs some router functions to create resource pages, handle navigation, etc. This provider allows you to use the router library you want
     * @type [`IRouterProvider`](/docs/api-reference/core/providers/router-provider/)
     */
    routerProvider: IRouterProvider;
    /**
     * A `dataProvider` is the place where a refine app communicates with an API. Data providers also act as adapters for refine, making it possible for it to consume different API's and data services.
     * @type [`IDataContextProvider` | `IDataMultipleContextProvider`](/docs/api-reference/core/providers/data-provider/)
     */
    dataProvider: IDataContextProvider | IDataMultipleContextProvider;
    /**
     * `authProvider` handles authentication logic like login, logout flow and checking user credentials. It is an object with methods that refine uses when necessary.
     * @type [`AuthProvider`](/docs/api-reference/core/providers/auth-provider/)
     */
    authProvider?: AuthProvider;
    /**
     * **refine** lets you add Realtime support to your app via `liveProvider`. It can be used to update and show data in Realtime throughout your app.
     * @type [`ILiveContext`](/docs/api-reference/core/providers/live-provider/)
     */
    liveProvider?: ILiveContext;
    /**
     * `notificationProvider` handles notification logics. It is an object with methods that refine uses when necessary.
     * @type [`NotificationProvider` | `(() => NotificationProvider)`](/docs/api-reference/core/providers/notification-provider/)
     */
    notificationProvider?: NotificationProvider | (() => NotificationProvider);
    /**
     * `accessControlProvider` is the entry point for implementing access control for refine apps.
     * @type [`AccessControlProvider`](/docs/api-reference/core/providers/accessControl-provider/)
     */
    accessControlProvider?: AccessControlProvider;
    /**
     * **refine** allows you to track changes in your data and keep track of who made the changes.
     * @type [`AuditLogProvider`](/docs/api-reference/core/providers/audit-log-provider#overview)
     */
    auditLogProvider?: AuditLogProvider;
    /**
     * `i18nProvider` property lets you add i18n support to your app. Making you able to use any i18n framework.
     * @type [`i18nProvider`](/docs/api-reference/core/providers/i18n-provider/)
     */
    i18nProvider?: I18nProvider;
    /**
     * A custom error component.
     * @type [`ReactNode`](/docs/api-reference/core/components/refine-config/#catchall)
     */
    catchAll?: React.ReactNode;
    /**
     * Custom login component can be passed to the `LoginPage` property.
     * @type [`React.FC`](/docs/api-reference/core/components/refine-config/#loginpage)
     */
    LoginPage?: React.FC;
    /**
     * A custom dashboard page can be passed to the `DashboardPage` prop which is accessible on root route.
     * @type [`React.FC<DashboardPageProps>`](/docs/api-reference/core/components/refine-config/#dashboardpage)
     */
    DashboardPage?: React.FC<DashboardPageProps>;
    /**
     * Custom ready page component can be set by passing to `ReadyPage` property.
     * @type [`React.FC`](/docs/api-reference/core/components/refine-config/#readypage)
     */
    ReadyPage?: React.FC;
    /**
     * Default layout can be customized by passing the `Layout` property.
     * @type [`React.FC<LayoutProps>`](/docs/api-reference/core/components/refine-config/#layout)
     */
    Layout?: React.FC<LayoutProps>;
    /**
     * The default sidebar can be customized by using refine hooks and passing custom components to `Sider` property.
     * @type [`React.FC`](/docs/api-reference/core/components/refine-config/#sider)
     */
    Sider?: React.FC;
    /**
     * The default app header can be customized by passing the `Header` property.
     * @type [`React.FC`](/docs/api-reference/core/components/refine-config/#header)
     */
    Header?: React.FC;
    /**
     *The default app footer can be customized by passing the `Footer` property.
     * @type [`React.FC`](/docs/api-reference/core/components/refine-config/#footer)
     */
    Footer?: React.FC;
    /**
     * The component wanted to be placed out of app layout structure can be set by passing to `OffLayoutArea` prop.
     * @type [`React.FC`](/docs/api-reference/core/components/refine-config/#offlayoutarea)
     */
    OffLayoutArea?: React.FC;
    /**
     * TThe app title can be set by passing the `Title` property.
     * @type [`React.FC<TitleProps>`](/docs/api-reference/core/components/refine-config/#title)
     */
    Title?: React.FC<TitleProps>;
    /**
     * Callback to handle all live events.
     * @type [`(event: LiveEvent) => void`](/docs/api-reference/core/providers/live-provider/#onliveevent)
     */
    onLiveEvent?: LiveModeProps["onLiveEvent"];
    /**
     * `options` is used to configure the app.
     * @type [`IRefineOptions`](/docs/api-reference/core/components/refine-config/#options-1)
     * */
    options?: IRefineOptions;
    /**
     * **refine** implements a simple and transparent telemetry module for collecting usage statistics defined in a very limited scope. This telemetry module is used to improve the refine experience.
     * @deprecated  `disableTelemetry`  property is deprecated. Use it from within [`options`](/docs/api-reference/core/components/refine-config/#options) instead.
     * @type [`boolean`](/docs/api-reference/core/components/refine-config/#disabletelemetry)
     */
    disableTelemetry?: boolean;
    /** 
     *  Config for React Query client that refine uses.
        @deprecated `reactQueryClientConfig` property is deprecated. Use `clientConfig` in `reactQuery` in [`options`](/docs/api-reference/core/components/refine-config/#options) instead.
        @example  `options={{ reactQuery: { clientConfig: { queryCache: new QueryCache() } } }}`
        @see https://refine.dev/docs/core/components/refine-config/#clientconfig
          @type [`QueryClientConfig` | `false`](/docs/api-reference/core/components/refine-config/#reactquery)
     */
    reactQueryClientConfig?: QueryClientConfig;
    /** 
           *  Config for customize React Query Devtools.
              @deprecated `reactQueryDevtoolConfig` property is deprecated. Use `devtoolConfig` in `reactQuery` in [`options`](/docs/api-reference/core/components/refine-config/#options) instead.
              @example  `options={{ reactQuery: { devtoolConfig: false } }}`
              @see https://refine.dev/docs/core/components/refine-config/#devtoolConfig
              @type [`ReactQueryDevtools` | `false`](/docs/api-reference/core/components/refine-config/#devtoolconfig)
           */
    reactQueryDevtoolConfig?:
        | React.ComponentProps<typeof ReactQueryDevtools>
        | false;

    /** 
           *  Whether to update data automatically (auto) or not (manual) if a related live event is received. The off value is used to avoid creating a subscription.
              @deprecated `liveMode` property is deprecated. Use it from within [`options`](/docs/api-reference/core/components/refine-config/#options) instead.
              @example  `options={{ liveMode: "auto" }}`
              @see https://refine.dev/docs/core/components/refine-config/#livemode
              @type [`LiveModeProps["liveMode"]`](/docs/api-reference/core/components/refine-config/#livemode)
           */
    liveMode?: LiveModeProps["liveMode"];
    /** 
        @deprecated `disableTelemetry` property is deprecated. Use it from within [`options`](/docs/api-reference/core/components/refine-config/#options) instead.
        @example  `options={{ disableTelemetry: true }}`
     */
    /**
     * `mutationMode` determines which mode the mutations run with. (e.g. useUpdate, useDelete).
     * @deprecated `mutationMode` property is deprecated at this level. Use it from within `options` instead.
     * @type [`MutationMode`](/docs/api-reference/core/components/refine-config/#mutationmode)
     * @default "pessimistic"
     */
    mutationMode?: MutationMode;
    /** 
       * List query parameter values can be edited manually by typing directly in the URL. To activate this feature syncWithLocation needs to be set to true.
          @deprecated `syncWithLocation` property is deprecated at this level. Use it from within `options` instead.
          @example  `options={{ syncWithLocation: true }}`
          @see https://refine.dev/docs/core/components/refine-config/#syncwithlocation
       *  @type [`boolean`](/docs/api-reference/core/components/refine-config/#syncwithlocation)
       */
    syncWithLocation?: boolean;
    /** 
       *  When you have unsaved changes and try to leave the current page, **refine** shows a confirmation modal box.
          @deprecated `warnwhenunsavedchanges` property is deprecated at this level. Use it from within `options` instead.
          @example  `options={{ warnwhenunsavedchanges: true }}`
          @see https://refine.dev/docs/core/components/refine-config/#warnwhenunsavedchanges
      *   @type [`boolean`](/docs/api-reference/core/components/refine-config/#warnwhenunsavedchanges)
       */
    warnWhenUnsavedChanges?: boolean;
    /** 
       *  The duration of the timeout period in undoable mode, shown in milliseconds. Mutations can be cancelled during this period.
          @deprecated `undoableTimeout` property is deprecated at this level. Use it from within `options` instead.
          @example  `options={{ undoableTimeout: 5000 }}`
          @see https://refine.dev/docs/core/components/refine-config/#undoabletimeout
      *   @type [`number`](/docs/api-reference/core/components/refine-config/#undoabletimeout)
       */
    undoableTimeout?: number;
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
    const {
        optionsWithDefaults,
        disableTelemetryWithDefault,
        reactQueryWithDefaults,
    } = handleRefineOptions({
        options,
        disableTelemetry,
        liveMode,
        mutationMode,
        reactQueryClientConfig,
        reactQueryDevtoolConfig,
        syncWithLocation,
        warnWhenUnsavedChanges,
        undoableTimeout,
    });

    const queryClient = useDeepMemo(() => {
        if (reactQueryWithDefaults.clientConfig instanceof QueryClient) {
            return reactQueryWithDefaults.clientConfig;
        }

        return new QueryClient({
            ...reactQueryWithDefaults.clientConfig,
            defaultOptions: {
                ...reactQueryWithDefaults.clientConfig.defaultOptions,
                queries: {
                    refetchOnWindowFocus: false,
                    keepPreviousData: true,
                    ...reactQueryWithDefaults.clientConfig.defaultOptions
                        ?.queries,
                },
            },
        });
    }, [reactQueryWithDefaults.clientConfig]);

    const useNotificationProviderValues = React.useMemo(() => {
        return typeof notificationProvider === "function"
            ? notificationProvider
            : () => notificationProvider ?? ({} as INotificationContext);
    }, [notificationProvider]);

    const notificationProviderContextValues = useNotificationProviderValues();

    const resources: IResourceItem[] = useDeepMemo(() => {
        const _resources: IResourceItem[] = [];

        resourcesFromProps?.forEach((resource) => {
            _resources.push({
                key: resource.key,
                name: resource.name,
                label: resource.options?.label,
                icon: resource.icon,
                route: routeGenerator(resource, resourcesFromProps),
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
                                                            optionsWithDefaults.mutationMode
                                                        }
                                                        warnWhenUnsavedChanges={
                                                            optionsWithDefaults.warnWhenUnsavedChanges
                                                        }
                                                        syncWithLocation={
                                                            optionsWithDefaults.syncWithLocation
                                                        }
                                                        Title={Title}
                                                        undoableTimeout={
                                                            optionsWithDefaults.undoableTimeout
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
                                                        liveMode={
                                                            optionsWithDefaults.liveMode
                                                        }
                                                        onLiveEvent={
                                                            onLiveEvent
                                                        }
                                                        options={
                                                            optionsWithDefaults
                                                        }
                                                    >
                                                        <UnsavedWarnContextProvider>
                                                            <RouterComponent>
                                                                {children}
                                                                {!disableTelemetryWithDefault && (
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
            {reactQueryWithDefaults.devtoolConfig === false ? null : (
                <ReactQueryDevtools
                    initialIsOpen={false}
                    position="bottom-right"
                    {...reactQueryWithDefaults.devtoolConfig}
                />
            )}
        </QueryClientProvider>
    );
};
