---
title: useInfiniteList
siderbar_label: useInfiniteList
source: https://github.com/refinedev/refine/blob/next/packages/core/src/hooks/data/useInfiniteList.ts
description: useInfiniteList data hook from refine is a modified version of TanStack Query's useInfiniteQuery for retrieving items from a resource with pagination, search, sort, and filter configurations.
---

import BasicUsageLivePreview from "./basic-usage-live-preview.md";
import SortingLivePreview from "./sorting-live-preview.md";
import FilteringLivePreview from "./filtering-live-preview.md";

`useInfiniteList` is an extended version of TanStack Query's [`useInfiniteQuery`](https://tanstack.com/query/v4/docs/react/reference/useInfiniteQuery) used for retrieving items from a `resource` with pagination, sort, and filter configurations. It is ideal for lists where the total number of records is unknown and the user loads the next pages with a button.

-   It uses the `getList` method as the query function from the [`dataProvider`](/docs/api-reference/core/providers/data-provider.md) which is passed to `<Refine>`.

-   It uses a query key to cache the data. The **query key** is generated from the provided properties. You can see the query key by using the TanStack Query devtools.

## Basic Usage

Here is a basic example of how to use the `useInfiniteList` hook.

<BasicUsageLivePreview />

## Pagination

`useInfiniteList` hook supports pagination properties just like [`useList`](/docs/api-reference/core/hooks/data/useList/). To handle pagination, the `useInfiniteList` hook passes the `pagination` property to the `getList` method from the `dataProvider`.

Dynamically changing the `pagination` properties will trigger a new request. Also, the `fetchNextPage` method will increase the `pagination.current` property by one and trigger a new request.

```ts
import { useInfiniteList } from "@refinedev/core";

const postListQueryResult = useInfiniteList({
    resource: "posts",
    pagination: { current: 3, pageSize: 8 },
});
```

## Sorting

The `useInfiniteList` hook supports the sorting feature. You can pass the `sorters` property to enable sorting. To handle sorting, the `useInfiniteList` hook passes the `sorters` property to the `getList` method from the `dataProvider`.

Dynamically changing the `sorters` property will trigger a new request.

<SortingLivePreview />

## Filtering

The `useInfiniteList` hook supports the filtering feature. You can pass the `filters` property to enable filtering. To handle filtering, the `useInfiniteList` hook passes the `filters` property to the `getList` method from the `dataProvider`.

Dynamically changing the `filters` property will trigger a new request.

<FilteringLivePreview />

## Realtime Updates

> This feature is only available if you use a [Live Provider](/docs/api-reference/core/providers/live-provider).

When the `useInfiniteList` hook is mounted, it will call the `subscribe` method from the `liveProvider` with some parameters such as `channel`, `resource` etc. It is useful when you want to subscribe to live updates.

