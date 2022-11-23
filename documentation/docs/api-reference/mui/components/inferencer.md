---
id: inferencer
title: Inferencer
---

You can automatically generate views for your resources using `@pankod/refine-inferencer`. Inferencer exports `MuiListInferencer`, `MuiShowInferencer`, `MuiCreateInferencer` and `MuiEditInferencer` components.

## Usage

Material UI components can be imported from `@pankod/refine-inferencer/mui`. You can directly use the components in `resources` prop of `Refine` component or you can use them in your custom components by passing the `resource` prop as the resource name.

<Tabs
defaultValue="resources"
values={[
{label: <>In<code style={{ margin: "0 0.7ch" }}>resources</code>prop</>, value: 'resources'},
{label: 'In Custom Components', value: 'custom'}
]}>
<TabItem value="resources">

```tsx
import {
    ThemeProvider,
    LightTheme,
    CssBaseline,
    GlobalStyles,
} from "@pankod/refine-mui";
// highlight-start
import {
    MuiListInferencer,
    MuiShowInferencer,
    MuiCreateInferencer,
    MuiEditInferencer,
} from "@pankod/refine-inferencer/mui";
// highlight-end

const App = () => {
    return (
        <ThemeProvider theme={LightTheme}>
            <CssBaseline />
            <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
            <Refine
                resources={[
                    {
                        name: "samples",
                        // highlight-start
                        list: MuiListInferencer,
                        show: MuiShowInferencer,
                        create: MuiCreateInferencer,
                        edit: MuiEditInferencer,
                        // highlight-end
                    },
                ]}
            />
        </ThemeProvider>
    );
};
```

  </TabItem>
  <TabItem value="custom">

```tsx
// highlight-start
import {
    MuiListInferencer,
    MuiShowInferencer,
    MuiCreateInferencer,
    MuiEditInferencer,
} from "@pankod/refine-inferencer/mui";
// highlight-end

const SampleList = () => {
    return (
        // highlight-next-line
        <MuiListInferencer resource="samples" />
    );
};

const SampleShow = () => {
    return (
        // highlight-next-line
        <MuiShowInferencer resource="samples" />
    );
};

const SampleCreate = () => {
    return (
        // highlight-next-line
        <MuiCreateInferencer resource="samples" />
    );
};

const SampleEdit = () => {
    return (
        // highlight-next-line
        <MuiEditInferencer resource="samples" />
    );
};
```

  </TabItem>
</Tabs>

:::info
To learn more about `@pankod/refine-inferencer` package, please check out [Docs](/docs/packages/documentation/inferencer)
:::

## Views

### `MuiListInferencer`

Generates a sample list view for your resources according to the API response. It uses `List` component and `useDatagrid` hook from `@pankod/refine-mui`.

```tsx live hideCode previewHeight=600px url=http://localhost:3000/posts
setInitialRoutes(["/"]);

// visible-block-start
import { Refine } from "@pankod/refine-core";
import {
    Layout,
    ThemeProvider,
    LightTheme,
    CssBaseline,
    GlobalStyles,
} from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

import {
    // highlight-start
    MuiListInferencer,
    // highlight-end
    MuiShowInferencer,
    MuiCreateInferencer,
    MuiEditInferencer,
} from "@pankod/refine-inferencer/mui";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <ThemeProvider theme={LightTheme}>
            <CssBaseline />
            <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider(API_URL)}
                Layout={Layout}
                resources={[
                    {
                        name: "samples",
                        // highlight-start
                        list: MuiListInferencer,
                        // highlight-end
                        show: MuiShowInferencer,
                        create: MuiCreateInferencer,
                        edit: MuiEditInferencer,
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
        </ThemeProvider>
    );
};

// visible-block-end

render(<App />);
```

### `MuiShowInferencer`

Generates a sample show view for your resources according to the API response. It uses `Show` and field components from `@pankod/refine-mui` with `useShow` hook from `@pankod/refine-core`.

