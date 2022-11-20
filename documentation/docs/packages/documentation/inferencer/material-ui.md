---
id: material-ui
title: Material UI
---

Material UI inferencer exports `MuiListInferencer`, `MuiShowInferencer` and `MuiEditInferencer` components to generate sample views for resources.

## Usage

Material UI components can be imported from `@pankod/refine-inferencer/mui`. You can directly use the components in `resources` prop of `Refine` component or you can use them in your custom components by passing the `name` prop as the resource name.

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
    GlobalStyles
} from "@pankod/refine-mui";
// highlight-start
import {
    MuiListInferencer,
    MuiShowInferencer,
    MuiEditInferencer
} from "@pankod/refine-inferencer/mui";
// highlight-end

const App = () => {
    return (
        <ThemeProvider theme={LightTheme}>
            <CssBaseline />
            <GlobalStyles
                styles={{ html: { WebkitFontSmoothing: "auto" } }}
            />
            <Refine
                resources={[
                    {
                        name: "posts",
                        // highlight-start
                        list: MuiListInferencer,
                        show: MuiShowInferencer,
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
    MuiEditInferencer
} from "@pankod/refine-inferencer/mui";
// highlight-end

const PostList = () => {
    return (
        // highlight-next-line
        <MuiListInferencer name="posts" />
    );
};

const PostShow = () => {
    return (
        // highlight-next-line
        <MuiShowInferencer name="posts" />
    );
};

const PostEdit = () => {
    return (
        // highlight-next-line
        <MuiEditInferencer name="posts" />
    );
};
```

  </TabItem>
</Tabs>

## Views

### `MuiListInferencer`

```tsx live hideCode previewHeight=600px url=http://localhost:3000/posts
setInitialRoutes(["/"]);

// visible-block-start
import { Refine } from "@pankod/refine-core";
import {
    Layout,
    ThemeProvider,
    LightTheme,
    CssBaseline,
    GlobalStyles
} from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

import {
    // highlight-start
    MuiListInferencer,
    // highlight-end
    MuiShowInferencer,
    MuiEditInferencer
} from "@pankod/refine-inferencer/mui";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <ThemeProvider theme={LightTheme}>
            <CssBaseline />
            <GlobalStyles
                styles={{ html: { WebkitFontSmoothing: "auto" } }}
            />
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider(API_URL)}
                Layout={Layout}
                resources={[
                    {
                        name: "posts",
                        // highlight-start
                        list: MuiListInferencer,
                        // highlight-end
                        show: MuiShowInferencer,
                        edit: MuiEditInferencer,
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
        </ThemeProvider>
    );
};

// visible-block-end

render(<App/>);
```

### `MuiShowInferencer`

```tsx live hideCode previewHeight=600px url=http://localhost:3000/posts
setInitialRoutes(["/posts/show/1"]);

// visible-block-start
import { Refine } from "@pankod/refine-core";
import {
    Layout,
    ThemeProvider,
    LightTheme,
    CssBaseline,
    GlobalStyles
} from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

import {
    MuiListInferencer,
    // highlight-start
    MuiShowInferencer,
    // highlight-end
    MuiEditInferencer
} from "@pankod/refine-inferencer/mui";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <ThemeProvider theme={LightTheme}>
            <CssBaseline />
            <GlobalStyles
                styles={{ html: { WebkitFontSmoothing: "auto" } }}
            />
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider(API_URL)}
                Layout={Layout}
                resources={[
                    {
                        name: "posts",
                        list: MuiListInferencer,
                        // highlight-start
                        show: MuiShowInferencer,
                        // highlight-end
                        edit: MuiEditInferencer,
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
        </ThemeProvider>
    );
};

// visible-block-end

render(<App/>);
```

### `MuiEditInferencer`

```tsx live hideCode previewHeight=600px url=http://localhost:3000/posts
setInitialRoutes(["/posts/edit/1"]);

// visible-block-start
import { Refine } from "@pankod/refine-core";
import {
    Layout,
    ThemeProvider,
    LightTheme,
    CssBaseline,
    GlobalStyles
} from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

import {
    MuiListInferencer,
    MuiShowInferencer,
    // highlight-start
    MuiEditInferencer
    // highlight-end
} from "@pankod/refine-inferencer/mui";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <ThemeProvider theme={LightTheme}>
            <CssBaseline />
            <GlobalStyles
                styles={{ html: { WebkitFontSmoothing: "auto" } }}
            />
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider(API_URL)}
                Layout={Layout}
                resources={[
                    {
                        name: "posts",
                        list: MuiListInferencer,
                        show: MuiShowInferencer,
                        // highlight-start
                        edit: MuiEditInferencer,
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
        </ThemeProvider>
    );
};

// visible-block-end

render(<App/>);
```