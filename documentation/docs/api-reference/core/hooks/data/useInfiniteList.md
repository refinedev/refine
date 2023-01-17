---
id: useInfiniteList
title: useInfiniteList
siderbar_label: useInfiniteList
description: useInfiniteList data hook from refine is a modified version of react-query's useInfiniteQuery for retrieving items from a resource with pagination, search, sort, and filter configurations.
---

In some APIs, the `cursor-pagination` method is used for its various advantages. With **refine**, this type of API's can be retrieved with the [`useInfiniteQuery`](https://tanstack.com/query/v4/docs/react/reference/useInfiniteQuery) data hook, pagination, filtering and sorting can be done. Ideal for fetching data of the next page and user with a button (or scroll listener) where the total number of records is unknown.

It uses the `getList` method as the query function from the [`dataProvider`](/api-reference/core/providers/data-provider.md) which is passed to `<Refine>`.

*TODO: Add LivePreview*

## Usage

There is an API where the pagination is done with `cursor` where the total number of pages is unknown as below.

```ts title="https://api.fake-rest.refine.dev/posts"
{
    posts: [
        {
            id: 1,
            title: "E-business",
            status: "draft",
        },
        {
            id: 2,
            title: "Virtual Invoice Avon",
            status: "published",
        }
    ],
    cursor: {
        next: 2,
        prev: null,
    },
}
```

Now let's see how to use this API with `useInfiniteQuery`. 


```tsx
import { useInfiniteList } from "@pankod/refine-core";

const {
    data,
    error,
    hasNextPage,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
} = useInfiniteList({
    resource: "products",
});

if (isLoading) {
    return <p>Loading</p>;
}
if (error) {
    return <p>ERROR</p>;
}

return (
    <div>
        {data?.pages.map((page) =>
            page.data.map((product) => (
                <li key={product.id}>
                    {product.id}-{product.name}
                </li>
            )),
        )}

        <button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
        >
            {isFetchingNextPage
                ? "Loading more..."
                : hasNextPage
                ? "Load More"
                : "Nothing more to load"}
        </button>
    </div>
);
```

<br />

Although we didn't pass any sort order configurations to `useList`, data comes in descending order according to `id` since `getList` has default values for sort order:

```ts
{
    sort: [{ order: "desc", field: "id" }];
}
```

:::caution
`getList` also has default values for pagination:

```ts
{
    pagination: { current: 1, pageSize: 10 }
}
```

:::
:::caution

If you want to create your own `getList` method, it will automatically implement default query configurations since `useList` can work with no configuration parameters.

:::

<br/>

### Query Configuration

#### `pagination`

Allows us to set page and items per page values.

For example imagine that we have 1000 post records:

```ts
import { useList } from "@pankod/refine-core";

const postListQueryResult = useList<IPost>({
    resource: "posts",
    config: {
        pagination: { current: 3, pageSize: 8 },
    },
});
```

> Listing will start from page 3 showing 8 records.

<br />

#### `sort`

Allows us to sort records by the speficified order and field.

```ts
import { useList } from "@pankod/refine-core";

const postListQueryResult = useList<IPost>({
    resource: "posts",
    config: {
        sort: [{ order: "asc", field: "title" }],
    },
});
```

```ts title="postListQueryResult.data"
{
    data: [
        {
            id: 1,
            title: "E-business",
            status: "draft"
        },
        {
            id: 3,
            title: "Powerful Crypto",
            status: "rejected"
        },
        {
            id: 2,
            title: "Virtual Invoice Avon",
            status: "published"
        },
    ],
    total: 3
}
```

> Listing starts from ascending alphabetical order on the `title` field.

<br />

#### `filters`

Allows us to filter queries using refine's filter operators. It is configured via `field`, `operator` and `value` properites.

```ts
import { useList } from "@pankod/refine-core";

const postListQueryResult = useList<IPost>({
    resource: "posts",
    config: {
        filters: [
            {
                field: "status",
                operator: "eq",
                value: "rejected",
            },
        ],
    },
});
```

```ts title="postListQueryResult.data"
{
    data: [
        {
            id: 3,
            title: "Powerful Crypto",
            status: "rejected"
        },
    ],
    total: 1
}
```

> Only lists records whose `status` equals to "rejected".

<br />

**Supported operators**

| Filter       | Description                     |
| ------------ | ------------------------------- |
| `eq`         | Equal                           |
| `ne`         | Not equal                       |
| `lt`         | Less than                       |
| `gt`         | Greater than                    |
| `lte`        | Less than or equal to           |
| `gte`        | Greater than or equal to        |
| `in`         | Included in an array            |
| `nin`        | Not included in an array        |
| `contains`   | Contains                        |
| `ncontains`  | Doesn't contain                 |
| `containss`  | Contains, case sensitive        |
| `ncontainss` | Doesn't contain, case sensitive |
| `null`       | Is null or not null             |

<br />

:::tip
`useList` can also accept all `useQuery` options as a third parameter.  
[Refer to react-query docs for further information. &#8594](https://react-query.tanstack.com/reference/useQuery)

-   For example, to disable query from running automatically you can set `enabled` to `false`.

```ts
import { useList } from "@pankod/refine-core";

const postListQueryResult = useList<IPost>({
    resource: "posts",
    queryOptions: { enabled: false },
});
```

:::

<br />

:::tip
`useList` returns the result of `react-query`'s `useQuery` which includes many properties such as `isLoading` and `isFetching`.
[Refer to react-query docs for further information. &#8594](https://react-query.tanstack.com/reference/useQuery)
:::

## API

### Properties

<PropsTable module="@pankod/refine-core/useList" 
successNotification-default='`false`'
errorNotification-default='"Error (status code: `statusCode`)"'
/>

### Config parameters

```ts
interface UseListConfig {
    hasPagination?: boolean;
    pagination?: {
        current?: number;
        pageSize?: number;
    };
    sort?: Array<{
        field: string;
        order: "asc" | "desc";
    }>;
    filters?: Array<{
        field: string;
        operator: CrudOperators;
        value: any;
    }>;
}
```

### Type Parameters

| Property | Desription                                                                                     | Type                                                         | Default                                                      |
| -------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| TData    | Result data of the query. Extends [`BaseRecord`](/api-reference/core/interfaces.md#baserecord) | [`BaseRecord`](/api-reference/core/interfaces.md#baserecord) | [`BaseRecord`](/api-reference/core/interfaces.md#baserecord) |
| TError   | Custom error object that extends [`HttpError`](/api-reference/core/interfaces.md#httperror)    | [`HttpError`](/api-reference/core/interfaces.md#httperror)   | [`HttpError`](/api-reference/core/interfaces.md#httperror)   |

### Return values

| Description                              | Type                                                                                                                                         |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Result of the `react-query`'s `useQuery` | [`QueryObserverResult<{`<br/>` data: TData[];`<br/>` total: number; },`<br/>` TError>`](https://react-query.tanstack.com/reference/useQuery) |
