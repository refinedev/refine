---
"@refinedev/core": patch
---

feat(core): add `enabled` prop to `useLoadingOvertime` and `overtimeOptions`

Added missing `enabled` prop to `useLoadingOvertime` and added ability to globally configure through `options.overtime.enabled`.

Due to the nature of calculating elapsed time, an interval is set by the `interval` prop. This was causing unwanted updates in the return value and there was no way to disable it properly.
