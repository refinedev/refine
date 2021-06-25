---
slug: /
id: tutorial
title: Tutorial
sidebar_label: Tutorial
---

import refineWelcome from '@site/static/img/tutorial/refine-welcome.png';
import resourceFirst from '@site/static/img/tutorial/resource-1.png';
import resourceSecond from '@site/static/img/tutorial/resource-2.png';
import createGif from '@site/static/img/tutorial/create.gif';
import editGif from '@site/static/img/tutorial/edit.gif';
import showGif from '@site/static/img/tutorial/show.gif';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Introduction

This tutorial will go through building a simple *admin panel* for a *CMS-like* application.

Step by step, you're going to learn how to consume a *REST API* and add basic CRUD functionality to your panel leveraging the unique capabilities of **refine**.

Let's begin by setting up a new **refine** project.

## Setting up

There are two alternative methods to set up a **refine** application.

The recommended way is using the [superplate](https://github.com/pankod/superplate) tool. *superplate*'s *CLI wizard* will let you create and customize your application in seconds.

Alternatively, you may use the *create-react-app* tool to create an empty *React* application and then add **refine** module via *npm*.


<Tabs
  defaultValue="superplate"
  values={[
    {label: 'use superplate', value: 'superplate'},
    {label: 'use create-react-app', value: 'create-react-app'}
  ]}>
  <TabItem value="create-react-app">


First, run the *create-react-app* tool to bootstrap an empty *React project*.

```
npx create-react-app tutorial --template typescript
```

:::note
*--template typescript* flag will ensure that the Typescript language is selected.
:::
Navigate to the project folder and install **refine** with the following *npm* command:

```
npm i @pankod/refine
``` 

Next, start your project with:

```
npm run start
```

Your **refine** application should be up and running!  
Point your browser to [http://localhost:3000](http://localhost:3000) to access it. You will see the welcome page.

<>

<div style={{textAlign: "center"}}>
    <img  width="75%" src={refineWelcome} />
</div>
<br/>
</>
  
  
  </TabItem>
  <TabItem value="superplate">
  

First, run the **superplate** with the following command:

```
npx superplate-cli@alpha tutorial
```

Select the following options to complete the *CLI wizard*:

``` 
? Select your project type:
❯ refine

? What will be the name of your app:
tutorial

? Package manager:
❯ Npm

? Do you want to customize the theme?:
❯ No (Ant Design default theme)

? Data Provider :
❯ Custom JSON rest API

? Auth Provider : 
❯ Custom

? Do you want to add an example page?:
❯ No

? i18n - Internationalization: 
❯ No
```

Next, navigate to the project folder and start your project with:

```
npm run dev
```

Your **refine** application should be up and running!  
Point your browser to [http://localhost:3000](http://localhost:3000) to access it. You will see the welcome page.

<>

<div style={{textAlign: "center"}}>
    <img  width="75%" src={refineWelcome} />
</div>
<br/>
</>
  
</TabItem>
</Tabs>


## About Fake REST API

**refine** is designed to consume data from APIs. 

For the sake of this tutorial, we will provide you a fully working, *fake REST API* located at https://api.fake-rest.refine.dev/. You may take a look at available [resources and routes of the API](https://api.fake-rest.refine.dev/) before proceeding to the next step.


## Using a Dataprovider

Dataproviders are **refine** components making it possible to consume different API's and data services conveniently. To consume our *Fake REST API*, we'll use the **"Simple REST Dataprovider"**.

Run the following command to install the required package:

```
npm i @pankod/refine-json-server
```

:::note

Fake REST API is based on [JSON Server Project](https://github.com/typicode/json-server). **Simple REST Dataprovider** is fully compatible with the REST rules and methods of the **JSON Server**.

:::
:::note

**refine** includes many out-of-the-box data providers to use in your projects like

* Simple REST API
* NestJS CRUD
* Strapi etc.

Please refer to the documentation if you need connecting to a custom data source by creating your Dataprovider.

:::


## Bootstrapping the App

Replace the contents of `App.tsx` with the following code:

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine";
import dataProvider from "@pankod/refine-json-server";
import "@pankod/refine/dist/styles.min.css";

const App: React.FC = () => {
    return (
        <Refine
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
        />
    );
};

export default App;
```

<br/>

`<Refine/>` is the root component of a **refine** application. Using the `dataprovider` prop, we made our **Simple REST Dataprovider** available to the entire application.

## Adding Resources

Now we are ready to start connecting to our API by adding a `<Resource>` to our application. 

Let's add **/posts/** endpoint from our API as a `<Resource />`. First take a look to the raw API response for the request made to the **/posts/** route: 

<details><summary>Show response</summary>
<p>

```ts title="GET https://refine-fake-rest.pankod.com/posts/"
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
//highlight-next-line
import { Refine, Resource } from "@pankod/refine";
import dataProvider from "@pankod/refine-json-server";

export const App: React.FC = () => {
    return (
        <Refine dataProvider={dataProvider("https://api.fake-rest.refine.dev")}>
            //highlight-next-line
            <Resource name="posts" />
        </Refine>
    );
};
```

<br/>

:::info
A `<Resource/>` is a child component of `<Admin/>` representing an API Endpoint. The `name` property of `<Resource/>` should match one of the endpoints in your API!
:::

Instead of showing the welcome page, the application should redirect now to an URL defined by the `name` property. Open your application to confirm that the URL is routed to **/resources/posts**:

<>

<div style={{textAlign: "center"}}>
    <img   src={resourceFirst} />
</div>
<br/>
</>

You'll still see a **404** error page because no **Page** component is assigned to our `<Resource>` yet. 

:::note
A `<Resource>` uses **Page** components to handle data and perform rendering. **Page** components are passed to a `<Resource>` using props.
For basic *CRUD* operations, there are **four** predefined props: **list**, **create**, **edit** and **show**.
:::

Let's create a **Page** component to fetch **posts** and display them as a table. Later, we will pass the component as the **list** prop to our `<Resource>`.

## Creating a List Page 

First, we'll need an interface to work with the data from the API endpoint. 

Create a new folder *"interface"* under *"/src"* if you don't already have one. Then create a *"index.d.ts"* file with the following code:

```ts title="interfaces/index.d.ts"
export interface IPost {
    title: string;
    status: "published" | "draft" | "rejected";
    createdAt: string;
}
```

We'll be using **title**, **status** and **createdAt** fields of every **post** record.

Now, create a new folder *"pages/posts"* under *"/src"*. Under that folder, create a *"list.tsx"* file with the following code:

```tsx title="pages/posts/list.tsx"
import {
    List,
    TextField,
    TagField,
    DateField,
    Table,
    useTable,
} from "@pankod/refine";
import { IPost } from "interfaces";

export const PostList: React.FC = () => {
    const { tableProps } = useTable<IPost>();
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
            </Table>
        </List>
    );
};
```

<br/>

Let's break down the `<PostList/>` component to understand what's going on here:

✳️ `<Table/>` is a native **Ant Design** component. It renders records row by row as a table. 
`<Table/>` expects a `rowKey` prop as the unique key of the records. 

:::note
**refine** uses [Ant Design](https://ant.design/components/overview/) components to render data. 
You may refer to [Ant Design Docs](https://ant.design/components/table/#API) for further information about the `<Table/>` component.
:::

✳️  `useTable<IPost>();` is passed to the `<Table/>` component as `{...tableProps}`. 

This is the point where the ✨real magic✨  happens!

**refine** hook `useTable()` fetches data from API and wraps them with various helper hooks required for the `<Table/>` component. Data interaction functions like **sorting**, **filtering**, and **pagination** will be instantly available on the `<Table/>` with this single line of code.

:::note
**refine** depends heavily on hooks and `useTable()` is only one among many others.
On [useTable() Documentation](api-references/hooks/table/useTable.md) you may find more information about the usage of this hook.
:::

✳️ `<Table.Column>` components are used for mapping and formatting each field shown on the `<Table/>`. `dataIndex` prop maps the field to a matching key from the API response. `render` prop is used to choose the appropriate **Field** component for the given data type. 

:::note
The example uses `<TagField>` and `<DateField>` components. To get the full list of available components, you may refer to the [Field Components Documentation](#).
:::

✳️ `<List>` is a **refine** component. It acts as a wrapper to `<Table>` to add some extras like *Create Button* and *title*. 
 
Finally, we are ready to add `<PostList>` to our `<Resource>`. Add the highlighted line to your `App.tsx`

```tsx title="src/App.tsx"
import { Refine, Resource } from "@pankod/refine";
import dataProvider from "@pankod/refine-json-server";
//highlight-next-line
import { PostList } from "./pages";

export const App: React.FC = () => {
    return (
        <Refine dataProvider={dataProvider("https://api.fake-rest.refine.dev")}>
            //highlight-next-line
            <Resource name="posts" list={PostList} />
        </Refine>
    );
};
```

<br />

Open your application in your browser. You will see **posts** are displayed correctly in a table structure and event the pagination works out-of-the box. 

On the next step, we are going to add a category field to the table which involves handling data relationships. 

<>
<div style={{textAlign: "center"}}>
    <img src={resourceSecond} />
</div>
<br/>
</>

<br/><br/><br/><br/><br/>


## Handling relationships

Let's say we want to show title of category at `<PostList>`.

[Each post record](#providing-a-data-source-with-an-api) includes a category property that has an id field, which points to a category:

```ts title="https://api.fake-rest.refine.dev/posts/1"
...
  "category": {
    "id": 26
  }
...
```

<br />

Each category id references a record at `api.fake-rest.refine.dev/categories` endpoint.

```ts title="https://api.fake-rest.refine.dev/categories/26"
  {
    "id": 26,
    "title": "mock category title",
  }
```

<br />

In order to get data from a different resource, we can use a refine hook named `useMany`.

```tsx title="pages/posts/list.tsx"
import {
    List,
    TextField,
    TagField,
    DateField,
    Table,
    useTable,
    //highlight-next-line
    useMany,
} from "@pankod/refine";

//highlight-next-line
import { IPost, ICategory } from "interfaces";

export const PostList: React.FC = () => {
    const { tableProps } = useTable<IPost>();

    //highlight-start
    const categoryIds =
        tableProps?.dataSource?.map((item) => item.category.id) ?? [];
    const { data: categoriesData, isLoading } = useMany<ICategory>(
        "categories",
        categoryIds,
        {
            enabled: categoryIds.length > 0,
        },
    );
    //highlight-end

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
                //highlight-start
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
                />
                //highlight-end
            </Table>
        </List>
    );
};
```

```ts title="interfaces/index.d.ts"
// highlight-start
export interface ICategory {
    id: string;
    title: string;
}
// highlight-end

export interface IPost {
    title: string;
    status: "published" | "draft" | "rejected";
    // highlight-next-line
    category: ICategory;
    createdAt: string;
}
```

:::tip
We can reach nested properties of table data by using an array.

```
 dataIndex={["category", "id"]}
```

:::

<br />

`useMany` expects the external resource endpoint and an array of ids. It fetches and returns data with loading status.

We collect `categoryId`' s from list data at `/posts` endpoint and send to `useMany`.

:::note

```tsx
enabled: categoryIds.length > 0;
```

We set a condition to start fetching only when data is available.
:::

To show category title field, find the title corresponding to the category id of the current record in data returned by `useMany`,

[Refer to `useMany` documentation for detailed usage. &#8594](api-references/hooks/data/useMany.md)

## Editing a record

We'll implement a page for editing an existing record.

Let's create a `<PostEdit>` component to edit an existing post. This component will be passed as `list` prop to `<Resource>`.

```tsx title="pages/posts/edit.tsx"
import { useForm, Form, Input, Select, Edit, useSelect } from "@pankod/refine";
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
                    <Select {...categForySelectProps} />
                </Form.Item>
            </Form>
        </Edit>
    );
};
```

<br />

After creating the `<PostEdit>` component, now it's time to add it to `<Resource>`.

<br />

```tsx title="src/App.tsx"
import { Refine, Resource } from "@pankod/refine";
import dataProvider from "@pankod/refine-json-server";
//highlight-next-line
import { PostList, PostEdit } from "./pages";

