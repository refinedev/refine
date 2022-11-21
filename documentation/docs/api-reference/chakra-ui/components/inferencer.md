---
id: inferencer
title: Inferencer
---

You can automatically generate views for your resources using `@pankod/refine-inferencer`. Inferencer exports `ChakraUIListInferencer`, `ChakraUIShowInferencer` and `ChakraUIEditInferencer` components.

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
        <ChakraUIListInferencer resource="posts" />
    );
};

const PostShow = () => {
    return (
        // highlight-next-line
        <ChakraUIShowInferencer resource="posts" />
    );
};

const PostEdit = () => {
    return (
        // highlight-next-line
        <ChakraUIEditInferencer resource="posts" />
    );
};
```

  </TabItem>
</Tabs>

## Views

### `ChakraUIListInferencer`

Generates a sample list view for your resources according to the API response. It uses `List` component from `@pankod/refine-chakra-ui` and `useTable` hook from `@pankod/refine-react-table`.

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

Generates a sample show view for your resources according to the API response. It uses `Show` and field components from `@pankod/refine-chakra-ui` with `useShow` hook from `@pankod/refine-core`.

```tsx live hideCode previewHeight=600px url=http://localhost:3000/posts/show/123
setInitialRoutes(["/posts/show/123"]);

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

Generates a sample edit view for your resources according to the API response. It uses `Edit` component from `@pankod/refine-chakra-ui` and `useForm` hook from `@pankod/refine-react-hook-form`.

```tsx live hideCode previewHeight=600px url=http://localhost:3000/posts/edit/123
setInitialRoutes(["/posts/edit/123"]);

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

## Live StackBlitz Example

Below you'll find a Live StackBlitz Example displaying a fully setup `Refine` app with `@pankod/refine-inferencer/chakra-ui` components.

<iframe loading="lazy" src="https://stackblitz.com/github/refinedev/refine/tree/master/examples/inferencer/chakra-ui?embed=1&view=preview&theme=dark&preset=node&ctl=1"
    style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
    title="Refine Inferencer with Chakra UI"
></iframe>