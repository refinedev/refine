---
"@refinedev/mantine": minor
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

## `syncWithLocation` support in `useModalForm` hook

`useModalForm` hook now support `syncWithLocation` prop. This prop can be used to sync the visibility state of them with the location via query params. 

You can pass a boolean or an object with `key` and `syncId` properties.

- `key` is used to define the query param key. Default value is inferred from the resource and the action. For example `posts-create` for `posts` resource and `create` action.

- `syncId` is used to include the `id` property in the query param key. Default value is `false`. This is useful for `edit` and `clone` actions.

## Removed props

`ignoreAccessControlProvider` prop is removed from buttons.