export const App: React.FC = () => {
    return (
        <Refine dataProvider={dataProvider("https://api.fake-rest.refine.dev")}>
            <Resource
                name="posts"
                list={PostList}
                //highlight-next-line
                edit={PostEdit}
            />
        </Refine>
    );
};
```

<br />

:::important
refine doesn't automatically add an _**edit**_ button by default to each record in `<PostList>` to give access to the edit page which renders the `<PostEdit>` component.

We' ll add a new column to `<Table>` in `<PostList>` to show the action button for edit.
`<EditButton>` from refine can be used to navigate to edit page at `/resources/posts/edit`.

You can find detailed usage of `<EditButton>` from [here](api-references/components/buttons/edit.md).

<br />

```tsx title="components/pages/posts.tsx"
import {
    ...
    //highlight-start
    Space,
    EditButton
    //highlight-end
} from "@pankod/refine";

export const PostList: React.FC = () => {
...
    <Table.Column<IPost>
        title="Actions"
        dataIndex="actions"
        render={(_text, record): React.ReactNode => {
            return (
                <Space>
                    <EditButton
                        size="small"
                        recordItemId={record.id}
                    />
                </Space>
            );
        }}
    />
...
}
```

:::

### Managing the form

`useForm` is another skillful hook from refine that is responsible for managing form data like creating and editing.

```tsx
const { formProps, saveButtonProps } = useForm<IPost>();
```

The `formProps` includes all necessary props for `<Form>` component to manage form data properly.
Similarly `saveButtonProps` includes useful properties for a button to submit a form.

[Refer to `useForm` documentation for detailed usage. &#8594](api-references/hooks/form/useForm.md)

`useSelect` produces props for `<Select>` component from data at another resource. `<Select>` is an Ant Design component that is exported from refine for convenience.

[Refer to `Select` documentation for detailed usage. &#8594](https://ant.design/components/select/)

```tsx
const { selectProps: categorySelectProps } = useSelect<IPost>({
    resource: "categories",
    defaultValue: queryResult?.data?.data?.category.id,
});
```

:::important
`defaultValue` is used to get the value for the current item independent of search, sort and filter parameters.
:::

[Refer to `useSelect` documentation for detailed usage. &#8594](api-references/hooks/field/useSelect.md)

### Editing the form

refine apps uses [Ant Design form components](https://ant.design/components/form/) to handle form management. In this example, we'll use `<Form>` and `<Form.Item>` component, which is exposed from Ant Design to manage form inputs.

We wrap `<Form>` with [`<Edit>`](#) component from refine that provides save, delete and refresh buttons that can be used for form actions.

:::caution Attention
In edit page, `useForm` hook initializes the form with current record values.
:::

We are getting form values from inputs by passing them as child to `<Form.Item>`. Edited input values are automatically set to form data.

Save button submits the form and when clicked it executes the `useUpdate` method provided by the `dataProvider`. After request responses successfully, app will be navigated to listing page on `resources/posts` with updated data.

[Refer to **How editing works?** section for in depth explanation. &#8594](#)

<br />

<>

<div style={{textAlign: "center"}}>
    <img src={editGif} />
</div>
<br/>
</>

<br />

## Creating a record

We'll implement a page for creating a new record using fake REST API. It has a similar implemantation and managing form methods like [Editing a record](#editing-a-record).

First create a `<PostCreate>` component to create a new post. This component will be passed as `create` prop to `<Resource>`.

```tsx title="pages/posts/create.tsx"
import {
    ...
    //highlight-next-line
    Create
} from "@pankod/refine";
import { IPost } from "interfaces";

