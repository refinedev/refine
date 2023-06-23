---
id: loading-overtime
title: <LoadingOvertime>
swizzle: true
---

```tsx live shared
setRefineProps({
    Layout: RefineChakra.Layout,
    Sider: () => null,
});

const Wrapper = ({ children }) => {
    return (
        <ChakraUI.ChakraProvider theme={RefineChakra.refineTheme}>
            {children}
        </ChakraUI.ChakraProvider>
    );
};
```

The `<LoadingOvertime>` component is used to display a loading indicator when the page is taking too long to load. It is useful when you have a page that takes a long time to load and you want to let the user know that the page is still loading.

By default, the `<LoadingOvertime>` has two components that will be shown based on the elapsed time. The first component will be shown when the elapsed time is greater than 3000 milliseconds. The second component will be shown when the elapsed time is greater than 5000 milliseconds.

## Usage

### Usage based on `isLoading`

The `<LoadingOvertime>` component calculates the elapsed time based when the `isLoading` prop is `true`. You can provide the `interval` and `onInterval` props to customize the interval and the callback function that will be called on every interval.

```tsx live url=http://localhost:3000/posts/show/123
setInitialRoutes(["/posts/show/123"]);
import { Refine } from "@refinedev/core";
import { ShowButton } from "@refinedev/chakra-ui";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { useShow } from "@refinedev/core";
//highlight-next-line
import { Show, MarkdownField, LoadingOvertime } from "@refinedev/chakra-ui";
import { Heading, Text, Spacer } from "@chakra-ui/react";

const PostShow: React.FC = () => {
    const { queryResult } = useShow<IPost>();
    //highlight-next-line
    const { data, isLoading, isFetching } = queryResult;
    const record = data?.data;

    return (
        //highlight-start
        <LoadingOvertime
            isLoading={isLoading || isFetching}
            interval={1000}
            onInterval={(elapsedInterval) => console.log("elapsedInterval")}
        >
            {/* highlight-end */}
            <Show isLoading={isLoading}>
                <Heading as="h5" size="sm">
                    Id
                </Heading>
                <Text mt={2}>{record?.id}</Text>

                <Heading as="h5" size="sm" mt={4}>
                    Title
                </Heading>
                <Text mt={2}>{record?.title}</Text>

                <Heading as="h5" size="sm" mt={4}>
                    Status
                </Heading>
                <Text mt={2}>{record?.status}</Text>

                <Heading as="h5" size="sm" mt={4}>
                    Content
                </Heading>
                <Spacer mt={2} />
                <MarkdownField value={record?.content} />
            </Show>
            {/* highlight-next-line */}
        </LoadingOvertime>
    );
};
// visible-block-end

const API_URL = "https://api.fake-rest.refine.dev";

const customDataProvider = {
    ...dataProvider(API_URL),
    getOne: async (params) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(dataProvider(API_URL).getOne(params));
            }, 6000);
        });
    },
};

const App = () => {
    return (
        <RefineHeadlessDemo
            notificationProvider={RefineChakra.notificationProvider()}
            legacyRouterProvider={routerProvider}
            dataProvider={customDataProvider}
            options={{
                reactQuery: {
                    clientConfig: {
                        defaultOptions: {
                            queries: {
                                cacheTime: 0,
                            },
                        },
                    },
                },
            }}
            resources={[
                {
                    name: "posts",
                    show: PostShow,
                    list: () => (
                        <div>
                            <p>This page is empty.</p>
                            <ShowButton recordItemId="123">
                                Show Details
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

-   If elapsed time is less than 3000 milliseconds, only the children will be shown.
-   If elapsed time is greater than 3000 milliseconds, the matching component and children will be shown.
-   If elapsed time is greater than 5000 milliseconds, the matching component and children will be shown.

### Usage based on `elapsedTime`

If the `elapsedTime` prop is provided, the `<LoadingOvertime>` component will use it to determine whether to show the indicator or not. So, it will not calculate the elapsed time.

```tsx live url=http://localhost:3000/posts/show/123
setInitialRoutes(["/posts/show/123"]);
import { Refine } from "@refinedev/core";
import { ShowButton } from "@refinedev/chakra-ui";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { useShow } from "@refinedev/core";
//highlight-next-line
import { Show, MarkdownField, LoadingOvertime } from "@refinedev/chakra-ui";
import { Heading, Text, Spacer } from "@chakra-ui/react";

