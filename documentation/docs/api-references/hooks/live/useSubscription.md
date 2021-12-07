---
id: useSubscription
title: useSubscription
---

It is used to subscribe to a Realtime channel. It returns the `subscribe` method from [`liveProvider`](/api-references/providers/live-provider.md#subscribe) under the hood.

## Usage

:::caution
This hook can only be used if `liveProvider` is provided.
:::

```tsx
import { useSubscription } from "@pankod/refine";

useSubscription({
    channel: "channel-name",
    types: ["event-name", "another-event-name"]
    onLiveEvent: (event) => {},
});
```

:::info

You can publish events with [`usePublish`](/api-references/hooks/live/usePublish.md).
:::