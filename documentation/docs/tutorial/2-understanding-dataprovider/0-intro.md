---
id: index
title: 1. Data Provider
tutorial:
    order: 0
    prev: false
    next: tutorial/understanding-dataprovider/swizzle
---

:::info
The data provider unit is optional for the tutorial and can be skipped to next unit [Adding CRUD Pages](/docs/tutorial/adding-crud-pages/antd/index) if desired.
:::

## What is data provider?

The data provider acts as a data layer for your app that makes the HTTP requests and encapsulates how the data is retrieved. **refine** consumes these methods via data hooks.


You don't need worry about creating data providers from scratch. **refine** offers built-in data provider support for the most popular [API providers](#supported-data-providers). So you can use one of them or you can create your own data provider according to your needs. 

We'll see how to create data provider in the next sections.

:::tip
You can review the [list of supported providers](#supported-data-providers) to find the one that is compatible with your API. 
We'll also give more details about data providers in [create your own data provider](/docs/tutorial/understanding-dataprovider/create-dataprovider/) section.
:::

Data providers can communicate with `REST`, `GraphQL`, `RPC`, and `SOAP` based API's. You can imagine the data provider is an adapter between refine and the API.


<div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/providers/data-provider/flow.png" />
</div>
<br/>
<br/>

The typical data provider has following methods:

```ts
import { DataProvider } from "@pankod/refine-core";

const dataProvider: DataProvider = {
    create: ({ resource, variables, metaData }) => Promise,
    deleteOne: ({ resource, id, variables, metaData }) => Promise,
    getList: ({
        resource,
        pagination,
        hasPagination,
        sort,
        filters,
        metaData,
    }) => Promise,
    getMany: ({ resource, ids, metaData }) => Promise,
    getOne: ({ resource, id, metaData }) => Promise,
    update: ({ resource, id, variables, metaData }) => Promise,
    getApiUrl: () => "",
}
```

These methods are used to perform CRUD operations by **refine**

**refine** comes with different data providers out of the box, but the one we’re interested in and will be using in this tutorial is the refine-simple-rest data provider, a data provider for communicating with RESTful APIs.

## Using Data Providers in refine

Let's remember that in the previous units, the dataProvider was passed to the `<Refine>` component and we consumed the data in the API. Here is the way to activate the `dataProvider` register.

```tsx
import dataProvider from "@pankod/refine-simple-rest"

<Refine 
    dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
/>
```
You can refer to the **refine** component [dataProvider](/docs/api-reference/core/components/refine-config/#dataprovider) prop documentation for more detailed information.

## How data provider methods are using in the app?

We use **refine's** data hooks whenever we need to fetch data from the API. These data hooks are connected to data provider methods internally. The required parameters passes to the data provider methods and response from API returning back.  
To illustrate this internal connection, imagine we want to get all records from the `post` resource using refine's `useList` data hook.

```ts title="src/pages/posts/index.tsx"
import { useList } from "@pankod/refine-core";

const postUseListResult = useList({
    resource: "posts",
    config: {
      sort: [
        {
          field: "id",
          order: "desc",
        },
      ],
      filters: [
        {
          field: "title",
          operator: "contains",
          value: "hello",
        },
      ],
    },
  });
```

As we can see, the parameters passed to the `useList` hook are forwarded to the data provider's `getList` method internally. In the background, **refine** connects all data provider methods to appropriate data hooks.

```ts title="dataProvider.ts"
const dataProvider = {
    getList: (params) => {
        console.log(params);
        /*
        {
          "resource": "posts",
          "sort": [
            {
              "field": "id",
              "order": "desc"
            }
          ],
          "filters": [
            {
              "field": "title",
              "operator": "contains",
              "value": "hello"
            }
          ],
        }
        */
    }
    ...
}
```

## Supported Data Providers

**refine** comes with many pre-loaded data providers. To include them in your project, you can use `npm install [packageName]` or you can select preferred data provider with the `npm create refine-app@latest projectName` during the project creation phase with CLI.  
This will allow you to easily use these data providers in your project.

-   [Simple REST API](https://github.com/refinedev/refine/tree/master/packages/simple-rest)
-   [GraphQL](https://github.com/refinedev/refine/tree/master/packages/graphql)
-   [NestJS CRUD](https://github.com/refinedev/refine/tree/master/packages/nestjsx-crud)
-   [Airtable](https://github.com/refinedev/refine/tree/master/packages/airtable)
-   [Strapi](https://github.com/refinedev/refine/tree/master/packages/strapi) - [Strapi v4](https://github.com/refinedev/refine/tree/master/packages/strapi-v4)
-   [Strapi GraphQL](https://github.com/refinedev/refine/tree/master/packages/strapi-graphql)
-   [Supabase](https://github.com/refinedev/refine/tree/master/packages/supabase)
-   [Hasura](https://github.com/refinedev/refine/tree/master/packages/hasura)
-   [Nhost](https://github.com/refinedev/refine/tree/master/packages/nhost)
-   [Appwrite](https://github.com/refinedev/refine/tree/master/packages/appwrite)
-   [Medusa](https://github.com/refinedev/refine/tree/master/packages/medusa)
-   [Altogic](https://github.com/refinedev/refine/tree/master/packages/altogic)

**Community ❤️**

-   [Firebase](https://github.com/resulturan/refine-firebase) by [rturan29](https://github.com/resulturan)
-   [Directus](https://github.com/tspvivek/refine-directus) by [tspvivek](https://github.com/tspvivek)
-   [Elide](https://github.com/chirdeeptomar/refine-elide-rest) by [chirdeeptomar](https://github.com/chirdeeptomar)


*If you have created a custom data provider and would like to share it with the community, please don't hesitate to get in touch with us. We would be happy to include it on this page for others to use.*

