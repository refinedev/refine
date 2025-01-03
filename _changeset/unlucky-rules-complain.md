---
"@refinedev/core": patch
---

fix(core): add missing checks and warnings for `ids` and `resource` props in `useMany` hook

Added checks for `ids` and `resource` props to check in runtime if they are valid or not.

`useMany` will warn if `ids` or `resource` props are missing unless the query is manually enabled through `queryOptions.enabled` prop.

[Resolves #6617](https://github.com/refinedev/refine/issues/6617)
