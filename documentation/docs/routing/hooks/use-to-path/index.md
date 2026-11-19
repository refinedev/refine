---
title: "useToPath Hook | Usage & Patterns in Refine v5"
display_title: "useToPath"
sidebar_label: "useToPath"
description: "Learn how to use useToPath in Refine v5 to resolve and compose route URLs for resources and actions with parameters and nested routes."
source: packages/core/src/hooks/router/use-to-path
---

`useToPath` is a hook that resolves and returns the route path for a given `resource` and `action`. It composes the URL by combining the resource's action route definition with current URL parameters and any additional parameters provided via the `meta` property.

Unlike [`useGetToPath`](/core/docs/routing/hooks/use-get-to-path/) which returns a getter function to resolve paths imperatively (e.g., inside event handlers or callbacks), `useToPath` resolves the route path directly during component render. This makes it ideal for declarative usage, such as rendering navigation links, breadcrumbs, buttons, or determining active link states.

## Usage

### Basic Usage

You can pass the `resource` and the `action` to resolve the designated route path:

```tsx
import { useToPath } from "@refinedev/core";

const MyComponent = () => {
  const postsListPath = useToPath({
    resource: {
      name: "posts",
    },
    action: "list",
  });

  return <a href={postsListPath}>All Posts</a>;
};
```

### Inferred Resource from Current Route

If the `resource` property is not provided, `useToPath` automatically infers and uses the resource from the active route:

```tsx
import { useToPath } from "@refinedev/core";

// Inside a component rendered on the `posts` route
const CreateButton = () => {
  const createPath = useToPath({
    action: "create",
  });

  return <a href={createPath}>Create New</a>;
};
```

### Composing Routes with Parameters and Nested Routes

You can use the `meta` parameter to supply parameters for parameterized and nested routes.

For example, assume a resource with nested and parameterized routes:

```tsx
// Resource definition in <Refine />
const resources = [
  {
    name: "posts",
    list: "/authors/:authorId/posts",
    show: "/authors/:authorId/posts/:id/show",
    edit: "/authors/:authorId/posts/:id/edit",
  },
];
```

You can pass `meta` to interpolate `:authorId` and `:id` into the route:

```tsx
import { useToPath } from "@refinedev/core";

const PostDetailLink = () => {
  const showPath = useToPath({
    resource: {
      name: "posts",
    },
    action: "show",
    meta: {
      authorId: 10,
      id: 42,
    },
  });

  return <a href={showPath}>View Post #42</a>;
};
```

:::tip

Route parameters (such as `authorId` or `id`) are automatically inferred from the current URL if they are already present in the active route. You can use the `meta` property to explicitly provide or override these parameter values.

:::

## Parameters

`useToPath` accepts an object with the following properties:

### `action`

> `Action` (`"list"` | `"create"` | `"edit"` | `"show"` | `"clone"`) | **required**

The name of the action whose route path you want to resolve.

### `resource`

> `IResourceItem` | **optional**

The resource for which you want to resolve the route. You can pass a resource object containing its `name` or `identifier`. If not provided, `useToPath` infers and uses the resource from the current active route.

### `meta`

> `Record<string, unknown>` | **optional**

The meta object used to compose the URL with route parameters. Parameter keys matching route tokens (e.g., `:id`, `:authorId`) will be replaced with their respective values. The `meta` object is merged with parameters parsed from the current URL, with properties in `meta` taking precedence.

## Return Value

> `string | undefined`

- **`string`**: The composed route path (e.g., `"/posts"`, `"/authors/10/posts/42/show"`).
- **`undefined`**: If the resource is not found (or cannot be inferred from the current route), or if the resource does not have a route defined for the specified `action`. When a route cannot be resolved, Refine will log a development warning in the console.

## Differences between `useToPath` and `useGetToPath`

| Feature | `useToPath` | `useGetToPath` |
| --- | --- | --- |
| **Return Value** | `string \| undefined` (resolved path) | `(params) => string \| undefined` (getter function) |
| **Invocation** | Direct execution during render | Imperative function call (e.g., inside `onClick`) |
| **Recommended Use Case** | Declarative links, buttons, active navigation states | Event handlers, callbacks, imperative navigation |

## Related

- [useGetToPath](/core/docs/routing/hooks/use-get-to-path/)
- [useGo](/core/docs/routing/hooks/use-go/)
- [useParsed](/core/docs/routing/hooks/use-parsed/)
- [useResourceParams](/core/docs/routing/hooks/use-resource-params/)
