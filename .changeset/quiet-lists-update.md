---
"@refinedev/core": patch
---

fix(core): apply optimistic `useUpdate` changes to list queries when saving from an edit page

`useForm` passes the current route's params as `meta`, which on an edit page such as `/posts/edit/1` includes `id`. `useUpdate` used that `meta` to find the list queries to update optimistically, but list query keys don't have `id`, so in `optimistic` and `undoable` modes the cached lists were never updated and kept showing the old values.

`useUpdate` now leaves `id` out of the `meta` it uses to match list queries.

Partially resolves #7653
