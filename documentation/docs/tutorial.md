---
slug: /
id: tutorial
title: Tutorial
sidebar_label: Tutorial
---

import refineWelcome from '@site/static/img/refine-welcome.png';
import resourceFirst from '@site/static/img/resource-1.png';
import resourceSecond from '@site/static/img/resource-2.png';
import createGif from '@site/static/img/create.gif';
import editGif from '@site/static/img/edit.gif';
import showGif from '@site/static/img/show.gif';

We'll show how to create a simple admin app with CRUD operations based on an existing REST API.

## Setup

Refine uses React under the hood. We’ll use create-react-app to bootstrap an empty React app with Typescript.

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

Then open http://localhost:3000/ to see your app.

## Providing a data source with an API

Refine is designed to consume data from APIs.

We’ll be using a fake REST API at https://readmin-fake-rest.pankod.com/ designed for testing as the data source for the application.

Example response:

```ts title="https://readmin-fake-rest.pankod.com/posts/1"
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
  "image": []
}
```

Refine requires a `dataProvider` to use an API for CRUD operations which is an object with a set of certain methods.

We'll use `@pankod/refine-json-server` package as a data provider which has predefined methods to communicate with REST APIs.

```
npm i @pankod/refine-json-server
```

:::note
You can also provide your own custom data provider to make the connection.
:::

## Bootstraping the app

Change `App.tsx` with the following code:

```tsx title="src/App.tsx"
import { Admin } from "@pankod/refine";
import dataProvider from "@pankod/refine-json-server";

function App() {
    return (
        <Admin
            dataProvider={dataProvider("https://readmin-fake-rest.pankod.com/")}
        />
    );
}

export default App;
```

<br/>

`<Admin/>` is the root component of a refine application. We provide a `dataProvider` with a REST API url as we mention above.

You will see the welcome page.

<>

<div style={{textAlign: "center"}}>
    <img  width="75%" src={refineWelcome} />
</div>
<br/>
</>

## Connect API with Resources

We'll start forming our app by adding a `<Resource>` component as a child.
A `<Resource>` represents an endpoint in the API by given name property. `name` property of `<Resource />` should be one of the endpoints in your API.

We'll demonstrate how to get data at `/posts` endpoint from `https://readmin-fake-rest.pankod.com` REST API.

```tsx title="src/App.tsx"
//highlight-next-line
import { Admin, Resource } from "@pankod/refine";
import dataProvider from "@pankod/refine-json-server";

function App() {
    return (
        <Admin
            dataProvider={dataProvider("https://readmin-fake-rest.pankod.com/")}
        >
            //highlight-next-line
            <Resource name="posts" />
        </Admin>
    );
}

export default App;
```

<br/>

After adding `<Resource>`, app redirects to a url defined by `name` property.

