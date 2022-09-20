---
id: useSubscription
title: useSubscription
---

It is used to subscribe to a Realtime channel. It returns the `subscribe` method from [`liveProvider`](/core/providers/live-provider.md#subscribe) under the hood.

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

You can publish events with [`usePublish`](/core/hooks/live/usePublish.md).
:::