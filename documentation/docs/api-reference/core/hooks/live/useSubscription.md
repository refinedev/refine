---
id: useSubscription
title: useSubscription
source: packages/core/src/hooks/live/useSubscription/index.ts
---

`useSubscription` calls the [`subscribe`][live-provider-subscribe] method from [`liveProvider`][live-provider] when mounted. It is useful when you want to subscribe to a Realtime channel.

:::info-tip
**refine** use this hook internally in data hooks to `subscribe` Realtime data. You can refer liveProvider's [Supported Hooks Subscriptions][supported-hooks-subscription] section for more information.
:::

## Usage

```tsx
import { useSubscription } from "@refinedev/core";

useSubscription({
    channel: "channel-name",
    types: ["event-name", "another-event-name"]
    onLiveEvent: (event) => {},
});

```

### Properties

`useSubscription` will be passed to the [subscribe][live-provider-subscribe] method from the [liveProvider][live-provider] as a parameter. You can use the following properties of this method while subcribing to a channel.

### channel <PropTag required/>

Channel name to subscribe to.

### onLiveEvent <PropTag required/>

Callback that is run when new events from the subscription arrive.

### types

> Default: `["*"]`

Type of events to subscribe. `"\*"` means all events.

### enabled

> Default: `true`

You can disable the subscription by setting this prop to `false` and vice versa.

### params

You can pass any additional parameters to the [`liveProvider`][live-provider]'s [`subscribe`][live-provider-subscribe] method.

Hooks that use `useSubscription` internally send the query's parameters' (pagination, meta, sort, filters, etc.) information along with this prop.

> For more information on which hooks use `useSubcription` internally, refer to the [LiveProvider's "Supported Hooks Subscription" section&#8594][supported-hooks-subscription]

## API Reference

### Properties

<PropsTable module="@refinedev/core/useSubscription"  />

[live-provider]: /docs/api-reference/core/providers/live-provider
[live-provider-subscribe]: /docs/api-reference/core/providers/live-provider/#subscribe
[supported-hooks-subscription]: /docs/api-reference/core/providers/live-provider/#supported-hooks-subscriptions
