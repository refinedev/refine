import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { AuthContextProvider } from "@contexts/auth";
import { DataContextProvider } from "@contexts/data";
import { ResourceContextProvider, IResourceItem } from "@contexts/resource";
import { IDataContext, IAuthContext } from "@interfaces";
import { MemoryRouter } from "react-router-dom";

const queryClient = new QueryClient();

interface ITestWrapperProps {
    authProvider?: IAuthContext;
    dataProvider?: IDataContext;
    resources: IResourceItem[];
    children?: React.ReactNode;
    routerInitialEntries?: string[];
}

export const TestWrapper: (props: ITestWrapperProps) => React.FC = ({
    authProvider,
    dataProvider,
    resources,
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
        const withAuth = authProvider ? (
            <AuthContextProvider {...authProvider}>
                {withData}
            </AuthContextProvider>
        ) : (
            withData
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

export { MockJSONServer } from "./dataMocks";

// re-export everything
export * from "@testing-library/react";
