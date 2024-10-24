import React from "react";
import { BrowserRouter } from "react-router-dom";

import {
  Refine,
  type I18nProvider,
  type AccessControlProvider,
  type LegacyAuthProvider,
  type DataProvider,
  type NotificationProvider,
  type IResourceItem,
  type AuthProvider,
  type RouterBindings,
  type IRefineOptions,
  type IRouterContext,
} from "@refinedev/core";

import { mockRouterBindings, MockRouterProvider, MockJSONServer } from "@test";

import { MantineProvider } from "@mantine/core";

// @ts-ignore
// window.MantineProvider = MantineProvider;

import { defaultTheme } from "@theme";

const List = () => {
  return <div>hede</div>;
};
export interface ITestWrapperProps {
  dataProvider?: DataProvider;
  legacyAuthProvider?: LegacyAuthProvider;
  authProvider?: AuthProvider;
  resources?: IResourceItem[];
  notificationProvider?: NotificationProvider;
  accessControlProvider?: AccessControlProvider;
  i18nProvider?: I18nProvider;
  legacyRouterProvider?: IRouterContext;
  routerProvider?: RouterBindings;
  routerInitialEntries?: string[];
  DashboardPage?: React.FC;
  options?: IRefineOptions;
}

export const TestWrapper: (
  props: ITestWrapperProps,
) => React.FC<{ children?: React.ReactNode }> = ({
  dataProvider,
  legacyAuthProvider,
  authProvider,
  resources,
  notificationProvider,
  accessControlProvider,
  routerInitialEntries,
  DashboardPage,
  i18nProvider,
  routerProvider,
  legacyRouterProvider,
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

  return ({ children }: React.PropsWithChildren<{}>): React.ReactElement => {
    return (
      <MantineProvider theme={defaultTheme}>
        <BrowserRouter>
          <Refine
            // dataProvider={dataProvider ?? MockJSONServer}
            // i18nProvider={i18nProvider}
            // legacyRouterProvider={
            //   routerProvider ? undefined : MockRouterProvider
            // }
            // routerProvider={routerProvider}
            // authProvider={authProvider}
            // legacyAuthProvider={legacyAuthProvider}
            // notificationProvider={notificationProvider}
            // resources={resources ?? [{ name: "posts", list: List }]}
            // accessControlProvider={accessControlProvider}
            // DashboardPage={DashboardPage ?? undefined}
            // Working
            dataProvider={dataProvider ?? MockJSONServer}
            i18nProvider={i18nProvider}
            routerProvider={routerProvider}
            legacyRouterProvider={legacyRouterProvider ?? MockRouterProvider}
            legacyAuthProvider={legacyAuthProvider}
            authProvider={authProvider}
            notificationProvider={notificationProvider}
            resources={resources ?? [{ name: "posts", list: List }]}
            accessControlProvider={accessControlProvider}
            DashboardPage={DashboardPage ?? undefined}
            // Initial
            // dataProvider={dataProvider ?? MockJSONServer}
            // i18nProvider={i18nProvider}
            // routerProvider={legacyRouterProvider ? undefined : routerProvider}
            // legacyRouterProvider={legacyRouterProvider}
            // authProvider={authProvider}
            // legacyAuthProvider={legacyAuthProvider}
            // notificationProvider={notificationProvider}
            // resources={resources ?? [{ name: "posts", list: List }]}
            // accessControlProvider={accessControlProvider}
            // DashboardPage={DashboardPage ?? undefined}
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
  MockRouterProvider,
} from "./dataMocks";

// re-export everything
export * from "@testing-library/react";
