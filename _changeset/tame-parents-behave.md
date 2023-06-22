---
"@refinedev/react-hook-form": patch
---

fixed: `handleSubmitReactHookForm` now returns a Promise without awaiting it.
With this change, unhandled errors will propagate to the caller.
