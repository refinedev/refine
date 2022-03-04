---
id: ssr-nextjs
title: SSR-Next.js
---

**refine** can be used with [**Next.js**][Nextjs] to SSR your pages. It doesn't get in the way and follows Next.js conventions and also provides helper modules when necessary.


## Setup

[**nextjs-router**][NextjsRouter] package provided by **refine** must be used for the [`routerProvider`][routerProvider]

```bash
npm i @pankod/refine-core @pankod/refine-antd @pankod/refine-nextjs-router
```

:::tip
We recommend [**superplate**][superplate] to initialize your refine projects. It configures the project according to your needs including SSR with Next.js.
:::

:::caution
To make this example more visual, we used the [`@pankod/refine-antd`](https://github.com/pankod/refine/tree/master/packages/refine-antd) package. If you are using Refine headless, you need to provide the components, hooks or helpers imported from the [`@pankod/refine-antd`](https://github.com/pankod/refine/tree/master/packages/refine-antd) package.
:::

## Usage

[`<Refine>`][refine] must wrap your pages in a [custom App][NextjsCustomApp] component. This way your [pages][NextjsPages] are integrated to refine.

```tsx title="pages/_app.tsx"
import { AppProps } from "next/app";

import { Refine } from "@pankod/refine-core";
import { Layout, ReadyPage, notificationProvider, ErrorComponent } from "@pankod/refine-antd";

import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-nextjs-router";

const API_URL = "https://api.fake-rest.refine.dev";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        // highlight-start
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider(API_URL)}
            Layout={Layout}
            ReadyPage={ReadyPage}
            notificationProvider={notificationProvider}
            catchAll={<ErrorComponent />}
        >
            <Component {...pageProps} />
        </Refine>
        // highlight-end
    );
}

export default MyApp;
```

## Custom Page

Let's say we want to show a list of users in `/users`. After creating `users.tsx` under `pages` in your Nextjs app, we can use the `useTable` hook to list the users in a table:

```tsx title="pages/users.tsx"
import { LayoutWrapper } from "@pankod/refine-core";
import {
    useTable,
    List,
    Table,
} from "@pankod/refine-antd";

const API_URL = "https://api.fake-rest.refine.dev";
// highlight-start
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
// highlight-end
interface IPost {
    id: string;
    firstName: string;
}

export default UserList;
```

:::important
Notice how we passed `resource` prop to [`useTable`][useTable]. This is necessary since for `useTable` to be able to get `resource` name from route, it needs to be a route parameter in a dynamic route. [Refer here](#standard-crud-page) where standard CRUD pages can be built with dynamic routing.
:::

:::important
We also used `<LayoutWrapper>` to show the page in the layout provided to [`<Refine>`][refine]. This is deliberately opt-in to provide flexibility. [If you're building a standard CRUD page layout can be baked in automatically](#standart-crud-page).
:::

### SSR

**refine** uses [react-query][ReactQuery] in its hooks for data management. [Following react-query's guide][ReactQuerySSR], SSR can be achieved like this:

```tsx title="pages/users.tsx"
// highlight-next-line
import { GetServerSideProps } from "next";
import dataProvider from "@pankod/refine-simple-rest";
import {
    LayoutWrapper,
// highlight-next-line
    GetListResponse,
} from "@pankod/refine-core";
import {
    useTable,
    List,
    Table,
} from "@pankod/refine-antd";

const API_URL = "https://api.fake-rest.refine.dev";
// highlight-start
export const UserList: React.FC<{ users: GetListResponse<IPost> }> = ({
    users
}) => {
// highlight-end
    const { tableProps } = useTable<IPost>({
        resource: "users",
// highlight-start
        queryOptions: {
            initialData: users,
        },
// highlight-end
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

// highlight-start
export const getServerSideProps: GetServerSideProps = async (context) => {
    const data = await dataProvider(API_URL).getList({
        resource: "users",
    });

    return {
        props: { users: data },
    };
};
// highlight-end

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

## Standard CRUD Page

**nextjs-router** package provides `NextRouteComponent` for pages with the dynamic route `/[resource]/[action]/[id]` and root `/`. Simply export the component from the page and add a [data fetching function][dataFetching]

```tsx title="pages/[resource]/index.tsx"
export { NextRouteComponent as default } from "@pankod/refine-nextjs-router";

export const getServerSideProps: GetServerSideProps = async () => {
    return { props: {} };
};
```

:::warning
`NextRouteComponent` doesn't support [automatic static optimization][autoStaticOpt] currently, since it requires route parameters thus a data fetching function must be defined.
:::

`NextRouteComponent` can be used in the following pages:
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

`NextRouteComponent` accepts a `initialData` prop for SSR data.

```ts
type NextRouteComponentProps = {
    initialData?: any;
};
```
`initialData` must be passed as props from `getServerSideProps`. `NextRouteComponent` will pass this data as `initialData` to the `list`, `create`, `edit` and `show` components.

For example, for a `list` component that will be rendered for `/[resource]`, the page can use SSR like this:

```tsx title="pages/[resource]/index.tsx"
export { NextRouteComponent as default } from "@pankod/refine-nextjs-router";
import dataProvider from "@pankod/refine-simple-rest";

import { GetServerSideProps } from "next";

const API_URL = "https://api.fake-rest.refine.dev";

export const getServerSideProps: GetServerSideProps = async (context) => {

    const { query } = context;

   try {
        const data = await dataProvider(API_URL).getList({
            resource: query["resource"] as string,
        });

        return {
            props: {
                initialData: data,
            },
        };
    } catch (error) {
        return { props: {} };
    }
};

```

And in the `list` component for a `resource` e.g. "posts":

```tsx title="src/components/posts/list.tsx"
import { GetListResponse, IResourceComponentsProps } from "@pankod/refine-core";
import {
    useTable,
    List,
    Table,
} from "@pankod/refine-antd";

export const PostList: React.FC<
    IResourceComponentsProps<GetListResponse<IPost>>
// highlight-next-line
> = ({ initialData }) => {
    const { tableProps } = useTable<IPost>({
        // highlight-start
        queryOptions: {
            initialData,
        },
        // highlight-end
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

```tsx title="pages/[resource]/index.tsx"
export { NextRouteComponent as default } from "@pankod/refine-nextjs-router";
// highlight-next-line
import { checkAuthentication } from "@pankod/refine-nextjs-router";
 
import { GetServerSideProps } from "next";

import {authProvider} from "../../src/authProvider";
 
const API_URL = "https://api.fake-rest.refine.dev";
 
export const getServerSideProps: GetServerSideProps = async (context) => {
 
    // highlight-start
    const { isAuthenticated, ...props } = await checkAuthentication(
        authProvider,
        context,
    );

    if (!isAuthenticated) {
        return props;
    }
    // highlight-end
 
    return {
        props: {},
    };
};
```

`checkAuthentication` expects your `authProvider` and **getServerSideProps**'s `context`. It uses the `checkAuth` from the `authProvider` to check for authentication and returns `isAuthenticated` accordingly. It also returns a `redirect` object to handle unauthenticated case. It redirects to `/login` while keeping the original route to be navigated to after successful login.

## `syncWithLocation` and Query Parameters in SSR

If `syncWithLocation` is enabled, query parameters must be handled while doing SSR.

```tsx title="pages/users.tsx"
import { GetServerSideProps } from "next";
// highlight-next-line
import { parseTableParamsFromQuery } from "@pankod/refine-core";
import dataProvider from "@pankod/refine-simple-rest";

const API_URL = "https://api.fake-rest.refine.dev";

export const getServerSideProps: GetServerSideProps = async (context) => {

    // highlight-start
    const { parsedCurrent, parsedPageSize, parsedSorter, parsedFilters } =
        parseTableParamsFromQuery(context.query);
    // highlight-end
    const data = await dataProvider(API_URL).getList({
        resource: "users",
        // highlight-start
        filters: parsedFilters,
        pagination: {
            current: parsedCurrent || 1,
            pageSize: parsedPageSize || 10,
        },
        sort: parsedSorter,
        // highlight-end
    });

    return {
        props: { users: data },
    };
};

```

`parseTableParams` parses the query string and returns query parameters([refer here for their interfaces][interfaces]). They can be directly used for `dataProvider` methods that accepts them.

## Live Codesandbox Example

<iframe src="https://codesandbox.io/embed/refine-next-3x3zp?autoresize=1&fontsize=14&module=%2Fpages%2F_app.tsx&theme=dark&view=preview"
    style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
    title="refine-next"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

[Nextjs]: https://nextjs.org/docs/getting-started
[NextjsRouter]: https://www.npmjs.com/package/@pankod/refine-nextjs-router
[routerProvider]: /core/providers/router-provider.md
[superplate]: https://github.com/pankod/superplate
[NextjsCustomApp]: https://nextjs.org/docs/advanced-features/custom-app
[refine]: /core/components/refine-config.md
[NextjsPages]: https://nextjs.org/docs/basic-features/pages
[useTable]: /core/hooks/useTable.md
[ReactQuerySSR]: https://react-query.tanstack.com/guides/ssr#using-initialdata
[ReactQuery]: https://react-query.tanstack.com/
[getList]: /core/providers/data-provider.md#getlist
[dataProvider]: /core/providers/data-provider.md
[useTable]: /core/hooks/useTable.md
[interfaces]: /core/interfaces.md/#crudfilters
[autoStaticOpt]: https://nextjs.org/docs/advanced-features/automatic-static-optimization
[dataFetching]: https://nextjs.org/docs/basic-features/data-fetching
