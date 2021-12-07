---
id: usePublish
title: usePublish
---

If you need to publish an events **refine** provides the `usePublish` hook for it, It returns the `publish` method from [`liveProvider`](/api-references/providers/live-provider.md) under the hood.

## Usage

:::caution
This hook can only be used if `liveProvider`'s `publish` method is provided.
:::

```tsx
import { usePublish } from "@pankod/refine";

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
