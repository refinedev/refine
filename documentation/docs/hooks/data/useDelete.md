---
id: useDelete
title: useDelete
siderbar_label: useDelete
---

`useDelete` is a modified version of `react-query`'s [`useMutation`](https://react-query.tanstack.com/reference/useMutation#) for delete mutations. It uses `deleteOne` method as mutation function from the `dataProvider` that is passed to `<Admin>`.  

## Features

* Shows notifications on success, error and cancel. 

* Automatically invalidates `list` queries after mutation is succesfully run.  
[Refer to React Query docs for detailed information &#8594](https://react-query.tanstack.com/guides/invalidations-from-mutations)

* Supports [mutation mode](#).(`pessimistic`, `optimistic`, `undoable`)


## Usage
Shows a notification with action to cancel the delete mutation with customizable timeout duration.

Let'say we have a `categories` resource

```ts title="https://refine-fake-rest.pankod.com/categories"
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
    id?: string | number;
    title: string;
}

const { mutate } = useDelete<CategoryMutationResult>("categories");

mutate({ id: 2 })
```

:::tip
`mutate` can also accept lifecycle methods like `onSuccess` and `onError`.  
[Refer to react-query docs for further information.](https://react-query.tanstack.com/guides/mutations#mutation-side-effects)
:::

<br/>

After mutation runs `categories` will be updated as below:

```ts title="https://refine-fake-rest.pankod.com/categories"
{
    [
        {
            id: 1,
            title: "E-business",
        }
    ];
}
```
<br/>

:::note
Queries that use `/categories` endpoint will be automatically invalidated to show the updated data. For example, data returned from [`useList`](#) will be automatically updated.
:::

:::tip
`useDelete` returns `react-query`'s `useMutation` result. It includes `mutate` with  [many other properties](https://react-query.tanstack.com/reference/useMutation).
:::

:::important
Variables passed to `mutate` must have the type of

```tsx
{
    id: string | number;
}
```
:::

## Mutation mode

Determines the mode with which the mutation runs.

```tsx
const { mutate } = useDelete<CategoryMutationResult>("categories", "optimistic");
```
 `pessimistic` : The mutation runs immediately. Redirection and UI updates are executed after the mutation returns successfuly.

 `optimistic` : The mutation is applied locally, redirection and UI updates are executed immediately as if mutation is succesful. If mutation returns with error, UI updates accordingly.

 `undoable`: The mutation is applied locally, redirection and UI updates are executed immediately as if mutation is succesful. Waits for a customizable amount of timeout before mutation is applied. During the timeout, mutation can be cancelled from the notification with an undo button and UI will revert back accordingly.


[Refer to mutation mode docs for further information. &#8594](#)


## Custom method on mutation cancellation
You can define cancel mutation method by passing a callback to `onCancel`  property. Cancel callback triggers when undo button is clicked on  `mutationModeProp = "undoable"` mutation mode.
`onCancel` callback need to be in format like below

A custom callback can be passed to be run on undo action. Upon clicking the undo button this callback will be run.

:::caution
Default behaviour on undo action includes notifications. If a custom callback is passed this notification will not appear.
:::

:::danger
Passed callback will be passed a function that actually cancels the mutation. Don't forget to run this function to cancel the mutation on undoable mode.

```tsx
const customOnCancel = (cancelMutation) => {
    cancelMutation()
    // rest of custom onCancel logic...
}

const { mutate } = useDelete("categories", "optimistic", undefined, customOnCancel);
```
:::


## API

### Parameters


| Property               | Description                                                                                        | Type                                                              | Default          |
| ---------------------- | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | ---------------- |
| resource  <div className=" required">Required</div>               | [`Resource`](#) for API data interactions                                                          | `string`                                                          |                  |
| mutationModeProp           | [Determines when mutations are executed](#)                                                        | ` "pessimistic` \| `"optimistic` \| `"undoable"`                  | `"pessimistic"`* |
| onCancel               | Callback that runs when undo button is clicked on `mutationModeProp = "undoable"`                                                      | `(cancelMutation: () => void) => void`  |                         | `"list"`         |
| undoableTimeoutProp        | Duration to wait before executing mutations when `mutationModeProp = "undoable"`                       | `number`                                                          | `5000ms`*          |

>`*`: These props have default values in `AdminContext` and can also be set on **<[Admin](#)>** component. `useDelete` will see what is passed to `<Admin>` as default and can override locally.

<br/>

### Return values

| Property       | Description            | Type                                                                                                          |
| -------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------- |
| mutationResult | Result of the mutation          | [`UseMutationResult<`<br/>`{ data: TData },`<br/>`TError,`<br/>`  { id: Identifier; },`<br/>` DeleteContext>`](https://react-query.tanstack.com/reference/useMutation) |

