---
id: useList
title: useList
siderbar_label: useList
---

`useList` is a modified version of `react-query`'s [`useQuery`](https://react-query.tanstack.com/guides/queries) for retrieving  items from a `resource` with pagination, search, sort, and filter configurations.

It uses the `getList` method as query function from the `dataProvider` that is passed to `<Admin>`.  

## Usage

Let'say we have a `posts` resource

```ts title="https://refine-fake-rest.pankod.com/posts"
{
    [
        {
            id: 1,
            title: "E-business",
            status: "draft"
        },
        {
            id: 2,
            title: "Virtual Invoice Avon",
            status: "published"
        },
        {
            id: 3,
            title: "Powerful Crypto",
            status: "rejected"
        },
    ];
}
```
<br />

`useList` passes query config to `getList` method from the `dataProvider`. We'll be using the `dataProvider` from [`@pankod/refine-json-server`](#)

Firstly, we'll use `useList` without passing any query config.

```tsx
type IPost = {
    id: string;
    title: string;
    status: "rejected" | "published" | "draft";
}

const postListQueryResult = useList<IPost>("posts");
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

Although we didn't pass any sort order config to `useList`, data comes in descending order since `getList` has default values for sort order:

```ts
{   
    sort: { order: "descend" , field: "id" }
}
```

:::caution

If needed, `getList` method from the `dataProvider` has to implement default query configurations since `useList` can work with no config paramaters.

:::

### Query Configuration

#### `pagination`
Allows to set page and items per page values.


Imagine we have 1000 post records:

```ts
const postListQueryResult = useList<IPost>("posts", { current: 3, pageSize: 8 });
```

>Listing will start from page 3 showing 8 records.















:::tip
`useList` can also accept all `useQuery` options.  
[Refer to react-query docs for further information.  &#8594](https://react-query.tanstack.com/reference/useQuery)

- For example, to disable query from running automatically you can set `enabled` to `false`

```tsx
const categoryQueryResult = useList<ICategory>("categories", [ 1, 2 ]), { enabled: false };
```
:::

<br />

After query runs `categoryQueryResult` will include the retrieved data:


```json title="categoryQueryResult.data"
{
    data: [
        {
            id: 1,
            title: "E-business",
        },
        {
            id: 2,
            title: "Virtual Invoice Avon",
        }
    ]
}
```



:::tip
`useList` returns the result of `react-query`'s `useQuery`. It includes properties like `isLoading` and `isFetching` with many others.  
[Refer to react-query docs for further information.  &#8594](https://react-query.tanstack.com/reference/useQuery)
:::

## API

### Parameters


| Property                                                                                            | Description                               | Type                                                        | Default |
| --------------------------------------------------------------------------------------------------- | ----------------------------------------- | ----------------------------------------------------------- | ------- |
| <div className="required-block"><div>resource</div> <div className=" required">Required</div></div> | [`Resource`](#) for API data interactions | `string`                                                    |         |
| ids <div className="required">Required</div>                                                        | ids of the item in the resource           | `(string` \| `number)[]`                                    |         |
| options                                                                                             | `react-query`'s `useQuery` options        | ` UseQueryOptions<`<br/>`{ data: TData[]; },`<br/>`TError>` |         |

### Type Parameters


| Property | Desription                                          | Type              | Default           |
| -------- | --------------------------------------------------- | ----------------- | ----------------- |
| TData    | Result data of the query. Extends [`BaseRecord`](#) | [`BaseRecord`](#) | [`BaseRecord`](#) |
| TError   | Custom error object that extends [`HttpError`](#)   | [`HttpError`](#)  | [`HttpError`](#)  |

### Return values

| Description                              | Type                                                                                             |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Result of the `react-query`'s `useQuery` | [`QueryObserverResult<{ data: TData[]; }>`](https://react-query.tanstack.com/reference/useQuery) |