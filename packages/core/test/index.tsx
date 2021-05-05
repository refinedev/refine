import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { AuthContextProvider } from "@contexts/auth";
import { NotificationContextProvider } from "@contexts/notification";
import { DataContextProvider } from "@contexts/data";
import { ResourceContextProvider, IResourceItem } from "@contexts/resource";
import { IDataContext, IAuthContext, I18nProvider } from "../src/interfaces";
import { MemoryRouter } from "react-router-dom";
import { TranslationContextProvider } from "@contexts/translation";
import { AdminContextProvider } from "@contexts/admin";
import { IAdminContextProvider } from "@contexts/admin/IAdminContext";

const queryClient = new QueryClient();

interface ITestWrapperProps {
    authProvider?: IAuthContext;
    dataProvider?: IDataContext;
    i18nProvider?: I18nProvider;
    resources?: IResourceItem[];
    children?: React.ReactNode;
    routerInitialEntries?: string[];
    adminProvider?: IAdminContextProvider;
}

export const TestWrapper: (props: ITestWrapperProps) => React.FC = ({
    authProvider,
    dataProvider,
    resources,
    i18nProvider,
    routerInitialEntries,
    adminProvider,
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

        const withAdmin = adminProvider ? (
            <AdminContextProvider {...adminProvider}>
                {withAuth}
            </AdminContextProvider>
        ) : (
            withAuth
        );

        return (
            <MemoryRouter initialEntries={routerInitialEntries}>
                <QueryClientProvider client={queryClient}>
                    {withAdmin}
                </QueryClientProvider>
            </MemoryRouter>
        );
    };
};

export { MockJSONServer } from "./dataMocks";

// re-export everything
export * from "@testing-library/react";
