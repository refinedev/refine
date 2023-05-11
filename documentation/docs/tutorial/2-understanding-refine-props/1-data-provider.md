---
id: data-provider
title: 3.2. Data Provider
tutorial:
    prev: tutorial/understanding-refine-props/index
    next: tutorial/understanding-refine-props/resources
---

This post explains the data provider concept and its use in **refine**. It demonstrates the use of data hooks in order to access data provider methods from inside a UI component. It also provides a list of supported data providers in **refine**, such as the **Simple REST API**.

import SupportedDataProviders from "@site/src/partials/data-provider/supported-data-providers.md";

## What is a Data Provider?

The data provider object represents the data layer or context of our **refine** app from which HTTP requests are carried out and retrieved data is encapsulated. It contains a specific set of methods that should be defined to carry out CRUD actions against resources accessible from a backend API. 

A typical data provider has the following methods:

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
}
```

The data provider methods are used to perform data retrieval and mutation operations from consumer components. Consumer components are able to access and invoke these methods via a myriad of data hooks **refine** core and its supplementary packages provide.

Normally, for a custom backend API of our own, we should define the methods of the `dataProvider` object from scratch. For our React admin panel app though, we don't need to worry about defining a data provider ourselves because we are using `Simple Rest API` data provider shipped by the `@refinedev/simple-rest` supplementary package.

[For more details, refer to the `refine-simple-rest` source code &#8594](https://github.com/refinedev/refine/tree/next/packages/simple-rest)

**refine** offers built-in data provider support for the most popular [API providers](#supported-data-providers).

Data providers are geared to communicate with `REST`, `GraphQL`, `RPC`, and `SOAP` based APIs. A data provider can be considered as an adapter between **refine** and the API endpoints.

<div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/providers/data-provider/tutorial_dataprovider_flog.png" />
</div>

## Using a Data Provider in refine

In the previous units, our REST API was consumed from the default Inferencer-generated pages. To enable **refine** to communicate with the API, we first had to register the data provider using the `dataProvider` prop of `<Refine />`:

```tsx
// Inside src/App.tsx

import dataProvider from "@refinedev/simple-rest";

<Refine
    dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
/>;
```

[Please refer to the `<Refine />` component's dataProvider prop documentation for more detailed information.](/docs/api-reference/core/components/refine-config/#dataprovider)


## Using Data Hooks to Access Data Provider Methods

We use **refine's** data hooks when we need to fetch data from the API. These data hooks internally manage the overhead of accessing data provider methods. The required parameters accepted by a data provider method need to be passed to the data hooks that are used inside a component and the response from the API is returned.

For instance, a typical use of refine's `useList()` data hook when we want to get all records from the `blog_posts` resource looks like this:

```ts title="src/pages/posts/index.tsx"
import { useList } from "@refinedev/core";

const postUseListResult = useList({
    resource: "blog_posts",
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

In the above code, the `useList()` hook accepts a parameter object which basically configures the query to the backend server. These parameters are forwarded to the data provider's `getList()` method internally. The return value is then passed to components for presenting the data. We elaborate on presentation of the data with the **Material UI** `<DataGird />` component in [Unit 4.1](/docs/tutorial/adding-crud-actions/index).

## Supported Data Providers

<SupportedDataProviders/>

<Checklist>

<ChecklistItem id="data-provider-intro">
I understand what is data provider and how it works.
</ChecklistItem>
<ChecklistItem id="data-provider-intro-2">
I understand that data provider methods are accessible from UI components via corresponding data hooks.
</ChecklistItem>
<ChecklistItem id="data-provider-intro-3">
I learned that refine offers built-in data providers for the most popular systems.
</ChecklistItem>
</Checklist>
