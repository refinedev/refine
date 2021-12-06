import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

import { AuthContextProvider } from "@contexts/auth";
import { NotificationContextProvider } from "@contexts/notification";
import { DataContextProvider } from "@contexts/data";
import { ResourceContextProvider, IResourceItem } from "@contexts/resource";
import {
    IDataContext,
    IAuthContext,
    I18nProvider,
    IAccessControlContext,
    ILiveContext,
    ILiveModeContext,
} from "../src/interfaces";
import { TranslationContextProvider } from "@contexts/translation";
import { RefineContextProvider } from "@contexts/refine";
import { IRefineContextProvider } from "@contexts/refine/IRefineContext";
import { RouterContextProvider } from "@contexts/router";
import { AccessControlContextProvider } from "@contexts/accessControl";
import { LiveContextProvider, LiveModeContextProvider } from "@contexts/live";

import {
    MockRouterProvider,
    MockAccessControlProvider,
    MockLiveProvider,
    MockLiveModeProvider,
} from "@test";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            cacheTime: 0,
            retry: 0,
        },
    },
});

interface ITestWrapperProps {
    authProvider?: IAuthContext;
    dataProvider?: IDataContext;
    i18nProvider?: I18nProvider;
    accessControlProvider?: IAccessControlContext;
    liveProvider?: ILiveContext;
    liveModeProvider?: ILiveModeContext;
    resources?: IResourceItem[];
    children?: React.ReactNode;
    routerInitialEntries?: string[];
    refineProvider?: IRefineContextProvider;
}

export const TestWrapper: (props: ITestWrapperProps) => React.FC = ({
    authProvider,
    dataProvider,
    resources,
    i18nProvider,
    accessControlProvider,
    routerInitialEntries,
    refineProvider,
    liveProvider,
    liveModeProvider,
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

        const withAccessControl = accessControlProvider ? (
            <AccessControlContextProvider {...accessControlProvider}>
                {withData}
            </AccessControlContextProvider>
        ) : (
            <AccessControlContextProvider {...MockAccessControlProvider}>
                {withData}
            </AccessControlContextProvider>
        );

        const withLive = liveProvider ? (
            <LiveContextProvider liveProvider={liveProvider}>
                {withAccessControl}
            </LiveContextProvider>
        ) : (
            <LiveContextProvider liveProvider={MockLiveProvider}>
                {withAccessControl}
            </LiveContextProvider>
        );

        const withLiveMode = liveModeProvider ? (
            <LiveModeContextProvider {...liveModeProvider}>
                {withLive}
            </LiveModeContextProvider>
        ) : (
            <LiveModeContextProvider {...MockLiveModeProvider}>
                {withLive}
            </LiveModeContextProvider>
        );

        const withTranslation = i18nProvider ? (
            <TranslationContextProvider i18nProvider={i18nProvider}>
                {withLiveMode}
            </TranslationContextProvider>
        ) : (
            withLiveMode
        );

        const withNotification = (
            <NotificationContextProvider>
                {withTranslation}
            </NotificationContextProvider>
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
    MockLiveModeProvider,
} from "./dataMocks";

// re-export everything
export * from "@testing-library/react";
