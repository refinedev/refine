---
id: save-button
title: Save
swizzle: true
---


`<SaveButton>` uses Material UI [`<Button>`](https://mui.com/material-ui/react-button/) component. It uses it for presantation purposes only. Some of the hooks that **refine** has adds features to this button.

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/docs/packages/documentation/cli)
:::

## Usage

For example, let's add logic to the `<SaveButton>` component with the `saveButtonProps` returned by the [`useForm`](/docs/api-reference/core/hooks/useForm) hook.

```tsx title="src/pages/posts/edit.tsx"
// highlight-next-line
import { useForm } from "@pankod/refine-react-hook-form";
import { Edit, Box, TextField } from "@pankod/refine-mui";

export const PostEdit: React.FC = () => {
    const {
        refineCore: { onFinish, formLoading },
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ICategory>();

    return (
        <Edit
            isLoading={formLoading}
            saveButtonProps={{ onClick: handleSubmit(onFinish) }}
        >
            <Box component="form">
                <TextField
                    {...register("title", { required: true })}
                    error={!!errors?.title}
                    helperText={errors?.title?.message}
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    defaultValue={" "}
                />
            </Box>
        </Edit>
    );
};

interface ICategory {
    id: number;
    title: string;
}
```

Will look like this:

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/components/buttons/save/save-mui.png" alt="Default save button" />
</div>
<br/>

The `useForm` hook exposes `saveButtonProps` to be passed to `<SaveButton>` component which includes submitting the form action, button loading, and disable states.

## Properties

### `hideText`

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx
import { SaveButton } from "@pankod/refine-mui";

export const MySaveComponent = () => {
    return <SaveButton hideText />;
};
```

## API Reference

### Properties

<PropsTable module="@pankod/refine-mui/SaveButton" />

:::tip External Props
It also accepts all props of Material UI [Button](https://mui.com/material-ui/api/button/).
::: 