---
title: useList
siderbar_label: useList
source: https://github.com/refinedev/refine/blob/next/packages/core/src/hooks/data/useList.ts
---

import BasicUsageLivePreview from "./basic-usage-live-preview.md";
import PaginationLivePreview from "./pagination-live-preview.md";
import FilteringLivePreview from "./filtering-live-preview.md";
import SortingLivePreview from "./sorting-live-preview.md";

`useList` is an extended version of TanStack Query's [`useQuery`](https://tanstack.com/query/v4/docs/react/reference/useQuery) that supports all of its features and also adds some more.

When you need to fetch data according to sort, filter, pagination, etc. from a `resource` , you can use the `useList` hook. It will return the data and some functions to control the query.

-   It uses the `getList` method as the **query function** from the [`dataProvider`](/api-reference/core/providers/data-provider.md) which is passed to `<Refine>`.

-   It uses a query key to cache the data. The **query key** is generated from the provided properties. You can see the query key by using the TanStack Query devtools.

## Basic Usage

Here is a basic example of how to use the `useList` hook.

<BasicUsageLivePreview />

## Pagination

The `useList` hook supports the pagination feature. You can pass the `pagination` property to enable pagination. To handle pagination, the `useList` hook passes the `pagination` property to the `getList` method from the `dataProvider`.

Dynamically changing the `pagination` properties will trigger a new request.

<PaginationLivePreview />

## Sorting

The `useList` hook supports the sorting feature,which you can enable by passing the `sorters` property. `useList` will then pass this property to the `getList` method from the `dataProvider`.

Dynamically changing the `sorters` property will trigger a new request.

<SortingLivePreview />

## Filtering

The `useList` hook supports the filtering feature. You can pass the `filters` property to enable filtering. To handle filtering, the `useList` hook passes the `filters` property to the `getList` method from the `dataProvider`.

Dynamically changing the `filters` property will trigger a new request.

<FilteringLivePreview />

## Realtime Updates

:::caution
This feature is only available if you use a [Live Provider](/docs/api-reference/core/providers/live-provider).
:::

When the `useList` hook is mounted, it will call the `subscribe` method from the `liveProvider` with some parameters such as `channel`, `resource` etc. It is useful when you want to subscribe to live updates.

