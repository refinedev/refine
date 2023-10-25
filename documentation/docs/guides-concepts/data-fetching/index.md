---
title: Data Fetching
---

import UseOne from "./use-one";
import SupportedDataProviders from "@site/src/partials/data-provider/supported-data-providers.md";
import DataHooks from "@site/src/partials/data-provider/data-hooks.md";
import DataProviderInterface from "@site/src/partials/data-provider/data-provider-interface.md";

## The Data Provider

Data provider acts as a data layer for your app, making HTTP requests and encapsulating how the data is retrieved. The methods of these requests are then consumed by **refine** via data hooks.

Data providers are versatile and can communicate with a variety of API types, such as `REST`, `GraphQL`, `RPC`, and `SOAP`. Think of a data provider as a bridge connecting **refine** to the API, adapting and translating the data exchange.

You can create your own data provider or **refine** offers built-in data provider support for the most popular [API providers](#supported-data-providers).

Moreover, **refine** offers support for multiple data providers, allowing you to use different data providers for different resources. For instance, you can use `REST` for the `posts` resource and `GraphQL` for the `users` resource.

[Refer to the data provider tutorial to learn step by step how to create a data provider. →](/docs/tutorial/understanding-dataprovider/create-dataprovider/)

<div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/providers/data-provider/tutorial_dataprovider_flog.png" />
</div>

## Data Fetching

To fetch data in **refine**, you can utilize the available data provider methods. A typical data provider in **refine** offers various methods for performing data operations, both required and optional:

**refine** consumes data provider methods using data hooks, which are used for CRUD actions like creating a new record, listing a resource or deleting a record, etc.

Once you implemented the data provider, you can use it data hooks to fetch data from the API.

For instance, if you want to fetch a record from the `post` resource using the `useOne` data hook in **refine**, it internally utilizes the `dataProvider.getOne` method from your data provider. This method is called with the necessary parameters to fetch data from the API.

<UseOne />

**refine** offers various data hooks for different data operations. You can use these hooks to fetch data from the API.

<DataHooks />

## How refine treats data and state?

Data hooks uses [TanStack Query](https://tanstack.com/query) under the hood. It takes care of managing the state for you. It provides `data`, `isLoading`, and `error` states to help you handle loading, success, and error scenarios gracefully.

**refine** also, implement intelligent caching and cache invalidation strategies to enhance performance and reduce redundant API requests.

## List

The [`useList`][use-list] or [`useInfiniteList`][use-infinite-list] hook is used to fetch a list of records from the API. It calls the `dataProvider.getList` method of the data provider under the hood.

The `getList` method is used to get a list of resources with sorting, filtering and pagination features.
It takes `resource`, `sorters`, `pagination` and `filters` as parameters and returns `data` and `total`.

```tsx
import { DataProvider } from "@refinedev/core";

useList({
    resource: "posts",
});

export const dataProvider = (apiUrl: string): DataProvider => ({
    getList: async ({ resource }) => {
        const response = await fetch(`${apiUrl}/${resource}`);
        const { data, total } = await response.json();

        return {
            data,
            total,
        };
    },
});
```

## Filters and Sorters

Filters and sorters are tools for refining and organizing data. Filters help you find specific data, while sorters arrange data in a particular order. These are essential for effective data management and presentation.

**refine** provides a filter and sorter interface to streamline data management. Interfaces offer a structured way to apply filters and sorters to your data provider, enhancing the organization and efficiency of your application.

```tsx
import { DataProvider, useList } from "@refinedev/core";

useList({
    resource: "posts",
    pagination: {
        current: 1,
        pageSize: 10,
    },
    sorters: [{ field: "age", order: "asc" }],
    filters: [
        {
            field: "name",
            operator: "contains",
            value: "John",
        },
        {
            field: "age",
            operator: "gt",
            value: 20,
        },
    ],
    meta: {
        headers: { "x-meta-data": "true" },
    },
});

export const dataProvider = (apiUrl: string): DataProvider => ({
    getList: async ({ resource, pagination, sorters, filters, meta }) => {
        const { current, pageSize, mode } = pagination;
        const { field, order } = sorters;
        const { field, operator, value } = filters;
        const { headers } = meta;

        // handle the request according to your API requirements.

        return {
            data,
            total,
        };
    },
});
```

## Meta usage

`meta` is a special property that can be used to pass additional information to data provider methods for the following purposes:

-   Customizing the data provider methods for specific use cases.
-   Generating GraphQL queries using plain JavaScript Objects (JSON).

[Refer to the `meta` section of the General Concepts documentation for more information &#8594](/docs/api-reference/general-concepts/#meta)

```tsx
import { DataProvider, useOne } from "@refinedev/core";

useOne({
    resource: "posts",
    id: "1",
    meta: {
        foo: "bar",
    },
});

export const dataProvider = (apiUrl: string): DataProvider => ({
    getOne: async ({ resource, id, meta }) => {
        const response = await fetch(`${apiUrl}/${resource}/${id}`, {
            headers: {
                "x-foo": meta.foo,
            },
        });

        const data = await response.json();

        return {
            data,
        };
    },
});
```

## GraphQL

**refine** supports [GraphQL](/docs/packages/documentation/data-providers/graphql/) out of the box with [supported data providers](#supported-data-providers).

To get fields from the GraphQL API, you can use the `meta.fields` parameter of the data hooks. The `fields` parameter is an array of strings that represent the fields you want to get from the API.

```tsx
import { DataProvider, useOne } from "@refinedev/core";
import * as gql from "gql-query-builder";
import { GraphQLClient } from "graphql-request";

useOne({
    resource: "posts",
    id: "1",
    meta: {
        fields: [
            "id",
            "title",
            {
                category: ["title"],
            },
        ],
    },
});

const dataProvider = (client: GraphQLClient): DataProvider => {
    getOne: async ({ resource, id, meta }) => {
        const { query, variables } = gql.query({
            operation: resource,
            variables: {
                id: { value: id, type: "ID", required: true },
            },
            fields: meta?.fields,
        });

        const response = await client.request(query, variables);

        return {
            data: response[resource],
        };
    };
};
```

## Invalidation

Query invalidation is a mechanism used in web development to ensure that cached data retrieved from a server is kept up to date. It is a critical part of the caching process, as it ensures that the data is always fresh and accurate.

**refine** automatically invalidates all the queries that are in the defined scope after a successful mutation. It also provides a way to customize the invalidation scope by passing the `invalidates` prop to the data hooks.

In [realtime](/docs/guides-concepts/realtime/) updates, **refine** will invalidate and refetch all the active queries that are in the defined scope.

In both cases, when ongoing queries are in progress, **refine** leaves them untouched. There's no need to worry about ongoing operations being invalidated or refetched.

For instance, let's say we have a `posts` resource and we want updating a post with `useUpdate` hook. **refine** automatically invalidates the `posts` resource after a successful mutation. Also you can customize the invalidation scope by passing the `invalidates` prop to the `useUpdate` hook.

Additionally, you can use the [`useInvalidate`](/docs/api-reference/core/hooks/invalidate/useInvalidate/) hook to invalidate a specific query.

## Multiple Data Provider

Using multiple data providers in **refine** allows you to work with various APIs or data sources in a single application. You might use different data providers for different parts of your app, like one for user data and another for product information. This flexibility is handy when dealing with various data structures and APIs. Each data provider can have its own configuration, making it easier to manage complex data scenarios within a single application.

## Error handling

**refine** expects errors to be extended from [HttpError](/docs/api-reference/core/interfaceReferences/#httperror)

```tsx
import { DataProvider, useOne, HttpError } from "@refinedev/core";

const { error: useOneError } = useOne({
    resource: "posts",
    id: "1",
});

console.log(useOneError); // { message: "Something went wrong", statusCode: 500 }

export const dataProvider = (apiUrl: string): DataProvider => ({
    getOne: async ({ resource, id, meta }) => {
        try {
            const response = await fetch(`${apiUrl}/${resource}/${id}`);

            if (!response.ok) {
                const error: HttpError = {
                    message: response.statusText,
                    statusCode: response.status,
                };
                return Promise.reject(error);
            }

            return {
                data: response.data,
            };
        } catch (error) {
            const error: HttpError = {
                message: error?.message || "Something went wrong",
                statusCode: error?.status || 500,
            };
            return Promise.reject(error);
        }
    },
    // ...
});
```

## Authentication

**refine** handles [authentication](/docs/guides-concepts/authentication/) by [Auth Provider](/docs/core/providers/auth-provider/). Once implemented, the data provider should be able to handle authentication in the same way as any other API request.

For instance, imagine we stored the `accessToken` in the `localStorage` and we want to use it in the data provider.

```tsx
import { DataProvider } from "@refinedev/core";

export const dataProvider = (apiUrl: string): DataProvider => ({
    getOne: async ({ resource, id, meta }) => {
        const accessToken = localStorage.getItem("accessToken");

        const response = await fetch(`${apiUrl}/${resource}/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const data = await response.json();

        return {
            data,
        };
    },
});
```

## TanStack Query `QueryClient`

To modify the [`QueryClient`](https://tanstack.com/query/latest/docs/react/reference/QueryClient) instance, you can use the `reactQuery` prop of the [`<Refine />`](/docs/core/refine-component/) component.

## `dataProvider` interface

<DataProviderInterface />

## Supported data providers

<SupportedDataProviders/>

## Data hooks

<DataHooks />

[basekey]: /docs/api-reference/core/interfaceReferences/#basekey
[create-a-data-provider]: /docs/tutorial/understanding-dataprovider/create-dataprovider/
[swizzle-a-data-provider]: /docs/tutorial/understanding-dataprovider/swizzle/
[data-provider-tutorial]: /docs/tutorial/understanding-dataprovider/index/
[use-api-url]: /docs/api-reference/core/hooks/data/useApiUrl/
[use-create]: /docs/api-reference/core/hooks/data/useCreate/
[use-create-many]: /docs/api-reference/core/hooks/data/useCreateMany/
[use-custom]: /docs/api-reference/core/hooks/data/useCustom/
[use-delete]: /docs/api-reference/core/hooks/data/useDelete/
[use-delete-many]: /docs/api-reference/core/hooks/data/useDeleteMany/
[use-list]: /docs/api-reference/core/hooks/data/useList/
[use-infinite-list]: /docs/api-reference/core/hooks/data/useInfiniteList/
[use-many]: /docs/api-reference/core/hooks/data/useMany/
[use-one]: /docs/api-reference/core/hooks/data/useOne/
[use-update]: /docs/api-reference/core/hooks/data/useUpdate/
[use-update-many]: /docs/api-reference/core/hooks/data/useUpdateMany/
[crud-sorting]: /docs/api-reference/core/interfaceReferences/#crudsorting
[crud-filters]: /docs/api-reference/core/interfaceReferences/#crudfilters
[pagination]: /docs/api-reference/core/interfaceReferences/#pagination
[http-error]: /docs/api-reference/core/interfaceReferences/#httperror
[meta-data]: /docs/api-reference/core/interfaceReferences/#metadataquery
