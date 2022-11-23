---
id: inferencer
title: Inferencer
---

You can automatically generate views for your resources using `@pankod/refine-inferencer`. Inferencer exports `AntdListInferencer`, `AntdShowInferencer`, `AntdCreateInferencer` and `AntdEditInferencer` components.

## Usage

Ant Design components can be imported from `@pankod/refine-inferencer/antd`. You can directly use the components in `resources` prop of `Refine` component or you can use them in your custom components by passing the `resource` prop as the resource name.

<Tabs
defaultValue="resources"
values={[
{label: <>In<code style={{ margin: "0 0.7ch" }}>resources</code>prop</>, value: 'resources'},
{label: 'In Custom Components', value: 'custom'}
]}>
<TabItem value="resources">

```tsx
// highlight-start
import {
    AntdListInferencer,
    AntdShowInferencer,
    AntdCreateInferencer,
    AntdEditInferencer,
} from "@pankod/refine-inferencer/antd";
// highlight-end

const App = () => {
    return (
        <Refine
            resources={[
                {
                    name: "samples",
                    // highlight-start
                    list: AntdListInferencer,
                    show: AntdShowInferencer,
                    create: AntdCreateInferencer,
                    edit: AntdEditInferencer,
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
// highlight-start
import {
    AntdListInferencer,
    AntdShowInferencer,
    AntdCreateInferencer,
    AntdEditInferencer,
} from "@pankod/refine-inferencer/antd";
// highlight-end

const SampleList = () => {
    return (
        // highlight-next-line
        <AntdListInferencer resource="samples" />
    );
};

const SampleShow = () => {
    return (
        // highlight-next-line
        <AntdShowInferencer resource="samples" />
    );
};

const SampleCreate = () => {
    return (
        // highlight-next-line
        <AntdCreateInferencer resource="samples" />
    );
};

const SampleEdit = () => {
    return (
        // highlight-next-line
        <AntdEditInferencer resource="samples" />
    );
};
```

  </TabItem>
</Tabs>

:::info
To learn more about `@pankod/refine-inferencer` package, please check out [Docs](/docs/packages/documentation/inferencer)
:::

## Views

### `AntdListInferencer`

Generates a sample list view for your resources according to the API response. It uses `List` and `Table` components with `useTable` hook from `@pankod/refine-antd`.

```tsx live hideCode previewHeight=600px url=http://localhost:3000/samples
setInitialRoutes(["/"]);

// visible-block-start
import { Refine } from "@pankod/refine-core";
import { Layout } from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

import {
    // highlight-start
    AntdListInferencer,
    // highlight-end
    AntdShowInferencer,
    AntdCreateInferencer,
    AntdEditInferencer,
} from "@pankod/refine-inferencer/antd";

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
                    // highlight-start
                    list: AntdListInferencer,
                    // highlight-end
                    show: AntdShowInferencer,
                    create: AntdCreateInferencer,
                    edit: AntdEditInferencer,
                    canDelete: true,
                },
                {
                    name: "categories",
                },
                {
                    name: "tags",
                },
            ]}
        />
    );
};

// visible-block-end

render(<App />);
```

### `AntdShowInferencer`

Generates a sample show view for your resources according to the API response. It uses `Show` and field components from `@pankod/refine-antd` with `useShow` hook from `@pankod/refine-core`.

```tsx live hideCode previewHeight=600px url=http://localhost:3000/samples/show/123
setInitialRoutes(["/samples/show/123"]);

// visible-block-start
import { Refine } from "@pankod/refine-core";
import { Layout } from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

import {
    AntdListInferencer,
    // highlight-start
    AntdShowInferencer,
    // highlight-end
    AntdCreateInferencer,
    AntdEditInferencer,
} from "@pankod/refine-inferencer/antd";

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
                    list: AntdListInferencer,
                    // highlight-start
                    show: AntdShowInferencer,
                    // highlight-end
                    create: AntdCreateInferencer,
                    edit: AntdEditInferencer,
                    canDelete: true,
                },
                {
                    name: "categories",
                },
                {
                    name: "tags",
                },
            ]}
        />
    );
};

// visible-block-end

render(<App />);
```

### `AntdCreateInferencer`

Generates a sample create view for your resources according to the first record in list API response. It uses `Create` component and `useForm` hook from `@pankod/refine-antd`.

```tsx live hideCode previewHeight=600px url=http://localhost:3000/samples/create
setInitialRoutes(["/samples/create"]);

// visible-block-start
import { Refine } from "@pankod/refine-core";
import { Layout } from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

import {
    AntdListInferencer,
    AntdShowInferencer,
    // highlight-start
    AntdCreateInferencer,
    // highlight-end
    AntdEditInferencer,
} from "@pankod/refine-inferencer/antd";

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
                    list: AntdListInferencer,
                    show: AntdShowInferencer,
                    // highlight-start
                    create: AntdCreateInferencer,
                    // highlight-end
                    edit: AntdEditInferencer,
                    canDelete: true,
                },
                {
                    name: "categories",
                },
                {
                    name: "tags",
                },
            ]}
        />
    );
};

// visible-block-end

render(<App />);
```

### `AntdEditInferencer`

Generates a sample edit view for your resources according to the API response. It uses `Edit` component and `useForm` hook from `@pankod/refine-antd`.

```tsx live hideCode previewHeight=600px url=http://localhost:3000/samples/edit/123
setInitialRoutes(["/samples/edit/123"]);

// visible-block-start
import { Refine } from "@pankod/refine-core";
import { Layout } from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

import {
    AntdListInferencer,
    AntdShowInferencer,
    AntdCreateInferencer,
    // highlight-start
    AntdEditInferencer,
    // highlight-end
} from "@pankod/refine-inferencer/antd";

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
                    list: AntdListInferencer,
                    show: AntdShowInferencer,
                    create: AntdCreateInferencer,
                    // highlight-start
                    edit: AntdEditInferencer,
                    // highlight-end
                    canDelete: true,
                },
                {
                    name: "categories",
                },
                {
                    name: "tags",
                },
            ]}
        />
    );
};

// visible-block-end

render(<App />);
```

## Live StackBlitz Example

Below you'll find a Live StackBlitz Example displaying a fully setup `Refine` app with `@pankod/refine-inferencer/antd` components.

<iframe loading="lazy" src="https://stackblitz.com/github/refinedev/refine/tree/master/examples/inferencer/antd?embed=1&view=preview&theme=dark&preset=node&ctl=1"
    style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
    title="Refine Inferencer with Ant Design"
></iframe>
