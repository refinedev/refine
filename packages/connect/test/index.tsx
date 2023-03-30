import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ConnectContextProvider } from "../src/contexts";
import { IConnectContext } from "../src/interfaces";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            cacheTime: 0,
            retry: 0,
        },
    },
});

export interface ITestWrapperProps {
    connectConfig?: IConnectContext;
    children?: React.ReactNode;
}

export const TestWrapper: (
    props: ITestWrapperProps,
) => React.FC<{ children: ReactNode }> = ({ connectConfig }) => {
    // eslint-disable-next-line react/display-name
    return ({ children }): React.ReactElement => {
        const withRefine = connectConfig ? (
            <ConnectContextProvider {...connectConfig}>
                {children}
            </ConnectContextProvider>
        ) : (
            children
        );

        return (
            <QueryClientProvider client={queryClient}>
                {withRefine}
            </QueryClientProvider>
        );
    };
};
