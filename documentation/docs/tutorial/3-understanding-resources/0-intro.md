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

In the context of a CRUD application, a resource typically refers to a data entity that can be created, read, updated, or deleted. For example, a resource could be a user account, a blog post, a blog post in an online store, or any other piece of data that can be managed by the CRUD app.

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
import { HeadlessInferencer } from "@refinedev/inferencer/headless";
import routerBindings, {
    NavigateToResource,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Refine
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                routerProvider={routerBindings}
                //highlight-start
                resources={[
                    {
                        name: "blog_posts",
                        list: "/blog-posts",
                        show: "/blog-posts/show/:id",
                        create: "/blog-posts/create",
                        edit: "/blog-posts/edit/:id",
                    },
                ]}
                //highlight-end
                options={{
                    syncWithLocation: true,
                    warnWhenUnsavedChanges: true,
                }}
            >
                <Routes>
                    <Route
                        index
                        element={<NavigateToResource resource="blog_posts" />}
                    />

                    <Route path="blog-posts">
                        <Route index element={<HeadlessInferencer />} />
                        <Route
                            path="show/:id"
                            element={<HeadlessInferencer />}
                        />
                        <Route
                            path="edit/:id"
                            element={<HeadlessInferencer />}
                        />
                        <Route path="create" element={<HeadlessInferencer />} />
                    </Route>

                    <Route path="*" element={<div>Error!</div>} />
                </Routes>
                <UnsavedChangesNotifier />
            </Refine>
        </BrowserRouter>
    );
};

export default App;
```

</UIConditional>

<UIConditional is="antd">

```tsx title="src/App.tsx"
import { ErrorComponent, ThemedLayout, RefineThemes } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";
import { ConfigProvider } from "antd";
import { Refine } from "@refinedev/core";
import { AntdInferencer } from "@refinedev/inferencer/antd";
import routerBindings, {
    NavigateToResource,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <ConfigProvider theme={RefineThemes.Blue}>
                <Refine
                    dataProvider={dataProvider(
                        "https://api.fake-rest.refine.dev",
                    )}
                    routerProvider={routerBindings}
                    //highlight-start
                    resources={[
                        {
                            name: "blog_posts",
                            list: "/blog-posts",
                            show: "/blog-posts/show/:id",
                            create: "/blog-posts/create",
                            edit: "/blog-posts/edit/:id",
                        },
                    ]}
                    //highlight-end
                    options={{
                        syncWithLocation: true,
                        warnWhenUnsavedChanges: true,
                    }}
                >
                    <Routes>
                        <Route
                            element={
                                <ThemedLayout>
                                    <Outlet />
                                </ThemedLayout>
                            }
                        >
                            <Route
                                index
                                element={
                                    <NavigateToResource resource="blog_posts" />
                                }
                            />
                            <Route path="blog-posts">
                                <Route index element={<AntdInferencer />} />
                                <Route
                                    path="show/:id"
                                    element={<AntdInferencer />}
                                />
                                <Route
                                    path="edit/:id"
                                    element={<AntdInferencer />}
                                />
                                <Route
                                    path="create"
                                    element={<AntdInferencer />}
                                />
                            </Route>

                            <Route path="*" element={<ErrorComponent />} />
                        </Route>
                    </Routes>
                    <UnsavedChangesNotifier />
                </Refine>
            </ConfigProvider>
        </BrowserRouter>
    );
};

