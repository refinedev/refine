---
id: useOne
title: useOne
siderbar_label: useOne
description: useOne data hook from refine is a modified version of react-query's useQuery for retrieving single items from a resource
---

`useOne` is a modified version of `react-query`'s [`useQuery`](https://react-query.tanstack.com/guides/queries) used for retrieving single items from a `resource`.

It uses `getOne` method as query function from the [`dataProvider`](/api-reference/core/providers/data-provider.md) which is passed to `<Refine>`.

## Usage

Let's say that we have a resource named `posts`.

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
    ];
}
```

```tsx
import { useOne } from "@pankod/refine-core";

type ICategory = {
    id: number;
    title: string;
};

const categoryQueryResult = useOne<ICategory>({
    resource: "categories",
    id: 1,
});
```

:::tip
`useOne` can also accept all `useQuery` options.  
[Refer to react-query docs for further information. &#8594](https://react-query.tanstack.com/reference/useQuery)

-   For example, to disable the query from running automatically you can set `enabled` to `false`

```tsx
const categoryQueryResult = useOne<ICategory>({
    resource: "categories",
    id: 1,
    queryOptions: {
        enabled: false,
    },
});
```

:::

<br />

After query runs, the `categoryQueryResult` will include the retrieved data:

```json title="categoryQueryResult.data"
{
    "data": {
        "id": 1,
        "title": "E-business"
    }
}
```

:::tip
`useOne` returns the result of `react-query`'s `useQuery` which includes many properties such as `isLoading` and `isFetching`.  
[Refer to react-query docs for further information. &#8594](https://react-query.tanstack.com/reference/useQuery)
:::

## API

### Properties

<PropsTable module="@pankod/refine-core/useOne" 
successNotification-default='`false`'
errorNotification-default='"Error (status code: `statusCode`)"'
/>

### Type Parameters

| Property | Desription                                                                                     | Type                                                         | Default                                                      |
| -------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| TData    | Result data of the query. Extends [`BaseRecord`](/api-reference/core/interfaces.md#baserecord) | [`BaseRecord`](/api-reference/core/interfaces.md#baserecord) | [`BaseRecord`](/api-reference/core/interfaces.md#baserecord) |
| TError   | Custom error object that extends [`HttpError`](/api-reference/core/interfaces.md#httperror)    | [`HttpError`](/api-reference/core/interfaces.md#httperror)   | [`HttpError`](/api-reference/core/interfaces.md#httperror)   |

### Return values

| Description                              | Type                                                                                           |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Result of the `react-query`'s `useQuery` | [`QueryObserverResult<{ data: TData; }>`](https://react-query.tanstack.com/reference/useQuery) |
