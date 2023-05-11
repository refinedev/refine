---
id: resources
title: 3.3. Resources
tutorial:
    prev: tutorial/understanding-refine-props/data-provider
    next: tutorial/adding-crud-actions/index
---

This post explains how `resources` and their valid actions are declared in a **refine** app. We discuss how **refine**'s resource actions are related to routes and how to define valid resource actions.

## `resources` in refine

In a frontend CRUD application, a resource typically refers to a data entity that can be created, read, updated, or deleted. In MVC applications, it represents a model in the Model layer. For example, a resource could be an user account, a blog post, an saleable item in an online store, or any other piece of data that is stored in a database server and accessed via RESTful API endpoints.

In **refine**, the `resources` prop of `<Refine />` component is used to add `resources` to our app. This prop accepts an array of resource objects where each object represents a resource. The resource object contains properties to define the name of the resource, RESTful paths of the actions and additional metadata such as label, icon, audit log settings, and sider menu nesting, etc.

:::note

The action paths we define in resources, among other things, help **refine** to render menu items, breadcrumbs, and handle form redirections. Each of these features are highly customizable and come with sensible defaults. This allows **refine** to co-exist with existing routes, complements them without imposing any navigatory limitation.

:::

### Note on `resources` and Routes

Path definitions for a resource helps **refine** to recognize valid actions across that particular path. Basing on the current URL the browser is at, **refine** refers to the path definitions configured in the `resources` object to automatically identify the valid resource action, without requiring us to specify the resource prop in their hooks and components. It also goes ahead and invokes the relevant data hook when the component is loaded.

It's important to note that **routing is managed directly by the preferred framework** (React Router, Next.js, Remix). This makes **refine** constraint-free for use with any React (Web, Electron, React Native etc.) application. Such flexibility allows seamless integration of **refine** into existing React applications to work side by side with the existing app's routing logic without any conflict. This makes the use of **refine** convenient in enterprise-grade applications with complex requirements such as nested routes and multi-tenancy.


```tsx title="src/App.tsx"
import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  notificationProvider,
  RefineSnackbarProvider,
  ThemedLayoutV2,
  ThemedTitleV2,
} from "@refinedev/mui";

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
import { AppIcon } from "./components/app-icon";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
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
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <Refine
              dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
              notificationProvider={notificationProvider}
              authProvider={authProvider}
              i18nProvider={i18nProvider}
              routerProvider={routerBindings}
              // highlight-start
              resources={[
                {
                  name: "blog_posts",
                  list: "/blog-posts",
                  create: "/blog-posts/create",
                  edit: "/blog-posts/edit/:id",
                  show: "/blog-posts/show/:id",
                  meta: {
                    canDelete: true,
                  },
                },
                {
                  name: "categories",
                  list: "/categories",
                  create: "/categories/create",
                  edit: "/categories/edit/:id",
                  show: "/categories/show/:id",
                  meta: {
                    canDelete: true,
                  },
                },
              ]}
              // highlight-end
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
                        Header={() => <Header isSticky={true} />}
                        Title={({ collapsed }) => (
                          <ThemedTitleV2
                            collapsed={collapsed}
                            text="refine Project"
                            icon={<AppIcon />}
                          />
                        )}
                      >
                        <Outlet />
                      </ThemedLayoutV2>
                    </Authenticated>
                  }
                >
                  // highlight-start
                  <Route
                    index
                    element={<NavigateToResource resource="blog_posts" />}
                  />
                  <Route path="/blog-posts">
                    <Route index element={<BlogPostList />} />
                    <Route path="create" element={<BlogPostCreate />} />
                    <Route path="edit/:id" element={<BlogPostEdit />} />
                    <Route path="show/:id" element={<BlogPostShow />} />
                  </Route>
                  <Route path="/categories">
                    <Route index element={<CategoryList />} />
                    <Route path="create" element={<CategoryCreate />} />
                    <Route path="edit/:id" element={<CategoryEdit />} />
                    <Route path="show/:id" element={<CategoryShow />} />
                  </Route>
                  // highlight-end
                  <Route path="*" element={<ErrorComponent />} />
                </Route>
                <Route
                  element={
                    <Authenticated fallback={<Outlet />}>
                      <NavigateToResource />
                    </Authenticated>
                  }
                >
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                </Route>
              </Routes>
              <RefineKbar />
              <UnsavedChangesNotifier />
            </Refine>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
```

To get more information about router usage, refer to [React Router Documentation](https://reactrouter.com/en/main/components/routes).


## Defining Actions for a Resource

Our React admin panel app can perform actions such as `list`, `show`, `edit`, `create`, `delete` and `clone` on a resource. All valid actions, except `delete`, must be defined in the properties of a `resource` object inside the `resources` array.

For our app, we have the following `resources` array, with two resources:

```TypeScript
resources={[
              {
                  name: "blog_posts",
                  list: "/blog-posts",
                  create: "/blog-posts/create",
                  edit: "/blog-posts/edit/:id",
                  show: "/blog-posts/show/:id",
                  meta: {
                      canDelete: true,
                  },
              },
              {
                  name: "categories",
                  list: "/categories",
                  create: "/categories/create",
                  edit: "/categories/edit/:id",
                  show: "/categories/show/:id",
                  meta: {
                      canDelete: true,
                  },
              },
          ]}
```

Additional parameters can also be defined in a path. For example, if we had to specify the version for the `edit` action of the `blog_posts` resource, we could have done it as follows:

```tsx
{
    name: "blog_posts",
    edit: "/blog-posts/edit/:id/:version",
}
```

This additional parameter, can be passed to the components or hooks using `meta` property, which then is used in the API call.

:::tip

Features related to routing such as inferencing the resource from a route path, and generation of routes (optional) require us to use the `routerProvider` prop of the `<Refine />` component.

[Refer to the routerProvider documentation for more information &#8594](/docs/api-reference/core/components/refine-config/#routerprovider)

If you provide a `routerProvider`, by default, a **refine** hook or component infers its target `resource` from the current route, and passes it as the `resource` to the argument of `dataProvider` functions, hooks and components.

:::

## Learn More

[Learn more about resources in the API reference](/docs/api-reference/core/components/refine-config/#resources).

<Checklist>

<ChecklistItem id="understanding-resource">
I understand what a resource is and how to add a resource to the app.
</ChecklistItem>
<ChecklistItem id="understanding-resource-1">
I understand how to declare valid actions for my app resources.
</ChecklistItem>

</Checklist>
