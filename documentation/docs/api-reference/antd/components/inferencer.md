---
id: inferencer
title: Inferencer
---

You can automatically generate views for your resources using `@refinedev/inferencer`. Inferencer exports `AntdListInferencer`, `AntdShowInferencer`, `AntdEditInferencer`, `AntdCreateInferencer` and `AntdInferencer` (which combines all in one place) components.

## Usage

Ant Design components can be imported from `@refinedev/inferencer/antd`. You can directly use the components in `resources` prop of `Refine` component or you can use them in your custom components by passing the `resource` prop as the resource name.

<Tabs
defaultValue="resources"
values={[
{label: <>In<code style={{ margin: "0 0.7ch" }}>resources</code>prop</>, value: 'resources'},
{label: 'In Custom Components', value: 'custom'}
]}>
<TabItem value="resources">

```tsx
// highlight-next-line
import { AntdInferencer } from "@refinedev/inferencer/antd";

const App = () => {
    return (
        <Refine
            resources={[
                {
                    name: "samples",
                    // highlight-start
                    list: AntdInferencer,
                    show: AntdInferencer,
                    create: AntdInferencer,
                    edit: AntdInferencer,
                    // highlight-end
                },
            ]}
        />
    );
};
```

  </TabItem>
  <TabItem value="custom">

```tsx
// highlight-next-line
import { AntdInferencer } from "@refinedev/inferencer/antd";

const SampleList = () => {
    return (
        // highlight-next-line
        <AntdInferencer resource="samples" action="list" />
    );
};

const SampleShow = () => {
    return (
        // highlight-next-line
        <AntdInferencer resource="samples" action="show" id="1" />
    );
};

const SampleCreate = () => {
    return (
        // highlight-next-line
        <AntdInferencer resource="samples" action="create" />
    );
};

const SampleEdit = () => {
    return (
        // highlight-next-line
        <AntdInferencer resource="samples" action="edit" id="1" />
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

Generates a sample list view for your resources according to the API response. It uses `List` and `Table` components with `useTable` hook from `@refinedev/antd`.

```tsx live hideCode previewHeight=600px url=http://localhost:3000/samples
setInitialRoutes(["/"]);

// visible-block-start
import { Refine } from "@refinedev/core";
import { Layout } from "@refinedev/antd";
import routerProvider from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";

// highlight-next-line
import { AntdInferencer } from "@refinedev/inferencer/antd";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider(API_URL)}
            Layout={Layout}
            resources={[
                {
                    name: "samples",
                    // highlight-next-line
                    list: AntdInferencer,
                    show: AntdInferencer,
                    create: AntdInferencer,
                    edit: AntdInferencer,
                    canDelete: true,
                },
                {
                    name: "categories",
                    // highlight-next-line
                    list: AntdInferencer,
                    show: AntdInferencer,
                },
                {
                    name: "tags",
                    // highlight-next-line
                    list: AntdInferencer,
                    show: AntdInferencer,
                },
            ]}
        />
    );
};

// visible-block-end

render(<App />);
```

### `Show`

Generates a sample show view for your resources according to the API response. It uses `Show` and field components from `@refinedev/antd` with `useShow` hook from `@refinedev/core`.

```tsx live hideCode previewHeight=600px url=http://localhost:3000/samples/show/123
setInitialRoutes(["/samples/show/123"]);

// visible-block-start
import { Refine } from "@refinedev/core";
import { Layout } from "@refinedev/antd";
import routerProvider from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";

// highlight-next-line
import { AntdInferencer } from "@refinedev/inferencer/antd";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider(API_URL)}
            Layout={Layout}
            resources={[
                {
                    name: "samples",
                    list: AntdInferencer,
                    // highlight-next-line
                    show: AntdInferencer,
                    create: AntdInferencer,
                    edit: AntdInferencer,
                    canDelete: true,
                },
                {
                    name: "categories",
                    list: AntdInferencer,
                    // highlight-next-line
                    show: AntdInferencer,
                },
                {
                    name: "tags",
                    list: AntdInferencer,
                    // highlight-next-line
                    show: AntdInferencer,
                },
            ]}
        />
    );
};

// visible-block-end

render(<App />);
```

### `Create`

Generates a sample create view for your resources according to the first record in list API response. It uses `Create` component and `useForm` hook from `@refinedev/antd`.

```tsx live hideCode previewHeight=600px url=http://localhost:3000/samples/create
setInitialRoutes(["/samples/create"]);

// visible-block-start
import { Refine } from "@refinedev/core";
import { Layout } from "@refinedev/antd";
import routerProvider from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";

// highlight-next-line
import { AntdInferencer } from "@refinedev/inferencer/antd";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider(API_URL)}
            Layout={Layout}
            resources={[
                {
                    name: "samples",
                    list: AntdInferencer,
                    show: AntdInferencer,
                    // highlight-next-line
                    create: AntdInferencer,
                    edit: AntdInferencer,
                    canDelete: true,
                },
                {
                    name: "categories",
                    list: AntdInferencer,
                    show: AntdInferencer,
                },
                {
                    name: "tags",
                    list: AntdInferencer,
                    show: AntdInferencer,
                },
            ]}
        />
    );
};

// visible-block-end

render(<App />);
```

### `Edit`

Generates a sample edit view for your resources according to the API response. It uses `Edit` component and `useForm` hook from `@refinedev/antd`.

```tsx live hideCode previewHeight=600px url=http://localhost:3000/samples/edit/123
setInitialRoutes(["/samples/edit/123"]);

// visible-block-start
import { Refine } from "@refinedev/core";
import { Layout } from "@refinedev/antd";
import routerProvider from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";

// highlight-next-line
import { AntdInferencer } from "@refinedev/inferencer/antd";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider(API_URL)}
            Layout={Layout}
            resources={[
                {
                    name: "samples",
                    list: AntdInferencer,
                    show: AntdInferencer,
                    create: AntdInferencer,
                    // highlight-next-line
                    edit: AntdInferencer,
                    canDelete: true,
                },
                {
                    name: "categories",
                    list: AntdInferencer,
                    show: AntdInferencer,
                },
                {
                    name: "tags",
                    list: AntdInferencer,
                    show: AntdInferencer,
                },
            ]}
        />
    );
};

// visible-block-end

render(<App />);
```

## Example

Below you'll find a Live CodeSandbox Example displaying a fully setup `Refine` app with `@refinedev/inferencer/antd` components.

<CodeSandboxExample path="inferencer-antd" />
