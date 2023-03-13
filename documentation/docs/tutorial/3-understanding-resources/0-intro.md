---
id: index
title: Resources
tutorial:
    order: 0
    prev: false
    next: tutorial/adding-crud-pages/{preferredUI}/index
---

:::info Remember

<UIConditional is="antd">

In the [Unit 2.4](/docs/tutorial/getting-started/antd/generate-crud-pages/), we have defined a resource to create our CRUD pages with the Inferencer component. However, we have not explained how it works. In this unit, we will explain the `resources` prop of the `<Refine/>` component using the mock components.

</UIConditional>

<UIConditional is="chakra-ui">

In the [Unit 2.4](/docs/tutorial/getting-started/chakra-ui/generate-crud-pages/), we have defined a resource to create our CRUD pages with the Inferencer component. However, we have not explained how it works. In this unit, we will explain the `resources` prop of the `<Refine/>` component using the mock components.

</UIConditional>

<UIConditional is="headless">

In the [Unit 2.4](/docs/tutorial/getting-started/headless/generate-crud-pages/), we have defined a resource to create our CRUD pages with the Inferencer component. However, we have not explained how it works. In this unit, we will explain the `resources` prop of the `<Refine/>` component using the mock components.

</UIConditional>

<UIConditional is="mantine">

In the [Unit 2.4](/docs/tutorial/getting-started/mantine/generate-crud-pages/), we have defined a resource to create our CRUD pages with the Inferencer component. However, we have not explained how it works. In this unit, we will explain the `resources` prop of the `<Refine/>` component using the mock components.

</UIConditional>

<UIConditional is="mui">

In the [Unit 2.4](/docs/tutorial/getting-started/mui/generate-crud-pages/), we have defined a resource to create our CRUD pages with the Inferencer component. However, we have not explained how it works. In this unit, we will explain the `resources` prop of the `<Refine/>` component using the mock components.

</UIConditional>

:::

Before we start, let's understand what `<Refine>` component is.

The `<Refine>` component serves as the starting point for **refine**. It is a wrapper component that offers context to the **refine** components and hooks. It is utilized to configure the top-level settings of the application.

To initialize the app, the dataProvider is the only necessary prop that must be provided. Additionally, there are other props such as `resources`, `routerProvider`, `authProvider`, `i18nProvider`, etc.

These props enable the configuration of various aspects of the application, such as data management, routing, authentication, localization, layout, and more.

