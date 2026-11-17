---
title: "useResourceSubscription Hook | Options, Patterns & Edge Cases in Refine v5"
display_title: "useResourceSubscription"
sidebar_label: "useResourceSubscription"
description: "Learn how to use the useResourceSubscription hook in Refine to create resource-scoped realtime subscriptions with automatic cache invalidation."
source: packages/core/src/hooks/live/useResourceSubscription/index.ts
---

`useResourceSubscription` is a realtime hook provided by Refine that subscribes to a realtime channel associated with a specific resource. It integrates with Refine's [`liveProvider`][live-provider] and automatically invalidates related resource queries when events arrive in `"auto"` live mode.

While Refine uses this hook internally within data hooks (such as `useList`, `useOne`, and `useMany`) when `liveMode` is enabled, you can also use it directly to build custom realtime subscriptions tailored to your resources.

## Usage

Here is a basic usage example:

```tsx
import { useResourceSubscription } from "@refinedev/core";

export const PostLiveNotifications = () => {
  useResourceSubscription({
    resource: "posts",
    channel: "resources/posts",
    types: ["*"],
    params: {
      subscriptionType: "useList",
    },
    onLiveEvent: (event) => {
      console.log("Realtime event received:", event);
    },
  });

  return <div>Listening for realtime post updates...</div>;
};
```

## Properties

### channel <PropTag required />

The name of the realtime channel to subscribe to via your `liveProvider`.

```tsx
useResourceSubscription({
  channel: "resources/posts",
  // ...
});
```

### types <PropTag required />

An array of event types to listen for (e.g. `["create", "update", "delete"]` or `["*"]` for all events).

```tsx
useResourceSubscription({
  types: ["create", "update"],
  // ...
});
```

### resource

The resource identifier or name. If omitted, Refine infers the resource from the active route.

```tsx
useResourceSubscription({
  resource: "comments",
  // ...
});
```

### params

Additional parameters passed to the `liveProvider.subscribe` method.

- `subscriptionType`: Specifies the subscription scope (`"useList"`, `"useOne"`, or `"useMany"`).
- `id`: The ID of a specific record (used for single-record subscriptions).
- `ids`: An array of record IDs (used for multi-record subscriptions).
- `filters`: Active filters to send to the live provider.
- `sorters`: Active sorters to send to the live provider.

```tsx
useResourceSubscription({
  channel: "resources/posts",
  types: ["*"],
  params: {
    subscriptionType: "useOne",
    id: 123,
  },
});
```

### liveMode

Controls how live events are processed:

- `"auto"` (default): Automatically invalidates queries for the resource on every event so that UI data stays fresh, and executes `onLiveEvent`.
- `"manual"`: Skips automatic query invalidation and only executes the `onLiveEvent` callback, allowing you to manually decide when to refetch or notify.
- `"off"`: Disables the realtime subscription completely.

```tsx
useResourceSubscription({
  liveMode: "manual",
  onLiveEvent: (event) => {
    if (event.type === "created") {
      showToast("A new post was added! Click to refresh.");
    }
  },
});
```

### onLiveEvent

Callback function invoked whenever an event is received from the channel.

```tsx
useResourceSubscription({
  onLiveEvent: (event) => {
    console.log("Live event payload:", event.payload);
  },
});
```

### enabled

> `boolean` | optional | default: `true`

Enables or disables the subscription. Setting `enabled: false` will clean up any existing subscription.

```tsx
useResourceSubscription({
  enabled: isRealtimeEnabled,
});
```

### meta

Additional metadata passed to the `liveProvider` and used for data provider selection via `dataProviderName`.

```tsx
useResourceSubscription({
  meta: {
    dataProviderName: "custom-live",
  },
});
```

[live-provider]: /docs/realtime/live-provider
