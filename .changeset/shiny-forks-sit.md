---
"@refinedev/core": patch
---

`useMenu` hook was using outdated `meta` and router `params` due to missing dependency of the callback function. This was causing dynamic menu items to use wrong paths as links. (Resolves [#5432](https://github.com/refinedev/refine/issues/5432))
