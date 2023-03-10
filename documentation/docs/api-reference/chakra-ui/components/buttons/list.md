---
id: list-button
title: List
swizzle: true
---

```tsx live shared
const { default: sharedRouterProvider } = LegacyRefineReactRouterV6;
const { default: simpleRest } = RefineSimpleRest;
setRefineProps({
    legacyRouterProvider: sharedRouterProvider,
    dataProvider: simpleRest("https://api.fake-rest.refine.dev"),
    Layout: RefineChakra.Layout,
    Sider: () => null,
    catchAll: <RefineChakra.ErrorComponent />,
});

const Wrapper = ({ children }) => {
    return (
        <ChakraUI.ChakraProvider theme={RefineChakra.refineTheme}>
            {children}
        </ChakraUI.ChakraProvider>
    );
};
```

`<ListButton>` is using Chakra UI's [`<Button>`](https://chakra-ui.com/docs/components/button/usage) component. It uses the `list` method from [`useNavigation`](/api-reference/core/hooks/navigation/useNavigation.md) under the hood. It can be useful when redirecting the app to the list page route of resource.

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/docs/packages/documentation/cli)
:::

## Usage

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=420px hideCode
setInitialRoutes(["/posts/show/123"]);
import { Refine } from "@refinedev/core";
import { ShowButton } from "@refinedev/chakra-ui";

// visible-block-start
import { useShow } from "@refinedev/core";
import {
    Show,
    MarkdownField,
    //highlight-next-line
    ListButton,
} from "@refinedev/chakra-ui";
import { Heading, Text, Spacer } from "@chakra-ui/react";

const PostShow: React.FC = () => {
    const { queryResult } = useShow<IPost>();
    const { data, isLoading } = queryResult;
    const record = data?.data;

    return (
        // highlight-next-line
        <Show headerButtons={<ListButton />} isLoading={isLoading}>
            <Heading as="h5" size="sm">
                Id
            </Heading>
            <Text mt={2}>{record?.id}</Text>

            <Heading as="h5" size="sm" mt={4}>
                Title
            </Heading>
            <Text mt={2}>{record?.title}</Text>

            <Heading as="h5" size="sm" mt={4}>
                Content
            </Heading>
            <Spacer mt={2} />
            <MarkdownField value={record?.content} />
        </Show>
    );
};
// visible-block-end

const App = () => {
    return (
        <Refine
            notificationProvider={RefineChakra.notificationProvider()}
            resources={[
                {
                    name: "posts",
                    show: PostShow,
                    list: () => (
                        <RefineChakra.VStack alignItems="flex-start">
                            <RefineChakra.Text>
                                This page is empty.
                            </RefineChakra.Text>
                            <ShowButton colorScheme="black" recordItemId="123">
                                Show Item 123
                            </ShowButton>
                        </RefineChakra.VStack>
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

:::note
The button text is defined automatically by **refine** based on _resource_ object name property.
:::

## Properties

### `resource`

Redirection endpoint is defined by the `resource`'s `list` action path. By default, `<ListButton>` uses the inferred resource from the route.

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/"]);
import { Refine } from "@refinedev/core";

// visible-block-start
import { ListButton } from "@refinedev/chakra-ui";

const MyListComponent = () => {
    return (
        <ListButton colorScheme="black" resource="categories" />
    );
};
// visible-block-end

const ListPage = () => {
    const { list } = RefineCore.useNavigation();
    const params = RefineCore.useRouterContext().useParams();

    return (
        <RefineChakra.VStack alignItems="flex-start">
            <RefineChakra.Text as="i" color="gray.700" fontSize="sm">
                URL Parameters:
            </RefineChakra.Text>
            <RefineChakra.Code>{JSON.stringify(params)}</RefineChakra.Code>

            <RefineChakra.Button
                size="sm"
                onClick={() => list("posts")}
                colorScheme="green"
            >
                Go back
            </RefineChakra.Button>
        </RefineChakra.VStack>
    );
};

const App = () => {
    return (
        <Refine
            resources={[
                {
                    name: "posts",
                    list: MyListComponent,
                },
                {
                    name: "categories",
                    list: ListPage,
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

Clicking the button will trigger the `list` method of [`useNavigation`](/api-reference/core/hooks/navigation/useNavigation.md) and then redirect the app to the `list` action path of the resource, filling the necessary parameters in the route.

### `meta`

It is used to pass additional parameters to the `list` method of [`useNavigation`](/api-reference/core/hooks/navigation/useNavigation.md). By default, existing parameters in the route are used by the `list` method. You can pass additional parameters or override the existing ones using the `meta` prop.

If the `list` action route is defined by the pattern: `/:authorId/posts`, the `meta` prop can be used as follows:

```tsx
const MyComponent = () => {
    return (
        <ListButton meta={{ authorId: "10" }} />
    );
};
```

### `hideText`

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/"]);

import { Refine } from "@refinedev/core";

// visible-block-start
import { ListButton } from "@refinedev/chakra-ui";

const MyListComponent = () => {
    return <ListButton colorScheme="black" hideText />;
};
// visible-block-end

const App = () => {
    return (
        <Refine
            resources={[
                {
                    name: "posts",
                    list: MyListComponent,
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

### `accessControl`

This prop can be used to skip access control check with its `enabled` property or to hide the button when the user does not have the permission to access the resource with `hideIfUnauthorized` property. This is relevant only when an [`accessControlProvider`](/api-reference/core/providers/accessControl-provider.md) is provided to [`<Refine/>`](/api-reference/core/components/refine-config.md)

```tsx
import { ListButton } from "@refinedev/chakra-ui";

export const MyListComponent = () => {
    return (
        <ListButton
            accessControl={{ enabled: true, hideIfUnauthorized: true }}
        />
    );
};
```

### ~~`resourceNameOrRouteName`~~ <PropTag deprecated />

> `resourceNameOrRouteName` prop is deprecated. Use `resource` prop instead.

Redirection endpoint(`resourceNameOrRouteName/list`) is defined by `resourceNameOrRouteName` property. By default, `<ListButton>` uses `name` property of the resource object as the endpoint to redirect after clicking.

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/"]);
import { Refine } from "@refinedev/core";

// visible-block-start
import { ListButton } from "@refinedev/chakra-ui";

const MyListComponent = () => {
    return (
        <ListButton colorScheme="black" resourceNameOrRouteName="categories" />
    );
};
// visible-block-end

const ListPage = () => {
    const { list } = RefineCore.useNavigation();
    const params = RefineCore.useRouterContext().useParams();

    return (
        <RefineChakra.VStack alignItems="flex-start">
            <RefineChakra.Text as="i" color="gray.700" fontSize="sm">
                URL Parameters:
            </RefineChakra.Text>
            <RefineChakra.Code>{JSON.stringify(params)}</RefineChakra.Code>

            <RefineChakra.Button
                size="sm"
                onClick={() => list("posts")}
                colorScheme="green"
            >
                Go back
            </RefineChakra.Button>
        </RefineChakra.VStack>
    );
};

const App = () => {
    return (
        <Refine
            resources={[
                {
                    name: "posts",
                    list: MyListComponent,
                },
                {
                    name: "categories",
                    list: ListPage,
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

Clicking the button will trigger the `list` method of [`useNavigation`](/api-reference/core/hooks/navigation/useNavigation.md) and then redirect to `/categories`.

## API Reference

### Properties

<PropsTable module="@refinedev/chakra-ui/ListButton" />
