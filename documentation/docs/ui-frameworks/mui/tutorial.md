---
id: tutorial
title: Tutorial
---

<!-- import readyPage from '@site/static/img/tutorial/mui/ready-page.png';
import resourceFirst from '@site/static/img/tutorial/mui/resource-1.png';
import resourceSecond from '@site/static/img/tutorial/mui/resource-2.png';
import createGif from '@site/static/img/tutorial/mui/create.gif';
import editGif from '@site/static/img/tutorial/mui/edit.gif';
import showGif from '@site/static/img/tutorial/mui/show.gif'; -->

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Introduction

This tutorial will go through process of building a simple _admin panel_ for a _CMS-like_ application.

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
npm i @pankod/refine-core @pankod/refine-mui @pankod/refine-react-router-v6
```

  </TabItem>
    <TabItem value="yarn">

```bash
yarn add  @pankod/refine-core @pankod/refine-mui @pankod/refine-react-router-v6
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
npx superplate-cli -p refine-react tutorial
```

Select the following options to complete the _CLI wizard_:

```
? Select your project type:
❯ refine-react

? What will be the name of your app:
tutorial

? Package manager:
❯ Npm

? Do you want to use an UI Framework?:
❯ Yes, I want Ant Design

? Do you want to customize the theme?:
❯ No (Ant Design default theme)

? Data Provider :
❯ REST API

? Auth Provider :
❯ None