export const PostCreate = () => {
    const { formProps, saveButtonProps } = useForm<IPost>();

    const { selectProps: categorySelectProps } = useSelect<IPost>({
        resource: "categories",
    });

    return (
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
            </Form>
        </Create>
    );
};
```

<br />

After creating the `<PostCreate>` component, add it to `<Resource>`.

<br />

```tsx title="src/App.tsx"
import { Refine, Resource } from "@pankod/refine";
import dataProvider from "@pankod/refine-json-server";
//highlight-next-line
import { PostList, PostEdit, PostCreate } from "./pages";

export const App: React.FC = () => {
    return (
        <Refine dataProvider={dataProvider("https://api.fake-rest.refine.dev")}>
            <Resource
                name="posts"
                list={PostList}
                edit={PostEdit}
                //highlight-next-line
                create={PostCreate}
            />
        </Refine>
    );
};
```

<br />

### Filling the form

This part is very similar to [Editing the form](#editing-the-form). Only differences are:

-   We wrap `<Form>` with [`<Create>`](#) component from refine.

-   Save button submits the form and executes the `useCreate` method provided by the `dataProvider`.

-   Since there can't be a pre-selected value in a create form, we don't pass a `defaultValue` parameter to `useSelect`.

<br />

<div style={{textAlign: "center"}}>
    <img src={createGif} />
</div>
<br/>

<br/>

## Showing a record

Let's implement a page for showing an existing record in detail.

First create a `<PostShow>` component to show an existing post. This component will be passed as `show` prop to `<Resource>`.

```tsx title="pages/posts/show.tsx"
import {
    //highlight-start
    Show,
    useShow,
    Typography,
    Tag,
    useOne,
    //highlight-end
} from "@pankod/refine";
import { IPost, ICategory } from "interfaces";

