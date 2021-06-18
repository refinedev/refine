import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { AuthContextProvider } from "@contexts/auth";
import { NotificationContextProvider } from "@contexts/notification";
import { DataContextProvider } from "@contexts/data";
import { ResourceContextProvider, IResourceItem } from "@contexts/resource";
import { IDataContext, IAuthContext, I18nProvider } from "../src/interfaces";
import { MemoryRouter } from "react-router-dom";
import { TranslationContextProvider } from "@contexts/translation";
import { RefineContextProvider } from "@contexts/refine";
import { IRefineContextProvider } from "@contexts/refine/IRefineContext";

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
    routerInitialEntries,
    refineProvider,
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

        const withTranslation = i18nProvider ? (
            <TranslationContextProvider i18nProvider={i18nProvider}>
                {withData}
            </TranslationContextProvider>
        ) : (
            withData
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
            <MemoryRouter initialEntries={routerInitialEntries}>
                <QueryClientProvider client={queryClient}>
                    {withRefine}
                </QueryClientProvider>
            </MemoryRouter>
        );
    };
};

export { MockJSONServer } from "./dataMocks";

// re-export everything
export * from "@testing-library/react";