const PostShow: React.FC = () => {
    //highlight-next-line
    const { queryResult, overtime } = useShow<IPost>();
    const { data, isLoading } = queryResult;
    const record = data?.data;

    return (
        //highlight-start
        <LoadingOvertime elapsedTime={overtime.elapsedTime}>
            {/* highlight-end */}
            <Show isLoading={isLoading}>
                <Heading as="h5" size="sm">
                    Id
                </Heading>
                <Text mt={2}>{record?.id}</Text>

                <Heading as="h5" size="sm" mt={4}>
                    Title
                </Heading>
                <Text mt={2}>{record?.title}</Text>

                <Heading as="h5" size="sm" mt={4}>
                    Status
                </Heading>
                <Text mt={2}>{record?.status}</Text>

                <Heading as="h5" size="sm" mt={4}>
                    Content
                </Heading>
                <Spacer mt={2} />
                <MarkdownField value={record?.content} />
            </Show>
            {/* highlight-next-line */}
        </LoadingOvertime>
    );
};
// visible-block-end

const API_URL = "https://api.fake-rest.refine.dev";

const customDataProvider = {
    ...dataProvider(API_URL),
    getOne: async (params) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(dataProvider(API_URL).getOne(params));
            }, 6000);
        });
    },
};

const App = () => {
    return (
        <RefineHeadlessDemo
            notificationProvider={RefineChakra.notificationProvider()}
            legacyRouterProvider={routerProvider}
            dataProvider={customDataProvider}
            options={{
                reactQuery: {
                    clientConfig: {
                        defaultOptions: {
                            queries: {
                                cacheTime: 0,
                            },
                        },
                    },
                },
            }}
            resources={[
                {
                    name: "posts",
                    show: PostShow,
                    list: () => (
                        <div>
                            <p>This page is empty.</p>
                            <ShowButton recordItemId="123">
                                Show Details
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

Same as the previous example, if the `elapsedTime` is less than 3000 milliseconds, only the children will be shown. If the `elapsedTime` is greater than 3000 milliseconds, the matching component and children will be shown. If the `elapsedTime` is greater than 5000 milliseconds, the matching component and children will be shown.

<br />

:::tip

You can use this component without children. In this case, the component will only render the indicator.

```tsx
<LoadingOvertime elapsedTime={4000} />
```

:::

:::caution

The component will not accept both `elapsedTime` and `isLoading`, `interval`, and `onInterval` props at the same time. If you provide both, the component will work based on the `elapsedTime` prop.

:::

## Properties

### `overtimeComponents`

An object that contains the components to render based on the elapsed time. The key is the elapsed time in milliseconds.

If the `elapsedTime` is less than the key, the component only renders the children. If the `elapsedTime` is greater than the key, the component renders the matching component based on key and children.

```tsx
import { LoadingOvertime, overtimeComponents } from "@refinedev/chakra-ui";
import { Alert, AlertIcon } from "@chakra-ui/react";

const customOvertimeComponents = {
    ...overtimeComponents,
    2000: (
        <Alert status="warning" mb="4">
            <AlertIcon />
            Still loading...
        </Alert>
    ),
};

<LoadingOvertime
    overtimeComponents={customOvertimeComponents}
    elapsedTime={2000}
>
    {/* Children to render */}
</LoadingOvertime>;
```

### `elapsedTime`

The elapsed time in milliseconds. If provided, the component will use it to determine whether to show the indicator or not. So, it will not calculate the elapsed time.

```tsx
<LoadingOvertime elapsedTime={4000}>{/* Children to render */}</LoadingOvertime>
```

### `isLoading`

A boolean value that indicates whether the page is loading or not. When the value is `true`, the component will calculate the elapsed time. When the value is `false`, the component will not render the indicator.

```tsx
<LoadingOvertime isLoading={true}>{/* Children to render */}</LoadingOvertime>
```

### `interval`

The interval in milliseconds to calculate the elapsed time. The default value is `1000` milliseconds.

```tsx
<LoadingOvertime interval={500}>{/* Children to render */}</LoadingOvertime>
```

### `onInterval`

A callback function that will be called on every interval. The callback function will receive the elapsed time in milliseconds as the first argument.

```tsx
<LoadingOvertime
    onInterval={(elapsedInterval) =>
        console.log("elapsedInterval: ", elapsedInterval)
    }
>
    {/* Children to render */}
</LoadingOvertime>
```

## API Reference

### Properties

<PropsTable 
    module="@refinedev/chakra-ui/LoadingOvertime"
    overtimeComponents-default="`overTimeComponents` comes from `@refinedev/chakra-ui`"
    isLoading-default="`false`"
    elapsedTime-description="The elapsed time in milliseconds. If this prop is provided, the component will not calculate the elapsed time itself."
    elapsedTime-type="`number | undefined`"
    elapsedTime-default="0"
/>
