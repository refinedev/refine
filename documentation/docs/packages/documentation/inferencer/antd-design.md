---
id: ant-design
title: Ant Design
---

Ant Design inferencer exports `AntdListInferencer`, `AntdShowInferencer` and `AntdEditInferencer` components to generate sample views for resources.

## Usage

Ant Design components can be imported from `@pankod/refine-inferencer/antd`. You can directly use the components in `resources` prop of `Refine` component or you can use them in your custom components by passing the `name` prop as the resource name.

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
    AntdEditInferencer
} from "@pankod/refine-inferencer/antd";
// highlight-end

const App = () => {
    return (
        <Refine
            resources={[
                {
                    name: "posts",
                    // highlight-start
                    list: AntdListInferencer,
                    show: AntdShowInferencer,
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
    AntdEditInferencer
} from "@pankod/refine-inferencer/antd";
// highlight-end

const PostList = () => {
    return (
        // highlight-next-line
        <AntdListInferencer name="posts" />
    );
};

const PostShow = () => {
    return (
        // highlight-next-line
        <AntdShowInferencer name="posts" />
    );
};

const PostEdit = () => {
    return (
        // highlight-next-line
        <AntdEditInferencer name="posts" />
    );
};
```

  </TabItem>
</Tabs>

## Views

### `AntdListInferencer`

```tsx live hideCode previewHeight=600px url=http://localhost:3000/posts
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
    AntdEditInferencer
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
                    name: "posts",
                    // highlight-start
                    list: AntdListInferencer,
                    // highlight-end
                    show: AntdShowInferencer,
                    edit: AntdEditInferencer,
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
    );
};

// visible-block-end

render(<App/>);
```

### `AntdShowInferencer`

```tsx live hideCode previewHeight=600px url=http://localhost:3000/posts
setInitialRoutes(["/posts/show/1"]);

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
    AntdEditInferencer
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
                    name: "posts",
                    list: AntdListInferencer,
                    // highlight-start
                    show: AntdShowInferencer,
                    // highlight-end
                    edit: AntdEditInferencer,
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
    );
};

// visible-block-end

render(<App/>);
```

### `AntdEditInferencer`

```tsx live hideCode previewHeight=600px url=http://localhost:3000/posts
setInitialRoutes(["/posts/edit/1"]);

// visible-block-start
import { Refine } from "@pankod/refine-core";
import { Layout } from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

import {
    AntdListInferencer,
    AntdShowInferencer,
    // highlight-start
    AntdEditInferencer
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
                    name: "posts",
                    list: AntdListInferencer,
                    show: AntdShowInferencer,
                    // highlight-start
                    edit: AntdEditInferencer,
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
    );
};

// visible-block-end

render(<App/>);
```