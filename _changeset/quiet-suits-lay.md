---
"@refinedev/react-hook-form": minor
---

Updated the components to match the changes in routing system of `@refinedev/core`.

## `meta` property in components

This includes `meta` props in buttons and `Sider` component. `meta` property can be used to pass additional parameters to the navigation paths.

For a `posts` resource definition like this:

```tsx
<Refine
    resources={[
        {
            name: "posts",
            list: "/posts",
            show: "/:authorId/posts/:id",
        }
    ]}
>
```

You can pass `authorId` to the `ShowButton` component like this:

```tsx
<ShowButton resource="posts" id="1" meta={{ authorId: 123 }}>
```

This will navigate to `/123/posts/1` path.
