---
id: useInfiniteList
title: useInfiniteList
siderbar_label: useInfiniteList
description: useInfiniteList data hook from refine is a modified version of react-query's useInfiniteQuery for retrieving items from a resource with pagination, search, sort, and filter configurations.
---

`useInfiniteList` is a modified version of `react-query`'s [`useInfiniteQuery`](https://react-query.tanstack.com/guides/useInfiniteQuery) used for retrieving items from a `resource` with pagination, sort, and filter configurations. It is ideal for lists where the total number of records is unknown and the user loads the next pages with a button.

It uses the `getList` method as the query function from the [`dataProvider`](/docs/api-reference/core/providers/data-provider.md) which is passed to `<Refine>`.

```tsx live url=http://localhost:3000/categories previewHeight=420px hideCode
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

            {
                hasNextPage && (
                    <button
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                    >
                        {isFetchingNextPage ? "Loading more..." : "Load More" }
                    </button>
                )
            }
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

Let's assume that we have a `posts` resource with the following data:

```ts title="https://api.fake-rest.refine.dev/posts"
{
    [
        {
            id: 1,
            title: "E-business",
            status: "draft",
        },
        {
            id: 2,
            title: "Virtual Invoice Avon",
            status: "published",
        },
        {
            id: 3,
            title: "Powerful Crypto",
            status: "rejected",
        },
    ];
}
```

First of all, we will use `useInfiniteList` without passing any query configurations.

```tsx
import { useInfiniteList } from "@pankod/refine-core";

type IPost = {
    id: number;
    title: string;
    status: "rejected" | "published" | "draft";
};

const postInfiniteListResult = useInfiniteList<IPost>({ resource: "posts" });
```

```json title="postInfiniteListResult"
{
    "status": "success",
    "data": {
        "pages": [
            {
                "data": [
                    {
                        "id": 1,
                        "title": "E-business",
                        "status": "draft"
                    },
                    {
                        "id": 2,
                        "title": "Virtual Invoice Avon",
                        "status": "published"
                    }
                ],
                "total": 1370
            }
        ]
    },
    "hasNextPage": true,
    "hasPreviousPage": false,
    "isFetchingNextPage": false,
    "isFetchingPreviousPage": false
    ...
}
```

If your API returns the result like above, you can use useInfiniteList without any configuration.

:::caution
`getList` also has default values for pagination:

```ts
{
    pagination: { current: 1, pageSize: 10 }
}
```

:::
:::caution
If you want to create your own `getList` method, it will automatically implement default query configurations since `useInfiniteList` can work with no configuration parameters.
:::

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

#### `filters`

Allows us to filter queries using refine's filter operators. It is configured via `field`, `operator` and `value` properites.

[Refer to supported operators. &#8594](/docs/api-reference/core/interfaceReferences/#crudfilters)


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

:::tip
`useInfiniteList` returns the result of `react-query`'s `useInfiniteQuery` which includes many properties such as `fetchNextPage`, `hasNextPage` and `isFetchingNextPage`.  

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

## FAQ
### How to use cursor based pagination?

Some APIs use the `cursor-pagination` method for its benefits. This method uses a `cursor` object to determine the next set of data. The cursor can be a number or a string and is passed to the API as a query parameter.

**Preparing the data provider:**

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

### How to override the `getNextPageParam` method?

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