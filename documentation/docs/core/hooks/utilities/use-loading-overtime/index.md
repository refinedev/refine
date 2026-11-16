---
title: "useLoadingOvertime Hook | Refine v5"
display_title: "useLoadingOvertime"
sidebar_label: "useLoadingOvertime"
description: "Learn how to use the useLoadingOvertime hook in Refine to handle extended loading states and show delayed feedback."
source: /packages/core/src/hooks/useLoadingOvertime
---

`useLoadingOvertime` is a utility hook provided by Refine that tracks whether an ongoing operation has exceeded a specified duration. It returns the elapsed time in milliseconds and can invoke a callback when loading takes longer than expected, making it ideal for displaying delayed loading messages or fallback feedback.

## Usage

You can use `useLoadingOvertime` by passing the current loading state of a query or mutation:

```tsx
import { useLoadingOvertime } from "@refinedev/core";

export const LoadingIndicator = ({ isLoading }: { isLoading: boolean }) => {
  const { elapsedTime } = useLoadingOvertime({
    isLoading,
    interval: 1000,
    onInterval: (elapsedInterval) => {
      console.log(`Operation loading overtime: ${elapsedInterval}ms`);
    },
  });

  if (!isLoading) {
    return null;
  }

  return (
    <div>
      <span>Loading...</span>
      {elapsedTime && elapsedTime >= 3000 && (
        <p>This request is taking longer than usual. Please wait...</p>
      )}
    </div>
  );
};
```

## Properties

### isLoading

> `boolean`

The loading state to track. When `true`, elapsed time calculation begins. When `false`, the timer stops and `elapsedTime` resets to `undefined`.

```tsx
const { elapsedTime } = useLoadingOvertime({
  isLoading: isFetching,
});
```

### interval

> `number` | optional | default: `1000`

The interval in milliseconds at which elapsed time increments and `onInterval` is triggered. If not specified, Refine will use the `interval` value configured in the `overtime` option of the `<Refine>` component.

```tsx
const { elapsedTime } = useLoadingOvertime({
  isLoading,
  interval: 500,
});
```

### onInterval

> `(elapsedInterval: number) => void` | optional

A callback function that is invoked every time the interval elapses while `isLoading` is `true`. Receives the total elapsed time in milliseconds. If not provided directly to the hook, Refine falls back to `overtime.onInterval` configured in the `<Refine>` component options.

```tsx
const { elapsedTime } = useLoadingOvertime({
  isLoading,
  onInterval: (elapsed) => {
    if (elapsed >= 5000) {
      notifyUser("Still working on your request...");
    }
  },
});
```

### enabled

> `boolean` | optional | default: `true`

Controls whether elapsed time calculation is active. If set to `false`, `elapsedTime` will remain `undefined`. Defaults to `true`, or to `options.overtime.enabled` from the `<Refine>` context.

```tsx
const { elapsedTime } = useLoadingOvertime({
  isLoading,
  enabled: isSlowNetworkDetected,
});
```

## Global Configuration

You can configure global overtime defaults via the `options.overtime` property on `<Refine>`:

```tsx
import { Refine } from "@refinedev/core";

<Refine
  options={{
    overtime: {
      interval: 1000,
      onInterval: (elapsedInterval) => {
        console.warn(`Global loading overtime: ${elapsedInterval}ms`);
      },
      enabled: true,
    },
  }}
>
  {/* App components */}
</Refine>;
```

Any options passed directly to `useLoadingOvertime` will override these global defaults.

## Return Values

### elapsedTime

> `number | undefined`

The total time in milliseconds that has elapsed since loading began, updated at each `interval`. When `isLoading` is `false`, it resets to `undefined`.
