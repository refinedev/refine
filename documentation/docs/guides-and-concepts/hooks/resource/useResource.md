---
id: useResource
title: useResource
---

`useResource` is used to get resource items defined as children of `<Admin>` component.

```ts
const resources = useResource();
```

## API Reference

### Return value

| Description                                           | Type                             |
| ----------------------------------------------------- | -------------------------------- |
| Key of the resource the user is viewing at the moment | [`IResourceItem[]`](#interfaces) |

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
