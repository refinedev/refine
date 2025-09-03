---
"@refinedev/core": patch
---

- Throw an error in `useGetLocale` if it is called without an i18n Provider.
- This ensures the hook's return type matches that of `i18nProvider.getLocale`.
- `useTranslation().getLocale` which is from `useGetLocale` now returns a string.

[Resolves #6812](https://github.com/refinedev/refine/issues/6812)
