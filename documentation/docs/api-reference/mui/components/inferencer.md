---
id: inferencer
title: Inferencer
sidebar_label: Inferencer 🆙
---

You can automatically generate views for your resources using `@refinedev/inferencer`. Inferencer exports `MuiListInferencer`, `MuiShowInferencer`, `MuiEditInferencer`, `MuiCreateInferencer` and `MuiInferencer` (which combines all in one place) components.

## Usage

Inferencer components can be imported from `@refinedev/inferencer/mui`. You can directly use the components in your routes without passing any props. If you use a `routerProvider`, it will infer the `resource`, `action` and `id` from the current route.

<Tabs
defaultValue="resources"
values={[
{label: <>In<code style={{ margin: "0 0.7ch" }}>resources</code>prop</>, value: 'resources'},
{label: 'In Custom Components', value: 'custom'}
]}>
<TabItem value="resources">

```tsx
import { LightTheme } from "@refinedev/mui";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

// highlight-next-line
import { MuiInferencer } from "@refinedev/inferencer/mui";

const App = () => {
    return (
        <ThemeProvider theme={LightTheme}>
            <CssBaseline />
            <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
            <BrowserRouter>
                <Refine
                    routerProvider={routerProvider}
                    resources={[
                        {
                            name: "samples",
                            list: "/samples",
                        },
                    ]}
                >
                    <Routes>
                        {/* highlight-next-line */}
                        <Route path="/samples" element={<MuiInferencer />} />
                    </Routes>
                </Refine>
            </BrowserRouter>
        </ThemeProvider>
    );
};
```

  </TabItem>
  <TabItem value="custom">

```tsx
// highlight-next-line
import { MuiInferencer } from "@refinedev/inferencer/mui";

const SampleList = () => {
    return (
        // highlight-next-line
        <MuiInferencer resource="samples" action="list" />
    );
};

const SampleShow = () => {
    return (
        // highlight-next-line
        <MuiInferencer resource="samples" action="show" id="1" />
    );
};

const SampleCreate = () => {
    return (
        // highlight-next-line
        <MuiInferencer resource="samples" action="create" />
    );
};

const SampleEdit = () => {
    return (
        // highlight-next-line
        <MuiInferencer resource="samples" action="edit" id="1" />
    );
};
```

  </TabItem>
</Tabs>

:::info
To learn more about `@refinedev/inferencer` package, please check out [Docs](/docs/packages/documentation/inferencer)
:::

## Views

### `List`

Generates a sample list view for your resources according to the API response. It uses `List` component and `useDatagrid` hook from `@refinedev/mui`.

```tsx live hideCode previewHeight=600px url=http://localhost:3000/posts
setInitialRoutes(["/samples"]);

// visible-block-start
import { Refine } from "@refinedev/core";
import { Layout, LightTheme } from "@refinedev/mui";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import routerProvider from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

// highlight-next-line
import { MuiInferencer } from "@refinedev/inferencer/mui";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <ThemeProvider theme={LightTheme}>
            <CssBaseline />
            <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
            <BrowserRouter>
                <Refine
                    routerProvider={routerProvider}
                    dataProvider={dataProvider(API_URL)}
                    resources={[
                        {
                            name: "samples",
                            list: "/samples",
                        }
                    ]}
                >
                    <Routes>
                        <Route
                            element={(
                                <Layout>
                                    <Outlet />
                                </Layout>
                            )}
                        >
                            {/* highlight-next-line */}
                            <Route path="/samples" element={<MuiInferencer />} />
                        </Route>
                    </Routes>
                </Refine>
            </BrowserRouter>
        </ThemeProvider>
    );
};

// visible-block-end

render(<App />);
```

### `Show`

Generates a sample show view for your resources according to the API response. It uses `Show` and field components from `@refinedev/mui` with `useShow` hook from `@refinedev/core`.

