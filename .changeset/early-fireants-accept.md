---
"@refinedev/core": minor
---

fix: support multiple `resource` usage with the same name via the `identifier`

Previously our primitive data hooks(`useList`, `useCreate`, etc.) only worked with resource name. So if you had multiple `resource` usage with the same name, it would cause issues. Now the hooks support `identifier` to distinguish between the resources.
