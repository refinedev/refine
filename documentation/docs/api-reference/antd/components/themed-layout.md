---
id: antd-themed-layout
title: <ThemedLayout>
sidebar_label: <ThemedLayout>
description: <ThemedLayoutV2> component from refine, defines the overall structure and layout of a web page.
swizzle: true
source: packages/antd/src/components/themedLayout/index.tsx
---

```tsx live shared
const authProvider = {
    login: async () => ({
        success: true,
        redirectTo: "/",
    }),
    logout: async () => ({
        success: true,
        redirectTo: "/login",
    }),
    onError: async (error) => {
        console.error(error);
        return { error };
    },
    check: async () => ({
        authenticated: true,
    }),
    getIdentity: async () => ({
        id: 1,
        name: "Jane Doe",
        avatar: "https://unsplash.com/photos/IWLOvomUmWU/download?force=true&w=640",
    }),
};
```

`<ThemedLayoutV2>` component that uses the [`<Layout>`][antd-layout] and [`<Sider>`][antd-sider] components from the Antd Design library to define the layout and structure of a web page. It includes customizable components for the header, sidebar, title, footer, and off-layout area, which can be replaced or customized as needed.

By using `<ThemedLayoutV2>`, developers can create a consistent look and feel across multiple pages or sections of a website, while also improving code maintainability and reusability. The customizable sections of `<ThemedLayoutV2>` include:

-   [`<ThemedHeaderV2>`][themed-header]: displayed at the top of the page and can display the user's name and avatar.
-   [`<ThemedSiderV2>`][themed-sider]: displayed on the left side of the page and can display menu items.
-   [`<ThemedTitleV2>`][themed-title]: displayed at the top of [`<ThemedSiderV2>`][themed-sider] and includes an icon and text.
-   `<Footer>`: displayed at the bottom of the page.
-   `<OffLayoutArea>`: rendered outside of the main layout component and can be placed anywhere on the page while still being part of the overall layout.

> `Footer` and `OffLayoutArea` do not have any default components.

## Usage

We'll show what default `<ThemedLayoutV2>` looks like in the following example.

```tsx live previewHeight=600px hideCode url=http://localhost:3000/samples
setInitialRoutes(["/samples"]);

// visible-block-start

import { Refine } from "@refinedev/core";
// highlight-next-line
import { ThemedLayoutV2, RefineThemes } from "@refinedev/antd";
import { ConfigProvider } from "antd";
import { AntdInferencer } from "@refinedev/inferencer/antd";

import routerProvider from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import dataProvider from "@refinedev/simple-rest";

import { authProvider } from "./authProvider";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <ConfigProvider theme={RefineThemes.Blue}>
                <Refine
                    routerProvider={routerProvider}
                    dataProvider={dataProvider(API_URL)}
                    authProvider={authProvider}
                    resources={[
                        {
                            name: "samples",
                            list: "/samples",
                        },
                    ]}
                >
                    <Routes>
                        <Route
                            element={
                                // highlight-next-line
                                <ThemedLayoutV2>
                                    <Outlet />
                                </ThemedLayoutV2>
                            }
                        >
                            <Route
                                path="/samples"
                                element={<AntdInferencer />}
                            />
                        </Route>
                    </Routes>
                </Refine>
            </ConfigProvider>
        </BrowserRouter>
    );
};

// visible-block-end

render(<App />);
```

:::note

`<ThemedLayoutV2>` is designed to be responsive. In the live-preview, it appears in tablet mode and uses [`<Drawer>`][antd-drawer]. On larger screens, it will use [`<Sider>`][antd-sider].

:::

:::info

Example of above showing how to use `<ThemedLayoutV2>` with [`React Router v6`](/docs/packages/documentation/routers/react-router-v6/). You can see these examples for other routers:

