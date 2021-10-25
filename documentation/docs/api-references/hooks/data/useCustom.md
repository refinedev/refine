---
id: useCustom
title: useCustom
siderbar_label: useCustom
---

`useCustom` is a modified version of `react-query`'s [`useQuery`](https://react-query.tanstack.com/reference/useQuery) used for custom requests.

It uses the `custom` method from the [`dataProvider`](api-references/providers/data-provider.md) which is passed to `<Refine>`.

:::danger attention
`useCustom` should **not** be used when creating, updating or deleting a resource. To do these; [useCreate](useCreate.md), [useUpdate](useUpdate.md) or [useDelete](useDelete.md) hooks should be used instead.  
This is because `useCustom`, unlike other data hooks, does not [invalidate queries](https://react-query.tanstack.com/guides/query-invalidation) and therefore will not update the application state either.  
If you have to use `useCustom` for mutation operations, you can manually manage the application state with the `queryResult`'s `refetch` and `remove` methods returned from the hooks that you use.
:::

### Features

-   You can send a request to any link, using any of the methods (`get, delete, head, options, post, put, patch`).
-   You can send comprehensive requests to resources with `Sort` and `Filter` parameters.

### Usage

Let's make a use case. Lets say that we need to verify that the header in the post resource is unique. For this, we have an end-point similar to the one below.

```json title="https://api.fake-rest.refine.dev/posts/unique-check?title=Foo bar"
{
    "isAvailable": true
}
```

```tsx
import { useCustom, useApiUrl } from "@pankod/refine";

interface PostUniqueCheckResponse {
    isAvailable: boolean;
}

const apiUrl = useApiUrl();

// highlight-start
const { data, isLoading } = useCustom<PostUniqueCheckResponse>({
    url: `${apiUrl}/posts-unique-check`,
    method: "get",
    config: {
        query: {
            title: "Foo bar",
        },
    },
});
// highlight-end
```

## API

### Properties

| Property                                        | Description                                                             | Type                                                                                                                                            |
| ----------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| url <div className="required">Required</div>    | URL                                                                     | string                                                                                                                                          |
| method <div className="required">Required</div> | Method                                                                  | `get`, `delete`, `head`, `options`, `post`, `put`, `patch`                                                                                      |
| config                                          | Query Params                                                            | { sort?: [CrudSorting](../../interfaces.md#crudsorting); filters?: [`CrudFilters`](../../interfaces.md#crudfilters); payload?: {}; query?: {} } |
| queryOptions                                    | [useQuery Options](https://react-query.tanstack.com/reference/useQuery) | object                                                                                                                                          |
| metaData                                            | Metadata query for `dataProvider`                                              | [`MetaDataQuery`](/api-references/interfaces.md#metadataquery)           | {}                                                                   |

### Type Parameters

| Property | Desription                                                                       | Type                                           | Default                                        |
| -------- | -------------------------------------------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| TData    | Result data of the query. Extends [`BaseRecord`](../../interfaces.md#baserecord) | [`BaseRecord`](../../interfaces.md#baserecord) | [`BaseRecord`](../../interfaces.md#baserecord) |
| TError   | Custom error object that extends [`HttpError`](../../interfaces.md#httperror)    | [`HttpError`](../../interfaces.md#httperror)   | [`HttpError`](../../interfaces.md#httperror)   |
| TQuery   | Values for query params.                                                         | `TQuery`                                       | unknown                                        |
| TPayload | Values for params.                                                               | `TPayload`                                     | unknown                                        |

### Return value

| Description                            | Type                                                                                                        |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Result of the `react-query`'s useQuery | [`QueryObserverResult<CustomResponse<TData>, TError>`](https://react-query.tanstack.com/reference/useQuery) |
