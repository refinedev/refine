---
id: useUpdateMany
title: useUpdateMany
siderbar_label: useUpdateMany
description: useUpdateMany data hook from refine is a modified version of react-query's useMutation for multiple update mutations
---

`useUpdateMany` is a modified version of `react-query`'s [`useMutation`](https://react-query.tanstack.com/reference/useMutation#) for multiple update mutations. It uses `updateMany` method as mutation function from the `dataProvider` that is passed to `<Admin>`.  

## Features

* Shows notifications on success, error and cancel. 

* Automatically invalidates `list` and `getOne` queries after mutation is succesfully run.  
[Refer to React Query docs for detailed information &#8594](https://react-query.tanstack.com/guides/invalidations-from-mutations)

* Supports [mutation mode](#mutation-mode).


## Usage

Let'say we have a `posts` resource

```ts title="https://refine-fake-rest.pankod.com/posts"
{
    [
        {
            id: 1,
            status: "published",
        },
        {
            id: 2,
            status: "rejected",
        },
    ];
}
```

```tsx
type PostMutationResult = {
    id: string;
    status: "published" | "draft" | "rejected";
}

const { mutate } = useUpdateMany<PostMutationResult>("posts");

mutate({ ids: [ 1, 2 ], values: { status: "draft" } })
```

:::tip
`mutate` can also accept lifecycle methods like `onSuccess` and `onError`.  
[Refer to react-query docs for further information. &#8594](https://react-query.tanstack.com/guides/mutations#mutation-side-effects)
:::

<br/>

After mutation runs `posts` will be updated as below:

```ts title="https://refine-fake-rest.pankod.com/posts"
{
    [
        {
            id: 1,
            // highlight-next-line
            status:"draft"
        },
        {
            id: 2,
            // highlight-next-line
            status:"draft"
        },
    ];
}
```
<br/>

:::note
Queries that use `/posts` endpoint will be automatically invalidated to show the updated data. For example, data returned from [`useList`](#) and [`useOne`](#) will be automatically updated.
:::

:::tip
`useUpdateMany` returns `react-query`'s `useMutation` result. It includes `mutate` with  [many other properties](https://react-query.tanstack.com/reference/useMutation).
:::

:::important
Values passed to `mutate` must have the type of

```tsx
{
    ids: (string | number)[];
    values: TVariables = {};
}
```
:::

## Mutation mode

Determines the mode with which the mutation runs.

```tsx
const { mutate } = useUpdateMany("posts", "optimistic");
```
 `pessimistic` : The mutation runs immediately. Redirection and UI updates are executed after the mutation returns successfuly.

 `optimistic` : The mutation is applied locally, redirection and UI updates are executed immediately as if mutation is succesful. If mutation returns with error, UI updates accordingly.

 `undoable`: The mutation is applied locally, redirection and UI updates are executed immediately as if mutation is succesful. Waits for a customizable amount of timeout before mutation is applied. During the timeout, mutation can be cancelled from the notification with an undo button and UI will revert back accordingly.


[Refer to mutation mode docs for further information. &#8594](#)


## Custom method on mutation cancellation
You can pass a custom cancel callback to `useUpdateMany`. That callback is triggered when undo button is clicked when  `mutationModeProp = "undoable"`.

:::caution
Default behaviour on undo action includes notifications. If a custom callback is passed this notification will not appear.
:::

:::danger
Passed callback will receive a function that actually cancels the mutation. Don't forget to run this function to cancel the mutation on `undoable` mode.

```tsx
const customOnCancel = (cancelMutation) => {
    cancelMutation()
    // rest of custom cancel logic...
}

const { mutate } = useUpdateMany("posts", "undoable", 7500, customOnCancel);
```
After 7.5 seconds the mutation will be executed. The mutation can be cancelled within that 7.5 seconds. If cancelled `customOnCancel` will be executed and the request will not be sent.
:::

<br />

## API

### Parameters


| Property                                            | Description                                                                         | Type                                             | Default          |
| --------------------------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------ | ---------------- |
| resource  <div className=" required">Required</div> | [`Resource`](#) for API data interactions                                           | `string`                                         |                  |
| mutationModeProp                                    | [Determines when mutations are executed](#)                                         | ` "pessimistic` \| `"optimistic` \| `"undoable"` | `"pessimistic"`* |
| undoableTimeoutProp                                 | Duration to wait before executing the mutation when `mutationModeProp = "undoable"` | `number`                                         | `5000ms`*        |
| onCancel                                            | Callback that runs when undo button is clicked on `mutationModeProp = "undoable"`   | `(cancelMutation: () => void) => void`           |                  |

>`*`: These props have default values in `AdminContext` and can also be set on **<[Admin](#)>** component. `useUpdateMany` will use what is passed to `<Admin>` as default and can override locally.

<br/>

### Type Parameters

| Property   | Desription                                             | Type              | Default           |
| ---------- | ------------------------------------------------------ | ----------------- | ----------------- |
| TData      | Result data of the mutation. Extends [`BaseRecord`](#) | [`BaseRecord`](#) | [`BaseRecord`](#) |
| TError     | Custom error object that extends [`HttpError`](#)      | [`HttpError`](#)  | [`HttpError`](#)  |
| TVariables | Values for mutation function                           | `{}`              | `{}`              |

### Return value

 | Description                               | Type                                                                                                                                                                   |
 | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
 | Result of the `react-query`'s useMutation | [`UseMutationResult<`<br/>`{ data: TData },`<br/>`TError,`<br/>`  { ids: Identifier[]; values: TVariables; },`<br/>` UpdateContext>`](https://react-query.tanstack.com/reference/useMutation)* |

>`*` [Refer to documentation for `UpdateContext` &#8594](#) and [`Identifier` &#8594](#)
