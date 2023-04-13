---
id: inferencer
title: Inferencer
sidebar_label: Inferencer
---

You can automatically generate views for your resources using `@refinedev/inferencer`. Inferencer exports `HeadlessListInferencer`, `HeadlessShowInferencer`, `HeadlessEditInferencer`, `HeadlessCreateInferencer` and `HeadlessInferencer` (which combines all in one place) components.

:::caution Dependencies

`@refinedev/inferencer/headless` uses [`@refinedev/react-hook-form`](/docs/packages/documentation/react-hook-form/useForm) and [`@refinedev/react-table`](/docs/packages/documentation/react-table) to create views.

Make sure you include them in your dependencies.

:::

## Usage

Inferencer components can be imported from `@refinedev/inferencer/headless`. You can directly use the components in your routes without passing any props. If you use a `routerProvider`, it will infer the `resource`, `action` and `id` from the current route.

<Tabs
defaultValue="resources"
values={[
{label: 'Without Props', value: 'resources'},
{label: 'With Explicit Props', value: 'custom'}
]}>
<TabItem value="resources">

```tsx
import routerProvider from "@refinedev/react-router-v6";
import { BrowserRouter } from "react-router-dom";
// highlight-next-line
import { HeadlessInferencer } from "@refinedev/inferencer/headless";

const App = () => {
    return (
        <BrowserRouter>
            <Refine
                routerProvider={routerProvider}
                resources={[
                    {
                        name: "samples",
                        list: "/posts",
                    },
                ]}
            >
                <Routes>
                    {/* highlight-next-line */}
                    <Route path="/posts" element={<HeadlessInferencer />} />
                </Routes>
            </Refine>
        </BrowserRouter>
    );
};
```

  </TabItem>
  <TabItem value="custom">

```tsx
// highlight-next-line
import { HeadlessInferencer } from "@refinedev/inferencer/headless";

const SampleList = () => {
    return (
        // highlight-next-line
        <HeadlessInferencer resource="samples" action="list" />
    );
};

const SampleShow = () => {
    return (
        // highlight-next-line
        <HeadlessInferencer resource="samples" action="show" id="1" />
    );
};

const SampleCreate = () => {
    return (
        // highlight-next-line
        <HeadlessInferencer resource="samples" action="create" />
    );
};

const SampleEdit = () => {
    return (
        // highlight-next-line
        <HeadlessInferencer resource="samples" action="edit" id="1" />
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

Generates a sample list view for your resources according to the API response. It uses `useTable` hook from `@refinedev/react-table`.

```tsx live hideCode previewHeight=600px url=http://localhost:3000/samples
setInitialRoutes(["/samples"]);

// visible-block-start
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";

import { BrowserRouter, Routes, Route } from "react-router-dom";

// highlight-next-line
import { HeadlessInferencer } from "@refinedev/inferencer/headless";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider(API_URL)}
                resources={[
                    {
                        // highlight-next-line
                        name: "samples",
                        list: "/samples",
                        show: "/samples/show/:id",
                        create: "/samples/create",
                        edit: "/samples/edit/:id",
                    },
                ]}
            >
                <Routes>
                    {/** highlight-next-line */}
                    <Route path="/samples" element={<HeadlessInferencer />} />
                    <Route
                        path="/samples/create"
                        element={<HeadlessInferencer />}
                    />
                    <Route
                        path="/samples/show/:id"
                        element={<HeadlessInferencer />}
                    />
                    <Route
                        path="/samples/edit/:id"
                        element={<HeadlessInferencer />}
                    />
                    <Route path="*" element={<div>Not Found</div>} />
                </Routes>
            </Refine>
        </BrowserRouter>
    );
};

// visible-block-end

render(<App />);
```

### `Show`

Generates a sample show view for your resources according to the API response. It uses `useShow` hook from `@refinedev/core`.

```tsx live hideCode previewHeight=600px url=http://localhost:3000/samples/show/123
setInitialRoutes(["/samples/show/123"]);

