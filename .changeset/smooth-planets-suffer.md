---
"@refinedev/core": patch
---

In forms that use `useForm`, the `onFinish` will reset the current `id` to `undefined` when the mutation is successful. Now, the `id` will not be set to `undefined`.

