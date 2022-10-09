---
id: useSubscription
title: useSubscription
---

It is used to subscribe to a Realtime channel. It returns the `subscribe` method from [`liveProvider`](/api-reference/core/providers/live-provider.md#subscribe) under the hood.

## Usage

:::caution
This hook can only be used if `liveProvider` is provided.
:::

```tsx
import { useSubscription } from "@pankod/refine-core";

useSubscription({
    channel: "channel-name",
    types: ["event-name", "another-event-name"]
    onLiveEvent: (event) => {},
});
```

:::info

You can publish events with [`usePublish`](/api-reference/core/hooks/live/usePublish.md).
:::

## API Reference

### Properties

<PropsTable module="@pankod/refine-core/useSubscription"  />
