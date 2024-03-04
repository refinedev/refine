---
"@refinedev/core": patch
---

Refactored the internal logic of `useForm` to be more efficient and readable, along with few bug fixes and improvements to the `useForm` hook.

These changes are related to the issue [#5702](https://github.com/refinedev/refine/issues/5702)

- Due to the confusion it causes by the name, `onFinish` is deprecated and replaced with `submit`.
- Same also applies to `onFinishAutoSave` which is replaced with `submitAutoSave`.
- `submit` now rejects when; - `values` is not provided, - `resource` is not defined, - `id` is required but not provided.
  previously these cases were silently ignored.
- Combined the separated submit functions into one for sake of simplicity and consistency. (internal)
- `submit` rejects and resolved regardless of the `onMutationSuccess` and `onMutationError` hooks are provided or not. (Resolves [#5460](https://github.com/refinedev/refine/issues/5460))
- `meta` values were concatenated multiple times causing confusion and unexpected behavior, now it is fixed.
- Moved the `id` determination/inference logic to a separate hook.
