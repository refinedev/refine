import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Refine } from "@pankod/refine-core";
import {
    IDataContext,
    ResourceProps,
} from "@pankod/refine-core/dist/interfaces";

import { MockRouterProvider, MockJSONServer } from "./dataMocks";

interface ITestWrapperProps {
    dataProvider?: IDataContext;
    resources?: ResourceProps[];
    routerInitialEntries?: string[];
}

export const TestWrapper: (props: ITestWrapperProps) => React.FC = ({
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
