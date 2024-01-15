---
"@refinedev/core": patch
---

---


fix(chore): fix useForm promise settlement in pessimistic mutationMode

In the `useForm` hook, specifically in the code path for pessimistic mutationMode, the promise executor at line 581 returns without ever calling reject (nor resolve). As a result, the promise is never settled, causing the `onFinishUpdate` function never to reject (nor resolve).To address this issue, this changeset removes the "return" statement from line 581. By doing so, the promise executor now properly calls reject after the `onMutationError` executes, ensuring the promise is settled.

Fixes #5460
