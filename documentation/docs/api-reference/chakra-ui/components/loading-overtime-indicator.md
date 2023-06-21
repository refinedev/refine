---
id: loading-overtime-indicator
title: <LoadingOvertimeIndicator>
swizzle: true
---

The `<LoadingOvertimeIndicator>` component is used to display a loading indicator when the page is taking too long to load. It is useful when you have a page that takes a long time to load and you want to let the user know that the page is still loading.

By default, the `<LoadingOvertimeIndicator>` has two components that will be shown based on the elapsed time. The first component will be shown when the elapsed time is greater than 3000 milliseconds. The second component will be shown when the elapsed time is greater than 5000 milliseconds.

## Usage

### Usage based on `isLoading`

The `<LoadingOvertimeIndicator>` component calculates the elapsed time based when the `isLoading` prop is `true`. You can provide the `interval` and `onInterval` props to customize the interval and the callback function that will be called on every interval.

```tsx
import { useOne } from "@refinedev/core";
import { LoadingOvertimeIndicator } from "@refinedev/chakra-ui";

const MyPage = () => {
    const { data, isFetching } = useOne({...});

    return (
        <LoadingOvertimeIndicator
            isLoading={isFetching ?? true}
            interval={1000}
            onInterval={(elapsedInterval) => console.log("elapsedInterval")}
        >
            <YourComponent />
        </LoadingOvertimeIndicator>
    );
};
```

-   If elapsed time is less than 3000 milliseconds, only the children will be shown.
-   If elapsed time is greater than 3000 milliseconds, the matching component and children will be shown.
-   If elapsed time is greater than 5000 milliseconds, the matching component and children will be shown.

### Usage based on `elapsedTime`

If the `elapsedTime` prop is provided, the `<LoadingOvertimeIndicator>` component will use it to determine whether to show the indicator or not. So, it will not calculate the elapsed time.

```tsx
import { useOne } from "@refinedev/core";
import { LoadingOvertimeIndicator } from "@refinedev/chakra-ui";

const MyPage = () => {
    const {
        data,
        overtime: { elapsedTime },
    } = useOne({...});

    return (
        <LoadingOvertimeIndicator
            elapsedTime={elapsedTime ?? 0}
        >
            <YourComponent />
        </LoadingOvertimeIndicator>
    );
};
```

Same as the previous example, if the `elapsedTime` is less than 3000 milliseconds, only the children will be shown. If the `elapsedTime` is greater than 3000 milliseconds, the matching component and children will be shown. If the `elapsedTime` is greater than 5000 milliseconds, the matching component and children will be shown.

<br />

:::tip

You can use this component without children. In this case, the component will only render the indicator.

```tsx
<LoadingOvertimeIndicator elapsedTime={4000} />
```

:::

:::info

The component will not accept both `elapsedTime` and `isLoading`, `interval`, and `onInterval` props at the same time. If you provide both, the component will work based on the `elapsedTime` prop.

:::

## Properties

### `overtimeComponents`

An object that contains the components to render based on the elapsed time. The key is the elapsed time in milliseconds.

If the `elapsedTime` is less than the key, the component only renders the children. If the `elapsedTime` is greater than the key, the component renders the matching component based on key and children.

```tsx
import {
    LoadingOvertimeIndicator,
    overtimeComponents,
} from "@refinedev/chakra-ui";
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

<LoadingOvertimeIndicator
    overtimeComponents={customOvertimeComponents}
    elapsedTime={2000}
>
    {/* Children to render */}
</LoadingOvertimeIndicator>;
```

### `elapsedTime`

The elapsed time in milliseconds. If provided, the component will use it to determine whether to show the indicator or not. So, it will not calculate the elapsed time.

```tsx
<LoadingOvertimeIndicator elapsedTime={4000}>
    {/* Children to render */}
</LoadingOvertimeIndicator>
```

### `isLoading`

A boolean value that indicates whether the page is loading or not. When the value is `true`, the component will calculate the elapsed time. When the value is `false`, the component will not render the indicator.

```tsx
<LoadingOvertimeIndicator isLoading={true}>
    {/* Children to render */}
</LoadingOvertimeIndicator>
```

### `interval`

The interval in milliseconds to calculate the elapsed time. The default value is `1000` milliseconds.

```tsx
<LoadingOvertimeIndicator interval={500}>
    {/* Children to render */}
</LoadingOvertimeIndicator>
```

### `onInterval`

A callback function that will be called on every interval. The callback function will receive the elapsed time in milliseconds as the first argument.

```tsx
<LoadingOvertimeIndicator
    onInterval={(elapsedInterval) =>
        console.log("elapsedInterval: ", elapsedInterval)
    }
>
    {/* Children to render */}
</LoadingOvertimeIndicator>
```

## API Reference

### Properties

<PropsTable module="@refinedev/chakra-ui/LoadingOvertimeIndicator"/>
