---
title: Data Fetching
---

import UseOne from "./use-one";
import UseUpdate from "./use-update";
import UseList from "./use-list";
import MultipleDataProvider from "./multiple-data-provider";
import OneToOne from "./one-to-one";
import OneToMany from "./one-to-many";
import ErrorHandling from "./error-handling";
import SupportedDataProviders from "@site/src/partials/data-provider/supported-data-providers.md";
import DataHooks from "@site/src/partials/data-provider/data-hooks.md";
import DataProviderInterface from "@site/src/partials/data-provider/data-provider-interface.md";

Data provider acts as a data layer for your app, making requests and encapsulating how the data is retrieved. The methods of these requests are then consumed by **refine** via data hooks (`useOne`, `useUpdate`, `useList` etc.) which are used for actions like creating, reading, updating, and deleting a record.

Data providers are versatile and can communicate with a variety of API types, such as `REST`, `GraphQL`, `RPC`, and `SOAP`. Think of a data provider as a bridge connecting **refine** to the your API, adapting and translating the data exchange.

You can [create your own data provider](/docs/tutorial/understanding-dataprovider/create-dataprovider/) or **refine** offers built-in data provider support for the most popular [API's](#supported-data-providers).

Moreover, **refine** offers support for multiple data providers, allowing you to use different data providers for different resources. For instance, you can use `REST` for the `posts` resource and `GraphQL` for the `users` resource.

<div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/providers/data-provider/tutorial_dataprovider_flog.png" />
</div>

## Fetching Data

Let's imagine we need to fetch a record from the `products` resource using the `useOne` data hook in **refine**, it internally utilizes the `dataProvider.getOne` method from your data provider.

Imagine we want to fetch a record with the ID 123 from the "products" endpoint. For this, we will use the `useOne` hook. Under the hood, it calls the `dataProvider.getOne` method from your data provider.

<UseOne />

## Updating Data

In the example above we saw how to fetch a record from the `products` resource. To update the record, we can use the `useUpdate` data hook. It internally utilizes the `dataProvider.update` method from your data provider.

Also, `useUpdate` automatically invalidates the `products` resource after a successful mutation. This means you don't need to refresh the page to see the updated data.

<UseUpdate />

**refine** offers various data hooks for CRUD operations.

<DataHooks />

## How refine treats data and state?

Data hooks uses [TanStack Query](https://tanstack.com/query) under the hood. It takes care of managing the state for you. It provides `data`, `isLoading`, and `error` states to help you handle loading, success, and error scenarios gracefully.

**refine** treats data and state in a structured and efficient manner, providing developers with powerful tools to manage data seamlessly within their applications. Here are some key aspects of how **refine** treats data and state:

1. **Resource-Based Approach:** Organizes data around resources, which are essentially models representing different data entities or API endpoints. These resources help structure your application's data management.

2. **Invalidation:** Automatically invalidates data after a successful mutation (e.g., creating, updating, or deleting a resource), ensuring that the UI is updated with the latest data.

3. **Caching:** Caches data to improve performance and reduce deduplicated API calls.

4. **Optimistic Updates:** Supports optimistic updates, which means it will update the UI optimistically before the actual API call is complete. This enhances the user experience by reducing perceived latency.

5. **Hooks for CRUD Operations:** Offers a collection of hooks that align with common data operations like listing, creating, updating, and deleting data (`useList`, `useCreate`, `useUpdate`, `useDelete`). In addition to these basic hooks, **refine** provides advanced hooks that are a composition of these fundamental ones for handling more complex tasks (`useForm`, `useTable`, `useSelect`).

6. **Integration with UI Libraries:** Works seamlessly with popular UI libraries. It provides a structured approach to handling data within these libraries.

7. **Realtime Updates**: Allowing your application to reflect changes in data as they occur.

## Meta usage

[`meta`][meta] is a special property that can be used to pass additional information to data provider method from data hooks. Meta can be used from anywhere accros your application.

The capabilities of `meta` properties depend on your data provider's implementation. While some may use additional features through `meta`, others may not use them or follow a different approach.

Here are some examples of `meta` usage:

-   Passing additional headers or parameters to the request.
-   Generate GraphQL queries
-   Multi-tenancy support (passing the tenant id to the request)

[Refer to the `meta` section of the General Concepts documentation for more information &#8594](/docs/api-reference/general-concepts/#meta)

```tsx
import { DataProvider, useOne } from "@refinedev/core";

useOne({
    resource: "products",
    id: 1,
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

**refine** provides GraphQL support using [gql-query-builder](https://github.com/atulmy/gql-query-builder). `meta` interface is extended from `gql-query-builder` to create GraphQL queries using this package.

```tsx
import { DataProvider, useOne } from "@refinedev/core";
import * as gql from "gql-query-builder";
import { GraphQLClient } from "graphql-request";

useOne({
    resource: "products",
    id: 1,
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
        const operation = meta?.operation || resource;

        const { query, variables } = gql.query({
            operation,
            variables: {
                id: { value: id, type: "ID", required: true },
            },
            fields: meta?.fields,
            variables: meta?.variables,
        });

        console.log(query); // "query ($id: ID!) { products (id: $id) { id, title, category { title } } }"

        const response = await client.request(query, variables);

        return {
            data: response[resource],
        };
    };
};
```

Also, **refine** offers [GraphQL providers](#supported-data-providers) to handle generating GraphQL queries.

## Multiple Data Provider

Using multiple data providers in **refine** allows you to work with various APIs or data sources in a single application. You might use different data providers for different parts of your app, like one for user data and another for product information. This flexibility is handy when dealing with various data structures and APIs. Each data provider can have its own configuration, making it easier to manage complex data scenarios within a single application.

<MultipleDataProvider />

## Handling errors

**refine** expects errors to be extended from [HttpError](/docs/api-reference/core/interfaceReferences/#httperror). We believe that having consistent error interface makes it easier to handle errors coming from your API.

When implemented correctly, **refine** offers several advantages in error handling:

-   **Notification**: If you have [`notificationProvider` ](/docs/api-reference/core/providers/notification-provider/), **refine** will automatically show a notification when an error occurs.
-   **Server-Side Validation**: Shows [errors coming from the API](/docs/advanced-tutorials/forms/server-side-form-validation/) on the corresponding form fields.
-   **Optimistic Updates**: Automatically reverts the changes when an error occurs during a mutation.

<ErrorHandling />

## Listing Data

For example, let's say we need to fetch all the records from the products resource. For this, we can use [`useList`][use-list] or [`useInfiniteList`][use-infinite-list]. It calls `dataProvider.getList` method from your data provider.

Also, `useList` and `useInfiniteList` takes `sorters`, `pagination` and `filters` parameters to customize the request.

```tsx
import { DataProvider, useList } from "@refinedev/core";

useList({
    resource: "products",
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

<UseList />

## Filters and Sorters

Imagine you're shopping online for items. You're in a section with hundreds of options. Filters act as your shopping criteria, allowing you to choose size, color or price range so you can find products that match your preferences.

In **refine**, with [filters](/docs/api-reference/core/interfaceReferences/#crudfilters) and [sorters](/docs/api-reference/core/interfaceReferences/#crudfilters) interface you can specify and arrange what data you want.

For instance, let's say we want to fetch all the products that are in the "t-shirt" category with "red" or "yellow" color and sort them by "price" in ascending order.

```tsx
import { DataProvider, useList } from "@refinedev/core";

useList({
    resource: "porducts",
    pagination: {
        current: 1,
        pageSize: 10,
    },
    sorters: [{ field: "price", order: "asc" }],
    filters: [
        { field: "category", operator: "eq", value: "t-shirt" },
        {
            operator: "or",
            value: [
                { field: "color", operator: "eq", value: "red" },
                { field: "color", operator: "eq", value: "yellow" },
            ],
        },
    ],
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

## Relationships

**refine** handles data relations with data hooks(eg: `useOne`, `useMany`, etc.). This compositional design allows you to flexibly and efficiently manage data relationships to suit your specific requirements.

### One-to-One

In a one-to-one relationship, each thing matches with just one other thing. It's like a unique partnership.

For instance, a product can have only one product detail.

<!-- prettier-ignore-start -->
```md
┌──────────────┐       ┌────────────────┐
│ Products     │       │ ProductDetails │
│--------------│       │----------------│
│ id           │   ┌──╾│ id             │
│ name         │   │   │ description    │
│ price        │   │   │ manufacturer   │
│ description  │   │   │                │
│ detail       │╾──┘   │                │
│ reviews      │       │                │
└──────────────┘       └────────────────┘
```
<!-- prettier-ignore-end -->

We can use the `useOne` hook to fetch the detail of a product.

<OneToOne />

### One-to-Many

In a one-to-many relationship, each resource matches with many other resource. It's like a parent with many children.

For instance, a post can have many tags.

<!-- prettier-ignore-start -->
```md
┌──────────────┐       ┌────────────────┐
│ Products     │       │ Reviews        │
│--------------│       │----------------│
│ id           │   ┌──╾│ id             │
│ name         │   │   │ rating         │
│ price        │   │   │ comment        │
│ description  │   │   │                │
│ detail       │   │   │                │
│ reviews      │╾──┘   │                │
└──────────────┘       └────────────────┘
```
<!-- prettier-ignore-end -->

We can use the `useMany` hook to fetch the tags of a post.

<OneToMany />

### Many-to-Many

In a many-to-many relationship, each resource matches with many other resources, and each of those resources matches with many other resources.

For instance, products can have many categories, and categories can have many products.

<!-- prettier-ignore-start -->
```md
┌──────────────┐       ┌───────────────────┐       ┌──────────────┐
│ Products     │       │ ProductCategories │       │ Categories   │
│--------------│       │----------------───│       │--------------│
│ id           │╾──┐   │ id                │   ┌──╾│ id           │
│ name         │   └──╾│ product_id        │   │   │ name         │
│ price        │       │ category_id       │╾──┘   │ description  │
│ description  │       │                   │       │              │
│ detail       │       │                   │       │              │
│ reviews      │       │                   │       │              │
│ reviews      │       │                   │       │              │
└──────────────┘       └───────────────────┘       └──────────────┘

```
<!-- prettier-ignore-end -->

In this case, we can use the `useMany` hook to fetch the authors of a book and the `useMany` hook to fetch the books of an author.

```tsx
import { DataProvider, useMany } from "@refinedev/core";

const { data: bookAuthors } = useList({
    resource: "bookAuthors",
});

const { data: authors } = useMany({
    resource: "authors",
    ids: bookAuthors.map((bookAuthor) => bookAuthor.author_id),
    queryOptions: {
        enabled: bookAuthors.length > 0,
    },
});

const { data: books } = useMany({
    resource: "books",
    ids: bookAuthors.map((bookAuthor) => bookAuthor.book_id),
    queryOptions: {
        enabled: bookAuthors.length > 0,
    },
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
[meta]: /docs/api-reference/core/interfaceReferences/#metadataquery
