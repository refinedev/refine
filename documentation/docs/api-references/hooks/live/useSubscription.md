---
id: useSubscription
title: useSubscription
---

It is used to subscribe to a real-time channel. It returns the `subscribe` method from [`liveProvider`](/api-references/providers/live-provider.md) under the hood.

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
