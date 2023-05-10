---
id: add-create-page
title: 4. Adding Create Page
tutorial:
    order: 3
    prev: tutorial/adding-crud-pages/{preferredUI}/add-show-page
    next: tutorial/adding-crud-pages/{preferredUI}/add-delete-action
---

This post shows how to implement the `create` page of `blog_posts` resource without resorting to `<MuiCreateInferencer />`. Basically, we just replace the existing code inside the `src/pages/blog-posts/create.tsx` file with the Inferencer-generated code.


## The Create Page

The Inferencer-generated `<BlogPostCreate />` component is available at the `/blog-posts/create` route. When we visit its `create` page, we can view the code in a modal by clicking on `Show the auto-generated code` button. The code looks like below:

```TypeScript
// src/pages/blog-posts/create.tsx

import { Create, useAutocomplete } from "@refinedev/mui";
import { Box, TextField, Autocomplete } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

export const BlogPostCreate = () => {
    const {
        saveButtonProps,
        refineCore: { formLoading },
        register,
        control,
        formState: { errors },
    } = useForm();

    const { autocompleteProps: categoryAutocompleteProps } = useAutocomplete({
        resource: "categories",
    });

    return (
        <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column" }}
                autoComplete="off"
            >
                <TextField
                    {...register("title", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.title}
                    helperText={(errors as any)?.title?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label="Title"
                    name="title"
                />
                <TextField
                    {...register("content", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.content}
                    helperText={(errors as any)?.content?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    multiline
                    label="Content"
                    name="content"
                />
                <Controller
                    control={control}
                    name="category"
                    rules={{ required: "This field is required" }}
                    // eslint-disable-next-line
                    defaultValue={null as any}
                    render={({ field }) => (
                        <Autocomplete
                            {...categoryAutocompleteProps}
                            {...field}
                            onChange={(_, value) => {
                                field.onChange(value);
                            }}
                            getOptionLabel={(item) => {
                                return (
                                    categoryAutocompleteProps?.options?.find(
                                        (p) =>
                                            p?.id?.toString() ===
                                            item?.id?.toString(),
                                    )?.title ?? ""
                                );
                            }}
                            isOptionEqualToValue={(option, value) =>
                                value === undefined ||
                                option?.id?.toString() === value?.id?.toString()
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Category"
                                    margin="normal"
                                    variant="outlined"
                                    error={!!(errors as any)?.category?.id}
                                    helperText={
                                        (errors as any)?.category?.id?.message
                                    }
                                    required
                                />
                            )}
                        />
                    )}
                />
                <TextField
                    {...register("status", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.status}
                    helperText={(errors as any)?.status?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label="Status"
                    name="status"
                />
                {/*
                    DatePicker component is not included in "@refinedev/mui" package.
                    To use a <DatePicker> component, you can follow the official documentation for Material UI.

                    Docs: https://mui.com/x/react-date-pickers/date-picker/#basic-usage
                */}
                <TextField
                    {...register("createdAt", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.createdAt}
                    helperText={(errors as any)?.createdAt?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    label="Created At"
                    name="createdAt"
                />
            </Box>
        </Create>
    );
};
```

Let's copy this code generated by Inferencer and paste it into the file at `src/pages/blog-posts/create.tsx`. We should replace the existing code that uses the `<MuiCreateInferencer />`.


## Understanding the Create Page Components

Below, we briefly make sense of the components and hooks used in the `show` page.

-   `<Create />` is a **refine** core component that is used as a wrapper around a `create` page. It houses sub-components the title of the page, save button, etc.

    [Refer to the `<Create/>` documentation for more information &#8594](/docs/api-reference/mui/components/basic-views/create)

-   The `useForm()` hook, imported from `@refinedev/react-hook-form` package, is a high level hook built on top of **React Hook Form** and  the **refine** core `useForm()` hook imported from `@refinedev/core` package (both have the same name, but technically are somewhat different).

It exposes the `saveButtonProps` prop which passes the form data to the submit button of the form. When the form is submitted, the data is relayed to the `dataProvider`'s `create` method.

[Refer to the **@refinedev/react-hook-form** `useForm()` documentation for more information &#8594](/docs/packages/documentation/react-hook-form/useForm/)

[Refer to the **React Hook Form** documentation for more information &#8594](https://react-hook-form.com/)

-   All other components, such as  `<Box />`, `<TextField />` and `<Controller />` are **Material UI** components used to display the form fields.

    [Refer to the **Material UI** documentation for more information &#8594](https://mui.com/)


## Handling Relationships

The `blog_posts` resource is associated with the `categories` resource. In the `create` blog post page, we have a `category` field which needs to be filled with select options fetched from the `categories` resource. In order to meet this requirement, we are using the `useAutocomplete()` hook provided by **refine** to prepopulate the `category` select options.

It is done like below:

```tsx
const { selectProps: categorySelectProps } = useAutocomplete({
    resource: "categories",
});
```

This hook fetches `categories` data by relaying its accepted arguments to the `dataProvider`'s `getList()` method. Then, it exposes the props tailored for the `<Autocomplete />` component to consume.

[Refer to the `useAutocomplete()` documentation for more information &#8594](/docs/api-reference/mui/hooks/useAutocomplete/)

[Refer to the **Material UI** `<Autocomplete />` documentation for more information &#8594](https://mui.com/material-ui/react-autocomplete/)

Now, if we view the blog post `create` page in the browser at <a href="http://localhost:5173/blog-posts/create" rel="noopener noreferrer nofollow">localhost:5173/blog-posts/create</a>, we see the same forms being rendered, except the `Show the auto-generated code` is missing because we removed the `<MuiCreateInferencer />` component:

![blog-posts-create](https://imgbox.com/nDdBBqxJ).

<br/>
<br/>

<Checklist>

<ChecklistItem id="add-create-page-mui">
I added the create page to the app.
</ChecklistItem>
<ChecklistItem id="add-create-page-mui-2">
I understood the create page components and hooks.
</ChecklistItem>
<ChecklistItem id="add-create-page-mui-3">
I understood the relationship handling.
</ChecklistItem>

</Checklist>
