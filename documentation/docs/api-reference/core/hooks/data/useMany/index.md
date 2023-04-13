---
title: useMany
siderbar_label: useMany
source: packages/core/src/hooks/data/useMany.ts
---

import BasicUsageLivePreview from "./basic-usage-live-preview.md";

`useMany` is an extended version of TanStack Query's [`useQuery`](https://tanstack.com/query/v4/docs/react/reference/useQuery). It supports all the features of `useQuery` and adds some extra features.

-   It uses the `getMany` method as the **query function** from the [`dataProvider`](/api-reference/core/providers/data-provider.md) which is passed to `<Refine>`.

-   It uses a query key to cache the data. The **query key** is generated from the provided properties. You can see the query key by using the TanStack Query devtools.

It is useful when you want to fetch multiple records from the API. It will return the data and some functions to control the query.

:::caution
If your data provider does not have a `getMany` method, `useMany` will use the `getOne` method instead. It is not recommended, because it will make requests one by one for each id. It is better to implement the `getMany` method in the data provider.
:::

## Basic Usage

The `useMany` hook expects a `resource` and `ids` property. It will be passed to the `getMany` method from the `dataProvider` as a parameter.

When these properties are changed, the `useMany` hook will trigger a new request.

<BasicUsageLivePreview />

## Realtime Updates

> This feature is only available if you use a [Live Provider](/docs/api-reference/core/providers/live-provider).

When the `useMany` hook is mounted, it will call the `subscribe` method from the `liveProvider` with some parameters such as `channel`, `resource` etc. It is useful when you want to subscribe to live updates.

[Refer to the `liveProvider` documentation for more information &#8594](/docs/api-reference/core/providers/live-provider)

## Properties

### `resource` <PropTag required />

It will be passed to the `getMany` method from the `dataProvider` as a parameter. The parameter is usually used as an API endpoint path. It all depends on how to handle the `resource` in the `getMany` method. See the [creating a data provider](/docs/tutorial/understanding-dataprovider/create-dataprovider/) section for an example of how resources are handled.

```tsx
useMany({
    resource: "categories",
});
```

### `ids` <PropTag required />

It will be passed to the `getMany` method from the `dataProvider` as a parameter. It is used to determine which records to fetch.

```tsx
useMany({
    ids: [1, 2, 3],
});
```

### `dataProviderName`

If there is more than one `dataProvider`, you can specify which one to use by passing the `dataProviderName` prop. It is useful when you have a different data provider for different resources.

```tsx
useMany({
    dataProviderName: "second-data-provider",
});
```

### `queryOptions`

`queryOptions` is used to pass additional options to the `useQuery` hook. It is useful when you want to pass additional options to the `useQuery` hook.

[Refer to the `useQuery` documentation for more information &#8594](https://tanstack.com/query/v4/docs/react/reference/useQuery)

```tsx
useMany({
    queryOptions: {
        retry: 3,
        enabled: false,
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
import { stringify } from "query-string";

useMany({
    // highlight-start
    meta: {
        headers: { "x-meta-data": "true" },
    },
    // highlight-end
});

const myDataProvider = {
    //...
    getMany: async ({
        resource,
        ids,
        // highlight-next-line
        meta,
    }) => {
        // highlight-next-line
        const headers = meta?.headers ?? {};
        const url = `${apiUrl}/${resource}?${stringify({ id: ids })}`;

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

After data is fetched successfully, `useMany` can call `open` function from `NotificationProvider` to show a success notification. With this prop, you can customize the success notification.

```tsx
useMany({
    successNotification: (data, ids, resource) => {
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

After data fetching is failed, `useMany` will call the `open` function from `NotificationProvider` to show an error notification. With this prop, you can customize the error notification.

```tsx
useMany({
    errorNotification: (data, ids, resource) => {
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
useMany({
    liveMode: "auto",
});
```

### `onLiveEvent`

> [`LiveProvider`](/docs/api-reference/core/providers/live-provider/) is required for this prop to work.

The callback function is executed when new events from a subscription have arrived.

```tsx
useMany({
    onLiveEvent: (event) => {
        console.log(event);
    },
});
```

### `liveParams`

> [`LiveProvider`](/docs/api-reference/core/providers/live-provider/) is required for this prop to work.

Params to pass to liveProvider's [subscribe](/docs/api-reference/core/providers/live-provider/#subscribe) method.

## Return Values

Returns an object with TanStack Query's `useQuery` return values.

[Refer to the `useQuery` documentation for more information &#8594](https://tanstack.com/query/v4/docs/react/reference/useQuery)

## API

### Properties

<PropsTable module="@refinedev/core/useMany" 
successNotification-default='`false`'
errorNotification-default='"Error (status code: `statusCode`)"'
/>

### Type Parameters

| Property     | Desription                                                                                                                                                          | Type                       | Default                    |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | -------------------------- |
| TQueryFnData | Result data returned by the query function. Extends [`BaseRecord`][baserecord]                                                                                      | [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] |
| TError       | Custom error object that extends [`HttpError`][httperror]                                                                                                           | [`HttpError`][httperror]   | [`HttpError`][httperror]   |
| TData        | Result data returned by the `select` function. Extends [`BaseRecord`][baserecord]. If not specified, the value of `TQueryFnData` will be used as the default value. | [`BaseRecord`][baserecord] | `TQueryFnData`             |

### Return values

| Description                               | Type                                                                                                     |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Result of the TanStack Query's `useQuery` | [`QueryObserverResult<{ data: TData[]; }>`](https://tanstack.com/query/v4/docs/react/reference/useQuery) |

[baserecord]: /api-reference/core/interfaces.md#baserecord
[httperror]: /api-reference/core/interfaces.md#httperror
