import React from "react";
import { BrowserRouter } from "react-router-dom";

import {
    Refine,
    I18nProvider,
    AccessControlProvider,
    LegacyAuthProvider,
    DataProvider,
    NotificationProvider,
    IResourceItem,
    AuthProvider,
    IRouterProvider,
    RouterBindings,
} from "@refinedev/core";

import { mockRouterBindings, MockJSONServer } from "@test";
import { IRefineOptions } from "@refinedev/core/dist/interfaces";

import {
    MantineProvider,
} from "@mantine/core";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.MantineProvider = MantineProvider

import { defaultTheme } from '@theme';

import { MockRouterProvider } from "@refinedev/ui-tests";

const List = () => {
    return <div>hede</div>;
};
export interface ITestWrapperProps {
    routerProvider?: RouterBindings;
    legacyRouterProvider?: IRouterProvider;
    dataProvider?: DataProvider;
    authProvider?: AuthProvider;
    legacyAuthProvider?: LegacyAuthProvider;
    resources?: IResourceItem[];
    notificationProvider?: NotificationProvider;
    accessControlProvider?: AccessControlProvider;
    i18nProvider?: I18nProvider;
    routerInitialEntries?: string[];
    DashboardPage?: React.FC;
    options?: IRefineOptions;
}

export const TestWrapper: (
    props: ITestWrapperProps,
) => React.FC<{ children?: React.ReactNode }> = ({
    routerProvider,
    legacyRouterProvider,
    dataProvider,
    authProvider,
    legacyAuthProvider,
    resources,
    notificationProvider,
    accessControlProvider,
    routerInitialEntries,
    DashboardPage,
    i18nProvider,
    options,
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
    return ({ children }): React.ReactElement => {
        return (
          <MantineProvider theme={defaultTheme}>
            <BrowserRouter>
                <Refine
                    dataProvider={dataProvider ?? MockJSONServer}
                    i18nProvider={i18nProvider}
                    routerProvider={
                        routerProvider
                    }
                    legacyRouterProvider={
                        legacyRouterProvider ?? MockRouterProvider
                    }
                    authProvider={authProvider}
                    legacyAuthProvider={legacyAuthProvider}
                    notificationProvider={notificationProvider}
                    resources={resources ?? [{ name: "posts", list: List }]}
                    accessControlProvider={accessControlProvider}
                    DashboardPage={DashboardPage ?? undefined}
                    options={{
                        ...options,
                        disableTelemetry: true,
                        reactQuery: {
                            clientConfig: {
                                defaultOptions: {
                                    queries: {
                                        cacheTime: 0,
                                        staleTime: 0,
                                        networkMode: "always",
                                    },
                                },
                            },
                        },
                    }}
                >
                    {children}
                </Refine>
            </BrowserRouter>
          </MantineProvider>
        );
    };
};
export {
    MockJSONServer,
    mockRouterBindings,
    MockAccessControlProvider,
    MockLegacyRouterProvider,
    MockLiveProvider,
    MockAuthProvider,
} from "./dataMocks";

export {
    mockLegacyRouterProvider,
    MockRouterProvider,
    mockLegacyAuthProvider,
} from "@refinedev/ui-tests";

// re-export everything
export * from "@testing-library/react";

export { customRender as render } from './render';
