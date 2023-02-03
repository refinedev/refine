---
id: usePublish
title: usePublish
---

`usePublish` returns the [`publish`][live-provider-publish] method from [`liveProvider`][live-provider]. It is useful when you want to publish a custom event.

:::info-tip
After successful mutation, **refine** will call automatically [`publish`][live-provider-publish] method from [`liveProvider`][live-provider] to publish the event with following properties:

```ts
publish({
    channel: `resources/${resource}`, // given resource to mutation hook
    type: "updated", // or deleted
    payload: {
        ids: [ids], // or ids
    },
    date: new Date(),
});
```

Following hooks are using `usePublish` internally after successful mutation:

-   [`useCreate`][use-create]
-   [`useUpdate`][use-update]
-   [`useDelete`][use-delete]
-   [`useCreateMany`][use-create-many]
-   [`useUpdateMany`][use-update-many]
-   [`useDeleteMany`][use-delete-many]

:::

## Usage

```tsx
import { usePublish } from "@pankod/refine-core";

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
This method is used to publish an event on client side. Beware that publishing events on client side is not recommended and best practice is to publish events from server side. You can refer [Publish Events from API](/docs/api-reference/core/providers/live-provider/#publish-events-from-api) to see which events must be published from the server.

:::

## Publish Properties

Will be passed to the [publish][live-provider-publish] method from the [liveProvider][live-provider] as a parameter. You can use these properties from the [`liveProvider`][live-provider]'s [`publish`][live-provider-publish] method and use them to publish a event.

> Refer to [LiveEvent][live-event] interface for type of properties.

### channel <PropTag required/>

The channel name to publish the event.

### type <PropTag required/>

The event name to publish.

### payload <PropTag required/>

The payload to publish.

### date <PropTag required/>

The date of the event.

**Parameter Types:**

[live-provider]: /docs/api-reference/core/providers/live-provider
[live-provider-publish]: /docs/api-reference/core/providers/live-provider/#publish
[live-event]: /docs/api-reference/core/interfaceReferences/#liveevent
[base-key]: /docs/api-reference/core/interfaceReferences/#basekey
[use-delete-many]: /docs/api-reference/core/hooks/data/useDeleteMany/
[use-delete]: /docs/api-reference/core/hooks/data/useDelete/
[use-create]: /docs/api-reference/core/hooks/data/useCreate/
[use-create-many]: /docs/api-reference/core/hooks/data/useCreateMany/
[use-update]: /docs/api-reference/core/hooks/data/useUpdate/
[use-update-many]: /docs/api-reference/core/hooks/data/useUpdateMany/
[use-update]: /docs/api-reference/core/hooks/data/useUpdate/
[use-update-many]: /docs/api-reference/core/hooks/data/useUpdateMany/
