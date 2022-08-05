---
id: useCustomMutation
title: useCustomMutation
siderbar_label: useCustomMutation
---

`useCustomMutation` is a modified version of `react-query`'s [`useMutation`](https://react-query.tanstack.com/reference/useMutation) for custom mutations.

It uses the `custom` method from the [`dataProvider`](/core/providers/data-provider.md) which is passed to `<Refine>`.

:::danger attention
`useCustomMutation` should **not** be used when creating, updating or deleting a resource. To do these; [useCreate](/core/hooks/data/useCreate.md), [useUpdate](useUpdate.md) or [useDelete](useDelete.md) hooks should be used instead.

This is because `useCustomMutation`, unlike other data hooks, does not [invalidate queries](https://react-query.tanstack.com/guides/query-invalidation) and therefore will not update the application state either.

If you need to custom query request, use the [useCustom](/core/hooks/data/useCustom.md) hook.
:::

### Features

-   You can send a request to any link, using any of the methods (`post, put, patch, delete`).

### Usage

Let's create a new category using `useCustomMutation` as a use case.

```json title="[POST] https://api.fake-rest.refine.dev/categories"
{
    "title": "New Category"
}
```

```tsx
import { useCustomMutation, useApiUrl } from "@pankod/refine-core";

interface ICategory {
    id: number;
    title: string;
}

const apiUrl = useApiUrl();

// highlight-start
const { mutate } = useCustomMutation<ICategory>();
mutate({
    url: `${API_URL}/categories`,
    method: "post",
    values: {
        title: "New Category",
    },
});
// highlight-end
```

:::tip
`mutate` can also accept lifecycle methods like `onSuccess` and `onError`.  

```tsx 
mutate(
    {
        url: `${API_URL}/categories`,
        method: "post",
        values: {
            title: "New Category",
        },
    },
    {
        onError: (error, variables, context) => {
            // An error happened!
        },
        onSuccess: (data, variables, context) => {
            // Let's celebrate!
        },
    },
);
```

[Refer to react-query docs for further information. &#8594](https://react-query.tanstack.com/guides/mutations#mutation-side-effects)
:::

## API

### Properties

| Property                                        | Description                                                                                        | Type                                                                       |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| url <div className="required">Required</div>    | URL                                                                                                | string                                                                     |
| method <div className="required">Required</div> | Method                                                                                             | `post`, `put`, `patch`, `delete`                                           |
| successNotification                             | Successful Mutation notification                                                                   | [`SuccessErrorNotification`](/core/interfaces.md#successerrornotification) |
| errorNotification                               | Unsuccessful Mutation notification                                                                 | [`SuccessErrorNotification`](/core/interfaces.md#successerrornotification) |
| metaData                                        | Metadata query for `dataProvider`                                                                  | [`MetaDataQuery`](/core/interfaces.md#metadataquery)                       |
| dataProviderName                                | If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use. | `string`                                                                   |
| config                                          | Config Params                                                                                      | { headers?: {};                                                            |

### Type Parameters

| Property | Desription                                                                       | Type                                           | Default                                        |
| -------- | -------------------------------------------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| TData    | Result data of the query. Extends [`BaseRecord`](/core/interfaces.md#baserecord) | [`BaseRecord`](/core/interfaces.md#baserecord) | [`BaseRecord`](/core/interfaces.md#baserecord) |
| TError   | Custom error object that extends [`HttpError`](/core/interfaces.md#httperror)    | [`HttpError`](/core/interfaces.md#httperror)   | [`HttpError`](/core/interfaces.md#httperror)   |
| TQuery   | Values for query params.                                                         | `TQuery`                                       | unknown                                        |
| TPayload | Values for params.                                                               | `TPayload`                                     | unknown                                        |

### Return value

| Description                               | Type                                                                                                                                                                                   |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Result of the `react-query`'s useMutation | [`UseMutationResult<`<br/>`{ data: TData },`<br/>`TError,`<br/>`  { resource: string; values: TVariables; },`<br/>` unknown>`](https://react-query.tanstack.com/reference/useMutation) |

