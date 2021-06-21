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

We'll show how to create a simple **refine** app with CRUD operations based on REST API.

## Setup

**refine** uses React under the hood. We’ll use create-react-app to bootstrap an empty React app with Typescript.

To create a new app, run the following commands:

```
npx create-react-app tutorial --template typescript
```

```
npm i @pankod/refine
```

Then navigate to the project folder and launch it:

```
npm run start
```

Then open [http://localhost:3000](http://localhost:3000) to see your app.

## Providing a data source with an API

refine is designed to consume data from APIs.

We’ll be using a fake REST API at https://api.fake-rest.refine.dev/ designed for testing as the data source for the application.

Example response:

```ts title="https://api.fake-rest.refine.dev/posts/1"
{
  "id": 1,
  "title": "Quis a ex quos.",
  "slug": "eligendi-similique-autem",
  "content": "Sapiente et nesciunt harum corrupti sequi iusto. Debitis explicabo beatae maiores assumenda. Quia velit quam inventore omnis in doloribus et modi aut. Aut deserunt est molestias sunt fugit rerum natus. Consequuntur quam porro doloribus vel nulla non. Suscipit ut deleniti. Consequatur repellat accusamus. Expedita eos hic amet fugit. Magni odio consequatur aut pariatur error eaque culpa. Officiis minus id et.",
  "category": {
    "id": 26
  },
  "user": {
    "id": 32
  },
  "status": "draft",
  "createdAt": "2019-07-25T22:19:18.929Z",
  "image": [],
  "tags": [ 7 ],
  "language": 2
}
```

refine requires a `dataProvider` to use an API for CRUD operations which is an object with a set of certain methods.

We'll use `@pankod/refine-json-server` package as a [data provider](api-references/providers/data-provider.md) which has predefined methods to communicate with REST APIs.

```
npm i @pankod/refine-json-server
```

:::note
You can also provide your own custom [data provider](api-references/providers/data-provider.md) to make the connection.
:::

## Bootstraping the app

Change `App.tsx` with the following code:

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine";
import dataProvider from "@pankod/refine-json-server";
import "@pankod/refine/dist/styles.min.css";

export const App: React.FC = () => {
    return (
        <Refine
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
        />
    );
};
```

<br/>

`<Refine/>` is the root component of a refine application. We provide a `dataProvider` with a REST API url as we mention above.

You will see the welcome page.

<>

<div style={{textAlign: "center"}}>
    <img  width="75%" src={refineWelcome} />
</div>
<br/>
</>

:::tip

```tsx
import "@pankod/refine/dist/styles.min.css";
```

[Refer to theme documentation for further information about importing the default css. &#8594](theme.md)
:::

## Connect API with Resources

We'll start forming our app by adding a `<Resource>` component as a child.
A `<Resource>` represents an endpoint in the API by given name property. `name` property of `<Resource />` should be one of the endpoints in your API.

We'll demonstrate how to get data at `/posts` endpoint from `https://api.fake-rest.refine.dev` REST API.

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

After adding `<Resource>`, app redirects to a url defined by `name` property.

:::info
refine handles route matching out of the box. More info about [routing](#).
:::

<>

<div style={{textAlign: "center"}}>
    <img   src={resourceFirst} />
</div>
<br/>
</>

You'll see a 404 page since `<Resource>` doesn't handle data fetching on its own. CRUD operations is to be done with refine hooks.

Components for CRUD operations(list, create, edit, show) should be given to `<Resource>` as props. In this example, we are going to set corresponding custom components to `<Resource>` which uses refine hooks to handle data operations and display the list of data.

## Showing and interacting with data

Let's create a `PostList` component to fetch and show posts data. This component will be passed as `list` prop to `<Resource>`

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

```ts title="interfaces/index.d.ts"
export interface IPost {
    title: string;
    status: "published" | "draft" | "rejected";
    createdAt: string;
}
```

<br/>

### Fetching and managing data

`useTable` is a hook from refine that is responsible for fetching data from API with `<Resource>`'s `name` prop using refine's various helper hooks under the hood.

```tsx
const { tableProps } = useTable<IPost>();
```

The `tableProps` includes all necessary props for `<Table>` component to show and interact with data properly.

You can find detailed usage of `useTable` from [here](api-references/hooks/table/useTable.md).

### Showing and formatting data

We wrap `<Table>` with [`<List>`](#) component from refine, which adds extra functionalities like a create button and title to the table view.

:::tip
`<List>` is not an obligation at this point. You can prefer to use your own wrapper component.
:::

refine apps uses [Ant Design](https://ant.design/components/overview/) components to display data. In this example, we'll use `<Table>` component, which is exposed from Ant Design to render a table with one row for each record.

[Refer to Ant Design docs for more detailed information about `<Table>`. &#8594](https://ant.design/components/table/#API)

The render prop of `<Table.Column>` is used to determine how to format and show data. Each `<Table.Column>` maps a different field in the API response, specified by the `dataIndex` prop.

:::note

```tsx
<Table.Column
    // highlight-next-line
    dataIndex="title"
    title="title"
    // highlight-next-line
    render={(value) => <TextField value={value} />}
/>
```

`value` of render props points to data with key described by `dataIndex`.
:::

We used `<TextField>`, `<TagField>` and `<DateField>` in `<Table.Column>` to show data in the proper format. These are examples of many more field components from refine that are based on ant design components.
User has full freedom on how to format and show raw data that comes from render prop including ant design components or custom components.

You can find detailed usage of fields from [here](#).

After creating the `<PostList>` component, now it's time to add it to `<Resource>`.

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

We can now list `/posts` data successfully as shown below.

<>

<div style={{textAlign: "center"}}>
    <img src={resourceSecond} />
</div>
<br/>
</>

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
