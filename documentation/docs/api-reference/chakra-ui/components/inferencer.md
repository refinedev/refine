---
id: inferencer
title: Inferencer
---

You can automatically generate views for your resources using `@pankod/refine-inferencer`. Inferencer exports `ChakraUIListInferencer`, `ChakraUIShowInferencer`, `ChakraUICreateInferencer` and `ChakraUIEditInferencer` components.

## Usage

Chakra UI components can be imported from `@pankod/refine-inferencer/chakra-ui`. You can directly use the components in `resources` prop of `Refine` component or you can use them in your custom components by passing the `resource` prop as the resource name.

<Tabs
defaultValue="resources"
values={[
{label: <>In<code style={{ margin: "0 0.7ch" }}>resources</code>prop</>, value: 'resources'},
{label: 'In Custom Components', value: 'custom'}
]}>
<TabItem value="resources">

```tsx
import { Layout, ChakraProvider, refineTheme } from "@pankod/refine-chakra-ui";
// highlight-start
import {
    ChakraUIListInferencer,
    ChakraUIShowInferencer,
    ChakraUICreateInferencer,
    ChakraUIEditInferencer,
} from "@pankod/refine-inferencer/chakra-ui";
// highlight-end

const App = () => {
    return (
        <ChakraProvider theme={refineTheme}>
            <Refine
                resources={[
                    {
                        name: "samples",
                        // highlight-start
                        list: ChakraUIListInferencer,
                        show: ChakraUIShowInferencer,
                        create: ChakraUICreateInferencer,
                        edit: ChakraUIEditInferencer,
                        // highlight-end
                    },
                ]}
            />
        </ChakraProvider>
    );
};
```

  </TabItem>
  <TabItem value="custom">

```tsx
// highlight-start
import {
    ChakraUIListInferencer,
    ChakraUIShowInferencer,
    ChakraUICreateInferencer,
    ChakraUIEditInferencer,
} from "@pankod/refine-inferencer/chakra-ui";
// highlight-end

const SampleList = () => {
    return (
        // highlight-next-line
        <ChakraUIListInferencer resource="samples" />
    );
};

const SampleShow = () => {
    return (
        // highlight-next-line
        <ChakraUIShowInferencer resource="samples" />
    );
};

const SampleCreate = () => {
    return (
        // highlight-next-line
        <ChakraUICreateInferencer resource="samples" />
    );
};

const SampleEdit = () => {
    return (
        // highlight-next-line
        <ChakraUIEditInferencer resource="samples" />
    );
};
```

  </TabItem>
</Tabs>

:::info
To learn more about `@pankod/refine-inferencer` package, please check out [Docs](/docs/packages/documentation/inferencer)
:::

## Views

### `ChakraUIListInferencer`

Generates a sample list view for your resources according to the API response. It uses `List` component from `@pankod/refine-chakra-ui` and `useTable` hook from `@pankod/refine-react-table`.

```tsx live hideCode previewHeight=600px url=http://localhost:3000/samples
setInitialRoutes(["/"]);

// visible-block-start
import { Refine } from "@pankod/refine-core";
import { Layout, ChakraProvider, refineTheme } from "@pankod/refine-chakra-ui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

import {
    // highlight-start
    ChakraUIListInferencer,
    // highlight-end
    ChakraUIShowInferencer,
    ChakraUICreateInferencer,
    ChakraUIEditInferencer,
} from "@pankod/refine-inferencer/chakra-ui";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <ChakraProvider theme={refineTheme}>
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider(API_URL)}
                Layout={Layout}
                resources={[
                    {
                        name: "samples",
                        // highlight-start
                        list: ChakraUIListInferencer,
                        // highlight-end
                        show: ChakraUIShowInferencer,
                        create: ChakraUICreateInferencer,
                        edit: ChakraUIEditInferencer,
                        canDelete: true,
                    },
                    {
                        name: "categories",
                        list: AntdListInferencer,
                    },
                    {
                        name: "tags",
                        list: AntdListInferencer,
                    },
                ]}
            />
        </ChakraProvider>
    );
};

// visible-block-end

render(<App />);
```

### `ChakraUIShowInferencer`

Generates a sample show view for your resources according to the API response. It uses `Show` and field components from `@pankod/refine-chakra-ui` with `useShow` hook from `@pankod/refine-core`.