[Refer to the `<Refine>` documentation for more information &#8594](/docs/api-reference/core/components/refine-config/)

## What is resource?

In the context of a CRUD application, a resource typically refers to a data entity that can be created, read, updated, or deleted. For example, a resource could be a user account, a blog post, a product in an online store, or any other piece of data that can be managed by the CRUD app.

To add a `resource` to our app, we need use `resources` prop of `<Refine>` component. This prop accepts an array of objects. Each object represents a resource. The resource object may contain properties to define the name of the resource, the routes of the actions and additional metadata such as label, icon, audit log settings, and sider menu nesting etc.

:::note

The action paths we define in resources helps **refine** to render menu items, breadcrumbs, and handle form redirections, among other things. This means **refine** co-exists with your routes and complements them and doesn't impose any limitation.

:::

### Note on resources and routes

Path definitions in the resource configuration helps **refine** to recognize the available actions for the resource at that particular path. This way, **refine** can automatically identify the resource based on the current path, without requiring users to manually specify the resource prop in their hooks and components.

It's important to note that **route management will be handled by your preferred framework** (React Router, Next.js, Remix). This makes it possible to use **refine** with any React (Web, Electron, React Native etc.) application, without any constraints.

Thanks to its flexibility, **refine** can be seamlessly integrated into existing React applications without imposing any limitations on users. It can be attached to routes where it's needed without interfering with your routing logic. This makes it possible to use **refine** with enterprise-grade applications that have complex requirements such as nested routes and multi-tenancy.

<UIConditional is="headless">

```tsx title="src/App.tsx"
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerBindings from "@refinedev/react-router-v6"
import { BrowserRouter, Routes, Route, Outlet } from "react-router-v6";
import { HeadlessInferencer } from "@refinedev/inferencer";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Refine
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                routerProvider={routerBindings}
                //highlight-start
                resources={[
                    {
                        name: "products",
                        list: "/products",
                        show: "/products/show/:id",
                        create: "/products/create",
                        edit: "/products/edit/:id",
                    },
                ]}
                //highlight-end
            >
                <Routes>
                    <Route path="products">
                        <Route index element={<HeadlessInferencer  />} />
                        <Route path="show/:id" element={<HeadlessInferencer />} />
                        <Route path="edit/:id" element={<HeadlessInferencer />} />
                        <Route path="create" element={<HeadlessInferencer />} />
                    </Route>

                    <Route path="*" element={<div>Error!</div>} />
                </Routes>
            </Refine>
        <BrowserRouter />
    );
};

export default App;
```

</UIConditional>

<UIConditional is="antd">

```tsx title="src/App.tsx"
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerBindings from "@refinedev/react-router-v6"
import { BrowserRouter, Routes, Route, Outlet } from "react-router-v6";
import { Layout, ErrorComponent } from "@refinedev/antd";
import { AntdInferencer } from "@refinedev/inferencer";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Refine
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                routerProvider={routerBindings}
                //highlight-start
                resources={[
                    {
                        name: "products",
                        list: "/products",
                        show: "/products/show/:id",
                        create: "/products/create",
                        edit: "/products/edit/:id",
                    },
                ]}
                //highlight-end
            >
                <Routes>
                    <Route
                        element={
                            <Layout>
                                <Outlet />
                            </Layout>
                        }
                    >
                        <Route path="products">
                            <Route index element={<AntdInferencer />} />
                            <Route path="show/:id" element={<AntdInferencer />} />
                            <Route path="edit/:id" element={<AntdInferencer />} />
                            <Route path="create" element={<AntdInferencer />} />
                        </Route>

                        <Route path="*" element={<ErrorComponent />} />
                    </Route>
                </Routes>
            </Refine>
        <BrowserRouter />
    );
};

export default App;
```

</UIConditional>

<UIConditional is="chakra-ui">

```tsx title="src/App.tsx"
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerBindings from "@refinedev/react-router-v6"
import { BrowserRouter, Routes, Route, Outlet } from "react-router-v6";
import { Layout, ErrorComponent } from "@refinedev/chakra-ui";
import { ChakraUIInferencer } from "@refinedev/inferencer";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Refine
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                routerProvider={routerBindings}
                //highlight-start
                resources={[
                    {
                        name: "products",
                        list: "/products",
                        show: "/products/show/:id",
                        create: "/products/create",
                        edit: "/products/edit/:id",
                    },
                ]}
                //highlight-end
            >
                <Routes>
                    <Route
                        element={
                            <Layout>
                                <Outlet />
                            </Layout>
                        }
                    >
                        <Route path="products">
                            <Route index element={<ChakraUIInferencer />} />
                            <Route path="show/:id" element={<ChakraUIInferencer />} />
                            <Route path="edit/:id" element={<ChakraUIInferencer />} />
                            <Route path="create" element={<ChakraUIInferencer />} />
                        </Route>

                        <Route path="*" element={<ErrorComponent />} />
                    </Route>
                </Routes>
            </Refine>
        <BrowserRouter />
    );
};

export default App;
```

</UIConditional>

<UIConditional is="mantine">

```tsx title="src/App.tsx"
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerBindings from "@refinedev/react-router-v6"
import { BrowserRouter, Routes, Route, Outlet } from "react-router-v6";
import { Layout, ErrorComponent } from "@refinedev/mantine";
import { MantineInferencer } from "@refinedev/inferencer";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Refine
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                routerProvider={routerBindings}
                //highlight-start
                resources={[
                    {
                        name: "products",
                        list: "/products",
                        show: "/products/show/:id",
                        create: "/products/create",
                        edit: "/products/edit/:id",
                    },
                ]}
                //highlight-end
            >
                <Routes>
                    <Route
                        element={
                            <Layout>
                                <Outlet />
                            </Layout>
                        }
                    >
                        <Route path="products">
                            <Route index element={<MantineInferencer />} />
                            <Route path="show/:id" element={<MantineInferencer />} />
                            <Route path="edit/:id" element={<MantineInferencer />} />
                            <Route path="create" element={<MantineInferencer />} />
                        </Route>

                        <Route path="*" element={<ErrorComponent />} />
                    </Route>
                </Routes>
            </Refine>
        <BrowserRouter />
    );
};

export default App;
```

</UIConditional>

<UIConditional is="mui">

```tsx title="src/App.tsx"
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-v6";
import routerBindings from "@refinedev/react-router-v6"
import { Layout, ErrorComponent } from "@refinedev/mui";
import { MuiInferencer } from "@refinedev/inferencer";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Refine
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                routerProvider={routerBindings}
                //highlight-start
                resources={[
                    {
                        name: "products",
                        list: "/products",
                        show: "/products/show/:id",
                        create: "/products/create",
                        edit: "/products/edit/:id",
                    },
                ]}
                //highlight-end
            >
                <Routes>
                    <Route
                        element={
                            <Layout>
                                <Outlet />
                            </Layout>
                        }
                    >
                        <Route path="products">
                            <Route index element={<MuiInferencer />} />
                            <Route path="show/:id" element={<MuiInferencer />} />
                            <Route path="edit/:id" element={<MuiInferencer />} />
                            <Route path="create" element={<MuiInferencer />} />
                        </Route>

                        <Route path="*" element={<ErrorComponent />} />
                    </Route>
                </Routes>
            </Refine>
        <BrowserRouter />
    );
};

export default App;
```

</UIConditional>

To have more information about router usage, refer to [React Router Documentation](https://reactrouter.com/en/main/components/routes).

## Defining Actions for a Resource

A resource can perform actions such as `list`, `show`, `edit`, `create`, `delete` and `clone`. These actions except `delete`, are defined in the properties of the resource object.

The simplest way to define the actions is to provide the path of the page. For example, if we want to define the `list` action of the `products` resource, we can do it as follows:

```tsx
{
    name: "products",
    list: "/products",
}
```

Paths can include parameters with a convention similar `:paramName`. For example, if we want to define the `show` action of the `products` resource, we can do it as follows:

```tsx
{
    name: "products",
    show: "/products/show/:id",
}
```

Additional parameters can also be defined in the path. For example, if we want to define the `edit` action of the `products` resource, we can do it as follows:

```tsx
{
    name: "products",
    edit: "/products/edit/:id/:version",
}
```

These additional parameters except for the `id` parameter, can be passed to the components or hooks using `meta` properties. Also the existing parameters in the URL will be used by default when handling the navigation. So, let's say we have a `create` action for the `products` resource as `/:userId/products/create` and the user is currently on the `/:userId/products` page. When the user clicks on the `create` button, the user will be redirected to `/:userId/products/create` page. The `userId` parameter will be inferred from the current path unless it is explicitly defined in the `meta` property.

## Learn More

Learn more about [resources](/docs/api-reference/core/components/refine-config/#resources) in the API reference.

<Checklist>

<ChecklistItem id="understanding-resource">
I understood what a resource is and how to add a resource to the app.
</ChecklistItem>

</Checklist>
