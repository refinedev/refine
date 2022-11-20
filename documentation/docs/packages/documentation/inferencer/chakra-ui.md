---
id: chakra-ui
title: Chakra UI
---

Chakra UI inferencer exports `ChakraUIListInferencer`, `ChakraUIShowInferencer` and `ChakraUIEditInferencer` components to generate sample views for resources.

## Usage

Chakra UI components can be imported from `@pankod/refine-inferencer/chakra-ui`. You can directly use the components in `resources` prop of `Refine` component or you can use them in your custom components by passing the `name` prop as the resource name.

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
    ChakraUIEditInferencer
} from "@pankod/refine-inferencer/chakra-ui";
// highlight-end

const App = () => {
    return (
        <ChakraProvider theme={refineTheme}>
            <Refine
                resources={[
                    {
                        name: "posts",
                        // highlight-start
                        list: ChakraUIListInferencer,
                        show: ChakraUIShowInferencer,
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
    ChakraUIEditInferencer
} from "@pankod/refine-inferencer/chakra-ui";
// highlight-end

const PostList = () => {
    return (
        // highlight-next-line
        <ChakraUIListInferencer name="posts" />
    );
};

const PostShow = () => {
    return (
        // highlight-next-line
        <ChakraUIShowInferencer name="posts" />
    );
};

const PostEdit = () => {
    return (
        // highlight-next-line
        <ChakraUIEditInferencer name="posts" />
    );
};
```

  </TabItem>
</Tabs>

## Views

### `ChakraUIListInferencer`

```tsx live hideCode previewHeight=600px url=http://localhost:3000/posts
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
    ChakraUIEditInferencer
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
                        name: "posts",
                        // highlight-start
                        list: ChakraUIListInferencer,
                        // highlight-end
                        show: ChakraUIShowInferencer,
                        edit: ChakraUIEditInferencer,
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
        </ChakraProvider>
    );
};

// visible-block-end

render(<App/>);
```

### `ChakraUIShowInferencer`

```tsx live hideCode previewHeight=600px url=http://localhost:3000/posts
setInitialRoutes(["/posts/show/1"]);

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
    ChakraUIEditInferencer
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
                        name: "posts",
                        list: ChakraUIListInferencer,
                        // highlight-start
                        show: ChakraUIShowInferencer,
                        // highlight-end
                        edit: ChakraUIEditInferencer,
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
        </ChakraProvider>
    );
};

// visible-block-end

render(<App/>);
```

### `ChakraUIEditInferencer`

```tsx live hideCode previewHeight=600px url=http://localhost:3000/posts
setInitialRoutes(["/posts/edit/1"]);

// visible-block-start
import { Refine } from "@pankod/refine-core";
import { Layout, ChakraProvider, refineTheme } from "@pankod/refine-chakra-ui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

import {
    ChakraUIListInferencer,
    ChakraUIShowInferencer,
    // highlight-start
    ChakraUIEditInferencer
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
                        name: "posts",
                        list: ChakraUIListInferencer,
                        show: ChakraUIShowInferencer,
                        // highlight-start
                        edit: ChakraUIEditInferencer,
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
        </ChakraProvider>
    );
};

// visible-block-end

render(<App/>);
```