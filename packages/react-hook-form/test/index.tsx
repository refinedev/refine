import React, { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import { Refine, DataProvider, IResourceItem } from "@refinedev/core";

import { MockRouterProvider, MockJSONServer } from "./dataMocks";

interface ITestWrapperProps {
    dataProvider?: DataProvider;
    resources?: IResourceItem[];
    routerInitialEntries?: string[];
}

export const TestWrapper: (
    props: ITestWrapperProps,
) => React.FC<{ children: ReactNode }> = ({
    dataProvider,
    resources,
    routerInitialEntries,
}) => {
    // eslint-disable-next-line react/display-name
    return ({ children }): React.ReactElement => {
        return (
            <MemoryRouter initialEntries={routerInitialEntries}>
                <Refine
                    dataProvider={dataProvider ?? MockJSONServer}
                    routerProvider={MockRouterProvider}
                    resources={resources ?? [{ name: "posts" }]}
                    options={{
                        reactQuery: {
                            clientConfig: {
                                defaultOptions: {
                                    queries: {
                                        retry: false,
                                    },
                                },
                            },
                        },
                        disableTelemetry: true,
                    }}
                >
                    {children}
                </Refine>
            </MemoryRouter>
        );
    };
};
export { MockJSONServer, MockRouterProvider } from "./dataMocks";

// re-export everything
export * from "@testing-library/react";