const { Title, Text } = Typography;

export const PostShow = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;
    const record = data?.data;

    const { data: categoryData } = useOne<ICategory>(
        "categories",
        record?.category.id || "",
        {
            enabled: !!record?.category.id,
        },
    );

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

After creating the `<PostShow>` component, add it to `<Resource>`.

<br />

```tsx title="src/App.tsx"
import { Refine, Resource } from "@pankod/refine";
import dataProvider from "@pankod/refine-json-server";
//highlight-next-line
import { PostList, PostEdit, PostCreate, PostShow } from "./pages";

export const App: React.FC = () => {
    return (
        <Refine dataProvider={dataProvider("https://api.fake-rest.refine.dev")}>
            <Resource
                name="posts"
                list={PostList}
                edit={PostEdit}
                create={PostCreate}
                //highlight-next-line
                show={PostShow}
            />
        </Refine>
    );
};
```

### Fetching record data

```tsx
const { queryResult } = useShow<IPost>();
```

`useShow` is another skillful hook from refine that is responsible for fetching a single record data.

The `queryResult` includes fetched data and query state like `isLoading` state.

[Refer to `useShow` documentation for detailed usage. &#8594](#)

```tsx
const { data: categoryData } = useOne<ICategory>(
    "categories",
    record?.category.id ?? "",
    {
        enabled: !!record?.category.id,
    },
);
```

`useOne` is a low level hook from refine that is also responsible for fetching a single record data for any given resource.

Here, `useOne` is used to fetch a record data from `/resources/categories`.

[Refer to `useOne` documentation for detailed usage. &#8594](api-references/hooks/data/useOne.md)

:::caution attention
Difference between `useOne` and `useShow` is that `useShow` is tuned for fetching data from current resource.
:::

### Showing the data

Since record data is explicit, there is no constraint on how to present that data. refine provides a `<Show>` wrapper component that provides extra features like a `list` and a `refresh` buttons.

[Refer to `<Show>` documentation for detailed usage. &#8594](#)

<br />

<div style={{textAlign: "center"}}>
    <img src={showGif} />
</div>
<br/>

<br />

## Adding search and filters

We'll use`<Table.Column>`'s [`filterDropdown`](https://ant.design/components/table/#Column) property from Ant Design and `<FilterDropdown>` component from refine to search and filter content.

Let's add search and filter feature to category field.

```tsx title="pages/posts/list.tsx"
import {
    ...
    //highlight-start
    FilterDropdown,
    Select,
    useSelect
    //highlight-end
} from "@pankod/refine";
import { ICategory } from "interfaces";

export const PostList: React.FC = () => {
    ...

    //highlight-start
    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "categories",
    });
     //highlight-end

    return (
        <List>
            <Table {...tableProps} rowKey="id">
               ...
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
                    //highlight-start
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
                    //highlight-end
                />
               ...
            </Table>
        </List>
    );
};
```

```tsx title="/src/interfaces/index.d.ts"
export interface ICategory {
    id: string;
    title: string;
}
```

`<FilterDropdown>` component serves as a bridge between its child input and refine's `useTable` hook.

It transfers child's input value to `useTable` hook using `filterDropdown`'s embedded props and provides a filter button to start filtering functionality.

[Refer to `<FilterDropdown>` documentation for detailed usage. &#8594](#)

In order to let user choose or search a category to filter, we get all categories as `categorySelectProps` using `useSelect` hook and set to `<Select>`.

## Connecting to a real API

At this point we have an app with basic features implemented using a fake REST API.

[Refer to `dataProvider` documentation for how to connect your own api to `refine`. &#8594](api-references/providers/data-provider.md)

## Conclusion

Core functionality of refine is based heavily on hooks. This way it provides a wide range of flexibility on data management and UI structure.

You can develop new features or modify existing behavior based on your needs on top of refine codebase.

## Live Codesandbox Example

<iframe src="https://codesandbox.io/embed/refine-tutorial-cmqrr?autoresize=1&fontsize=14&module=%2Fsrc%2FApp.tsx&theme=dark&view=preview"
    style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
    title="refine-tutorial"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
