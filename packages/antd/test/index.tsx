import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

import { Refine } from "@pankod/refine-core";

import { MockRouterProvider, MockJSONServer } from "@test";
import { IDataContext } from "@pankod/refine-core/dist/interfaces";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            cacheTime: 0,
            retry: 0,
        },
    },
});

/* interface ITestWrapperProps {
    authProvider?: IAuthContext;
    dataProvider?: IDataContext;
    i18nProvider?: I18nProvider;
    accessControlProvider?: IAccessControlContext;
    liveProvider?: ILiveContext;
    resources?: IResourceItem[];
    children?: React.ReactNode;
    routerInitialEntries?: string[];
    refineProvider?: IRefineContextProvider;
} */

const List = () => {
    return <div>hede</div>;
};

interface ITestWrapperProps {
    dataProvider?: IDataContext;
}

export const TestWrapper: (props: ITestWrapperProps) => React.FC = ({
    dataProvider,
}) => {
    // eslint-disable-next-line react/display-name
    return ({ children }): React.ReactElement => {
        return (
            <MemoryRouter>
                <Refine
                    dataProvider={dataProvider ?? MockJSONServer}
                    routerProvider={MockRouterProvider}
                    resources={[{ name: "posts", list: List }]}
                >
                    {children}
                </Refine>
            </MemoryRouter>
        );
    };
};
export {
    MockJSONServer,
    MockRouterProvider,
    MockAccessControlProvider,
    MockLiveProvider,
} from "./dataMocks";

// re-export everything
export * from "@testing-library/react";
