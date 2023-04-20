---
"@refinedev/react-hook-form": patch
---

fixed: The values of the registered fields were set using the `reset()` function. This has been changed to use `getValues()` instead. This fixes an issue where the values of the registered fields' dirty state were not being set correctly.
