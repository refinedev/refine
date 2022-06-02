---
"@pankod/refine-antd": patch
"@pankod/refine-core": patch
"@pankod/refine-nextjs-router": patch
"@pankod/refine-react-hook-form": patch
---

Removed dummy default values from internal contexts.
Updated contexts:

-   Auth
-   Access Control
-   Notification
-   Translation (i18n)
-   unsavedWarn

**BREAKING:** `useGetLocale` hook now can return `undefined` instead of a fallback value of `en` in cases of `i18nProvider` being `undefined`.
