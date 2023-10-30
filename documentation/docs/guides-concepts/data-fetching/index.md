---
title: Data Fetching
---

import UseOne from "./use-one";
import UseUpdate from "./use-update";
import UseList from "./use-list";
import UseListWithFilters from "./use-list-with-filters";
import MultipleDataProvider from "./multiple-data-provider";
import Authentication from "./authentication";
import OneToOne from "./one-to-one";
import OneToMany from "./one-to-many";
import ErrorHandling from "./error-handling";
import SupportedDataProviders from "@site/src/partials/data-provider/supported-data-providers.md";
import DataHooks from "@site/src/partials/data-provider/data-hooks.md";
import DataProviderInterface from "./data-provider-interface.md";

Data provider acts as a data layer for your app, making requests and encapsulating how the data is retrieved. The methods of these requests are then consumed by **refine** via data hooks (`useOne`, `useUpdate`, `useList` etc.) which are used for actions like creating, reading, updating, and deleting a record.

Data providers are versatile and can communicate with a variety of API types, such as `REST`, `GraphQL`, `RPC`, and `SOAP`. Think of a data provider as a bridge connecting **refine** to the your API, adapting and translating the data exchange.

You can [create your own data provider](/docs/tutorial/understanding-dataprovider/create-dataprovider/) or **refine** offers built-in data provider support for the most popular [API's](#supported-data-providers).

Moreover, **refine** offers support for multiple data providers, allowing you to use different data providers for different resources. For instance, you can use `REST` for the `posts` resource and `GraphQL` for the `users` resource.

<div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/providers/data-provider/tutorial_dataprovider_flog.png" />
</div>

## Fetching Data

Imagine we want to fetch a record with the ID `123` from the `products` endpoint. For this, we will use the `useOne` hook. Under the hood, it calls the `dataProvider.getOne` method from your data provider.

<UseOne />

## Updating Data

Now, let's update record from `products` resource. To do this, we can use `useUpdate` hook which calls `dataProvider.update` method under the hood.

<UseUpdate />

**refine** offers various data hooks for CRUD operations:

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

## Meta usage <GuideBadge id="guides-concepts/general-concepts#meta" />

[`meta`][meta] is a special property that can be used to pass additional information to data provider method from data hooks. Meta can be used from anywhere accros your application.

The capabilities of `meta` properties depend on your data provider's implementation. While some may use additional features through `meta`, others may not use them or follow a different approach.

Here are some examples of `meta` usage:

-   Passing additional headers or parameters to the request.
-   Generate GraphQL queries
-   Multi-tenancy support (passing the tenant id to the request)

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
    ...
});
```

## GraphQL

**refine** supports GraphQL by utilizing the [`meta`][meta]. Which is extened from [gql-query-builder](https://github.com/atulmy/gql-query-builder) interface.

You can use `meta.fields`, `meta.variables`, and `meta.operation` to create GraphQL queries using the `gql-query-builder`.

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
    ...
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

Imagine we need to fetch all the records from the `products` endpoint. For this, we can use [`useList`][use-list] or [`useInfiniteList`][use-infinite-list] hook. It calls `dataProvider.getList` method from your data provider.

<UseList />

### Filters, Sorters and Pagination

Let's say we want to fetch five `products` with wooden material, and the prices should be in ascending order. To do this, we can use the `useList` hook with the [`filters`][crud-filters], [`sorters`][crud-sorting], and [`pagination`][pagination] parameters.

`useList` calls the `dataProvider.getList` method under the hood with the given parameters. We will use this parameters to create a query string and send it to the API.

<UseListWithFilters />

[`filters`][crud-filters], [`sorters`][crud-sorting] interface also supports complex queries. For instance, We can fetch products that have a wooden material, belong to category ID 45, and have a price between 1000 and 2000.

```tsx
import { DataProvider, useList } from "@refinedev/core";

