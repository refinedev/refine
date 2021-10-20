---
id: useResource
title: useResource
---

`useResource` is used to get `resources` that are defined as property of the `<Refine>` component.

```ts twoslash
import { useResource } from "@pankod/refine";

const resources = useResource();
```

## API Reference

### Return value

| Description | Type                             |
| ----------- | -------------------------------- |
| Resources   | [`IResourceItem[]`](#interfaces) |

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

> The `canCreate`, `canShow` and `canEdit` properties are defined automatically if the `create`, `show` and `edit` components are defined on the `resources` properties in the `<Refine>`.
