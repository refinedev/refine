---
"@refinedev/core": patch
---

Added the missing `resource` property in `params` of the `useCan` call, which was leading to missing resource details in the access control checks in the `can` function.

The provided `resource` item is sanitized to remove non-serializable properties such as `icon` etc. If you need such items, you should try to access your `resource` item directly from your defitinions.
