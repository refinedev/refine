import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

import { Refine } from "@pankod/refine-core";

import { MockRouterProvider, MockJSONServer } from "@test";
import {
    IAccessControlContext,
    IAuthContext,
    IDataContext,
    INotificationProviderContext,
    ResourceProps,
} from "@pankod/refine-core/dist/interfaces";

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
    authProvider?: IAuthContext;
    resources?: ResourceProps[];
    notificationProvider?: INotificationProviderContext;
    accessControlProvider?: IAccessControlContext;
    routerInitialEntries?: string[];
}

export const TestWrapper: (props: ITestWrapperProps) => React.FC = ({
    dataProvider,
    authProvider,
    resources,
    notificationProvider,
    accessControlProvider,
    routerInitialEntries,
}) => {
    // eslint-disable-next-line react/display-name
    return ({ children }): React.ReactElement => {
        return (
            <MemoryRouter initialEntries={routerInitialEntries}>
                <Refine
                    dataProvider={dataProvider ?? MockJSONServer}
                    routerProvider={MockRouterProvider}
                    authProvider={authProvider}
                    notificationProvider={notificationProvider}
                    resources={resources ?? [{ name: "posts", list: List }]}
                    accessControlProvider={accessControlProvider}
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
