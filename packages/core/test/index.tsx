import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";

import { AuthContextProvider } from "@contexts/auth";
import { UndoableQueueContextProvider } from "@contexts/undoableQueue";
import { DataContextProvider } from "@contexts/data";
import { ResourceContextProvider, IResourceItem } from "@contexts/resource";
import {
    IAuthContext,
    I18nProvider,
    IAccessControlContext,
    ILiveContext,
    INotificationContext,
    IDataMultipleContextProvider,
    IDataContextProvider,
    IAuditLogContext,
} from "../src/interfaces";
import { TranslationContextProvider } from "@contexts/translation";
import { RefineContextProvider } from "@contexts/refine";
import { IRefineContextProvider } from "@contexts/refine/IRefineContext";
import { RouterContextProvider } from "@contexts/router";
import { AccessControlContextProvider } from "@contexts/accessControl";
import { LiveContextProvider } from "@contexts/live";
import { NotificationContextProvider } from "@contexts/notification";
import { AuditLogContextProvider } from "@contexts/auditLog";

import { MockRouterProvider } from "@test";

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
    authProvider?: IAuthContext;
    dataProvider?: IDataContextProvider | IDataMultipleContextProvider;
    i18nProvider?: I18nProvider;
    notificationProvider?: INotificationContext;
    accessControlProvider?: IAccessControlContext;
    liveProvider?: ILiveContext;
    resources?: IResourceItem[];
    children?: React.ReactNode;
    routerInitialEntries?: string[];
    refineProvider?: IRefineContextProvider;
    auditLogProvider?: IAuditLogContext;
}

export const TestWrapper: (
    props: ITestWrapperProps,
) => React.FC<{ children: ReactNode }> = ({
    authProvider,
    dataProvider,
    resources,
    i18nProvider,
    notificationProvider,
    accessControlProvider,
    routerInitialEntries,
    refineProvider,
    liveProvider,
    auditLogProvider,
}) => {
    // eslint-disable-next-line react/display-name
    return ({ children }): React.ReactElement => {
        const withResource = resources ? (
            <ResourceContextProvider resources={resources}>
                {children}
            </ResourceContextProvider>
        ) : (
            children
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

        const withAuth = authProvider ? (
            <AuthContextProvider
                {...authProvider}
                isProvided={Boolean(authProvider)}
            >
                {withNotification}
            </AuthContextProvider>
        ) : (
            withNotification
        );

        const withRefine = refineProvider ? (
            <RefineContextProvider {...refineProvider}>
                {withAuth}
            </RefineContextProvider>
        ) : (
            withAuth
        );

        return (
            <RouterContextProvider {...MockRouterProvider}>
                <MemoryRouter initialEntries={routerInitialEntries}>
                    <QueryClientProvider client={queryClient}>
                        {withRefine}
                    </QueryClientProvider>
                </MemoryRouter>
            </RouterContextProvider>
        );
    };
};

export {
    MockJSONServer,
    MockRouterProvider,
    MockAccessControlProvider,
    MockLiveProvider,
} from "./dataMocks";

// re-export everything
export * from "@testing-library/react";
