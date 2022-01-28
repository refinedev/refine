---
id: useForm
title: useForm
---

`useForm` is a hook that allows to manage forms. It has some `action` methods that `create`, `edit` and `clone` the form. The hook return value comes to according to the called action and it can run different logic depending on the action.

:::info
It doesn't handle the form state, it care of the state that is passed to the hook.
:::

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
By default, it determines the `action` from route. In the above example, the route is `/posts/create` thus this is an creating form. If the route is `/posts/edit/1`, this is an editing form.

It can be overridden by passing the `action` prop where it isn't possible to determine the action from the route (e.g. when using form in a modal or using a custom route).
:::

### `action: "edit"`

`action: "edit"` is used for editing an existing record. It requires the `id` for determining the record to edit. By default, it uses the `id` from the route. It can be changed with the `setId` function.

It fetches the record data according to the `id` and returns the `queryResult`.

`useForm` uses [`useUpdate`](../../hooks/data/useUpdate.md) under the hood for mutations on edit mode.

### `action: "create"`

`action: "create"`is used for creating a new record that didn't exist before.

`useForm` uses [`useCreate`](../data/useCreate.md) under the hood for mutations on create mode.

### `action: "clone"`