-   [React Router v6](https://github.com/refinedev/refine/blob/next/examples/auth-antd/src/App.tsx#L186)
-   [Next.js](https://github.com/refinedev/refine/blob/next/examples/with-nextjs-auth/pages/_app.tsx#L31)
-   [Remix](https://github.com/refinedev/refine/blob/next/examples/with-remix-auth/app/routes/_protected.tsx)

:::

## Props

### `Sider`

In `<ThemedLayoutV2>`, the sidebar section is rendered using the [`<ThemedSider>`][themed-sider] component by default. This component is specifically designed to generate menu items based on the resources defined in [`<Refine>`][refine-component] components, using the [`useMenu`][use-menu] hook. However, if desired, it's possible to replace the default [`<ThemedSider>`][themed-sider] component by passing a custom component to the `Sider` prop.

```tsx
import { Refine } from "@refinedev/core";
import { ThemedLayoutV2 } from "@refinedev/antd";

import { CustomSider } from "./CustomSider";

const App: React.FC = () => {
    return (
        <Refine
        // ...
        >
            <ThemedLayoutV2
                // highlight-next-line
                Sider={() => <CustomSider />}
            >
                {/* ... */}
            </ThemedLayoutV2>
        </Refine>
    );
};
```

Also, you can customize the default [`<ThemedSider>`][themed-sider] component either by using its props or with the [swizzle](#customizing-with-swizzle) feature.

Here is an example of how to customize the default [`<ThemedSider>`][themed-sider] component using the `render` and `Title` prop:

```tsx
import { Refine } from "@refinedev/core";
import { ThemedLayoutV2, ThemedSider } from "@refinedev/antd";

import { CustomTitle } from "./CustomTitle";

const App: React.FC = () => {
    return (
        <Refine
        // ...
        >
            <ThemedLayoutV2
                // highlight-start
                Sider={() => (
                    <ThemedSider
                        Title={({ collapsed }) => (
                            <CustomTitle collapsed={collapsed} />
                        )}
                        render={({ items, logout, collapsed }) => {
                            return (
                                <>
                                    <div>My Custom Element</div>
                                    {items}
                                    {logout}
                                </>
                            );
                        }}
                    />
                )}
                // highlight-end
            >
                {/* ... */}
            </ThemedLayoutV2>
        </Refine>
    );
};
```

#### `Sider Props`

| Prop              | Type                                          | Description                                                                     |
| ----------------- | --------------------------------------------- | ------------------------------------------------------------------------------- |
| [`Title`](#title) | `React.FC`                                    | Component to render at the top                                                  |
| `render`          | [`SiderRenderFunction`](#siderrenderfunction) | Function to render the menu items and other elements inside the `<ThemedSider>` |
| `meta`            | `Record<string,any>`                          | Meta data to use when creating routes for the menu items                        |

```tsx
type SiderRenderFunction = (props: {
    items: JSX.Element[];
    logout: React.ReactNode;
    dashboard: React.ReactNode;
    collapsed: boolean;
}) => React.ReactNode;
```

### `Header`

In `<ThemedLayoutV2>`, the header section is rendered using the [`<ThemedHeader>`][themed-header] component by default. It uses [`useGetIdentity`](/docs/api-reference/core/hooks/auth/useGetIdentity/) hook to display the user's name and avatar on the right side of the header. However, if desired, it's possible to replace the default [`<ThemedHeader>`][themed-header] component by passing a custom component to the `Header` prop.

Here is an example of how to replace the default [`<ThemedHeader>`][themed-header] component:

```tsx
import { Refine } from "@refinedev/core";
import { ThemedLayoutV2 } from "@refinedev/antd";

// highlight-next-line
import { CustomHeader } from "./CustomHeader";

const App: React.FC = () => {
    return (
        <Refine
        // ...
        >
            <ThemedLayoutV2
                // highlight-next-line
                Header={() => <CustomHeader />}
            >
                {/* ... */}
            </ThemedLayoutV2>
        </Refine>
    );
};
```

### `Title`

In `<ThemedLayoutV2>`, the title section is rendered using the [`<ThemedTitle>`][themed-title] component by default. However, if desired, it's possible to replace the default [`<ThemedTitle>`][themed-title] component by passing a custom component to the `Title` prop.

Here is an example of how to replace the default [`<ThemedTitle>`][themed-title] component:

```tsx
import { Refine } from "@refinedev/core";
// highlight-next-line
import { ThemedLayoutV2, ThemedTitle } from "@refinedev/antd";

// highlight-next-line
import { MyLargeIcon, MySmallIcon } from "./MyIcon";

const App: React.FC = () => {
    return (
        <Refine
        // ...
        >
            <ThemedLayoutV2
                // highlight-start
                Title={({ collapsed }) => (
                    <ThemedTitle
                        // collapsed is a boolean value that indicates whether the <Sidebar> is collapsed or not
                        collapsed={collapsed}
                        icon={collapsed ? <MySmallIcon /> : <MyLargeIcon />}
                        text="My Project"
                    />
                )}
                // highlight-end
            >
                {/* ... */}
            </ThemedLayoutV2>
        </Refine>
    );
};
```

### `Footer`

The footer section of the layout is displayed at the bottom of the page. **refine** doesn't provide a default footer component. However, you can pass a custom component to the `Footer` prop to display a footer section.

Here is an example of how to display a footer section:

```tsx live previewHeight=600px hideCode url=http://localhost:3000/samples
setInitialRoutes(["/samples"]);

// visible-block-start

import { Refine } from "@refinedev/core";
// highlight-next-line
import { ThemedLayoutV2, RefineThemes } from "@refinedev/antd";
import { ConfigProvider, Layout } from "antd";
import { AntdInferencer } from "@refinedev/inferencer/antd";

import routerProvider from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import dataProvider from "@refinedev/simple-rest";

import { authProvider } from "./authProvider";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <ConfigProvider theme={RefineThemes.Blue}>
                <Refine
                    routerProvider={routerProvider}
                    dataProvider={dataProvider(API_URL)}
                    authProvider={authProvider}
                    resources={[
                        {
                            name: "samples",
                            list: "/samples",
                        },
                    ]}
                >
                    <Routes>
                        <Route
                            element={
                                // highlight-next-line
                                <ThemedLayoutV2
                                    Footer={() => (
                                        <Layout.Footer
                                            style={{
                                                textAlign: "center",
                                                color: "#fff",
                                                backgroundColor: "#7dbcea",
                                            }}
                                        >
                                            My Custom Footer
                                        </Layout.Footer>
                                    )}
                                >
                                    <Outlet />
                                </ThemedLayoutV2>
                            }
                        >
                            <Route path="samples">
                                <Route index element={<AntdInferencer />} />
                            </Route>
                        </Route>
                    </Routes>
                </Refine>
            </ConfigProvider>
        </BrowserRouter>
    );
};

// visible-block-end

render(<App />);
```

```tsx
import { Refine } from "@refinedev/core";
import { ThemedLayoutV2 } from "@refinedev/antd";
import { Layout } from "antd";

const App: React.FC = () => {
    return (
        <Refine
        // ...
        >
            <ThemedLayoutV2
                // highlight-next-line
                Footer={() => (
                    <Layout.Footer
                        style={{
                            textAlign: "center",
                            color: "#fff",
                            backgroundColor: "#7dbcea",
                        }}
                    >
                        My Custom Footer
                    </Layout.Footer>
                )}
            >
                {/* ... */}
            </ThemedLayoutV2>
        </Refine>
    );
};
```

### `OffLayoutArea`

Used to component is rendered outside of the main layout component, allowing it to be placed anywhere on the page while still being part of the overall layout .**refine** doesn't provide a default off-layout area component. However, you can pass a custom component to the `OffLayoutArea` prop to display a custom off-layout area.

Here is an example of how to display a custom off-layout area:

```tsx live previewHeight=600px hideCode url=http://localhost:3000/samples
setInitialRoutes(["/samples"]);

// visible-block-start

import { Refine } from "@refinedev/core";
// highlight-next-line
import { ThemedLayoutV2, RefineThemes } from "@refinedev/antd";
import { ConfigProvider, Button } from "antd";
import { AntdInferencer } from "@refinedev/inferencer/antd";

import routerProvider from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import dataProvider from "@refinedev/simple-rest";

import { authProvider } from "./authProvider";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <ConfigProvider theme={RefineThemes.Blue}>
                <Refine
                    routerProvider={routerProvider}
                    dataProvider={dataProvider(API_URL)}
                    authProvider={authProvider}
                    resources={[
                        {
                            name: "samples",
                            list: "/samples",
                        },
                    ]}
                >
                    <Routes>
                        <Route
                            element={
                                // highlight-next-line
                                <ThemedLayoutV2
                                    OffLayoutArea={() => (
                                        <Button
                                            type="primary"
                                            size="small"
                                            onClick={() =>
                                                alert("Off layout are clicked")
                                            }
                                            style={{
                                                position: "fixed",
                                                left: "8px",
                                                bottom: "8px",
                                                zIndex: 1000,
                                            }}
                                        >
                                            Send us Feedback 👋
                                        </Button>
                                    )}
                                >
                                    <Outlet />
                                </ThemedLayoutV2>
                            }
                        >
                            <Route
                                path="/samples"
                                element={<AntdInferencer />}
                            />
                        </Route>
                    </Routes>
                </Refine>
            </ConfigProvider>
        </BrowserRouter>
    );
};

// visible-block-end

render(<App />);
```

```tsx
import { Refine } from "@refinedev/core";
import { ThemedLayoutV2 } from "@refinedev/antd";
import { Button } from "antd";

const App: React.FC = () => {
    return (
        <Refine
        // ...
        >
            <ThemedLayoutV2
                // highlight-start
                OffLayoutArea={() => (
                    <Button
                        type="primary"
                        size="small"
                        onClick={() => alert("Off layout are clicked")}
                        style={{
                            position: "fixed",
                            left: "8px",
                            bottom: "8px",
                            zIndex: 1000,
                        }}
                    >
                        Send us Feedback 👋
                    </Button>
                )}
                // highlight-end
            >
                {/* ... */}
            </ThemedLayoutV2>
        </Refine>
    );
};
```

## Customizing with swizzle

> 🚨 This feature is available with `@refine/cli`. Please refer to [CLI documentation](/docs/packages/documentation/cli/#swizzle) for more information.

`<ThemedLayoutV2>` component source code can be ejecting using the `swizzle` command. This will create a copy of the component in your project's `src` directory, allowing you to customize as your needs.

### Usage

Let's create a new component by swizzling the `<ThemedLayoutV2>` components.

```bash
> npm run refine swizzle

? Which package do you want to swizzle? (Use arrow keys or type to search)

Data Provider
 ◯ @refinedev/simple-rest
UI Framework
 ◉ @refinedev/antd
```

First, you need to select the package you want to swizzle. In this example, we will swizzle the `@refinedev/antd` package.

:::info

**refine** CLI will only show the packages that are installed in your project.

:::

```bash
? Which component do you want to swizzle?

 ◯ TagField
 ◯ TextField
 ◯ UrlField
Other
 ◯ Breadcrumb
❯◉ ThemedLayoutV2
Pages
 ◯ ErrorPage
 ◯ AuthPage
(Move up and down to reveal more choices)
```

Then, you need to select the component you want to swizzle. In this example, we will swizzle the `ThemedLayoutV2` component.

```bash
Successfully swizzled Themed Layout
Files created:
 - src/components/themedLayout/sider.tsx
 - src/components/themedLayout/header.tsx
 - src/components/themedLayout/title.tsx
 - src/components/themedLayout/index.tsx

Warning:
If you want to change the default layout;
You should pass layout related components to the <ThemedLayoutV2/> component's props.

    ╭ App.tsx ───────────────────────────────────────────────────────────────────────────────────────╮
    │                                                                                                │
    │   import { ThemedLayoutV2 } from "components/themedLayout";                                    │
    │   import { ThemedHeaderV2 } from "components/themedLayout/header";                             │
    │   import { ThemedSiderV2 } from "components/themedLayout/sider";                               │
    │   import { ThemedTitleV2 } from "components/themedLayout/title";                               │
    │                                                                                                │
    │   const App = () => {                                                                          │
    │       return (                                                                                 │
    │           <Refine                                                                              │
    │               /* ... */                                                                        │
    │           >                                                                                    │
    │               <ThemedLayoutV2                                                                  │
    │                    Header={ThemedHeaderV2}                                                     │
    │                    Sider={ThemedSiderV2}                                                       │
    │                    Title={ThemedTitleV2}                                                       │
    │                />                                                                              │
    │                   /* ... */                                                                    │
    │               </ThemedLayoutV2>                                                                │
    │           </Refine>                                                                            │
    │       );                                                                                       │
    │   }                                                                                            │
    │                                                                                                │
    ╰────────────────────────────────────────────────────────────────────────────────────────────────╯
```

Finally, the swizzle command will create a new folder in the `src/components/layout` directory and generate the layout components of the `@refinedev/antd` package in it.

You can use these components in your project as you wish.

```tsx
import { Refine } from "@refinedev/core";
import { ThemedLayoutV2 } from "components/themedLayout";
import { ThemedHeader } from "components/themedLayout/header";
import { ThemedSider } from "components/themedLayout/sider";
import { ThemedTitle } from "components/themedLayout/title";

const App = () => {
    return (
        <Refine
        /* ... */
        >
            <ThemedLayoutV2
                Header={ThemedHeader}
                Sider={ThemedSider}
                Title={ThemedTitle}
            >
                /* ... */
            </ThemedLayoutV2>
        </Refine>
    );
};
```

:::info

**refine** CLI determines the path to create a new folder according to the framework you are using. For example, if you are using the `remix`, the path will be `app/components/layout`.

:::

:::caution

If there is already a file with the same name in the directory, the swizzle command will not overwrite it.

:::

## Migrate ThemedLayout to ThemedLayoutV2
Fixed some UI problems with `ThemedLayoutV2`. If you are still using `ThemedLayout` you can update it by following these steps.
Only if you are using `ThemedLayout`. If you are not customizing the `Header` component, an update like the one below will suffice.

```diff title="src/App.tsx"
-import { ThemedLayout } from "@refinedev/antd";
+import { ThemedLayoutV2 } from "@refinedev/antd";
...
-<ThemedLayout>
+<ThemedLayoutV2>
    <Outlet />
-</ThemedLayout>
+</ThemedLayoutV2>
...
```

## collapse/uncollapse `Sider` component with `useSiderVisible` hook
The `useSiderVisible` hook is that is used to collapse/uncollapse the `Sider` component. You can do this anywhere you want using the `useSiderVisible` hook. Below you can see an example put on the dashboard page.

```tsx live previewHeight=300px hideCode url=http://localhost:3000/
setInitialRoutes(["/"]);

// visible-block-start

import { Refine } from "@refinedev/core";
// highlight-next-line
import { ThemedLayoutV2, RefineThemes, useSiderVisible } from "@refinedev/antd";
import { ConfigProvider, Button, Space } from "antd";
import { AntdInferencer } from "@refinedev/inferencer/antd";

import routerProvider from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import dataProvider from "@refinedev/simple-rest";

import { authProvider } from "./authProvider";

const API_URL = "https://api.fake-rest.refine.dev";

// highlight-start
const DashboardPage = () => {
    const {
        siderVisible,
        setSiderVisible,
        drawerSiderVisible,
        setDrawerSiderVisible,
    } = useSiderVisible();

    return (
        <Space style={{ paddingTop: 30 }}>
            <Button type="primary" onClick={() => setSiderVisible?.(!siderVisible)}>
                toggle visible for mobile ({siderVisible ? "open" : "close"})
            </Button>
            <Button type="primary"
                onClick={() => setDrawerSiderVisible?.(!drawerSiderVisible)}
            >
                toggle drawer ({drawerSiderVisible ? "open" : "close"})
            </Button>
            
        </Space>
    );
};
// highlight-end

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <ConfigProvider theme={RefineThemes.Blue}>
                <Refine
                    routerProvider={routerProvider}
                    dataProvider={dataProvider(API_URL)}
                    authProvider={authProvider}
                    resources={[
                        // highlight-start
                        {
                            name: "dashboard",
                            list: "/",
                        },
                        // highlight-end
                        {
                            name: "samples",
                            list: "/samples",
                        },
                    ]}
                >
                    <Routes>
                        <Route
                            element={
                                <ThemedLayoutV2>
                                    <Outlet />
                                </ThemedLayoutV2>
                            }
                        >
                            {/* highlight-next-line */}
                            <Route path="/" element={<DashboardPage />} />
                            <Route path="/samples" element={<AntdInferencer />} />
                        </Route>
                    </Routes>
                </Refine>
            </ConfigProvider>
        </BrowserRouter>
    );
};

// visible-block-end

render(<App />);
```

[themed-sider]: https://github.com/refinedev/refine/blob/next/packages/antd/src/components/themedLayout/sider/index.tsx
[themed-header]: https://github.com/refinedev/refine/blob/next/packages/antd/src/components/themedLayout/header/index.tsx
[themed-title]: https://github.com/refinedev/refine/blob/next/packages/antd/src/components/themedLayout/title/index.tsx
[use-menu]: /docs/api-reference/core/hooks/ui/useMenu/
[refine-component]: /docs/api-reference/core/components/refine-config/
[antd-drawer]: https://ant.design/components/drawer
[antd-sider]: https://ant.design/components/layout#layoutsider
[antd-layout]: https://ant.design/components/layout
