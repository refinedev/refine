---
id: useResourceWithRoute
title: useResourceWithRoute
---

`useResourceWithRoute` is used to get the properties of a resource defined as a element of the `resources`. It returns a function and this function allows us to access the resource with the `route` option we gave to the resource.

The hook is used internal in **refine**. Normally you don't need this hook, but we export it as it may be useful for some use-cases.

```ts
import { useResourceWithRoute } from "@pankod/refine-core";

const resourceWithRoute = useResourceWithRoute();
```

## API Reference

### Return value

| Description       | Type                                                                        |
| ----------------- | --------------------------------------------------------------------------- |
| resourceWithRoute | [`(route: string) => IResourceItem`](/core/interfaces.md#resourceitemprops) |


> The `canCreate`, `canShow` and `canEdit` properties are defined automatically if the `create`, `show` and `edit` components are defined on the `resources` property in `<Refine>`.
