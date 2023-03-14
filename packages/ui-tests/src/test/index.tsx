import React from "react";
import { BrowserRouter } from "react-router-dom";

import { AuthBindings, Refine } from "@refinedev/core";

import { MockRouterProvider, MockJSONServer } from "@test";
import {
    I18nProvider,
    AccessControlProvider,
    LegacyAuthProvider,
    DataProvider,
    NotificationProvider,
    IResourceItem,
} from "@refinedev/core";

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
export interface ITestWrapperProps {
    dataProvider?: DataProvider;
    legacyAuthProvider?: LegacyAuthProvider;
    authProvider?: AuthBindings;
    resources?: IResourceItem[];
    notificationProvider?: NotificationProvider;
    accessControlProvider?: AccessControlProvider;
    i18nProvider?: I18nProvider;
    routerInitialEntries?: string[];
    DashboardPage?: React.FC;
}

export const TestWrapper: (props: ITestWrapperProps) => React.FC = ({
    dataProvider,
    legacyAuthProvider,
    authProvider,
    resources,
    notificationProvider,
    accessControlProvider,
    routerInitialEntries,
    DashboardPage,
    i18nProvider,
}) => {
    // Previously, MemoryRouter was used in this wrapper. However, the
    // recommendation by react-router developers (see
    // https://github.com/remix-run/react-router/discussions/8241#discussioncomment-159686)
    // is essentially to use the same router as your actual application. Besides
    // that, it's impossible to check for location changes with MemoryRouter if
    // needed.
    if (routerInitialEntries) {
        routerInitialEntries.forEach((route) => {
            window.history.replaceState({}, "", route);
        });
    }

    // eslint-disable-next-line react/display-name
    return ({ children }: React.PropsWithChildren<{}>): React.ReactElement => {
        return (
            <BrowserRouter>
                <Refine
                    options={{
                        disableTelemetry: true,
                    }}
                    dataProvider={dataProvider ?? MockJSONServer}
                    i18nProvider={i18nProvider}
                    legacyRouterProvider={MockRouterProvider}
                    legacyAuthProvider={legacyAuthProvider}
                    authProvider={authProvider}
                    notificationProvider={notificationProvider}
                    resources={resources ?? [{ name: "posts", list: List }]}
                    accessControlProvider={accessControlProvider}
                    DashboardPage={DashboardPage ?? undefined}
                >
                    {children}
                </Refine>
            </BrowserRouter>
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