```tsx live hideCode previewHeight=600px url=http://localhost:3000/samples/show/123
setInitialRoutes(["/samples/show/123"]);

// visible-block-start
import { Refine } from "@pankod/refine-core";
import { Layout, ChakraProvider, refineTheme } from "@pankod/refine-chakra-ui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

import {
    ChakraUIListInferencer,
    // highlight-start
    ChakraUIShowInferencer,
    // highlight-end
    ChakraUICreateInferencer,
    ChakraUIEditInferencer,
} from "@pankod/refine-inferencer/chakra-ui";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <ChakraProvider theme={refineTheme}>
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider(API_URL)}
                Layout={Layout}
                resources={[
                    {
                        name: "samples",
                        list: ChakraUIListInferencer,
                        // highlight-start
                        show: ChakraUIShowInferencer,
                        // highlight-end
                        create: ChakraUICreateInferencer,
                        edit: ChakraUIEditInferencer,
                        canDelete: true,
                    },
                    {
                        name: "categories",
                        list: AntdListInferencer,
                    },
                    {
                        name: "tags",
                        list: AntdListInferencer,
                    },
                ]}
            />
        </ChakraProvider>
    );
};

// visible-block-end

render(<App />);
```

### `ChakraUICreateInferencer`

Generates a sample create view for your resources according to the first record in list API response. It uses `Create` component from `@pankod/refine-chakra-ui` and `useForm` hook from `@pankod/refine-react-hook-form`.

```tsx live hideCode previewHeight=600px url=http://localhost:3000/samples/create
setInitialRoutes(["/samples/create"]);

// visible-block-start
import { Refine } from "@pankod/refine-core";
import { Layout, ChakraProvider, refineTheme } from "@pankod/refine-chakra-ui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

import {
    ChakraUIListInferencer,
    ChakraUIShowInferencer,
    // highlight-start
    ChakraUICreateInferencer,
    // highlight-end
    ChakraUIEditInferencer,
} from "@pankod/refine-inferencer/chakra-ui";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <ChakraProvider theme={refineTheme}>
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider(API_URL)}
                Layout={Layout}
                resources={[
                    {
                        name: "samples",
                        list: ChakraUIListInferencer,
                        show: ChakraUIShowInferencer,
                        // highlight-start
                        create: ChakraUICreateInferencer,
                        // highlight-end
                        edit: ChakraUIEditInferencer,
                        canDelete: true,
                    },
                    {
                        name: "categories",
                        list: AntdListInferencer,
                    },
                    {
                        name: "tags",
                        list: AntdListInferencer,
                    },
                ]}
            />
        </ChakraProvider>
    );
};

// visible-block-end

render(<App />);
```

### `ChakraUIEditInferencer`

Generates a sample edit view for your resources according to the API response. It uses `Edit` component from `@pankod/refine-chakra-ui` and `useForm` hook from `@pankod/refine-react-hook-form`.

```tsx live hideCode previewHeight=600px url=http://localhost:3000/samples/edit/123
setInitialRoutes(["/samples/edit/123"]);

// visible-block-start
import { Refine } from "@pankod/refine-core";
import { Layout, ChakraProvider, refineTheme } from "@pankod/refine-chakra-ui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

import {
    ChakraUIListInferencer,
    ChakraUIShowInferencer,
    ChakraUICreateInferencer,
    // highlight-start
    ChakraUIEditInferencer,
    // highlight-end
} from "@pankod/refine-inferencer/chakra-ui";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <ChakraProvider theme={refineTheme}>
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider(API_URL)}
                Layout={Layout}
                resources={[
                    {
                        name: "samples",
                        list: ChakraUIListInferencer,
                        show: ChakraUIShowInferencer,
                        create: ChakraUICreateInferencer,
                        // highlight-start
                        edit: ChakraUIEditInferencer,
                        // highlight-end
                        canDelete: true,
                    },
                    {
                        name: "categories",
                        list: AntdListInferencer,
                    },
                    {
                        name: "tags",
                        list: AntdListInferencer,
                    },
                ]}
            />
        </ChakraProvider>
    );
};

// visible-block-end

render(<App />);
```

## Live StackBlitz Example

Below you'll find a Live StackBlitz Example displaying a fully setup `Refine` app with `@pankod/refine-inferencer/chakra-ui` components.

<iframe loading="lazy" src="https://stackblitz.com/github/refinedev/refine/tree/master/examples/inferencer/chakra-ui?embed=1&view=preview&theme=dark&preset=node&ctl=1"
    style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
    title="Refine Inferencer with Chakra UI"
></iframe>
