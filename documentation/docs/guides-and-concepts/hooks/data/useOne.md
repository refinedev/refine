---
id: useOne
title: useOne
siderbar_label: useOne
description: useOne data hook from refine is a modified version of react-query's useQuery for retrieving single items from a resource
---

`useOne` is a modified version of `react-query`'s [`useQuery`](https://react-query.tanstack.com/guides/queries) for retrieving single items from a `resource`. It uses `getOne` method as query function from the `dataProvider` that is passed to `<Admin>`.  

## Usage

Let's say we have a `categories` resource

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
type ICategory = {
    id: string;
    title: string;
}

const categoryQueryResult = useOne<ICategory>("categories", 1);
```

:::tip
`useOne` can also accept all `useQuery` options.  
[Refer to react-query docs for further information. &#8594](https://react-query.tanstack.com/reference/useQuery)

- For example, to disable query from running automatically you can set `enabled` to `false`

```tsx
const categoryQueryResult = useOne<ICategory>("categories", 1, { enabled: false });
```
:::

<br />

After query runs `categoryQueryResult` will include the retrieved data:


```json title="categoryQueryResult.data"
{
    data: {
        id: 1,
        title: "E-business",
    }
}
```



:::tip
`useOne` returns the result of `react-query`'s `useQuery`. It includes properties like `isLoading` and `isFetching` with many others.  
[Refer to react-query docs for further information. &#8594](https://react-query.tanstack.com/reference/useQuery)
:::

## API

### Parameters


| Property                                                                                            | Description                               | Type                                                      | Default |
| --------------------------------------------------------------------------------------------------- | ----------------------------------------- | --------------------------------------------------------- | ------- |
| <div className="required-block"><div>resource</div> <div className=" required">Required</div></div> | [`Resource`](#) for API data interactions | `string`                                                  |         |
| id <div className="required">Required</div>                                                         | id of the item in the resource            | `string` \| `number`                                      |         |
| options                                                                                             | `react-query`'s `useQuery` options        | ` UseQueryOptions<`<br/>`{ data: TData; },`<br/>`TError>` |         |

### Type Parameters


| Property | Desription                                                                 | Type                                     | Default                                  |
| -------- | -------------------------------------------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| TData    | Result data of the query. Extends [`BaseRecord`](interfaces.md#baserecord) | [`BaseRecord`](interfaces.md#baserecord) | [`BaseRecord`](interfaces.md#baserecord) |
| TError   | Custom error object that extends [`HttpError`](interfaces.md#httperror)    | [`HttpError`](interfaces.md#httperror)   | [`HttpError`](interfaces.md#httperror)   |

### Return values

| Description                              | Type                                                                                           |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Result of the `react-query`'s `useQuery` | [`QueryObserverResult<{ data: TData; }>`](https://react-query.tanstack.com/reference/useQuery) |
