---
id: inferencer
title: Inferencer
---

You can automatically generate views for your resources using `@pankod/refine-inferencer`. Inferencer exports `MantineListInferencer`, `MantineShowInferencer` and `MantineEditInferencer` components.

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
    MantineEditInferencer
} from "@pankod/refine-inferencer/mantine";
// highlight-end

const App = () => {
    return (
        <MantineProvider
            theme={LightTheme}
            withNormalizeCSS
            withGlobalStyles
        >
            <Global
                styles={{ body: { WebkitFontSmoothing: "auto" } }}
            />
            <Refine
                resources={[
                    {
                        name: "posts",
                        // highlight-start
                        list: MantineListInferencer,
                        show: MantineShowInferencer,
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
    MantineEditInferencer
} from "@pankod/refine-inferencer/mantine";
// highlight-end

const PostList = () => {
    return (
        // highlight-next-line
        <MantineListInferencer resource="posts" />
    );
};

const PostShow = () => {
    return (
        // highlight-next-line
        <MantineShowInferencer resource="posts" />
    );
};

const PostEdit = () => {
    return (
        // highlight-next-line
        <MantineEditInferencer resource="posts" />
    );
};
```

  </TabItem>
</Tabs>

## Views

### `MantineListInferencer`

```tsx live hideCode previewHeight=600px url=http://localhost:3000/posts
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
    MantineEditInferencer
} from "@pankod/refine-inferencer/mantine";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <MantineProvider
            theme={LightTheme}
            withNormalizeCSS
            withGlobalStyles
        >
            <Global
                styles={{ body: { WebkitFontSmoothing: "auto" } }}
            />
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider(API_URL)}
                Layout={Layout}
                resources={[
                    {
                        name: "posts",
                        // highlight-start
                        list: MantineListInferencer,
                        // highlight-end
                        show: MantineShowInferencer,
                        edit: MantineEditInferencer,
                    },
                    {
                        name: "categories",
                    },
                    {
                        name: "tags",
                    },
                    {
                        name: "languages",
                    },
                    {
                        name: "users",
                    }
                ]}
            />
        </MantineProvider>
    );
};

// visible-block-end

render(<App/>);
```

### `MantineShowInferencer`

```tsx live hideCode previewHeight=600px url=http://localhost:3000/posts/show/123
setInitialRoutes(["/posts/show/123"]);

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
    MantineEditInferencer
} from "@pankod/refine-inferencer/mantine";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <MantineProvider
            theme={LightTheme}
            withNormalizeCSS
            withGlobalStyles
        >
            <Global
                styles={{ body: { WebkitFontSmoothing: "auto" } }}
            />
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider(API_URL)}
                Layout={Layout}
                resources={[
                    {
                        name: "posts",
                        list: MantineListInferencer,
                        // highlight-start
                        show: MantineShowInferencer,
                        // highlight-end
                        edit: MantineEditInferencer,
                    },
                    {
                        name: "categories",
                    },
                    {
                        name: "tags",
                    },
                    {
                        name: "languages",
                    },
                    {
                        name: "users",
                    }
                ]}
            />
        </MantineProvider>
    );
};

// visible-block-end

render(<App/>);
```

### `MantineEditInferencer`

```tsx live hideCode previewHeight=600px url=http://localhost:3000/posts/edit/123
setInitialRoutes(["/posts/edit/123"]);

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
    MantineEditInferencer
    // highlight-end
} from "@pankod/refine-inferencer/mantine";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <MantineProvider
            theme={LightTheme}
            withNormalizeCSS
            withGlobalStyles
        >
            <Global
                styles={{ body: { WebkitFontSmoothing: "auto" } }}
            />
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider(API_URL)}
                Layout={Layout}
                resources={[
                    {
                        name: "posts",
                        list: MantineListInferencer,
                        show: MantineShowInferencer,
                        // highlight-start
                        edit: MantineEditInferencer,
                        // highlight-end
                    },
                    {
                        name: "categories",
                    },
                    {
                        name: "tags",
                    },
                    {
                        name: "languages",
                    },
                    {
                        name: "users",
                    }
                ]}
            />
        </MantineProvider>
    );
};

// visible-block-end

render(<App/>);
```

## Live StackBlitz Example

Below you'll find a Live StackBlitz Example displaying a fully setup `Refine` app with `@pankod/refine-inferencer/mantine` components.

<iframe loading="lazy" src="https://stackblitz.com/github/refinedev/refine/tree/master/examples/inferencer/mantine?embed=1&view=preview&theme=dark&preset=node&ctl=1"
    style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
    title="Refine Inferencer with Mantine UI"
></iframe>