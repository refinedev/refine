---
id: useShow
title: useShow
---

import BasicUsageLivePreview from "./basic-usage-live-preview.md";
import PropResource from "@site/src/partials/prop-resource";

`useShow` is an extended version of [`useOne`](/docs/api-reference/core/hooks/data/useOne/). It supports all the features of `useOne` and adds some extra features.

It is useful when you want to fetch a single record from the API. It will return the data and some functions to control the query.

## Usage

The `useShow` hook does not expect any properties. By default, it will try to read the `resource` and `id` values from the current URL. It will be passed to the `getOne` method from the `dataProvider` as a parameter.

If you define `resource` and `id` on the hook, when these properties are changed, the `useShow` hook will trigger a new request.

<BasicUsageLivePreview />

## Realtime Updates

> This feature is only available if you use a [Live Provider](/docs/api-reference/core/providers/live-provider).

When the `useShow` hook is mounted, it will call the `subscribe` method from the `liveProvider` with some parameters such as `channel`, `resource` etc. It is useful when you want to subscribe to live updates.

[Refer to the `liveProvider` documentation for more information &#8594](/docs/api-reference/core/providers/live-provider)

## Properties

### `resource`

<PropResource
hook={{
        name:"useOne",
        URL:"/docs/api-reference/core/hooks/data/useOne/"
    }}
method={{
        name:"getOne",
        URL:"/docs/api-reference/core/providers/data-provider/#getone"
    }}
/>

```tsx
useShow({
    resource: "categories",
});
```

:::caution

If the `resource` is passed, the `id` from the current URL will be ignored because it may belong to a different resource. To retrieve the `id` value from the current URL, use the `useParsed` hook and pass the `id` value to the `useShow` hook.

```tsx
import { useShow, useParsed } from "@refinedev/core";

const { id } = useParsed();

useShow({
    resource: "custom-resource",
    id,
});
```

Or you can use the `setId` function to set the `id` value.

```tsx
import { useShow } from "@refinedev/core";

const { setShowId } = useShow({
    resource: "custom-resource",
});

setShowId("123");
```

:::

### `id`

> Default: It reads the `id` value from the current URL.

It will be passed to the `getOne` method from the `dataProvider` as a parameter. It is used to determine which record to fetch.

```tsx
useShow({
    id: 123,
});
```

### `meta`

`meta` is a special property that can be used to pass additional information to data provider methods for the following purposes:

-   Customizing the data provider methods for specific use cases.
-   Generating GraphQL queries using plain JavaScript Objects (JSON).

[Refer to the `meta` section of the General Concepts documentation for more information &#8594](/docs/api-reference/general-concepts/#meta)

In the following example, we pass the `headers` property in the `meta` object to the `create` method. With similar logic, you can pass any properties to specifically handle the data provider methods.

```tsx
useShow({
    // highlight-start
    meta: {
        headers: { "x-meta-data": "true" },
    },
    // highlight-end
});

const myDataProvider = {
    //...
    getOne: async ({
        resource,
        id,
        // highlight-next-line
        meta,
    }) => {
        // highlight-next-line
        const headers = meta?.headers ?? {};
        const url = `${apiUrl}/${resource}/${id}`;

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

### `dataProviderName`

If there is more than one `dataProvider`, you can specify which one to use by passing the `dataProviderName` prop. It is useful when you have a different data provider for different resources.

```tsx
useShow({
    dataProviderName: "second-data-provider",
});
```

### `queryOptions`

`queryOptions` is used to pass additional options to the `useQuery` hook. It is useful when you want to pass additional options to the `useQuery` hook.

[Refer to the `useQuery` documentation for more information &#8594](https://tanstack.com/query/v4/docs/react/reference/useQuery)

```tsx
useShow({
    queryOptions: {
        retry: 3,
        enabled: false,
    },
});
```

### `successNotification`

> [`NotificationProvider`](/docs/api-reference/core/providers/notification-provider/) is required for this prop to work.

After data is fetched successfully, `useShow` can call `open` function from `NotificationProvider` to show a success notification. With this prop, you can customize the success notification.

```tsx
useShow({
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

After data fetching is failed, `useShow` will call the `open` function from `NotificationProvider` to show an error notification. With this prop, you can customize the error notification.

```tsx
useShow({
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
useShow({
    liveMode: "auto",
});
```

### `onLiveEvent`

> [`LiveProvider`](/docs/api-reference/core/providers/live-provider/) is required for this prop to work.

The callback function is executed when new events from a subscription have arrived.

```tsx
useShow({
    onLiveEvent: (event) => {
        console.log(event);
    },
});
```

### `liveParams`

> [`LiveProvider`](/docs/api-reference/core/providers/live-provider/) is required for this prop to work.

Params to pass to liveProvider's [subscribe](/docs/api-reference/core/providers/live-provider/#subscribe) method.

## Return Values

### `queryResult`

It is TanStack Query's `useQuery` return values.

[Refer to the `useQuery` documentation for more information &#8594](https://tanstack.com/query/v4/docs/react/reference/useQuery)

### `showId`

It is the `id` value that is used on the `useShow` hook.

### `setShowId`

When you want to change the `showId` value, you can use this setter. It is useful when you want to change the `showId` value based on the user's action.

It will trigger new request to fetch the data when the `showId` value is changed.

## API Reference

### Props

<PropsTable module="@refinedev/core/useShow" liveMode-default='`"off"`' />

### Type Parameters

| Property     | Desription                                                                                                                                                          | Type                       | Default                    |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | -------------------------- |
| TQueryFnData | Result data returned by the query function. Extends [`BaseRecord`][baserecord]                                                                                      | [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] |
| TError       | Custom error object that extends [`HttpError`][httperror]                                                                                                           | [`HttpError`][httperror]   | [`HttpError`][httperror]   |
| TData        | Result data returned by the `select` function. Extends [`BaseRecord`][baserecord]. If not specified, the value of `TQueryFnData` will be used as the default value. | [`BaseRecord`][baserecord] | `TQueryFnData`             |

### Return values

| Property    | Description                     | Type                                                                                          |
| ----------- | ------------------------------- | --------------------------------------------------------------------------------------------- |
| queryResult | Result of the query of a record | [`QueryObserverResult<{ data: TData }>`](https://react-query.tanstack.com/reference/useQuery) |
| showId      | Record id                       | `string`                                                                                      |
| setShowId   | `showId` setter                 | `Dispatch<SetStateAction< string` \| `undefined>>`                                            |

[baserecord]: /api-reference/core/interfaces.md#baserecord
[httperror]: /api-reference/core/interfaces.md#httperror
