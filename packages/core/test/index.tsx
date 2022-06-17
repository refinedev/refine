import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
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

import {
    MockRouterProvider,
    MockAccessControlProvider,
    MockLiveProvider,
} from "@test";
import { routeGenerator } from "../src";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            cacheTime: 0,
            retry: 0,
        },
    },
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

export const TestWrapper: (props: ITestWrapperProps) => React.FC = ({
    authProvider,
    dataProvider,
    resources: resourcesFromProps,
    i18nProvider,
    notificationProvider,
    accessControlProvider,
    routerInitialEntries,
    refineProvider,
    liveProvider,
    auditLogProvider,
}) => {
    const resources: IResourceItem[] = [];
    resourcesFromProps?.map((resource) => {
        resources.push({
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
            <AccessControlContextProvider {...MockAccessControlProvider}>
                {withNotificationProvider}
            </AccessControlContextProvider>
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
            <LiveContextProvider liveProvider={MockLiveProvider}>
                {withAuidtLogProvider}
            </LiveContextProvider>
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
            <AuthContextProvider {...authProvider}>
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
