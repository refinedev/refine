---
"@refinedev/core": patch
---

fix(core): match optimistic queries and execute pending undoable mutations on consecutive saves (#7653)

- **Optimistic Query Matching**: In `useUpdate`, `useDelete`, `useUpdateMany`, and `useDeleteMany`, optimistic cache updates for `list` and `detail` now target `resourceKeys.action("list").get()` and `resourceKeys.action("one").id(id).get()` instead of filtering by `.params(preferredMeta)`. This aligns with `action("many")` and `useInvalidate`, preventing query matching failures caused by route parameters (such as `id`) leaked from `useMeta` or non-matching mutation-specific meta.
- **Undoable Queue Preservation**: In `undoableQueueReducer`, when a new mutation is queued for a resource with an already pending undoable item, the previous mutation's `doMutation()` is now immediately executed prior to replacement. This ensures consecutive saves to the same record within the undo window do not drop prior uncommitted mutations.
