---
slug: /
id: tutorial
title: Tutorial
sidebar_label: Tutorial
---
import refineWelcome from '@site/static/img/refine-welcome.png';
import resourceFirst from '@site/static/img/resource-1.png';
import resourceSecond from '@site/static/img/resource-2.png';


We'll show how to create a simple admin app with CRUD operations based on an existing REST API.
## Setup

Refine uses React under the hood. We’ll use create-react-app to bootstrap an empty React app with Typescript.

To create a new app, run the following commands:

````
npx create-react-app tutorial --template typescript
````

````
npm i @pankod/refine
````

Then navigate to the project folder and launch it:

````
npm run start
````

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

````
npm i @pankod/refine-json-server
````
:::note
You can also provide your own custom data provider to make the connection.
:::

## Bootstraping the app
Change `App.tsx` with the following code:

```tsx title="src/App.tsx" 
import { Admin } from "@pankod/refine"
import dataProvider from "@pankod/refine-json-server"

function App() {
  return (
    <Admin dataProvider={dataProvider("https://readmin-fake-rest.pankod.com/")}/>
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
        <Admin dataProvider={dataProvider("https://readmin-fake-rest.pankod.com/")}>
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
import  { List, TextField, TagField, DateField, Table, useTable } from "@pankod/refine";

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

The `tableProps` includes all necessary props for `<Table>`  component to show and interact with data properly.

You can find detailed usage of `useTable` from [here](#).

### Showing and formatting data
We wrap `<Table>` with custom [`<List>`](#) component from `refine`, which adds extra functionalities like a create button and title to the table view.


:::tip
`<List>` is not an obligation at this point. You can prefer to use your own wrapper component.
:::

`refine` apps uses [ant-design](https://ant.design/components/overview/) components to display data. In this example, we'll use `<Table>` component, which is exposed from ant-design to render a table with one row for each record. 

Refer to [ant-design docs](https://ant.design/components/table/#API) for more detailed information about `<Table>`. 

The render prop of `<Table.Column>` is used to determine how to format and show data. Each `<Table.Column>` maps a different field in the API response, specified by the `dataIndex` prop.

We used  `<TextField>`, `<TagField>` and `<DateField>` in `<Table.Column>` to show data in the proper format. These are examples of many more field components from `refine` that are based on ant design components.  
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
        <Admin dataProvider={dataProvider("https://readmin-fake-rest.pankod.com/")}>
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

## Creating a record

We'll implement a page for creating a new record using fake REST API.

Let's create a `PostCreate` component to create a new post. This component will be passed as `create` prop to `<Resource>`

```tsx title="components/pages/posts.tsx"
import { useForm, Create, Form, Input, Select } from "@pankod/refine";

export const PostCreate = () => {
    const { formProps, saveButtonProps } = useForm({});

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} wrapperCol={{ span: 14 }} layout="vertical">
                <Form.Item
                    label="Title"
                    name="title"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Status"
                    name="status"
                >
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
                        ]} />
                </Form.Item>
            </Form>
        </Create>
    )
}
```

### Managing the form

`useForm` is another skillful hook from `refine` that is responsible for managing form data like creating and editing.

```tsx
const { formProps, saveButtonProps } = useForm({});
```

The `formProps` includes all necessary props for `<Form>` component to manage form data properly. 

`refine` apps uses [ant-design form components](https://ant.design/components/form/) to handle form management. In this example, we'll use `<Form>` and `<Form.Item>` component, which is exposed from ant-design to manage form inputs. 

We'll use the [`<Create>`](#) component from `refine` that provides a save button that can be used for submitting the form.
`saveButtonProps` includes all necessary props for a button to submit a form.

You can find detailed usage of `useForm` from [here](#).


## Edit

## Show

## Adding search and filters

## Connecting to a real API