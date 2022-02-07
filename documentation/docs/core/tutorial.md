---
id: tutorial
title: Tutorial
---

import readyPage from '@site/static/img/core/tutorial/ready-page.png';
import resourceFirst from '@site/static/img/core/tutorial/resource-1.png';
import resourceSecond from '@site/static/img/core/tutorial/resource-2.png';
import createGif from '@site/static/img/tutorial/create.gif';
import editGif from '@site/static/img/tutorial/edit.gif';
import showGif from '@site/static/img/tutorial/show.gif';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Introduction

This tutorial will go through process of building a simple _admin panel_ for a _CMS-like_ application with headless.

Step by step, you're going to learn how to consume a _REST API_ and add basic CRUD functionality to your panel leveraging the unique capabilities of **refine**.

Let's begin by setting up a new **refine** project.

## Setting up

There are two alternative methods to set up a **refine** application.

The recommended way is using the [superplate](https://github.com/pankod/superplate) tool. _superplate_'s _CLI wizard_ will let you create and customize your application in seconds.

Alternatively, you may use the _create-react-app_ tool to create an empty _React_ application and then add **refine** module via _npm_.

<Tabs
defaultValue="superplate"
values={[
{label: 'use superplate', value: 'superplate'},
{label: 'use create-react-app', value: 'create-react-app'}
]}>
<TabItem value="create-react-app">

First, run the _create-react-app_ tool to bootstrap an empty _React project_.

```
npx create-react-app tutorial --template typescript
```

:::note
_--template typescript_ flag will ensure that the Typescript language is selected.
:::
Navigate to the project folder and install **refine** with the following _npm_ command:

<Tabs
defaultValue="npm"
values={[
{label: 'use npm', value: 'npm'},
{label: 'use yarn', value: 'yarn'}
]}>
<TabItem value="npm">

```bash
npm i @pankod/refine @pankod/refine-react-router
```

  </TabItem>
    <TabItem value="yarn">

```bash
yarn add @pankod/refine @pankod/refine-react-router
```

  </TabItem>
</Tabs>

:::warning
This tutorial assumes your project is configured for absolute imports. Since CRA does not configure it by default, you should configure it yourself to be able to use absolute imports. You should configure a [`tsconfig.json`](https://www.typescriptlang.org/tsconfig#baseUrl) with `baseUrl` setting pointing to the `/src` directory in your project.

[Refer to CRA docs for more information about absolute imports. &#8594](https://create-react-app.dev/docs/importing-a-component/#absolute-imports)
:::

  </TabItem>
  <TabItem value="superplate">

First, run the **superplate** with the following command:

```
npx superplate-cli tutorial
```

Select the following options to complete the _CLI wizard_:

```
? Select your project type:
❯ refine-react

? What will be the name of your app:
tutorial

? Package manager:
❯ Npm

? Do you want to using UI Framework?:
❯ No (headless)

? Data Provider :
❯ REST API

? Auth Provider :
❯ None

? i18n - Internationalization:
❯ No
```

</TabItem>
</Tabs>

## About Fake REST API

**refine** is designed to consume data from APIs.

For the sake of this tutorial, we will provide you a fully working, _fake REST API_ located at https://api.fake-rest.refine.dev/. You may take a look at available [resources and routes of the API](https://api.fake-rest.refine.dev/) before proceeding to the next step.

## Using a Dataprovider

Dataproviders are **refine** components making it possible to consume different API's and data services conveniently. To consume our _Fake REST API_, we'll use the **"Simple REST Dataprovider"**.

Next, navigate to the project folder and run the following command to install the required package:

<Tabs
defaultValue="npm"
values={[
{label: 'use npm', value: 'npm'},
{label: 'use yarn', value: 'yarn'}
]}>
<TabItem value="npm">

```bash
npm i @pankod/refine-simple-rest
```

  </TabItem>
    <TabItem value="yarn">

```bash
yarn add @pankod/refine-simple-rest
```

  </TabItem>
</Tabs>

:::note
If you used `superplate` to bootstrap the project, you can skip issuing this command as `superplate` already installs the selected data provider.
:::

:::note

Fake REST API is based on [JSON Server Project](https://github.com/typicode/json-server). **Simple REST Dataprovider** is fully compatible with the REST rules and methods of the **JSON Server**.
:::

:::tip

**refine** includes many out-of-the-box data providers to use in your projects like

-   [Simple REST API](https://github.com/pankod/refine/tree/master/packages/simple-rest)
-   [GraphQL](https://github.com/pankod/refine/tree/master/packages/graphql)
-   [NestJS CRUD](https://github.com/pankod/refine/tree/master/packages/nestjsx-crud)
-   [Airtable](https://github.com/pankod/refine/tree/master/packages/airtable)
-   [Strapi](https://github.com/pankod/refine/tree/master/packages/strapi) - [Strapi v4](https://github.com/pankod/refine/tree/master/packages/strapi-v4)
-   [Strapi GraphQL](https://github.com/pankod/refine/tree/master/packages/strapi-graphql)
-   [Supabase](https://github.com/pankod/refine/tree/master/packages/supabase)
-   [Hasura](https://github.com/pankod/refine/tree/master/packages/hasura)
-   [Appwrite](https://github.com/pankod/refine/tree/master/packages/appwrite)
-   [Altogic](https://github.com/pankod/refine/tree/master/packages/altogic)

### Community ❤️

-   [Firebase](https://github.com/rturan29/refine-firebase) by [rturan29](https://github.com/rturan29)

[Refer to the `dataProvider` documentation for detailed usage. &#8594](/api-references/providers/data-provider.md)
:::

## Bootstrapping the Application

If you don't use _superplate_ replace the contents of `App.tsx` with the following code:

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router";
import dataProvider from "@pankod/refine-simple-rest";

const App: React.FC = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
        />
    );
};

export default App;
```

<br/>

`<Refine/>` is the root component of a **refine** application. Using the [`dataProvider`](/api-references/providers/data-provider.md) prop, we made our **Simple REST Dataprovider** available to the entire application.

Run the following command to install the required package:

<Tabs
defaultValue="superplate"
values={[
{label: 'with superplate', value: 'superplate'},
{label: 'with create-react-app', value: 'create-react-app'}
]}>
<TabItem value="superplate">

```bash
npm run dev
```

  </TabItem>
  <TabItem value="create-react-app">

```bash
npm run start
```

  </TabItem>
</Tabs>

Your **refine** application should be up and running!  
Point your browser to [http://localhost:3000](http://localhost:3000) to access it. You will see the welcome page.

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={readyPage} alt="Ready Page" />
</div>
<br/>

:::info
The ready page is displayed when there are no resources in the **refine** app. You can change it with the [`ReadyPage`](api-references/components/refine-config.md#readypage) prop.
:::

## Adding Resources

Now we are ready to start connecting to our API by adding a resource to our application.

Let's add **/posts/** endpoint from our API as a resource. First take a look to the raw API response for the request made to the **/posts/** route:

<details><summary>Show response</summary>
<p>

```ts title="GET https://api.fake-rest.refine.dev/posts/"
[
  {
    "id": 1,
    "title": "Eius ea autem sapiente placeat fuga voluptas quos quae.",
    "slug": "beatae-esse-dolor",
    "content": "Explicabo nihil delectus. Nam aliquid sunt numquam...",
    "category": {
      "id": 24
    },
    "user": {
      "id": 7
    },
    "status": "draft",
    "createdAt": "2021-03-13T03:09:30.186Z",
    "image": [],
    "tags": [
      7,
      4
    ],
    "language": 2
  },
  ...
]
```

</p>
</details>

Now, add the highlighted code to your `App.tsx` to connect to the endpoint.

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router";
import dataProvider from "@pankod/refine-simple-rest";

// highlight-next-line
import { PostIcon } from "icons";

export const App: React.FC = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            // highlight-next-line
            resources={[{ name: "posts", icon: PostIcon }]}
        />
    );
};
```

<details><summary>Show PostIcon</summary>
<p>

```tsx title="icons.tsx"
export const PostIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
        <polyline points="2 17 12 22 22 17"></polyline>
        <polyline points="2 12 12 17 22 12"></polyline>
    </svg>
);
```

</p>
</details>

:::info
`resources` is a property of `<Refine/>` representing API Endpoints. The `name` property of every single resource should match one of the endpoints in your API!

The `icon` property of every single resource is can be used to display the resource in whatever way you want for example in the sidebar or header. We'll use it when we'll create layout component.
:::

Instead of showing the welcome page, the application should redirect now? to an URL defined by the `name` property. Open your application to check that the URL is routed to **/posts**:

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={resourceFirst} alt="Resource only with name" />
</div>
<br/>

:::info
You can change the **404** error page with the [`catchAll`](api-references/components/refine-config.md#catchall) prop.
:::

You'll still see a **404** error page because no **Page** component is assigned to our resource yet.

:::note
`resources` use **Page** components to handle data and perform rendering. **Page** components are passed to `resources` as an array of objects.
For basic _CRUD_ operations, there are **four** predefined props: **list**, **create**, **edit** and **show**.
:::

Let's create a **Page** component to fetch **posts** and display them as a table. Later, we will pass the component as the **list** prop to our resource.

## Adding Tailwind CSS

Install `tailwindcss` and its peer dependencies via npm, and then run the init command to generate both `tailwind.config.js` and `postcss.config.js`.

```bash
npm i -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

Add the paths to all of your template files in your `tailwind.config.js` file.

```ts title="tailwind.config.js"
module.exports = {
    //highlight-next-line
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [],
};
```

Add the `@tailwind` directives for each of Tailwind’s layers to your `src/index.css` file.

```css title="src/index.css"
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Now, you can use Tailwind to style your application.

## Creating a Layout

We will create a **Layout** component to handle the rendering of the **Page** components.

Create a new folder named _"components"_ under _"/src"_ and create a new file named _"Layout.tsx"_ with the following code:

```tsx title="components/Layout.tsx"
import { useResource, useNavigation } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router";

const { Link } = routerProvider;

export const Layout: React.FC = ({ children }) => {
    const { resources } = useResource();
    const { list } = useNavigation();

    return (
        <div className="flex min-h-screen flex-col">
            <div className="mb-2 border-b py-2">
                <div className="container mx-auto">
                    <div className="flex items-center gap-2">
                        <Link to="/">
                            <img
                                className="w-32"
                                src="https://refine.dev/img/refine_logo.png"
                                alt="Logo"
                            />
                        </Link>
                        <ul>
                            {resources.map(({ name, icon }) => (
                                <li key={name} className="float-left">
                                    <a
                                        className="flex cursor-pointer items-center gap-1 rounded-sm px-2 py-1 capitalize decoration-indigo-500 decoration-2 underline-offset-1 transition duration-300 ease-in-out hover:underline"
                                        onClick={() => list(name)}
                                    >
                                        {icon}
                                        <span>{name}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="bg-white">{children}</div>
        </div>
    );
};
```

We created a header with a logo and a list of links to all resources. The links are clickable and will navigate to the corresponding resource. To do this, we used the [`useResource`](#) hook to get the resources from the `<Refine/>` and the [`useNavigation`](#) hook to used to navigate between resources.

`children` is the content of the layout. In our case, it is the content of the **Page** components.

Now, we can use the `<Layout>` in our application.

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router";
import dataProvider from "@pankod/refine-simple-rest";

// highlight-next-line
import { Layout } from "components/layout";
import { PostIcon } from "icons";

export const App: React.FC = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            resources={[{ name: "posts", icon: PostIcon }]}
            // highlight-next-line
            Layout={Layout}
        />
    );
};
```

## Creating a List Page

First, we'll install [`@pankod/refine-react-table`](#) package to use the `useTable` hook.

```bash
npm i @pankod/refine-react-table
```

:::note
We'll use the `@pankod/refine-react-table` for benefit of the [**react-table**](https://react-table.tanstack.com) library. However, you can use `useTable` without the `@pankod/refine-react-table` package.
:::

Next, we'll need an interface to work with the data from the API endpoint.

Create a new folder named _"interface"_ under _"/src"_ if you don't already have one. Then create a _"index.d.ts"_ file with the following code:

```ts title="interfaces/index.d.ts"
export interface IPost {
    id: string;
    title: string;
    status: "published" | "draft" | "rejected";
    createdAt: string;
}
```

We'll be using **id**, **title**, **status** and **createdAt** fields of every **post** record.

Now, create a new folder named _"pages/posts"_ under _"/src"_. Under that folder, create a _"list.tsx"_ file with the following code:

```tsx title="pages/posts/list.tsx"
import React from "react";
import { useTable, Column } from "@pankod/refine-react-table";

export const PostList: React.FC = () => {
    const columns: Array<Column> = React.useMemo(
        () => [
            {
                id: "id",
                Header: "ID",
                accessor: "id",
            },
            {
                id: "title",
                Header: "Title",
                accessor: "title",
            },
            {
                id: "status",
                Header: "Status",
                accessor: "status",
            },
            {
                id: "createdAt",
                Header: "CreatedAt",
                accessor: "createdAt",
            },
        ],
        [],
    );

    const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
        useTable({ columns });

    return (
        <div className="container mx-auto pb-4">
            <table
                className="min-w-full table-fixed divide-y divide-gray-200 border"
                {...getTableProps()}
            >
                <thead className="bg-gray-100">
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th
                                    {...column.getHeaderProps()}
                                    className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider text-gray-700"
                                >
                                    {column.render("Header")}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody
                    {...getTableBodyProps()}
                    className="divide-y divide-gray-200 bg-white"
                >
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr
                                {...row.getRowProps()}
                                className="transition hover:bg-gray-100"
                            >
                                {row.cells.map((cell) => {
                                    return (
                                        <td
                                            {...cell.getCellProps()}
                                            className="whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900"
                                        >
                                            {cell.render("Cell")}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};
```

✳️ `@pankod/refine-react-table` hook `useTable()` fetches data from API. Normally, **react-table**'s `useTable` expects a `data` prop but `@pankod/refine-react-table` doesn't expect a `data` prop.

To get more detailed information about this package, please refer the [@pankod/refine-react-table documentation](#).

Finally, we are ready to add `<PostList>` to our resource. Add the highlighted line to your `App.tsx`

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router";
import dataProvider from "@pankod/refine-simple-rest";

// highlight-next-line
import { PostList } from "pages/posts";
import { Layout } from "components/layout";
import { PostIcon } from "/icons";

export const App: React.FC = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            // highlight-next-line
            resources={[{ name: "posts", icon: PostIcon, list: PostList }]}
            Layout={Layout}
        />
    );
};
```

<br />

Open your application in your browser. You will see **posts** are displayed correctly in a table structure.

:::info
You can check the [@pankod/refine-react-table guide](#) for **pagination**, **sorting**, **filtering** and more.
:::

On the next step, we are going to add a category field to the table which involves handling data relationships.

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={resourceSecond} alt="Resource only List component" />
</div>

<br/>

## Handling relationships

Remember the records from `/posts` endpoint that had a category id field?

```ts title="https://api.fake-rest.refine.dev/posts/1"
...
  "category": {
    "id": 26
  }
...
```

<br />

To display category titles on our table, we first need to map category id's to their corresponding titles.
The category title data can be obtained from the `/categories` endpoint for each record.

```ts title="https://api.fake-rest.refine.dev/categories/26"
  {
    "id": 26,
    "title": "mock category title",
  }
```

<br />

At this point, we need to join records from different resources. For this, we're goint to use the refine hook `useMany`.

Before we start, just edit our interface for the new `ICategory` type:

```ts title="interfaces/index.d.ts"
// highlight-start
export interface ICategory {
    id: string;
    title: string;
}
// highlight-end

export interface IPost {
    id: string;
    title: string;
    status: "published" | "draft" | "rejected";
    createdAt: string;
    // highlight-next-line
    category: ICategory;
}
```

So we can update our `list.tsx` with the highlighted lines:

```tsx title="pages/posts/list.tsx"
import React from "react";
import { useTable, Column } from "@pankod/refine-react-table";

export const PostList: React.FC = () => {
    const columns: Array<Column> = React.useMemo(
        () => [
            {
                id: "id",
                Header: "ID",
                accessor: "id",
            },
            {
                id: "title",
                Header: "Title",
                accessor: "title",
            },
            {
                id: "status",
                Header: "Status",
                accessor: "status",
            },
            {
                id: "createdAt",
                Header: "CreatedAt",
                accessor: "createdAt",
            },
            //highlight-start
            {
                id: "category.id",
                Header: "Category",
                accessor: "category.id",
                Cell: ({ cell }) => {
                    const { data, isLoading } = useOne<ICategory>({
                        resource: "categories",
                        id: cell.value,
                    });

                    if (isLoading) {
                        return <p>loading..</p>;
                    }

                    return data?.data.title;
                },
            },
            //highlight-end
        ],
        [],
    );

    const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
        useTable({ columns });

    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>
                                {column.render("Header")}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return (
                                    <td {...cell.getCellProps()}>
                                        {cell.render("Cell")}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};
```

Try the result on your browser and you'll notice that the category column is filled correctly with the matching category titles for the each record's category id's. Even the loading state is managed by **refine**.

To get more detailed information about this hook, please refer the [useMany Documentation](/api-references/hooks/data/useMany.md).

## Showing a single record

At this point we are able to list all _post_ records on the table component with pagination, sorting and filtering functionality. Next, we are going to add a _details page_ to fetch and display data from a single record.

Let's create a `<PostShow>` component on `/pages/posts` folder:

```tsx title="pages/posts/show.tsx"
import { useShow, useOne } from "@pankod/refine-core";
import { Show, Typography, Tag } from "@pankod/refine-antd";

import { IPost, ICategory } from "interfaces";

const { Title, Text } = Typography;

export const PostShow = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;
    const record = data?.data;

    const { data: categoryData } = useOne<ICategory>({
        resource: "categories",
        id: record?.category.id || "",
        queryOptions: {
            enabled: !!record?.category.id,
        },
    });

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>Title</Title>
            <Text>{record?.title}</Text>

            <Title level={5}>Status</Title>
            <Text>
                <Tag>{record?.status}</Tag>
            </Text>

            <Title level={5}>Category</Title>
            <Text>{categoryData?.data.title}</Text>
        </Show>
    );
};
```

<br />

Now we can add the newly created component to our resource with `show` prop:

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router";
import dataProvider from "@pankod/refine-simple-rest";

// highlight-next-line
import { PostList, PostShow } from "./pages/posts";

export const App: React.FC = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            // highlight-start
            resources={[
                {
                    name: "posts",
                    list: PostList,
                    show: PostShow,
                },
            ]}
            // highlight-end
        />
    );
};
```

<br />

And then we can add a `<ShowButton>` on the list page to make it possible for users to navigate to detail pages:

```tsx title="src/pages/posts/list.tsx"
import { useMany } from "@pankod/refine-core";
import {
    List,
    TextField,
    TagField,
    DateField,
    Table,
    useTable,
    FilterDropdown,
    Select,
    // highlight-next-line
    ShowButton,
    useSelect,
} from "@pankod/refine-antd";

import { IPost, ICategory } from "interfaces";

export const PostList: React.FC = () => {
    const { tableProps } = useTable<IPost>();

    const categoryIds =
        tableProps?.dataSource?.map((item) => item.category.id) ?? [];
    const { data: categoriesData, isLoading } = useMany<ICategory>({
        resource: "categories",
        ids: categoryIds,
        queryOptions: {
            enabled: categoryIds.length > 0,
        },
    });

    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "categories",
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="title" title="title" />
                <Table.Column
                    dataIndex="status"
                    title="status"
                    render={(value) => <TagField value={value} />}
                />
                <Table.Column
                    dataIndex="createdAt"
                    title="createdAt"
                    render={(value) => <DateField format="LLL" value={value} />}
                />
                <Table.Column
                    dataIndex={["category", "id"]}
                    title="category"
                    render={(value) => {
                        if (isLoading) {
                            return <TextField value="Loading..." />;
                        }

                        return (
                            <TextField
                                value={
                                    categoriesData?.data.find(
                                        (item) => item.id === value,
                                    )?.title
                                }
                            />
                        );
                    }}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Select
                                style={{ minWidth: 200 }}
                                mode="multiple"
                                placeholder="Select Category"
                                {...categorySelectProps}
                            />
                        </FilterDropdown>
                    )}
                />
                <Table.Column<IPost>
                    title="Actions"
                    dataIndex="actions"
                    // highlight-start
                    render={(_text, record): React.ReactNode => {
                        return (
                            <ShowButton
                                size="small"
                                recordItemId={record.id}
                                hideText
                            />
                        );
                    }}
                    // highlight-end
                />
            </Table>
        </List>
    );
};
```

✳️ `useShow()` is a **refine** hook used to fetch a single record data. The `queryResult` has the response and also `isLoading` state.

[Refer to the `useShow` documentation for detailed usage information. &#8594](/api-references/hooks/show/useShow.md)

✳️ To retrieve the category title, again we need to make a call to `/categories` endpoint. This time we used `useOne()` hook to get a single record from another resource.

[Refer to the `useOne` documentation for detailed usage information. &#8594](/api-references/hooks/data/useOne.md)

:::caution attention
`useShow()` is the preferred hook for fetching data from current resource. For query foreign resources you may use the low-level `useOne()` hook.
:::

Since we've got access to raw data returning from `useShow()`, there is no restriction how it's displayed on your components. If you prefer presenting your content with a nicer wrapper, **refine** provides you
the `<Show>` component which has extra features like `list` and `refresh` buttons.

[Refer to the `<Show>` documentation for detailed usage information. &#8594](/api-references/components/basic-views/show.md)

<br />

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={showGif} alt="Show record action" />
</div>
<br/>

## Editing a record

Until this point, we were basically working with read operations such as fetching and displaying data from resources. From now on, we are going to start creating and updating records by using **refine**.

Let's start by creating a new `<PostEdit>` page responsible for editing a single record:

```tsx title="pages/posts/edit.tsx"
import {
    useForm,
    Form,
    Input,
    Select,
    Edit,
    useSelect,
} from "@pankod/refine-antd";
import { IPost } from "interfaces";

export const PostEdit: React.FC = () => {
    const { formProps, saveButtonProps, queryResult } = useForm<IPost>();

    const { selectProps: categorySelectProps } = useSelect<IPost>({
        resource: "categories",
        defaultValue: queryResult?.data?.data?.category.id,
    });

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item label="Title" name="title">
                    <Input />
                </Form.Item>
                <Form.Item label="Status" name="status">
                    <Select
                        options={[
                            {
                                label: "Published",
                                value: "published",
                            },
                            {
                                label: "Draft",
                                value: "draft",
                            },
                            {
                                label: "Rejected",
                                value: "rejected",
                            },
                        ]}
                    />
                </Form.Item>
                <Form.Item label="Category" name={["category", "id"]}>
                    <Select {...categorySelectProps} />
                </Form.Item>
            </Form>
        </Edit>
    );
};
```

<br />

Now we can add the newly created component to our resource with `edit` prop:

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router";
import dataProvider from "@pankod/refine-simple-rest";

// highlight-next-line
import { PostList, PostShow, PostEdit } from "./pages/posts";

export const App: React.FC = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            // highlight-start
            resources={[
                {
                    name: "posts",
                    list: PostList,
                    edit: PostEdit,
                    show: PostShow,
                },
            ]}
            // highlight-end
        />
    );
};
```

We are going to need an _edit_ button on each row to diplay the `<PostEdit>` component. **refine** doesn't automatically add one, so we have to update our `<PostList>` component to add a `<EditButton>` for each record:

```tsx title="components/pages/posts.tsx"
import { useMany } from "@pankod/refine-core";
import {
    List,
    TextField,
    TagField,
    DateField,
    Table,
    useTable,
    FilterDropdown,
    Select,
    ShowButton,
    useSelect,
    // highlight-start
    Space,
    EditButton,
    // highlight-end
} from "@pankod/refine-antd";

import { IPost, ICategory } from "interfaces";

export const PostList: React.FC = () => {
    const { tableProps } = useTable<IPost>();

    const categoryIds =
        tableProps?.dataSource?.map((item) => item.category.id) ?? [];
    const { data: categoriesData, isLoading } = useMany<ICategory>({
        resource: "categories",
        ids: categoryIds,
        queryOptions: {
            enabled: categoryIds.length > 0,
        },
    });

    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "categories",
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="title" title="title" />
                <Table.Column
                    dataIndex="status"
                    title="status"
                    render={(value) => <TagField value={value} />}
                />
                <Table.Column
                    dataIndex="createdAt"
                    title="createdAt"
                    render={(value) => <DateField format="LLL" value={value} />}
                />
                <Table.Column
                    dataIndex={["category", "id"]}
                    title="category"
                    render={(value) => {
                        if (isLoading) {
                            return <TextField value="Loading..." />;
                        }

                        return (
                            <TextField
                                value={
                                    categoriesData?.data.find(
                                        (item) => item.id === value,
                                    )?.title
                                }
                            />
                        );
                    }}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Select
                                style={{ minWidth: 200 }}
                                mode="multiple"
                                placeholder="Select Category"
                                {...categorySelectProps}
                            />
                        </FilterDropdown>
                    )}
                />
                <Table.Column<IPost>
                    title="Actions"
                    dataIndex="actions"
                    // highlight-start
                    render={(_text, record): React.ReactNode => {
                        return (
                            <Space>
                                <ShowButton
                                    size="small"
                                    recordItemId={record.id}
                                    hideText
                                />
                                <EditButton
                                    size="small"
                                    recordItemId={record.id}
                                    hideText
                                />
                            </Space>
                        );
                    }}
                    // highlight-end
                />
            </Table>
        </List>
    );
};
```

[Refer to the `<EditButton>` documentation for detailed usage information. &#8594](/api-references/components/buttons/edit.md)

You can try using edit buttons which will trigger the edit forms for each record, allowing you to update the record data.

Let's see what's going on our `<PostEdit>` component in detail:

✳️ `useForm` is a refine hook for handling form data.
On the example it returns `formProps` and `saveButtonProps`, where the former includes all necessary props to build the form and the latter has the ones for the save button.

:::caution Attention
In edit page, `useForm` hook initializes the form with current record values.

[Refer to the `useForm` documentation for detailed usage information . &#8594](/api-references/hooks/form/useForm.md)

✳️ `<Form>` and `<Form.Item>` are Ant Design components to build form inputs.

✳️ `<Edit>` is a wrapper **refine** component for `<Form>`. It provides save, delete and refresh buttons that can be used for form actions.

✳️ Form data is set automatically, whenever children inputs `<Form.Item>`'s are edited.

✳️ Save button submits the form by executing the `useUpdate` method provided by the [`dataProvider`](/api-references/providers/data-provider.md). After a succesfull response, the application will be redirected to the listing page.

<br />

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={editGif} alt="Edit record action" />
</div>
<br/>

<br />

:::

## Creating a record

Creating a record in **refine** follows a similar flow as editing records.

First, we'll create a `<PostCreate>` page:

```tsx title="pages/posts/create.tsx"
import {
    // highlight-next-line
    Create,
    Form,
    Input,
    Select,
    useForm,
    useSelect,
} from "@pankod/refine-antd";

import { IPost } from "interfaces";

export const PostCreate = () => {
    const { formProps, saveButtonProps } = useForm<IPost>();
    const { selectProps: categorySelectProps } = useSelect<IPost>({
        resource: "categories",
    });

    return (
        // highlight-start
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item label="Title" name="title">
                    <Input />
                </Form.Item>
                <Form.Item label="Status" name="status">
                    <Select
                        options={[
                            {
                                label: "Published",
                                value: "published",
                            },
                            {
                                label: "Draft",
                                value: "draft",
                            },
                            {
                                label: "Rejected",
                                value: "rejected",
                            },
                        ]}
                    />
                </Form.Item>
                <Form.Item label="Category" name={["category", "id"]}>
                    <Select {...categorySelectProps} />
                </Form.Item>
            </Form>
        </Create>
        // highlight-end
    );
};
```

<br />

After creating the `<PostCreate>` component, add it to resource with `create` prop:

<br />

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine-core";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router";

// highlight-next-line
import { PostList, PostShow, PostEdit, PostCreate } from "./pages/posts";

export const App: React.FC = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            // highlight-start
            resources={[
                {
                    name: "posts",
                    list: PostList,
                    show: PostShow,
                    edit: PostEdit,
                    create: PostCreate,
                },
            ]}
            // highlight-end
        />
    );
};
```

<br />

And that's it! Try it on browser and see if you can create new posts from scratch.

We should notice some minor differences from the edit example:

✳️ `<Form>` is wrapped with `<Create>` component.

✳️ Save button submits the form by executing the `useCreate` method provided by the [`dataProvider`](/api-references/providers/data-provider.md).

✳️ No `defaultValue` is passed to `useSelect`.

<br />

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={createGif} alt="Create record action" />
</div>

<br/>

## Deleting a record

Deleting a record can be done in two ways.

First way is adding an delete button on each row since _refine_ doesn't automatically add one, so we have to update our `<PostList>` component to add a `<DeleteButton>` for each record:

```tsx title="components/pages/posts.tsx"
import { useMany } from "@pankod/refine-core";
import {
    List,
    TextField,
    TagField,
    DateField,
    Table,
    useTable,
    FilterDropdown,
    Select,
    ShowButton,
    useSelect,
    Space,
    EditButton,
    // highlight-next-line
    DeleteButton,
} from "@pankod/refine-antd";

import { IPost, ICategory } from "../../interfaces";

export const PostList: React.FC = () => {
    const { tableProps } = useTable<IPost>();

    const categoryIds =
        tableProps?.dataSource?.map((item) => item.category.id) ?? [];
    const { data: categoriesData, isLoading } = useMany<ICategory>({
        resource: "categories",
        ids: categoryIds,
        queryOptions: {
            enabled: categoryIds.length > 0,
        },
    });

    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "categories",
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="title" title="title" />
                <Table.Column
                    dataIndex="status"
                    title="status"
                    render={(value) => <TagField value={value} />}
                />
                <Table.Column
                    dataIndex="createdAt"
                    title="createdAt"
                    render={(value) => <DateField format="LLL" value={value} />}
                />
                <Table.Column
                    dataIndex={["category", "id"]}
                    title="category"
                    render={(value) => {
                        if (isLoading) {
                            return <TextField value="Loading..." />;
                        }

                        return (
                            <TextField
                                value={
                                    categoriesData?.data.find(
                                        (item) => item.id === value,
                                    )?.title
                                }
                            />
                        );
                    }}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Select
                                style={{ minWidth: 200 }}
                                mode="multiple"
                                placeholder="Select Category"
                                {...categorySelectProps}
                            />
                        </FilterDropdown>
                    )}
                />
                <Table.Column<IPost>
                    title="Actions"
                    dataIndex="actions"
                    render={(_text, record): React.ReactNode => {
                        return (
                            <Space>
                                <ShowButton
                                    size="small"
                                    recordItemId={record.id}
                                    hideText
                                />
                                <EditButton
                                    size="small"
                                    recordItemId={record.id}
                                    hideText
                                />
                                // highlight-start
                                <DeleteButton
                                    size="small"
                                    recordItemId={record.id}
                                    hideText
                                />
                                // highlight-end
                            </Space>
                        );
                    }}
                />
            </Table>
        </List>
    );
};
```

[Refer to the `<DeleteButton>` documentation for detailed usage information. &#8594](/api-references/components/buttons/delete.md)

Now you can try deleting records yourself. Just click on the delete button of the record you want to delete and confirm.

The second way is showing delete button in `<PostEdit>` component. To show delete button in edit page, `canDelete` prop needs to be passed to resource object.

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router";
import dataProvider from "@pankod/refine-simple-rest";

import { PostList, PostShow, PostEdit, PostCreate } from "./pages/posts";

export const App: React.FC = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            resources={[
                {
                    name: "posts",
                    list: PostList,
                    show: PostShow,
                    edit: PostEdit,
                    create: PostCreate,
                    // highlight-next-line
                    canDelete: true,
                },
            ]}
        />
    );
};
```

After adding `canDelete` prop, `<DeleteButton>` will appear in edit form.

## Live Codesandbox Example

Our tutorial is complete. Below you'll find a live Codesandbox example displaying what we have done so far:

<iframe src="https://codesandbox.io/embed/tutorial-ov79u?autoresize=1&fontsize=14&theme=dark&view=preview"
    style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
    title="refine-tutorial"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

## Next Steps

-   [Read about the authProvider to implement authentication for your refine application. &#8594](/api-references/providers/auth-provider.md)

-   [Read about the dataProvider to consume custom API's &#8594](/api-references/providers/data-provider.md)

-   [Read about the i18nProvider to add language support. &#8594](/api-references/providers/i18n-provider.md)

-   [Check the Guides & Concept section to learn generic solutions to common problems &#8594](/guides-and-concepts/upload/multipart-upload.md)

-   [Check example section for code snippets &#8594](/examples/customization/topMenuLayout.md)
