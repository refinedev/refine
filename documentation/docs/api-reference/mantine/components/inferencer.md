---
id: inferencer
title: Inferencer
---

You can automatically generate views for your resources using `@pankod/refine-inferencer`. Inferencer exports `MantineListInferencer`, `MantineShowInferencer`, `MantineCreateInferencer` and `MantineEditInferencer` components.

## Usage

Mantine components can be imported from `@pankod/refine-inferencer/mantine`. You can directly use the components in `resources` prop of `Refine` component or you can use them in your custom components by passing the `resource` prop as the resource name.

<Tabs
defaultValue="resources"
values={[
{label: <>In<code style={{ margin: "0 0.7ch" }}>resources</code>prop</>, value: 'resources'},
{label: 'In Custom Components', value: 'custom'}
]}>
<TabItem value="resources">

```tsx
import {
    Layout,
    MantineProvider,
    LightTheme,
    Global,
} from "@pankod/refine-mantine";
// highlight-start
import {
    MantineListInferencer,
    MantineShowInferencer,
    MantineCreateInferencer,
    MantineEditInferencer,
} from "@pankod/refine-inferencer/mantine";
// highlight-end

const App = () => {
    return (
        <MantineProvider theme={LightTheme} withNormalizeCSS withGlobalStyles>
            <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
            <Refine
                resources={[
                    {
                        name: "samples",
                        // highlight-start
                        list: MantineListInferencer,
                        show: MantineShowInferencer,
                        create: MantineCreateInferencer,
                        edit: MantineEditInferencer,
                        // highlight-end
                    },
                ]}
            />
        </MantineProvider>
    );
};
```

  </TabItem>
  <TabItem value="custom">

```tsx
// highlight-start
import {
    MantineListInferencer,
    MantineShowInferencer,
    MantineCreateInferencer,
    MantineEditInferencer,
} from "@pankod/refine-inferencer/mantine";
// highlight-end

const SampleList = () => {
    return (
        // highlight-next-line
        <MantineListInferencer resource="samples" />
    );
};

const SampleShow = () => {
    return (
        // highlight-next-line
        <MantineShowInferencer resource="samples" />
    );
};

const SampleCreate = () => {
    return (
        // highlight-next-line
        <MantineCreateInferencer resource="samples" />
    );
};

const SampleEdit = () => {
    return (
        // highlight-next-line
        <MantineEditInferencer resource="samples" />
    );
};
```

  </TabItem>
</Tabs>

:::info
To learn more about `@pankod/refine-inferencer` package, please check out [Docs](/docs/packages/documentation/inferencer)
:::

## Views

### `MantineListInferencer`

Generates a sample list view for your resources according to the API response. It uses `List` component and from `@pankod/refine-mantine` and `useTable` hook from `@pankod/refine-react-table`.

```tsx live hideCode previewHeight=600px url=http://localhost:3000/samples
setInitialRoutes(["/"]);

// visible-block-start
import { Refine } from "@pankod/refine-core";
import {
    Layout,
    MantineProvider,
    LightTheme,
    Global,
} from "@pankod/refine-mantine";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

import {
    // highlight-start
    MantineListInferencer,
    // highlight-end
    MantineShowInferencer,
    MantineCreateInferencer,
    MantineEditInferencer,
} from "@pankod/refine-inferencer/mantine";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <MantineProvider theme={LightTheme} withNormalizeCSS withGlobalStyles>
            <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider(API_URL)}
                Layout={Layout}
                resources={[
                    {
                        name: "samples",
                        // highlight-start
                        list: MantineListInferencer,
                        // highlight-end
                        show: MantineShowInferencer,
                        create: MantineCreateInferencer,
                        edit: MantineEditInferencer,
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
        </MantineProvider>
    );
};

// visible-block-end

render(<App />);
```

### `MantineShowInferencer`

Generates a sample show view for your resources according to the API response. It uses `Show` and field components from `@pankod/refine-mantine` with `useShow` hook from `@pankod/refine-core`.

