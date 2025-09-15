---
title: usePublish
source: packages/core/src/hooks/live/usePublish/index.ts
---

`usePublish` returns the [`publish`][live-provider-publish] method from [`liveProvider`][live-provider]. It is useful when you want to publish a custom event.

Refine uses this hook internally in mutation hooks to `publish` events after successful mutations. You can refer to the `liveProvider`'s [Publish Events from Hooks](/docs/realtime/live-provider#publish-events-from-hooks) section for more information.

## Usage

```tsx
import { usePublish } from "@refinedev/core";

const publish = usePublish();

publish({
  channel: "custom-channel-name",
  type: "custom-event-name",
  payload: {
    ids: [1, 2, 3],
    "custom-property": "custom-property-value",
  },
  date: new Date(),
});
```

:::caution

This method is used to publish an event on the client side. Beware that publishing events on the client side is not recommended and the best practice is to publish events from the server side. You can refer [Publish Events from API](/docs/realtime/live-provider#publish-events-from-api) to see which events should be published from the server.

:::

## Publish Properties

`usePublish` will be passed to the [publish][live-provider-publish] method from the [liveProvider][live-provider] as a parameter. Following properties of this method can be used when publishing an event.

> For more information, refer to the [LiveEvent interface&#8594][live-event]

### channel <PropTag required/>

The channel name to publish the event.

### type <PropTag required/>

The event name to publish.

### payload <PropTag required/>

The payload to publish.

### date <PropTag required/>

The date of the event.

[live-provider]: /docs/realtime/live-provider
[live-provider-publish]: /docs/realtime/live-provider#publish
[live-event]: /docs/core/interface-references#liveevent
