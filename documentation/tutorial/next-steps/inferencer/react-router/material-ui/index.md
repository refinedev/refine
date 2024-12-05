---
title: Using Inferencer
---

import { Sandpack, CreateListCategoriesTsx, AddListCategoriesToApp, AddInferencerToListCategories } from "./sandpack.tsx";

<Sandpack>

Refine's [`@refinedev/inferencer`](/docs/packages/inferencer) package can be used to scaffold initial code for your resource pages based on API responses.

Generated code aren't guaranteed to work perfectly. This tool meant to be used locally to speed up the development process by generating the initial code and shouldn't be used on production.

## Installation

Let's start by installing the `@refinedev/inferencer` package. Inferencer package can generate views with multiple UI libraries that Refine provides a built-in support for. To generate a view with a UI library, you need to install their dependencies as well (e.g. `@refinedev/mui` and Material UI packages for Material UI).

Supported UI libraries for Inferencer are:

- [Material UI](/docs/ui-integrations/material-ui/components/inferencer)
- [Ant Design](/docs/ui-integrations/ant-design/components/inferencer)
- [Chakra UI](/docs/ui-integrations/chakra-ui/components/inferencer)
- [Mantine](/docs/ui-integrations/mantine/components/inferencer)
- [Headless (Unstyled)](/docs/packages/inferencer)

<InstallPackagesCommand args="@refinedev/inferencer" />

## Usage

Inferencer package exports UI specific inferencer components with sub-paths for each UI library. For example, to use Inferencer with Material UI, you need to import `MuiInferencer` from `@refinedev/inferencer/mui`.

```tsx
import { MuiInferencer } from "@refinedev/inferencer/mui";

export const MyPage = () => {
  return <MuiInferencer resource="products" action="list" />;
};
```

In the example above, we are using `MuiInferencer` to generate a list view for the `products` resource. The `action` prop is used to specify the type of view to be generated. The available actions are `list`, `show`, `edit`, and `create`.

After you have mounted the Inferencer component, you will get a preview of the generated view for the specified action of the resource and provided with the source code of the generated component. You can copy & paste the generated code and customize it to fit your application's needs.

## Using Inferencer for the Categories Resource

In our application, we've used the `categories` resource in relation to the `products` resource. Now we will use inferencer component to generate a list view for the `categories` resource.

Let's start by creating a new file called `src/pages/categories/list.tsx` file.

<CreateListCategoriesTsx />

Then let's create a route at `/categories` to render the `ListCategories` component.

Update your `src/App.tsx` file by adding the following lines:

```tsx title="src/App.tsx"
import { Refine, Authenticated } from "@refinedev/core";
import routerProvider, { NavigateToResource } from "@refinedev/react-router";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import {
  RefineThemes,
  ThemedLayoutV2,
  ThemedTitleV2,
  RefineSnackbarProvider,
  useNotificationProvider,
} from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider } from "@mui/material/styles";

import { dataProvider } from "./providers/data-provider";
import { authProvider } from "./providers/auth-provider";

import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { ListProducts } from "./pages/products/list";
import { CreateProduct } from "./pages/products/create";

// highlight-next-line
import { ListCategories } from "./pages/categories/list";

import { Login } from "./pages/login";

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <ThemeProvider theme={RefineThemes.Blue}>
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
        <RefineSnackbarProvider>
          <Refine
            dataProvider={dataProvider}
            authProvider={authProvider}
            routerProvider={routerProvider}
            notificationProvider={useNotificationProvider}
            resources={[
              {
                name: "protected-products",
                list: "/products",
                show: "/products/:id",
                edit: "/products/:id/edit",
                create: "/products/create",
                meta: { label: "Products" },
              },
              // highlight-start
              // We're adding the categories resource to the resources array
              // This way, there will be a link to the categories list in the sidebar
              {
                name: "categories",
                list: "/categories",
                meta: { label: "Categories" },
              },
              // highlight-end
            ]}
          >
            <Routes>
              <Route
                element={
                  <Authenticated
                    key="authenticated-routes"
                    redirectOnFail="/login"
                  >
                    <ThemedLayoutV2
                      Title={(props) => (
                        <ThemedTitleV2 {...props} text="Awesome Project" />
                      )}
                    >
                      <Outlet />
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
                <Route
                  index
                  element={<NavigateToResource resource="protected-products" />}
                />
                <Route path="/products">
                  <Route index element={<ListProducts />} />
                  <Route path=":id" element={<ShowProduct />} />
                  <Route path=":id/edit" element={<EditProduct />} />
                  <Route path="create" element={<CreateProduct />} />
                </Route>
                {/* highlight-start */}
                <Route path="/categories">
                  <Route index element={<ListCategories />} />
                </Route>
                {/* highlight-end */}
              </Route>
              <Route
                element={
                  <Authenticated key="auth-pages" fallback={<Outlet />}>
                    <NavigateToResource resource="protected-products" />
                  </Authenticated>
                }
              >
                <Route path="/login" element={<Login />} />
              </Route>
            </Routes>
          </Refine>
        </RefineSnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
```

<AddListCategoriesToApp />

We've mounted the `ListCategories` component to the `/categories` route and added the `categories` resource to the `resources` array, which enables the sidebar will automatically have a link to the categories list.

Now let's add Inferencer to the `ListCategories` component.

Update your `src/pages/categories/list.tsx` file by adding the following lines:

```tsx title="src/pages/categories/list.tsx"
import { MuiInferencer } from "@refinedev/inferencer/mui";

export const ListCategories = () => {
  return (
    <MuiInferencer
    // resource="categories" // We're omitting this prop because it's inferred from the route
    // action="list" // We're omitting this prop because it's inferred from the route
    />
  );
};
```

<AddInferencerToListCategories />

Notice that we've not provided the `resource` and `action` props to the `MuiInferencer` component because they are inferred from the route.

Now, if you navigate to the `/categories` route, you will see the generated list view for the `categories` resource. Then you can copy & paste the generated code and customize it to fit your application's needs.

In this step, we've covered the basics of using Inferencer to generate views for resources. In the next step, we'll be learning about the Refine's CLI and its features.

</Sandpack>
