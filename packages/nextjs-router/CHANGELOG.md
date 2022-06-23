# @pankod/refine-nextjs-router

## 3.25.3

### Patch Changes

-   [#2021](https://github.com/pankod/refine/pull/2021) [`a0a895cae4`](https://github.com/pankod/refine/commit/a0a895cae42161cca0b78831f30bcc95ead0740a) Thanks [@aliemir](https://github.com/aliemir)! - Add `legacyBehavior: false` to `<Link/>` component to migrate to the new Next.js Link behavior. [next.js#36436](https://github.com/vercel/next.js/pull/36436)

-   Updated dependencies [[`d96ba1e9c8`](https://github.com/pankod/refine/commit/d96ba1e9c88724ee0b0d828bc4589befcb7a783d), [`b257d87fef`](https://github.com/pankod/refine/commit/b257d87fef4e8572e4c463894e9d79af96d78184), [`12f08ae6a3`](https://github.com/pankod/refine/commit/12f08ae6a3755487cd0e4f498b7fc3c2a9488c58)]:
    -   @pankod/refine-core@3.33.0

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
