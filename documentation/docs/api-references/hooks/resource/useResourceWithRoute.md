---
id: useResourceWithRoute
title: useResourceWithRoute
---

`useResourceWithRoute` is used to get the properties of a `<Resource>` defined as a child of the `<Refine>` component. It returns a function and this function allows us to access the resource with the `route` option we gave to `<Resource>`.

The hook is used internal in **refine**. Normally you don't need this hook, but we export it as it may be useful for some use-cases.

```ts twoslash
import { useResourceWithRoute } from "@pankod/refine";

const resourceWithRoute = useResourceWithRoute();
```

## API Reference

### Return value

| Description       | Type                               |
| ----------------- | ---------------------------------- |
| resourceWithRoute | `(route: string) => IResourceItem` |

#### Interfaces

```ts
interface IResourceItem {
    name: string;
    label?: string;
    route?: string;
    icon?: ReactNode;
    canCreate?: boolean;
    canEdit?: boolean;
    canShow?: boolean;
    canDelete?: boolean;
}
```

> The `canCreate`, `canShow` and `canEdit` properties are defined automatically if the `create`, `show` and `edit` components are defined on the `<Resource>` components properties in the `<Refine>` components children.
