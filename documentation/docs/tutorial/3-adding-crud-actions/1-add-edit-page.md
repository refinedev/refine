---
id: add-edit-page
title: 4.2. Adding Edit Page
tutorial:
    prev: tutorial/adding-crud-actions/index
    next: tutorial/adding-crud-actions/add-show-page
---

This post demonstrates how to implement the `edit` page of `blog_posts` resource without resorting to `<MuiEditInferencer />`. Basically, we just replace the existing code inside the `src/pages/blog-posts/edit.tsx` file with the Inferencer-generated **refine** and **Material UI** code.


## The Edit Page

The Inferencer-generated `<BlogPostEdit />` component is available at the `/blog-posts/edit/:id` route. For a blog post with a given `:id`, when we visit its `edit` page, we can view the code in a modal by clicking on `Show the auto-generated code` button:

```tsx
import { Edit, useAutocomplete } from "@refinedev/mui";
import { Box, TextField, Autocomplete } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

export const BlogPostEdit = () => {
    const {
        saveButtonProps,
        refineCore: { queryResult },
        register,
        control,
        formState: { errors },
    } = useForm();

    const blogPostsData = queryResult?.data?.data;

    const { autocompleteProps: categoryAutocompleteProps } = useAutocomplete({
        resource: "categories",
        defaultValue: blogPostsData?.category?.id,
    });

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column" }}
                autoComplete="off"
            >
                <TextField
                    {...register("id", {
                        required: "This field is required",
                        valueAsNumber: true,
                    })}
                    error={!!(errors as any)?.id}
                    helperText={(errors as any)?.id?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    label="Id"
                    name="id"
                    disabled
                />
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
        </Edit>
    );
};
```

The code above was generated by Inferencer by carrying out an initial polling to the `/blog-posts/edit/:id` endpoint in **Simple REST API**. After polling, it figured out the shape of the API response and placed appropriate **Material UI** form elements for editing a blog post item.

Below, we briefly make sense of the components and hooks used in the `edit` page.


## Understanding the Edit Page Components

-   `<Edit />` is a **refine** wrapper component used to present an editing form. It also houses customizable sub-components like the title of the page, save button, refresh button, etc.

    [Refer to the `<Edit/>` documentation for more information &#8594](/docs/api-reference/mui/components/basic-views/edit)

-   The `useForm()` hook, imported from `@refinedev/react-hook-form` package, is a high level hook  derived from the **refine** core `useForm()` hook imported from `@refinedev/core` package (they both have the same name, but differ in some functionality).

    It provides all the features of the `useForm()` hook from `@refinedev/core` package as well as the `useForm()` hook from **React Hook Form**. It also exposes the `saveButtonProps` prop that we are passing to the submit button of the form.

    Inside the `<BlogPostEdit />` component, it automatically fetches the record data based on the `id` in the URL and then fills the appropriate input fields of the form. After editing is completed and the form submitted, these data are gathered and relayed to `dataProvider`'s `update` method.

    [Refer to the **@refinedev/react-hook-form** `useForm()` documentation for more information &#8594](/docs/packages/documentation/react-hook-form/useForm/)

    [Refer to the **React Hook Form** documentation for more information &#8594](https://react-hook-form.com/)

-   The other **Material UI** components, such as `<TextField />`, `<Controller />` and `<Autocomplete />` are used to display the form fields.

    [Refer to the **Material UI** documentation for more information &#8594](https://mui.com/)


Let's copy this code generated by Inferencer and paste it into the file at `src/pages/blog-posts/edit.tsx`. We should replace the existing code that uses the `<MuiEditInferencer />`.


## Handling Relationships

The `blog_posts` resource is associated with `categories`, so for editing the category of a blog post, we need to fetch it and pass it to its form field. In order to avail a blog post's associated `categories` data, we are using the `useAutocomplete()` hook before passing them to the `<Autocomplete />` component:

```tsx
const { autocompleteProps: categoryAutocompleteProps } = useAutocomplete({
    resource: "categories",
    defaultValue: blogPostsData?.category?.id,
});
```

### refine's Material UI `useAutoComplete()` Hook

The `useAutoComplete()` hook is a **refine** supported **Material UI** hook that fetches data by passing its accepted arguments to the `dataProvider`'s `getList` method. Then, it returns the necessary props for the `<Autocomplete />` component.

By default, `useAutocomplete()` returns 10 items. This has drawbacks because the category of a current blog post may not be in the first 10 records. So, in the above `useAutcomplete()` implementation, we are using the `defaultValue` prop to overcome this behavior. By passing the category `:id` of the current blog post as the `defaultValue`, we are making sure we always fill the category field for editing a given blog post item.

[Refer to the `useAutocomplete()` documentation for more information &#8594](/docs/api-reference/mui/hooks/useAutocomplete/)

[Refer to the **Material UI** `<Autocomplete />` documentation for more information &#8594](https://mui.com/material-ui/react-autocomplete/)

Now, if we view the blog posts `edit` page in the browser at <a href="http://localhost:5173/blog-posts/edit/123" rel="noopener noreferrer nofollow">localhost:5173/blog-posts/edit/123</a>, it shows the same UI:


## Edit Page Preview

```tsx live previewOnly previewHeight=600px url=http://localhost:5173/blog-posts/edit/123
setInitialRoutes(["/blog-posts/edit/123"]);

import { Authenticated, GitHubBanner, IResourceComponentsProps, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  notificationProvider,
  RefineSnackbarProvider,
  ThemedLayoutV2,
  ThemedTitleV2,
} from "@refinedev/mui";
import { MuiEditInferencer } from "@refinedev/inferencer/mui";
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
const BlogPostEdit: React.FC<IResourceComponentsProps> = () => {
  return <MuiEditInferencer />;
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
                  // create: "/blog-posts/create",
                  edit: "/blog-posts/edit/:id",
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
                    <Route path="edit/:id" element={<BlogPostEdit />} />
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

Notice also that we no longer see the box that houses `Show the auto-generated code` button, because we removed the `<MuiEditInferencer />` component from `<BlogPostEdit />`:



<br/>
<br/>

<Checklist>
<ChecklistItem id="add-edit-page-mui">
I added the Inferenccer-generated code to {`<BlogPostEdit />`} component.
</ChecklistItem>
<ChecklistItem id="add-edit-page-mui-2">
I understand the use of <strong>refine</strong> core and <strong>Material UI</strong>'s data hooks in the edit page in order to fetch data to and from backend API.
</ChecklistItem>
<ChecklistItem id="add-edit-page-mui-3">
I understand the use of <strong>refine</strong>'s <strong>Material UI</strong> components in the edit page to display editable form data.
</ChecklistItem>
<ChecklistItem id="add-edit-page-mui-4">
I understand how the <code>useAutoComplete()</code> hook is used to prepopulate an associated resource in a form field.
</ChecklistItem>
</Checklist>
