---
id: index
title: Resources
tutorial:
    order: 0
    prev: false
    next: tutorial/adding-crud-pages/{preferredUI}/index
---

:::info Remember

<UIConditional is="mui">

In [Unit 2.4](/docs/tutorial/getting-started/mui/generate-crud-pages/), we have defined a resource to create CRUD pages with the Inferencer component. However, we have not explained how it works. In this unit, we explain the `resources` prop of the `<Refine/>` component using mock components.

</UIConditional>

:::

## What is a `resource`?

In a frontend CRUD application, a resource typically refers to a data entity that can be created, read, updated, or deleted. In MVC applications, it represents a model in the Model layer. For example, a resource could be an user account, a blog post, an saleable item in an online store, or any other piece of data that is stored in a database server and accessed via RESTful API endpoints.

In **refine**, we use the `resources` prop of `<Refine />` component to add a `resource` to our app. This prop accepts an array of resource objects where each object represents a resource. The resource object contains properties to define the name of the resource, RESTful paths of the actions and additional metadata such as label, icon, audit log settings, and sider menu nesting etc.

:::note

The action paths we define in resources helps **refine** to render menu items, breadcrumbs, and handle form redirections, among other things. Each of these features are highly customizable and come with sensible defaults. This allows **refine** to co-exist with existing routes, complements them and doesn't impose any navigatory limitation.

:::

### Note on `resources` and routes

Path definitions for a resource helps **refine** to recognize its available actions that particular path. Basing on the current path the browser is at, **refine** refers to the path definitions configured in the `resources` object to automatically identify the valid resource and action, without requiring us to specify the resource prop in their hooks and components. It also goes ahead and invokes the relevant data hook.

It's important to note that **routing is managed directly by our preferred framework** (React Router, Next.js, Remix). This makes **refine** to be used constraint-freely with any React (Web, Electron, React Native etc.) application.

This flexibility allows seamless integration of **refine** into existing React applications, especially without any development limitation. It works side by side with the existing app's routing logic without any conflict. This makes it convenient to use **refine** in enterprise-grade applications with complex requirements such as nested routes and multi-tenancy.

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
import { ErrorComponent, ThemedLayout, RefineThemes } from "@refinedev/mantine";
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
import { ErrorComponent, ThemedLayout, RefineThemes } from "@refinedev/mui";
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

To get more information about router usage, refer to [React Router Documentation](https://reactrouter.com/en/main/components/routes).


## Defining Actions for a Resource

Our app can perform actions such as `list`, `show`, `edit`, `create`, `delete` and `clone` on a resource. All valid actions, except `delete`, must be defined in the properties of a `resource` object inside the `resources` array.

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

Additional parameters can also be defined in a path. For example, if we want to specify the version for the `edit` action of the `blog_posts` resource, we can do it as follows:

```tsx
{
    name: "blog_posts",
    edit: "/blog-posts/edit/:id/:version",
}
```

This additional parameter, can be passed to the components or hooks using `meta` property, which will then be used in the API call.

:::tip

Features related to routing such as inferencing the resource from a route path, and generation of routes (optional) require us to use the `routerProvider` prop of the `<Refine />` component.

[Refer to the documentation for more information &#8594](/docs/api-reference/core/components/refine-config/#routerprovider)

If you provide a `routerProvider`, by default, a **refine** hook or component infers its target `resource` from the current route, and passes it as the `resource` to the argument of `dataProvider` functions, hooks and components.

:::

## Learn More

Learn more about [resources](/docs/api-reference/core/components/refine-config/#resources) in the API reference.

<Checklist>

<ChecklistItem id="understanding-resource">
I understood what a resource is and how to add a resource to the app.
</ChecklistItem>

</Checklist>
