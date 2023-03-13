import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {
    AuthBindingsContextProvider,
    LegacyAuthContextProvider,
} from "@contexts/auth";
import { UndoableQueueContextProvider } from "@contexts/undoableQueue";
import { DataContextProvider } from "@contexts/data";
import { ResourceContextProvider, IResourceItem } from "@contexts/resource";
import {
    ILegacyAuthContext,
    I18nProvider,
    IAccessControlContext,
    ILiveContext,
    INotificationContext,
    IDataMultipleContextProvider,
    IDataContextProvider,
    IAuditLogContext,
    RouterBindings,
    IRouterContext,
    AuthBindings,
} from "../src/interfaces";
import { TranslationContextProvider } from "@contexts/translation";
import { RefineContextProvider } from "@contexts/refine";
import { IRefineContextProvider } from "@contexts/refine/IRefineContext";
import { LegacyRouterContextProvider } from "@contexts/legacy-router";
import { AccessControlContextProvider } from "@contexts/accessControl";
import { LiveContextProvider } from "@contexts/live";
import { NotificationContextProvider } from "@contexts/notification";
import { AuditLogContextProvider } from "@contexts/auditLog";

import { RouterBindingsProvider } from "@contexts/router";
import { RouterPickerProvider } from "@contexts/router-picker";

export const queryClient = new QueryClient({
    logger: {
        log: console.log,
        warn: console.warn,
        // ✅ no more errors on the console
        error: () => {
            return {};
        },
    },
    defaultOptions: {
        queries: {
            cacheTime: 0,
            retry: 0,
        },
    },
});

beforeEach(() => {
    queryClient.clear();
});

export interface ITestWrapperProps {
    legacyAuthProvider?: ILegacyAuthContext;
    authProvider?: AuthBindings;
    dataProvider?: IDataContextProvider | IDataMultipleContextProvider;
    i18nProvider?: I18nProvider;
    notificationProvider?: INotificationContext;
    accessControlProvider?: IAccessControlContext;
    liveProvider?: ILiveContext;
    resources?: IResourceItem[];
    children?: React.ReactNode;
    legacyRouterProvider?: IRouterContext;
    routerProvider?: RouterBindings;
    refineProvider?: IRefineContextProvider;
    auditLogProvider?: IAuditLogContext;
}

export const TestWrapper: (
    props: ITestWrapperProps,
) => React.FC<{ children: ReactNode }> = ({
    legacyAuthProvider,
    authProvider,
    dataProvider,
    resources,
    i18nProvider,
    notificationProvider,
    accessControlProvider,
    legacyRouterProvider,
    routerProvider,
    refineProvider,
    liveProvider,
    auditLogProvider,
}) => {
    // eslint-disable-next-line react/display-name
    return ({ children }): React.ReactElement => {
        const withRouterPicker = (
            <RouterPickerProvider
                value={
                    routerProvider
                        ? "new"
                        : legacyRouterProvider
                        ? "legacy"
                        : "new"
                }
            >
                {children}
            </RouterPickerProvider>
        );

        const withLegacyRouter = legacyRouterProvider ? (
            <LegacyRouterContextProvider {...legacyRouterProvider}>
                {withRouterPicker}
            </LegacyRouterContextProvider>
        ) : (
            withRouterPicker
        );

        const withRouterBindings = routerProvider ? (
            <RouterBindingsProvider router={routerProvider}>
                {withLegacyRouter}
            </RouterBindingsProvider>
        ) : (
            withLegacyRouter
        );

        const withResource = resources ? (
            <ResourceContextProvider
                resources={resources.map((r) => ({
                    ...r,
                    options: {
                        route: r.options?.route ?? r.route,
                    },
                }))}
            >
                {withRouterBindings}
            </ResourceContextProvider>
        ) : (
            withRouterBindings
        );
        const withData = dataProvider ? (
            <DataContextProvider {...dataProvider}>
                {withResource}
            </DataContextProvider>
        ) : (
            withResource
        );

        const withNotificationProvider = notificationProvider ? (
            <NotificationContextProvider {...notificationProvider}>
                {withData}
            </NotificationContextProvider>
        ) : (
            withData
        );

        const withAccessControl = accessControlProvider ? (
            <AccessControlContextProvider {...accessControlProvider}>
                {withNotificationProvider}
            </AccessControlContextProvider>
        ) : (
            withNotificationProvider
        );

        const withAuidtLogProvider = auditLogProvider ? (
            <AuditLogContextProvider {...auditLogProvider}>
                {withAccessControl}
            </AuditLogContextProvider>
        ) : (
            withAccessControl
        );

        const withLive = liveProvider ? (
            <LiveContextProvider liveProvider={liveProvider}>
                {withAuidtLogProvider}
            </LiveContextProvider>
        ) : (
            withAuidtLogProvider
        );

        const withTranslation = i18nProvider ? (
            <TranslationContextProvider i18nProvider={i18nProvider}>
                {withLive}
            </TranslationContextProvider>
        ) : (
            withLive
        );

        const withNotification = (
            <UndoableQueueContextProvider>
                {withTranslation}
            </UndoableQueueContextProvider>
        );

        const withLegacyAuth = legacyAuthProvider ? (
            <LegacyAuthContextProvider
                {...legacyAuthProvider}
                isProvided={Boolean(legacyAuthProvider)}
            >
                {withNotification}
            </LegacyAuthContextProvider>
        ) : (
            withNotification
        );

        const withAuth = authProvider ? (
            <AuthBindingsContextProvider
                {...authProvider}
                isProvided={Boolean(authProvider)}
            >
                {withLegacyAuth}
            </AuthBindingsContextProvider>
        ) : (
            withLegacyAuth
        );

        const withRefine = refineProvider ? (
            <RefineContextProvider {...refineProvider}>
                {withAuth}
            </RefineContextProvider>
        ) : (
            withAuth
        );

        return (
            <QueryClientProvider client={queryClient}>
                {withRefine}
            </QueryClientProvider>
        );
    };
};

export {
    MockJSONServer,
    mockLegacyRouterProvider,
    mockRouterBindings,
    MockAccessControlProvider,
    MockLiveProvider,
} from "./dataMocks";

// re-export everything
export * from "@testing-library/react";
