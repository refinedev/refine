import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { AuthContextProvider } from "@contexts/auth";
import { DataContextProvider } from "@contexts/data";
import { ResourceContextProvider, IResourceItem } from "@contexts/resource";
import { IDataContext, IAuthContext, I18nProvider } from "../src/interfaces";
import { MemoryRouter } from "react-router-dom";
import {
    defaultProvider,
    TranslationContextProvider,
} from "@contexts/translation";

const queryClient = new QueryClient();

interface ITestWrapperProps {
    authProvider?: IAuthContext;
    dataProvider?: IDataContext;
    i18nProvider?: I18nProvider;
    resources: IResourceItem[];
    children?: React.ReactNode;
    routerInitialEntries?: string[];
}

export const TestWrapper: (props: ITestWrapperProps) => React.FC = ({
    authProvider,
    dataProvider,
    resources,
    i18nProvider,
    routerInitialEntries,
}) => {
    // eslint-disable-next-line react/display-name
    return ({ children }): React.ReactElement => {
        const withResource = (
            <ResourceContextProvider resources={resources}>
                {children}
            </ResourceContextProvider>
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

        const withAuth = authProvider ? (
            <AuthContextProvider {...authProvider}>
                {withTranslation}
            </AuthContextProvider>
        ) : (
            withTranslation
        );

        return (
            <MemoryRouter initialEntries={routerInitialEntries}>
                <QueryClientProvider client={queryClient}>
                    {withAuth}
                </QueryClientProvider>
            </MemoryRouter>
        );
    };
};

export * from "./dataMocks";

// re-export everything
export * from "@testing-library/react";
