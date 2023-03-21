---
"@refinedev/core": patch
---

In forms that use `useForm`, the `onFinish` was resetting the current `id` to `undefined` when the mutation is successful. Now, the `id` will not be set to `undefined`.