```tsx live hideCode previewHeight=600px url=http://localhost:3000/samples/show/123
setInitialRoutes(["/samples/show/123"]);

// visible-block-start
import { Refine } from "@refinedev/core";
import { Layout, LightTheme } from "@refinedev/mui";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";

import routerProvider from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

// highlight-next-line
import { MuiInferencer } from "@refinedev/inferencer/mui";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <ThemeProvider theme={LightTheme}>
            <CssBaseline />
            <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
            <BrowserRouter>
                <Refine
                    routerProvider={routerProvider}
                    dataProvider={dataProvider(API_URL)}
                    resources={[
                        {
                            name: "samples",
                            show: "/samples/show/:id",
                        }
                    ]}
                >
                    <Routes>
                        <Route
                            element={(
                                <Layout>
                                    <Outlet />
                                </Layout>
                            )}
                        >
                            {/* highlight-next-line */}
                            <Route path="/samples/show/:id" element={<MuiInferencer />} />
                        </Route>
                    </Routes>
                </Refine>
            </BrowserRouter>
        </ThemeProvider>
    );
};

// visible-block-end

render(<App />);
```

### `Create`

Generates a sample create view for your resources according to the first record in list API response. It uses `Create` component from `@refinedev/mui` and `useForm` hook from `@refinedev/react-hook-form`.

```tsx live hideCode previewHeight=600px url=http://localhost:3000/samples/create
setInitialRoutes(["/samples/create"]);

// visible-block-start
import { Refine } from "@refinedev/core";
import { Layout, LightTheme } from "@refinedev/mui";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";

import routerProvider from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

// highlight-next-line
import { MuiInferencer } from "@refinedev/inferencer/mui";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <ThemeProvider theme={LightTheme}>
            <CssBaseline />
            <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
            <BrowserRouter>
                <Refine
                    routerProvider={routerProvider}
                    dataProvider={dataProvider(API_URL)}
                    resources={[
                        {
                            name: "samples",
                            create: "/samples/create",
                        }
                    ]}
                >
                    <Routes>
                        <Route
                            element={(
                                <Layout>
                                    <Outlet />
                                </Layout>
                            )}
                        >
                            {/* highlight-next-line */}
                            <Route path="/samples/create" element={<MuiInferencer />} />
                        </Route>
                    </Routes>
                </Refine>
            </BrowserRouter>
        </ThemeProvider>
    );
};

// visible-block-end

render(<App />);
```

### `Edit`

Generates a sample edit view for your resources according to the API response. It uses `Edit` component from `@refinedev/mui` and `useForm` hook from `@refinedev/react-hook-form`.

```tsx live hideCode previewHeight=600px url=http://localhost:3000/samples/edit/123
setInitialRoutes(["/samples/edit/123"]);

// visible-block-start
import { Refine } from "@refinedev/core";
import { Layout, LightTheme } from "@refinedev/mui";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";

import routerProvider from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

// highlight-next-line
import { MuiInferencer } from "@refinedev/inferencer/mui";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <ThemeProvider theme={LightTheme}>
            <CssBaseline />
            <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
            <BrowserRouter>
                <Refine
                    routerProvider={routerProvider}
                    dataProvider={dataProvider(API_URL)}
                    resources={[
                        {
                            name: "samples",
                            edit: "/samples/edit/:id",
                        }
                    ]}
                >
                    <Routes>
                        <Route
                            element={(
                                <Layout>
                                    <Outlet />
                                </Layout>
                            )}
                        >
                            {/* highlight-next-line */}
                            <Route path="/samples/edit/:id" element={<MuiInferencer />} />
                        </Route>
                    </Routes>
                </Refine>
            </BrowserRouter>
        </ThemeProvider>
    );
};

// visible-block-end

render(<App />);
```

## Example

Below you'll find a Live CodeSandbox Example displaying a fully setup `Refine` app with `@refinedev/inferencer/mui` components.

<CodeSandboxExample path="inferencer-mui" />