```tsx live hideCode previewHeight=600px url=http://localhost:3000/samples/show/123
setInitialRoutes(["/samples/show/123"]);

// visible-block-start
import { Refine } from "@pankod/refine-core";
import {
    Layout,
    MantineProvider,
    LightTheme,
    Global,
} from "@pankod/refine-mantine";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

import {
    MantineListInferencer,
    // highlight-start
    MantineShowInferencer,
    // highlight-end
    MantineCreateInferencer,
    MantineEditInferencer,
} from "@pankod/refine-inferencer/mantine";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <MantineProvider theme={LightTheme} withNormalizeCSS withGlobalStyles>
            <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider(API_URL)}
                Layout={Layout}
                resources={[
                    {
                        name: "samples",
                        list: MantineListInferencer,
                        // highlight-start
                        show: MantineShowInferencer,
                        // highlight-end
                        create: MantineCreateInferencer,
                        edit: MantineEditInferencer,
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
        </MantineProvider>
    );
};

// visible-block-end

render(<App />);
```

### `MantineCreateInferencer`

Generates a sample create view for your resources according to the first record in list API response. It uses `Create` component and `useForm` hook from `@pankod/refine-mantine`.

```tsx live hideCode previewHeight=600px url=http://localhost:3000/samples/create
setInitialRoutes(["/samples/create"]);

// visible-block-start
import { Refine } from "@pankod/refine-core";
import {
    Layout,
    MantineProvider,
    LightTheme,
    Global,
} from "@pankod/refine-mantine";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

import {
    MantineListInferencer,
    MantineShowInferencer,
    // highlight-start
    MantineCreateInferencer,
    // highlight-end
    MantineEditInferencer,
} from "@pankod/refine-inferencer/mantine";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <MantineProvider theme={LightTheme} withNormalizeCSS withGlobalStyles>
            <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider(API_URL)}
                Layout={Layout}
                resources={[
                    {
                        name: "samples",
                        list: MantineListInferencer,
                        show: MantineShowInferencer,
                        // highlight-start
                        create: MantineCreateInferencer,
                        // highlight-end
                        edit: MantineEditInferencer,
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
        </MantineProvider>
    );
};

// visible-block-end

render(<App />);
```

### `MantineEditInferencer`

Generates a sample edit view for your resources according to the API response. It uses `Edit` component and `useForm` hook from `@pankod/refine-mantine`.

```tsx live hideCode previewHeight=600px url=http://localhost:3000/samples/edit/123
setInitialRoutes(["/samples/edit/123"]);

// visible-block-start
import { Refine } from "@pankod/refine-core";
import {
    Layout,
    MantineProvider,
    LightTheme,
    Global,
} from "@pankod/refine-mantine";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

import {
    MantineListInferencer,
    MantineShowInferencer,
    MantineCreateInferencer,
    // highlight-start
    MantineEditInferencer,
    // highlight-end
} from "@pankod/refine-inferencer/mantine";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <MantineProvider theme={LightTheme} withNormalizeCSS withGlobalStyles>
            <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider(API_URL)}
                Layout={Layout}
                resources={[
                    {
                        name: "samples",
                        list: MantineListInferencer,
                        show: MantineShowInferencer,
                        create: MantineCreateInferencer,
                        // highlight-start
                        edit: MantineEditInferencer,
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
        </MantineProvider>
    );
};

// visible-block-end

render(<App />);
```

## Live StackBlitz Example

Below you'll find a Live StackBlitz Example displaying a fully setup `Refine` app with `@pankod/refine-inferencer/mantine` components.

<iframe loading="lazy" src="https://stackblitz.com/github/refinedev/refine/tree/master/examples/inferencer/mantine?embed=1&view=preview&theme=dark&preset=node&ctl=1"
    style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
    title="Refine Inferencer with Mantine UI"
></iframe>
