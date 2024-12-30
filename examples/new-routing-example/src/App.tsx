import { Authenticated, Refine } from "@refinedev/core";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import dataProvider from "@refinedev/simple-rest";
import {
  useNotificationProvider,
  ThemedLayoutV2,
  ErrorComponent,
  AuthPage,
  Sider,
  RefineThemes,
} from "@refinedev/antd";

/**
 * New bindings for react-router-v6 are available as default export.
 * You can access the old router provider exports at `@refinedev/react-router-v6/legacy`.
 *
 * We've also added some new components to make it easier to use refine and its features with react-router-v6.
 *
 * - `RefineRoutes`: A component that renders the routes for the resources.
 * It accepts a render function as a child. This way you can render additional routes inside a single `Routes` component.
 * This component is **optional** to use in your app. You can render your routes manually
 * and if you want, you can assign resources to your routes without making them rendered by the `RefineRoutes` component.
 * This makes it possible for our users to create the routes as they want and still use the full potential of refine resources.
 * Check below for an example usage.
 *
 * - `UnsavedChangesNotifier`: A component that notifies the user if there are unsaved changes.
 * In the earlier versions of refine, we used to handle this inside the `Refine` component by the `warnWhenUnsavedChanges` prop.
 * This was not a flexible solution, as it was not possible to customize the behavior of the `warnWhenUnsavedChanges` prop and the text of the notification.
 * We've now moved this to a separate component, that communicates with the refine's context to show the prompt and is also customizable.
 * Instead of using the `warnWhenUnsavedChanges` prop, you can use the `UnsavedChangesNotifier` component to enable the same behavior.
 *
 * - `NavigateToResource`: A component that navigates to a resource page.
 * By default, it navigates to the list page of the first resource in the `resources` prop.
 * In the earlier versions of refine, we used to handle this inside the `Refine` component with no easy way to customize the behavior.
 * Now, you can use the `NavigateToResource` component at your index page to achieve the same behavior.
 * Also you can pass a `resource` prop to navigate to a specific resource.
 * This is an **optional** component to use in your app.
 *
 * - `CatchAllNavigate`: A component that navigates to the provided `to` prop and appends the current location's pathname to the `to` query params.
 *
 */
import routerBindings, {
  RefineRoutes,
  NavigateToResource,
  UnsavedChangesNotifier,
  CatchAllNavigate,
  DocumentTitleHandler,
} from "@refinedev/react-router";

import { ConfigProvider, App as AntdApp } from "antd";
import "@refinedev/antd/dist/reset.css";