? Do you want to add an example page?:
❯ No

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
-   [Nhost](https://github.com/pankod/refine/tree/master/packages/nhost)
-   [Appwrite](https://github.com/pankod/refine/tree/master/packages/appwrite)
-   [Altogic](https://github.com/pankod/refine/tree/master/packages/altogic)

### Community ❤️

-   [Firebase](https://github.com/rturan29/refine-firebase) by [rturan29](https://github.com/rturan29)
-   [Directus](https://github.com/tspvivek/refine-directus) by [tspvivek](https://github.com/tspvivek)

[Refer to the `dataProvider` documentation for detailed usage. &#8594](/core/providers/data-provider.md)
:::

## Bootstrapping the Application

Replace the contents of `index.tsx` with the following code:

```tsx title="src/index.tsx"
import React from "react";
import ReactDOM from "react-dom";
import { SnackbarProvider } from "notistack";

import App from "./App";

ReactDOM.render(
    <React.StrictMode>
        <SnackbarProvider>
            <App />
        </SnackbarProvider>
    </React.StrictMode>,
    document.getElementById("root"),
);
```

Replace the contents of `App.tsx` with the following code:

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine-core";
import {
    Layout,
    ReadyPage,
    ErrorComponent,
    LightTheme,
    CssBaseline,
    ThemeProvider,
    notificationProviderHandle,
} from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

const App: React.FC = () => {
    const notificationProvider = notificationProviderHandle();

    return (
        <ThemeProvider theme={LightTheme}>
            <CssBaseline />
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                Layout={Layout}
                ReadyPage={ReadyPage}
                notificationProvider={notificationProvider}
                catchAll={<ErrorComponent />}
            />
        </ThemeProvider>
    );
};

export default App;
```

<br/>

`<Refine/>` is the root component of a **refine** application. Using the [`dataProvider`](/core/providers/data-provider.md) prop, we made our **Simple REST Dataprovider** available to the entire application.

Run the following command to install the required package:

<Tabs
defaultValue="superplate"
values={[
{label: 'with superplate', value: 'superplate'},
{label: 'with create-react-app', value: 'create-react-app'}
]}>
<TabItem value="superplate">

```sh
npm run dev
```

  </TabItem>
  <TabItem value="create-react-app">

```sh
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
    <img src="" alt="Ready Page" />
</div>
<br/>

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

<br/>

Now, add the highlighted code to your `App.tsx` to connect to the endpoint.

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine-core";
import {
    Layout,
    ReadyPage,
    ErrorComponent,
    LightTheme,
    CssBaseline,
    ThemeProvider,
    notificationProviderHandle,
} from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

export const App: React.FC = () => {
    const notificationProvider = notificationProviderHandle();

    return (
        <ThemeProvider theme={LightTheme}>
            <CssBaseline />
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                Layout={Layout}
                ReadyPage={ReadyPage}
                notificationProvider={notificationProvider}
                catchAll={<ErrorComponent />}
                // highlight-next-line
                resources={[{ name: "posts" }]}
            />
        </ThemeProvider>
    );
};
```

<br/>

:::info
`resources` is a property of `<Refine/>` representing API Endpoints. The `name` property of every single resource should match one of the endpoints in your API!
:::

Instead of showing the welcome page, the application should redirect now to an URL defined by the `name` property. Open your application to check that the URL is routed to **/posts**:

<>

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="" alt="Resource only with name" />
</div>
<br/>
</>

You'll still see a **404** error page because no **Page** component is assigned to our resource yet.

:::note
`resources` use **Page** components to handle data and perform rendering. **Page** components are passed to `resources` as an array of objects.
For basic _CRUD_ operations, there are **four** predefined props: **list**, **create**, **edit** and **show**.
:::

Let's create a **Page** component to fetch **posts** and display them as a table. Later, we will pass the component as the **list** prop to our resource.

## Creating a List Page

First, we'll need an interface to work with the data from the API endpoint.

Create a new folder named _"interfaces"_ under _"/src"_ if you don't already have one. Then create a _"index.d.ts"_ file with the following code:

```ts title="interfaces/index.d.ts"
export interface IPost {
    id: string;
    title: string;
    status: "published" | "draft" | "rejected";
    createdAt: string;
}
```

We'll be using **title**, **status** and **createdAt** fields of every **post** record.

Now, create a new folder named _"pages/posts"_ under _"/src"_. Under that folder, create a _"list.tsx"_ file with the following code:

```tsx title="src/pages/posts/list.tsx"
import {
    useDataGrid,
    DataGrid,
    GridColumns,
    TagField,
    DateField,
    List,
} from "@pankod/refine-mui";

import { IPost } from "interfaces";

const columns: GridColumns = [
    { field: "title", headerName: "Title", flex: 1, minWidth: 350 },
    {
        field: "status",
        headerName: "Status",
        minWidth: 150,
        renderCell: function render(params) {
            return <TagField value={params.row.status} />;
        },
    },
    {
        field: "createdAt",
        headerName: "CreatedAt",
        minWidth: 150,
        renderCell: function render(params) {
            return <DateField format="LLL" value={params.row.createdAt} />;
        },
    },
];

export const PostList: React.FC = () => {
    const { dataGridProps } = useDataGrid<IPost>({
        columns,
    });

    return (
        <List>
            <DataGrid {...dataGridProps} autoHeight />
        </List>
    );
};
```

:::note
We didn't use arrow functions for rendering cell because of the react/display-name is not compatible with arrow functions. If you want to use arrow functions, you can use like this:

```tsx title="pages/posts/list.tsx"
// eslint-disable-next-line react/display-name
renderCell: (params) => <TagField value={params.row.status} />;
```

:::

<br/>

Let's break down the `<PostList/>` component to understand what's going on here:

✳️ `<DataGrid/>` is a native **Material UI** component. It renders records row by row as a table.
`<DataGrid/>` expects a `columns` prop as a required.

:::note
**refine** uses [Material UI](https://mui.com/x/react-data-grid/#mit-version) components to render data.
You may refer to [Material UI Docs](https://mui.com/x/api/data-grid/data-grid/) for further information about the `<DataGrid/>` component.
:::

✳️ `useDataGrid` hook is a helper function to simplify the creation of a `<DataGrid/>` component. `useDataGrid()` is passed to the `<DataGrid/>` component as `{...dataGridProps}`.

This is the point where the ✨real magic✨ happens!

**refine** hook `useDataGrid()` fetches data from API and wraps them with various helper hooks required for the `<DataGrid/>` component. Data interaction functions like **sorting**, **filtering**, and **pagination** will be instantly available on the `<DataGrid/>` with this single line of code.

:::note
**refine** depends heavily on hooks and `useDataGrid()` is only one among many others.
On [useDataGrid() documentation](#) you may find more information about the usage of this hook.
:::
<!-- On [useDataGrid() documentation](/ui-frameworks/mui/hooks/useDataGrid.md) you may find more information about the usage of this hook. -->

✳️ `columns` array are used for mapping and formatting each field shown on the `<DataGrid/>`. `field` prop maps the field to a matching key from the API response. `renderCell` prop is used to choose the appropriate **Field** component for the given data type and also you can use `valueGetter` prop is used to format the data.

:::note
The example uses `<TagField>` and `<DateField>` components. To get the full list of available components, you may refer to the [Field Components Documentation](#).
<!-- [Field Components Documentation](/ui-frameworks/mui/components/fields/boolean.md). -->
:::

✳️ `<List>` is a **refine** component. It acts as a wrapper to `<DataGrid>` to add some extras like _Create Button_ and _title_.

Finally, we are ready to add `<PostList>` to our resource. Add the highlighted line to your `App.tsx`

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine-core";
import {
    Layout,
    LoginPage,
    ErrorComponent,
    ReadyPage,
    LightTheme,
    CssBaseline,
    ThemeProvider,
    notificationProviderHandle,
} from "@pankod/refine-mui";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

import { authProvider } from "authProvider";
// highlight-next-line
import { PostList } from "pages/posts";

const API_URL = "https://api.fake-rest.refine.dev";
const App: React.FC = () => {
    const notificationProvider = notificationProviderHandle();

    return (
        <ThemeProvider theme={LightTheme}>
            <CssBaseline />
            <Refine
                authProvider={authProvider}
                routerProvider={routerProvider}
                dataProvider={dataProvider(API_URL)}
                ReadyPage={ReadyPage}
                Layout={Layout}
                catchAll={<ErrorComponent />}
                resources={[
                    {
                        name: "posts",
                        // highlight-next-line
                        list: PostList,
                    },
                ]}
            />
        </ThemeProvider>
    );
};
```

Note you will need a few more files which help `src/App.tsx` to find your pages and posts. In the `/pages` folder, put this `index.tsx` file in it which allows everything in the `posts` folder to be used elsewhere.

```tsx title="src/pages/index.tsx"
export * from "./posts";
```

<br />

Similarly, put a file in the `/src/pages/posts` folder which accomplishes the same function. We will use the commented out code later as we add more capabilities to our app. Remember as you add functions, uncomment each appropriate line.

```tsx title="src/pages/posts/index.tsx"
export * from "./list";
// export * from "./edit";
// export * from "./create";
// export * from "./show";
```

<br />

Open your application in your browser. You will see **posts** are displayed correctly in a table structure and even the pagination works out-of-the box.

On the next step, we are going to add a category field to the table which involves handling data relationships.

<>

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="" alt="Resource only List component" />
</div>
<br/>
</>

<br/>

## Handling relationships

Remember the records from `/posts` endpoint that had a category id field.

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

At this point, we need to join records from different resources. For this, we're going to use the refine hook `useOne`.

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
    // highlight-next-line
    category: { id: string };
    createdAt: string;
}
```

So we can update our `list.tsx` with the highlighted lines:

```tsx title="src/pages/posts/list.tsx"
// highlight-next-line
import { useOne } from "@pankod/refine-core";
import {
    useDataGrid,
    DataGrid,
    GridColumns,
    TagField,
    DateField,
    List,
} from "@pankod/refine-mui";

// highlight-next-line
import { IPost, ICategory } from "interfaces";

export const PostList: React.FC = () => {
    const columns: GridColumns = [
        { field: "title", headerName: "Title", flex: 1, minWidth: 350 },
        // highlight-start
        {
            field: "category.id",
            headerName: "Category",
            type: "number",
            minWidth: 350,
            valueGetter: (params) => {
                const { data } = useOne<ICategory>({
                    resource: "categories",
                    id: params.row.category.id,
                });
                return data?.data.title;
            },
        },
        // highlight-end
        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            renderCell: function render(params) {
                return <TagField value={params.row.status} />;
            },
        },
        {
            field: "createdAt",
            headerName: "CreatedAt",
            minWidth: 150,
            renderCell: function render(params) {
                return <DateField format="LLL" value={params.row.createdAt} />;
            },
        },
    ];

    const { dataGridProps } = useDataGrid<IPost>({
        columns,
    });

    return (
        <List>
            <DataGrid {...dataGridProps} autoHeight />
        </List>
    );
};
```

We construct an array of `categoryId`'s from `/posts` endpoint and pass it to the `useOne` hook. `categoriesData` will be filled with _id-title_ tuples to be used for rendering our component.

Try the result on your browser and you'll notice that the category column is filled correctly with the matching category titles for the each record's category id's. Even the loading state is managed by **refine**.

:::

<br />

:::note

```tsx
enabled: categoryIds.length > 0;
```

Here, we set a condition to start fetching only when data is available.
:::

To get more detailed information about this hook, please refer the [useOne Documentation](#).
<!-- To get more detailed information about this hook, please refer the [useOne Documentation](/core/hooks/data/useOne.md). -->

## Adding search and filters

We're done with displaying `post` records on our `<DataGrid>`. Let's add search and filtering capabilities to the component, so that the user can have more control over the data.

We are going to use `<Table.Column>`'s [`filterDropdown`](https://ant.design/components/table/#Column) property and `<FilterDropdown>` component as following:

```tsx title="src/pages/posts/list.tsx"
import { useOne } from "@pankod/refine-core";
import {
    useDataGrid,
    DataGrid,
    GridColumns,
    TagField,
    DateField,
    List,
    Stack,
} from "@pankod/refine-mui";

// highlight-next-line
import { IPost, ICategory } from "interfaces";

export const PostList: React.FC = () => {
    const columns: GridColumns = [
        { field: "title", headerName: "Title", flex: 1, minWidth: 350 },
        // highlight-start
        {
            field: "category.id",
            headerName: "Category",
            type: "number",
            minWidth: 350,
            valueGetter: (params) => {
                const { data } = useOne<ICategory>({
                    resource: "categories",
                    id: params.row.category.id,
                });
                return data?.data.title;
            },
        },
        // highlight-end
        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            renderCell: (params) => <TagField value={params.row.status} />,
        },
        {
            field: "createdAt",
            headerName: "CreatedAt",
            minWidth: 150,
            renderCell: (params) => (
                <DateField format="LLL" value={params.row.createdAt} />
            ),
        },
    ];

    const { dataGridProps } = useDataGrid<IPost>({
        columns,
    });

    // highlight-start
    const {
        filterMode,
        filterModel,
        onFilterModelChange,
        ...restDataGridProps
    } = dataGridProps;
    // highlight-end

    return (
        <List>
            <DataGrid
                // highlight-start
                {...restDataGridProps}
                filterMode={filterMode}
                filterModel={filterModel}
                onFilterModelChange={onFilterModelChange}
                autoHeight
                // highlight-end
            />
        </List>
    );
};
```

:::note
To see how the filtering works, you can look at the [`useDataGrid`](#) hook.
<!-- To see how the filtering works, you can look at the [`useDataGrid`](/ui-frameworks/mui/hooks/useDataGrid.md) hook. -->
:::

## Showing a single record

At this point we are able to list all _post_ records on the table component with pagination, sorting and filtering functionality. Next, we are going to add a _details page_ to fetch and display data from a single record.

Let's create a `<PostShow>` component on `/pages/posts` folder:

```tsx title="src/pages/posts/show.tsx"
import { useOne, useShow } from "@pankod/refine-core";
import { Show, Stack, Typography } from "@pankod/refine-mui";
import { ICategory, IPost } from "interfaces";

export const PostShow: React.FC = () => {
    const { queryResult } = useShow<IPost>();

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
            <Stack gap={1}>
                <Typography variant="body1" fontWeight="bold">
                    Title
                </Typography>
                <Typography variant="body2">{record?.title}</Typography>
                <Typography variant="body1" fontWeight="bold">
                    Status
                </Typography>
                <Typography variant="body2">{record?.status}</Typography>
                <Typography variant="body1" fontWeight="bold">
                    Category
                </Typography>
                <Typography variant="body2">
                    {categoryData?.data.title}
                </Typography>
            </Stack>
        </Show>
    );
};
```

✳️ `useShow()` is a **refine** hook used to fetch a single record of data. The `queryResult` has the response and also `isLoading` state.

[Refer to the `useShow` documentation for detailed usage information. &#8594](/core/hooks/show/useShow.md)

✳️ To retrieve the category title, again we need to make a call to `/categories` endpoint. This time we used `useOne()` hook to get a single record from another resource.

[Refer to the `useOne` documentation for detailed usage information. &#8594](/core/hooks/data/useOne.md)

:::caution attention
`useShow()` is the preferred hook for fetching data from the current resource. To query foreign resources you may use the low-level `useOne()` hook.
:::

Since we've got access to raw data returning from `useShow()`, there is no restriction on how it's displayed on your components. If you prefer presenting your content with a nicer wrapper, **refine** provides you
the `<Show>` component which has extra features like `list` and `refresh` buttons.

[Refer to the `<Show>` documentation for detailed usage information. &#8594](#)
<!-- [Refer to the `<Show>` documentation for detailed usage information. &#8594](/ui-frameworks/mui/components/basic-views/show.md) -->

<br />

Now we can add the newly created component to our resource with `show` prop:

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine-core";
import {
    Layout,
    LoginPage,
    ErrorComponent,
    ReadyPage,
    LightTheme,
    CssBaseline,
    ThemeProvider,
    notificationProviderHandle,
} from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// highlight-next-line
import { PostList, PostShow } from "./pages/posts";

export const App: React.FC = () => {
    const notificationProvider = notificationProviderHandle();

    return (
        <ThemeProvider theme={LightTheme}>
            <CssBaseline />
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                Layout={Layout}
                ReadyPage={ReadyPage}
                notificationProvider={notificationProvider}
                catchAll={<ErrorComponent />}
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
        </ThemeProvider>
    );
};
```

<br />

And then we can add a `<ShowButton>` on the list page to make it possible for users to navigate to detail pages:

```tsx title="src/pages/posts/list.tsx"
import { useOne } from "@pankod/refine-core";
import {
    useDataGrid,
    DataGrid,
    GridColumns,
    ShowButton,
    TagField,
    DateField,
    List,
} from "@pankod/refine-mui";

import { IPost, ICategory } from "interfaces";

export const PostList: React.FC = () => {
    const columns: GridColumns = [
        { field: "title", headerName: "Title", flex: 1, minWidth: 350 },
        {
            field: "category.id",
            headerName: "Category",
            type: "number",
            minWidth: 350,
            valueGetter: (params) => {
                const { data } = useOne<ICategory>({
                    resource: "categories",
                    id: params.row.category.id,
                });
                return data?.data.title;
            },
        },
        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            renderCell: function render(params) {
                return <TagField value={params.row.status} />;
            },
        },
        {
            field: "createdAt",
            headerName: "CreatedAt",
            minWidth: 150,
            renderCell: function render(params) {
                return <DateField format="LLL" value={params.row.createdAt} />;
            },
        },
        // highlight-start
        {
            headerName: "Actions",
            field: "actions",
            minWidth: 250,
            renderCell: function render(params) {
                return (
                    <ShowButton
                        hideText
                        size="small"
                        variant="outlined"
                        recordItemId={params.row.id}
                    />
                );
            },
        },
        // highlight-end
    ];

    const { dataGridProps } = useDataGrid<IPost>({
        columns,
    });

    const {
        filterMode,
        filterModel,
        onFilterModelChange,
        ...restDataGridProps
    } = dataGridProps;

    return (
        <List>
            <DataGrid
                {...restDataGridProps}
                filterMode={filterMode}
                filterModel={filterModel}
                onFilterModelChange={onFilterModelChange}
                autoHeight
            />
        </List>
    );
};
```

<br />

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="" alt="Show record action" />
</div>
<br/>

## `Editing` a record

Until this point, we were basically working with reading operations such as fetching and displaying data from resources. From now on, we are going to start creating and updating records by using **refine**.

Let's start by creating a new `<PostEdit>` page responsible for `editing` a single record:

```tsx title="pages/posts/edit.tsx"
import { Controller, useForm } from "@pankod/refine-react-hook-form";
import {
    Edit,
    Box,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    Autocomplete,
    useAutocomplete,
} from "@pankod/refine-mui";
import { ICategory } from "interfaces";

export const PostEdit: React.FC = () => {
    const {
        refineCore: { onFinish, formLoading, queryResult },
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const { autocompleteProps } = useAutocomplete<ICategory>({
        resource: "categories",
        defaultValue: queryResult?.data?.data.category.id,
        queryOptions: { enabled: !!queryResult?.data?.data.category.id },
    });

    return (
        <Edit
            isLoading={formLoading}
            saveButtonProps={{ onClick: handleSubmit(onFinish) }}
        >
            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column" }}
                autoComplete="off"
            >
                <TextField
                    {...register("title", { required: true })}
                    error={!!errors?.title}
                    helperText={errors?.title?.message}
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    defaultValue={" "}
                />
                <FormControl
                    margin="normal"
                    required
                    fullWidth
                    error={!!errors?.status}
                >
                    <InputLabel id="status">Status</InputLabel>
                    <Select
                        {...register("status")}
                        labelId="status"
                        label="Status"
                        defaultValue="published"
                    >
                        <MenuItem value="published">Published</MenuItem>
                        <MenuItem value="draft">Draft</MenuItem>
                        <MenuItem value="rejected">Rejected</MenuItem>
                    </Select>
                    {errors?.status && (
                        <FormHelperText>
                            {errors?.status?.message}
                        </FormHelperText>
                    )}
                </FormControl>
                <Controller
                    control={control}
                    name="category"
                    rules={{ required: true }}
                    defaultValue=""
                    render={({ field }) => (
                        <Autocomplete
                            {...autocompleteProps}
                            {...field}
                            onChange={(_, value) => {
                                field.onChange(value);
                            }}
                            getOptionLabel={(item) => {
                                return item.title
                                    ? item.title
                                    : autocompleteProps?.options?.find(
                                          (p) =>
                                              p.id.toString() ===
                                              item.toString(),
                                      )?.title ?? "";
                            }}
                            isOptionEqualToValue={(option, value) =>
                                value === undefined ||
                                option.id.toString() === value.toString()
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="items"
                                    margin="normal"
                                    variant="outlined"
                                    error={!!errors.item}
                                    helperText={errors.item && "item required"}
                                    required
                                />
                            )}
                        />
                    )}
                />
            </Box>
        </Edit>
    );
};
```

<br />

Let's see what's going on our `<PostEdit>` component in detail:

✳️ `useForm` is a refine hook for handling form data.
In the example, it returns `formProps` and `saveButtonProps`, where the former includes all necessary props to build the form and the latter has the ones for the save button.

:::caution Attention
In edit page, `useForm` hook initializes the form with current record values.

[Refer to the `useForm` documentation for detailed usage information . &#8594](#)
<!-- [Refer to the `useForm` documentation for detailed usage information . &#8594](/ui-frameworks/mui/hooks/form/useForm.md) -->

✳️ You can give form property to `<Box>` component and it will render the form.

✳️ `<TextField>` is Material UI components to build form inputs.

✳️ `<Autocomplete>` is a text input that helps you find what you're looking for by suggesting options. You may refer to the [Field Components Documentation](#) to get the full information about `<Autocomplete>`,

✳️ `<Edit>` is a wrapper **refine** component for `<form>`. It provides save, delete and refresh buttons that can be used for form actions.

✳️ Form data is set automatically with `register` coming out of the`useForm` hook, whenever children inputs `<TextField>`'s are edited.

✳️ Save button submits the form by executing the `useUpdate` method provided by the [`dataProvider`](/core/providers/data-provider.md). After a successfull response, the application will be redirected to the listing page.

<br />

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="" alt="Edit record action" />
</div>
<br/>

:::
<br />

Now we can add the newly created component to our resource with `edit` prop:

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine-core";
import {
    Layout,
    ErrorComponent,
    ReadyPage,
    LightTheme,
    CssBaseline,
    ThemeProvider,
} from "@pankod/refine-mui";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

import { authProvider } from "authProvider";
// highlight-next-line
import { PostEdit, PostList, PostShow } from "pages/posts";

const API_URL = "https://api.fake-rest.refine.dev";
const App: React.FC = () => {
    const notificationProvider = notificationProviderHandle();

    return (
        <ThemeProvider theme={LightTheme}>
            <CssBaseline />
            <Refine
                authProvider={authProvider}
                routerProvider={routerProvider}
                dataProvider={dataProvider(API_URL)}
                ReadyPage={ReadyPage}
                Layout={Layout}
                catchAll={<ErrorComponent />}
                resources={[
                    {
                        name: "posts",
                        list: PostList,
                        // highlight-next-line
                        edit: PostEdit,
                        show: PostShow,
                    },
                ]}
            />
        </ThemeProvider>
    );
};
```

We are going to need an _edit_ button on each row to display the `<PostEdit>` component. **refine** doesn't automatically add one, so we have to update our `<PostList>` component to add a `<EditButton>` for each record:

```tsx title="src/pages/posts/list.tsx"
import { useOne } from "@pankod/refine-core";
import {
    useDataGrid,
    DataGrid,
    GridColumns,
    ShowButton,
    // highlight-next-line
    EditButton,
    TagField,
    DateField,
    List,
    // highlight-next-line
    Stack,
} from "@pankod/refine-mui";

import { IPost, ICategory } from "interfaces";

export const PostList: React.FC = () => {
    const columns: GridColumns = [
        { field: "title", headerName: "Title", flex: 1, minWidth: 350 },
        {
            field: "category.id",
            headerName: "Category",
            type: "number",
            minWidth: 350,
            valueGetter: (params) => {
                const { data } = useOne<ICategory>({
                    resource: "categories",
                    id: params.row.category.id,
                });
                return data?.data.title;
            },
        },
        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            renderCell: function render(params) {
                return <TagField value={params.row.status} />;
            },
        },
        {
            field: "createdAt",
            headerName: "CreatedAt",
            minWidth: 150,
            renderCell: function render(params) {
                return <DateField format="LLL" value={params.row.createdAt} />;
            },
        },
        {
            headerName: "Actions",
            field: "actions",
            minWidth: 250,
            renderCell: function render(params){
                return (
                    // highlight-start
                    <Stack direction="row" spacing={1}>
                        <EditButton
                            hideText
                            size="small"
                            variant="outlined"
                            recordItemId={params.row.id}
                        />
                        <ShowButton
                            hideText
                            size="small"
                            variant="outlined"
                            recordItemId={params.row.id}
                        />
                    </Stack>
                    // highlight-end
                );
            },
        },
    ];

    const { dataGridProps } = useDataGrid<IPost>({
        columns,
    });

    const {
        filterMode,
        filterModel,
        onFilterModelChange,
        ...restDataGridProps
    } = dataGridProps;

    return (
        <List>
            <DataGrid
                {...restDataGridProps}
                filterMode={filterMode}
                filterModel={filterModel}
                onFilterModelChange={onFilterModelChange}
                autoHeight
            />
        </List>
    );
};
```

[Refer to the `<EditButton>` documentation for detailed usage information. &#8594](#)
<!-- [Refer to the `<EditButton>` documentation for detailed usage information. &#8594](/ui-frameworks/mui/components/buttons/edit.md) -->

You can try using edit buttons which will trigger the edit forms for each record, allowing you to update the record data.

## Creating a record

Creating a record in **refine** follows a similar flow as `editing` records.

First, we'll create a `<PostCreate>` page:

```tsx title="src/pages/posts/create.tsx"
import {
    Box,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Autocomplete,
    useAutocomplete,
    FormHelperText,
    Create,
} from "@pankod/refine-mui";
import { useForm, Controller } from "@pankod/refine-react-hook-form";

import { ICategory } from "interfaces";

export const PostCreate: React.FC = () => {
    const {
        refineCore: { onFinish, formLoading },
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const { autocompleteProps } = useAutocomplete<ICategory>({
        resource: "categories",
    });

    return (
        <Create
            isLoading={formLoading}
            saveButtonProps={{ onClick: handleSubmit(onFinish) }}
        >
            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column" }}
                autoComplete="off"
            >
                <TextField
                    {...register("title", { required: true })}
                    error={!!errors?.title}
                    helperText={errors?.title?.message}
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    autoFocus
                />
                <FormControl
                    margin="normal"
                    required
                    fullWidth
                    error={!!errors?.status}
                >
                    <InputLabel id="status">Status</InputLabel>
                    <Select
                        {...register("status")}
                        labelId="status"
                        label="Status"
                        defaultValue="published"
                    >
                        <MenuItem value="published">Published</MenuItem>
                        <MenuItem value="draft">Draft</MenuItem>
                        <MenuItem value="rejected">Rejected</MenuItem>
                    </Select>
                    {errors?.status && (
                        <FormHelperText>
                            {errors?.status?.message}
                        </FormHelperText>
                    )}
                </FormControl>
                <Controller
                    control={control}
                    name="category"
                    rules={{ required: true }}
                    render={({ field }) => (
                        <Autocomplete
                            {...autocompleteProps}
                            {...field}
                            onChange={(_, value) => {
                                field.onChange(value);
                            }}
                            getOptionLabel={(item) => {
                                return item.title ? item.title : "";
                            }}
                            isOptionEqualToValue={(option, value) =>
                                value === undefined || option.id === value.id
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="items"
                                    margin="normal"
                                    variant="outlined"
                                    error={!!errors.item}
                                    helperText={errors.item && "item required"}
                                    required
                                />
                            )}
                        />
                    )}
                />
            </Box>
        </Create>
    );
};
```

We should notice some minor differences from the edit example:

✳️ `<Form>` is wrapped with `<Create>` component.

✳️ Save button submits the form by executing the `useCreate` method provided by the [`dataProvider`](/core/providers/data-provider.md).

✳️ No `defaultValue` is passed to `useSelect`.

<br />

After creating the `<PostCreate>` component, add it to resource with `create` prop:

<br />

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine-core";
import {
    Layout,
    ErrorComponent,
    ReadyPage,
    LightTheme,
    CssBaseline,
    ThemeProvider,
    notificationProvider,
} from "@pankod/refine-mui";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

import { authProvider } from "authProvider";
// highlight-next-line
import { PostCreate, PostEdit, PostList, PostShow } from "pages/posts";

const API_URL = "https://api.fake-rest.refine.dev";
const App: React.FC = () => {
    const notificationProvider = notificationProviderHandle();

    return (
        <ThemeProvider theme={LightTheme}>
            <CssBaseline />
            <Refine
                authProvider={authProvider}
                routerProvider={routerProvider}
                dataProvider={dataProvider(API_URL)}
                ReadyPage={ReadyPage}
                Layout={Layout}
                catchAll={<ErrorComponent />}
                resources={[
                    {
                        name: "posts",
                        list: PostList,
                        // highlight-next-line
                        create: PostCreate,
                        edit: PostEdit,
                        show: PostShow,
                    },
                ]}
            />
        </ThemeProvider>
    );
};
```

And that's it! Try it on the browser and see if you can create new posts from scratch.

<br />

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="" alt="Create record action" />
</div>

<br/>

## Deleting a record

Deleting a record can be done in two ways.

The first way is adding a delete button on each row since _refine_ doesn't automatically add one, so we have to update our `<PostList>` component to add a `<DeleteButton>` for each record:

```tsx title="src/pages/posts/list.tsx"
import { useOne } from "@pankod/refine-core";
import {
    useDataGrid,
    DataGrid,
    GridColumns,
    EditButton,
    ShowButton,
    // highlight-next-line
    DeleteButton,
    TagField,
    DateField,
    List,
    Stack,
} from "@pankod/refine-mui";

import { IPost, ICategory } from "interfaces";

export const PostList: React.FC = () => {
    const columns: GridColumns = [
        { field: "title", headerName: "Title", flex: 1, minWidth: 350 },
        {
            field: "category.id",
            headerName: "Category",
            type: "number",
            minWidth: 350,
            valueGetter: (params) => {
                const { data } = useOne<ICategory>({
                    resource: "categories",
                    id: params.row.category.id,
                });
                return data?.data.title;
            },
        },
        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            renderCell: function render(params) {
                return <TagField value={params.row.status} />;
            },
        },
        {
            field: "createdAt",
            headerName: "CreatedAt",
            minWidth: 150,
            renderCell: function render(params) {
                return <DateField format="LLL" value={params.row.createdAt} />;
            },
        },
        {
            headerName: "Actions",
            field: "actions",
            minWidth: 250,
            renderCell: function render(params) {
                return (
                    <Stack direction="row" spacing={1}>
                        <EditButton
                            hideText
                            size="small"
                            variant="outlined"
                            recordItemId={params.row.id}
                        />
                        <ShowButton
                            hideText
                            size="small"
                            variant="outlined"
                            recordItemId={params.row.id}
                        />
                        // highlight-start
                        <DeleteButton
                            hideText
                            size="small"
                            variant="outlined"
                            recordItemId={params.row.id}
                        />
                        // highlight-end
                    </Stack>
                );
            },
        },
    ];

    const { dataGridProps } = useDataGrid<IPost>({
        columns,
    });

    const {
        filterMode,
        filterModel,
        onFilterModelChange,
        ...restDataGridProps
    } = dataGridProps;

    return (
        <List>
            <DataGrid
                {...restDataGridProps}
                filterMode={filterMode}
                filterModel={filterModel}
                onFilterModelChange={onFilterModelChange}
                autoHeight
            />
        </List>
    );
};
```

[Refer to the `<DeleteButton>` documentation for detailed usage information. &#8594](#)
<!-- [Refer to the `<DeleteButton>` documentation for detailed usage information. &#8594](/ui-frameworks/mui/components/buttons/delete.md) -->

Now you can try deleting records yourself. Just click on the delete button of the record you want to delete and confirm.

The second way is showing delete button in `<PostEdit>` component. To show delete button in edit page, `canDelete` prop needs to be passed to resource object.

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine-core";
import {
    Layout,
    LoginPage,
    ErrorComponent,
    ReadyPage,
    LightTheme,
    CssBaseline,
    ThemeProvider,
    notificationProvider,
} from "@pankod/refine-mui";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

import { authProvider } from "authProvider";
// highlight-next-line
import { PostCreate, PostEdit, PostList, PostShow } from "pages/posts";

const API_URL = "https://api.fake-rest.refine.dev";
const App: React.FC = () => {
    const notificationProvider = notificationProviderHandle();

    return (
        <ThemeProvider theme={LightTheme}>
            <CssBaseline />
            <Refine
                authProvider={authProvider}
                routerProvider={routerProvider}
                dataProvider={dataProvider(API_URL)}
                ReadyPage={ReadyPage}
                Layout={Layout}
                catchAll={<ErrorComponent />}
                resources={[
                    {
                        name: "posts",
                        list: PostList,
                        create: PostCreate,
                        edit: PostEdit,
                        show: PostShow,
                        // highlight-next-line
                        canDelete: true,
                    },
                ]}
            />
        </ThemeProvider>
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

-   [Read about the authProvider to implement authentication for your refine application. &#8594](/core/providers/auth-provider.md)

-   [Read about the dataProvider to consume custom API's &#8594](/core/providers/data-provider.md)

-   [Read about the i18nProvider to add language support. &#8594](/core/providers/i18n-provider.md)

-   [Check the Guides & Concept section to learn generic solutions to common problems &#8594](/guides-and-concepts/upload/multipart-upload.md)

-   [Check example section for code snippets &#8594](/examples/customization/topMenuLayout.md)
