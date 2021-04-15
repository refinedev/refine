---
slug: /
id: tutorial
title: Tutorial
sidebar_label: Tutorial
---


Readmin uses React. We’ll use create-react-app to create an empty React app, and install the readmin package:


````
npm i create react-app test-admin
cd test-admin/
yarn add readmin 
yarn start

````

You should be up and running with an empty React application on port 3000.

Using an API As Data Source
React-admin runs in the browser, and relies on data it fetches from APIs.

We’ll be using pankod's  fake REST API designed for testing and prototyping, as the datasource for the application. Here is what it looks like:



example api source


To start make app work import Admin root component in to "App.tsx"  from readmin.

You should provide api provider to admin. Here we use readmin-json to demonstra...
We ll use readmin-json-server CRUD api provider.. You can use your own..

```

import React from "react";
import JsonServer from "readmin-json-server";
import {
    Admin,
} from "readmin";

    
function App() {

    return (
        <Admin dataProvider={JsonServer("https://readmin-fake-rest.pankod.com"))} >
      
        </Admin>
    );
}

export default App;

```

You can simply bootstrap the app with this setup. You will see the welcome page below.


//image//


The App component renders an <Admin> component, which is the root component of a react-admin application. This component expects a dataProvider prop - a function capable of fetching data from an API. Since there is no standard for data exchanges between computers, you will probably have to write a custom provider to connect react-admin to your own APIs - but we’ll dive into Data Providers later. For now, let’s take advantage of the ra-data-json-server data provider, which speaks the same REST dialect as JSONPlaceholder.


##Connect API with resources 

Kısaca resource componentinden bahsedelim. 
resource maps a name to an endpoint in the API by readmin.



```
import React from "react";
import JsonServer from "readmin-json-server";
import {
    Admin,
    Resources
} from "readmin";

function App() {
 
    return (
        <Admin
            dataProvider={dataProvider("/ayna-crud-api/admin", axiosInstance)}
            {...adminProps}
        >
            <Resource name="prizes" list={PrizeList}/>
        </Admin>
    );
}
```

import edilen resource propların ne yapacağı?

The line <Resource name="users" /> informs react-admin to fetch the “users” records from the https://jsonplaceholder.typicode.com/users URL. <Resource> also defines the React components to use for each CRUD operation (list, create, edit, and show)...


The list={PostList} prop means that readmin  use the <PostList> custom component to display the list of posts, which users create independently from readmin  

Postlist uses List component wrapper from readmin-core  which uses ant-design components to render data with table.

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