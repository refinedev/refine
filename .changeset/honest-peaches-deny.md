---
"@refinedev/core": patch
---

fix(core): `useResourceParams` not reflecting `id` prop changes immediately

`useResourceParams` hook was not reflecting the changes in the `id` prop immediately. This was due to the `id` state being set in the `useEffect` hook. This PR fixes the issue by setting the `id` state properly during render rather than after the render is complete.

[Fixes #6259](https://github.com/refinedev/refine/issues/6259)
