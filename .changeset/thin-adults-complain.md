---
"@refinedev/core": minor
---

fix: update debounce behavior on `onSearch` in `useSelect`

Now debounce behavior is working correctly on `onSearch` in `useSelect` when using inside `Controller` of react-hook-form.

Resolves [#6096](https://github.com/refinedev/refine/issues/6096)
