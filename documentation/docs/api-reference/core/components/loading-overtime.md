---
id: loading-overtime
title: <LoadingOvertime>
swizzle: true
---

The `<LoadingOvertime>` component is used to display a loading indicator when the page is taking too long to load. It is useful when you have a page that takes a long time to load and you want to let the user know that the page is still loading.

## Usage

### Usage based on `isLoading`

The `<LoadingOvertime>` component calculates the elapsed time based when the `isLoading` prop is `true`. You can provide the `interval` and `onInterval` props to customize the interval and the callback function that will be called on every interval.

```tsx live url=http://localhost:3000/posts/show/123
setInitialRoutes(["/posts/show/123"]);
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
//highlight-next-line
import { useShow, LoadingOvertime } from "@refinedev/core";

//highlight-start
const overtimeComponents = {
    3000: (
        <p style={{ background: "orange" }}>
            It's taking a bit longer than expected.
        </p>
    ),
    5000: (
        <p style={{ background: "orange" }}>
            This is taking longer than expected, please hang on.
        </p>
    ),
};
//highlight-end

const PostShow: React.FC = () => {
    const { queryResult } = useShow<IPost>();
    //highlight-next-line
    const { data, isFetching, refetch } = queryResult;
    const record = data?.data;

    return (
        //highlight-start
        <LoadingOvertime
            overtimeComponents={overtimeComponents}
            isLoading={isFetching}
            interval={1000}
            onInterval={(elapsedInterval) => console.log("elapsedInterval")}
        >
            {/* highlight-end */}
            <button onClick={() => refetch()}>Refresh</button>
            <div>
                {isFetching ? (
                    "Loading..."
                ) : (
                    <>
                        <label>Id</label>
                        <p>{record?.id}</p>

                        <label>Title</label>
                        <p>{record?.title}</p>

                        <label>Status</label>
                        <p>{record?.status}</p>

                        <label>Content</label>
                        <p>{record?.content}</p>
                    </>
                )}
            </div>
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
render(<App />);
```

-   If elapsed time is less than 3000 milliseconds, only the children will be shown.
-   If elapsed time is greater than 3000 milliseconds, the matching component and children will be shown.
-   If elapsed time is greater than 5000 milliseconds, the matching component and children will be shown.

### Usage based on `elapsedTime`

If the `elapsedTime` prop is provided, the `<LoadingOvertime>` component will use it to determine whether to show the indicator or not. So, it will not calculate the elapsed time.

```tsx live url=http://localhost:3000/posts/show/123
setInitialRoutes(["/posts/show/123"]);
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
//highlight-next-line
import { useShow, LoadingOvertime } from "@refinedev/core";

//highlight-start
const overtimeComponents = {
    3000: (
        <p style={{ background: "orange" }}>
            It's taking a bit longer than expected.
        </p>
    ),
    5000: (
        <p style={{ background: "orange" }}>
            This is taking longer than expected, please hang on.
        </p>
    ),
};
//highlight-end

const PostShow: React.FC = () => {
    const { queryResult } = useShow<IPost>();
    //highlight-next-line
    const { data, isFetching, refetch, overtime } = queryResult;
    const record = data?.data;

    return (
        //highlight-start
        <LoadingOvertime
            overtimeComponents={overtimeComponents}
            elapsedTime={overtime.elapsedTime}
        >
            {/* highlight-end */}
            <button onClick={() => refetch()}>Refresh</button>
            <div>
                {isFetching ? (
                    "Loading..."
                ) : (
                    <>
                        <label>Id</label>
                        <p>{record?.id}</p>

                        <label>Title</label>
                        <p>{record?.title}</p>

                        <label>Status</label>
                        <p>{record?.status}</p>

                        <label>Content</label>
                        <p>{record?.content}</p>
                    </>
                )}
            </div>
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
render(<App />);
```

Same as the previous example:

-   If the `elapsedTime` is less than 3000 milliseconds, only the children will be shown.
-   If the `elapsedTime` is greater than 3000 milliseconds, the first component and children will be shown.
-   If the `elapsedTime` is greater than 5000 milliseconds, the second component and children will be shown.

<br />

:::tip

You can use this component without children. In this case, the component will only render `overtimeComponents` based on the elapsed time.

```tsx
<LoadingOvertime overtimeComponents={overtimeComponents} elapsedTime={4000} />
```

:::

:::caution

The component will not accept both `elapsedTime` and `isLoading`, `interval`, and `onInterval` props at the same time. If you provide both, the component will work based on the `elapsedTime` prop.

:::

## Properties

### `overtimeComponents`

An object that contains the components to render based on the elapsed time. The key is the elapsed time in milliseconds.

If the `elapsedTime` is less than the key, the component only renders the children. If the `elapsedTime` is greater than the key, the component renders matching component based on key and children.

```tsx
const overtimeComponents = {
    3000: <p>It's taking a bit longer than expected.</p>,
    5000: <p>This is taking longer than expected, please hang on.</p>,
};

<LoadingOvertime overtimeComponents={overtimeComponents} elapsedTime={4000}>
    {/* Children to render */}
</LoadingOvertime>;
```

### `elapsedTime`

The elapsed time in milliseconds. If provided, the component will use it to determine whether to show the indicator or not. So, it will not calculate the elapsed time.

```tsx
const overtimeComponents = {
    3000: <p>It's taking a bit longer than expected.</p>,
    5000: <p>This is taking longer than expected, please hang on.</p>,
};

<LoadingOvertime overtimeComponents={overtimeComponents} elapsedTime={4000}>
    {/* Children to render */}
</LoadingOvertime>;
```

### `isLoading`

A boolean value that indicates whether the page is loading or not. When the value is `true`, the component will calculate the elapsed time. When the value is `false`, the component will not render the indicator.

```tsx
const overtimeComponents = {
    3000: <p>It's taking a bit longer than expected.</p>,
    5000: <p>This is taking longer than expected, please hang on.</p>,
};

<LoadingOvertime overtimeComponents={overtimeComponents} isLoading={true}>
    {/* Children to render */}
</LoadingOvertime>;
```

### `interval`

The interval in milliseconds to calculate the elapsed time. The default value is `1000` milliseconds.

```tsx
const overtimeComponents = {
    3000: <p>It's taking a bit longer than expected.</p>,
    5000: <p>This is taking longer than expected, please hang on.</p>,
};

<LoadingOvertime overtimeComponents={overtimeComponents} interval={500}>
    {/* Children to render */}
</LoadingOvertime>;
```

### `onInterval`

A callback function that will be called on every interval. The callback function will receive the elapsed time in milliseconds as the first argument.

```tsx
const overtimeComponents = {
    3000: <p>It's taking a bit longer than expected.</p>,
    5000: <p>This is taking longer than expected, please hang on.</p>,
};

<LoadingOvertime
    overtimeComponents={overtimeComponents}
    onInterval={(elapsedInterval) =>
        console.log("elapsedInterval: ", elapsedInterval)
    }
>
    {/* Children to render */}
</LoadingOvertime>;
```

## API Reference

### Properties

<PropsTable 
    module="@refinedev/core/LoadingOvertime" 
    isLoading-default="`false`"
    elapsedTime-description="The elapsed time in milliseconds. If this prop is provided, the component will not calculate the elapsed time itself."
    elapsedTime-type="`number | undefined`"
    elapsedTime-default="0"
/>
