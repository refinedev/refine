---
"@refinedev/core": patch
---

📢 \*\*Refine Community Edition Release\*\* 📢

fix: `useUpdate` and `useForm` hooks throws an error when `id` is an empty string. (`id=""`) #6505

This reverts a breaking change introduced in [PR #6116](https://github.com/refinedev/refine/pull/6116) and restores support for using an empty string as `id`. This enables updates without an `id` field, as allowed before `@refinedev/core@4.54.0`.

Affected versions with this bug:

- `@refinedev/core@4.54.0`
- `@refinedev/core@4.54.1`
- `@refinedev/core@4.55.0`
- `@refinedev/core@4.56.0`

The bug is fixed in:

- `@refinedev/core@4.56.1`

Resolves [#6505](https://github.com/refinedev/refine/issues/6505)