// visible-block-start
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";

import { BrowserRouter, Routes, Route } from "react-router-dom";

// highlight-next-line
import { HeadlessInferencer } from "@refinedev/inferencer/headless";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider(API_URL)}
                resources={[
                    {
                        name: "samples",
                        list: "/samples",
                        // highlight-next-line
                        show: "/samples/show/:id",
                        create: "/samples/create",
                        edit: "/samples/edit/:id",
                    },
                ]}
            >
                <Routes>
                    <Route path="/samples" element={<HeadlessInferencer />} />
                    <Route
                        path="/samples/create"
                        element={<HeadlessInferencer />}
                    />
                    {/** highlight-next-line */}
                    <Route
                        path="/samples/show/:id"
                        element={<HeadlessInferencer />}
                    />
                    <Route
                        path="/samples/edit/:id"
                        element={<HeadlessInferencer />}
                    />
                    <Route path="*" element={<div>Not Found</div>} />
                </Routes>
            </Refine>
        </BrowserRouter>
    );
};

// visible-block-end

render(<App />);
```

### `Create`

Generates a sample create view for your resources according to the first record in list API response. It uses `useForm` hook from `@refinedev/react-hook-form`.

```tsx live hideCode previewHeight=600px url=http://localhost:3000/samples/create
setInitialRoutes(["/samples/create"]);

// visible-block-start
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";

import { BrowserRouter, Routes, Route } from "react-router-dom";

// highlight-next-line
import { HeadlessInferencer } from "@refinedev/inferencer/headless";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider(API_URL)}
                resources={[
                    {
                        name: "samples",
                        list: "/samples",
                        // highlight-next-line
                        create: "/samples/create",
                        show: "/samples/show/:id",
                        edit: "/samples/edit/:id",
                    },
                ]}
            >
                <Routes>
                    <Route path="/samples" element={<HeadlessInferencer />} />
                    {/** highlight-next-line */}
                    <Route
                        path="/samples/create"
                        element={<HeadlessInferencer />}
                    />
                    <Route
                        path="/samples/show/:id"
                        element={<HeadlessInferencer />}
                    />
                    <Route
                        path="/samples/edit/:id"
                        element={<HeadlessInferencer />}
                    />
                    <Route path="*" element={<div>Not Found</div>} />
                </Routes>
            </Refine>
        </BrowserRouter>
    );
};

// visible-block-end

render(<App />);
```

### `Edit`

Generates a sample edit view for your resources according to the API response. It uses `useForm` hook from `@refinedev/react-hook-form`.

```tsx live hideCode previewHeight=600px url=http://localhost:3000/samples/edit/123
setInitialRoutes(["/samples/edit/123"]);

// visible-block-start
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";

import { BrowserRouter, Routes, Route } from "react-router-dom";

// highlight-next-line
import { HeadlessInferencer } from "@refinedev/inferencer/headless";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider(API_URL)}
                resources={[
                    {
                        name: "samples",
                        list: "/samples",
                        show: "/samples/show/:id",
                        create: "/samples/create",
                        // highlight-next-line
                        edit: "/samples/edit/:id",
                    },
                ]}
            >
                <Routes>
                    <Route path="/samples" element={<HeadlessInferencer />} />
                    <Route
                        path="/samples/create"
                        element={<HeadlessInferencer />}
                    />
                    <Route
                        path="/samples/show/:id"
                        element={<HeadlessInferencer />}
                    />
                    {/** highlight-next-line */}
                    <Route
                        path="/samples/edit/:id"
                        element={<HeadlessInferencer />}
                    />
                    <Route path="*" element={<div>Not Found</div>} />
                </Routes>
            </Refine>
        </BrowserRouter>
    );
};

// visible-block-end

render(<App />);
```

## Example

Below you'll find a Live CodeSandbox Example displaying a fully setup `Refine` app with `@refinedev/inferencer/headless` components.

<CodeSandboxExample path="inferencer-headless" />
