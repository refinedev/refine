---
"@refinedev/core": patch
---

Refactored the internal logic of `useForm` to be more efficient and readable, along with few bug fixes and improvements to the `useForm` hook.

These changes are related to the issue [#5702](https://github.com/refinedev/refine/issues/5702) and resolves [#5460](https://github.com/refinedev/refine/issues/5460).

- `onFinish` now rejects when; - `values` is not provided, - `resource` is not defined, - `id` is required but not provided.
  previously these cases were silently ignored.
- Same changes also applies to `onFinishAutoSave`.
- `onFinishAutoSave` had an issue with returning the appropriate promise after being called. This resulted in unhandled promise rejections and uncontrollable resolved promises. Now it is fixed, `onFinishAutoSave` will resolve and reject based on the response of the mutation.
- When using auto save, debounced calls will now be cancelled and the respective promises will be rejected with `"cancelled by debounce"` message. These changes might require an update to the code bases that uses `onFinishAutoSave` to handle the rejection of the promise to avoid unhandled promise rejections.
- Combined the separated submit functions into one for sake of simplicity and consistency. (internal)
- `onFinish` rejects and resolved regardless of the `onMutationSuccess` and `onMutationError` hooks are provided or not. (Resolves [#5460](https://github.com/refinedev/refine/issues/5460))
- `meta` values were concatenated multiple times causing confusion and unexpected behavior, now it is fixed. (internal)
- Moved the `id` determination/inference logic to a separate hook. (internal)
-
