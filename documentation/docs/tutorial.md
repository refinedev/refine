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
### Setup

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


### Providing a Data Source with an API

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

Refine requires a `dataProvider` to use an API for CRUD operations which is an object with a set of methods.

We'll use `@pankod/refine-json-server` package as a data provider which has predefined methods to communicate with REST APIs.

````
npm i @pankod/refine-json-server
````
:::note
You can also provide your own custom data provider to make the connection.
:::

### Bootstraping the app
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




### Connect API with Resources 

We'll start forming our app by adding a `<Resource />` component as a child.
A `<Resource />` represents an endpoint in the API by given name property.

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

After adding `<Resource />`, app redirects to url defined by `name` property. 
`refine` handles route matching out of the box. 


<>
<div style={{textAlign: "center"}}>
    <img   src={resourceFirst} />
</div>
<br/>
</>



You'll see 404 page since `<Resource />` doesn't handle data fetching on its own. CRUD operations is to be done with `refine` hooks.

`<Resource />` holds components as props for CRUD operations(list, create, edit, show). In this example, we are going to set corresponding custom components to `<Resource />` which uses `refine` hooks to handle data operations and display the list of data.


### Showing and interacting with data

Let's create a `PostList` component to fetch and show posts data.

```tsx title="components/pages/posts.tsx" 
import  { List, TextField, TagField, DateField, Table, useTable,
IResourceComponentsProps } from "@pankod/refine";

export const PostList = (props: IResourceComponentsProps) => {
    const { tableProps } = useTable({});

    return (
        <List {...props}>
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    dataIndex="title"
                    title="title"
                    key="title"
                    render={(value) => <TextField value={value} />}
                    sorter={{
                        multiple: 1,
                    }}
                />

                <Table.Column
                    dataIndex="status"
                    title="status"
                    key="status"
                    render={(value) => <TagField value={value} />}
                />
                <Table.Column
                    dataIndex="createdAt"
                    title="createdAt"
                    key="createdAt"
                    render={(value) => <DateField format="LLL" value={value} />}
                    sorter={{
                        multiple: 2,
                    }}
                />
            </Table>
        </List>
    );
};
```
<br/>

We wrap `<Table />` with custom `<List />` component from `refine`, which adds extra functionalities like a create button and title to the table view.


:::tip
`<List />` is not an obligation at this point. You can prefer to use your own wrapper component.
:::
<br/>

`refine` apps uses [ant-design](https://ant.design/components/overview/) components to display data. In this example, we'll use `<Table />` component, which is exposed from ant-design to render a table with one row for each record. 

The render prop of `<Table.Column />` is used to determine spesific field type of the data to render. Each `<Table.Column />` maps a different field in the API response, specified by the `dataIndex` prop.

Refer to [ant-design docs](https://ant.design/components/table/#API) for more detailed information about `<Table />`. 



```tsx
  const { tableProps } = useTable({});
```

`useTable` is a hook from `refine`.  
Basically, it's responsible for fetching data from API with `<Resource/>`'s `name` prop using `refine`'s helper hooks under the hood.  
The `tableProps` includes all necessary props for `<Table />`  component to show and interact with data properly.


You can find detailed usage of `useTable` from [here](#).



After creating PostList component, now it's time to add to `<Resource />`.


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
Now we can list posts data successfully as shown below.

<>
<div style={{textAlign: "center"}}>
    <img src={resourceSecond} />
</div>
<br/>
</>



















The list={PostList} prop means that readmin  use the <PostList/> custom component to display the list of posts, which users create independently from readmin  



Postlist readmin hooklarını kullanarak api den data çekebilir, crud işlemlerini yapması içn gerekli olan readmin  tarafından sağlanana hookları barındırır. Çektiği dataı readmin crud list componenti ile ant design componentleri kullanılarak ekrana listeler.

Bu örnekte PostList componenti içinde useTable hookunu kullanarak api den list verisini çektik. useTable çalışma mantığı...
Basicly, useTable looks to the url resource to get specific data from api..

Gelen datayı liste halinde yazdırmak istediğimiz için ant-d table componentine aktardık..

```
import React from "react";
import {
    Admin,
    Resources,
    useTable,
    Table,
    List,
} from "readmin";

export const PostList = ({ ...props }) => {
    const { tableProps } = useTable({});

    return (
        <List {...props} actionButtons={actions}>
            <Table
                {...tableProps}
                rowKey="id"
            >
                <Table.Column
                    dataIndex="id"
                    title="ID"
                    key="id"
                    render={(value) => <TextField value={value} />}
                />
                <Table.Column
                    dataIndex="name"
                    title="Name"
                    key="name"
                    render={(value) => <TextField value={value} />}
                />
            </Table>
        </List>
    );
}
```

table column kullanımı ile ilgili ufak ve carpıcı bir acıklama..
(render fonksiyonu)

hookların detaylı kullanımı daha sonra..


//display a list of users:

//image screenshot List


If you look at the network tab in the browser developer tools, you’ll notice that the application fetched the https://jsonplaceholder.typicode.com/users URL, then used the results to build the Datagrid. That’s basically how react-admin works.


##Handling relationsips

- ReferenceField

##search and filter to the list

- Reference component
- filterdropdown örnekler

##Create, Edit

- edit create vs.. buttons
- useForm