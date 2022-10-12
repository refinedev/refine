---
id: useMany
title: useMany
siderbar_label: useMany
description: useMany data hook from refine is a modified version of react-query's useQuery for retrieving multiple items from a resource
---

`useMany` is a modified version of `react-query`'s [`useQuery`](https://react-query.tanstack.com/guides/queries) used for retrieving multiple items from a `resource`.

It uses `getMany` method as query function from the [`dataProvider`](/api-reference/core/providers/data-provider.md) which is passed to `<Refine>`.

:::tip
If your data provider didn't implement `getMany` method, `useMany` will use `getOne` method multiple times instead.
:::

## Usage

Let's say that we have a resource named `categories`.

```ts title="https://api.fake-rest.refine.dev/categories"
{
    [
        {
            id: 1,
            title: "E-business",
        },
        {
            id: 2,
            title: "Virtual Invoice Avon",
        },
        {
            id: 3,
            title: "Powerful Crypto",
        },
    ];
}
```

```tsx
import { useMany } from "@pankod/refine-core";

type ICategory = {
    id: number;
    title: string;
};

const categoryQueryResult = useMany<ICategory>({
    resource: "categories",
    ids: [1, 2],
});
```

:::tip
`useMany` can also accept all `useQuery` options.  
[Refer to react-query docs for further information. &#8594](https://react-query.tanstack.com/reference/useQuery)

-   For example, to disable query from running automatically you can set `enabled` to `false`

```tsx
const categoryQueryResult = useMany<ICategory>({
    resource: "categories",
    ids: [1, 2],
    queryOptions: { enabled: false },
});
```

:::

<br />

After query runs, the `categoryQueryResult` will include the retrieved data:

```json title="categoryQueryResult.data"
{
    "data": [
        {
            "id": 1,
            "title": "E-business"
        },
        {
            "id": 2,
            "title": "Virtual Invoice Avon"
        }
    ]
}
```

:::tip
`useMany` returns the result of `react-query`'s `useQuery` which includes properties such as `isLoading` and `isFetching`.  
[Refer to react-query docs for further information. &#8594](https://react-query.tanstack.com/reference/useQuery)
:::

## API

### Properties

<PropsTable module="@pankod/refine-core/useMany" 
successNotification-default='`false`'
errorNotification-default='"Error (status code: `statusCode`)"'
/>

### Type Parameters

| Property | Desription                                                                                     | Type                                                         | Default                                                      |
| -------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| TData    | Result data of the query. Extends [`BaseRecord`](/api-reference/core/interfaces.md#baserecord) | [`BaseRecord`](/api-reference/core/interfaces.md#baserecord) | [`BaseRecord`](/api-reference/core/interfaces.md#baserecord) |
| TError   | Custom error object that extends [`HttpError`](/api-reference/core/interfaces.md#httperror)    | [`HttpError`](/api-reference/core/interfaces.md#httperror)   | [`HttpError`](/api-reference/core/interfaces.md#httperror)   |

### Return values

| Description                              | Type                                                                                             |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Result of the `react-query`'s `useQuery` | [`QueryObserverResult<{ data: TData[]; }>`](https://react-query.tanstack.com/reference/useQuery) |
