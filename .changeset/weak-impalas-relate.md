---
"@refinedev/core": patch
---

fix(core): `useMenu` `hideOnMissingParameter` prop default value set to `true`

There was an error in the `useMenu` hook's `hideOnMissingParameter` prop. Its default value should be `true` but it was missed when props are passed partially. This PR fixes the issue by setting the default value to `true`.
