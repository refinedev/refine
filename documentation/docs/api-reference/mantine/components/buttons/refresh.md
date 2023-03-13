---
id: refresh-button
title: Refresh
swizzle: true
---

```tsx live shared
const { default: routerProvider } = LegacyRefineReactRouterV6;
const { default: simpleRest } = RefineSimpleRest;
setRefineProps({
    legacyRouterProvider: routerProvider,
    dataProvider: simpleRest("https://api.fake-rest.refine.dev"),
    notificationProvider: RefineMantine.notificationProvider,
    Layout: RefineMantine.Layout,
    Sider: () => null,
    catchAll: <RefineMantine.ErrorComponent />,
});

const Wrapper = ({ children }) => {
    return (
        <MantineCore.MantineProvider
            theme={RefineMantine.LightTheme}
            withNormalizeCSS
            withGlobalStyles
        >
            <MantineCore.Global
                styles={{ body: { WebkitFontSmoothing: "auto" } }}
            />
            <MantineNotifications.NotificationsProvider position="top-right">
                {children}
            </MantineNotifications.NotificationsProvider>
        </MantineCore.MantineProvider>
    );
};
```

`<RefreshButton>` uses Mantine [`<Button>`](https://mantine.dev/core/button/) component to update the data shown on the page via the [`useOne`](/docs/api-reference/core/hooks/data/useOne/) method provided by your [`dataProvider`](/api-reference/core/providers/data-provider.md).

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/docs/packages/documentation/cli)
:::

## Usage

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=420px hideCode
setInitialRoutes(["/posts/show/123"]);
import { Refine } from "@refinedev/core";
import { ShowButton } from "@refinedev/mantine";

// visible-block-start
import { useShow } from "@refinedev/core";
import {
    Show,
    MarkdownField,
    //highlight-next-line
    RefreshButton,
} from "@refinedev/mantine";
import { Title, Text } from "@mantine/core";

const PostShow: React.FC = () => {
    const { queryResult } = useShow<IPost>();
    const { data, isLoading } = queryResult;
    const record = data?.data;

    return (
        // highlight-next-line
        <Show headerButtons={<RefreshButton />} isLoading={isLoading}>
            <Title order={5}>Id</Title>
            <Text mt="sm">{record?.id}</Text>

            <Title mt="sm" order={5}>
                Title
            </Title>
            <Text mt="sm">{record?.title}</Text>

            <Title mt="sm" order={5}>
                Content
            </Title>
            <MarkdownField value={record?.content} />
        </Show>
    );
};
// visible-block-end

const App = () => {
    return (
        <Refine
            resources={[
                {
                    name: "posts",
                    show: PostShow,
                    list: () => (
                        <div>
                            <p>This page is empty.</p>
                            <ShowButton recordItemId="123">
                                Show Item 123
                            </ShowButton>
                        </div>
                    ),
                },
            ]}
        />
    );
};
render(
    <Wrapper>
        <App />
    </Wrapper>,
);
```

## Properties

### `recordItemId`

`recordItemId` allows us to manage which data is going to be refreshed.

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/"]);
import { Refine } from "@refinedev/core";

// visible-block-start
import { RefreshButton } from "@refinedev/mantine";

const MyRefreshComponent = () => {
    return <RefreshButton recordItemId="123" />;
};
// visible-block-end

const App = () => {
    return (
        <Refine
            resources={[
                {
                    name: "posts",
                    list: MyRefreshComponent,
                },
            ]}
        />
    );
};

render(
    <Wrapper>
        <App />
    </Wrapper>,
);
```

Clicking the button will trigger the [`useOne`](/docs/api-reference/core/hooks/data/useOne/) method and then fetches the record whose resource is "post" and whose id is "123".

:::note
`<RefreshButton>` component reads the id information from the route by default.
:::

### `resource`

`resource` allows us to manage which resource is going to be refreshed.

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/"]);

import { Refine } from "@refinedev/core";

// visible-block-start
import { RefreshButton } from "@refinedev/mantine";

const MyRefreshComponent = () => {
    return (
        <RefreshButton resource="categories" recordItemId="2" />
    );
};
// visible-block-end

const App = () => {
    return (
        <Refine
            resources={[
                {
                    name: "posts",
                    list: MyRefreshComponent,
                },
            ]}
        />
    );
};

render(
    <Wrapper>
        <App />
    </Wrapper>,
);
```

Clicking the button will trigger the [`useOne`](/docs/api-reference/core/hooks/data/useOne/) method and then fetches the record whose resource is "categories" and whose id is "2".

:::note
`<RefreshButton>` component reads the resource name from the route by default.
:::

### `hideText`

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/"]);

import { Refine } from "@refinedev/core";

// visible-block-start
import { RefreshButton } from "@refinedev/mantine";

const MyRefreshComponent = () => {
    return <RefreshButton hideText recordItemId="123" />;
};
// visible-block-end

const App = () => {
    return (
        <Refine
            resources={[
                {
                    name: "posts",
                    list: MyRefreshComponent,
                },
            ]}
        />
    );
};

render(
    <Wrapper>
        <App />
    </Wrapper>,
);
```

### ~~`resourceNameOrRouteName`~~ <PropTag deprecated />

> `resourceNameOrRouteName` prop is deprecated. Use `resource` prop instead.

`resourceNameOrRouteName` allows us to manage which resource is going to be refreshed.

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/"]);

import { Refine } from "@refinedev/core";

// visible-block-start
import { RefreshButton } from "@refinedev/mantine";

const MyRefreshComponent = () => {
    return (
        <RefreshButton resourceNameOrRouteName="categories" recordItemId="2" />
    );
};
// visible-block-end

const App = () => {
    return (
        <Refine
            resources={[
                {
                    name: "posts",
                    list: MyRefreshComponent,
                },
            ]}
        />
    );
};

render(
    <Wrapper>
        <App />
    </Wrapper>,
);
```

Clicking the button will trigger the [`useOne`](/docs/api-reference/core/hooks/data/useOne/) method and then fetches the record whose resource is "categories" and whose id is "2".

:::note
`<RefreshButton>` component reads the resource name from the route by default.
:::

## API Reference

### Properties

<PropsTable module="@refinedev/mantine/RefreshButton" />