useList({
    resource: "products",
    pagination: {
        current: 1,
        pageSize: 10,
    },
    filters: [
        {
            operator: "and",
            value: [
                { field: "material", operator: "eq", value: "wooden" },
                { field: "category.id", operator: "eq", value: 45 },
            ],
        },
        {
            operator: "or",
            value: [
                { field: "price", operator: "gte", value: 1000 },
                { field: "price", operator: "lte", value: 2000 },
            ],
        },
    ],
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
│ Products     │       │ ProductDetail  │
│--------------│       │----------------│
│ id           │───────│ id             │
│ name         │       │ weight         │
│ price        │       │ dimensions     │
│ description  │       │ productId      │
│ detail       │       │                │
│              │       │                │
└──────────────┘       └────────────────┘
```
<!-- prettier-ignore-end -->

We can use the `useOne` hook to fetch the detail of a product.

<OneToOne />

### One-to-Many

In a one-to-many relationship, each resource matches with many other resource. It's like a parent with many children.

For instance, a products can have many reviews.

<!-- prettier-ignore-start -->

```md
┌──────────────┐       ┌────────────────┐
│ Products     │       │ Reviews        │
│--------------│       │----------------│
│ id           │───┐   │ id             │
│ name         │   │   │ rating         │
│ price        │   │   │ comment        │
│ description  │   │   │ user           │
│ detail       │   └───│ product        │
│              │       │                │
└──────────────┘       └────────────────┘
```
<!-- prettier-ignore-end -->

We can use the `useList` hook and filter by the product ID to fetch the reviews of a product.

<OneToMany />

### Many-to-Many

In a many-to-many relationship, each resource matches with many other resources, and each of those resources matches with many other resources.

For instance, products can have many categories, and categories can have many products.

<!-- prettier-ignore-start -->
```md
┌──────────────┐       ┌───────────────────┐       ┌──────────────┐
│ Products     │       │ ProductCategories │       │ Categories   │
│--------------│       │----------------───│       │--------------│
│ id           │───┐   │ id                │   ┌───│ id           │
│ name         │   └───│ productId         │   │   │ name         │
│ price        │       │ categoryId        │───┘   │ description  │
│ description  │       │                   │       │              │
│ detail       │       │                   │       │              │
│              │       │                   │       │              │
└──────────────┘       └───────────────────┘       └──────────────┘

```
<!-- prettier-ignore-end -->

In this case, we can use the `useMany` hook to fetch the categories of a product and the `useMany` hook to fetch the products of a category.

```tsx
import { DataProvider, useMany } from "@refinedev/core";

const { data: productCategories } = useList({
    resource: "productCategories",
});

const { data: products } = useMany({
    resource: "products",
    ids: productCategories.map((productCategory) => productCategory.productId),
    queryOptions: {
        enabled: productCategories.length > 0,
    },
});

const { data: categories } = useMany({
    resource: "categories",
    ids: productCategories.map((productCategory) => productCategory.categoryId),
    queryOptions: {
        enabled: productCategories.length > 0,
    },
});
```

## Authentication <GuideBadge id="guides-concepts/authentication/" />

Imagine you want to fetch a data from a protected API. To do this, you will first need to obtain your authentication token and you will need to send this token with every request.

In **refine** we handle [authentication](/docs/guides-concepts/authentication/) with [Auth Provider](/docs/core/providers/auth-provider/). To get token from the API, we will use the `authProvider.login` method. Then, we will use [`<Authenticated />`](/docs/api-reference/core/components/auth/authenticated/) component to to render the appropriate components.

After obtaining the token, we'll use Axios interceptors to include the token in the headers of all requests.

<Authentication />

## TanStack Query `QueryClient`

To modify the [`QueryClient`](https://tanstack.com/query/latest/docs/react/reference/QueryClient) instance, you can use the `reactQuery` prop of the [`<Refine />`](/docs/core/refine-component/) component.

## `dataProvider` interface

To better understand the data provider interface, we have created an example that demonstrates how the required methods are implemented. For more comprehensive and diverse examples, you can refer to the [supported data providers](#supported-data-providers) section.

> In this example, we implemented data provider to support [JSON placeholder API](https://jsonplaceholder.typicode.com/).

<DataProviderInterface />

[To learn more about the `dataProvider` interface, check out the reference page.](/docs/api-reference/core/providers/data-provider/)

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
[use-login]: /docs/api-reference/core/hooks/authentication/useLogin/
[use-register]: /docs/api-reference/core/hooks/authentication/useRegister/
