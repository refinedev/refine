---
id: useForm
title: useForm
---

`useForm` is a hook that allows to manage forms. It has some `action` methods that `create`, `edit` and `clone` the form. The hook return value comes to according to the called action and it can run different logic depending on the `action`.

:::info
If you're looking for a complete form library, Refine supports two form libraries out-of-the-box.

-   [React Hook Form](https://react-hook-form.com/) (for Headless users) - [Documentation](/packages/documentation/react-hook-form/useForm.md) - [Example](/examples/form/react-hook-form/useForm.md)
-   [Ant Design Form](https://ant.design/components/form/#header) (for Ant Design users) - [Documentation](/api-reference/antd/hooks/form/useForm.md) - [Example](/examples/form/antd/useForm.md)
-   [Mantine Form](https://mantine.dev/form/use-form) (for Mantine users) - [Documentation](/api-reference/mantine/hooks/form/useForm.md) - [Example](/examples/form/mantine/useForm.md)

:::

## Basic Usage

<GeneralConceptsLink />

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

-   Returns the `mutationResult` after called the `onFinish` callback.
-   Accepts generic type parameters. It is used to define response type of the mutation and query.

## Actions

`useForm` can handle edit, create and clone actions.

:::tip
By default, it determines the `action` from route. In the above example, the route is `/posts/create` thus the hook will be called with `action: "create"`. If the route is `/posts/edit/1`, the hook will be called with `action: "edit"`.

It can be overridden by passing the `action` prop where it isn't possible to determine the action from the route (e.g. when using form in a modal or using a custom route).
:::

### `action: "edit"`

`action: "edit"` is used for editing an existing record. It requires the `id` for determining the record to edit. By default, it uses the `id` from the route. It can be changed with the `setId` function or `id` property.

It fetches the record data according to the `id` and returns the `queryResult` for you to fill the form.

`useForm` uses [`useUpdate`](/api-reference/core/hooks/data/useUpdate.md) under the hood for mutations on edit mode.

### `action: "create"`

`action: "create"`is used for creating a new record that didn't exist before.

`useForm` uses [`useCreate`](/api-reference/core/hooks/data/useCreate.md) under the hood for mutations on create mode.

### `action: "clone"`

`action: "clone"` is used for cloning an existing record. It requires the `id` for determining the record to clone. By default, it uses the `id` from the route. It can be changed with the `setId` function.

It fetches the record data according to the `id` and returns the `queryResult` for you to fill the form.

`useForm` uses [`useUpdate`](/api-reference/core/hooks/data/useUpdate.md) under the hood for mutations on clone mode.

## Options

### `resource`

**refine** passes the `resource` to the `dataProvider` as a params. This parameter is usually used to as a API endpoint path. It all depends on how to handle the `resource` in your `dataProvider`. See the [`creating a data provider`](/api-reference/core/providers/data-provider.md#creating-a-data-provider) section for an example of how `resource` are handled.

The `resource` value is determined from the active route where the component or the hook is used. It can be overridden by passing the `resource` prop.

Use case for overriding the `resource` prop:

-   We can create a `category` from the `<PostEdit>` page.
-   We can edit a `category` from the `<PostEdit>` page.

<!--
-   We'll use `useForm` with custom `resource` prop to create a category.
-   We'll also use `redirect: false` to prevent the page from redirecting to the list page after the form is submitted.
-   We'll use `useForm` with `action: "create"` to create a category.

After creating a category, `useForm` will automatically invalidate the query. So, the category list on the `<PostForm>` will be updated automatically. -->

In the following example, we'll show how to use `useForm` with `resource` prop.

```tsx title="src/posts/edit.tsx"
import { useState } from "react";
import { useForm } from "@pankod/refine-core";
import { PostForm } from "./PostForm";

const PostEdit = () => {
    return (
        <div>
            <PostForm />
            <CategoryForm />
        </div>
    );
};

const CategoryForm = () => {
    const [title, setTitle] = useState("");

    // highlight-start
    const { onFinish } = useForm({
        action: "create",
        resource: "categories",
    });
    // highlight-end

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onFinish({ title });
        setTitle("");
    };

    return (
        <form
            onSubmit={onSubmit}
            style={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <label htmlFor="categoryTitle">Category Title</label>
            <input
                id="categoryTitle"
                onChange={(e) => setTitle(e.currentTarget.value)}
                placeholder="Category Title"
            />
            <button type="submit">Create Category</button>
        </form>
    );
};
```

Also you can give URL path to the `resource` prop.

```tsx title="src/posts/edit.tsx"
const { onFinish, setId } = useForm({
    action: "create",
    resource: "categories/subcategory", // <BASE_URL_FROM_DATA_PROVIDER>/categories/subcategory
});
```

### `id`

`id` is used for determining the record to `edit` or `clone`. By default, it uses the `id` from the route. It can be changed with the `setId` function or `id` property.

It is usefull when you want to `edit` or `clone` a `resource` from a different page.

```tsx title="src/posts/edit.tsx"
const { onFinish, setId } = useForm({
    action: "edit", // or clone
    resource: "categories",
    id: 1, // <BASE_URL_FROM_DATA_PROVIDER>/categories/1
});
```

Also you can give `id` from `resource` prop.

```tsx title="src/posts/edit.tsx"
const { onFinish, setId } = useForm({
    action: "edit", // or clone
    resource: "categories/subcategory/3", // <BASE_URL_FROM_DATA_PROVIDER>/categories/subcategory/3/
});
```

### `redirect`

`redirect` is used for determining the page to redirect after the form is submitted. By default, it uses the `list`. It can be changed with the `redirect` property.

It can be set to `"show" | "edit" | "list" | "create"` or `false` to prevent the page from redirecting to the list page after the form is submitted.

```tsx title="src/posts/edit.tsx"
const { onFinish, setId } = useForm({
    action: "create",
    resource: "categories",
    redirect: false,
});
```

### `onMutationSuccess`

It's a callback function that will be called after the mutation is successful.

It receives the following parameters:

-   `data`: The data returned from the mutation.
-   `variables`: The variables passed to the mutation.
-   `context`: react-query context.

```tsx title="src/posts/edit.tsx"
const { onFinish, setId } = useForm({
    action: "create",
    resource: "categories",
    onMutationSuccess: (data, variables, context) => {
        console.log({ data, variables, context });
    },
});
```

### `onMutationError`

It's a callback function that will be called after the mutation is failed.

It receives the following parameters:

-   `data`: The data returned from the mutation.
-   `variables`: The variables passed to the mutation.
-   `context`: react-query context.

```tsx title="src/posts/edit.tsx"
const { onFinish, setId } = useForm({
    action: "create",
    resource: "categories",
    onMutationError: (data, variables, context) => {
        console.log({ data, variables, context });
    },
});
```

### `invalidates`

You can use it to manage the invalidations that will occur at the end of the mutation.

By default it's invalidates following queries from the current `resource`:

-   on `create` or `clone` mode: `"list"` and `"many"`
-   on `edit` mode: `"list`", `"many"` and `"detail"`

### `dataProviderName`

If there is more than one dataProvider, you should use the dataProviderName that you will use.
It is useful when you want to use a different dataProvider for a specific resource.

```tsx title="src/posts/edit.tsx"
const { onFinish } = useForm({
    action: "create",
    resource: "categories",
    dataProviderName: "second-data-provider",
});
```

### `mutationMode`

Mutation mode determines which mode the mutation runs with. Mutations can run under three different modes: `pessimistic`, `optimistic` and `undoable`. Default mode is `pessimistic`.
Each mode corresponds to a different type of user experience.

-   `pessimistic`: The mutation runs immediately. Redirection and UI updates are executed after the mutation returns successfuly.
-   `optimistic`:The mutation is applied locally, redirection and UI updates are executed immediately as if the mutation is succesful. If mutation returns with error, UI updates to show data prior to the mutation.
-   `undoable`: The mutation is applied locally, redirection and UI updates are executed immediately as if the mutation is succesful. Waits for a customizable amount of timeout period before mutation is applied. During the timeout, mutation can be cancelled from the notification with an undo button and UI will revert back accordingly. > It's only available for `edit` action.

> For more information about mutation modes, please check [Mutation Mode documentation](/docs/advanced-tutorials/mutation-mode/#supported-data-hooks) page.

```tsx title="src/posts/edit.tsx"
const { onFinish } = useForm({
    action: "edit",
    resource: "categories",
    mutationMode: "undoable", // "pessimistic" | "optimistic" | "undoable",
});
```

### `successNotification`

> `NotificationProvider` is required.

After form is submitted successfully, `refine` will show a success notification. With this prop, you can customize the success notification.

Default values is cames from `i18n`. This means that if you want to change the `message`, or `description` you can do it in [`i18n Provider`](http://localhost:3000/docs/api-reference/core/providers/i18n-provider/).

```ts title="Default values:"
{
    "message": translate(
        "notifications.createSuccess", // in action: edit it will be = "notifications.editSuccess",
        {
            resource: translate(`${resource}.${resource}`, resourceSingular),
        },
        `Successfully created ${resourceSingular}`,
    ), // output: "Successfully created <resource-name>" or "Successfully updated <resource-name>"
    description: translate("notifications.success", "Success"), // output: "Success"
    type: "success",
}
```

Also you can customize the notification with `successNotification` prop.

```tsx title="src/posts/create.tsx"
const { onFinish } = useForm({
    action: "create",
    resource: "post",
    successNotification: (data, values, resource) => {
        return {
            message: `Post Successfully created with ${data.title}`,
            description: "Success with no errors",
            type: "success",
        };
    },
});
```

### `errorNotification`

> `NotificationProvider` is required.

After form is submit is failed, `refine` will show a error notification. With this prop, you can customize the error notification.

Default values is cames from `i18n`. This means that if you want to change the `message`, or `description` you can do it in [`i18n Provider`](http://localhost:3000/docs/api-reference/core/providers/i18n-provider/).

```ts title="Default values:"
{
    "message": translate(
        "notifications.createError", // in action: edit it will be = "notifications.editError",
        {
            resource: translate(`${resource}.${resource}`, resourceSingular),
        },
        statusCode: err.statusCode,
    ), // output: "Error when updating <resource-name> (status code: ${err.statusCode})" or "Error when creating <resource-name> (status code: ${err.statusCode})"
    description: translate("notifications.success", "Success"), // output: "Success"
    type: "error",
}
```

Also you can customize the notification with `successNotification` prop.

```tsx title="src/posts/create.tsx"
const { onFinish } = useForm({
    action: "create",
    resource: "post",
    errorNotification: (data, values, resource) => {
        return {
            message: `Something went wrong when deleting ${data.id}`,
            description: "Error",
            type: "error",
        };
    },
});
```

### `metaData`

[`metaData`](/docs/api-reference/general-concepts/#metadata) is used following two purposes:

-   To pass additional information to data provider methods.
-   Generate GraphQL queries using plain JavaScript Objects (JSON).

How to use metaData to pass additional information to data provider methods?

```tsx
const { onFinish } = useForm({
    action: "create",
    resource: "post",
    // highlight-start
    metaData: {
        headers: { "x-meta-data": "true" },
    },
    // highlight-end
});
```

### `queryOptions`

[queryOptions](https://tanstack.com/query/v4/docs/react/reference/useMutation) options can be set by passing queryOptions property.

```tsx title="src/posts/create.tsx"
const { onFinish } = useForm({
    action: "create",
    resource: "post",
    queryOptions: {
        retry: 3,
    },
});
```

### `liveMode`

Whether to update data automatically ("auto") or not ("manual") if a related live event is received. It can be used to update and show data in Realtime throughout your app.
For more information about live mode, please check [Live / Realtime](/docs/advanced-tutorials/real-time/) page.

## FAQ

### How can Invalidate other resources?

You can invalidate other resources with help of [`useInvalidate`](/docs/api-reference/core/hooks/invalidate/useInvalidate/) hook.

```tsx title="src/posts/edit.tsx"
import { useInvalidate, useForm } from "@pankod/refine-core";

const PostEdit = () => {
    const invalidate = useInvalidate();

    const { onFinish, setId } = useForm({
        action: "create",
        resource: "categories",
        onMutationSuccess: (data, variables, context) => {
            invalidate({
                resource: "categories",
                invalidates: ["resourceAll"],
            });
        },
    });

    // ---
    // ---
};
```

### How can I change the form data before submitting it to the API?

You may need to modify the form data before it is sent to the API.

For example, Let's send the values we received from the user in two separate inputs, `name` and `surname`, to the API as `fullName`.

```tsx
import React, { useState } from "react";
import { useForm } from "@pankod/refine-core";

export const UserCreate: React.FC = () => {
    const [name, setName] = useState();
    const [surname, setSurname] = useState();

    const { onFinish } = useForm();

    const onSubmit = (e) => {
        e.preventDefault();
        const fullName = `${name} ${surname}`;
        onFinish({
            fullName: fullName,
            name,
            surname,
        });
    };

    return (
        <form onSubmit={onSubmit}>
            <input onChange={(e) => setName(e.target.value)} />
            <input onChange={(e) => setSurname(e.target.value)} />
            <button type="submit">Submit</button>
        </form>
    );
};
```

## API Reference

### Properties

<PropsTable module="@pankod/refine-core/useForm" />

> `*`: These props have default values in `RefineContext` and can also be set on **<[Refine](/api-reference/core/components/refine-config.md)>** component. `useForm` will use what is passed to `<Refine>` as default but a local value will override it.

### Type Parameters

| Property   | Desription                                                       | Default                    |
| ---------- | ---------------------------------------------------------------- | -------------------------- |
| TData      | Result data of the query that extends [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] |
| TError     | Custom error object that extends [`HttpError`][httperror]        | [`HttpError`][httperror]   |
| TVariables | Values for params.                                               | `{}`                       |

### Return values

| Property       | Description                                            | Type                                                                                                                                                           |
| -------------- | ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| onFinish       | Triggers the mutation                                  | `(values: TVariables) => Promise<CreateResponse<TData>` \| `UpdateResponse<TData>` \| `void`>                                                                  |
| queryResult    | Result of the query of a record                        | [`QueryObserverResult<T>`](https://react-query.tanstack.com/reference/useQuery)                                                                                |
| mutationResult | Result of the mutation triggered by calling `onFinish` | [`UseMutationResult<T>`](https://react-query.tanstack.com/reference/useMutation)                                                                               |
| formLoading    | Loading state of form request                          | `boolean`                                                                                                                                                      |
| id             | Record id for `clone` and `create` action              | [`BaseKey`](/api-reference/core/interfaces.md#basekey)                                                                                                         |
| setId          | `id` setter                                            | `Dispatch<SetStateAction<` `string` \| `number` \| `undefined>>`                                                                                               |
| redirect       | Redirect function for custom redirections              | (redirect: `"list"`\|`"edit"`\|`"show"`\|`"create"`\| `false` ,idFromFunction?: [`BaseKey`](/api-reference/core/interfaces.md#basekey)\|`undefined`) => `data` |

[baserecord]: /api-reference/core/interfaces.md#baserecord
[httperror]: /api-reference/core/interfaces.md#httperror
