---
id: add-create-page
title: 4.4. Adding Create Page
tutorial:
    prev: tutorial/adding-crud-actions/add-show-page
    next: tutorial/adding-crud-actions/add-delete-action
---

This post shows how to implement the `create` page of `blog_posts` resource without resorting to `<MuiCreateInferencer />`. We replace the existing code inside the `src/pages/blog-posts/create.tsx` file with the Inferencer-generated **refine** and **Material UI** components.


## The Create Page

The Inferencer-generated `<BlogPostCreate />` component is available at the `/blog-posts/create` route. When we visit the page, we can view the code in a modal by clicking on `Show the auto-generated code` button. The generated component looks like this:

```tsx
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

Below, we briefly make sense of the components and hooks used in the above `<BlogPostCreate/>` component.


## Understanding the Create Page Components

-   `<Create />` is a **refine** core component that is used as a wrapper around a `create` page. It houses sub-components such as the title of the page, save button, etc.

    [Refer to the `<Create/>` documentation for more information &#8594](/docs/api-reference/mui/components/basic-views/create)

-   The `useForm()` hook, imported from `@refinedev/react-hook-form` package, is a high level hook built on top of **React Hook Form** and  the **refine** core `useForm()` hook imported from `@refinedev/core` package (both have the same name, but technically are somewhat different).

    It exposes the `saveButtonProps` prop which is availed by the submit button of the form. When the form is submitted, the data is relayed to the `dataProvider`'s `create` method.

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


Let's copy this code generated by Inferencer and paste it into the file at `src/pages/blog-posts/create.tsx`. We should replace the existing code that uses the `<MuiCreateInferencer />`.

Now, if we view the blog post `create` page in the browser at <a href="http://localhost:5173/blog-posts/create" rel="noopener noreferrer nofollow">localhost:5173/blog-posts/create</a>, we see the same forms being rendered, except the `Show the auto-generated code` is missing because we removed the `<MuiCreateInferencer />` component:

```tsx live previewOnly previewHeight=600px url=http://localhost:5173/blog-posts/create
setInitialRoutes(["/blog-posts/create"]);

import { Authenticated, GitHubBanner, IResourceComponentsProps, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  notificationProvider,
  RefineSnackbarProvider,
  ThemedLayoutV2,
  ThemedTitleV2,
} from "@refinedev/mui";
import { MuiCreateInferencer } from "@refinedev/inferencer/mui";
import { CssBaseline, GlobalStyles } from "@mui/material";
import routerBindings, {
  CatchAllNavigate,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { authProvider } from "./authProvider";
import {
  BlogPostCreate,
  BlogPostEdit,
  BlogPostList,
  BlogPostShow,
} from "./pages/blog-posts";
import {
  CategoryCreate,
  CategoryEdit,
  CategoryList,
  CategoryShow,
} from "./pages/categories";
import { ForgotPassword } from "./pages/forgotPassword";
import { Login } from "./pages/login";
import { Register } from "./pages/register";

// visible-block-start
const BlogPostCreate: React.FC<IResourceComponentsProps> = () => {
  return <MuiCreateInferencer />;
};
// visible-block-end

function App() {
  const { t, i18n } = useTranslation();

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <Refine
              dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
              notificationProvider={notificationProvider}
              routerProvider={routerBindings}
              resources={[
                {
                  name: "blog_posts",
                  // list: "/blog-posts",
                  create: "/blog-posts/create",
                  // edit: "/blog-posts/edit/:id",
                  // show: "/blog-posts/show/:id",
                  meta: {
                    canDelete: true,
                  },
                },
                // {
                //   name: "categories",
                //   list: "/categories",
                //   create: "/categories/create",
                //   edit: "/categories/edit/:id",
                //   show: "/categories/show/:id",
                //   meta: {
                //     canDelete: true,
                //   },
                // },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
              }}
            >
              <Routes>
                <Route
                  element={
                    <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                      <ThemedLayoutV2
                        Title={({ collapsed }) => (
                          <ThemedTitleV2
                            collapsed={collapsed}
                            text="refine Project"
                          />
                        )}
                      >
                        <Outlet />
                      </ThemedLayoutV2>
                    </Authenticated>
                  }
                >
                  <Route
                    index
                    element={<NavigateToResource resource="blog_posts" />}
                  />
                  <Route path="/blog-posts">
                    <Route path="create" element={<BlogPostCreate />} />
                  </Route>
                  <Route path="*" element={<ErrorComponent />} />
                </Route>
              </Routes>

              <RefineKbar />
              <UnsavedChangesNotifier />
            </Refine>
          </RefineSnackbarProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

render(<App />);
```

<Checklist>
<ChecklistItem id="add-create-page-mui">
I added the Inferencer-generated code to {`<BlogPostCreate />`} component.
</ChecklistItem>
<ChecklistItem id="add-create-page-mui-2">
I understand the use of <strong>refine</strong> core and <strong>Material UI</strong>'s data hooks in the create page in order to fetch data to backend API.
</ChecklistItem>
<ChecklistItem id="add-create-page-mui-3">
I understand the use of <strong>refine</strong>'s <strong>Material UI</strong> form components in the create page to collect form data.
</ChecklistItem>
</Checklist>