```tsx live hideCode previewHeight=600px url=http://localhost:3000/samples/show/123
setInitialRoutes(["/samples/show/123"]);

// visible-block-start
import { Refine } from "@pankod/refine-core";
import {
    Layout,
    ThemeProvider,
    LightTheme,
    CssBaseline,
    GlobalStyles,
} from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

import {
    MuiListInferencer,
    // highlight-start
    MuiShowInferencer,
    // highlight-end
    MuiCreateInferencer,
    MuiEditInferencer,
} from "@pankod/refine-inferencer/mui";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <ThemeProvider theme={LightTheme}>
            <CssBaseline />
            <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider(API_URL)}
                Layout={Layout}
                resources={[
                    {
                        name: "samples",
                        list: MuiListInferencer,
                        // highlight-start
                        show: MuiShowInferencer,
                        // highlight-end
                        create: MuiCreateInferencer,
                        edit: MuiEditInferencer,
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
        </ThemeProvider>
    );
};

// visible-block-end

render(<App />);
```

### `MuiCreateInferencer`

Generates a sample create view for your resources according to the first record in list API response. It uses `Create` component from `@pankod/refine-mui` and `useForm` hook from `@pankod/refine-react-hook-form`.

```tsx live hideCode previewHeight=600px url=http://localhost:3000/samples/create
setInitialRoutes(["/samples/create"]);

// visible-block-start
import { Refine } from "@pankod/refine-core";
import {
    Layout,
    ThemeProvider,
    LightTheme,
    CssBaseline,
    GlobalStyles,
} from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

import {
    MuiListInferencer,
    MuiShowInferencer,
    // highlight-start
    MuiCreateInferencer,
    // highlight-end
    MuiEditInferencer,
} from "@pankod/refine-inferencer/mui";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <ThemeProvider theme={LightTheme}>
            <CssBaseline />
            <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider(API_URL)}
                Layout={Layout}
                resources={[
                    {
                        name: "samples",
                        list: MuiListInferencer,
                        show: MuiShowInferencer,
                        // highlight-start
                        create: MuiCreateInferencer,
                        // highlight-end
                        edit: MuiEditInferencer,
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
        </ThemeProvider>
    );
};

// visible-block-end

render(<App />);
```

### `MuiEditInferencer`

Generates a sample edit view for your resources according to the API response. It uses `Edit` component from `@pankod/refine-mui` and `useForm` hook from `@pankod/refine-react-hook-form`.

```tsx live hideCode previewHeight=600px url=http://localhost:3000/samples/edit/123
setInitialRoutes(["/samples/edit/123"]);

// visible-block-start
import { Refine } from "@pankod/refine-core";
import {
    Layout,
    ThemeProvider,
    LightTheme,
    CssBaseline,
    GlobalStyles,
} from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

import {
    MuiListInferencer,
    MuiShowInferencer,
    MuiCreateInferencer,
    // highlight-start
    MuiEditInferencer,
    // highlight-end
} from "@pankod/refine-inferencer/mui";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <ThemeProvider theme={LightTheme}>
            <CssBaseline />
            <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider(API_URL)}
                Layout={Layout}
                resources={[
                    {
                        name: "samples",
                        list: MuiListInferencer,
                        show: MuiShowInferencer,
                        create: MuiCreateInferencer,
                        // highlight-start
                        edit: MuiEditInferencer,
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
        </ThemeProvider>
    );
};

// visible-block-end

render(<App />);
```

## Live StackBlitz Example

Below you'll find a Live StackBlitz Example displaying a fully setup `Refine` app with `@pankod/refine-inferencer/mui` components.

<iframe loading="lazy" src="https://stackblitz.com/github/refinedev/refine/tree/master/examples/inferencer/mui?embed=1&view=preview&theme=dark&preset=node&ctl=1"
    style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
    title="Refine Inferencer with Material UI"
></iframe>
