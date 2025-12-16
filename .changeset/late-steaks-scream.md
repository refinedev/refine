---
"@refinedev/core": patch
---

fix(core): `useGetToPath` returns `undefined` #7159

Fixed an issue where `useGetToPath` would return `undefined` when a partial resource object was passed. The hook now always looks up the full resource definition from the resources array to ensure all action routes are available.

Additionally, added a warning message when an action route cannot be found for a resource, making it easier to debug routing issues.

Resolves #7159
