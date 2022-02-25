---
id: useMany
title: useMany
siderbar_label: useMany
description: useMany data hook from refine is a modified version of react-query's useQuery for retrieving multiple items from a resource
---

`useMany` is a modified version of `react-query`'s [`useQuery`](https://react-query.tanstack.com/guides/queries) used for retrieving multiple items from a `resource`.

It uses `getMany` method as query function from the [`dataProvider`](/core/providers/data-provider.md) which is passed to `<Refine>`.

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

| Property                                                                                            | Description                                                                                                                                                        | Type                                                                           | Default                             |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ----------------------------------- |
| <div className="required-block"><div>resource</div> <div className=" required">Required</div></div> | Resource name for API data interactions                                                                                                                            | `string`                                                                       |                                     |
| ids <div className="required">Required</div>                                                        | ids of the item in the resource                                                                                                                                    | [`BaseKey[]`](/core/interfaces.md#basekey)                                                                      |                                     |
| queryOptions                                                                                        | `react-query`'s `useQuery` options                                                                                                                                 | ` UseQueryOptions<`<br/>`{ data: TData[]; },`<br/>`TError>`                    |                                     |
| successNotification                                                                                 | Successful Query notification                                                                                                                                      | [`SuccessErrorNotification`](/core/interfaces.md#successerrornotification)     | `false`                             |
| errorNotification                                                                                   | Unsuccessful Query notification                                                                                                                                    | [`SuccessErrorNotification`](/core/interfaces.md#successerrornotification)     | "Error (status code: `statusCode`)" |
| metaData                                                                                            | Metadata query for `dataProvider`                                                                                                                                  | [`MetaDataQuery`](/core/interfaces.md#metadataquery)                           | {}                                  |
| dataProviderName                                                                                    | If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use.                                                                 | `string`                                                                       | `default`                           |
| [liveMode](/core/providers/live-provider.md#usage-in-a-hook)                                        | Whether to update data automatically (`"auto"`) or not (`"manual"`) if a related live event is received. The "off" value is used to avoid creating a subscription. | [`"auto"` \| `"manual"` \| `"off"`](/core/interfaces.md#livemodeprops)         | `"off"`                             |
| liveParams                                                                                          | Params to pass to `liveProvider`'s `subscribe` method if `liveMode` is enabled.                                                                                    | [`{ ids?: BaseKey[]; [key: string]: any; }`](/core/interfaces.md#livemodeprops) | `undefined`                         |
| onLiveEvent                                                                                         | Callback to handle all related live events of this hook.                                                                                                           | [`(event: LiveEvent) => void`](/core/interfaces.md#livemodeprops)              | `undefined`                         |

### Type Parameters

| Property | Desription                                                                       | Type                                           | Default                                        |
| -------- | -------------------------------------------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| TData    | Result data of the query. Extends [`BaseRecord`](/core/interfaces.md#baserecord) | [`BaseRecord`](/core/interfaces.md#baserecord) | [`BaseRecord`](/core/interfaces.md#baserecord) |
| TError   | Custom error object that extends [`HttpError`](/core/interfaces.md#httperror)    | [`HttpError`](/core/interfaces.md#httperror)   | [`HttpError`](/core/interfaces.md#httperror)   |

### Return values

| Description                              | Type                                                                                             |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Result of the `react-query`'s `useQuery` | [`QueryObserverResult<{ data: TData[]; }>`](https://react-query.tanstack.com/reference/useQuery) |
