---
id: react-router-v6
title: React Router v6
---

**refine** provides router bindings and utilities for [React Router v6](https://reactrouter.com/). It is built on top of the `react-router-dom` package. This package will provide easy integration between **refine** and **react-router-dom** for both existing projects and new projects.

```bash
npm i @refinedev/react-router-v6 react-router-dom
```

:::tip

We recommend using `create refine-app` to initialize your refine projects. It gives you a good boilerplate to start with using React Router v6.

```sh
npm create refine-app@latest -- -p refine-react my-refine-app
```

:::

[Refer to the Router Provider documentation for detailed information. &#8594][routerprovider]

:::note Legacy Router

`@refinedev/react-router-v6` also exports the legacy router provider and it will be available until the next major version of **refine**. It is recommended to use the new router provider instead of the legacy one.

If you are using the legacy router provider, it can be imported from `@refinedev/react-router-v6/legacy` and passed to the `legacyRouterProvider` prop of the `Refine` component.

:::

## Usage

`@refinedev/react-router-v6` is not restricting you to use the router in a specific way and it is up to you to decide how you want to use it. 

You can define your routes manually and provide the action paths to the `resources` array of `<Refine>`. From basic to advanced use cases and enterprise applications, you will have full control over your routes. In our examples, we've used this approach to demonstrate the flexibility of the router provider and the route handling process.

In the below example, we're defining the routes for both the resources and the custom routes manually and only applying the `Layout` for the `posts` resource routes.

```tsx title=App.tsx
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
// highlight-start
import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
// highlight-end

import { PostList, PostCreate } from "pages/posts";
import { CategoryList, CategoryShow } from "pages/categories";

import { Layout } from "components/Layout";
import { ErrorComponent } from "components/Error";

const App = () => {
    return (
        <BrowserRouter>
            <Refine
                dataProvider={dataProvider}
                // highlight-next-line
                routerProvider={routerProvider}
                resources={[
                    {
                        name: "posts",
                        list: "/posts",
                        create: "/posts/create",
                    },
                    {
                        name: "categories",
                        list: "/categories",
                        show: "/categories/show/:id",
                    }
                ]}
            >
                <Routes>
                    <Route index element={<NavigateToResource resource="posts" />} />
                    {/* highlight-start */}
                    <Route
                        path="posts"
                        element={(
                            <Layout>
                                <Outlet />
                            </Layout>
                        )}
                    >
                        <Route index element={<PostList />} />
                        <Route path="create" element={<PostCreate />} />
                    </Route>
                    <Route path="categories">
                        <Route index element={<CategoryList />} />
                        <Route path="show/:id" element={<CategoryShow />} />
                    </Route>
                    {/* highlight-end */}
                    <Route path="*" element={<ErrorComponent />} />
                </Routes>
        </BrowserRouter>
    )
}

```

:::note Additional Parameters and Nesting

Your action definitions in the resources can contain additional parameters and nested routes. Passing these parameters when navigating to the pages are handled by the current available parameters and the `meta` props of the related hooks and components.

**refine** supports route parameters defined with `:param` syntax. You can use these parameters in your action definitions and create your routes accordingly. For example, if you have a `posts` resource and you want to create a route for the `show` action of a specific post, you can define the `show` action as `/posts/show/:id` and use the `id` parameter in your component.

:::

### Basic Usage with `<RefineRoutes>`

We also provide a simple way to use `react-router-dom` with the **refine**'s resources through the [`RefineRoutes`](#refineroutes) component. Manually defining the routes may be more flexible and suited for your project but the [`RefineRoutes`](#refineroutes) will also work for basic use cases and it will save you some time to get started. We don't recommend using the basic approach if you want to have more control over your routes.

We'll use [`RefineRoutes`](#refineroutes) to render our resource components and we'll also add an error page for the routes that are not defined which will be a custom route. You're free to add additional routes inside the `RefineRoutes` component's children function. 

```tsx title=App.tsx
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
// highlight-start
import routerProvider, { RefineRoutes } from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// highlight-end

import { PostList, PostCreate } from "pages/posts";
import { CategoryList, CategoryShow } from "pages/categories";

import { Layout } from "components/Layout";
import { ErrorComponent } from "components/Error";

const App = () => {
    return (
        <BrowserRouter>
            <Refine
                dataProvider={dataProvider}
                // highlight-next-line
                routerProvider={routerProvider}
                resources={[
                    {
                        name: "posts",
                        // highlight-start
                        list: PostList,
                        create: PostCreate,
                        // highlight-end
                    },
                    {
                        name: "categories",
                        // highlight-start
                        list: CategoryList,
                        show: {
                            component: CategoryShow,
                            path: "/categories/:id/details", // Notice that we can also define the path here
                        },
                        // highlight-end
                    }
                ]}
            >
                <Layout>
                    {/* highlight-start */}
                    <RefineRoutes>
                        {(routes) => (
                            <Routes>
                                <Route index element={<NavigateToResource />} />
                                {routes}
                                <Route path="*" element={<ErrorComponent />} />
                            </Routes>
                        )}
                    </RefineRoutes>
                    {/* highlight-end */}
                </Layout>
        </BrowserRouter>
    )
}
```

We've defined our resource actions using components to let the `RefineRoutes` render them. We can also define the path for each action. If we don't define the path, the `RefineRoutes` will use the default paths for the actions. 

[Refer to "Understanding the Resources" section of our tutorial for detailed information. &#8594][resources]

💡 We also defined the `show` action's path as `/categories/:id/details` which will override the default path.

The `index` route is defined with the `NavigateToResource` component which will redirect the user to the list page of the first defined resource. 

We also added a catch-all route which will render the `ErrorComponent` for the routes that are not defined.

## Additional Components

`@refinedev/react-router-v6` package also includes some additional components that can be useful in some cases.

### `RefineRoutes`

This component can be used to create routes for your resources by using the `resources` prop. It will only take effect if the action properties in the resource definitions are assigned to components or objects with `component` property.

It will create the routes and pass it as a `JSX.Element[]` to the `children` function. You can use this to wrap your routes with other components like `Authenticated` or `Layout`.

:::tip
This is not the recommended way to create routes since it may limit the use of the full potential of your router. It is recommended to create your routes manually.
:::

```tsx
const App = () => {
    return (
        <BrowserRouter>
            <Refine
                resources={[
                    {
                        name: "posts",
                        list: PostList,
                        create: PostCreate,
                    },
                    {
                        name: "categories",
                        list: CategoryList,
                        create: CategoryCreate,
                    },
                ]}
            >
                {/* highlight-start */}
                <RefineRoutes>
                    {(routes) => (
                        <Layout>
                            <Routes>{routes}</Routes>
                        </Layout>
                    )}
                </RefineRoutes>
                {/* highlight-end */}
            </Refine>
        </BrowserRouter>
    );
};
```

:::info
When components are used to define the resource actions, default paths will be used. You can override the default paths by assigning an object with `component` and `path` properties to the action properties.

Default paths are:

-   `list`: `/resources`
-   `create`: `/resources/create`
-   `edit`: `/resources/edit/:id`
-   `show`: `/resources/show/:id`

:::

#### Properties

`children` (optional) - A function that takes the routes as a parameter and renders them. If not provided, the routes will be wrapped to `<Routes>` component and rendered. This is not recommended because it will limit the flexibility of the routes and wrappers.

### `NavigateToResource`

A basic component that extends the `Navigate` component from **react-router-dom** to navigate to a resource page. It is useful when you want to navigate to a resource page at the index route of your app.

```tsx

const App = () => {
    return (
        <BrowserRouter>
            <Refine
                /* ... */
                resources={[
                    {
                        name: "posts"
                        list: "/posts",
                    },
                ]}
            >
                <Routes>
                    {/* highlight-next-line */}
                    <Route path="/" element={<NavigateToResource resource="posts" />} />
                    <Route path="/posts" element={<PostList />} />
                </Routes>
            </Refine>
        </BrowserRouter>
    )
}

```

#### Properties

`resource` (optional) - The name of the resource to navigate to. It will redirect to the first `list` route in the `resources` array if not provided.

`meta` (optional) - The meta object to use if the route has parameters in it. The parameters in the current location will also be used to compose the route but `meta` will take precedence.

### `UnsavedChangesNotifier`

This component enables the `warnWhenUnsavedChanges` feature of **refine**. It will show a warning message when user tries to navigate away from the current page without saving the changes. Also checks for `beforeunload` event to warn the user when they try to close the browser tab or window.

Place this component inside the `<Refine>` components children to enable this feature.

```tsx
const App = () => {
    return (
        <BrowserRouter>
            <Refine
                /* ... */
                options={{
                    /* ... */
                    warnWhenUnsavedChanges: true,
                }}
            >
                {/* highlight-next-line */}
                <UnsavedChangesNotifier />
                {/* ... */}
            </Refine>
        </BrowserRouter>
    );
};
```

#### Properties

`translationKey` (optional) - The translation key for the warning message. Default value is `warnWhenUnsavedChanges`. Useful when you use an i18n provider.

`message` (optional) - The warning message. Default value is `Are you sure you want to leave? You have unsaved changes.` Useful when you don't use an i18n provider.

### `CatchAllNavigate`

It will redirect to the given path and keep the current location in `to` query parameter to redirect back when needed.

This component can be useful when you wrap your whole `Routes` component with an `Authenticated` component. In this case, to avoid constantly redirecting to the login page, you can use this component in a catch-all route to redirect to the desired page (e.g. `/login`) and keep the current location in `to` query parameter to redirect back to it after the user logs in.

The same behavior can also be achieved by default with the `Authenticated` component, but in cases like the one described above, it is not possible to use it because it would redirect to the login page every time the user navigates to a different page while being unauthenticated. (e.g. users won't be able to navigate to the `/register` page if they are not logged in)

```tsx
/**
 * Current location: /posts/show/1
 * and the authentication fails
 */

const App = () => {
    return (
        <BrowserRouter>
            <Refine
            /* ... */
            >
                <Authenticated
                    fallback={
                        <Routes>
                            <Route
                                path="/login"
                                element={<AuthPage type="login" />}
                            />
                            {/* highlight-next-line */}
                            <Route
                                path="*"
                                element={<CatchAllNavigate to="/login" />}
                            />
                            {/* This component will catch all the routes and redirect to `/login` by adding them to `to` query */}
                            {/* The result will be `/login?to=/posts/show/1` */}
                        </Routes>
                    }
                >
                    <Routes>
                        <Route path="/posts/show/:id" element={<PostList />} />
                    </Routes>
                </Authenticated>
            </Refine>
        </BrowserRouter>
    );
};
```

#### Properties

`to` (required) - The path to redirect to.

## FAQ

### How to use `Authenticated` for authentication?

**refine** provides an [`Authenticated`](/docs/api-reference/core/components/auth/authenticated/) component to wrap your components with authentication. You can use this component to wrap your routes and protect them from unauthorized access. You can use it to render your pages with wrapping them or partially apply `Authenticated` for sections in your page or wrap your whole `Routes` component with it, this completely depends on your use case and you can use it in any way you want to fit your needs.

Check out the [How to use `Authenticated` component with `RefineRoutes`?](#how-to-use-authenticated-component-with-refineroutes) and [How to handle optional authentication, redirects and layouts with authentication?](#how-to-handle-optional-authentication-redirects-and-layouts-with-authentication) sections for example usages.

### How to use `Authenticated` component with `RefineRoutes`?

You can pass your **refine** routes to the `children` of `Authenticated` component by wrapping them with `Routes` component. Then, you can use `fallback` property to render authentication routes. We'll only apply the `Layout` to the authenticated routes and leave the authentication routes as they are.

```tsx title=App.tsx
// highlight-next-line
import { Refine, Authenticated } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
// highlight-start
import routerProvider, {
    RefineRoutes,
    NavigateToResource,
    CatchAllNavigate,
} from "@refinedev/react-router-v6";
// highlight-end
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { PostList, PostCreate } from "pages/posts";
import { CategoryList, CategoryShow } from "pages/categories";

import { Layout } from "components/Layout";
import { ErrorComponent } from "components/Error";

import { AuthPage } from "pages/auth";

const App = () => {
    return (
        <BrowserRouter>
            <Refine
                dataProvider={dataProvider}
                // highlight-next-line
                routerProvider={routerProvider}
                resources={[
                    {
                        name: "posts",
                        list: PostList,
                        create: PostCreate,
                    },
                    {
                        name: "categories",
                        list: CategoryList,
                        show: CategoryShow,
                    },
                ]}
            >
                <RefineRoutes>
                    {(routes) => (
                        <Authenticated
                            fallback={
                                <Routes>
                                    <Route
                                        path="/login"
                                        element={<AuthPage type="login" />}
                                    />
                                    <Route
                                        path="*"
                                        element={
                                            <CatchAllNavigate to="/login" />
                                        }
                                    />
                                </Routes>
                            }
                        >
                            <Layout>
                                <Routes>
                                    <Route
                                        index
                                        element={
                                            <NavigateToResource resource="posts" />
                                        }
                                    />
                                    {/* highlight-next-line */}
                                    {routes}
                                    <Route
                                        path="*"
                                        element={<ErrorComponent />}
                                    />
                                </Routes>
                            </Layout>
                        </Authenticated>
                    )}
                </RefineRoutes>
            </Refine>
        </BrowserRouter>
    );
};
```

### How to handle optional authentication, redirects and layouts with authentication?

In the below example, you'll find different cases for route definitions, we've used `Authenticated` component to handle authentication and redirects. You can always choose to use a different approach, **refine** will allow you to handle the routes however you like.

For optional authentication, in our `authProvider` implementation's `check` method, we can pass `authentication: false` and `redirectTo: undefined` to indicate that the current user is not authenticated but we don't want to redirect them to the login page. This is useful, when some pages in our app are public and don't require authentication and some pages are private and require authentication.

```tsx title=authProvider.ts
import { AuthBindings } from "@refinedev/core";

export const authProvider: AuthBindings = {
    check: async () => {
        const isAuthenticated = await yourMethodToCheckIfUserIsAuthenticated();

        return {
            // highlight-next-line
            authentication: isAuthenticated,
            // notice that we omit the `redirectTo` property
        };
    },
    // ...
};
```

In our `App.tsx`, while defining the routes, we'll leverage the `Outlet` component from `react-router-dom` and `Authenticated` component from `@refinedev/core`.

Let's start with initializing our `<Refine>` component with inside `<BrowserRouter>` component. We'll pass our `dataProvider` `routerProvider` and `authProvider` to the `<Refine>` component. We'll also pass our `resources` and define our action paths for each resource in `<Refine>` component.

```tsx title=App.tsx
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router-v6";

import { BrowserRouter, Routes } from "react-router-dom";

import { authProvider } from "src/authProvider";

export const App = () => {
    return (
        <BrowserRouter>
            <Refine
                dataProvider={dataProvider}
                routerProvider={routerProvider}
                authProvider={authProvider}
                resources={[
                    {
                        name: "posts",
                        list: "/posts",
                        create: "/posts/create",
                    },
                ]}
            >
                {/* ... */}
            </Refine>
        </BrowserRouter>
    )
}
```

Then, let's start adding our routes. We'll start with the `LandingPage` component at the `/` path. This will be visible for both authenticated and unauthenticated users. We need to wrap our `Route` elements with a `Routes` component.

```diff title=App.tsx
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router-v6";

+ import { BrowserRouter, Routes, Route } from "react-router-dom";

import { authProvider } from "src/authProvider";

+ import { LandingPage } from "pages/landing";

export const App = () => {
    return (
        <BrowserRouter>
            <Refine
                dataProvider={dataProvider}
                routerProvider={routerProvider}
                authProvider={authProvider}
                resources={[
                    {
                        name: "posts",
                        list: "/posts",
                        create: "/posts/create",
                    },
                ]}
            >
+               <Routes>
+                   <Route index element={<LandingPage />} />
+               </Routes>
            </Refine>
        </BrowserRouter>
    )
}
```

Now, let's our resource actions. They will be wrapped with the `Layout` component and only visible for authenticated users. We'll use the `Authenticated` component to handle authentication and redirects. We'll also use the `Outlet` component to properly wrap and handle the authenticated routes.

```diff title=App.tsx
+ import { Refine, Authenticated } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router-v6";

+ import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { authProvider } from "src/authProvider";

+ import { Layout } from "components/layout";
import { LandingPage } from "pages/landing";
+ import { PostList, PostCreate } from "pages/posts";

export const App = () => {
    return (
        <BrowserRouter>
            <Refine
                dataProvider={dataProvider}
                routerProvider={routerProvider}
                authProvider={authProvider}
                resources={[
                    {
                        name: "posts",
                        list: "/posts",
                        create: "/posts/create",
                    },
                ]}
            >
                <Routes>
                    <Route index element={<LandingPage />} />
+                   <Route
+                       element={(
+                           <Authenticated redirectOnFail="/login">
+                               <Layout>
+                                   <Outlet />
+                               </Layout>
+                           </Authenticated>
+                       )}
+                   >
+                       <Route path="posts">
+                           <Route index element={<PostList />} />
+                           <Route path="create" element={<PostCreate />} />
+                       </Route>
+                   </Route>
                </Routes>
            </Refine>
        </BrowserRouter>
    )
}
```

Now, when we navigate to the `/posts` page we should either see the `PostList` component or be redirected to the `/login` page. If we're already authenticated, we should see the `PostList` component.

We can now add our `/login` and `/register` pages. We'll use the `AuthPage` component for both pages. We'll also navigate to the `/posts` page if the user is already authenticated.

```diff title=App.tsx
import { Refine, Authenticated } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
+ import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { authProvider } from "src/authProvider";

import { Layout } from "components/layout";
import { LandingPage } from "pages/landing";
import { PostList, PostCreate } from "pages/posts";
+ import { AuthPage } from "pages/auth";

export const App = () => {
    return (
        <BrowserRouter>
            <Refine
                dataProvider={dataProvider}
                routerProvider={routerProvider}
                authProvider={authProvider}
                resources={[
                    {
                        name: "posts",
                        list: "/posts",
                        create: "/posts/create",
                    },
                ]}
            >
                <Routes>
                    <Route index element={<LandingPage />} />
                    <Route
                        element={(
                            <Authenticated redirectOnFail="/login">
                                <Layout>
                                    <Outlet />
                                </Layout>
                            </Authenticated>
                        )}
                    >
                        <Route path="posts">
                            <Route index element={<PostList />} />
                            <Route path="create" element={<PostCreate />} />
                        </Route>
                    </Route>
+                   <Route
+                       element={(
+                           <Authenticated fallback={<Outlet />}>
+                               <NavigateToResource resource="posts" />
+                           </Authenticated>
+                       )}
+                   >
+                       <Route path="/login" element={<AuthPage type="login" />} />
+                       <Route path="/register" element={<AuthPage type="register" />} />
+                   </Route>
                </Routes>
            </Refine>
        </BrowserRouter>
    )
}
```

Now, when we navigate to the `/login` or `/register` pages, we should either see the `AuthPage` component or be redirected to the `/posts` page. If we're already authenticated, we should be redirected to the `/posts` page.

Finally, we'll add our `ErrorComponent` component to show when user navigates to a non-existing page.

```diff title=App.tsx
import { Refine, Authenticated } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { authProvider } from "src/authProvider";

import { Layout } from "components/layout";
+ import { ErrorComponent } from "components/error";
import { LandingPage } from "pages/landing";
import { PostList, PostCreate } from "pages/posts";
import { AuthPage } from "pages/auth";

export const App = () => {
    return (
        <BrowserRouter>
            <Refine
                dataProvider={dataProvider}
                routerProvider={routerProvider}
                authProvider={authProvider}
                resources={[
                    {
                        name: "posts",
                        list: "/posts",
                        create: "/posts/create",
                    },
                ]}
            >
                <Routes>
                    <Route index element={<LandingPage />} />
                    <Route
                        element={(
                            <Authenticated redirectOnFail="/login">
                                <Layout>
                                    <Outlet />
                                </Layout>
                            </Authenticated>
                        )}
                    >
                        <Route path="posts">
                            <Route index element={<PostList />} />
                            <Route path="create" element={<PostCreate />} />
                        </Route>
                    </Route>
                    <Route
                        element={(
                            <Authenticated fallback={<Outlet />}>
                                <NavigateToResource resource="posts" />
                            </Authenticated>
                        )}
                    >
                        <Route path="/login" element={<AuthPage type="login" />} />
                        <Route path="/register" element={<AuthPage type="register" />} />
                    </Route>
+                   <Route path="*" element={<ErrorComponent />} />
                </Routes>
            </Refine>
        </BrowserRouter>
    );
};
```

### Handling 404s

In the earlier versions of **refine**, if `authProvider` was defined, we've redirected the users to the `/login` route even with the 404s and 404 pages were only available to the authenticated users. Now, the routes are handled by the users, so you can handle the 404s however you like.

#### 404 Pages for both authenticated and not authenticated users

Here's an example for rendering the `ErrorComponent` for undefined routes for both authenticated and not authenticated users.

Let's start with defining the `Refine` component.

```tsx title=App.tsx
import { Refine, Authenticated } from "@refinedev/core";
import routerProvider, { CatchAllNavigate } from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { authProvider } from "providers/authProvider";

import { ErrorPage } from "pages/error";
import { AuthPage } from "pages/auth";
import { PostList, CategoryList } from "pages/posts";
import { Layout } from "components/Layout";

export const App = () => {
    return (
        <BrowserRouter>
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                authProvider={authProvider}
                resources={[
                    {
                        name: "posts",
                        list: "/posts",
                    },
                    {
                        name: "categories",
                        list: "/categories",
                    },
                ]}
            >
                <Routes>{/* ... */}</Routes>
            </Refine>
        </BrowserRouter>
    );
};
```

Now, we can add the routes with authentication control. We should place them inside the `Routes` component.

```tsx
<Route
    element={
        <Authenticated fallback={<CatchAllNavigate to="/login" />}>
            <Layout>
                <Outlet />
            </Layout>
        </Authenticated>
    }
>
    <Route path="/posts" element={<PostList />} />
    <Route path="/categories" element={<CategoryList />} />
</Route>
```

This will render the `/posts` and `/categories` routes for authenticated users and apply the `Layout` when rendering. If the current visitor is not authenticated, it will redirect them to the `/login` route.

Let's add the `/login` route.

```tsx
<Route
    element={
        <Authenticated fallback={<Outlet />}>
            <NavigateToResource />
        </Authenticated>
    }
>
    <Route path="/login" element={<AuthPage type="login" />} />
</Route>
```

This will render the `/login` route for not authenticated users and redirect the authenticated users to the `/posts` route.

And finally, we will add a catch-all route (`*`) and render the `ErrorPage` component.

```tsx
<Route
    element={
        <Authenticated fallback={<Outlet />}>
            <Layout>
                <Outlet />
            </Layout>
        </Authenticated>
    }
>
    <Route path="*" element={<ErrorPage />} />
</Route>
```

We will render the `ErrorPage` component for both authenticated and not authenticated users. Only authenticated users will be able to use the sider component we have in the layout.

#### 404 Pages for authenticated users only

The difference from the previous example is in the wrapper of the `*` route. Now we will redirect the unauthenticated users to the `/login` route and show the `ErrorPage` component for authenticated users only.

```tsx
<Route
    element={
        <Authenticated fallback={<CatchAllNavigate to="/login" />}>
            <Layout>
                <Outlet />
            </Layout>
        </Authenticated>
    }
>
    <Route path="*" element={<ErrorPage />} />
</Route>
```

We can also omit the `fallback` property and let the default redirect flow handle the unauthenticated users.

```tsx
<Route
    element={
        <Authenticated>
            <Layout>
                <Outlet />
            </Layout>
        </Authenticated>
    }
>
    <Route path="*" element={<ErrorPage />} />
</Route>
```

This means we will look for the `redirectTo` property in the `authProvider`'s `check` method. If it's defined, `<Authenticated>` component will redirect the user to the `redirectTo` route.

[routerprovider]: /api-reference/core/providers/router-provider.md
[resources]: /docs/tutorial/understanding-resources/index/
