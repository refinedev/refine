import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { AuthContextProvider } from "@contexts/auth";
import { DataContextProvider } from "@contexts/data";
import { LiveContextProvider } from "@contexts/live";
import { TranslationContextProvider } from "@contexts/translation";
import { ResourceContextProvider } from "@contexts/resource";
import { RefineContextProvider } from "@contexts/refine";
import { UndoableQueueContextProvider } from "@contexts/undoableQueue";
import { UnsavedWarnContextProvider } from "@contexts/unsavedWarn";
import { LegacyRouterContextProvider } from "@contexts/legacy-router";
import { AccessControlContextProvider } from "@contexts/accessControl";
import { NotificationContextProvider } from "@contexts/notification";
import { AuditLogContextProvider } from "@contexts/auditLog";
import { ReadyPage as DefaultReadyPage, RouteChangeHandler } from "@components";
import { handleRefineOptions } from "@definitions";
import { Telemetry } from "@components/telemetry";
import { useDeepMemo } from "@hooks/deepMemo";
import { RouterBindings } from "src/interfaces/bindings";

import {
    IDataContextProvider,
    I18nProvider,
    LayoutProps,
    TitleProps,
    IRouterProvider,
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
import { RouterBindingsProvider } from "../../../contexts/router";
import { ResourceProps } from "../../../interfaces/bindings/resource";
import { RouterPickerProvider } from "@contexts/router-picker";

export interface RefineProps {
    children?: React.ReactNode;
    /**
     * `resources` is the predefined interaction points for a refine app. A resource represents an entity in an endpoint in the API.
     * While this is not a required property, it is used in resource detection and creation of routes for the app.
     * @type [`ResourceProps[]`](/docs/api-reference/core/components/refine-config/#resources)
     */
    resources?: ResourceProps[];
    /**
     * **refine** needs some router functions to create resource pages, handle navigation, etc. This provider allows you to use the router library you want
     * @type [`IRouterProvider`](/docs/api-reference/core/providers/router-provider/)
     * @deprecated This property is deprecated and was the legacy way of routing. Please use `routerProvider` with new router bindings instead.
     */
    legacyRouterProvider?: IRouterProvider;
    /**
     * Router bindings for **refine**. A simple interface for **refine** to interact with your router in a flexible way.
     * @type [`RouterBindings`](/docs/api-reference/core/bindings/router/)
     */
    routerProvider?: RouterBindings;
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
    legacyRouterProvider,
    routerProvider,
    notificationProvider,
    accessControlProvider,
    auditLogProvider,
    resources,
    DashboardPage,
    ReadyPage,
    LoginPage,
    catchAll,
    children,
    liveProvider,
    i18nProvider,
    Title,
    Layout,
    Sider,
    Header,
    Footer,
    OffLayoutArea,
    onLiveEvent,
    options,
}) => {
    const {
        optionsWithDefaults,
        disableTelemetryWithDefault,
        reactQueryWithDefaults,
    } = handleRefineOptions({
        options,
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

    /**
     * `<ReadyPage />` is only used in the legacy routing and is not used in the new routing.
     * If `legacyRouterProvider` is provided and `routerProvider` is not, we'll check for the `resources` prop to be empty.
     * If `resources` is empty, then we'll render `<ReadyPage />` component.
     */
    if (
        legacyRouterProvider &&
        !routerProvider &&
        (resources ?? []).length === 0
    ) {
        return ReadyPage ? <ReadyPage /> : <DefaultReadyPage />;
    }

    /** Router
     *
     * Handle routing from `RouterBindingsProvider` and `router` prop for the brand new way
     * If `router` is not provided, then we'r checking for `routerProvider` prop
     * If `routerProvider` is provided, then `RouterContextProvider` is used
     * If none of them is provided, then `RouterBindingsProvider` is used because it supports undefined router
     *
     * `RouterContextProvider` is skipped whenever possible and by this way,
     * we can achieve backward compability only when its provided by user
     *
     */
    const { RouterComponent = React.Fragment } = legacyRouterProvider ?? {};
    /** */

    return (
        <QueryClientProvider client={queryClient}>
            <NotificationContextProvider {...notificationProviderContextValues}>
                <AuthContextProvider
                    {...(authProvider ?? {})}
                    isProvided={Boolean(authProvider)}
                >
                    <DataContextProvider {...dataProvider}>
                        <LiveContextProvider liveProvider={liveProvider}>
                            <RouterPickerProvider
                                value={
                                    legacyRouterProvider && !routerProvider
                                        ? "legacy"
                                        : "new"
                                }
                            >
                                <RouterBindingsProvider router={routerProvider}>
                                    <LegacyRouterContextProvider
                                        {...legacyRouterProvider}
                                    >
                                        <ResourceContextProvider
                                            resources={resources ?? []}
                                        >
                                            <TranslationContextProvider
                                                i18nProvider={i18nProvider}
                                            >
                                                <AccessControlContextProvider
                                                    {...(accessControlProvider ??
                                                        {})}
                                                >
                                                    <AuditLogContextProvider
                                                        {...(auditLogProvider ??
                                                            {})}
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
                                                                catchAll={
                                                                    catchAll
                                                                }
                                                                DashboardPage={
                                                                    DashboardPage
                                                                }
                                                                LoginPage={
                                                                    LoginPage
                                                                }
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
                                                                        {
                                                                            children
                                                                        }
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
                                    </LegacyRouterContextProvider>
                                </RouterBindingsProvider>
                            </RouterPickerProvider>
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