import { PostList, PostCreate, PostEdit, PostShow } from "./pages/posts";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  return (
    /**
     * In earlier versions of refine, we handled the wrapping of the app with the `BrowserRouter` or your router choice by `routerProvider` interface.
     * This was a bad design decision, as it was not flexible enough and it was not easy to add refine to an existing app.
     *
     * Now, we've marked `routerProvider` as optional and leaving the routing to our users.
     * This way, you can use the full power of your router and refine will not interfere with it.
     *
     * With the current design,
     * - you can use any router you want,
     * - with any route you want
     * - and refine will still work at its full potential!
     */
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <AntdApp>
          <Refine
            /**
             * `routerBindings` contains the router bindings for the router you're using.
             * It can contain four properties:
             * - `Link`: A component that renders a link to a page. It should accept a `to` prop.
             * - `go`: A function that returns a function that navigates to a page. It accepts `GoConfig` as an argument.
             * - `back`: A function that returns a function that navigates back.
             * - `parse`: A function that returns a function that parses the resource, id, action, additional params and query params from a URL.
             * - Check the `ParseResponse` type for more information about the expected return value.
             *
             * `go`, `back`, and `parse` are functions returning functions.
             * This way you can use hooks inside them.
             * refine will treat them as hooks.
             *
             * You can easily create your own router bindings and change the behavior of the router.
             * Such as, changing the parameters used in `syncWithLocation`,
             * including storing them inside other storage options like `localStorage`.
             *
             * Refine will only use the provided methods and do not infer anything trivially.
             *
             * The biggest difference between the old router bindings and the new one is that,
             * The new routing system does not check for authentication in the routes by default.
             * You can achieve the same behavior by using the `Authenticated` component from `@refinedev/core`.
             * You can either use the `Authenticated` component inside each route,
             * or you can wrap the `Routes` component that you'll use inside `RefineRoutes` component with the `Authenticated` component.
             * This is done to make it easier to use refine with any routing case.
             *
             * `routerProvider` prop and its properties are now **optional**.
             * Using it will enable refine's router related features but they are not required to use refine.
             */
            routerProvider={routerBindings}
            dataProvider={dataProvider(API_URL)}
            notificationProvider={useNotificationProvider}
            options={{
              warnWhenUnsavedChanges: true,
              syncWithLocation: true,
            }}
            /**
             * We've also made some changes in the `resources` prop and in the definition of the resources.
             *
             * Some little changes are;
             * - `options` are now `meta` to match the convention of other refine features.
             * - `parentName`, `icon` and `canDelete` are now moved to the `meta` property.
             * - `parentName` is now `parent`.
             * - `auditLog` is now `audit`.
             *
             * There's a new property called `identifier` which can be used to identify the resource.
             * You can use `identifier` in cases where you want to use the same resource multiple times in different routes or configurations.
             *
             * The biggest change there is in the action definitions.
             * Now you don't need to pass the components to the actions and there are multiple ways to define the actions.
             * You can still opt-in to use the actions by passing components and they will be rendered by the `RefineRoutes` component.
             * Now, you can also pass a path for the actions without passing the components and refine will acknowledge those routes as actions.
             * Also you can pass a component to the action property, `RefineRoutes` components will render that component for the action in its default path.
             * The default path for actions are the same ones used in the earlier versions of refine. (e.g. `/posts`, `/posts/create`, `posts/edit/:id` and `posts/show/:id`)
             * Also there's a third way, which is to pass an object to the action with a `component` and `path` properties.
             * This way you can define the component and the path for the action and continue using the `RefineRoutes` component.
             *
             * For the new routing system, we don't nest the routes by their parents anymore.
             * To achieve the same behavior, you need to explicitly define the path for the actions.
             * The `parent` property is now used in `useMenu` and `useBreadcrumb` hooks to achieve nesting.
             */
            resources={[
              {
                name: "posts",
                /**
                 * Defining the `list` property as a component.
                 * When using `RefineRoutes` component, a route will be created for it at `/posts`.
                 */
                list: PostList,
                /**
                 * Defining the `create` property as a path.
                 * Since there's no component defined for it,
                 * It will be skipped by the `RefineRoutes` component.
                 * But refine will still acknowledge this path as the `create` action for the `posts` resource.
                 */
                create: "/create-new-post",
                /**
                 * Defining the `edit` property as an object.
                 * This way you can define the component and provide a path for the action.
                 * `RefineRoutes` component will create route for the path and render the component for the action.
                 */
                edit: {
                  /**
                   * Notice the default path for the edit action was `/posts/edit/:id`.
                   * We're changing the path to `/posts/:id/edit` here.
                   */
                  path: "/posts/:id/edit",
                  /**
                   * This will be used as the content of the route.
                   */
                  component: PostEdit,
                },
                /**
                 * Defining the `edit` property as an object.
                 * Additionally, we will also define a nested route with additional params.
                 * Let's assume that our `show` action is also depending the `authorId`.
                 *
                 * You can provide custom `meta` to the buttons or breadcrumbs/menus etc.
                 * Those `meta` properties will be used when creating the action paths.
                 * If the current route already contains `authorId` parameter, it will be used to create the path.
                 */
                show: {
                  path: "/:authorId/posts/show/:id",
                  component: PostShow,
                },
                meta: {
                  /**
                   * We're defining the `parent` property here.
                   * It will be used in `useMenu` and `useBreadcrumb` hooks to achieve nesting.
                   * With the new routing system, it won't have any effect on the created routes for the resources.
                   * Legacy router will still work the same as before.
                   */
                  parent: "blog",
                  label: "Posts",
                },
              },
            ]}
            /**
             * In earlier versions, `Refine` component had some component props,
             * which were used to render things like the `ThemedLayoutV2`, `Sider`, `OffLayoutArea`, etc.
             * And also some components like
             * - `catchAll` which renders the error page in 404s
             * - `DashboardPage` to render a page at the root path (`/`)
             *
             * We're not deprecated all of these props but kept the components exported from the UI packages.
             * This way, we're leaving you the choice to use the components as where and how you like.
             *
             * For layout related components, you can use them inside the children of the <Refine> component.
             * For page related components, you can use them while you're rendering the routes.
             *
             * - `warnWhenUnsavedChanges` prop is now deprecated and you should use the `UnsavedChangesNotifier` component instead.
             * - Deprecated props from the earlier versions of refine are removed.
             * - Newly deprecated props are marked as deprecated but kept working until the next major version.
             * - Router related deprecated props only work with the legacy router providers.
             */
          >
            <RefineRoutes>
              {(resourceRoutes) => (
                /**
                 *
                 * `resourceRoutes` is an array of routes for the resources.
                 * `react-router-dom` requires to wrap the routes with a `Routes` component.
                 *
                 * We'll wrap the routes with `Authenticated` component to protect the routes.
                 * If the user is not authenticated, `Authenticated` component will redirect the user to the login page.
                 * If the user is authenticated, it will render the routes with the `ThemedLayoutV2` component wrapper.
                 *
                 * We'll also have another route for the login page.
                 * It will be rendered if the user is not authenticated.
                 * If the user is authenticated, it will redirect the user to the first resource's list page.
                 *
                 */
                <Routes>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-routes"
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ThemedLayoutV2 Sider={Sider}>
                          <Outlet />
                        </ThemedLayoutV2>
                      </Authenticated>
                    }
                  >
                    {resourceRoutes}
                    {/**
                     * Since we've defined the `create` property as a path,
                     * we need to define the route for it here.
                     */}
                    <Route path="/create-new-post" element={<PostCreate />} />
                    {/**
                     * Let's define an additional route apart from the resource routes.
                     */}
                    <Route
                      path="/about"
                      element={<div>A custom route at `/path`</div>}
                    />
                    {/**
                     * Now, we can start replacing the behavior of the deprecated usages.
                     *
                     * We'll create an index route, then use `NavigateToResource` component to redirect it to the first resource.
                     */}
                    <Route index element={<NavigateToResource />} />
                    {/**
                     * Now, we'll use the `ErrorComponent` to handle 404s
                     */}
                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                  <Route
                    element={
                      <Authenticated key="auth-pages" fallback={<Outlet />}>
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route path="/login" element={<AuthPage type="login" />} />
                  </Route>
                </Routes>
              )}
            </RefineRoutes>
            {/**
             * At last, we'll use the `UnsavedChangesNotifier` component.
             * This is a replacement component for the feature provided with the `warnWhenUnsavedChanges` prop of `<Refine>`.
             * It has some router specific implementation and will not work with the legacy router providers.
             *
             * It will show you a prompt when you try to navigate away from the page with unsaved changes.
             * If the prompt is accepted, it will clear the unsaved changes and continue the route change.
             * If the prompt is declined, navigation will be blocked and users will stay in the same page.
             * It's useful when preventing data loss while developing apps with long forms.
             */}
            <UnsavedChangesNotifier message="You have unsaved changes! Your changes will be lost if you close this page." />
            <DocumentTitleHandler />
          </Refine>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default App;
