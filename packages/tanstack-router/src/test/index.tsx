import React, { type ReactNode } from "react";
import {
  Outlet,
  RouterProvider as TanStackRouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

import {
  type AccessControlProvider,
  type AuthProvider,
  type NotificationProvider,
  Refine,
  type I18nProvider,
  type DataProvider,
  type IResourceItem,
  type RouterProvider,
  type IRefineOptions,
} from "@refinedev/core";

import { MockJSONServer, mockRouterProvider } from "./dataMocks";

export interface ITestWrapperProps {
  dataProvider?: DataProvider;
  routerProvider?: RouterProvider;
  authProvider?: AuthProvider;
  resources?: IResourceItem[];
  notificationProvider?: NotificationProvider;
  accessControlProvider?: AccessControlProvider;
  i18nProvider?: I18nProvider;
  routerInitialEntries?: string[];
  options?: IRefineOptions;
}

export const TestWrapper: (
  props: ITestWrapperProps,
) => React.FC<{ children?: ReactNode }> = ({
  dataProvider,
  authProvider,
  routerProvider,
  resources,
  notificationProvider,
  accessControlProvider,
  routerInitialEntries,
  i18nProvider,
  options,
}) => {
  return ({ children }): React.ReactElement => {
    const rootRoute = createRootRoute({
      component: () => <Outlet />,
    });

    const routes = [
      "/",
      "/login",
      "/posts",
      "/posts/create",
      "/posts/$id",
      "/posts/$id/edit",
      "/posts/show/$id",
      "/posts/edit/$id",
      "/posts/clone/$id",
      "/categories",
      "/categories/$id",
      "/categories/show/$id",
    ].map((path) =>
      createRoute({
        getParentRoute: () => rootRoute,
        path,
        component: () => null,
      }),
    );

    const router = createRouter({
      routeTree: rootRoute.addChildren(routes),
      history: createMemoryHistory({
        initialEntries: routerInitialEntries ?? ["/"],
      }),
      defaultPreload: false,
      InnerWrap: ({ children: routerChildren }) => (
        <Refine
          dataProvider={dataProvider ?? MockJSONServer}
          i18nProvider={i18nProvider}
          routerProvider={routerProvider ?? mockRouterProvider()}
          authProvider={authProvider}
          notificationProvider={notificationProvider}
          resources={resources ?? [{ name: "posts", list: "/posts" }]}
          accessControlProvider={accessControlProvider}
          options={{
            ...options,
            disableTelemetry: true,
            reactQuery: {
              clientConfig: {
                defaultOptions: {
                  queries: {
                    gcTime: 0,
                    staleTime: 0,
                    networkMode: "always",
                  },
                },
              },
            },
          }}
        >
          {children}
          {routerChildren}
        </Refine>
      ),
    });

    return <TanStackRouterProvider router={router} />;
  };
};

export {
  MockJSONServer,
  MockAccessControlProvider,
  MockLiveProvider,
} from "./dataMocks";

// re-export everything
export * from "@testing-library/react";
