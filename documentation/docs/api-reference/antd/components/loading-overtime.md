---
id: loading-overtime
title: <LoadingOvertime>
swizzle: true
---

The `<LoadingOvertime>` component is used to display a loading indicator when the page is taking too long to load. It is useful when you have a page that takes a long time to load and you want to let the user know that the page is still loading.

By default, the `<LoadingOvertime>` has two components that will be shown based on the elapsed time. The first component will be shown when the elapsed time is greater than 3000 milliseconds. The second component will be shown when the elapsed time is greater than 5000 milliseconds.

## Usage

### Usage based on `isLoading`

The `<LoadingOvertime>` component calculates the elapsed time based when the `isLoading` prop is `true`. You can provide the `interval` and `onInterval` props to customize the interval and the callback function that will be called on every interval.

```tsx
import { useOne } from "@refinedev/core";
import { LoadingOvertime } from "@refinedev/antd";

const MyPage = () => {
    const { data, isFetching } = useOne({...});

    return (
        <LoadingOvertime
            isLoading={isFetching ?? false}
            interval={1000}
            onInterval={(elapsedInterval) => console.log("elapsedInterval")}
        >
            <YourComponent />
        </LoadingOvertime>
    );
};
```

-   If elapsed time is less than 3000 milliseconds, only the children will be shown.
-   If elapsed time is greater than 3000 milliseconds, the matching component and children will be shown.
-   If elapsed time is greater than 5000 milliseconds, the matching component and children will be shown.

### Usage based on `elapsedTime`

If the `elapsedTime` prop is provided, the `<LoadingOvertime>` component will use it to determine whether to show the indicator or not. So, it will not calculate the elapsed time.

```tsx
import { useOne } from "@refinedev/core";
import { LoadingOvertime } from "@refinedev/antd";

const MyPage = () => {
    const {
        data,
        overtime: { elapsedTime },
    } = useOne({...});

    return (
        <LoadingOvertime
            elapsedTime={elapsedTime ?? 0}
        >
            <YourComponent />
        </LoadingOvertime>
    );
};
```

Same as the previous example, if the `elapsedTime` is less than 3000 milliseconds, only the children will be shown. If the `elapsedTime` is greater than 3000 milliseconds, the matching component and children will be shown. If the `elapsedTime` is greater than 5000 milliseconds, the matching component and children will be shown.

<br />

:::tip

You can use this component without children. In this case, the component will only render the indicator.

```tsx
<LoadingOvertime elapsedTime={4000} />
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
import { LoadingOvertime, overtimeComponents } from "@refinedev/antd";
import { Alert } from "antd";

const customOvertimeComponents = {
    ...overtimeComponents,
    2000: (
        <Alert
            message="Still loading..."
            type="warning"
            showIcon
            closable
            style={{ marginBottom: "1rem" }}
        />
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
<LoadingOvertime elapsedTime={4000}>
    {/* Children to render */}
</LoadingOvertime>
```

### `isLoading`

A boolean value that indicates whether the page is loading or not. When the value is `true`, the component will calculate the elapsed time. When the value is `false`, the component will not render the indicator.

```tsx
<LoadingOvertime isLoading={true}>
    {/* Children to render */}
</LoadingOvertime>
```

### `interval`

The interval in milliseconds to calculate the elapsed time. The default value is `1000` milliseconds.

```tsx
<LoadingOvertime interval={500}>
    {/* Children to render */}
</LoadingOvertime>
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

<PropsTable module="@refinedev/antd/LoadingOvertime"/>
