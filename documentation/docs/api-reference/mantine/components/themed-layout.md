---
id: mantine-themed-layout
title: <ThemedLayout>
sidebar_label: <ThemedLayout>
description: <ThemedLayout> component from refine, defines the overall structure and layout of a web page.
swizzle: true
source: packages/mantine/src/components/themedLayout/index.tsx
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

`<ThemedLayout>` component that uses the [`<Drawer>`][mantine-drawer] from Mantine library to define the layout and structure of a web page. It includes customizable components for the header, sidebar, title, footer, and off-layout area, which can be replaced or customized as needed.

By using `<ThemedLayout>`, developers can create a consistent look and feel across multiple pages or sections of a website, while also improving code maintainability and reusability. The customizable sections of `<ThemedLayout>` include:

-   [`<ThemedHeader>`][themed-header]: displayed at the top of the page and can display the user's name and avatar.
-   [`<ThemedSider>`][themed-sider]: displayed on the left side of the page and can display menu items.
-   [`<ThemedTitle>`][themed-title]: displayed at the top of [`<ThemedSider>`][themed-sider] and includes an icon and text.
-   `<Footer>`: displayed at the bottom of the page.
-   `<OffLayoutArea>`: rendered outside of the main layout component and can be placed anywhere on the page while still being part of the overall layout.

> `Footer` and `OffLayoutArea` do not have any default components.

## Usage

```tsx live hideCode previewHeight=600px url=http://localhost:3000/samples
setInitialRoutes(["/samples"]);

// visible-block-start
import { Refine } from "@refinedev/core";

// highlight-next-line
import { MantineInferencer } from "@refinedev/inferencer/mantine";
import { ThemedLayout, RefineThemes } from "@refinedev/mantine";
import { MantineProvider, Global } from "@mantine/core";

import routerProvider from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { authProvider } from "./authProvider";

import dataProvider from "@refinedev/simple-rest";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <MantineProvider
            theme={RefineThemes.Blue}
            withNormalizeCSS
            withGlobalStyles
        >
            <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
            <BrowserRouter>
                <Refine
                    authProvider={authProvider}
                    routerProvider={routerProvider}
                    dataProvider={dataProvider(API_URL)}
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
                                <ThemedLayout>
                                    <Outlet />
                                </ThemedLayout>
                            }
                        >
                            {/* highlight-next-line */}
                            <Route
                                path="/samples"
                                element={<MantineInferencer />}
                            />
                        </Route>
                    </Routes>
                </Refine>
            </BrowserRouter>
        </MantineProvider>
    );
};

// visible-block-end

render(<App />);
```

:::note

`<ThemedLayout>` is designed to be responsive. In the live-preview, it appears in tablet mode and toggle [`<Drawer>`][mantine-drawer]. On larger screens, it will use fixed open [`<Drawer>`][mantine-drawer].

:::

:::info

Example of above showing how to use `<ThemedLayout>` with [`React Router v6`](/docs/packages/documentation/routers/react-router-v6/). You can see these examples for other routers:

