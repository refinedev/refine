---
id: index
title: 1. Data Provider
tutorial:
    order: 0
    prev: false
    next: tutorial/understanding-dataprovider/swizzle
---

## What is data provider?

The dataProvider acts as a data layer for your app that makes the HTTP requests and encapsulates how the data is retrieved. **refine** consumes these methods via data hooks.

Data providers are hooks that refine use to communicate with APIs. They act as adapters that make HTTP requests to different APIs and return response data using predefined methods.

refine comes with different data providers out of the box, but the one we’re interested in and will be using in this tutorial is the refine-simple-rest data provider, a data provider for communicating with RESTful APIs.

The data provider concept comes into play whenever your refine app needs to communicate with an external API. Thanks to refine's `dataProvider` object property, all API requests are processed through this object.

*TODO: You need to connect this section to the previous one.Readers have seen the App.tsx and the dataProvider property in the previous section. So, we need to clarify `<Refine>` (in App.tsx) dataProvider property to the users.*

For example, to get all the records for the `posts` resource, use the `useList` hook as below. This makes a request from the `dataProvider` with the `getList` method.

 ```ts
 import { useList } from "@pankod/refine-core";

const postUseListResult = useList({ resource: "posts" });

console.log(postListQueryResult); // TODO: show console result
```

Data providers can communicate with `REST`, `GraphQL`, `RPC` and `SOAP` based APIs as they work with adapter system infrastructure. You can check the supported data provider list.

*TODO: Maybe you draw some diagrams to visualize it?*

In cases that do not match your API, you can write your own data provider. You can use `fetch`, `axios`, `apollo-client` or any library for this communication. It is the ideal place for your Authentication or custom HTTP headers operations. Refer to the [Create Your First Data Provider](./2-create-dataprovider.md) documentation for detailed usage.

## Methods

Data providers should have the following methods:

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
    getOne: ({ resource, id, metaData }) => Promise,
    update: ({ resource, id, variables, metaData }) => Promise,
    getApiUrl: () => "",
    createMany?: ({ resource, variables, metaData }) => Promise,
    deleteMany?: ({ resource, ids, variables, metaData }) => Promise,
    getMany?: ({ resource, ids, metaData }) => Promise,
    updateMany?: ({ resource, ids, variables, metaData }) => Promise,
    custom?: ({
        url,
        method,
        sort,
        filters,
        payload,
        query,
        headers,
        metaData,
    }) => Promise,
};
```

It is not require to define the `createMany`, `deleteMany`, `getMany` and `updateMany` methods. If not defined, **refine** will call the corresponding singular `create`, `delete`, `getOne` and `update` methods in a loop.

## Hooks

There are hooks in **refine** that correspond to these methods. You can easily make API requests using these hooks.

| Data Provider Method | Hook                                                                    |
| -------------------- | ----------------------------------------------------------------------- |
| `create`             | [`useCreate`](../../api-reference/core/hooks/data/useCreate.md)         |
| `deleteOne`          | [`useDelete`](../../api-reference/core/hooks/data/useDelete.md)         |
| `getList`            | [`useList`](../../api-reference/core/hooks/data/useList.md)             |
| `getOne`             | [`useOne`](../../api-reference/core/hooks/data/useOne.md)               |
| `update`             | [`useUpdate`](../../api-reference/core/hooks/data/useUpdate.md)         |
| `getApiUrl`          | [`useApiUrl`](../../api-reference/core/hooks/data/useApiUrl.md)         |
| `createMany`         | [`useCreateMany`](../../api-reference/core/hooks/data/useCreateMany.md) |
| `deleteMany`         | [`useDeleteMany`](../../api-reference/core/hooks/data/useDeleteMany.md) |
| `getMany`            | [`useMany`](../../api-reference/core/hooks/data/useMany.md)             |
| `updateMany`         | [`useUpdateMany`](../../api-reference/core/hooks/data/useUpdateMany.md) |
| `custom`             | [`useCustom`](../../api-reference/core/hooks/data/useCustom.md)         |
