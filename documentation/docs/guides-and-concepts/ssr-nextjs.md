---
id: ssr-nextjs
title: SSR-Next.js
---

**refine** can be used with [**Next.js**][Nextjs] to SSR your pages. It doesn't get in the way and follows Next.js conventions and also provides helper modules when necessary.


## Setup

[**nextjs-router**][NextjsRouter] package provided by **refine** must be used for the [`routerProvider`][routerProvider]

```bash
npm i @pankod/refine-nextjs-router
```

:::tip
We recommend [**superplate**][supeprlate] to initialize your refine projects. It configures the project according to your needs including SSR with Next.js.
:::

## Usage

[`<Refine>`][refine] must wrap your pages in a [custom App][NextjsCustomApp] component. This way your [pages][NextjsPages] are integrated to refine.

```tsx twoslash title="pages/_app.tsx" {10-15}
import { AppProps } from "next/app";

import { Refine } from "@pankod/refine";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-nextjs-router";

const API_URL = "https://api.fake-rest.refine.dev";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider(API_URL)}
        >
            <Component {...pageProps} />
        </Refine>
    );
}

export default MyApp;
```

## Custom Page

Let's say we want to show a list of users in `/users`. After creating `users.tsx` under `pages` in your Nextjs app, we can use the `useTable` hook to list the users in a table:

```tsx twoslash title="pages/users.tsx" {9-24}
import {
    useTable,
    List,
    Table,
    LayoutWrapper,
} from "@pankod/refine";

const API_URL = "https://api.fake-rest.refine.dev";

export const UserList: React.FC = () => {
    const { tableProps } = useTable<IPost>({
        resource: "users"
    });

    return (
        <LayoutWrapper>
            <List title="Users">
                <Table {...tableProps} rowKey="id">
                    <Table.Column dataIndex="id" title="ID" sorter />
                    <Table.Column dataIndex="firstName" title="Name" />
                </Table>
            </List>
        </LayoutWrapper>
    );
};

interface IPost {
    id: string;
    firstName: string;
}

export default UserList;
```

