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

### Custom Page

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

### Standart CRUD Page


[Nextjs]: https://nextjs.org/docs/getting-started
[NextjsRouter]: https://www.npmjs.com/package/@pankod/refine-nextjs-router
[routerProvider]: /getting-started/overview.md
[supeprlate]: https://github.com/pankod/superplate
[NextjsCustomApp]: https://nextjs.org/docs/advanced-features/custom-app
[Refine]: /api-references/components/refine-config.md
[NextjsPages]: https://nextjs.org/docs/basic-features/pages
[useTable]: /api-references/hooks/table/useTable.md