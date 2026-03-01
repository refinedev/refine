---
"@refinedev/core": patch
---

fix: pass meta to useButtonCanAccess in useDeleteButton

`useDeleteButton` was not forwarding the `meta` prop to `useButtonCanAccess`, causing access control checks that rely on `meta` params (e.g. tenant-aware permissions) to fail silently.
