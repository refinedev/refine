---
"@refinedev/react-router-v6": patch
---

Fix the issue of `matchPath` when the resource action is defined as a function or an object. Switched to using matched route string instead of using the route value from the `resource` definition.
