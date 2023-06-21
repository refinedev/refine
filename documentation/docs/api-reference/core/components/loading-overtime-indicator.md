---
id: loading-overtime-indicator
title: <LoadingOvertimeIndicator>
swizzle: true
---

The `<LoadingOvertimeIndicator>` component is used to display a loading indicator when the page is taking too long to load. It is useful when you have a page that takes a long time to load and you want to let the user know that the page is still loading.

## Usage

### Usage based on `isLoading`

The `<LoadingOvertimeIndicator>` component calculates the elapsed time based when the `isLoading` prop is `true`. You can provide the `interval` and `onInterval` props to customize the interval and the callback function that will be called on every interval.

```tsx
import { LoadingOvertimeIndicator, useOne } from "@refinedev/core";

const overtimeComponents = {
    3000: <p>It's taking a bit longer than expected.</p>,
    5000: <p>This is taking longer than expected, please hang on.</p>,
};

const MyPage = () => {
    const { data, isFetching } = useOne({...});

    return (
        <LoadingOvertimeIndicator
            overtimeComponents={overtimeComponents}
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
import { LoadingOvertimeIndicator, useOne } from "@refinedev/core";

const overtimeComponents = {
    3000: <p>It's taking a bit longer than expected.</p>,
    5000: <p>This is taking longer than expected, please hang on.</p>,
};

const MyPage = () => {
    const {
        data,
        overtime: { elapsedTime },
    } = useOne({...});

    return (
        <LoadingOvertimeIndicator
            overtimeComponents={overtimeComponents}
            elapsedTime={elapsedTime ?? 0}
        >
            <YourComponent />
        </LoadingOvertimeIndicator>
    );
};
```

Same as the previous example:

-   If the `elapsedTime` is less than 3000 milliseconds, only the children will be shown.
-   If the `elapsedTime` is greater than 3000 milliseconds, the first component and children will be shown.
-   If the `elapsedTime` is greater than 5000 milliseconds, the second component and children will be shown.

<br />

:::tip

You can use this component without children. In this case, the component will only render `overtimeComponents` based on the elapsed time.

```tsx
<LoadingOvertimeIndicator
    overtimeComponents={overtimeComponents}
    elapsedTime={4000}
/>
```

:::

:::info

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

<LoadingOvertimeIndicator
    overtimeComponents={overtimeComponents}
    elapsedTime={4000}
>
    {/* Children to render */}
</LoadingOvertimeIndicator>;
```

### `elapsedTime`

The elapsed time in milliseconds. If provided, the component will use it to determine whether to show the indicator or not. So, it will not calculate the elapsed time.

```tsx
const overtimeComponents = {
    3000: <p>It's taking a bit longer than expected.</p>,
    5000: <p>This is taking longer than expected, please hang on.</p>,
};

<LoadingOvertimeIndicator
    overtimeComponents={overtimeComponents}
    elapsedTime={4000}
>
    {/* Children to render */}
</LoadingOvertimeIndicator>;
```

### `isLoading`

A boolean value that indicates whether the page is loading or not. When the value is `true`, the component will calculate the elapsed time. When the value is `false`, the component will not render the indicator.

```tsx
const overtimeComponents = {
    3000: <p>It's taking a bit longer than expected.</p>,
    5000: <p>This is taking longer than expected, please hang on.</p>,
};

<LoadingOvertimeIndicator
    overtimeComponents={overtimeComponents}
    isLoading={true}
>
    {/* Children to render */}
</LoadingOvertimeIndicator>;
```

### `interval`

The interval in milliseconds to calculate the elapsed time. The default value is `1000` milliseconds.

```tsx
const overtimeComponents = {
    3000: <p>It's taking a bit longer than expected.</p>,
    5000: <p>This is taking longer than expected, please hang on.</p>,
};

<LoadingOvertimeIndicator
    overtimeComponents={overtimeComponents}
    interval={500}
>
    {/* Children to render */}
</LoadingOvertimeIndicator>;
```

### `onInterval`

A callback function that will be called on every interval. The callback function will receive the elapsed time in milliseconds as the first argument.

```tsx
const overtimeComponents = {
    3000: <p>It's taking a bit longer than expected.</p>,
    5000: <p>This is taking longer than expected, please hang on.</p>,
};

<LoadingOvertimeIndicator
    overtimeComponents={overtimeComponents}
    onInterval={(elapsedInterval) =>
        console.log("elapsedInterval: ", elapsedInterval)
    }
>
    {/* Children to render */}
</LoadingOvertimeIndicator>;
```

## API Reference

### Properties

<PropsTable module="@refinedev/core/LoadingOvertimeIndicator"/>
