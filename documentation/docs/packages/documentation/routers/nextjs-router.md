---
id: nextjs
title: Next.js
---

**refine** provides router bindings and utilities for [Next.js](https://nextjs.org/). This package will provide easy integration between **refine** and **Next.js** for both existing projects and new projects without giving up the benefits of **Next.js**.

```bash
npm i @refinedev/nextjs-router
```

:::tip

We recommend using `create refine-app` to initialize your refine projects. It configures the project according to your needs including SSR with Next.js!

```sh
npm create refine-app@latest -- -o refine-nextjs my-refine-nextjs-app
```

:::

[Refer to the Router Provider documentation for detailed information. &#8594][routerprovider]

:::note Legacy Router

`@refinedev/nextjs-router` also exports the legacy router provider and it will be available until the next major version of **refine**. It is recommended to use the new router provider instead of the legacy one.

If you are using the legacy router provider, it can be imported from `@refinedev/nextjs-router/legacy` for the `/pages` directory and `@refinedev/nextjs-router/legacy-app` for the `/app` directory and passed to the `legacyRouterProvider` prop of the `Refine` component.

:::

## Basic Usage

### `/pages` Directory

We'll use the `routerProvider` from `@refinedev/nextjs-router` to set up the router bindings for **refine**. We'll define the action routes for our resources in the `resources` array and define our pages in the `pages` directory.

We'll create four pages for our resources:

-   `pages/posts/index.tsx` - List page for posts
-   `pages/posts/show/[id].tsx` - Detail page for posts
-   `pages/categories/index.tsx` - List page for categories
-   `pages/categories/show/[id].tsx` - Detail page for categories

And we'll create one page for the index route and use it to redirect to the `posts` resource:

-   `pages/index.tsx` - Index page

Let's start with the initialization of the **refine** app in the `_app.tsx` file:

```tsx title=_app.tsx
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/nextjs-router";

import { Layout } from "components/Layout";

function App({ Component, pageProps }: AppProps): JSX.Element {
    return (
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
                },
            ]}
        >
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Refine>
    );
}
```

:::tip

Next.js uses the bracket syntax (`[param]`) for dynamic routes but **refine** uses the colon syntax (`:param`) for route parameters. This won't cause any problems since **refine** only uses the colon syntax as an indicator for route parameters and the communication between **refine** and the router is handled by the `routerProvider` prop.

:::

:::note Additional Parameters and Nesting

Your action definitions in the resources can contain additional parameters and nested routes. Passing these parameters when navigating to the pages are handled by the current available parameters and the `meta` props of the related hooks and components.

**refine** supports route parameters defined with `:param` syntax. You can use these parameters in your action definitions and create your routes accordingly. For example, if you have a `posts` resource and you want to create a route for the `show` action of a specific post, you can define the `show` action as `/posts/show/:id` and use the `id` parameter in your component.

:::

Now we can create our pages in the `pages` directory:

```tsx title=pages/posts/index.tsx
import { useTable } from "@refinedev/core";
import Link from "next/link";

type IPost = {
    id: string;
    title: string;
    description: string;
};

export default function PostList() {
    // `posts` resource will be inferred from the route.
    // Because we've defined `/posts` as the `list` action of the `posts` resource.
    const {
        tableQueryResult: { data, isLoading },
    } = useTable<IPost>();

    const tableData = data?.data;

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {!isLoading && (
                <ul>
                    {tableData?.map((post) => (
                        <li key={post.id}>
                            <Link href={`/posts/show/${post.id}`}>
                                {post.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
```

```tsx title=pages/posts/show/[id].tsx
import { useShow } from "@refinedev/core";

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

```tsx title=pages/categories/index.tsx
import { useTable } from "@refinedev/core";
import Link from "next/link";

type ICategory = {
    id: string;
    label: string;
};

export default function CategoryList() {
    // `categories` resource will be inferred from the route.
    // Because we've defined `/categories` as the `list` action of the `categories` resource.
    const {
        tableQueryResult: { data, isLoading },
    } = useTable<ICategory>();

    const tableData = data?.data;

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {!isLoading && (
                <ul>
                    {tableData?.map((category) => (
                        <li key={category.id}>
                            <Link href={`/categories/show/${category.id}`}>
                                {category.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
```

```tsx title=pages/categories/show/[id].tsx
import { useShow } from "@refinedev/core";

type ICategory = {
    id: string;
    label: string;
};

export default function CategoryShow() {
    // `categories` resource and the `id` will be inferred from the route.
    // Because we've defined `/categories/show/:id` as the `show` action of the `categories` resource.
    const {
        queryResult: { data, isLoading },
    } = useShow<ICategory>();

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

Even though we're using the `NavigateToResource` component, when using Next.js it's better to handle such redirect operations in the server side rather than the client side. You can use the `getServerSideProps` function to redirect the user to the `/posts`.

:::

```tsx title=pages/index.tsx
import { NavigateToResource } from "@refinedev/nextjs-router";

export default function Home() {
    return <NavigateToResource />;
}
```

### `/app` Directory

We'll use the `routerProvider` from `@refinedev/nextjs-router/app` to set up the router bindings for **refine**. We'll define the action routes for our resources in the `resources` array and define our pages in the `app` directory.

We'll create four routes for our resources:

-   `app/posts/page.tsx` - List page for posts
-   `app/posts/show/[id]/page.tsx` - Detail page for posts
-   `app/categories/page.tsx` - List page for categories
-   `app/categories/show/[id]/page.tsx` - Detail page for categories

And we'll create one route for the index and use it to redirect to the `posts` resource:

-   `app/page.tsx` - Index page

Let's start with the initialization of the **refine** app in the `app/layout.tsx` file:

```tsx title=app/layout.tsx
"use client";

import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/nextjs-router/app";

import { Layout } from "components/Layout";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <Refine
                    dataProvider={dataProvider(
                        "https://api.fake-rest.refine.dev",
                    )}
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
                        },
                    ]}
                >
                    {/* We're defining `Layout` here but you might want to have different layouts per your page. */}
                    {/* This is totally fine for refine, you can place your Layout wherever you like. */}
                    <Layout>{children}</Layout>
                </Refine>
            </body>
        </html>
    );
}
```

:::tip

Next.js uses the bracket syntax (`[param]`) for dynamic routes but **refine** uses the colon syntax (`:param`) for route parameters. This won't cause any problems since **refine** only uses the colon syntax as an indicator for route parameters and the communication between **refine** and the router is handled by the `routerProvider` prop.

:::

:::note Additional Parameters and Nesting

Your action definitions in the resources can contain additional parameters and nested routes. Passing these parameters when navigating to the pages are handled by the current available parameters and the `meta` props of the related hooks and components.

**refine** supports route parameters defined with `:param` syntax. You can use these parameters in your action definitions and create your routes accordingly. For example, if you have a `posts` resource and you want to create a route for the `show` action of a specific post, you can define the `show` action as `/posts/show/:id` and use the `id` parameter in your component.

:::

Now we can create our pages in the `app` directory:

```tsx title=app/posts/page.tsx
"use client";

import { useTable } from "@refinedev/core";
import Link from "next/link";

type IPost = {
    id: string;
    title: string;
    description: string;
};

export default function PostList() {
    // `posts` resource will be inferred from the route.
    // Because we've defined `/posts` as the `list` action of the `posts` resource.
    const {
        tableQueryResult: { data, isLoading },
    } = useTable<IPost>();

    const tableData = data?.data;

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {!isLoading && (
                <ul>
                    {tableData?.map((post) => (
                        <li key={post.id}>
                            <Link href={`/posts/show/${post.id}`}>
                                {post.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
```

```tsx title=pages/posts/show/[id]/page.tsx
"use client";

import { useShow } from "@refinedev/core";

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

```tsx title=pages/categories/page.tsx
"use client";

import { useTable } from "@refinedev/core";
import Link from "next/link";

type ICategory = {
    id: string;
    label: string;
};

export default function CategoryList() {
    // `categories` resource will be inferred from the route.
    // Because we've defined `/categories` as the `list` action of the `categories` resource.
    const {
        tableQueryResult: { data, isLoading },
    } = useTable<ICategory>();

    const tableData = data?.data;

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {!isLoading && (
                <ul>
                    {tableData?.map((category) => (
                        <li key={category.id}>
                            <Link href={`/categories/show/${category.id}`}>
                                {category.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
```

```tsx title=pages/categories/show/[id]/page.tsx
"use client";

import { useShow } from "@refinedev/core";

type ICategory = {
    id: string;
    label: string;
};

export default function CategoryShow() {
    // `categories` resource and the `id` will be inferred from the route.
    // Because we've defined `/categories/show/:id` as the `show` action of the `categories` resource.
    const {
        queryResult: { data, isLoading },
    } = useShow<ICategory>();

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

Even though we're using the `NavigateToResource` component, when using Next.js it's better to handle such redirect operations in the server side rather than the client side. You can use the `getServerSideProps` function to redirect the user to the `/posts`.

:::

```tsx title=app/page.tsx
import { NavigateToResource } from "@refinedev/nextjs-router/app";

export default function IndexPage() {
    return <NavigateToResource />;
}
```

## Additional Components

`@refinedev/nextjs-router` package also includes some additional components that can be useful in some cases.

### `NavigateToResource`

A basic component to navigate to a resource page. It is useful when you want to navigate to a resource page at the index route of your app.

#### In `pages/index.tsx`

```tsx title=pages/index.tsx
import { NavigateToResource } from "@refinedev/nextjs-router";

export default function IndexPage() {
    return <NavigateToResource />;
}
```

#### In `app/page.tsx`

```tsx title=app/page.tsx
"use client";

import { NavigateToResource } from "@refinedev/nextjs-router/app";

export default function IndexPage() {
    return <NavigateToResource />;
}
```

#### Properties

`resource` (optional) - The name of the resource to navigate to. It will redirect to the first `list` route in the `resources` array if not provided.

`meta` (optional) - The meta object to use if the route has parameters in it. The parameters in the current location will also be used to compose the route but `meta` will take precedence.

### `UnsavedChangesNotifier`

This component enables the `warnWhenUnsavedChanges` feature of **refine**. It will show a warning message when user tries to navigate away from the current page without saving the changes. Also checks for `beforeunload` event to warn the user when they try to close the browser tab or window.

Place this component inside the `<Refine>` components children to enable this feature.

```tsx title=_app.tsx
import { Refine } from "@refinedev/core";
import { UnsavedChangesNotifier } from "@refinedev/nextjs-router";

function App({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <Refine
        /* ... */
        >
            <Component {...pageProps} />
            {/* highlight-next-line */}
            <UnsavedChangesNotifier />
        </Refine>
    );
}
```

:::info
This feature is not working in experimental `appDir` mode in Next.js due to limitations of the `next/navigation` and missing events.
:::

#### Properties

`translationKey` (optional) - The translation key for the warning message. Default value is `warnWhenUnsavedChanges`. Useful when you use an i18n provider.

`message` (optional) - The warning message. Default value is `Are you sure you want to leave? You have unsaved changes.` Useful when you don't use an i18n provider.

### `parseTableParams`

This function can be used to parse the query parameters of a table page. It can be useful when you want to use the query parameters in your server side functions (`loader`) to fetch the data such as [persisting the table state](#how-to-persist-syncwithlocation-in-ssr)

## Authentication

In Next.js you can achieve authentication control in multiple ways;

On the client-side, you can wrap your pages with [`Authenticated`](/docs/api-reference/core/components/auth/authenticated/) component from `@refinedev/core` to protect your pages from unauthenticated access.

On the server-side, you can use your `authProvider`'s `check` function inside server side functions (`getServerSideProps`) to redirect unauthenticated users to other pages like login...

:::info
For page level authentication, server-side approach is recommended.
:::

### Server Side

First, let's install the `nookies` packages in our project.

```sh
npm i nookies
```

We will set/destroy cookies in the `login`, `logout` and `check` functions of our `AuthProvider`.

```tsx title="app/authProvider.ts"
import { AuthBindings } from "@refinedev/core";
// highlight-start
import nookies from "nookies";
// highlight-end

const mockUsers = [
    {
        username: "admin",
        roles: ["admin"],
    },
    {
        username: "editor",
        roles: ["editor"],
    },
];

// highlight-next-line
const COOKIE_NAME = "user";

export const authProvider: AuthBindings = {
    login: ({ username, password, remember }) => {
        // Suppose we actually send a request to the back end here.
        const user = mockUsers.find((item) => item.username === username);

        if (user) {
            // highlight-start
            nookies.set(null, COOKIE_NAME, JSON.stringify(user), {
                maxAge: remember ? 30 * 24 * 60 * 60 : undefined,
            });
            // highlight-end

            return {
                success: true,
            };
        }

        return {
            success: false,
        };
    },
    logout: () => {
        // highlight-next-line
        nookies.destroy(null, COOKIE_NAME);

        return {
            success: true,
            redirectTo: "/login",
        };
    },
    onError: (error) => {
        if (error && error.statusCode === 401) {
            return {
                error: new Error("Unauthorized"),
                logout: true,
                redirectTo: "/login",
            };
        }

        return {};
    },
    check: async (context) => {
        // highlight-start
        let user = undefined;
        if (context) {
            // for SSR
            const cookies = nookies.get(context);
            user = cookies[COOKIE_NAME];
        } else {
            // for CSR
            const cookies = nookies.get(null);
            user = cookies[COOKIE_NAME];
        }
        // highlight-end

        if (!user) {
            return {
                authenticated: false,
                error: {
                    message: "Check failed",
                    name: "Unauthorized",
                },
                logout: true,
                redirectTo: "/login",
            };
        }

        return {
            authenticated: true,
        };
    },
    getPermissions: async () => {
        return null;
    },
    getIdentity: async () => {
        return null;
    },
};
```

Tadaa! that's all! 🎉

Now, we can check the authentication in loaders of our routes.

```tsx title="pages/posts/index.tsx"
import { authProvider } from "src/authProvider";

export const getServerSideProps = async (context) => {
    // We've handled the SSR case in our `check` function by sending the `context` as parameter.
    const { authenticated, redirectTo } = await authProvider.check(context);

    if (!authenticated) {
        context.res.statusCode = 401;
        context.res.end();
    }

    if (!authenticated && redirectTo) {
        return {
            redirect: {
                destination: redirectTo,
                permanent: false,
            },
        };
    }

    return {
        props: {
            authenticated,
        },
    };
};
```

This needs to be done for all the routes that we want to protect.

## Access Control

In Next.js you can achieve access control in multiple ways;

On the client-side you can wrap your pages with `CanAccess` component from `@refinedev/core` to protect your pages from unauthorized access.

And on the server-side you can use your `accessControlProvider`'s `can` function inside server side functions (`getServerSideProps`) to redirect unauthorized users to other pages..

:::info

For page level access control, server-side approach is recommended.

:::

### Server Side

On the server side, you can use your `accessControlProvider`'s `can` function inside `getServerSideProps` to redirect unauthorized users to other pages.

First, let's build our [AccessControlProvider](/docs/api-reference/core/providers/accessControl-provider.md)

```tsx title="app/acccessControlProvider.ts"
export const accessControlProvider = {
    can: async ({ resource, action, params }) => {
        if (resource === "posts" && action === "edit") {
            return {
                can: false,
                reason: "Unauthorized",
            };
        }

        return { can: true };
    },
};
```

:::tip

You can also access resource object directly.

:::

```tsx
export const accessControlProvider = {
    can: async ({ resource, action, params }) => {
        const resourceName = params?.resource?.name;
        const anyUsefulMeta = params?.resource?.meta?.yourUsefulMeta;

        if (
            resourceName === "posts" &&
            anyUsefulMeta === true &&
            action === "edit"
        ) {
            return {
                can: false,
                reason: "Unauthorized",
            };
        }
    },
};
```

Then, let's create our posts page.

```tsx title="pages/posts/index.tsx"
import { accessControlProvider } from "src/accessControlProvider";

export const getServerSideProps = async (context) => {
    const { can } = await accessControlProvider.can({
        resource: "posts",
        action: "list",
    });

    if (!can) {
        context.res.statusCode = 403;
        context.res.end();
    }

    return {
        props: {
            can,
        },
    };
};

export default function PostList() {
    /* ... */
}
```

### Client Side

For client-side, you can wrap your pages with [`CanAccess`](/docs/api-reference/core/components/accessControl/can-access) component from `@refinedev/core` to protect your pages from unauthorized access.

```tsx
import { CanAccess } from "@refinedev/core";

export const MyPage = () => (
    <CanAccess>
        <div>{/* ... */}</div>
    </CanAccess>
);
```

## FAQ

### Can I use nested routes?

Yes, you can use nested routes in your app. **refine** will match the routes depending on how you define the action paths in your resources. Additional parameters and nesting is supported. **refine** will not limit you and your router in route configuration, all you need to do is to pass the appropriate path to the related resource and the action in the `resources` array (This is also optional but recommended due to the features it provides).

You can use `:param` syntax to define parameters in your routes.

### How to make SSR work?

You can always use the methods provided from the `dataProvider` to fetch data in your pages. To do this, you can both use `getServerSideProps` or `getStaticProps` methods and pass the data to your page as a prop.

All you need to do is to pass the data as the `initialData` to your data hooks using the `queryOptions` prop.

```tsx
import { useList } from "@refinedev/core";

import { dataProvider } from "src/providers";

type IPost = {
    id: number;
    title: string;
    description: string;
};

export const getServerSideProps = async () => {
    const { data } = await dataProvider.getList<IPost>("posts", {
        pagination: {
            page: 1,
            perPage: 10,
        },
    });

    return {
        props: {
            posts: data,
        },
    };
};

export default function Posts({ posts }: { posts: GetListResponse<IPost> }) {
    const {
        tableQueryResult: { data },
    } = useTable<IPost>({
        queryOptions: {
            initialData: posts,
        },
    });

    return <>{/* ... */}</>;
}
```

### How to persist `syncWithLocation` in SSR?

If `syncWithLocation` is enabled, query parameters must be handled while doing SSR.

```tsx
// highligt-next-line
import { parseTableParams } from "@refinedev/nextjs-router";
import dataProvider from "@refinedev/simple-rest";

const API_URL = "https://api.fake-rest.refine.dev";

export const getServerSideProps = ({ params, resolvedUrl }) => {
    const { resource } = params;

    // highligt-next-line
    const tableParams = parseTableParams(resolvedUrl?.split("?")[1] ?? "");

    try {
        const data = await dataProvider(API_URL).getList({
            resource: resource as string,
            ...tableParams, // this includes `filters`, `sorters` and `pagination`
        });

        return {
            props: {
                initialData: data,
            },
        };
    } catch (error) {
        return {
            props: {},
        };
    }
};
export default function MyListPage({ initialData }) {
    return <>{/* ... */}</>;
}
```

`parseTableParams` parses the query string and returns query parameters([refer here for their interfaces][interfaces]). They can be directly used for `dataProvider` methods that accept them.

### How to use multiple layouts?

When using `/pages` directory for your routes, you'll probably have a point where you need to use multiple layouts. For example, you may want to use a different layout for the login page. To achieve this, you can either use your `Layout` wrappers in your pages or you can add extra properties to your page components to render the page with the specified layout.

Here's an example of how you can use additional properties to render different layouts.

```tsx title="pages/login.tsx"
export default function Login() {
    return (
        <div>
            <h1>Login</h1>
        </div>
    );
}

Login.layout = "auth";
```

```tsx title="pages/posts/index.tsx"
export default function Posts() {
    return <div>{/* ... */}</div>;
}

Posts.layout = "default";
```

```tsx title="pages/_app.tsx"
import { AuthLayout, DefaultLayout } from "src/layouts";

const Layouts = {
    auth: AuthLayout,
    default: DefaultLayout,
};

export default function MyApp({ Component, pageProps }) {
    const Layout = Layouts[Component.layout ?? "default"];

    return (
        <Refine
            {/* ... */}
        >
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Refine>
    );
}
```

To comply with TypeScript types, we'll need to extend the `NextPage` and `AppProps` types accordingly to expect the `layout` property in page components.

:::info Read more at Next.js Docs

You can find out more about this at [Next.js documentation for multiple layouts](https://nextjs.org/docs/basic-features/layouts#with-typescript)

:::

We'll define the types in `_app.tsx` file.

```tsx title="pages/_app.tsx"
import type { NextPage } from "next";
import type { AppProps } from "next/app";

export type PageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    layout?: keyof typeof Layouts;
};

type AppPropsWithLayout = AppProps & {
    Component: PageWithLayout;
};

// Then we'll change the type of `MyApp` components props to `AppPropsWithLayout`.
export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    /* ... */
}
```

Then in our pages, we can use the `PageWithLayout` type when defining our page components.

```tsx title="pages/login.tsx"
import type { PageWithLayout } from "pages/_app";

const Login: PageWithLayout = () => {
    return (
        <div>
            <h1>Login</h1>
        </div>
    );
};

Login.layout = "auth";
```

### Handling 404s

In the earlier versions of **refine**, if `authProvider` was defined, we've redirected the users to the `/login` route even with the 404s and 404 pages were only available to the authenticated users. Now, the routes are handled by the users, so you can handle the 404s however you like.

#### Using the Next.js's 404 page

If you want to use the Next.js's 404 page, you can create a `404.tsx` file in your `/pages` directory and it will be used as the 404 page. For more information, you can check the [Next.js documentation for custom 404 page](https://nextjs.org/docs/advanced-features/custom-error-page#404-page).

#### Using a catch-all route

If you want to achieve the legacy behavior or want to have more control over the unhandled routes, you can use the catch-all route. For more information, you can check the [Next.js documentation for catch-all route](https://nextjs.org/docs/routing/dynamic-routes#optional-catch-all-routes).

You can use **refine**'s authentication hooks and the `authProvider` to check if the user is authenticated or not and redirect them to the login page. This check can be done on the client-side or server-side.

**Client Side**

```tsx title="pages/[...slug].tsx"
import { Authenticated } from "@refinedev/core";

export default function CatchAll() {
    return (
        // This will redirect the user if they're not authenticated depending on the response of `authProvider.check`.
        <Authenticated>
            <div>This page is not found.</div>
        </Authenticated>
    );
}
```

**Server Side**

```tsx title="pages/[...slug].tsx"
import { authProvider } from "src/authProvider";

export const getServerSideProps = async (context) => {
    const { authenticated, redirectTo } = await authProvider.check(context);

    if (!authenticated && redirectTo) {
        return {
            redirect: {
                destination: redirectTo,
                permanent: false,
            },
            props: {},
        };
    }

    return {
        props: {},
    };
};

export default function CatchAll() {
    return <div>This page is not found.</div>;
}
```

### `RefineRoutes` Component

:::caution

While this may work for the simple cases, it is not recommended to use this component. Defining your routes separately will give you more control over your routes and will allow you to use the full potential of your router.

:::

This component can be used to render the matching route in your resources by using the `resources` prop. It will only take effect if the action properties in the resource definitions are assigned to components or objects with `component` property.

It will render the component for the matching route and pass it as a `JSX.Element` to the `children` function. You can use this to render your components in a single catch-all route. If there's no matching route `undefined` will be passed to the `children` function. In this case, you can render an error page or redirect the user to another page.

We'll define our resources in the `<Refine>` component:

```tsx
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
            },
        ]}
    >
        {/* ... */}
    </Refine>
);
```

Then, we'll create a catch-all route to render the matching route in our resources:

#### In `pages/[[...refine]].tsx`

```tsx title=pages/[[...refine]].tsx
import { RefineRoutes } from "@refinedev/nextjs-router";

import { ErrorPage } from "components/error";

export default function CatchAll() {
    return (
        <RefineRoutes>
            {(matchingRoute) => {
                if (matchingRoute) {
                    return { matchingRoute };
                }

                return <ErrorPage />;
            }}
        </RefineRoutes>
    );
}
```

#### In `app/[[...refine]]/page.tsx`

If you're using experimental `appDir` in your Next.js project, you can create a catch-all route in the `app` directory.

```tsx title=app/[[...refine]]/page.tsx
"use client";

import { RefineRoutes } from "@refinedev/nextjs-router/app";

export default function CatchAll() {
    return (
        <RefineRoutes>
            {(matchingRoute) => {
                if (matchingRoute) {
                    return { matchingRoute };
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

-   `list`: `/resources`
-   `create`: `/resources/create`
-   `edit`: `/resources/edit/:id`
-   `show`: `/resources/show/:id`
:::

## Example (`/pages`)

<CodeSandboxExample path="with-nextjs" />

## Example (`/app`)

<CodeSandboxExample path="with-nextjs-appdir" />

[routerprovider]: /api-reference/core/providers/router-provider.md
