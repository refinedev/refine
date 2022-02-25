---
id: useUpdate
title: useUpdate
siderbar_label: useUpdate
description: useUpdate data hook from refine is a modified version of react-query's useMutation for update mutations
---

`useUpdate` is a modified version of `react-query`'s [`useMutation`](https://react-query.tanstack.com/reference/useMutation#) for update mutations.

It uses `update` method as mutation function from the [`dataProvider`](/core/providers/data-provider.md) which is passed to `<Refine>`.

## Features

-   Shows notifications after the mutation succeeds, fails or gets cancelled.

-   Automatically invalidates `list` and `getOne` queries after the mutation is succesfully run.
    [Refer to React Query docs for detailed information &#8594](https://react-query.tanstack.com/guides/invalidations-from-mutations)

-   Supports [mutation mode](#mutation-mode).

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
    ];
}
```

```tsx 
type CategoryMutationResult = {
    id: number;
    title: string;
};

import { useUpdate } from "@pankod/refine-core";

const { mutate } = useUpdate<CategoryMutationResult>();

mutate({
    resource: "categories",
    id: 2,
    values: { title: "New Category Title" },
});
```

:::tip
`mutate` can also accept lifecycle methods like `onSuccess` and `onError`.  
[Refer to react-query docs for further information. &#8594](https://react-query.tanstack.com/guides/mutations#mutation-side-effects)
:::

<br/>

After mutation runs, `categories` will be updated as below:

```ts title="https://api.fake-rest.refine.dev/categories"
{
    [
        {
            id: 1,
            title: "E-business",
        },
        {
            id: 2,
// highlight-next-line
            title: "New Category Title",
        },
    ];
}
```

<br/>

:::note
Queries that use `/categories` endpoint will be automatically invalidated to show the updated data. For example, data returned from [`useList`](useList.md) and [`useOne`](useOne.md) will be automatically updated.
:::

:::tip
`useUpdate` returns `react-query`'s `useMutation` result. This result includes [a lot of properties](https://react-query.tanstack.com/reference/useMutation), one of which being `mutate`.
:::

:::important
Values passed to `mutate` must have these types.

```tsx
{
    resource: string;
    id: BaseKey;
    values: TVariables = {};
    mutationMode?: MutationMode;
    undoableTimeout?: number;
    onCancel?: (cancelMutation: () => void) => void;
}
```

:::

## Mutation mode

Mutation mode determines which mode mutation runs with.

```tsx
import { useUpdate } from "@pankod/refine-core";

const { mutate } = useUpdate();

mutate({
    resource: "categories",
    id: 2,
    values: { title: "New Category Title" },
    // highlight-next-line
    mutationMode: "optimistic",
});
```

[Refer to mutation mode docs for further information. &#8594](guides-and-concepts/mutation-mode.md)

### Creating a custom method for cancelling mutations

You can pass a custom cancel callback to `useUpdate`. This callback will be triggered instead of the default one when undo button is clicked when `mutationMode = "undoable"`.

:::caution
Default behaviour on undo action includes notifications. If a custom callback is passed, this notification will not appear.
:::

:::danger
Passed callback will receive a function that actually cancels the mutation. Don't forget to run this function to cancel the mutation on `undoable` mode.

```tsx
import { useUpdate } from "@pankod/refine-core";

// highlight-start
const customOnCancel = (cancelMutation: () => void) => {
    cancelMutation();
    // rest of custom cancel logic...
};
// highlight-end

const { mutate } = useUpdate();

mutate({
    resource: "categories",
    id: 2,
    values: { title: "New Category Title" },
    mutationMode: "undoable",
    // highlight-start
    undoableTimeout: 7500,
    onCancel: customOnCancel,
    // highlight-end
});
```

After 7.5 seconds the mutation will be executed. The mutation can be cancelled within that 7.5 seconds. If cancelled, `customOnCancel` will be executed and the request will not be sent.
:::

<br />

## API

### Properties

| Property                                                                                            | Description                                                                                        | Type                                                                       | Default                                                      |
| --------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------ |
| <div className="required-block"><div>resource</div> <div className=" required">Required</div></div> | Resource name for API data interactions                                                            | `string`                                                                   |                                                              |
| id <div className=" required">Required</div>                                                        | id for mutation function                                                                           | [`BaseKey`](/core/interfaces.md#basekey)                                                                    |                                                              |
| values <div className=" required">Required</div>                                                    | Values for mutation function                                                                       | `TVariables`                                                               | {}                                                           |
| mutationMode                                                                                        | [Determines when mutations are executed](/guides-and-concepts/mutation-mode.md)                    | ` "pessimistic` \| `"optimistic` \| `"undoable"`                           | `"pessimistic"`\*                                            |
| undoableTimeout                                                                                     | Duration to wait before executing the mutation when `mutationMode = "undoable"`                    | `number`                                                                   | `5000ms`\*                                                   |
| onCancel                                                                                            | Callback that runs when undo button is clicked on `mutationMode = "undoable"`                      | `(cancelMutation: () => void) => void`                                     |                                                              |
| successNotification                                                                                 | Successful Mutation notification                                                                   | [`SuccessErrorNotification`](/core/interfaces.md#successerrornotification) | "Successfully updated `resource`"                            |
| errorNotification                                                                                   | Unsuccessful Mutation notification                                                                 | [`SuccessErrorNotification`](/core/interfaces.md#successerrornotification) | "Error when updating `resource` (status code: `statusCode`)" |
| metaData                                                                                            | Metadata query for `dataProvider`                                                                  | [`MetaDataQuery`](/core/interfaces.md#metadataquery)                       | {}                                                           |
| dataProviderName                                                                                    | If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use. | `string`                                                                   | `default`                                                    |

> `*`: These props have default values in `RefineContext` and can also be set on **<[Refine](/core/components/refine-config.md)>** component. `useUpdate` will use what's passed to `<Refine>` as default, but a local value will override it.

<br/>

### Type Parameters

| Property   | Desription                                                                          | Type                                           | Default                                        |
| ---------- | ----------------------------------------------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| TData      | Result data of the mutation. Extends [`BaseRecord`](/core/interfaces.md#baserecord) | [`BaseRecord`](/core/interfaces.md#baserecord) | [`BaseRecord`](/core/interfaces.md#baserecord) |
| TError     | Custom error object that extends [`HttpError`](/core/interfaces.md#httperror)       | [`HttpError`](/core/interfaces.md#httperror)   | [`HttpError`](/core/interfaces.md#httperror)   |
| TVariables | Values for mutation function                                                        | `{}`                                           | `{}`                                           |

### Return value

| Description                               | Type                                                                                                                                                                                                     |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Result of the `react-query`'s useMutation | [`UseMutationResult<`<br/>`{ data: TData },`<br/>`TError,`<br/>` { resource:string; id: BaseKey; values: TVariables; },`<br/>` UpdateContext>`](https://react-query.tanstack.com/reference/useMutation)\* |

> `*` `UpdateContext` is an internal type.
