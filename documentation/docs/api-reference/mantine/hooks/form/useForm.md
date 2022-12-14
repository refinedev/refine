---
id: useForm
title: useForm
---

`useForm` is used to manage forms. It is based on [`useForm`][use-form-mantine] from the `@mantine/form` package and [`useForm`][use-form-core] from the `@pankod/refine-core` package. It supports all the features of these packages and adds some additional features.

## Usage

We'll show the basic usage of `useForm` by adding an editing form.

```tsx
import { Edit, Select, TextInput, useForm } from "@pankod/refine-mantine";

export const PostEdit: React.FC = () => {
    const { saveButtonProps, getInputProps } = useForm({
        initialValues: {
            title: "",
            status: "",
        },
        validate: {
            title: (value) => (value.length < 2 ? "Too short title" : null),
            status: (value) =>
                value.length <= 0 ? "Status is required" : null,
        },
    });

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <form>
                <TextInput
                    mt={8}
                    label="Title"
                    placeholder="Title"
                    {...getInputProps("title")}
                />
                <Select
                    mt={8}
                    label="Status"
                    placeholder="Pick one"
                    data={[
                        { label: "Published", value: "published" },
                        { label: "Draft", value: "draft" },
                        { label: "Rejected", value: "rejected" },
                    ]}
                    {...getInputProps("status")}
                />
            </form>
        </Edit>
    );
};
```

In the example if you navigate to `/posts/edit/1234` it will manage the data of the post with id of `1234` in an editing context. See [Actions](/api-reference/core/hooks/useForm.md/#actions) on how `useForm` determines this is an editing context.

Since this is an edit form it will fill the form with the data of the post with id of `1234` and then the form will be ready to edit further and submit the changes.

Submit functionality is provided by `saveButtonProps` which includes all of the necessary props for a button to submit a form including automatically updating loading states.

## API Reference

### Properties

It supports all the features of the [`useForm`][use-form-mantine] hook provided by `@mantine/form`.
Also, we added the following return values.

`refineCoreProps`: You can define all properties provided by [`useForm`][use-form-core] here. You can see all of them in [here](/api-reference/core/hooks/useForm.md#properties).

> For example, we can define the `refineCoreProps` property in the `useForm` hook as:

```tsx
import { useForm } from "@pankod/refine-mantine";

const { ... } = useForm({
    ..., // @mantine/form's useForm props
    refineCoreProps: {
        resource: "posts",
        redirect: false,
        //  @pankod/refine-core's useForm props
    },
});
```

### Return values

Returns all the return values of the [`useForm`][use-form-mantine] hook provided by `@mantine/form`. Also, we added the following return values.

`refineCore`: Returns all values returned by [`useForm`][use-form-core]. You can see all of them in [here](/api-reference/core/hooks/useForm.md##return-values).

> For example, we can access the `refineCore` return value in the `useForm` hook as:

```tsx
import { useForm } from "@pankod/refine-react-hook-form";

const {
    ..., // @mantine/form's useForm return values
    saveButtonProps,
    refineCore: {
        queryResult,
        ...  // @pankod/refine-core's useForm return values
    },
} = useForm({ ... });
```

| Property        | Description               | Type                                                                             |
| --------------- | ------------------------- | -------------------------------------------------------------------------------- |
| saveButtonProps | Props for a submit button | `{ disabled: boolean; onClick: (e: React.FormEvent<HTMLFormElement>) => void; }` |

### Type Parameters

| Property   | Desription                                                   | Type                       | Default                    |
| ---------- | ------------------------------------------------------------ | -------------------------- | -------------------------- |
| TData      | Result data of the query. Extends [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] |
| TError     | Custom error object that extends [`HttpError`][httperror]    | [`HttpError`][httperror]   | [`HttpError`][httperror]   |
| TVariables | Form values for mutation function                            | `{}`                       | `Record<string, unknown>`  |

## Example

<StackblitzExample path="form-mantine-use-form" />


[use-form-core]: /api-reference/core/hooks/useForm.md
[use-form-mantine]: https://mantine.dev/form/use-form
[baserecord]: /api-reference/core/interfaces.md#baserecord
[httperror]: /api-reference/core/interfaces.md#httperror
