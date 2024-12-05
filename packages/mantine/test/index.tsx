import React from "react";
import { BrowserRouter } from "react-router";

import {
  Refine,
  type I18nProvider,
  type AccessControlProvider,
  type LegacyAuthProvider,
  type DataProvider,
  type NotificationProvider,
  type IResourceItem,
  type AuthProvider,
  type IRouterProvider,
  type RouterBindings,
  type IRefineOptions,
} from "@refinedev/core";

import { mockRouterBindings, MockJSONServer } from "@test";

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
  routerProvider = mockRouterBindings(),
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

  return ({ children }): React.ReactElement => {
    return (
      <BrowserRouter>
        <Refine
          dataProvider={dataProvider ?? MockJSONServer}
          i18nProvider={i18nProvider}
          routerProvider={legacyRouterProvider ? undefined : routerProvider}
          legacyRouterProvider={legacyRouterProvider}
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
    );
  };
};
export {
  mockRouterBindings,
  MockJSONServer,
  MockLegacyRouterProvider,
  MockAccessControlProvider,
  MockLiveProvider,
  MockAuthProvider,
} from "./dataMocks";

// re-export everything
export * from "@testing-library/react";
