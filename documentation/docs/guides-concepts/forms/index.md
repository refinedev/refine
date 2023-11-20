---
title: Forms
---

In almost every user facing application, forms are a necessity. They are the primary way for users to interact with your application and provide data to your backend. They are also one of the most complex parts of an application to build and maintain with many cases and features to consider. refine's form integration aims to make this process as simple as possible while providing as many real world features as possible out of the box. This guide will cover the basics of forms in refine and how to use them.

## Handling Data

`useForm` hook orchestrates Refine's [`useOne`](/api-reference/core/hooks/data/useOne/index.md), [`useUpdate`](/api-reference/core/hooks/data/useUpdate/index.md) and [`useCreate`](/api-reference/core/hooks/data/useCreate/index.md) hooks internally to provide a single interface for form handling.

While editing or cloning a record, `useOne` will be used to fetch the record to provide values for the form. When creating a new record, `useCreate` will be used for the mutation. When updating a record, `useUpdate` will be used for the mutation.

This means that the `useForm` hook will handle all of the data fetching and mutation logic for you. All you need to do is provide the form with the correct props and it will handle the rest.

## Basic Usage

The usage of the `useForm` hooks may slightly differ between libraries, the core functionality is provided by the `@refinedev/core`'s `useForm` hook and is the same across all implementations. Refine's core has the `useForm` hook which is the foundation of all the other extensions and `useForm` implementations in the other helper libraries.

To learn more about the usage and see `useForm` in action, check out the reference pages for each library:

<Tabs>
<TabItem value="core" label="Refine's Core">