-   [React Router v6](https://github.com/refinedev/refine/blob/next/examples/auth-mantine/src/App.tsx#L180)
-   [Next.js](https://github.com/refinedev/refine/blob/next/examples/with-nextjs-auth/pages/_app.tsx#L31)
-   [Remix](https://github.com/refinedev/refine/blob/next/examples/with-remix-auth/app/routes/_protected.tsx)

> ⚠️ Next.js and Remix examples are using `<ThemedLayout`> from `@refinedev/antd` package. But you can use `<ThemedLayout>` from `@refinedev/mantine` as same.

:::

## Props

### `Sider`

In `<ThemedLayout>`, the sidebar section is rendered using the [`<ThemedSider>`][themed-sider] component by default. This component is specifically designed to generate menu items based on the resources defined in [`<Refine>`][refine-component] components, using the [`useMenu`][use-menu] hook. However, if desired, it's possible to replace the default [`<ThemedSider>`][themed-sider] component by passing a custom component to the `Sider` prop.

```tsx
import { Refine } from "@refinedev/core";
import { ThemedLayout } from "@refinedev/mantine";

import { CustomSider } from "./CustomSider";

const App: React.FC = () => {
    return (
        <Refine
        // ...
        >
            <ThemedLayout
                // highlight-next-line
                Sider={() => <CustomSider />}
            >
                {/* ... */}
            </ThemedLayout>
        </Refine>
    );
};
```

Also, you can customize the default [`<ThemedSider>`][themed-sider] component either by using its props or with the [swizzle](#customizing-with-swizzle) feature.

Here is an example of how to customize the default [`<ThemedSider>`][themed-sider] component using the `render` and `Title` prop:

```tsx
import { Refine } from "@refinedev/core";
import { ThemedLayout, ThemedSider } from "@refinedev/mantine";

import { CustomTitle } from "./CustomTitle";

const App: React.FC = () => {
    return (
        <Refine
        // ...
        >
            <ThemedLayout
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
            </ThemedLayout>
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

In `<ThemedLayout>`, the header section is rendered using the [`<ThemedHeader>`][themed-header] component by default. It uses [`useGetIdentity`](/docs/api-reference/core/hooks/auth/useGetIdentity/) hook to display the user's name and avatar on the right side of the header. However, if desired, it's possible to replace the default [`<ThemedHeader>`][themed-header] component by passing a custom component to the `Header` prop.

Here is an example of how to replace the default [`<ThemedHeader>`][themed-header] component:

```tsx
import { Refine } from "@refinedev/core";
import { ThemedLayout } from "@refinedev/mantine";

// highlight-next-line
import { CustomHeader } from "./CustomHeader";

const App: React.FC = () => {
    return (
        <Refine
        // ...
        >
            <ThemedLayout
                // highlight-next-line
                Header={() => <CustomHeader />}
            >
                {/* ... */}
            </ThemedLayout>
        </Refine>
    );
};
```

### `Title`

In `<ThemedLayout>`, the title section is rendered using the [`<ThemedTitle>`][themed-title] component by default. However, if desired, it's possible to replace the default [`<ThemedTitle>`][themed-title] component by passing a custom component to the `Title` prop.

Here is an example of how to replace the default [`<ThemedTitle>`][themed-title] component:

```tsx
import { Refine } from "@refinedev/core";
// highlight-next-line
import { ThemedLayout, ThemedTitle } from "@refinedev/mantine";

// highlight-next-line
import { MyLargeIcon, MySmallIcon } from "./MyIcon";

const App: React.FC = () => {
    return (
        <Refine
        // ...
        >
            <ThemedLayout
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
            </ThemedLayout>
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

import { MantineInferencer } from "@refinedev/inferencer/mantine";
import { ThemedLayout, RefineThemes } from "@refinedev/mantine";
import { MantineProvider, Center, Global } from "@mantine/core";

import routerProvider from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { authProvider } from "./authProvider";

import dataProvider from "@refinedev/simple-rest";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <MantineProvider
            theme={RefineThemes.Blue}
            withNormalizeCSS
            withGlobalStyles
        >
            <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
            <BrowserRouter>
                <Refine
                    authProvider={authProvider}
                    routerProvider={routerProvider}
                    dataProvider={dataProvider(API_URL)}
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
                                <ThemedLayout
                                    Footer={() => (
                                        <Center
                                            w="100%"
                                            h="64px"
                                            sx={(theme) => ({
                                                borderTop: `1px solid ${theme.colors.gray[4]}`,
                                                backgroundColor:
                                                    theme.colors.gray[2],
                                            })}
                                        >
                                            My Custom Footer
                                        </Center>
                                    )}
                                >
                                    <Outlet />
                                </ThemedLayout>
                            }
                        >
                            {/* highlight-next-line */}
                            <Route
                                path="/samples"
                                element={<MantineInferencer />}
                            />
                        </Route>
                    </Routes>
                </Refine>
            </BrowserRouter>
        </MantineProvider>
    );
};

// visible-block-end

render(<App />);
```

```tsx
import { Refine } from "@refinedev/core";
import { ThemedLayout } from "@refinedev/mantine";
import { Center } from "@mantine/core";

const App: React.FC = () => {
    return (
        <Refine
        // ...
        >
            <ThemedLayout
                // highlight-start
                Footer={() => (
                    <Center
                        w="100%"
                        h="64px"
                        sx={(theme) => ({
                            borderTop: `1px solid ${theme.colors.gray[4]}`,
                            backgroundColor: theme.colors.gray[2],
                        })}
                    >
                        My Custom Footer
                    </Center>
                )}
                // highlight-end
            >
                {/* ... */}
            </ThemedLayout>
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

import { MantineInferencer } from "@refinedev/inferencer/mantine";
import { ThemedLayout, RefineThemes } from "@refinedev/mantine";
import { MantineProvider, Button, Global } from "@mantine/core";

import routerProvider from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { authProvider } from "./authProvider";

import dataProvider from "@refinedev/simple-rest";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <MantineProvider
            theme={RefineThemes.Blue}
            withNormalizeCSS
            withGlobalStyles
        >
            <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
            <BrowserRouter>
                <Refine
                    authProvider={authProvider}
                    routerProvider={routerProvider}
                    dataProvider={dataProvider(API_URL)}
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
                                <ThemedLayout
                                    OffLayoutArea={() => (
                                        <Button
                                            onClick={() =>
                                                alert("Off layout are clicked")
                                            }
                                            compact
                                            sx={{
                                                position: "fixed",
                                                bottom: "16px",
                                                left: "16px",
                                            }}
                                        >
                                            Send us Feedback 👋
                                        </Button>
                                    )}
                                >
                                    <Outlet />
                                </ThemedLayout>
                            }
                        >
                            {/* highlight-next-line */}
                            <Route
                                path="/samples"
                                element={<MantineInferencer />}
                            />
                        </Route>
                    </Routes>
                </Refine>
            </BrowserRouter>
        </MantineProvider>
    );
};

// visible-block-end

render(<App />);
```

```tsx
import { Refine } from "@refinedev/core";
import { ThemedLayout } from "@refinedev/mantine";
import { Button } from "@mantine/core";

const App: React.FC = () => {
    return (
        <Refine
        // ...
        >
            <ThemedLayout
                // highlight-start
                OffLayoutArea={() => (
                    <Button
                        onClick={() => alert("Off layout are clicked")}
                        compact
                        sx={{
                            position: "fixed",
                            bottom: "16px",
                            left: "16px",
                        }}
                    >
                        Send us Feedback 👋
                    </Button>
                )}
                // highlight-end
            >
                {/* ... */}
            </ThemedLayout>
        </Refine>
    );
};
```

## Customizing with swizzle

> 🚨 This feature is available with `@refine/cli`. Please refer to [CLI documentation](/docs/packages/documentation/cli/#swizzle) for more information.

`<ThemedLayout>` component source code can be ejecting using the `swizzle` command. This will create a copy of the component in your project's `src` directory, allowing you to customize as your needs.

### Usage

Let's create a new component by swizzling the `<ThemedLayout>` components.

```bash
> npm run refine swizzle

? Which package do you want to swizzle? (Use arrow keys or type to search)

Data Provider
 ◯ @refinedev/simple-rest
UI Framework
 ◉ @refinedev/mantine
```

First, you need to select the package you want to swizzle. In this example, we will swizzle the `@refinedev/mantine` package.

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
❯◉ ThemedLayout
Pages
 ◯ ErrorPage
 ◯ AuthPage
(Move up and down to reveal more choices)
```

Then, you need to select the component you want to swizzle. In this example, we will swizzle the `ThemedLayout` component.

```bash
Successfully swizzled Themed Layout
Files created:
 - src/components/themedLayout/sider.tsx
 - src/components/themedLayout/header.tsx
 - src/components/themedLayout/title.tsx
 - src/components/themedLayout/index.tsx

Warning:
If you want to change the default layout;
You should pass layout related components to the <ThemedLayout/> component's props.

    ╭ App.tsx ───────────────────────────────────────────────────────────────────────────────────────╮
    │                                                                                                │
    │   import { ThemedLayout } from "components/themedLayout";                                      │
    │   import { ThemedHeader } from "components/themedLayout/header";                               │
    │   import { ThemedSider } from "components/themedLayout/sider";                                 │
    │   import { ThemedTitle } from "components/themedLayout/title";                                 │
    │                                                                                                │
    │   const App = () => {                                                                          │
    │       return (                                                                                 │
    │           <Refine                                                                              │
    │               /* ... */                                                                        │
    │           >                                                                                    │
    │               <ThemedLayout Header={ThemedHeader} Sider={ThemedSider} Title={ThemedTitle} />   │
    │                   /* ... */                                                                    │
    │               </ThemedLayout>                                                                  │
    │           </Refine>                                                                            │
    │       );                                                                                       │
    │   }                                                                                            │
    │                                                                                                │
    ╰────────────────────────────────────────────────────────────────────────────────────────────────╯
```

Finally, the swizzle command will create a new folder in the `src/components/layout` directory and generate the layout components of the `@refinedev/mantine` package in it.

You can use these components in your project as you wish.

```tsx
import { Refine } from "@refinedev/core";
import { ThemedLayout } from "components/themedLayout";
import { ThemedHeader } from "components/themedLayout/header";
import { ThemedSider } from "components/themedLayout/sider";
import { ThemedTitle } from "components/themedLayout/title";

const App = () => {
    return (
        <Refine
        /* ... */
        >
            <ThemedLayout
                Header={ThemedHeader}
                Sider={ThemedSider}
                Title={ThemedTitle}
            >
                /* ... */
            </ThemedLayout>
        </Refine>
    );
};
```

:::info

**refine** CLI determines the path to create a new folder according to the framework you are using. For example, if you are using the `remix`, the path will be `app/components/layout`.

:::

:::caution

If there is already a file with the same name in the directory, the swizzle command will not overwrite it.

[themed-sider]: https://github.com/refinedev/refine/blob/next/packages/mantine/src/components/themedLayout/sider/index.tsx
[themed-header]: https://github.com/refinedev/refine/blob/next/packages/mantine/src/components/themedLayout/header/index.tsx
[themed-title]: https://github.com/refinedev/refine/blob/next/packages/mantine/src/components/themedLayout/title/index.tsx
[use-menu]: /docs/api-reference/core/hooks/ui/useMenu/
[refine-component]: /docs/api-reference/core/components/refine-config/
[refine-themes]: /docs/api-reference/mantine/theming/#refine-themes
[mantine-drawer]: https://mantine.dev/core/drawer/