:::important
Notice how we passed `resource` prop to [`useTable`][useTable]. This is necessary since for `useTable` to be able get `resource` name from route it needs to be a route parameter in a dynamic route. [Refer here](#standart-crud-page) where standart CRUD pages can be built with dynamic routing.
:::

:::important
We also used `<LayoutWrapper>` to show the page in the layout provided to [`<Refine>`][refine]. This is deliberately opt-in to provide flexibility. [If you're building a standart CRUD page layout can be baked in automatically](#standart-crud-page).
:::

### SSR

**refine** uses [react-query][ReactQuery] in its hooks for data management. [Following react-query's guide][ReactQuerySSR], SSR can be achieved like this:

```tsx twoslash {0, 7, 12-14, 17-19, 34-42 } title="pages/users.tsx"
import { GetServerSideProps } from "next";
import dataProvider from "@pankod/refine-simple-rest";
import {
    useTable,
    List,
    Table,
    LayoutWrapper,
    GetListResponse,
} from "@pankod/refine";

const API_URL = "https://api.fake-rest.refine.dev";

export const UserList: React.FC<{ users: GetListResponse<IPost> }> = ({
    users
}) => {
    const { tableProps } = useTable<IPost>({
        resource: "users",
        queryOptions: {
            initialData: users,
        },
    });

    return (
        <LayoutWrapper>
            <List title="Users">
                <Table {...tableProps} rowKey="id">
                    <Table.Column dataIndex="id" title="ID" sorter />
                    <Table.Column dataIndex="firstName" title="Name" />
                </Table>
            </List>
        </LayoutWrapper>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const data = await dataProvider(API_URL).getList({
        resource: "users",
    });

    return {
        props: { users: data },
    };
};

interface IPost {
    id: string;
    firstName: string;
}

export default UserList;
```

We use the [`getList`][getList] method from our [`dataProvider`][dataProvider] to fetch `users` data and pass through `props` as conventionally done in Next.js. Then `users` data is available in the props of our `/users` page. [`useTable`][useTable] can take options for underlying react-query queries with `queryOptions`. Passing `users` data to its `initialData` loads the data on server side.

:::tip
We used `getList` from `dataProvider` but data can be fetched in any way you desire.
:::

## Standart CRUD Page

**nextjs-router** package provides `NextRouteComponent` for pages with the dynamic route `/[resource]/[action]/[id]` and root `/`. Simply export the component from the page.

```tsx twoslash title="pages/[resource]/index.tsx"
export { NextRouteComponent as default } from "@pankod/refine-nextjs-router";
```

`NextRouteComponent` can be used in the following pages
- `pages/[resource].tsx`
- `pages/[resource]/[action].tsx`
- `pages/[resource]/[action]/[id].tsx`
- `pages/index.tsx`

`NextRouteComponent` will use route parameters `resource` and `action` and render the associated component defined in [`resources`][refine].

- `list` component will be rendered for `/[resource]` route
- `create`, `edit` and `show` will be rendered for `/[resource]/[action]` and `/[resource]/[action]/[id]` routes
- For the root `/` route, it will render `DashboardPage` if it's defined and if not will navigate to the first resource in `resources`.

:::important
`NextRouteComponent` will wrap the page with `Layout` provided to [`<Refine>`][refine]
:::

### SSR

`NextRouteComponent` accepts a `pageData` prop for SSR data.

```ts
type NextRouteComponentProps = {
    pageData?: {
        list?: any;
        create?: any;
        edit?: any;
        show?: any;
    };
};
```
`pageData` must be passed as props from `getServerSideProps`. Data for every type of page must be passed with their respective fields in `pageData`. `NextRouteComponent` will pass this data as `initialData` to the components to be used for that page.

For example, since `list` component will be rendered for `/[resource]`, the page can use SSR like this:

```tsx twoslash title="pages/[resource]/index.tsx"
export { NextRouteComponent as default } from "@pankod/refine-nextjs-router";
import dataProvider from "@pankod/refine-simple-rest";

import { GetServerSideProps } from "next";

const API_URL = "https://api.fake-rest.refine.dev";

export const getServerSideProps: GetServerSideProps = async (context) => {

    const { query } = context;

    const data = await dataProvider(API_URL).getList({
        resource: query["resource"] as string,
    });

    return {
        props: {
            pageData: {
                list: data,
            },
        },
    };
};

```

And in the `list` component for a `resource` e.g. "posts":

```tsx title="src/components/posts/list.tsx" {10, 12-13}
import {
    useTable,
    List,
    Table,
    GetListResponse,
} from "@pankod/refine";
import type { IResourceComponentsProps } from "@pankod/refine";

export const PostList: React.FC<
    IResourceComponentsProps<GetListResponse<IPost>>
> = ({ initialData }) => {
    const { tableProps } = useTable<IPost>({
        queryOptions: {
            initialData,
        },
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column dataIndex="status" title="Status" />
            </Table>
        </List>
    );
};

interface IPost {
    id: string;
    firstName: string;
}
```

## Server Side Authentication

**nextjs-router** package provides `checkAuthentication` to easily handle server side authentication.

```tsx twoslash title="pages/[resource]/index.tsx" {1, 9-12, 13-15}
const authProvider = {
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    checkError: () => Promise.resolve(),
    checkAuth: () => Promise.resolve(),
    getPermissions: () => Promise.resolve(["admin"]),
    getUserIdentity: () => Promise.resolve(),
}

// ---cut---
export { NextRouteComponent as default } from "@pankod/refine-nextjs-router";
import { checkAuthentication } from "@pankod/refine-nextjs-router";
 
import { GetServerSideProps } from "next";
 
const API_URL = "https://api.fake-rest.refine.dev";
 
export const getServerSideProps: GetServerSideProps = async (context) => {
 
    const { isAuthenticated, redirect } = await checkAuthentication(
        authProvider,
        context,
    );

    if (!isAuthenticated) {
        return { redirect };
    }
 
    return {
        props: { },
    };
};
```

`checkAuthentication` expects your `authProvider` and **getServerSideProps**'s `context`. It uses the `checkAuth` from the `authProvider` to check for authentication and returns `isAuthenticated` accordingly. It also returns a `redirect` object to handle unauthenticated case. It redirects to `/login` while keeping the original route to be navigated to after succesful login.

## `syncWithLocation` and Query Parameters in SSR

If `syncWithLocation` is enabled, query parameters must be handled while doing SSR.

```tsx twoslash title="pages/users.tsx" {1, 8-14, 17-23}
import { GetServerSideProps } from "next";
import { parseTableParams } from "@pankod/refine";
import dataProvider from "@pankod/refine-simple-rest";

const API_URL = "https://api.fake-rest.refine.dev";

export const getServerSideProps: GetServerSideProps = async (context) => {

    const { resolvedUrl } = context;
    const index = resolvedUrl.indexOf("?");
    const search = resolvedUrl.slice(index);

    const { parsedCurrent, parsedPageSize, parsedSorter, parsedFilters } =
        parseTableParams(search);

    const data = await dataProvider(API_URL).getList({
        resource: "users",
        filters: parsedFilters,
        pagination: {
            current: parsedCurrent || 1,
            pageSize: parsedPageSize || 10,
        },
        sort: parsedSorter,
    });

    return {
        props: { users: data },
    };
};

```

`parseTableParams` parses the query string and returns query parameters([refer here for their interfaces][interfaces]). They can be directly used for `dataProvider` methods that accepts them.

## Live Codesandbox Example

<iframe src="https://codesandbox.io/embed/refine-next-seneo?autoresize=1&fontsize=14&hidenavigation=1&module=%2Fpages%2F_app.tsx&theme=dark&view=preview"
         style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
     title="refine-next"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

[Nextjs]: https://nextjs.org/docs/getting-started
[NextjsRouter]: https://www.npmjs.com/package/@pankod/refine-nextjs-router
[routerProvider]: /getting-started/overview.md
[supeprlate]: https://github.com/pankod/superplate
[NextjsCustomApp]: https://nextjs.org/docs/advanced-features/custom-app
[refine]: /api-references/components/refine-config.md
[NextjsPages]: https://nextjs.org/docs/basic-features/pages
[useTable]: /api-references/hooks/table/useTable.md
[ReactQuerySSR]: https://react-query.tanstack.com/guides/ssr#using-initialdata
[ReactQuery]: https://react-query.tanstack.com/
[getList]: /api-references/providers/data-provider.md#getlist
[dataProvider]: /api-references/providers/data-provider.md
[useTable]: /api-references/hooks/table/useTable.md
[interfaces]: /api-references/interfaces.md/#crudfilters