export default App;
```

</UIConditional>

<UIConditional is="chakra-ui">

```tsx title="src/App.tsx"
import {
    ErrorComponent,
    ThemedLayout,
    RefineThemes,
} from "@refinedev/chakra-ui";
import { ChakraProvider } from "@chakra-ui/react";
import { Refine } from "@refinedev/core";
import { ChakraUIInferencer } from "@refinedev/inferencer/chakra";
import routerBindings, {
    NavigateToResource,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <ChakraProvider theme={RefineThemes.Blue}>
                <Refine
                    dataProvider={dataProvider(
                        "https://api.fake-rest.refine.dev",
                    )}
                    routerProvider={routerBindings}
                    //highlight-start
                    resources={[
                        {
                            name: "blog_posts",
                            list: "/blog-posts",
                            show: "/blog-posts/show/:id",
                            create: "/blog-posts/create",
                            edit: "/blog-posts/edit/:id",
                        },
                    ]}
                    //highlight-end
                    options={{
                        syncWithLocation: true,
                        warnWhenUnsavedChanges: true,
                    }}
                >
                    <Routes>
                        <Route
                            element={
                                <ThemedLayout>
                                    <Outlet />
                                </ThemedLayout>
                            }
                        >
                            <Route
                                index
                                element={
                                    <NavigateToResource resource="blog_posts" />
                                }
                            />
                            <Route path="blog-posts">
                                <Route index element={<ChakraUIInferencer />} />
                                <Route
                                    path="show/:id"
                                    element={<ChakraUIInferencer />}
                                />
                                <Route
                                    path="edit/:id"
                                    element={<ChakraUIInferencer />}
                                />
                                <Route
                                    path="create"
                                    element={<ChakraUIInferencer />}
                                />
                            </Route>

                            <Route path="*" element={<ErrorComponent />} />
                        </Route>
                    </Routes>
                    <UnsavedChangesNotifier />
                </Refine>
            </ChakraProvider>
        </BrowserRouter>
    );
};

export default App;
```

</UIConditional>

<UIConditional is="mantine">

```tsx title="src/App.tsx"
import { Refine } from "@refinedev/core";
import { MantineInferencer } from "@refinedev/inferencer/mantine";
import { ErrorComponent, ThemedLayoutV2, RefineThemes } from "@refinedev/mantine";
import { MantineProvider, Global } from "@mantine/core";
import routerBindings, {
    NavigateToResource,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <MantineProvider
                theme={RefineThemes.Blue}
                withNormalizeCSS
                withGlobalStyles
            >
                <Refine
                    dataProvider={dataProvider(
                        "https://api.fake-rest.refine.dev",
                    )}
                    routerProvider={routerBindings}
                    //highlight-start
                    resources={[
                        {
                            name: "blog_posts",
                            list: "/blog-posts",
                            show: "/blog-posts/show/:id",
                            create: "/blog-posts/create",
                            edit: "/blog-posts/edit/:id",
                        },
                    ]}
                    //highlight-end
                    options={{
                        syncWithLocation: true,
                        warnWhenUnsavedChanges: true,
                    }}
                >
                    <Routes>
                        <Route
                            element={
                                <ThemedLayoutV2>
                                    <Outlet />
                                </ThemedLayoutV2>
                            }
                        >
                            <Route
                                index
                                element={
                                    <NavigateToResource resource="blog_posts" />
                                }
                            />
                            <Route path="blog-posts">
                                <Route index element={<MantineInferencer />} />
                                <Route
                                    path="show/:id"
                                    element={<MantineInferencer />}
                                />
                                <Route
                                    path="edit/:id"
                                    element={<MantineInferencer />}
                                />
                                <Route
                                    path="create"
                                    element={<MantineInferencer />}
                                />
                            </Route>

                            <Route path="*" element={<ErrorComponent />} />
                        </Route>
                    </Routes>
                    <UnsavedChangesNotifier />
                </Refine>
            </MantineProvider>
        </BrowserRouter>
    );
};

