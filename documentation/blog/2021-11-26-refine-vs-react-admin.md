---
title: refine vs React-Admin Which is Better for Your Project?
description: We will compare the features of Refine and react-admin
slug: refine-vs-react-admin
authors: melih
tags: [Refine, react, comparison]
image: https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/placeholder.png
hide_table_of_contents: false
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::caution

You can read an updated and detailed version of this article [here](https://refine.dev/blog/react-admin-vs-refine/).

:::

If you are reading this, chances are you are a developer researching options for delivering an admin panel or another internal tool. Together with you, we will take a look at the best admin panel frameworks in response to this need.

<!--truncate-->

Motivation is our most important resource when developing a project. If you lose your motivation as your project progresses, you will not be able to produce a successful product. The point where you will lose this feeling the most is the point where you cannot meet your Business needs. Different UI / UX solutions may be requested for many business models and it is very important that you can realize them regardless of the framework you use.

When you decide to use these types of frameworks, we need to know to what extent and how they solve your work. If we do not know what these frameworks do and how customizable they are, the problems we may encounter can reduce our motivation.

We will examine how the frameworks we will talk about solve our work and how customizable they are under the title of `Customization`.

:::note

This comparison table strives to be as accurate and as unbiased as possible. If you use any of these libraries and feel the information could be improved, feel free to suggest changes (with notes or evidence of claims) contact info@refine.dev or you can open a issue on [Github](https://github.com/refinedev/refine).

:::

## React-Admin

React-Admin is an B2B application framework based on Material Design, using Material UI. It provides ready-to-fetch-data components, so you just compose them together to create an application.

It can fetch data from any API connected to the data source, like REST, GraphQL, RPC. It’s powered by React, React Router, Redux, and Redux Saga, while Material UI is responsible for the visual.

React-admin uses Redux and redux-saga for state management. React-Admin creates actions and reducers automatically. Developer should only create data provider, which is used for running requests to the server side and parse server responses. But in some cases it is necessary to run non-typical request to the server side, or to change custom Store parameters. In this case React-Admin gives possibility to create custom actions, reducers and sagas.

React-admin is a framework that has been developed for a long time and has a wider community. Besides being stable, it works with old technologies.

### Installation

- Can be included in another React app
- Installation is very simple

```bash
npm install react-admin
#or
yarn add react-admin
```

### Features

- It can be used with any backend(Rest, GraphQL, SOAP)
- API-based. The UI fetches the data from an API connected to the data source.
- Powered by Material UI, Redux, Redux Saga, React-router.
- Supports any authentication provider of your choice(REST API, OAuth, Basic Auth)
- Internationalization : Uses i18n
- Supports data validation

### SSR - Next.js Support

React-Admin does not support SSR-Next.js. Therefore, it only helps you develop B2B and admin panel applications.

### Routing

React admin does it with react-router-dom to save routes. You need to create your own module and define it in the `<Route>` component.

```tsx title="src/customRoutes.js"
import * as React from "react";
import { Route } from "react-router-dom";
import Foo from "./Foo";
import Bar from "./Bar";

export default [
  <Route exact path="/foo" component={Foo} />,
  <Route exact path="/bar" component={Bar} />,
];
```

Then, pass this array as customRoutes prop in the `<Admin>` component:

```tsx title="src/App.js"
import * as React from "react";
import { Admin } from "react-admin";

import customRoutes from "./customRoutes";

const App = () => (
  <Admin
    customRoutes={customRoutes}
    dataProvider={simpleRestProvider("http://path.to.my.api")}
  >
    ...
  </Admin>
);

export default App;
```

Now, when a user browses to /foo or /bar, the components you defined will appear in the main part of the screen.

### Data Provider Logic

When React-admin needs to communicate with API, it uses Data Provider.

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2021-11-26-refine-vs-react-admin/admin_flow.png" alt="admin" />

Here are the React-Admin data provider methods:

```ts
const dataProvider = {
  getList: (resource, params) => Promise,
  getOne: (resource, params) => Promise,
  getMany: (resource, params) => Promise,
  getManyReference: (resource, params) => Promise,
  create: (resource, params) => Promise,
  update: (resource, params) => Promise,
  updateMany: (resource, params) => Promise,
  delete: (resource, params) => Promise,
  deleteMany: (resource, params) => Promise,
};
```

#### GraphQL Data Provider

We can say that React-Admin is a bit lacking in terms of both graphql provider and its documentation.

React-Admin calls the GraphQL endpoint by running an introspection query for GraphQL.

```jsx title="App.js"
import React from "react";
import { Component } from "react";
import buildGraphQLProvider from "ra-data-graphql-simple";
import { Admin, Resource } from "react-admin";

import { PostCreate, PostEdit, PostList } from "./posts";

const App = () => {
  const [dataProvider, setDataProvider] = React.useState(null);
  React.useEffect(() => {
    buildGraphQLProvider({
      clientOptions: { uri: "http://localhost:4000" },
    }).then((graphQlDataProvider) =>
      setDataProvider(() => graphQlDataProvider),
    );
  }, []);

  if (!dataProvider) {
    return <div>Loading</div>;
  }

  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="Post"
        list={PostList}
        edit={PostEdit}
        create={PostCreate}
      />
    </Admin>
  );
};

export default App;
```

When we want to see this data in a table, all GraphQL entities are queried requested by default(even if you don't add columns to the table). This is against GraphQL's approach and is a scenario we would not want.

The way to prevent this is to override all your queries.

```jsx title="src/dataProvider.js"
import buildGraphQLProvider, { buildQuery } from "ra-data-graphql-simple";

const myBuildQuery = (introspection) => (fetchType, resource, params) => {
  const builtQuery = buildQuery(introspection)(fetchType, resource, params);

  if (resource === "Command" && fetchType === "GET_ONE") {
    return {
      // Use the default query variables and parseResponse
      ...builtQuery,
      // Override the query
      query: gql`
        query Command($id: ID!) {
          data: Command(id: $id) {
            id
            reference
            customer {
              id
              firstName
              lastName
            }
          }
        }
      `,
    };
  }

  return builtQuery;
};

export default buildGraphQLProvider({ buildQuery: myBuildQuery });
```

Although this is a solution, it complicates your project in many ways (debugging, maintenance, etc...).

### React-Admin Available Providers

The providers that React admin supports are as follows:

- Simple Rest: [https://github.com/marmelab/react-admin/tree/master/packages/ra-data-simple-rest](https://github.com/marmelab/react-admin/tree/master/packages/ra-data-simple-rest)
- Json Server: [https://github.com/marmelab/react-admin/tree/master/packages/ra-data-json-server](https://github.com/marmelab/react-admin/tree/master/packages/ra-data-json-server)
- Simple GraphQL: [https://github.com/marmelab/react-admin/tree/master/packages/ra-data-graphql-simple](https://github.com/marmelab/react-admin/tree/master/packages/ra-data-graphql-simple)
- Local JSON: [https://github.com/marmelab/react-admin/tree/master/packages/ra-data-localstorage](https://github.com/marmelab/react-admin/tree/master/packages/ra-data-localstorage)
- Local Storage: [https://github.com/marmelab/react-admin/tree/master/packages/ra-data-localstorage](https://github.com/marmelab/react-admin/tree/master/packages/ra-data-localstorage)
- Supabase: [https://github.com/marmelab/ra-supabase](https://github.com/marmelab/ra-supabase)

### Customization

With React-Admin, you can develop effective B2B applications and admin panels in a very short time. Although most of the processes are handled with hooks, the general architecture is built on components. In general, we can say that it is customizable but not very flexible. In some cases or business models, you may need to think about this yourself and make some additions.

#### UI/UX Customization:

React-Admin offers solutions in component architecture. The disadvantage of this is that you will have difficulty meeting your customization needs or different business requests. These customizable, but they can be a bit of a hard for different business models.

#### Logic Customization:

React-Admin uses redux and redux-saga for state management. You should know these two technologies well. In some cases you may need to create the actions and reducers yourself. This is also a disadvantage for many situations.

### Pricing

In addition to these features it provides, React-Admin offers some modules as Enterprise-Edition.

A few of these modules are as follows:

- RBAC
- Editable-Datagrid
- Realtime
- Search
- Navigation

## Refine

**Refine** is a React-based framework that helps you to develop admin panel, B2B and dashboard that can be fully customized with Ant Design.

**Refine** directly provides Ant Design components and some hooks to work with those components. These hooks give you the required props for those Ant Design components.

**Refine** is a collection of helper hooks, components and providers. They are all decoupled from your UI components and business logic, so they never keep you from customizing your UI or coding your own flow.

**Refine** uses [React Query](https://react-query.tanstack.com/) for data processing, caching, and state management. In this respect, you do not need to define anything extra for every cases and model.

Although **Refine** is a newer framework, it is successful in identifying deficiencies in development and producing solutions accordingly. Using new technologies, it offers users more effective and simpler development options.

### Installation

- Installation is very simple and customizable options can be added.

```bash
npm create refine-app@latest demo-refine-project -- -b v3
```

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2021-11-26-refine-vs-react-admin/project_setup.gif" alt="setup" />

### Features

- Configuration: One-line setup with superplate. Project setup is very simple. Using superplate you can choose the content of your project and the features you want to add.

- UI: You have full control over the UI elements. Fully customizable, open to use. Works seamlessly with Ant Design.

- Out-of-the-box: Routing, networking, authentication, state management, i18n and UI.

- Next.js / SSR integration: refine can be used with Next.js to SSR your pages.

- React Location: React Location router provider support

### SSR - Next.js Support

**Refine** has support for SSR - Next.js. This is an important feature that separates Refine from other frameworks. Thanks to this feature, Refine provides the opportunity to develop B2C applications in addition to B2B and admin panel.

**Refine** can be used with Next.js to SSR your pages. It doesn't get in the way and follows Next.js conventions and also provides helper modules when necessary.

#### SSR-Next.js Setup

```bash
npm i @pankod/refine @refinedev/nextjs-router
```

#### SSR-Next.js Basic Usage

`<Refine>` must wrap your pages in a custom App component. This way your pages are integrated to refine.

```tsx title=pages/_app.tsx
import { AppProps } from "next/app";

import { Refine } from "@pankod/refine";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/nextjs-router";

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

[For more information on how to add SSR-Next.js to your Refine project ->](https://refine.dev/docs/guides-and-concepts/ssr/nextjs/)

### Routing

**Refine** uses a customized Router Provider to save routes and navigate between pages. **Refine** offers a much more flexible structure thanks to its routerProvider support.

A router provider must include the following methods:

```tsx
const routerProvider = {
    useHistory: () => {
        push: (...args) => any,
        replace: (...args) => any,
        goBack: (...args) => any,
    },
    useLocation: () => {
        pathname: string,
        search: string,
    },
    useParams: <Params extends { [K in keyof Params]?: string } = {}>() => Params,
    Prompt: React.FC<PromptProps*>,
    Link: React.FC<any>,
    RouterComponent?: React.FC<any>,
};
```

:::info

**Refine** includes many router providers to use in your projects like:

- React Router
- React Location
- Next.js Router

:::

[To take a look at how other router providers are defined and working](https://refine.dev/docs/api-reference/core/providers/router-provider/)

To activate router provider in **Refine**, we have to pass the routerProvider to the `<Refine />` component.

<Tabs
defaultValue="react-router"
values={[
{label: 'React Router', value: 'react-router'},
{label: 'React Location', value: 'react-location'},
{label: 'Next.js Router', value: 'nextjs'}
]}>
<TabItem value="react-router">

```tsx title="App.tsx"
import { Refine } from "@pankod/refine";
import routerProvider from "@refinedev/react-router-v6";

const App: React.FC = () => {
  return <Refine routerProvider={routerProvider} />;
};
```

</TabItem>
<TabItem value="react-location">

```tsx title="App.tsx"
import { Refine } from "@pankod/refine";
import routerProvider from "@pankod/refine-react-location";

const App: React.FC = () => {
  return <Refine routerProvider={routerProvider} />;
};
```

</TabItem>
<TabItem value="nextjs">

```tsx title="App.tsx"
import { Refine } from "@pankod/refine";
import routerProvider from "@refinedev/nextjs-router";

const App: React.FC = () => {
  return <Refine routerProvider={routerProvider} />;
};
```

  </TabItem>
</Tabs>

You just need to tell the route of your component to the routerProvider.

### Data Provider Logic

A data provider is the place where a **Refine** app communicates with an API.

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2021-11-26-refine-vs-react-admin/refine_flow.png" alt="refine" />

A data provider must include following methods:

```ts
const dataProvider = {
  create: ({ resource, variables, meta }) => Promise,
  createMany: ({ resource, variables, meta }) => Promise,
  deleteOne: ({ resource, id, meta }) => Promise,
  deleteMany: ({ resource, ids, meta }) => Promise,
  getList: ({ resource, pagination, sorters, filters, meta }) => Promise,
  getMany: ({ resource, ids, meta }) => Promise,
  getOne: ({ resource, id, meta }) => Promise,
  update: ({ resource, id, variables, meta }) => Promise,
  updateMany: ({ resource, ids, variables, meta }) => Promise,
  custom: ({ url, method, sorters, filters, payload, query, headers, meta }) =>
    Promise,
  getApiUrl: () => "",
};
```

:::note

Data hooks uses React Query to manage data fetching. React Query handles important concerns like caching, invalidation, loading states etc..

:::

#### GraphQL Data Provider

It is well covered by GraphQL data provider **Refine** and explained step by step in the documentation.

**Refine** GraphQL data provider is built with [qql-query-builder](https://github.com/atulmy/gql-query-builder) and [graphql-request](https://github.com/prisma-labs/graphql-request). The purpose here is to send dynamic queries that we can do with qql-query-builder as requests with graphql-request.

Query builder helps us build queries and mutations. We can use these queries with the getList, getMany and getOne methods in our data provider. On the other hand, the create, createMany, update, updateMany, deleteOne and deleteMany methods generate a mutation to send a request.

In order to create a query, we need to specify the fields that we will use from our data provider. Thanks to the MetaDataQuery, we pass these fields to our data provider and start using them.

#### Basic GraphQL Usage

```tsx src/App.tsx
import { Refine } from "@pankod/refine";
import routerProvider from "@refinedev/react-router-v6";
import dataProvider, { GraphQLClient } from "@refinedev/graphql";

const client = new GraphQLClient("API_URL");

const App: React.FC = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider(client)}
    />
  );
};
```

When sending the request, we must specify which fields will come, so we send fields in `meta` to hooks that we will fetch data from.

<Tabs
defaultValue="usage"
values={[
{label: 'usage', value: 'usage'},
{label: 'output', value: 'output'},
]}>

<TabItem value="usage">

```tsx
export const PostList = () => {
  const { tableProps, sorter } = useTable<IPost>({
    sorters: {
      initial: [
        {
          field: "id",
          order: "asc",
        },
      ],
    },
    // highlight-start
    meta: {
      fields: [
        "id",
        "title",
        {
          category: ["title"],
        },
      ],
    },
    // highlight-end
  });

  const { selectProps } = useSelect<ICategory>({
    resource: "categories",
    // highlight-start
    meta: {
      fields: ["id", "title"],
    },
    // highlight-end
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="id"
          title="ID"
          sorter={{ multiple: 2 }}
          defaultSortOrder={getDefaultSortOrder("id", sorter)}
        />
        <Table.Column
          key="title"
          dataIndex="title"
          title="Title"
          sorter={{ multiple: 1 }}
        />
        <Table.Column<IPost>
          dataIndex="category"
          title="Category"
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Select
                style={{ minWidth: 200 }}
                mode="multiple"
                placeholder="Select Category"
                {...selectProps}
              />
            </FilterDropdown>
          )}
          render={(_, record) => record.category.title}
        />
        <Table.Column<IPost>
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
```

</TabItem>

<TabItem value="output">

```tsx
query ($sort: String, $where: JSON, $start: Int, $limit: Int) {
    posts (sort: $sort, where: $where, start: $start, limit: $limit) {
        id,
        title,
        category {
            title
        }
    }
}
```

</TabItem>
</Tabs>

Here we only make requests for queries that are necessary. As you can see, all you have to do is specify the field you want to select with `meta`.

[Refer to the GraphQL for detailed usage. → ](https://refine.dev/docs/packages/documentation/data-providers/graphql)

### Refine Available Providers

Connects to any REST or GraphQL custom backend.

- NestJs CRUD: [https://github.com/refinedev/refine/tree/main/examples/data-provider-nestjsx-crud](https://github.com/refinedev/refine/tree/main/examples/data-provider-nestjsx-crud)
- Airtable: [https://github.com/refinedev/refine/tree/main/examples/data-provider-airtable](https://github.com/refinedev/refine/tree/main/examples/data-provider-airtable)
- Strapi: [https://github.com/refinedev/refine/tree/main/examples/data-provider-strapi](https://github.com/refinedev/refine/tree/main/examples/data-provider-strapi)
- Strapi v4: [https://github.com/refinedev/refine/tree/main/examples/data-provider-strapi-v4](https://github.com/refinedev/refine/tree/main/examples/data-provider-strapi-v4)
- Supabase: [https://github.com/refinedev/refine/tree/main/examples/data-provider-supabase](https://github.com/refinedev/refine/tree/main/examples/data-provider-supabase)
- Hasura: [https://github.com/refinedev/refine/tree/main/examples/data-provider-hasura](https://github.com/refinedev/refine/tree/main/examples/data-provider-hasura)
- Appwrite: [https://github.com/refinedev/refine/tree/main/examples/data-provider-appwrite](https://github.com/refinedev/refine/tree/main/examples/data-provider-appwrite)

### Customization

- **Refine's** motivation and main purpose are as follows: "Higher-level frontend frameworks can save you a lot time, but they typically offer you a trade-off between speed and flexibility."
- While the admin panel allows you to make dashboard, B2B and B2C applications quickly, we offer you flexibility in your UI or business model.

#### UI/UX Customization:

**Refine**, comes ready-made decoupled from the UI, and is used. **Refine** mostly touches UI components via hooks. The main advantage of this for you is that you can successfully perform any Business request or different case.

#### Logic Customization:

**Refine**, works flawless with react-query. You don't have to worry about state management in your business model or when you encounter a different situation.

### Pricing

All features of **Refine** are available as **open source**.

- Access Control Provider (RBAC, ABAC, ACL, IP, LDAP, etc...)
- Realtime
- Search
- Navigation and more features are available

If you want to get information about the Enterprise, Refine ready to help you for Support and Training.
[For more info about Enterprise->](https://refine.dev/enterprise/)

Refine Docs & Demo: [Documentation](https://refine.dev/docs/) - [Live Demo](https://refine.dev/demo/)

## Conclusion

With the pricing, customization and flexibility that **Refine** offers you, you will be able to meet all your business demands. In addition, you can easily develop both B2B and B2C applications using a single framework with the support of SSR - Next.js.

In general, these frameworks that we are comparing have appeared for the same purpose. All of them are successful in meeting business demands and offering you a solution. Here are the this solutions way that they offer, they may differ and there may be distinguishing features between them.

At this point, the questions you should ask when choosing these of framework may be as follows:

- How flexible are they in offering solutions to the different business demands we may encounter?

- How difficult will it be to implement the providers and features we will be using?

- If any problem arises, can I easily find a solution from the documentation?

- How dependent am I on this framework when using it in my project and does it offer customization possibilities?

- What does it offer me as an extra feature?

In this article, we tried to answer these questions. By reading this article, you can choose the appropriate framework for your project and use it.
