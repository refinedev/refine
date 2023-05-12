---
id: add-show-page
title: 4.3. Adding Show Page
tutorial:
    prev: tutorial/adding-crud-actions/add-edit-page
    next: tutorial/adding-crud-actions/add-create-page
---

This post demonstrates how to implement the `show` page of `blog_posts` resource without resorting to `<MuiShowInferencer />`. We replace the existing code inside the `src/pages/blog-posts/show.tsx` file with the Inferencer-generated **refine** and **Material UI** code.


## The Show Page

The Inferencer-generated `<BlogPostShow />` component is available at the `/blog-posts/show/:id` route. For a blog post with a given `:id`, when we visit its `show` page, we can view the code in a modal by clicking on `Show the auto-generated code` button. The code looks like this:

```tsx
import { useShow, useOne } from "@refinedev/core";
import {
    Show,
    NumberField,
    TextFieldComponent as TextField,
    MarkdownField,
    DateField,
} from "@refinedev/mui";
import { Typography, Stack } from "@mui/material";

export const BlogPostShow = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    const { data: categoryData, isLoading: categoryIsLoading } = useOne({
        resource: "categories",
        id: record?.category?.id || "",
        queryOptions: {
            enabled: !!record,
        },
    });

    return (
        <Show isLoading={isLoading}>
            <Stack gap={1}>
                <Typography variant="body1" fontWeight="bold">
                    Id
                </Typography>
                <NumberField value={record?.id ?? ""} />
                <Typography variant="body1" fontWeight="bold">
                    Title
                </Typography>
                <TextField value={record?.title} />
                <Typography variant="body1" fontWeight="bold">
                    Content
                </Typography>
                <MarkdownField value={record?.content} />
                <Typography variant="body1" fontWeight="bold">
                    Category
                </Typography>

                {categoryIsLoading ? (
                    <>Loading...</>
                ) : (
                    <>{categoryData?.data?.title}</>
                )}
                <Typography variant="body1" fontWeight="bold">
                    Status
                </Typography>
                <TextField value={record?.status} />
                <Typography variant="body1" fontWeight="bold">
                    Created At
                </Typography>
                <DateField value={record?.createdAt} />
            </Stack>
        </Show>
    );
};
```

The Inferencer generated this `<BlogPostShow />` component by carrying out an initial polling of the blog post resource, figuring out the shape of the API response and placing the **Material UI** elements for the page appropriately.


Below, we briefly make sense of the components and hooks used in this page.


## Understanding the Show Page Components

-   `<Show />` is a **refine** component that is used to present a `show` page. It acts as a wrapper around other components like the title of the page, list button, etc.

    [Refer to the `<Show />` documentation for more information &#8594](/docs/api-reference/mui/components/basic-views/show/)

-   The `useShow()` hook is a **refine** core hook that is used to get a single record by using the `id` in the URL. It sends the arguments passed to it to the `dataProvider`'s `getOne()` function and exposes the data for presentation in a UI.

    [Refer to the `useShow()` documentation for more information &#8594](/docs/api-reference/core/hooks/show/useShow/)

-   All other components such as `<TextField />` are **Material UI** components used to show the fetched data.

    [Refer to the **Material UI** documentation for more information &#8594](https://mui.com/)


### Handling Relationships

The `blog_posts` resource is associated with the `categories` resource. In the `show` page for a blog post item, we retrieve associated `categories` data with **refine**'s core `useOne()` hook.

### refine `useOne()` Hook

This hook allows us to fetch a single record based on the `id` and `resource` parameters passed to it. Here, we are getting the category of the blog post:

```tsx
const { data: categoryData, isLoading: categoryIsLoading } = useOne({
    resource: "categories",
    id: record?.category?.id || "",
    queryOptions: {
        enabled: !!record,
    },
});
```

We use the `queryOptions` object to make sure the associated `categories` data is fetched only after the blog post record has been successfully retrieved. By setting the `enabled` property to `true` only if the `blog_posts` record variable is truthy, we are able to control the fetching of `categories` record.

[Refer to the `useOne()` documentation for more information &#8594](/docs/api-reference/core/hooks/data/useOne/)


Let's copy this and paste the Inferencer-generated code into the file at `src/pages/blog-posts/show.tsx`. We should replace the existing code that uses the `<MuiShowInferencer />`.


## Show Page Preview

Now, if we view the blog post `show` page in the browser at <a href="http://localhost:5173/blog-posts/show/123" rel="noopener noreferrer nofollow">localhost:5173/blog-posts/show/123</a>, we see the same UI being rendered, except the `Show the auto-generated code` is missing because we removed the `<MuiShowInferencer />` component:


```tsx live previewOnly previewHeight=600px url=http://localhost:5173/blog-posts/show/123
setInitialRoutes(["/blog-posts/show/123"]);


import { Authenticated, GitHubBanner, IResourceComponentsProps, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  notificationProvider,
  RefineSnackbarProvider,
  ThemedLayoutV2,
  ThemedTitleV2,
} from "@refinedev/mui";
import { MuiShowInferencer } from "@refinedev/inferencer/mui";
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
const BlogPostShow: React.FC<IResourceComponentsProps> = () => {
  return <MuiShowInferencer />;
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
                  // edit: "/blog-posts/edit/:id",
                  show: "/blog-posts/show/:id",
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
                    <Route path="show/:id" element={<BlogPostShow />} />
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
<ChecklistItem id="add-show-page-mui">
I added the Inferenccer-generated code to {`<BlogPostShow />`} component.
</ChecklistItem>
<ChecklistItem id="add-show-page-mui-2">
I understand the use of <strong>refine</strong> core and <strong>Material UI</strong>'s data hooks in the show page in order to fetch data from backend API.
</ChecklistItem>
<ChecklistItem id="add-show-page-mui-3">
I understand the use of <strong>refine</strong>'s <strong>Material UI</strong> components in the show page to display fetched data.
</ChecklistItem>
<ChecklistItem id="add-show-page-mui-4">
I understand how the <code>useOne()</code> hook is used to fetch a single associated resource item.
</ChecklistItem>
</Checklist>