:::info
`refine` handles route matching out of the box. More info about [routing](#).
:::

<>

<div style={{textAlign: "center"}}>
    <img   src={resourceFirst} />
</div>
<br/>
</>

You'll see a 404 page since `<Resource>` doesn't handle data fetching on its own. CRUD operations is to be done with `refine` hooks.

Components for CRUD operations(list, create, edit, show) should be given to `<Resource>` as props. In this example, we are going to set corresponding custom components to `<Resource>` which uses `refine` hooks to handle data operations and display the list of data.

## Showing and interacting with data

Let's create a `PostList` component to fetch and show posts data. This component will be passed as `list` prop to `<Resource>`

```tsx title="components/pages/posts.tsx"
import {
    List,
    TextField,
    TagField,
    DateField,
    Table,
    useTable,
} from "@pankod/refine";

export const PostList = () => {
    const { tableProps } = useTable({});

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    dataIndex="title"
                    title="title"
                    render={(value) => <TextField value={value} />}
                />
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

### Fetching and managing data

`useTable` is a hook from `refine` that is responsible for fetching data from API with `<Resource>`'s `name` prop using `refine`'s various helper hooks under the hood.

```tsx
const { tableProps } = useTable({});
```

The `tableProps` includes all necessary props for `<Table>` component to show and interact with data properly.

You can find detailed usage of `useTable` from [here](#).

### Showing and formatting data

We wrap `<Table>` with [`<List>`](#) component from `refine`, which adds extra functionalities like a create button and title to the table view.

:::tip
`<List>` is not an obligation at this point. You can prefer to use your own wrapper component.
:::

`refine` apps uses [ant-design](https://ant.design/components/overview/) components to display data. In this example, we'll use `<Table>` component, which is exposed from ant-design to render a table with one row for each record.

Refer to [ant-design docs](https://ant.design/components/table/#API) for more detailed information about `<Table>`.

The render prop of `<Table.Column>` is used to determine how to format and show data. Each `<Table.Column>` maps a different field in the API response, specified by the `dataIndex` prop.

We used `<TextField>`, `<TagField>` and `<DateField>` in `<Table.Column>` to show data in the proper format. These are examples of many more field components from `refine` that are based on ant design components.  
User has full freedom on how to format and show raw data that comes from render prop including ant design components or custom components.

You can find detailed usage of fields from [here](#).

After creating the `<PostList>` component, now it's time to add it to `<Resource>`.

```tsx title="src/App.tsx"
import { Admin, Resource } from "@pankod/refine";
import dataProvider from "@pankod/refine-json-server";
//highlight-next-line
import { PostList } from "./components/pages/posts";

function App() {
    return (
        <Admin
            dataProvider={dataProvider("https://readmin-fake-rest.pankod.com/")}
        >
            //highlight-next-line
            <Resource name="posts" list={PostList} />
        </Admin>
    );
}

export default App;
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

Let's say we want to show category title at `<PostList>`.  

[Each post record](#providing-a-data-source-with-an-api) includes a category property that has an id field, which points to a category:


```ts title="https://readmin-fake-rest.pankod.com/posts/1"
...
  "category": {
    "id": 26
  }
...
```
<br />

Each category id references a record at `readmin-fake-rest.pankod.com/categories` endpoint.


```ts title="https://readmin-fake-rest.pankod.com/categories/26"
...
  { 
    "id": 26,
    "title": "mock category title",
  }
...
```
<br />

In order to get data from a different resource, we can use a `refine` hook named `useMany`.

```tsx title="components/pages/posts.tsx"
import {
    List,
    TextField,
    TagField,
    DateField,
    Table,
    useTable,
    //highlight-next-line
    useMany
} from "@pankod/refine";

 //highlight-start
interface ICategory {
    id: string;
    title: string;
}
 //highlight-end

export const PostList = () => {
    const { tableProps } = useTable({});

   //highlight-start
    const categoryIds = tableProps?.dataSource?.map((item) => item.category.id) ?? [];
    const { data, isLoading } = useMany<ICategory>(
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
                <Table.Column
                    dataIndex="title"
                    title="title"
                    render={(value) => <TextField value={value} />}
                />
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
                                    data?.data.find((item) => item.id === value)
                                        ?.title
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


:::tip
We can reach nested properties by using an array.

```
 dataIndex={["category", "id"]}
```
:::

<br />

`useMany` expects the external resource endpoint and an array of ids. It fetches and returns data with loading status.

To show category title field, find the title corresponding to the id in data returned by `useMany`, 

[Refer to `useMany` documentation for detailed usage. &#8594](#)








## Editing a record

We'll implement a page for editing an existing record.

Let's create a `<PostEdit>` component to edit an existing post. This component will be passed as `list` prop to `<Resource>`.

```tsx title="components/pages/posts.tsx"
import { 
    ...
    //highlight-start
    useForm, 
    Edit, 
    Form, 
    Input, 
    Select
     //highlight-end 
} from "@pankod/refine";

export const PostList = () => { 
    ...
}

export const PostEdit = () => {
    const { formProps, saveButtonProps } = useForm({});

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} wrapperCol={{ span: 14 }} layout="vertical">
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
                        ]}
                    />
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
import { Admin, Resource } from "@pankod/refine";
import dataProvider from "@pankod/refine-json-server";
//highlight-next-line
import { PostList, PostEdit } from "./components/pages/posts";

function App() {
    return (
        <Admin
            dataProvider={dataProvider("https://refine-fake-rest.pankod.com/")}
        >
            <Resource
                name="posts"
                list={PostList}
                //highlight-next-line
                edit={PostEdit}
            />
        </Admin>
    );
}

export default App;
```

<br />

:::important
`refine` doesn't automatically add an _**edit**_ button by default to each record in `<PostList>` to give access to the edit page which renders the `<PostEdit>` component.

We' ll add a new column to `<Table>` in `<PostList>` to show the action button for edit.   
 `<EditButton>` from refine can be used to navigate to edit page at `/resources/posts/edit`.

You can find detailed usage of `<EditButton>` from [here](#).

<br />


```tsx title="components/pages/posts.tsx"
import {
    ...
    //highlight-start
    Space,
    EditButton
    //highlight-end
} from "@pankod/refine";

export const PostList = () => {
...
    <Table.Column
        title="Actions"
        dataIndex="actions"
        render={(
            _text: string | number,
            record: {
                id: string | number;
            },
        ): React.ReactNode => {
            return(
                <Space>
                    <EditButton size="small" recordItemId={record.id} />
                </Space>
        )}}
    />   
...
}
```

:::

### Managing the form

`useForm` is another skillful hook from `refine` that is responsible for managing form data like creating and editing.

```tsx
const { formProps, saveButtonProps } = useForm({});
```

The `formProps` includes all necessary props for `<Form>` component to manage form data properly.
Similarly `saveButtonProps` includes usefull properties for a button to submit a form.

[Refer to `useForm` documentation for detailed usage. &#8594](#)

### Editing the form

`refine` apps uses [ant-design form components](https://ant.design/components/form/) to handle form management. In this example, we'll use `<Form>` and `<Form.Item>` component, which is exposed from ant-design to manage form inputs.

We wrap `<Form>` with [`<Edit>`](#) component from `refine` that provides save, delete and refresh buttons that can be used for form actions.

:::caution Attention
In edit page, `useForm` hook initializes the form with current record values.
:::

We are getting form values from inputs by passing them as child to `<Form.Item>`. Edited input values are automatically set to form data.

Save button submits the form and issues a `PUT` request to the REST API when clicked. After request responses successfully, app will be navigated to listing page on `resources/posts` with updated data.


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

```tsx title="components/pages/posts.tsx"
import { 
    ...
    //highlight-next-line
    Create 
} from "@pankod/refine";

