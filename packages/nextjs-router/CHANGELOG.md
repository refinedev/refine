# @pankod/refine-nextjs-router

## 3.25.2

### Patch Changes

-   We've updated Next.js version to `12.1.6`

## 3.25.1

### Patch Changes

-   [#1951](https://github.com/pankod/refine/pull/1951) [`cc5f9ae78a`](https://github.com/pankod/refine/commit/cc5f9ae78a13e5fd89f226bf38290678cc73e422) Thanks [@omeraplak](https://github.com/omeraplak)! - We've updated Next.js version to `12.1.6`

## 3.22.2

### Patch Changes

-   [#1873](https://github.com/pankod/refine/pull/1873) [`2deb19babf`](https://github.com/pankod/refine/commit/2deb19babfc6db5b00b111ec29aa5ece4c371bbc) Thanks [@aliemir](https://github.com/aliemir)! - Removed dummy default values from internal contexts.
    Updated contexts:

    -   Auth
    -   Access Control
    -   Notification
    -   Translation (i18n)
    -   unsavedWarn

    **BREAKING:** `useGetLocale` hook now can return `undefined` instead of a fallback value of `en` in cases of `i18nProvider` being `undefined`.

-   Updated dependencies [[`2deb19babf`](https://github.com/pankod/refine/commit/2deb19babfc6db5b00b111ec29aa5ece4c371bbc)]:
    -   @pankod/refine-core@3.23.2