[Check out Core's `useForm` reference page to learn more about the usage and see it in action.](/api-reference/core/hooks/useForm.md)

```tsx title="edit.tsx"
import { useForm } from "@refinedev/core";

const EditPage = () => {
    const { queryResult, formLoading, onFinish } = useForm<
        IProduct,
        HttpError,
        FormValues
    >({
        resource: "products",
        action: "edit",
        id: 123,
    });
};
```

</TabItem>
<TabItem value="hook-form" label="React Hook Form" default>

[Check out React Hook Form's `useForm` reference page to learn more about the usage and see it in action.](/packages/documentation/react-hook-form/useForm.md)

```tsx title="edit.tsx"
import { useForm } from "@refinedev/react-hook-form";

const EditPage = () => {
    const {
        refineCore: { onFinish, formLoading, queryResult },
        register,
        handleSubmit,
        formState: { errors },
        saveButtonProps,
    } = useForm<IProduct, HttpError, FormValues>({
        refineCoreProps: {
            resource: "products",
            action: "edit",
            id: 123,
        },
    });
};
```

</TabItem>
<TabItem value="antd" label="Ant Design">

[Check out Ant Design Form's `useForm` reference page to learn more about the usage and see it in action.](/api-reference/antd/hooks/form/useForm.md)

```tsx title="edit.tsx"
import { useForm } from "@refinedev/antd";

const EditPage = () => {
    const { formProps, saveButtonProps, queryResult } = useForm<
        IProduct,
        HttpError,
        FormValues
    >({
        resource: "products",
        action: "edit",
        id: 123,
    });
};
```

</TabItem>
<TabItem value="mantine" label="Mantine">

[Check out Mantine Form'ss `useForm` reference page to learn more about the usage and see it in action.](/api-reference/mantine/hooks/form/useForm.md)

```tsx title="edit.tsx"
import { useForm } from "@refinedev/react-hook-form";

const EditPage = () => {
    const {
        refineCore: { onFinish, formLoading, queryResult },
        register,
        handleSubmit,
        formState: { errors },
        saveButtonProps,
    } = useForm<IProduct, HttpError, FormValues>({
        refineCoreProps: {
            resource: "products",
            action: "edit",
            id: 123,
        },
        initialValues: {
            name: "",
            description: "",
            category: {
                id: "",
            },
        },
    });
};
```

</TabItem>
</Tabs>

## Integration with Routers

To get the most out of refine's hooks and implementations, you'll also want to integrate it with your routing system. This enables refine to infer the resource, actions and record id from the current route and provide them to the hooks such as `useForm`. In most of the cases, this will prevent the need of passing explicit `resource`, `action` and `id` props to the hooks including `useForm`.

To learn more about the routing, check out the [Routing](/guides-concepts/routing/index.md) guide and the [General Concepts](/guides-concepts/general-concepts/index.md) guide to learn more about how it benefits the development experience.

## Actions <RouterBadge />

In `useForm`, you'll have 3 action modes to choose from:

### Create

This is the default action mode and is used for creating a new record for the resource.

### Edit

Used for editing an existing record. This action mode requires an `id` prop to be passed to the form.

### Clone

Used for cloning an existing record. This action mode requires an `id` prop to be passed to the form. The record with the given `id` will be fetched and the values will be used as the initial values for the form fields and the mutation will be performed to create a new record.

## Mutation Modes <GlobalConfigBadge />

`useForm` provides 3 mutation modes to choose from, you may need each of them in different scenarios throughout your application.

### Pessimistic

This is the default mode and is the most common mode. In this mode, the mutation will be performed immediately and the form will be toggle the loading state until the mutation is completed.

If the mutation fails, the error will be displayed to the user with no further action such as invalidating the cache and redirection after the mutation.

### Optimistic

In this mode, the mutation will be performed immediately and simultaneously it will be treated as if it has succeeded. The user will be shown a success notification and the existing query cache will be optimistically updated with the provided form values for the list, many and detail queries.

If not specified the opposite, it will do the redirection to the desired page. If the mutation succeeds, the query cache will be invalidated and the active queries will trigger a refetch.

If the mutation fails, the optimistic updates will be reverted and the error will be displayed to the user.

### Undoable

In this mode, the mutation will be delayed for the specified amount of time but simultaneously will be treated as if it has succeeded. Identical to the `optimistic` mode, the existing query cache will be updated accordingly and the user will be shown a notification with a countdown.

Unless it is ordered to "undo" the action by the user, the mutation will be performed after the countdown. If the mutation succeeds, the query cache will be invalidated and the active queries will trigger a refetch.

If the mutation fails, the optimistic updates will be reverted and the error will be displayed to the user.

### Default Mutation Mode

All three modes have their own use cases and benefits, you'll be able to choose them individually for each form. If you want to specify a default mutation mode for all forms, you can use the `options.mutationMode` prop of the [`<Refine>` component](/api-reference/core/components/refine-config.md).

```tsx
<Refine
    options={{
        mutationMode: "optimistic", // default is "pessimistic"
    }}
/>
```

## Invalidation <GuideBadge id="guides-concepts/general-concepts#caching" description="To learn more about caching, refer to General Concepts guide" />

All the queries made by refine's data hooks and their derivatives are cached for a certain amount of time. This means that if you perform a query for a resource, the result will be cached and the next time you perform the same query, the results will be returned immediately from the cache and then if the data is considered stale, the query will be refetched in the background.

When you perform a mutation, the query cache will be invalidated by default after a successful mutation. This means that if you perform a mutation that affects the data of a query, the query will be refetched in the background and the UI will be updated accordingly.

### Default Behavior

By default, `useForm` will invalidate the following queries after a successful mutation:

For `create` and `clone` actions; `list` and `many` queries for the resource. This means all the related queries made by `useList`, `useSelect`, `useMany`, `useTable` etc. will be invalidated.

For `edit` action; in addition to the queries invalidated in `create` and `clone` modes, `detail` query for the resource will be invalidated. This means all the related queries made by `useOne`, `useShow` etc. will be invalidated.

### Custom Invalidation

In some cases, you may want to change the default invalidation behavior such as to invalidate all the resource or skipping the `list` queries etc. To do that, you can use the `invalidates` prop of the `useForm` to determine which query sets should be invalidated after a successful mutation.

```tsx
const { formProps } = useForm({
    resource: "posts",
    action: "edit",
    id: 1,
    // highlight-next-line
    invalidates: ["many", "detail"], // default is ["list", "many", "detail"]
});
```

If you want to disable the invalidation completely and handle it manually, you can pass `false` to the `invalidates` prop. Then, you can use the [`useInvalidate`](/api-reference/core/hooks/invalidate/useInvalidate.md) hook to invalidate the queries manually based on your conditions.

```tsx
import { useInvalidate } from "@refinedev/core";

const invalidate = useInvalidate();

useForm({
    resource: "categories",
    action: "edit",
    id: 1,
    // highlight-start
    invalidates: false,
    onMutationSuccess() {
        invalidate({
            resource: "posts",
            invalidates: ["resourceAll"],
        });
    },
    // highlight-end
});
```

## Optimistic Updates

In many cases, you may want to update the query cache optimistically after a mutation before the mutation is completed. This is especially comes in handy when managing the waiting experience of the user. For example, if you are updating a record, you may want to update the query cache with the new values to show the user that the record is updated immediately and then revert the changes if the mutation fails.

:::note
Optimistic updates are only available in `optimistic` and `undoable` mutation modes.
:::

### Default Behavior

By default, refine's mutations will use the provided form data/values to update the existing records in the query cache. This update process includes the `list`, `many` and `detail` queries related to the record and the resource.

### Custom Optimistic Updates

In some cases such as the data being submitted is slightly different from the data being fetched in the structural level, you may want to customize the optimistic updates. To do that, you can use the `optimisticUpdateMap` prop of the `useForm` to determine how the query cache will be updated for each query set.

`optimisticUpdateMap` prop also lets you disable the optimistic updates for a specific query set by passing `false` to the corresponding key.

```tsx
useForm({
    resource: "posts",
    id: 1,
    mutationMode: "optimistic",
    optimisticUpdateMap: {
        list: (
            previous, // Previous query data
            variables, // Variables used in the query
            id, // Record id
        ) => {
            // update the `previous` data using the `variables` and `id`, then return it
        },
        many: (
            previous, // Previous query data
            variables, // Variables used in the query
            id, // Record id
        ) => {
            // update the `previous` data using the `variables` and `id`, then return it
        },
        detail: (
            previous, // Previous query data
            variables, // Variables used in the query
        ) => {
            // update the `previous` data using the `variables`, then return it
        },
    },
});
```

## Server Side Validation

Server-side form validation is a technique used to validate form data on the server before processing it. Unlike client-side validation, which is performed in the user's browser using JavaScript, server-side validation occurs on the server-side code, typically in the backend of the application.

**refine** supports server-side validation out-of-the-box in all `useForm` derivatives. To handle server-side validation, the data providers needs to be correctly set up to return the errors in form submissions with a specific format. After this, **refine**'s `useForm` will propagate the errors to the respective form fields.

```ts
import { HttpError } from "@refinedev/core";

const error: HttpError = {
    message: "An error occurred while updating the record.",
    statusCode: 400,
    // the errors field is required for server-side validation.
    // when the errors field is set, useForm will automatically display the error messages in the form with the corresponding fields.
    errors: {
        title: ["Title is required"],
        content: {
            key: "form.error.content",
            message: "Content is required.",
        },
        tags: true,
    },
};
```

## Notifications <GuideBadge id="api-reference/core/providers/notification-provider" />

When forms are submitted, it is a good practice to notify the user about the result of the submission. `useForm` handles this for you, when the mutation succeeds or fails it will show a notification to the user with a proper message. This behavior can be customized or disabled using the `successNotification` and `errorNotification` props.

These props accepts both a function that returns the configuration or a static configuration, this means you'll be able to use the response of the mutation to customize the notification message.

```tsx
useForm({
    // highlight-next-line
    successNotification: (data, values, resource) => {
        return {
            message: `Successfully created ${data.title}`,
            description: "good job!",
            type: "success",
        };
    },
    // highlight-next-line
    errorNotification: (error, values, resource) => {
        return {
            message: `Failed to create ${values.title}`,
            description: error.message,
            type: "error",
        };
    },
});
```

## Auto Save

In many forms, it is a good practice to save the form data automatically as the user types to avoid losing the data in case of an unexpected event. This is especially useful in long forms where the user may spend a lot of time filling the form. `useForm` is packed with this feature out-of-the-box.

While `@refinedev/core`'s `useForm` packs this feature, the auto save is not triggered automatically. In the extensions of the `useForm` hook in the other libraries, the auto save is handled internally and is triggered automatically.

### `<AutoSaveIndicator />`

refine's corea nd ui integrations are shipped with an `<AutoSaveIndicator />` component that can be used to show a visual indicator to the user when the auto save is triggered. The `autoSaveProps` value from the `useForm`'s return value can be passed to the `<AutoSaveIndicator />` to show the auto save status to the user. It will automatically show the loading, success and error states to the user.

```tsx title="edit.tsx"
import { AutoSaveIndicator } from "@refinedev/core";

const { autoSaveProps } = useForm({
    resource: "posts",
    action: "edit",
    id: 1,
});

return (
    <form>
        {/* ... */}
        <AutoSaveIndicator {...autoSaveProps} />
    </form>
);
```

## Redirections <GlobalConfigBadge />

In many of the cases, you'll want to redirect the user to a different page after a successful mutation. `useForm` handles this for you, when the mutation succeeds it will redirect the user to the desired page.

By default, all the form actions will redirect the user to the list page of the resource after a successful mutation. This behavior can be customized or disabled by passing a `redirect` prop. If you want to change the redirection behavior for all forms, you can use the `options.redirect` prop of the [`<Refine>` component](/api-reference/core/components/refine-config.md).

Redirection feature enables implementations such as **Save and Continue**; where the user in a create form can save the record and continue editing it in the edit form by simply defining the `redirect` prop of the `useForm` hook.

## Modifying Data Before Submission

In some cases, you might want to change the data before submitting it to the backend. For example, you might want to add a `full_name` field to the form data of a user resource by combining the `first_name` and `last_name` fields. While the `useForm` from the `@refinedev/core` has the natural support for this, the `useForm` derivatives from the other libraries of refine has a different approach.

Each of these form implementations have a way to modify the data before submission with a slightly different approach. To learn more about how to modify the data before submission, check out the usage examples of each library:

<Tabs>
<TabItem value="react-hook-form" label="React Hook Form" default>

To learn more about how to modify the data before submission, check out the [Using `useForm` of `@refinedev/react-hook-form`](/packages/documentation/react-hook-form/useForm.md##how-can-i-change-the-form-data-before-submitting-it-to-the-api) reference page.

```tsx title="edit.tsx"
import { useForm } from "@refinedev/react-hook-form";
import { FieldValues } from "react-hook-form";

const EditPage = () => {
    const {
        refineCore: { onFinish },
        register,
        handleSubmit,
    } = useForm();

    // highlight-start
    const onFinishHandler = (data: FieldValues) => {
        onFinish({
            fullName: `${data.name} ${data.surname}`,
        });
    };
    // highlight-end

    return (
        // highlight-next-line
        <form onSubmit={handleSubmit(onFinishHandler)}>
            <label>Name: </label>
            <input {...register("name")} />
            <br />

            <label>Surname: </label>
            <input {...register("surname")} />
            <br />

            <button type="submit">Submit</button>
        </form>
    );
};
```

</TabItem>
<TabItem value="antd" label="Ant Design">

To learn more about how to modify the data before submission, check out the [Using `useForm` of `@refinedev/antd`](/api-reference/antd/hooks/form/useForm.md#how-can-i-change-the-form-data-before-submitting-it-to-the-api) reference page.

```tsx title="edit.tsx"
import { useForm, Create } from "@refinedev/antd";
import { Form, Input } from "antd";

const EditPage = () => {
    const { formProps, saveButtonProps, onFinish } = useForm();

    // highlight-start
    const handleOnFinish = (values) => {
        onFinish({
            fullName: `${values.name} ${values.surname}`,
        });
    };
    // highlight-end

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} onFinish={handleOnFinish} layout="vertical">
                <Form.Item label="Name" name="name">
                    <Input />
                </Form.Item>
                <Form.Item label="Surname" name="surname">
                    <Input />
                </Form.Item>
            </Form>
        </Create>
    );
};
```

</TabItem>
<TabItem value="mantine" label="Mantine">

To learn more about how to modify the data before submission, check out the [Using `useForm` of `@refinedev/mantine`](/api-reference/mantine/hooks/form/useForm.md#how-can-i-change-the-form-data-before-submitting-it-to-the-api) reference page.

```tsx title="edit.tsx"
import { useForm, Create } from "@refinedev/mantine";
import { TextInput } from "@mantine/core";

const CreatePage = () => {
    const { saveButtonProps, getInputProps } = useForm({
        initialValues: {
            name: "",
            surname: "",
        },
        // highlight-start
        transformValues: (values) => ({
            fullName: `${values.name} ${values.surname}`,
        }),
        // highlight-end
    });

    return (
        <Create saveButtonProps={saveButtonProps}>
            <form>
                <TextInput
                    mt={8}
                    label="Name"
                    placeholder="Name"
                    {...getInputProps("name")}
                />
                <TextInput
                    mt={8}
                    label="Surname"
                    placeholder="Surname"
                    {...getInputProps("surname")}
                />
            </form>
        </Create>
    );
};
```

</TabItem>
</Tabs>

## Save and Continue

In many cases, you may want to redirect the user to the edit page of the record after creating it. This is especially useful in cases where the user needs to fill a long form and you don't want to lose the data in case of an unexpected event.

In the example below, we'll create multiple options for the user to choose from after creating a record. The user will be able to choose between redirecting to the list page, edit page or staying in the create page in order to continue creating records.

import SaveAndContinue from "./save-and-continue";

<SaveAndContinue />