export const PostList = () => { 
    ...
}

export const PostEdit = () => { 
    ...
}

export const PostCreate = () => {
    const { formProps, saveButtonProps } = useForm({});

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} wrapperCol={{ span: 14 }} layout="vertical">
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
import { Admin, Resource } from "@pankod/refine";
import dataProvider from "@pankod/refine-json-server";
//highlight-next-line
import { PostList, PostEdit, PostCreate } from "./components/pages/posts";

function App() {
    return (
        <Admin
            dataProvider={dataProvider("https://refine-fake-rest.pankod.com/")}
        >
            <Resource
                name="posts"
                list={PostList}
                edit={PostEdit}
                //highlight-next-line
                create={PostCreate}
            />
        </Admin>
    );
}

export default App;
```

<br />

:::important
`refine` doesn't automatically add a _**create**_ button by default on top of the `<PostList>` to give access to the create page which renders the `<PostCreate>` component.

Each component given to `<Resource>` will get passed props with `IResourceComponentsProps` interface. If this props are passed to `<List>` wrapper in `<PostList>` component, `<List>` will render a create button in case a `create` component is passed to `<Resource>`.

[More about **IResourceComponentsProps** &#8594](#)

```tsx title="components/pages/posts.tsx"
...
//highlight-next-line
export const PostList = (props: IResourceComponentsProps) => {
    const { tableProps } = useTable({});

    return (
        //highlight-next-line
        <List {...props}>
...
```

:::

<br />


### Filling the form

This part is very similar to [Editing the form](#editing-the-form). Only differences are:

- We wrap `<Form>` with [`<Create>`](#) component from `refine`.

- Save button submits the form and issues a `POST` request to the REST API.

<br />

<div style={{textAlign: "center"}}>
    <img src={createGif} />
</div>
<br/>

<br/>

## Showing a record

Let's implement a page for showing an existing record in detail.

First create a `<PostShow>` component to show an existing post. This component will be passed as `show` prop to `<Resource>`.

```tsx title="components/pages/posts.tsx"
import {
    ...
    //highlight-start 
    Show, 
    useShow, 
    Typography, 
    Tag, 
    ShowButton
    //highlight-end
} from "@pankod/refine";

export const PostList = () => { 
    ...
}

export const PostEdit = () => { 
    ...
}

export const PostCreate = () => { 
    ...
}

export const PostShow = () => {
    const { queryResult } = useShow({});
    const { data, isLoading } = queryResult;
    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>Title</Title>
            <Text>{record?.title}</Text>

            <Title level={5}>Status</Title>
            <Tag>{record?.status}</Tag>
        </Show>
    )
}
```

<br />

After creating the `<PostShow>` component, add it to `<Resource>`.

<br />

```tsx title="src/App.tsx"
import { Admin, Resource } from "@pankod/refine";
import dataProvider from "@pankod/refine-json-server";
//highlight-next-line
import { PostList, PostEdit, PostCreate, PostShow } from "./components/pages/posts";

function App() {
    return (
        <Admin
            dataProvider={dataProvider("https://refine-fake-rest.pankod.com/")}
        >
            <Resource
                name="posts"
                list={PostList}
                edit={PostEdit}
                create={PostCreate}
                //highlight-next-line
                show={PostShow}
            />
        </Admin>
    );
}

export default App;
```

### Fetching record data
```tsx
const { queryResult } = useShow({});
```

`useShow` is another skillful hook from `refine` that is responsible for fetching a single record data.

The `queryResult` includes fetched data and query state like `isLoading` state.

[Refer to `useShow` documentation for detailed usage. &#8594](#)

### Showing the data

Since record data is explicit, there is no constraint on how to present that data. `refine` provides a `<Show>` wrapper component that provides extra features like a `list` and a `refresh` buttons.

[Refer to `<Show>` documentation for detailed usage. &#8594](#)

:::tip
`<Show>` can also render `edit` and `delete` buttons via `canEdit` and `canDelete` props which can be passed from props of `<PostShow>`

```tsx
export const PostShow = (props: IResourceComponentsProps) => {
    ...
    <Show {...props}>
}
```
:::

<br />



<div style={{textAlign: "center"}}>
    <img src={showGif} />
</div>
<br/>

<br />

## Adding search and filters

## Connecting to a real API
