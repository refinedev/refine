---
id: index
title: 1. Data Provider
tutorial:
    order: 0
    prev: false
    next: tutorial/understanding-dataprovider/swizzle
---

import SupportedDataProviders from "@site/src/partials/data-provider/supported-data-providers.md";

:::info
The Data Provider unit is optional for the tutorial. You can directly skip to the next unit, <UIConditional is="headless">[Adding CRUD Pages](/docs/tutorial/adding-crud-pages/headless/index)</UIConditional><UIConditional is="antd">[Adding CRUD Pages](/docs/tutorial/adding-crud-pages/antd/index)</UIConditional><UIConditional is="mantine">[Adding CRUD Pages](/docs/tutorial/adding-crud-pages/mantine/index)</UIConditional><UIConditional is="chakra-ui">[Adding CRUD Pages](/docs/tutorial/adding-crud-pages/chakra-ui/index)</UIConditional><UIConditional is="mui">[Adding CRUD Pages](/docs/tutorial/adding-crud-pages/mui/index)</UIConditional>, if desired

:::

## What is data provider?

Data provider acts as a data layer for your app, making HTTP requests and encapsulating how the data is retrieved. The methods of these requests are then consumed by **refine** via data hooks.

Data providers can also communicate with `REST`, `GraphQL`, `RPC` and `SOAP` based APIs, so you can imagine the data provider as an adapter between **refine** and the API.

You don’t need to worry about creating data providers from scratch, as **refine** offers built-in data provider support for the most popular [API providers](#supported-data-providers). If you want, we will also show how you can create your own data provider in the coming sections.

<div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/providers/data-provider/tutorial_dataprovider_flog.png" />
</div>
<br/>
<br/>

A typical data provider has the following methods that are used to perform data operations:

```ts
import { DataProvider } from "@refinedev/core";

const dataProvider: DataProvider = {
    create: ({ resource, variables, meta }) => Promise,
    deleteOne: ({ resource, id, variables, meta }) => Promise,
    getList: ({
        resource,
        pagination,
        sorters,
        filters,
        meta,
    }) => Promise,
    getOne: ({ resource, id, meta }) => Promise,
    update: ({ resource, id, variables, meta }) => Promise,
    getApiUrl: () => "",
    ...
}
```

**refine** comes with various data providers out of the box, but for this tutorial, will be using the `refine-simple-rest` data provider to communicate with RESTful APIs.

> For more information, refer to the [`refine-simple-rest` source code&#8594](https://github.com/refinedev/refine/tree/next/packages/simple-rest)

## Using data providers in refine

In the previous unit, we already consumed the API to show the data in the auto-generated Inferencer pages and registered a data provider using the `dataProvider` property of the `<Refine>` component to allow **refine** communicate with the API:

```tsx
...
import dataProvider from "@refinedev/simple-rest";

<Refine
    ...
    dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
/>;
```

> For more information, refer to **refine's** [dataProvider prop component documentation&#8594](/docs/api-reference/core/components/refine-config/#dataprovider)

## How are data provider methods used in the app?

When we want to fetch data from API, we do it by using **refine's** data hooks, which are internally connected to data provider methods. We pass the required parameters to the data provider methods, and then the API returns a response.

To illustrate this internal connection, imagine that we want to get all records from the `post` resource using **refine's** `useList` data hook.

```ts title="src/pages/posts/index.tsx"
import { useList } from "@refinedev/core";

const postUseListResult = useList({
    resource: "posts",
    sorters: [
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
});
```

As you can see, when we pass parameters to the `useList` hook, **refine** automatically forwards them to the `getList` method of the data provider. This is because **refine** connects all data provider methods to their corresponding data hooks in the background.

```ts title="dataProvider.ts"
const dataProvider = {
    getList: (params) => {
        console.log(params);
        /*
        {
          "resource": "posts",
          "sorters": [
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

## Supported data providers

<SupportedDataProviders/>

<Checklist>

<ChecklistItem id="data-provider-intro">
I understood what is data provider and how it works.
</ChecklistItem>
<ChecklistItem id="data-provider-intro-2">
I have learned that refine offers built-in data provider support for the most popular API providers.
</ChecklistItem>

</Checklist>
