---
"@refinedev/core": patch
---

refactor(core): remove duplicated overtime intervals caused by internally used hooks

Updated Refine's data hooks and extensions to prevent duplicated overtime intervals from being created. This uses the `enabled` prop to prevent internal hooks from registering the intervals.

Prior to this change, `useTable` was initializing its own `useLoadingOvertime` hook but also propagated the `elapsedTime` from `useList` hook which is used internally by `useTable`. This caused duplicated intervals and unwanted updates.

This now ensures a single interval is created and used for the extension hooks.
