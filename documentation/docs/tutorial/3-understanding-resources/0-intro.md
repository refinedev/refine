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

In [Unit 2.4](/docs/tutorial/getting-started/antd/generate-crud-pages/), we defined a resource to create our CRUD pages with the Inferencer component but did not explain how it works. We will take care of that in this unit and thoroughly explain the resources prop of the `<Refine/>` component using mock components.

</UIConditional>

<UIConditional is="chakra-ui">

In [Unit 2.4](/docs/tutorial/getting-started/chakra-ui/generate-crud-pages/), we defined a resource to create our CRUD pages with the Inferencer component but did not explain how it works. We will take care of that in this unit and thoroughly explain the resources prop of the `<Refine/>` component using mock components.

</UIConditional>

<UIConditional is="headless">

In [Unit 2.4](/docs/tutorial/getting-started/headless/generate-crud-pages/), we defined a resource to create our CRUD pages with the Inferencer component but did not explain how it works. We will take care of that in this unit and thoroughly explain the resources prop of the `<Refine/>` component using mock components.

</UIConditional>

<UIConditional is="mantine">

In [Unit 2.4](/docs/tutorial/getting-started/mantine/generate-crud-pages/), we defined a resource to create our CRUD pages with the Inferencer component but did not explain how it works. We will take care of that in this unit and thoroughly explain the resources prop of the `<Refine/>` component using mock components.

</UIConditional>

<UIConditional is="mui">

In [Unit 2.4](/docs/tutorial/getting-started/mui/generate-crud-pages/), we defined a resource to create our CRUD pages with the Inferencer component but did not explain how it works. We will take care of that in this unit and thoroughly explain the resources prop of the `<Refine/>` component using mock components.

</UIConditional>

:::

Before we start, we need to understand what the `<Refine>` component is.

The `<Refine>` component serves as the starting point for **refine**. It is a wrapper component that offers context to the **refine** components and hooks and is used to configure the top-level settings of the application.

Though `dataProvider` is the only necessary prop for initializing the app, there are other props such as `resources`, `routerProvider`, `authProvider`, `i18nProvider`, etc. Each of these props enables the configuration of various aspects of the application, such as data management, routing, authentication, localization, layout and more.

> For more information, refer to the [`<Refine>` Documentation&#8594](/docs/api-reference/core/components/refine-config/)

## What is resource?

In the context of a CRUD application, a resource typically refers to a data entity that can be created, read, updated, or deleted. For example, a resource could be a user account, a blog post, a blog post in an online store, or any other piece of data that can be managed by the CRUD app.

To add a `resource` to our app, we need to use the `resources` prop of the `<Refine>` component. This prop accepts an array of objects, each representing a resource. These objects may contain properties to define the resource’s name, actions' routes, and additional metadata such as label, icon, audit log settings, and sider menu nesting etc.

:::note

The action paths we define in resources help **refine** render menu items, breadcrumbs, and handle form redirections, among other things. Which means that **refine** coexists with your routes and complements them without imposing any limitations.

:::

### Resources and routes

Path definitions in the resource configuration help **refine** recognize the available actions for the resource at that particular path. This allows **refine** to automatically identify the resource based on the current path without requiring users to manually specify the resource prop in their hooks and components.

Thanks to its flexibility, **refine** can be seamlessly integrated into any existing React application without imposing any limitations on users. It can also be attached to routes where it’s needed without interfering with your routing logic. This makes it possible to use **refine** with enterprise-grade applications that have complex requirements such as nested routes and multi-tenancy.

:::caution
It’s important to note that route management will be handled by your preferred framework (React Router, Next.js, Remix) which is what makes it possible to use **refine** with any React (Web, Electron, React Native etc.) application freely.
:::
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
import { ErrorComponent, ThemedLayoutV2, RefineThemes } from "@refinedev/antd";
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
    ThemedLayoutV2,
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

> For more information about router usage, refer to the [React Router Documentation](https://reactrouter.com/en/main/components/routes).

## Defining actions for a resource

A resource can perform actions such as `list`, `show`, `edit`, `create`, `delete` and `clone`. All of these actions, except `delete`, are defined in the properties of the resource object.

The simplest way to define the actions is to provide the path of the page. For example, if we want to define the `list` action of the `blog_posts` resource, we can do it like this:

```tsx
{
    name: "blog_posts",
    list: "/blog-posts",
}
```

Paths can include parameters with a convention similar `:paramName`. For example, if we want to define the `show` action of the `blog_posts` resource:

```tsx
{
    name: "blog_posts",
    show: "/blog-posts/show/:id",
}
```

Additional parameters can also be defined in the path. For example, if we want to define the `edit` action of the `blog_posts` resource:

```tsx
{
    name: "blog_posts",
    edit: "/blog-posts/edit/:id/:version",
}
```

These additional parameters, except for the `id` parameter, can be passed to the components or hooks using `meta` properties. The existing parameters in the URL will be used by default when handling the navigation.

For example, let’s say that we have a `create` action for the `blog_posts` resource as `/:userId/blog-posts/create` and the user is currently on the `/:userID/blog-posts` page.

When the user clicks on the `create` button, they will be redirected to `/:userId/blog-posts/create` because the `userId` parameter has been inferred from the current path.

:::tip

Features related to routing, such as the inference of the resource by the route, the generation of the routes (optional), etc., require the use of the `routerProvider` prop of the `<Refine/>` component.

When using the **refine** hooks and components, if you provide a `routerProvider` the `resource` will be inferred from the current route and the inferred resource will be passed as `resource` to `dataProvider` functions, hooks and components by default.

For more information, refer to the [`<routerProvider` part of the `<Refine>` Documentation&#8594](/docs/api-reference/core/components/refine-config/#routerprovider)

:::

> To learn more about `resource`, refer to [its section in the API reference documentation](/docs/api-reference/core/components/refine-config/#resources)

<Checklist>

<ChecklistItem id="understanding-resource">
I understood what a resource is and how to add it to my app.
</ChecklistItem>

</Checklist>
