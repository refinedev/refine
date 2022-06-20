# @pankod/refine-antd

## 3.25.6

### Patch Changes

-   [#1985](https://github.com/pankod/refine/pull/1985) [`f0345a42ef`](https://github.com/pankod/refine/commit/f0345a42ef56a06e1f46c83d7c78b3e86a9b52c9) Thanks [@aliemir](https://github.com/aliemir)! - Update `key`s in `<Sider/>` component to use `route`

*   [#1952](https://github.com/pankod/refine/pull/1952) [`1397f09c92`](https://github.com/pankod/refine/commit/1397f09c92c3f55c9f9f0149c4b4b3993927a12e) Thanks [@aliemir](https://github.com/aliemir)! - Deprecated `useMenu` from `@pankod/refine-antd` and replaced with the `useMenu` from `@pankod/refine-core`

*   Updated dependencies [[`1397f09c92`](https://github.com/pankod/refine/commit/1397f09c92c3f55c9f9f0149c4b4b3993927a12e), [`1397f09c92`](https://github.com/pankod/refine/commit/1397f09c92c3f55c9f9f0149c4b4b3993927a12e), [`1199577e81`](https://github.com/pankod/refine/commit/1199577e81c0661fee1cfbf31a49a77178e706ba)]:
    -   @pankod/refine-core@3.30.0

## 3.25.5

### Patch Changes

-   [#1945](https://github.com/pankod/refine/pull/1945) [`592a401924`](https://github.com/pankod/refine/commit/592a40192482cf88108348ed21db437e6d304a43) Thanks [@omeraplak](https://github.com/omeraplak)! - Could not stop `e.preventDefault()` redirection in Next.js `<Link>` component. So we added in `e.stopPropagation()` for [Ant Design Buttons](https://refine.dev/docs/ui-frameworks/antd/components/buttons/clone-button/) and [Material UI Buttons](https://refine.dev/docs/ui-frameworks/mui/components/buttons/clone-button/)

## 3.25.4

### Patch Changes

-   `@pankod/refine-antd` Pagination with Next.js Links breaks the app

-   Updated dependencies []:
    -   @pankod/refine-core@3.29.0

## 3.25.3

### Patch Changes

-   `@pankod/refine-antd` Pagination with Next.js Links breaks the app

-   Updated dependencies []:
    -   @pankod/refine-core@3.28.0

## 3.25.2

### Patch Changes

-   `@pankod/refine-antd` Pagination with Next.js Links breaks the app

-   Updated dependencies []:
    -   @pankod/refine-core@3.27.0

## 3.25.1

### Patch Changes

-   [#1897](https://github.com/pankod/refine/pull/1897) [`b1636033fa`](https://github.com/pankod/refine/commit/b1636033faee2b5eacbad413e2d1f975316e97cb) Thanks [@aliemir](https://github.com/aliemir)! - `@pankod/refine-antd` Pagination with Next.js Links breaks the app

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

-   Updated dependencies [[`2deb19babf`](https://github.com/pankod/refine/commit/2deb19babfc6db5b00b111ec29aa5ece4c371bbc)]:
    -   @pankod/refine-core@3.23.2

## 3.23.1

### Patch Changes

-   [#1865](https://github.com/pankod/refine/pull/1865) [`5c3392ccd1`](https://github.com/pankod/refine/commit/5c3392ccd1eff70dae1479557eede8c246b76edc) Thanks [@omeraplak](https://github.com/omeraplak)! - Fix #1858 `useTable` creating nested `<a>` tag in Pagination component

-   Updated dependencies [[`3281378b11`](https://github.com/pankod/refine/commit/3281378b119c698be3ae4ecb3866b40b883494d8)]:
    -   @pankod/refine-core@3.23.1

## 3.23.0

### Minor Changes

-   [#1843](https://github.com/pankod/refine/pull/1843) [`31850119e0`](https://github.com/pankod/refine/commit/31850119e069b93f0b5146b039a86e736164383e) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Add `useBreadcrumb` hook and `Breadrumb` component for `@pankod/refine-antd` package

### Patch Changes

-   Updated dependencies [[`31850119e0`](https://github.com/pankod/refine/commit/31850119e069b93f0b5146b039a86e736164383e)]:
    -   @pankod/refine-core@3.23.0
