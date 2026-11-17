---
title: "useToPath Hook | Routing & Navigation in Refine v5"
display_title: "useToPath"
sidebar_label: "useToPath"
description: "Learn how to use the useToPath hook in Refine to generate routes for resource actions directly inside your components."
source: packages/core/src/hooks/router/use-to-path/index.ts
---

`useToPath` is a routing hook provided by Refine that immediately resolves and returns the route path for a given resource and action. Unlike `useGetToPath` which returns a getter function, `useToPath` returns the composed URL string directly.

If no `resource` is provided, it automatically infers the current resource from the route. If the resource or action is not found, it returns `undefined`.

## Usage

Here is an example demonstrating how to generate a path to an edit action:

```tsx
import { useToPath } from "@refinedev/core";

export const EditButton = ({ id }: { id: string | number }) => {
  const to = useToPath({
    resource: {
      name: "posts",
    },
    action: "edit",
    meta: {
      id,
    },
  });

  return to ? <a href={to}>Edit Post</a> : null;
};
```

## Parameters

### action <PropTag required />

> `"list" | "create" | "edit" | "show" | "clone"`

The action of the resource to compose the route path for.

```tsx
const path = useToPath({
  action: "create",
});
```

### resource

> `IResourceItem` | optional

The resource to generate the path for. If omitted, Refine infers the current resource from the active route.

```tsx
const path = useToPath({
  resource: {
    name: "categories",
  },
  action: "list",
});
```

### meta

> `Record<string, unknown>` | optional

Parameters used to compose dynamic route segments or query parameters (e.g., `id`, parent resource identifiers for nested routes, or custom route parameters).

```tsx
const path = useToPath({
  action: "show",
  meta: {
    id: 42,
    organizationId: "org-123",
  },
});
```

## Return Value

> `string | undefined`

Returns the fully resolved route path as a string, or `undefined` if the resource or action cannot be matched in your resource configuration.