export default App;
```

</UIConditional>

<UIConditional is="mui">

```tsx title="src/App.tsx"
import { Refine } from "@refinedev/core";
import { MuiInferencer } from "@refinedev/inferencer/mui";
import { ErrorComponent, ThemedLayoutV2, RefineThemes } from "@refinedev/mui";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import routerBindings, {
    NavigateToResource,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <ThemeProvider theme={RefineThemes.Blue}>
                <CssBaseline />
                <GlobalStyles
                    styles={{ html: { WebkitFontSmoothing: "auto" } }}
                />
                <Refine
                    dataProvider={dataProvider(
                        "https://api.fake-rest.refine.dev",
                    )}
                    routerProvider={routerBindings}
                    //highlight-start
                    resources={[
                        {
                            name: "blog_posts",
                            list: "/blog-posts",
                            show: "/blog-posts/show/:id",
                            create: "/blog-posts/create",
                            edit: "/blog-posts/edit/:id",
                        },
                    ]}
                    //highlight-end
                    options={{
                        syncWithLocation: true,
                        warnWhenUnsavedChanges: true,
                    }}
                >
                    <Routes>
                        <Route
                            element={
                                <ThemedLayoutV2>
                                    <Outlet />
                                </ThemedLayoutV2>
                            }
                        >
                            <Route
                                index
                                element={
                                    <NavigateToResource resource="blog_posts" />
                                }
                            />
                            <Route path="blog-posts">
                                <Route index element={<MuiInferencer />} />
                                <Route
                                    path="show/:id"
                                    element={<MuiInferencer />}
                                />
                                <Route
                                    path="edit/:id"
                                    element={<MuiInferencer />}
                                />
                                <Route
                                    path="create"
                                    element={<MuiInferencer />}
                                />
                            </Route>

                            <Route path="*" element={<ErrorComponent />} />
                        </Route>
                    </Routes>
                    <UnsavedChangesNotifier />
                </Refine>
            </ThemeProvider>
        </BrowserRouter>
    );
};

export default App;
```

</UIConditional>

To have more information about router usage, refer to [React Router Documentation](https://reactrouter.com/en/main/components/routes).

## Defining Actions for a Resource

A resource can perform actions such as `list`, `show`, `edit`, `create`, `delete` and `clone`. These actions except `delete`, are defined in the properties of the resource object.

The simplest way to define the actions is to provide the path of the page. For example, if we want to define the `list` action of the `blog_posts` resource, we can do it as follows:

```tsx
{
    name: "blog_posts",
    list: "/blog-posts",
}
```

Paths can include parameters with a convention similar `:paramName`. For example, if we want to define the `show` action of the `blog_posts` resource, we can do it as follows:

```tsx
{
    name: "blog_posts",
    show: "/blog-posts/show/:id",
}
```

Additional parameters can also be defined in the path. For example, if we want to define the `edit` action of the `blog_posts` resource, we can do it as follows:

```tsx
{
    name: "blog_posts",
    edit: "/blog-posts/edit/:id/:version",
}
```

These additional parameters except for the `id` parameter, can be passed to the components or hooks using `meta` properties. Also the existing parameters in the URL will be used by default when handling the navigation. So, let's say we have a `create` action for the `blog_posts` resource as `/:userId/blog-posts/create` and the user is currently on the `/:userId/blog-posts` page. When the user clicks on the `create` button, the user will be redirected to `/:userId/blog-posts/create` page. The `userId` parameter will be inferred from the current path unless it is explicitly defined in the `meta` property.

:::tip

Features related to routing such as the inference of the resource by the route, the generation of the routes (optional) and etc. require the use of the `routerProvider` prop of the `<Refine/>` component.

[Refer to the documentation for more information &#8594](/docs/api-reference/core/components/refine-config/#routerprovider)

When using the **refine** hooks and components, if you provide a `routerProvider` the `resource` will be inferred from the current route and the inferred resource will be passed as `resource` to `dataProvider` functions, hooks and components by default.

:::

## Learn More

Learn more about [resources](/docs/api-reference/core/components/refine-config/#resources) in the API reference.

<Checklist>

<ChecklistItem id="understanding-resource">
I understood what a resource is and how to add a resource to the app.
</ChecklistItem>

</Checklist>
