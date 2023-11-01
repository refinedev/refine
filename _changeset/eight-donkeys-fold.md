---
"@refinedev/mantine": patch
---

Updated the return type of the `useSelect` hook to only include properties that actually being returned from the hook. Previously, the return type included all properties of the `Select` component, which was not correct.
