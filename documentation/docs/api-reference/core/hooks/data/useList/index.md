---
title: useList
siderbar_label: useList
---

import BasicUsageLivePreview from "./basic-usage-live-preview.md";
import PaginationLivePreview from "./pagination-live-preview.md";
import FilteringLivePreview from "./filtering-live-preview.md";
import SortingLivePreview from "./sorting-live-preview.md";

`useList` is a extended version of `react-query`'s [`useQuery`](https://react-query.tanstack.com/guides/queries). It support all the features of `useQuery` and adds some extra features.

-   It uses the `getList` method as the **query function** from the [`dataProvider`](/api-reference/core/providers/data-provider.md) which is passed to `<Refine>`.

-   It uses query key to cache the data. The **query key** is generated from the provided properties. You can see the query key by using the `react-query` devtools.

When you need to fetch data according to sort, filter, pagination etc. from a resource, you can use `useList` hook. It will return the data and some functions to control the query.

## Basic Usage

Here is a basic example of how to use `useList` hook.

<BasicUsageLivePreview />

## Pagination

`useList` hook supports pagination feature. You can pass `pagination` property to enable pagination. In order to handle pagination, `useList` hook passes `pagination` property to the `getList` method from the `dataProvider`.

Dynamically changing the `pagination` properties will trigger a new request.

<PaginationLivePreview />

## Sorting

`useList` hook supports sorting feature. You can pass `sort` property to enable sorting. In order to handle sorting, `useList` hook passes `sort` property to the `getList` method from the `dataProvider`.

Dynamically changing the `sort` property will trigger a new request.

<SortingLivePreview />

## Filtering

`useList` hook supports filtering feature. You can pass `filters` property to enable filtering. In order to handle filtering, `useList` hook passes `filters` property to the `getList` method from the `dataProvider`.

Dynamically changing the `filters` property will trigger a new request.

<FilteringLivePreview />

## Properties

### `resource`

It will be passed to the `getList` method from the `dataProvider` as parameter. The parameter is usually used as an API endpoint path. It all depends on how to handle the `resource` in the `getList` method. See the [creating a data provider](/docs/api-reference/core/providers/data-provider#creating-a-data-provider) section for an example of how resource are handled.

By default, `resource` is required.

### `dataProviderName`

If there is more than one `dataProvider`, you can specify which one to use by passing the `dataProviderName` prop. It is useful when you have a different data provider for different resources.

```tsx
useList({
    dataProviderName: "second-data-provider",
});
```

### `config.filters`

`filters` will be passed to the `getList` method from the `dataProvider` as parameter. It is used to send filter query parameters to the API.

[Refer to the `CrudFilters` interface for more information &#8594](/docs/api-reference/core/interfaceReferences#crudfilters)

```tsx
useList({
    config: {
        filters: [
            {
                field: "title",
                operator: "contains",
                value: "Foo",
            },
        ],
    },
});
```

### `config.sort`

`sort` will be passed to the `getList` method from the `dataProvider` as parameter. It is used to send sort query parameters to the API.

[Refer to the `CrudSorting` interface for more information &#8594](docs/api-reference/core/interfaceReferences#crudsorting)

```tsx
useList({
    config: {
        sort: [
            {
                field: "title",
                order: "asc",
            },
        ],
    },
});
```

### `config.pagination`

`pagination` will be passed to the `getList` method from the `dataProvider` as parameter. It is used to send pagination query parameters to the API.

#### `current`

You can pass the `current` page number to the `pagination` property.

```tsx
useList({
    config: {
        pagination: {
            current: 2,
        },
    },
});
```

#### `pageSize`

You can pass the `pageSize` to the `pagination` property.

```tsx
useList({
    config: {
        pagination: {
            pageSize: 20,
        },
    },
});
```

### `hasPagination`

`hasPagination` will be passed to the `getList` method from the `dataProvider` as parameter. It is used to determine whether to use server-side pagination or not.

```tsx
useList({
    hasPagination: false,
});
```

### `queryOptions`

`queryOptions` is used to pass additional options to the `useQuery` hook. It is useful when you want to pass additional options to the `useQuery` hook.

[Refer to the `useQuery` documentation for more information &#8594](https://tanstack.com/query/v4/docs/react/reference/useQuery)

```tsx
useList({
    queryOptions: {
        retry: 3,
    },
});
```

### `metaData`

[`metaData`](/docs/api-reference/general-concepts/#metadata) is used following two purposes:

-   To pass additional information to data provider methods.
-   Generate GraphQL queries using plain JavaScript Objects (JSON). Please refer [GraphQL](/docs/advanced-tutorials/data-provider/graphql/#edit-page) for more information.

In the following example, we pass the `headers` property in the `metaData` object to the `create` method. With similar logic, you can pass any properties to specifically handle the data provider methods.

```tsx
const table = useTable({
    // highlight-start
    metaData: {
        headers: { "x-meta-data": "true" },
    },
    // highlight-end
});

const myDataProvider = {
    //...
    getList: async ({
        resource,
        pagination,
        hasPagination,
        sort,
        filters,
        // highlight-next-line
        metaData,
    }) => {
        // highlight-next-line
        const headers = metaData?.headers ?? {};
        const url = `${apiUrl}/${resource}`;

        //...
        //...

        // highlight-next-line
        const { data, headers } = await httpClient.get(`${url}`, { headers });

        return {
            data,
        };
    },
    //...
};
```

### `successNotification`

> [`NotificationProvider`](/docs/api-reference/core/providers/notification-provider/) is required.

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

> [`NotificationProvider`](/docs/api-reference/core/providers/notification-provider/) is required.

After data fetching is failed, `useList` will call `open` function from `NotificationProvider` to show a error notification. With this prop, you can customize the error notification.

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

Whether to update data automatically ("auto") or not ("manual") if a related live event is received. It can be used to update and show data in Realtime throughout your app.
For more information about live mode, please check [Live / Realtime](/docs/api-reference/core/providers/live-provider/#livemode) page.

```tsx
useList({
    liveMode: "auto",
});
```

### `onLiveEvent`

The callback function that is executed when new events from a subscription are arrived.

```tsx
useList({
    onLiveEvent: (event) => {
        console.log(event);
    },
});
```

### `liveParams`

Params to pass to [liveProvider's](/docs/api-reference/core/providers/live-provider/#subscribe) subscribe method.

## Return Values

Returns an object with react-query's `useQuery` return values.

[Refer to the `useQuery` documentation for more information &#8594](https://tanstack.com/query/v4/docs/react/reference/useQuery)

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

### Return Values

| Description                              | Type                                                                                                                                         |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Result of the `react-query`'s `useQuery` | [`QueryObserverResult<{`<br/>` data: TData[];`<br/>` total: number; },`<br/>` TError>`](https://react-query.tanstack.com/reference/useQuery) |
