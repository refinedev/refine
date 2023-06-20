---
id: loading-overtime-indicator
title: <LoadingOvertimeIndicator>
swizzle: true
---

The `<LoadingOvertimeIndicator>` component is used to display a loading indicator when the page is taking too long to load. It is useful when you have a page that takes a long time to load and you want to let the user know that the page is still loading.

## Usage

### Usage based on `useLoadingOvertime` hook

By default, the `<LoadingOvertimeIndicator>` component uses the `useLoadingOvertime` hook internally. So, you can pass the `isLoading`, `interval`, and `onInterval` props to the component to customize its behavior.

```tsx
import { LoadingOvertimeIndicator, useOne } from "@refinedev/core";

const overtimeComponents = {
    4000: <div>It's taking a bit longer than expected.</div>,
    8000: <div>This is taking longer than expected, please hang on.</div>,
};

const MyPage = () => {
    const { data, isFetching } = useOne({...});

    return (
        <LoadingOvertimeIndicator
            overtimeComponents={overtimeComponents}
            isLoading={isFetching}
        >
            <YourComponent />
        </LoadingOvertimeIndicator>
    );
};
```

### Usage with `elapseTime`

If the `elapsedTime` prop is provided, the `<LoadingOvertimeIndicator>` component will use it to determine whether to show the indicator or not instead of using the `useLoadingOvertime` hook.

```tsx
import { LoadingOvertimeIndicator, useOne } from "@refinedev/core";

const overtimeComponents = {
    4000: <div>It's taking a bit longer than expected.</div>,
    8000: <div>This is taking longer than expected, please hang on.</div>,
};

const MyPage = () => {
    const {
        data,
        overtime: { elapsedTime },
    } = useOne({...});

    return (
        <LoadingOvertimeIndicator
            overtimeComponents={overtimeComponents}
            elapsedTime={elapsedTime}
        >
            <YourComponent />
        </LoadingOvertimeIndicator>
    );
};
```

<br />

:::info

The component will not accept both `elapsedTime` and `isLoading`, `interval`, and `onInterval` props at the same time. If you provide both, the component will work based on the `elapsedTime` prop.

:::

## Properties

### `overtimeComponents`

An object that contains the components to render based on the elapsed time. The key is the elapsed time in milliseconds and the value is the component to render.

If the `elapsedTime` is less than the key, the component will not be shown. If the `elapsedTime` is greater than the key, the component will be rendered.

```tsx
const overtimeComponents = {
    4000: <div>It's taking a bit longer than expected.</div>,
    8000: <div>This is taking longer than expected, please hang on.</div>,
};

<LoadingOvertimeIndicator
    overtimeComponents={overtimeComponents}
    elapsedTime={4000}
>
    {/* Children to render */}
</LoadingOvertimeIndicator>;
```

### `elapsedTime`

The elapsed time in milliseconds. If provided, the component will use it to determine whether to show the indicator or not instead of using the `useLoadingOvertime` hook.

```tsx
<LoadingOvertimeIndicator
    overtimeComponents={overtimeComponents}
    elapsedTime={4000}
>
    {/* Children to render */}
</LoadingOvertimeIndicator>
```

### `isLoading`

A boolean value that indicates whether the page is loading or not. If provided, the component will pass it to the `useLoadingOvertime` hook to calculate the elapsed time.

```tsx
<LoadingOvertimeIndicator
    overtimeComponents={overtimeComponents}
    isLoading={true}
>
    {/* Children to render */}
</LoadingOvertimeIndicator>
```

### `interval`

The interval in milliseconds to check the elapsed time. If provided, the component will pass it to the `useLoadingOvertime` hook to set the interval.

```tsx
<LoadingOvertimeIndicator
    overtimeComponents={overtimeComponents}
    interval={1000}
>
    {/* Children to render */}
</LoadingOvertimeIndicator>
```

### `onInterval`

A callback function that will be called on every interval. If provided, the component will pass it to the `useLoadingOvertime` hook to set the callback function.

```tsx
<LoadingOvertimeIndicator
    overtimeComponents={overtimeComponents}
    onInterval={() => console.log("Interval")}
>
    {/* Children to render */}
</LoadingOvertimeIndicator>
```

## API Reference

### Properties

<PropsTable module="@refinedev/core/LoadingOvertimeIndicator"/>
