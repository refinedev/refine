---
id: useForm
title: useForm
---

`useForm` is a hook that allows to manage forms. It has some `action` methods that `create`, `edit` and `clone` the form. The hook return value comes to according to the called action and it can run different logic depending on the `action`.

:::info
It doesn't handle the form state, it works with values passed to the hook's `onFinish` callback.
:::

-   Returns the `mutationResult` after called the `onFinish` callback.
-   Accepts generic type parameters. It is used to define response type of the mutation and query.

## Basic Usage

We'll show the basic usage of `useForm` by adding an creating form.

```tsx title="src/posts/create.tsx"
import { useState } from "react";
import { useForm } from "@pankod/refine-core";

export const PostCreate = () => {
    const [title, setTitle] = useState();
    const { onFinish } = useForm({
        action: "create",
    });

    const onSubmit = (e) => {
        e.preventDefault();
        onFinish({ title });
    };

    return (
        <form onSubmit={onSubmit}>
            <input onChange={(e) => setTitle(e.target.value)} />
            <button type="submit">Submit</button>
        </form>
    );
};
```

## Actions

`useForm` can handle edit, create and clone actions.

:::tip
By default, it determines the `action` from route. In the above example, the route is `/posts/create` thus the hook will be called with `action: "create"`. If the route is `/posts/edit/1`, the hook will be called with `action: "edit"`.

It can be overridden by passing the `action` prop where it isn't possible to determine the action from the route (e.g. when using form in a modal or using a custom route).
:::

### `action: "edit"`

`action: "edit"` is used for editing an existing record. It requires the `id` for determining the record to edit. By default, it uses the `id` from the route. It can be changed with the `setId` function.

It fetches the record data according to the `id` and returns the `queryResult` for you to fill the form.

`useForm` uses [`useUpdate`](../../hooks/data/useUpdate.md) under the hood for mutations on edit mode.

### `action: "create"`

`action: "create"`is used for creating a new record that didn't exist before.

`useForm` uses [`useCreate`](../data/useCreate.md) under the hood for mutations on create mode.

### `action: "clone"`

`action: "clone"` is used for cloning an existing record. It requires the `id` for determining the record to clone. By default, it uses the `id` from the route. It can be changed with the `setId` function.

It fetches the record data according to the `id` and returns the `queryResult` for you to fill the form.
