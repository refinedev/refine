import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { CloudContextProvider } from "../src/contexts";
import { ICloudContext } from "../src/interfaces";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            cacheTime: 0,
            retry: 0,
        },
    },
});

export interface ITestWrapperProps {
    cloudConfig?: ICloudContext;
    children?: React.ReactNode;
}

export const TestWrapper: (
    props: ITestWrapperProps,
) => React.FC<{ children: ReactNode }> = ({ cloudConfig }) => {
    // eslint-disable-next-line react/display-name
    return ({ children }): React.ReactElement => {
        const withRefine = cloudConfig ? (
            <CloudContextProvider {...cloudConfig}>
                {children}
            </CloudContextProvider>
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
