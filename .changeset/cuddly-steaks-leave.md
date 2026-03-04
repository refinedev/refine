---
"@refinedev/core": patch
---

fix: useDeleteButton now passes meta params to useButtonCanAccess

useDeleteButton was not forwarding the `meta` prop to `useButtonCanAccess`, which caused custom access control rules relying on meta to fail for delete buttons.

Fixes #7285
