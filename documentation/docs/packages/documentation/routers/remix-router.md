---
id: remix
title: Remix
---

**refine** provides router bindings and utiliities for [Remix](https://remix.run). This package will provide easy integration between **refine** and **Remix** for both existing projects and new projects without giving up the benefits of **Remix**.

```bash
npm i @pankod/refine-remix-router
```

[Refer to the Router Provider documentation for detailed information. &#8594][routerprovider]

:::note Legacy Router

`@pankod/refine-remix-router` also exports the legacy router provider and it will be available until the next major version of **refine**. It is recommended to use the new router provider instead of the legacy one.

If you are using the legacy router provider, it can be imported from `@pankod/refine-remix-router/legacy` and passed to the `legacyRouterProvider` prop of the `Refine` component.

:::

## Basic Usage

We'll use the `routerProvider` from `@pankod/refine-remix-router` to set up the router bindings for **refine**. We'll define the action routes for our resources in the `resources` array and define our routes in `app/routes` directory.

We'll create four pages for our resources:

- `app/routes/posts.tsx` - List page for posts
- `app/routes/posts.show.$id.tsx` - Detail page for posts
- `app/routes/categories.tsx` - List page for categories
- `app/routes/categories.show.$id.tsx` - Detail page for categories

And we'll create one page for the index route and use it to redirect to the `posts` resource:

- `app/routes/index.tsx` - Index page

Let's start with the initialization of the **refine** app in the `app/root.tsx` file:

```tsx title=app/root.tsx
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "@remix-run/react";

import { Refine } from "@pankod/refine-core";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-remix-router";

import { Layout } from "components/Layout";

export default function App(): JSX.Element {
    return (
        <html lang="en">
            <head>
                <Meta />
                <Links />
            </head>
            <body>
                <Refine
                    dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                    // highlight-next-line
                    routerProvider={routerProvider}
                    resources={[
                        {
                            name: "posts",
                            list: "/posts",
                            show: "/posts/show/:id",
                        },
                        {
                            name: "categories",
                            list: "/categories",
                            show: "/categories/show/:id",
                        }
                    ]}
                >
                    <Layout>
                        <Outlet />
                    </Layout>
                </Refine>
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}

```

:::tip

Remix uses the `$` symbol to indicate parameters but **refine** uses the colon syntax (`:param`) for route parameters. This won't cause any problems since **refine** only uses the colon syntax as an indicator for route parameters and the communication between **refine** and the router is handled by the `routerProvider` prop.

:::

:::note Additional Parameters and Nesting

Your action definitions in the resources can contain additional parameters and nested routes. Passing these parameters when navigating to the pages are handled by the current available parameters and the `meta` props of the related hooks and components.

**refine** supports route parameters defined with `:param` syntax. You can use these parameters in your action definitions and create your routes accordingly. For example, if you have a `posts` resource and you want to create a route for the `show` action of a specific post, you can define the `show` action as `/posts/show/:id` and use the `id` parameter in your component.

:::

Now we can create our pages in the `pages` directory:

```tsx title=app/routes/posts.tsx
import { useTable } from "@pankod/refine-core";
import { NavLink } from "@remix-run/react";

type IPost = {
    id: string;
    title: string;
    description: string;
}

export default function PostList() {
    // `posts` resource will be inferred from the route.
    // Because we've defined `/posts` as the `list` action of the `posts` resource.
    const { tableQueryResult: { data, isLoading } } = useTable<IPost>();

    const getToPath = useGetToPath();

    const tableData = data?.data;

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {!isLoading && (
                <ul>
                    {tableData?.map((post) => (
                        <li key={post.id}>
                            <NavLink
                                to={getToPath({
                                    resource: "categories",
                                    action: "show" ,
                                    meta: { id: category.id }
                                })}
                            >
                                {post.title}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
```

```tsx title=app/routes/posts.show.$id.tsx
import { useShow } from "@pankod/refine-core";

type IPost = {
    id: string;
    title: string;
    description: string;
}

export default function PostShow() {
    // `posts` resource and the `id` will be inferred from the route.
    // Because we've defined `/posts/show/:id` as the `show` action of the `posts` resource.
    const { queryResult: { data, isLoading } } = useShow<IPost>();

    const postData = data?.data;

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {!isLoading && (
                <h1>{postData?.title}</h1>
                <p>{postData?.description}</p>
            )}
        </div>
    );
}
```

```tsx title=app/routes/categories.tsx
import { useTable, getToPath } from "@pankod/refine-core";
import { NavLink } from "@remix-run/react";

type ICategory = {
    id: string;
    label: string;
}

export default function CategoryList() {
    // `categories` resource will be inferred from the route.
    // Because we've defined `/categories` as the `list` action of the `categories` resource.
    const { tableQueryResult: { data, isLoading } } = useTable<ICategory>();

    const getToPath = useGetToPath();

    const tableData = data?.data;

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {!isLoading && (
                <ul>
                    {tableData?.map((category) => (
                        <li key={category.id}>
                            <NavLink
                                to={getToPath({
                                    resource: "categories",
                                    action: "show" ,
                                    meta: { id: category.id }
                                })}
                            >
                                {category.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
```

```tsx title=app/routes/categories.show.$id.tsx
import { useShow } from "@pankod/refine-core";

type ICategory = {
    id: string;
    label: string;
}

export default function CategoryShow() {
    // `categories` resource and the `id` will be inferred from the route.
    // Because we've defined `/categories/show/:id` as the `show` action of the `categories` resource.
    const { queryResult: { data, isLoading } } = useShow<ICategory>();

    const categoryData = data?.data;

    return (
        <div>
            <h1>{categoryData?.label}</h1>
        </div>
    );
}
```

Now, we'll use [`NavigateToResource`](#navigatetoresource) component to redirect to the `posts` resource when the user visits the home page.

:::tip

Even though we're using the `NavigateToResource` component, when using Remix it's better to handle such redirect operations in the server side rather than the client side. You can use the `loader` function to redirect the user to the `/posts`.

:::

```tsx title=app/routes/index.tsx
import { NavigateToResource } from "@pankod/refine-remix-router";

export default function Index() {
    return (
        <NavigateToResource />
    );
}
```

## Additional Components

`@pankod/refine-remix-router` package also includes some additional components that can be useful in some cases.

### `RefineRoutes`

This component can be used to render the matching route in your resources by using the `resources` prop. It will only take effect if the action properties in the resource definitions are assigned to components or objects with `component` property.

It will render the component for the matching route and pass it as a `JSX.Element` to the `children` function. You can use this to render your components in a single catch-all route. If there's no matching route `undefined` will be passed to the `children` function. In this case, you can render an error page or redirect the user to another page.

:::tip
This is not the recommended way to create pages since it may limit the use of the full potential of your router. It is recommended to create your pages manually.
:::

We'll define our resources in the `<Refine>` component:

```tsx title=app/root.tsx
return (
    <Refine
        resources={[
            {
                name: "posts",
                list: "/posts",
                show: "/posts/show/:id",
            },
            {
                name: "categories",
                list: "/categories",
            }
        ]}
    >
    {/* ... */}
    </Refine>
);
```

Then, we'll create a catch-all route to render the matching route in our resources:

```tsx title=app/routes/$.tsx
import { RefineRoutes } from "@pankod/refine-remix-router";

import { ErrorPage } from "components/error";

export default function CatchAll() {
    return (
        <RefineRoutes>
            {(matchingRoute) => {
                if (matchingRoute) {
                    return {matchingRoute};
                }

                return <ErrorPage />;
            }}
        </RefineRoutes>
    );
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

`children` - A function that takes renders the matching route as a `JSX.Element`. If there's no matching route, `undefined` will be passed to the function.

### `NavigateToResource`

A basic component to navigate to a resource page. It is useful when you want to navigate to a resource page at the index route of your app.

```tsx title=app/routes/index.tsx
import { NavigateToResource } from "@pankod/refine-remix-router";

export default function IndexPage() {
    return (
        <NavigateToResource />
    );
}
```

#### Properties

`resource` (optional) - The name of the resource to navigate to. It will redirect to the first `list` route in the `resources` array if not provided.

`meta` (optional) - The meta object to use if the route has parameters in it. The parameters in the current location will also be used to compose the route but `meta` will take precedence.

### `UnsavedChangesNotifier`

This component enables the `warnWhenUnsavedChanges` feature of **refine**. It will show a warning message when user tries to navigate away from the current page without saving the changes. Also checks for `beforeunload` event to warn the user when they try to close the browser tab or window.

Place this component inside the `<Refine>` components children to enable this feature.

```tsx title=app/root.tsx
import { Refine } from "@pankod/refine-core";
import { UnsavedChangesNotifier } from "@pankod/refine-remix-router";

export default function App(): JSX.Element {
    return (
        <Refine
            /* ... */
        >
                <Outlet />
                {/* highlight-next-line */}
                <UnsavedChangesNotifier />
        </Refine>
    );
}
```

#### Properties

`translationKey` (optional) - The translation key for the warning message. Default value is `warnWhenUnsavedChanges`. Useful when you use an i18n provider.

`message` (optional) - The warning message. Default value is `Are you sure you want to leave? You have unsaved changes.` Useful when you don't use an i18n provider.

## FAQ

### How to handle Authentication?

In Remix you can achieve authentication control in multiple ways;

You can wrap your pages with [`Authenticated`](/docs/api-reference/core/components/auth/authenticated/) component from `@pankod/refine-core` to protect your pages from unauthorized access.

Since this is a client side approach, you can also use your `authProvider`'s `check` function inside server side functions (`loader`) to redirect unauthorized users to other pages using `redirect` from `@remix-run/node`.

Using a server side approach is recommended but you can use any approach you want.

### Can I use nested routes?

Yes, you can use nested routes in your app. **refine** will match the routes depending on how you define the action paths in your resources. Additional parameters and nesting is supported. **refine** will not limit you and your router in route configuration, all you need to do is to pass the appropriate path to the related resource and the action in the `resources` array (This is also optional but recommended due to the features it provides).

You can use `:param` syntax to define parameters in your routes.

### How to make SSR work?

You can always use the methods provided from the `dataProvider` to fetch data in your pages. To do this, you can use `loader` function and pass the data to your page as a prop. 

All you need to do is to pass the data as the `initialData` to your data hooks using the `queryOptions` prop.

```tsx

import { useList } from "@pankod/refine";
import { useLoaderData } from "@remix-run/react";

import { dataProvider } from "src/providers";

type IPost = {
    id: number;
    title: string;
    description: string;
}

export async function loader() {
    const { data } = await dataProvider.getList<IPost>("posts", {
        pagination: {
            page: 1,
            perPage: 10,
        },
    });

    return json(data);
}

export default function Posts() {
    const initialPosts = useLoaderData<typeof loader>();

    const { tableQueryResult: { data } } = useTable<IPost>({
        queryOptions: {
            initialData: initialPosts,
        }
    });

    return (
        <>
            {/* ... */}
        </>
    );
}
```

## Example

<CodeSandboxExample path="with-remix-antd" />

[routerprovider]: /api-reference/core/providers/router-provider.md