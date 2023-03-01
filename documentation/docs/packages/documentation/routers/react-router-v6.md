---
id: react-router-v6
title: React Router v6
---

**refine** provides router bindings and utiliities for [React Router v6](https://reactrouter.com/). It is built on top of the [react-router-dom](https://reactrouter.com/web/guides/quick-start) package. This package will provide easy integration between **refine** and **react-router-dom** for both existing projects and new projects.

```bash
npm i @pankod/refine-react-router-v6 react-router-dom
```

[Refer to the Router Provider documentation for detailed information. &#8594][routerprovider]

:::note Legacy Router

`@pankod/refine-react-router-v6` also exports the legacy router provider and it will be available until the next major version of **refine**. It is recommended to use the new router provider instead of the legacy one.

If you are using the legacy router provider, it can be imported from `@pankod/refine-react-router-v6/legacy` and passed to the `legacyRouterProvider` prop of the `Refine` component.

:::

## Basic Usage

We'll use the components from the `react-router-dom` package to create our routes and define the routes for our resources.

Providing the `routerProvider` prop to `<Refine>` component will let **refine** communicate with the router. Our package also provides the [`NavigateToResource`](#navigatetoresource) component that can be used to navigate to the list page of a resource.

```tsx title=App.tsx
import { Refine } from "@pankod/refine-core";
import dataProvider from "@pankod/refine-simple-rest";
// highlight-start
import routerProvider, { NavigateToResource } from "@pankod/refine-react-router-v6";
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
                <Layout>
                    <Routes>
                        <Route index element={<NavigateToResource resource="posts" />} />
                        <Route path="/posts" element={<PostList />} />
                        <Route path="/posts/create" element={<PostCreate />} />
                        <Route path="/categories" element={<CategoryList />} />
                        <Route path="/categories/show/:id" element={<CategoryShow />} />
                        <Route path="*" element={<ErrorComponent />} />
                    </Routes>
                </Layout>
        </BrowserRouter>
    )
}

```

:::note Additional Parameters and Nesting

Your action definitions in the resources can contain additional parameters and nested routes. Passing these parameters when navigating to the pages are handled by the current available parameters and the `meta` props of the related hooks and components.

**refine** supports route parameters defined with `:param` syntax. You can use these parameters in your action definitions and create your routes accordingly. For example, if you have a `posts` resource and you want to create a route for the `show` action of a specific post, you can define the `show` action as `/posts/show/:id` and use the `id` parameter in your component.

:::

### With Authentication

**refine** provides an [`Authenticated`](/docs/api-reference/core/components/auth/authenticated/) component to wrap your components with authentication. You can use this component to wrap your routes and protect them from unauthorized access.

While the [`Authenticated`](/docs/api-reference/core/components/auth/authenticated/) can be used in many ways to protect your routes, we'll use it to wrap the whole routes in this example. You're free to use it in any way that suits your needs.

We'll use [`NavigateAndKeepCurrent`](#navigateandkeepcurrent) component to navigate to the login page when the user is not authenticated. This component will also pass the current route to the query parameters of the login page. This way, we can redirect the user back to the page they were trying to access after they login.

```tsx title=App.tsx
// highlight-next-line
import { Refine, Authenticated } from "@pankod/refine-core";
import dataProvider from "@pankod/refine-simple-rest";
// highlight-start
import routerProvider, { NavigateToResource, NavigateAndKeepCurrent } from "@pankod/refine-react-router-v6";
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
                <Authenticated
                    // highlight-start
                    fallback={(
                        <Routes>
                            <Route path="/login" element={<AuthPage type="login" />} />
                            <Route path="*" element={<NavigateAndKeepCurrent to="/login" />} />
                        </Routes>
                    )}
                    // highlight-end
                >
                    <Layout>
                        <Routes>
                            <Route index element={<NavigateToResource resource="posts" />} />
                            <Route path="/posts" element={<PostList />} />
                            <Route path="/posts/create" element={<PostCreate />} />
                            <Route path="/categories" element={<CategoryList />} />
                            <Route path="/categories/show/:id" element={<CategoryShow />} />
                            <Route path="*" element={<ErrorComponent />} />
                        </Routes>
                    </Layout>
                </Authenticated>
        </BrowserRouter>
    )
}

```

## Additional Components

`@pankod/refine-react-router-v6` package also includes some additional components that can be useful in some cases.

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
                    }
                ]}
            >
                {/* highlight-start */}
                <RefineRoutes>
                    {(routes) => (
                        <Layout>
                            <Routes>
                                {routes}
                            </Routes>
                        </Layout>
                    )}
                </RefineRoutes>
                {/* highlight-end */}
            </Refine>
        </BrowserRouter>
    )
}

```

:::info
When components are used to define the resource actions, default paths will be used. You can override the default paths by assigning an object with `component` and `path` properties to the action properties.

Default paths are:

- `list`: `/resources`
- `create`: `/resources/create`
- `edit`: `/resources/edit/:id`
- `show`: `/resources/show/:id`
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
    )
}
```

#### Properties

`translationKey` (optional) - The translation key for the warning message. Default value is `warnWhenUnsavedChanges`. Useful when you use an i18n provider.

`message` (optional) - The warning message. Default value is `Are you sure you want to leave? You have unsaved changes.` Useful when you don't use an i18n provider.

### `NavigateAndKeepCurrent`

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
                    fallback={(
                        <Routes>
                            <Route path="/login" element={<AuthPage type="login" />} />
                            {/* highlight-next-line */}
                            <Route path="*" element={<NavigateAndKeepCurrent to="/login" />} />
                            {/* This component will catch all the routes and redirect to `/login` by adding them to `to` query */}
                            {/* The result will be `/login?to=/posts/show/1` */}
                        </Routes>
                    )}
                >
                    <Routes>
                        <Route path="/posts/show/:id" element={<PostList />} />
                    </Routes>
                </Authenticated>
            </Refine>
        </BrowserRouter>
    )
}

```

#### Properties

`to` (required) - The path to redirect to.



[routerprovider]: /api-reference/core/providers/router-provider.md