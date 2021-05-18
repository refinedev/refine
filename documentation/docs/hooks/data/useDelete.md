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
`mutate` can also accept lifecycle methods like `onSuccess` and `onError`. [Refer to react-query docs for further information.](https://react-query.tanstack.com/guides/mutations#mutation-side-effects)
:::

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

## Options

### `mutationMode`

Determines the mode with which the mutation runs.

```tsx
const { mutate } = useDelete<CategoryMutationResult>("categories", "optimistic");
```
#### `pessimistic` : The mutation runs immediately. Redirection and UI updates are executed after the mutation returns successfully.


#### `optimistic` : The mutation is applied locally and redirection and UI updates are executed immediately as muatation is succesful. If mutation returns with error, UI updates accordingly.

#### `undoable`

pessimistic: The mutation is passed to the dataProvider first. When the dataProvider returns successfully, the mutation is applied locally, and the side effects are executed.

optimistic: The mutation is applied locally and the side effects are executed immediately. Then the mutation is passed to the dataProvider. If the dataProvider returns successfully, nothing happens (as the mutation was already applied locally). If the dataProvider returns in error, the page is refreshed and an error notification is shown.

undoable (default): The mutation is applied locally and the side effects are executed immediately. Then a notification is shown with an undo button. If the user clicks on undo, the mutation is never sent to the dataProvider, and the page is refreshed. Otherwise, after a 5 seconds delay, the mutation is passed to the dataProvider. If the dataProvider returns successfully, nothing happens (as the mutation was already applied locally). If the dataProvider returns in error, the page is refreshed and an error notification is shown.


## API

### Properties



### Return values

| Property       | Description            | Type                                                                                                          |
| -------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------- |
| mutationResult | Result of the mutation | [`UseMutationResult<`<br/>`{ data: CategoryMutationResult },`<br/>`unknown,`<br/>`  { resource: string; values: any; },`<br/>` unknown>`](https://react-query.tanstack.com/reference/useMutation) |