> For more information, refer to the [`liveProvider` documentation&#8594](/docs/api-reference/core/providers/live-provider)

## Properties

### `resource` <PropTag required />

This parameter will be passed to the `getList` method from the `dataProvider` as a parameter. It is usually used as an API endpoint path but it all depends on how you handle the `resource` in the `getList` method.

```tsx
useList({
    resource: "categories",
});
```

> For more information, refer to the [creating a data provider tutorial &#8594](/docs/tutorial/understanding-dataprovider/create-dataprovider/)

### `dataProviderName`

This prop allows you to specify which `dataProvider` if you have more than one. Just pass it like in the example:

```tsx
useList({
    dataProviderName: "second-data-provider",
});
```

### `filters`

`filters` will be passed to the `getList` method from the `dataProvider` as a parameter. It is used to send filter query parameters to the API.

```tsx
useList({
    filters: [
        {
            field: "title",
            operator: "contains",
            value: "Foo",
        },
    ],
});
```

> For more information, refer to the [`CrudFilters` interface &#8594](/docs/api-reference/core/interfaceReferences#crudfilters)

### `sorters`

`sorters` will be passed to the `getList` method from the `dataProvider` as a parameter. It is used to send sort query parameters to the API.

```tsx
useList({
    sorters: [
        {
            field: "title",
            order: "asc",
        },
    ],
});
```

> For more information, refer to the [`CrudSorting` interface &#8594](docs/api-reference/core/interfaceReferences#crudsorting)

### `pagination`

`pagination` will be passed to the `getList` method from the `dataProvider` as a parameter. It is used to send pagination query parameters to the API.

#### `current`

You can pass the `current` page number to the `pagination` property.

```tsx
useList({
    pagination: {
        current: 2,
    },
});
```

#### `pageSize`

You can pass the `pageSize` to the `pagination` property.

```tsx
useList({
    pagination: {
        pageSize: 20,
    },
});
```

#### `mode`

This property can be `"off"`, `"client"` or `"server"`. It is used to determine whether to use server-side pagination or not.

```tsx
useList({
    pagination: {
        mode: "off",
    },
});
```

### `queryOptions`

`queryOptions` is used to pass additional options to the `useQuery` hook. It is useful when you want to pass additional options to the `useQuery` hook.

```tsx
useList({
    queryOptions: {
        retry: 3,
    },
});
```

> For more information, refer to the [`useQuery` documentation&#8594](https://tanstack.com/query/v4/docs/react/reference/useQuery)

### `meta`

`meta` is a special property that can be used to pass additional information to data provider methods for the following purposes:

-   Customizing the data provider methods for specific use cases.
-   Generating GraphQL queries using plain JavaScript Objects (JSON).

In the following example, we pass the `headers` property in the `meta` object to the `create` method. With similar logic, you can pass any properties to specifically handle the data provider methods.

```tsx
useList({
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

> For more information, refer to the [`meta` section of the General Concepts documentation&#8594](/docs/api-reference/general-concepts/#meta)

### `successNotification`

:::caution
[`NotificationProvider`](/docs/api-reference/core/providers/notification-provider/) is required for this prop to work.
:::

After data is fetched successfully, `useList` can call `open` function from `NotificationProvider` to show a success notification. With this prop, you can customize the success notification.

```tsx
useList({
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

:::caution
[`NotificationProvider`](/docs/api-reference/core/providers/notification-provider/) is required for this prop to work.
:::

After data fetching is failed, `useList` will call `open` function from `NotificationProvider` to show an error notification. With this prop, you can customize the error notification.

```tsx
useList({
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

:::caution
[`LiveProvider`](/docs/api-reference/core/providers/live-provider/) is required for this prop to work.
:::

Determines whether to update data automatically ("auto") or not ("manual") if a related live event is received. It can be used to update and show data in Realtime throughout your app.

```tsx
useList({
    liveMode: "auto",
});
```

> For more information, refer to the [Live / Realtime page&#8594](/docs/api-reference/core/providers/live-provider/#livemode)

### `onLiveEvent`

:::caution
[`LiveProvider`](/docs/api-reference/core/providers/live-provider/) is required for this prop to work.
:::

The callback function is executed when new events from a subscription have arrived.

```tsx
useList({
    onLiveEvent: (event) => {
        console.log(event);
    },
});
```

### `liveParams`

:::caution
[`LiveProvider`](/docs/api-reference/core/providers/live-provider/) is required for this prop to work.
:::

Params to pass to liveProvider's [subscribe](/docs/api-reference/core/providers/live-provider/#subscribe) method.

### ~~`config`~~

:::caution Deprecated
Use `pagination`, `sorters`, and `filters` instead.
:::

### ~~`hasPagination`~~

:::caution Deprecated
Use `pagination.mode` instead.
:::

`hasPagination` will be passed to the `getList` method from the `dataProvider` as a parameter. It is used to determine whether to use server-side pagination or not.

```tsx
useList({
    hasPagination: false,
});
```

## Return Values

Returns an object with TanStack Query's `useQuery` return values.

> For more information, refer to the [`useQuery` documentation&#8594](https://tanstack.com/query/v4/docs/react/reference/useQuery)

## API

### Properties

<PropsTable module="@refinedev/core/useList"
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

| Description                               | Type                                                                                                                                                 |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Result of the TanStack Query's `useQuery` | [`QueryObserverResult<{ data: TData[]; total: number; }, TError>`](https://tanstack.com/query/v4/docs/react/reference/useQuery) |

[baserecord]: /api-reference/core/interfaces.md#baserecord
[httperror]: /api-reference/core/interfaces.md#httperror