[Refer to the `liveProvider` documentation for more information &#8594](/docs/api-reference/core/providers/live-provider)

## Properties

### `resource` <PropTag required />

It will be passed to the `getList` method from the `dataProvider` as a parameter. The parameter is usually used as an API endpoint path. It all depends on how to handle the `resource` in the `getList` method. See the [creating a data provider](/docs/tutorial/understanding-dataprovider/create-dataprovider/) section for an example of how resources are handled.

```tsx
useInfiniteList({
    resource: "categories",
});
```

### `dataProviderName`

If there is more than one `dataProvider`, you can specify which one to use by passing the `dataProviderName` prop. It is useful when you have a different data provider for different resources.

```tsx
useInfiniteList({
    dataProviderName: "second-data-provider",
});
```

### `filters`

`filters` will be passed to the `getList` method from the `dataProvider` as a parameter. It is used to send filter query parameters to the API.

[Refer to the `CrudFilters` interface for more information &#8594](/docs/api-reference/core/interfaceReferences#crudfilters)

```tsx
useInfiniteList({
    filters: [
        {
            field: "title",
            operator: "contains",
            value: "Foo",
        },
    ],
});
```

### `sorters`

`sorters` will be passed to the `getList` method from the `dataProvider` as a parameter. It is used to send sort query parameters to the API.

[Refer to the `CrudSorting` interface for more information &#8594](docs/api-reference/core/interfaceReferences#crudsorting)

```tsx
useInfiniteList({
    sorters: [
        {
            field: "title",
            order: "asc",
        },
    ],
});
```

### `pagination`

`pagination` will be passed to the `getList` method from the `dataProvider` as a parameter. It is used to send pagination query parameters to the API.

#### `current`

You can pass the `current` page number to the `pagination` property.

```tsx
useInfiniteList({
    pagination: {
        current: 2,
    },
});
```

#### `pageSize`

You can pass the `pageSize` to the `pagination` property.

```tsx
useInfiniteList({
    pagination: {
        pageSize: 20,
    },
});
```

#### `mode`

It can be `"off"`, `"client"` or `"server"`. It is used to determine whether to use server-side pagination or not.

```tsx
useInfiniteList({
    pagination: {
        mode: "off",
    },
});
```

### `queryOptions`

`queryOptions` is used to pass additional options to the `useQuery` hook. It is useful when you want to pass additional options to the `useQuery` hook.

[Refer to the `useQuery` documentation for more information &#8594](https://tanstack.com/query/v4/docs/react/reference/useQuery)

```tsx
useInfiniteList({
    queryOptions: {
        retry: 3,
    },
});
```

### `meta`

`meta` is a special property that can be used to pass additional information to data provider methods for the following purposes:

-   Customizing the data provider methods for specific use cases.
-   Generating GraphQL queries using plain JavaScript Objects (JSON).

[Refer to the `meta` section of the General Concepts documentation for more information &#8594](/docs/api-reference/general-concepts/#meta)

In the following example, we pass the `headers` property in the `meta` object to the `create` method. With similar logic, you can pass any properties to specifically handle the data provider methods.

```tsx
useInfiniteList({
    // highlight-start
    meta: {
        headers: { "x-meta-data": "true" },
    },
    // highlight-end
});

const myDataProvider = {
    //...
    getList: async ({
        resource,
        pagination,
        sorters,
        filters,
        // highlight-next-line
        meta,
    }) => {
        // highlight-next-line
        const headers = meta?.headers ?? {};
        const url = `${apiUrl}/${resource}`;

        //...
        //...

        // highlight-next-line
        const { data } = await httpClient.get(`${url}`, { headers });

        return {
            data,
        };
    },
    //...
};
```

### `successNotification`

> [`NotificationProvider`](/docs/api-reference/core/providers/notification-provider/) is required for this prop to work.

After data is fetched successfully, `useInfiniteList` can call `open` function from `NotificationProvider` to show a success notification. With this prop, you can customize the success notification.

```tsx
useInfiniteList({
    successNotification: (data, values, resource) => {
        return {
            message: `${data.title} Successfully fetched.`,
            description: "Success with no errors",
            type: "success",
        };
    },
});
```

### `errorNotification`

> [`NotificationProvider`](/docs/api-reference/core/providers/notification-provider/) is required for this prop to work.

After data fetching is failed, `useInfiniteList` will call `open` function from `NotificationProvider` to show an error notification. With this prop, you can customize the error notification.

```tsx
useInfiniteList({
    errorNotification: (data, values, resource) => {
        return {
            message: `Something went wrong when getting ${data.id}`,
            description: "Error",
            type: "error",
        };
    },
});
```

### `liveMode`

> [`LiveProvider`](/docs/api-reference/core/providers/live-provider/) is required for this prop to work.

Determines whether to update data automatically ("auto") or not ("manual") if a related live event is received. It can be used to update and show data in Realtime throughout your app.
For more information about live mode, please check the [Live / Realtime](/docs/api-reference/core/providers/live-provider/#livemode) page.

```tsx
useInfiniteList({
    liveMode: "auto",
});
```

### `onLiveEvent`

> [`LiveProvider`](/docs/api-reference/core/providers/live-provider/) is required for this prop to work.

The callback function is executed when new events from a subscription have arrived.

```tsx
useInfiniteList({
    onLiveEvent: (event) => {
        console.log(event);
    },
});
```

### `liveParams`

> [`LiveProvider`](/docs/api-reference/core/providers/live-provider/) is required for this prop to work.

Params to pass to liveProvider's [subscribe](/docs/api-reference/core/providers/live-provider/#subscribe) method.

### ~~`config`~~

:::caution Deprecated
Use `pagination`, `hasPagination`, `sorters` and `filters` instead.
:::

### ~~`hasPagination`~~

:::caution Deprecated
Use `pagination.mode` instead.
:::

`hasPagination` will be passed to the `getList` method from the `dataProvider` as a parameter. It is used to determine whether to use server-side pagination or not.

```tsx
useInfiniteList({
    hasPagination: false,
});
```

## Return Values

Returns an object with TanStack Query's `useInfiniteQuery` return values.

[Refer to the `useInfiniteQuery` documentation for more information &#8594](https://tanstack.com/query/latest/docs/react/reference/useInfiniteQuery)

## FAQ

### How to use cursor-based pagination?

Some APIs use the `cursor-pagination` method for its benefits. This method uses a `cursor` object to determine the next set of data. The cursor can be a number or a string and is passed to the API as a query parameter.

**Preparing the data provider:**

Consumes data from data provider `useInfiniteList` with the `getList` method. First of all, we need to make this method in the data provider convenient for this API. The `cursor` data is kept in `pagination` and should be set to `0` by default.

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

After this process, we successfully retrieved the first page of data. Let's fill the `cursor` object for the next page.

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
import { useInfiniteList } from "@refinedev/core";

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

## API

### Properties

<PropsTable module="@refinedev/core/useInfiniteList" 
successNotification-default='`false`'
errorNotification-default='"Error (status code: `statusCode`)"'
/>

### Type Parameters

| Property     | Desription                                                                                                                                                          | Type                       | Default                    |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | -------------------------- |
| TQueryFnData | Result data returned by the query function. Extends [`BaseRecord`][baserecord]                                                                                      | [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] |
| TError       | Custom error object that extends [`HttpError`][httperror]                                                                                                           | [`HttpError`][httperror]   | [`HttpError`][httperror]   |
| TData        | Result data returned by the `select` function. Extends [`BaseRecord`][baserecord]. If not specified, the value of `TQueryFnData` will be used as the default value. | [`BaseRecord`][baserecord] | `TQueryFnData`             |

### Return Values

| Description                                       | Type                                                                                                                                                                     |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Result of the TanStack Query's `useInfiniteQuery` | [`InfiniteQueryObserverResult<{`<br/>` data: TData[];`<br/>` total: number; },`<br/>` TError>`](https://tanstack.com/query/latest/docs/react/reference/useInfiniteQuery) |

## Example

<CodeSandboxExample path="use-infinite-list" />

[baserecord]: /api-reference/core/interfaces.md#baserecord
[httperror]: /api-reference/core/interfaces.md#httperror
