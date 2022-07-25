---
id: useList
title: useList
siderbar_label: useList
description: useList data hook from refine is a modified version of react-query's useQuery for retrieving  items from a resource with pagination, search, sort, and filter configurations.
---

`useList` is a modified version of `react-query`'s [`useQuery`](https://react-query.tanstack.com/guides/queries) used for retrieving items from a `resource` with pagination, sort, and filter configurations.

It uses the `getList` method as the query function from the [`dataProvider`](/core/providers/data-provider.md) which is passed to `<Refine>`.

## Usage

Let's say that we have a resource named `posts`

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

<br />

`useList` passes the query configuration to `getList` method from the [`dataProvider`](/core/providers/data-provider.md). We will be using the [`dataProvider`](/core/providers/data-provider.md) from [`@pankod/refine-simple-rest`](https://www.npmjs.com/package/@pankod/refine-simple-rest)

First of all, we will use `useList` without passing any query configurations.

```tsx
import { useList } from "@pankod/refine-core";

type IPost = {
    id: number;
    title: string;
    status: "rejected" | "published" | "draft";
};

const postListQueryResult = useList<IPost>({ resource: "posts" });
```

```ts title="postListQueryResult.data"
{
    data: [
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
        {
            id: 1,
            title: "E-business",
            status: "draft"
        },
    ],
    total: 3
}
```

<br />

Although we didn't pass any sort order configurations to `useList`, data comes in descending order according to `id` since `getList` has default values for sort order:

```ts
{
    sort: [{ order: "desc", field: "id" }];
}
```

:::important
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

| Property                                                                                           | Description                                                                                                                                                        | Type                                                                            |
| -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------- | ----------------------------------- |
| <div className="required-block"><div>resource</div> <div className="required">Required</div></div> | Resource name for API data interactions                                                                                                                            | `string`                                                                        |
| config                                                                                             | Configuration for pagination, sorting and filtering                                                                                                                | [`UseListConfig`](#config-parameters)                                           |                                     |
| queryOptions                                                                                       | `react-query`'s `useQuery` options                                                                                                                                 | ` UseQueryOptions<`<br/>`{ data: TData[]; },`<br/>`TError>`                     |
| successNotification                                                                                | Successful Query notification                                                                                                                                      | [`SuccessErrorNotification`](/core/interfaces.md#successerrornotification)      | `false`                             |
| errorNotification                                                                                  | Unsuccessful Query notification                                                                                                                                    | [`SuccessErrorNotification`](/core/interfaces.md#successerrornotification)      | "Error (status code: `statusCode`)" |
| metaData                                                                                           | Metadata query for `dataProvider`                                                                                                                                  | [`MetaDataQuery`](/core/interfaces.md#metadataquery)                            | {}                                  |
| dataProviderName                                                                                   | If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use.                                                                 | `string`                                                                        | `default`                           |
| [liveMode](/core/providers/live-provider.md#usage-in-a-hook)                                       | Whether to update data automatically (`"auto"`) or not (`"manual"`) if a related live event is received. The "off" value is used to avoid creating a subscription. | [`"auto"` \| `"manual"` \| `"off"`](/core/interfaces.md#livemodeprops)          | `"off"`                             |
| liveParams                                                                                         | Params to pass to `liveProvider`'s `subscribe` method if `liveMode` is enabled.                                                                                    | [`{ ids?: BaseKey[]; [key: string]: any; }`](/core/interfaces.md#livemodeprops) | `undefined`                         |
| onLiveEvent                                                                                        | Callback to handle all related live events of this hook.                                                                                                           | [`(event: LiveEvent) => void`](/core/interfaces.md#livemodeprops)               | `undefined`                         |

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

| Property | Desription                                                                       | Type                                           | Default                                        |
| -------- | -------------------------------------------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| TData    | Result data of the query. Extends [`BaseRecord`](/core/interfaces.md#baserecord) | [`BaseRecord`](/core/interfaces.md#baserecord) | [`BaseRecord`](/core/interfaces.md#baserecord) |
| TError   | Custom error object that extends [`HttpError`](/core/interfaces.md#httperror)    | [`HttpError`](/core/interfaces.md#httperror)   | [`HttpError`](/core/interfaces.md#httperror)   |

### Return values

| Description                              | Type                                                                                                                                         |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Result of the `react-query`'s `useQuery` | [`QueryObserverResult<{`<br/>` data: TData[];`<br/>` total: number; },`<br/>` TError>`](https://react-query.tanstack.com/reference/useQuery) |
