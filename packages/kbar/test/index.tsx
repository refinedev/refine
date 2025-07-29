import React from "react";
import { BrowserRouter } from "react-router";

import { type AuthProvider, Refine } from "@refinedev/core";

import { MockRouterProvider, MockJSONServer } from "@test";
import type {
  I18nProvider,
  AccessControlProvider,
  DataProvider,
  NotificationProvider,
  IResourceItem,
  RouterBindings,
} from "@refinedev/core";

import { RefineKbarProvider } from "../src/index";

export interface ITestWrapperProps {
  dataProvider?: DataProvider;
  authProvider?: AuthProvider;
  resources?: IResourceItem[];
  routerProvider?: RouterBindings;
  notificationProvider?: NotificationProvider;
  accessControlProvider?: AccessControlProvider;
  i18nProvider?: I18nProvider;
  routerInitialEntries?: string[];
}

export const TestWrapper: (
  props: ITestWrapperProps,
) => React.FC<{ children?: React.ReactNode }> = ({
  dataProvider,
  authProvider,
  routerProvider,
  resources,
  notificationProvider,
  accessControlProvider,
  routerInitialEntries,
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

  return ({ children }): React.ReactElement => {
    return (
      <RefineKbarProvider>
        <BrowserRouter>
          <Refine
            dataProvider={dataProvider ?? MockJSONServer}
            i18nProvider={i18nProvider}
            authProvider={authProvider}
            notificationProvider={notificationProvider}
            routerProvider={routerProvider ?? MockRouterProvider()}
            resources={resources ?? [{ name: "posts", list: "/list" }]}
            accessControlProvider={accessControlProvider}
            options={{ disableTelemetry: true }}
          >
            {children}
          </Refine>
        </BrowserRouter>
      </RefineKbarProvider>
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
