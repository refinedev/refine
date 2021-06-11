---
id: useResource
title: useResource
---

`useResource` is used to get `<Resource>` properties defined as children of `<Admin>` component.

```ts
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

> `canCreate`, `canShow` or `canEdit` properties are defined automatically if `create`, `list` or `edit` components are defined on `<Resource>` components props in `<Admin>` components children.
