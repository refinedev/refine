---
id: usePublish
title: usePublish
---

If you need to publish a custom events **refine** provides the `usePublish` hook for it, It returns the `publish` method from [`liveProvider`](/core/providers/live-provider.md#publish) under the hood.

## Usage

:::caution
This hook can only be used if `liveProvider`'s `publish` method is provided.
:::

```tsx
import { usePublish } from "@pankod/refine-core";

const publish = usePublish();

publish({
    channel: "custom-channel-name",
    type: "custom-event-name",
    payload: {
        "custom-property": "custom-property-value",
    },
    date: new Date(),
});
```

:::info

You can subscribe to event with [`useSubscription`](/core/hooks/live/useSubscription.md).
:::
