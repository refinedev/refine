# @pankod/refine-core

## 3.26.0

### Minor Changes

-   [#1616](https://github.com/pankod/refine/pull/1616) [`6cb571e3b8`](https://github.com/pankod/refine/commit/6cb571e3b8a9a02c38764616640e0e06e71cd9fd) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Add `auditLogProvider` on `<Refine />` component.

*   [#1888](https://github.com/pankod/refine/pull/1888) [`2b9f2f837a`](https://github.com/pankod/refine/commit/2b9f2f837aab8d7796f32cccea7ae2d46bfd08bc) Thanks [@aliemir](https://github.com/aliemir)! - - Extend `useTable.setFilters` with `behavior` as 2nd parameter (defaults to `merge`)
    -   Add `defaultSetFilterBehavior` property to `useTable` options. (defaults to `merge`)
    -   Add setter function overload to `useTable.setFilters`

## 3.23.2

### Patch Changes

-   [#1873](https://github.com/pankod/refine/pull/1873) [`2deb19babf`](https://github.com/pankod/refine/commit/2deb19babfc6db5b00b111ec29aa5ece4c371bbc) Thanks [@aliemir](https://github.com/aliemir)! - Removed dummy default values from internal contexts.
    Updated contexts:

    -   Auth
    -   Access Control
    -   Notification
    -   Translation (i18n)
    -   unsavedWarn

    **BREAKING:** `useGetLocale` hook now can return `undefined` instead of a fallback value of `en` in cases of `i18nProvider` being `undefined`.

## 3.23.1

### Patch Changes

-   [`3281378b11`](https://github.com/pankod/refine/commit/3281378b119c698be3ae4ecb3866b40b883494d8) Thanks [@rassie](https://github.com/rassie)! - Fix: Don't "humanize" labels in breadcrumbs

## 3.23.0

### Minor Changes

-   [#1843](https://github.com/pankod/refine/pull/1843) [`31850119e0`](https://github.com/pankod/refine/commit/31850119e069b93f0b5146b039a86e736164383e) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Add `useBreadcrumb` hook and `Breadrumb` component for `@pankod/refine-antd` package
