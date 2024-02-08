---
title: Introduction
---

import { Sandpack, AddAntDesignToApp, AddLayoutToApp } from "./sandpack.tsx";

<Sandpack>

Now we've learned about the router integrations of Refine, let's learn about the UI integrations of Refine. In this unit, we'll learn how to use layouts, CRUD view components and hooks to build a CRUD application with Refine and Ant Design.

Refine provides integrations for the most popular UI libraries such as [Ant Design](/docs/ui-integrations/ant-design/introduction), [Material UI](/docs/ui-integrations/material-ui/introduction), [Chakra UI](/docs/ui-integrations/chakra-ui/introduction) and [Mantine](/docs/ui-integrations/mantine/introduction). These integrations provide a set of components and hooks to make it easier to use Refine with these UI libraries in cases like form and table management, layouts, views, buttons and more.

This unit will cover the following topics:

- Using layout components to add menus, headers, breadcrumbs and authentication management to your app,
- Using CRUD view components to create action pages with consistent design and common features,
- Using hooks to integrate form elements and tables with Refine's `useTable` and `useForm` hooks,
- Integrating Refine's notifications with Ant Design's notification system,
- Using `<AuthPage />` components to easily manage authentication pages.

## Adding Ant Design Dependencies

Let's get started with adding our dependencies. We'll be needing `antd` to use Ant Design components and to get Refine integrated hooks and components, we'll be installing `@refinedev/antd` package.

<InstallPackagesCommand args="antd @refinedev/antd"/>

We'll wrap our app with Ant Design's `ConfigProvider` to set the theme and `App` component to use the theme properly. We'll also import a `reset.css` file to reset the default styles of the browser.

Try to add the following code to your `src/App.tsx` file:

```tsx title="src/App.tsx"
import { Refine, Authenticated } from "@refinedev/core";
import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

// highlight-start
// We'll wrap our app with Ant Design's ConfigProvider to set the theme and App component to use the theme properly.
import { ConfigProvider, App as AntdApp } from "antd";
// highlight-end

import { dataProvider } from "./data-provider";
import { authProvider } from "./auth-provider";

import { ShowProduct } from "./show-product";
import { EditProduct } from "./edit-product";
import { ListProducts } from "./list-products";
import { CreateProduct } from "./create-product";

import { Login } from "./login";
import { Header } from "./header";

// highlight-start
// We're importing a reset.css file to reset the default styles of the browser.
import "antd/dist/reset.css";
// highlight-end

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      {/* highlight-start */}
      <ConfigProvider>
        <AntdApp>
          {/* highlight-end */}
          <Refine
            dataProvider={dataProvider}
            authProvider={authProvider}
            routerProvider={routerProvider}
            resources={[
              {
                name: "protected-products",
                list: "/products",
                show: "/products/:id",
                edit: "/products/:id/edit",
                create: "/products/create",
                meta: { label: "Products" },
              },
            ]}
          >
            <Routes>
              <Route
                element={
                  <Authenticated
                    key="authenticated-routes"
                    redirectOnFail="/login"
                  >
                    <Header />
                    <Outlet />
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
          {/* highlight-start */}
        </AntdApp>
      </ConfigProvider>
      {/* highlight-end */}
    </BrowserRouter>
  );
}
```

<AddAntDesignToApp />

Now that we have our dependencies installed, let's start by adding a layout to our app.

## Adding a Layout

Refine provides a `<ThemedLayoutV2 />` component to add many features out of the box to your app. In the next step, we'll learn more about these features and how to use them. Now to see it in action, let's wrap our authenticated routes with the `<ThemedLayoutV2 />` component.

Try to add the following code to your `src/App.tsx` file:

```tsx title="src/App.tsx"
import { Refine, Authenticated } from "@refinedev/core";
import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6";
// highlight-next-line
import { ThemedLayoutV2 } from "@refinedev/antd";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { ConfigProvider, App as AntdApp } from "antd";

import { dataProvider } from "./data-provider";
import { authProvider } from "./auth-provider";

import { ShowProduct } from "./show-product";
import { EditProduct } from "./edit-product";
import { ListProducts } from "./list-products";
import { CreateProduct } from "./create-product";

import { Login } from "./login";

import "antd/dist/reset.css";

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <ConfigProvider>
        <AntdApp>
          <Refine
            dataProvider={dataProvider}
            authProvider={authProvider}
            routerProvider={routerProvider}
            resources={[
              {
                name: "protected-products",
                list: "/products",
                show: "/products/:id",
                edit: "/products/:id/edit",
                create: "/products/create",
                meta: { label: "Products" },
              },
            ]}
          >
            <Routes>
              <Route
                element={
                  <Authenticated
                    key="authenticated-routes"
                    redirectOnFail="/login"
                  >
                    {/* highlight-start */}
                    <ThemedLayoutV2>
                      <Outlet />
                    </ThemedLayoutV2>
                    {/* highlight-end */}
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
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
}
```

<AddLayoutToApp />

Now our app is wrapped with a nice layout including a sidebar and a header.

In the next step, we'll learn about the features of the layout components and how to use them.

</Sandpack>
