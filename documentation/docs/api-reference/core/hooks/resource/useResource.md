---
id: useResource
title: useResource
sidebar_label: useResource
---

`useResource` is used to get the resources array that you defined in `<Refine>`. It also returns `resource` object. You can pass a resource name or identifier to match a resource or it will return the resource object that matches the current route.

:::tip
If you pass a resource name or identifier to `useResource`, it will return the resource object that matches the name or identifier. If there is no match, a temporary `resource` will be created with the provided name or identifier.
:::

## Basic Usage

### Without parameters

If you don't pass any parameter to `useResource`, it will return the resource object that matches the current route by default. If there is no match, the `resource` will be `undefined`.

```ts
import { useResource } from "@refinedev/core";

const { resources, resource, action, id } = useResource();
```

### With a resource name or identifier

If you pass a resource name or identifier to `useResource`, it will return the resource object that matches the name or identifier. If there is no match, a temporary `resource` will be created with the provided name or identifier.

```ts
import { useResource } from "@refinedev/core";

const { resource } = useResource("posts");
```

## Return Values

### `resources`

An array of resources that you defined in `<Refine>`.

### `resource`

Resource object.

### `resourceName`

Resource name of resource object.

### `id`

`id` parameter of the current route.

### `action`

`action` from the current route if there is a match.

## API Reference

### Properties

<PropsTable module="@refinedev/core/useResource"  />

### Return value

| Description  | Type                                                                       |
| ------------ | -------------------------------------------------------------------------- |
| resources    | [`IResourceItem[]`](#interfaces)                                           |
| resource     | [`IResourceItem` \| `undefined`](#interfaces)                              |
| resourceName | `string` \| `undefined`                                                    |
| id           | [`BaseKey`](/api-reference/core/interfaces.md#basekey)                     |
| action       | `undefined` \| `"list"` \| `"create"` \| `"edit"` \| `"show"` \| `"clone"` |

#### Interfaces

```ts

interface IResourceComponents {
    list?: string | React.ComponentType<any> | { component: React.ComponentType<any>; path: string };
    create?: string | React.ComponentType<any> | { component: React.ComponentType<any>; path: string };
    edit?: string | React.ComponentType<any> | { component: React.ComponentType<any>; path: string };
    show?: string | React.ComponentType<any> | { component: React.ComponentType<any>; path: string };
}

interface IResourceItem extends IResourceComponents {
    name: string;
    identifier?: string;
    meta?: MetaProps;
}

```
