---
id: useResourceWithRoute
title: useResourceWithRoute
---

:::caution Deprecated
This hook is deprecated and only works properly with the legacy routing system. Please use `useResource` instead. Route based matching is now done by the router provider and the `useResource` hook.
:::

`useResourceWithRoute` is used to get the resource object in resources array that you defined in `<Refine>` by route name.

The hook is used internal in **refine**. Normally you don't need this hook, but we export it as it may be useful for some use-cases.

```ts
import { useResourceWithRoute } from "@refinedev/core";

const resourceWithRoute = useResourceWithRoute();

const resource = resourceWithRoute("posts");
```

## API Reference

### Return value

| Description       | Type                                                                                      |
| ----------------- | ----------------------------------------------------------------------------------------- |
| resourceWithRoute | [`(route: string) => IResourceItem`](/api-reference/core/interfaces.md#resourceitemprops) |
