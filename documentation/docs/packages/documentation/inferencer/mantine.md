---
id: mantine
title: Mantine
---

Mantine inferencer exports `MantineListInferencer`, `MantineShowInferencer` and `MantineEditInferencer` components to generate sample views for resources.

## Usage

Mantine components can be imported from `@pankod/refine-inferencer/mantine`. You can directly use the components in `resources` prop of `Refine` component or you can use them in your custom components by passing the `name` prop as the resource name.

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
        <MantineListInferencer name="posts" />
    );
};

const PostShow = () => {
    return (
        // highlight-next-line
        <MantineShowInferencer name="posts" />
    );
};

const PostEdit = () => {
    return (
        // highlight-next-line
        <MantineEditInferencer name="posts" />
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

```tsx live hideCode previewHeight=600px url=http://localhost:3000/posts
setInitialRoutes(["/posts/show/1"]);

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

```tsx live hideCode previewHeight=600px url=http://localhost:3000/posts
setInitialRoutes(["/posts/edit/1"]);

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