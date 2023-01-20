---
id: useInfiniteList
title: useInfiniteList
siderbar_label: useInfiniteList
description: useInfiniteList data hook from refine is a modified version of react-query's useInfiniteQuery for retrieving items from a resource with pagination, search, sort, and filter configurations.
---

In some APIs, the `cursor-pagination` method is used for its various advantages. With **refine**, this type of API's can be retrieved with the [`useInfiniteQuery`](https://tanstack.com/query/v4/docs/react/reference/useInfiniteQuery) data hook, pagination, filtering and sorting can be done. Ideal for fetching data of the next page and user with a button (or scroll listener) where the total number of records is unknown.

It uses the `getList` method as the query function from the [`dataProvider`](/docs/api-reference/core/providers/data-provider.md) which is passed to `<Refine>`.

```tsx live url=http://localhost:3000/categories previewHeight=420px
import React from "react";
import { Refine } from "@pankod/refine-core";

setInitialRoutes(["/posts"]);
// visible-block-start
import React from "react";
import { useInfiniteList } from "@pankod/refine-core";

const PostList = () => {
    const {
        data,
        error,
        hasNextPage,
        isLoading,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteList({
        resource: "categories",
        config: {
            pagination: {
                pageSize: 4
            }
        }
    });

    if (isLoading) {
        return <p>Loading</p>;
    }
    if (error) {
        return <p>Something went wrong</p>;
    }

    return (
        <div>
            <ul>
                {data?.pages.map((page) =>
                    page.data.map(({ id, title }) => (
                        <li key={id}>
                            {id}.{title}
                        </li>
                    )),
                )}
            </ul>

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
}
// visible-block-end

setRefineProps({
    // Layout: (props: LayoutProps) => <Layout {...props} />,
    resources: [
        {
            name: "posts",
            list: PostList,
        },
    ],
});

render(<RefineHeadlessDemo />);
```

## Usage

Let's consider the following API as an example. Paging is done with the `cursor` parameter. Returns in cursor object whether there are next and previous pages.

```ts title="https://api.fake-rest.refine.dev/posts?cursor=0"
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
        prev: undefined,
    },
}
```

APIs of this type return the next page by sending a unique value of the last displayed row to the paging. The `id` value is used here. For the next page, the request should be request as `https://api.fake-rest.refine.dev/posts?cursor=2`.

### Preparing the data provider

Consumes data from data provider `useInfiniteList` with `getList` method. First of all, we need to make the this method in the data provider convenient for this API. The `cursor` data is kept in `pagination` and should be set to `0` by default.

```ts
getList: async ({ resource, pagination }) => {
    const { current } = pagination;
    const { data } = await axios.get(
        `https://api.fake-rest.refine.dev/${resource}?cursor=${current || 0}`,
    );

    return {
        data: data[resource],
        total: 0,
    };
},
```

:::tip
As the `total` data is only needed in the `offset-pagination` method, define it as `0` here.
:::

After this process, we have successfully retrieved the first page data. Let's fill the `cursor` object for the next page.

```ts
getList: async ({ resource, pagination }) => {
    const { current } = pagination;
    const { data } = await axios.get(
        `https://api.fake-rest.refine.dev/${resource}?cursor=${current || 0}`,
    );

    return {
        data: data[resource],
        total: 0,
        // highlight-start
        cursor: {
            next: data.cursor.next,
            prev: data.cursor.prev,
        },
        // highlight-end
    };
},
```

### Handling the next pages

If you returned a `cursor` object as described above, **refine** will do the pagination automatically. All pages can be accessed in the `pages` array as below.

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
    resource: "posts",
});

if (isLoading) {
    return <p>Loading</p>;
}
if (error) {
    return <p>Something went wrong</p>;
}

return (
    <div>
        <ul>
            {data?.pages.map((page) =>
                page.data.map(({ id, title, createdAt }) => (
                    <li key={id} style={{ marginBottom: 10 }}>
                        <i>{createdAt}</i>
                        <br />
                        {title}
                    </li>
                )),
            )}
        </ul>

        {
            hasNextPage && (
                <button
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                >Load More
                </button>
            )
        }
    </div>
);
```

By default, `refine` expects you to return the `cursor` object, but is not required. This is because some APIs don't work that way. To fix this problem you need to override the `getNextPageParam` method and return the next `cursor`.

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
    resource: "posts",
    // highlight-start
    queryOptions: {
        getNextPageParam: (lastPage, allPages) => {
            // return the last post's id
            const { data } = lastPage;
            const lastPost = data[data.length - 1];
            return lastPost.id;
        },
    },
    // highlight-end
});
```
:::tip
When you override this method, you can access the `lastPage` and `allPages`.
:::

### Support for `offset-pagination`

The pagination method prepared for the [`useList`](/docs/api-reference/core/hooks/data/useList.md) hook can also be used here.

*TODO: More Information*

### Query Configuration

#### `pagination`

Allows us to set page and items per page values.

For example imagine that we have 1000 post records:

```ts
import { useInfiniteList } from "@pankod/refine-core";

const postListQueryResult = useInfiniteList({
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
import { useInfiniteList } from "@pankod/refine-core";

const postListQueryResult = useInfiniteList<IPost>({
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
}
```

> Listing starts from ascending alphabetical order on the `title` field.

<br />

#### `filters`

Allows us to filter queries using refine's filter operators. It is configured via `field`, `operator` and `value` properites.

```ts
import { useInfiniteList } from "@pankod/refine-core";

const postListQueryResult = useInfiniteList<IPost>({
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
`useInfiniteList` can also accept all `useInfiniteQuery` options as a parameter.  
[Refer to react-query docs for further information. &#8594](https://react-query.tanstack.com/reference/useInfiniteQuery)

-   For example, to disable query from running automatically you can set `enabled` to `false`.

```ts
import { useInfiniteList } from "@pankod/refine-core";

const postListQueryResult = useInfiniteList<IPost>({
    resource: "posts",
    // highlight-start
    queryOptions: {
        enabled: false,
        getNextPageParam: ({ data }) => {
            const lastRow = data[data.length - 1];
            return lastRow.id;
        },
    },
    // highlight-end
});
```

:::

<br />

:::tip
`useInfiniteList` returns the result of `react-query`'s `useInfiniteQuery` which includes many properties such as `fetchNextPage`, `hasNextPage` and `isFetchingNextPage`.  
[Refer to react-query docs for further information. &#8594](https://react-query.tanstack.com/reference/useInfiniteQuery)
:::

## API

### Properties

<PropsTable module="@pankod/refine-core/useInfiniteList" 
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

| Description                                      | Type                                                                                                                                                         |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Result of the `react-query`'s `useInfiniteQuery` | [`InfiniteQueryObserverResult<{`<br/>` data: TData[];`<br/>` total: number; },`<br/>` TError>`](https://react-query.tanstack.com/reference/useInfiniteQuery) |
