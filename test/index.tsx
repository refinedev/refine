import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { AuthContextProvider } from "@contexts/auth";
import { DataContextProvider } from "@contexts/data";
import { ResourceContextProvider } from "@contexts/resource";
import { IDataContext, IAuthContext } from "@interfaces";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

const queryClient = new QueryClient();

interface ITestWrapperProps {
    authProvider?: IAuthContext;
    dataProvider?: IDataContext;
    resources: string[];
    children?: React.ReactNode;
}

export const TestWrapper: (props: ITestWrapperProps) => React.FC = ({
    authProvider,
    dataProvider,
    resources,
}) => {
    return ({ children }) => {
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

        const history = createMemoryHistory();

        return (
            <Router history={history}>
                <QueryClientProvider client={queryClient}>
                    {withAuth}
                </QueryClientProvider>
            </Router>
        );
    };
};

export { MockJSONServer } from "./dataMocks";

// re-export everything
export * from "@testing-library/react";
