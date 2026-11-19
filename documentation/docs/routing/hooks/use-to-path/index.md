---
title: "useToPath Hook | Usage & Patterns in Refine v5"
display_title: "useToPath"
sidebar_label: "useToPath"
description: "Implement useToPath in Refine v5. Learn how to compose routes for resources and actions with parameters and nested routes. Hands-on examples included."
---

`useToPath` is a hook that returns the route URL for a given `resource` and `action` by using the URL parameters and optional `meta` property.

Unlike [`useGetToPath`](/routing/hooks/use-get-to-path), which returns a function that can be called dynamically inside event handlers, `useToPath` directly computes and returns the path string during component rendering. This is useful when you need the target URL upfront, such as when passing an `href` to an anchor tag or custom link component.

## Usage

```tsx
import { useToPath } from "@refinedev/core";

// Assuming we have a resource named `posts` and the `edit` action path is `/:authorId/posts/:id/edit`

const MyComponent = () => {
  const editPostPath = useToPath({
    resource: {
      name: "posts",
    },
    action: "edit",
    meta: {
      id: 1,
      authorId: 2,
    },
  });

  return (
    <a href={editPostPath}>
      Edit Post
    </a>
  );
};
```

:::tip

If `resource` is not provided, Refine will infer the resource from the current route. Similarly, parameter values present in the current route URL will be automatically inferred if not explicitly specified in `meta`.

:::

## Composing Routes with Parameters & Nested Routes

You can use the `meta` parameter to supply values for parameterized and nested route paths:

```tsx
import { useToPath } from "@refinedev/core";

// Given a nested route: `/organizations/:orgId/projects/:projectId/show`

const ProjectLink = () => {
  const projectPath = useToPath({
    resource: {
      name: "projects",
    },
    action: "show",
    meta: {
      orgId: "org-123",
      projectId: "proj-456",
    },
  });

  return <a href={projectPath}>View Project</a>;
};
```

## Parameters

### `resource`

```ts
resource?: IResourceItem
```

The resource object to generate the path for. If not provided, the resource is resolved from the current route context.

### `action`

```ts
action: Action
```

The action for which the route should be composed (`"list"`, `"create"`, `"edit"`, `"show"`, or a custom action name).

### `meta`

```ts
meta?: Record<string, unknown>
```

An object containing dynamic route parameters to interpolate into the path. These values are merged with parameters parsed from the current URL.

### `legacy`

```ts
legacy?: boolean
```

Indicates whether to compose the route using legacy router conventions. Default is `false`.

## Return Value

```ts
string | undefined
```

Returns the composed route path as a `string`. If the given action or resource cannot be found or resolved, it returns `undefined`.
