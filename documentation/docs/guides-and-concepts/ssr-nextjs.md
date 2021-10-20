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

:::info
We recommend [**superplate**][supeprlate] to initialize your refine projects. It configures the project according to your needs including SSR with Next.js.
:::

## Usage

[`<Refine>`][Refine] must wrap your pages in a [custom App][NextjsCustomApp] component. This way your [pages][NextjsPages] are integrated to refine.

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
We also used `<LayoutWrapper>` to show the page in the layout provided to [`<Refine>`][Refine]. This is deliberately opt-in to provide flexibility. [If you're building a standart CRUD page layout can be baked in automatically](#standart-crud-page).
:::

### SSR Data

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

We use the [`getList`][getList] method from our [`dataProvider`][dataProvider] to fetch `users` data and pass through `props` as conventionally done in Next.js. Then `users` data is available in the props of our `/users` page. [`useTable`][useTable] can take options for underlying react-query queries with `queryOptions`, passing `users` data to its `initialData` loads the data on server side.

:::tip
We used `getList` from `dataProvider` but data can be fetched in any way you desire.
:::

## Standart CRUD Page

**nextjs-router** package provides `NextRouteComponent` for pages with the dynamic route `/[resource]/[action]/[id]` and root `/`.

```tsx twoslash title="pages/[resource]/index.tsx"
export { NextRouteComponent as default } from "@pankod/refine-nextjs-router";
```

:::important
`NextRouteComponent` can be used in the following pages with any combination of them:
- `pages/[resource].tsx`
- `pages/[resource]/[action].tsx`
- `pages/[resource]/[action]/[id].tsx`
- `pages/index.tsx`
:::

`NextRouteComponent` will use route parameters `resource` and `action` and render the associated component defined in [`resources`][Refine].

- `list` component will be rendered for `/[resource]` route
- `create`, `edit` and `show` will be rendered for `/[resource]/[action]` and `/[resource]/[action]/[id]` route
- For the root `/` route, it will render `DashboardPage` if it's defined and if not will navigate to the first resource in `resources`.

[Nextjs]: https://nextjs.org/docs/getting-started
[NextjsRouter]: https://www.npmjs.com/package/@pankod/refine-nextjs-router
[routerProvider]: /getting-started/overview.md
[supeprlate]: https://github.com/pankod/superplate
[NextjsCustomApp]: https://nextjs.org/docs/advanced-features/custom-app
[Refine]: /api-references/components/refine-config.md
[NextjsPages]: https://nextjs.org/docs/basic-features/pages
[useTable]: /api-references/hooks/table/useTable.md
[ReactQuerySSR]: https://react-query.tanstack.com/guides/ssr#using-initialdata
[ReactQuery]: https://react-query.tanstack.com/
[getList]: /api-references/providers/data-provider.md#getlist
[dataProvider]: /api-references/providers/data-provider.md
[useTable]: /api-references/hooks/table/useTable.md