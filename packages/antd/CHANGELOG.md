# @pankod/refine-antd

## 3.37.11

### Patch Changes

-   Fix: `useStepsForm`'s `submit` function can be overridden

## 3.37.10

### Patch Changes

-   Fix: `useStepsForm`'s `submit` function can be overridden

## 3.37.9

### Patch Changes

-   [#2421](https://github.com/pankod/refine/pull/2421) [`2b1c5e01b0`](https://github.com/pankod/refine/commit/2b1c5e01b0f65b2c7558ba79539fab411480cc06) Thanks [@omeraplak](https://github.com/omeraplak)! - Fix: `useStepsForm`'s `submit` function can be overridden

## 3.37.8

### Patch Changes

-   Fix: Wrap with [`<CanAccess />`](https://refine.dev/docs/core/components/accessControl/can-access/) component to parent sider items

    ```tsx
    <Refine
        accessControlProvider={{
            can: async ({ action, resource }) => {
                // console.log({ action, resource });
                // output: {action: "list", resource: "cms" }

                return { can: true };
            },
        }}
        resources={[
            {
                name: "CMS",
            },
            {
                name: "posts",
                parentName: "CMS",
                list: PostList,
            },
        ]}
    />
    ```

## 3.37.7

### Patch Changes

-   [#2411](https://github.com/pankod/refine/pull/2411) [`c61470a2e0`](https://github.com/pankod/refine/commit/c61470a2e00df94a211395541601fd39b63e2cff) Thanks [@omeraplak](https://github.com/omeraplak)! - Fix: Wrap with [`<CanAccess />`](https://refine.dev/docs/core/components/accessControl/can-access/) component to parent sider items

    ```tsx
    <Refine
        accessControlProvider={{
            can: async ({ action, resource }) => {
                // console.log({ action, resource });
                // output: {action: "list", resource: "cms" }

                return { can: true };
            },
        }}
        resources={[
            {
                name: "CMS",
            },
            {
                name: "posts",
                parentName: "CMS",
                list: PostList,
            },
        ]}
    />
    ```

## 3.37.6

### Patch Changes

-   Fix `useModalForm` hook reset issue after successful submit

## 3.37.5

### Patch Changes

-   [#2403](https://github.com/pankod/refine/pull/2403) [`ef8622cba3`](https://github.com/pankod/refine/commit/ef8622cba32acc8f5edf9e4190fbe90d99e642c6) Thanks [@omeraplak](https://github.com/omeraplak)! - Fix `useModalForm` hook reset issue after successful submit

## 3.37.4

### Patch Changes

-   Updated `<Edit/>` component's default footer buttons property wrapper with `<Space/>` component like `<Footer>

## 3.37.3

### Patch Changes

-   Updated `<Edit/>` component's default footer buttons property wrapper with `<Space/>` component like `<Footer>

## 3.37.2

### Patch Changes

-   Updated `<Edit/>` component's default footer buttons property wrapper with `<Space/>` component like `<Footer>

## 3.37.1

### Patch Changes

-   [#2343](https://github.com/pankod/refine/pull/2343) [`90b39d4f83`](https://github.com/pankod/refine/commit/90b39d4f839dc97868b7126ffb2903e29b8bb51a) Thanks [@aliemir](https://github.com/aliemir)! - Updated `<Edit/>` component's default footer buttons property wrapper with `<Space/>` component like `<Footer>

## 3.37.0

### Minor Changes

-   Separated `styles.min.css` file as `antd.min.css` and `reset.min.css` to make users able to turn off `reset` styles when needed.

## 3.36.0

### Minor Changes

-   [#2312](https://github.com/pankod/refine/pull/2312) [`ba5646c65c`](https://github.com/pankod/refine/commit/ba5646c65cc09dee688fef1cf3a6556707754c3c) Thanks [@aliemir](https://github.com/aliemir)! - Separated `styles.min.css` file as `antd.min.css` and `reset.min.css` to make users able to turn off `reset` styles when needed.

## 3.35.4

### Patch Changes

-   Upgraded `react-query` version to 4.

## 3.35.3

### Patch Changes

-   [#2260](https://github.com/pankod/refine/pull/2260) [`a97ec592df`](https://github.com/pankod/refine/commit/a97ec592dfb6dcf5b5bd063d2d76f50ca195c20e) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Upgraded `react-query` version to 4.

## 3.35.2

### Patch Changes

-   Remove `data-testid` props from buttons in crud components to make use of button test ids presented by `@pankod/refine-ui-types` package.

*   Updated `@pankod/refine-antd` and `@pankod/refine-mui` `fields` properties by using `@pankod/refine-ui-types` common `fields` types.

    Updated `@pankod/refine-antd` and `@pankod/refine-mui` `fields` tests by using `@pankod/refine-ui-tests` common `fields` tests.

    Updated `@pankod/refine-ui-tests` `fields` properties.

-   Added `@pankod/refine-ui-tests` and `@pankod/refine-ui-types` packages. Now, all of button prop types comes from `@pankod/refine-ui-types` package and all of button tests comes from `@pankod/refine-ui-tests` package.

    Thus, button types and tests are managed by `@pankod/refine-ui-types` package and `@pankod/refine-ui-tests` package.

-   Updated dependencies []:
    -   @pankod/refine-ui-types@0.3.0

## 3.35.1

### Patch Changes

-   [#2216](https://github.com/pankod/refine/pull/2216) [`201846c77d`](https://github.com/pankod/refine/commit/201846c77dba07a61f0c0335716b60641430c22a) Thanks [@aliemir](https://github.com/aliemir)! - Remove `data-testid` props from buttons in crud components to make use of button test ids presented by `@pankod/refine-ui-types` package.

*   [#2216](https://github.com/pankod/refine/pull/2216) [`201846c77d`](https://github.com/pankod/refine/commit/201846c77dba07a61f0c0335716b60641430c22a) Thanks [@aliemir](https://github.com/aliemir)! - Updated `@pankod/refine-antd` and `@pankod/refine-mui` `fields` properties by using `@pankod/refine-ui-types` common `fields` types.

    Updated `@pankod/refine-antd` and `@pankod/refine-mui` `fields` tests by using `@pankod/refine-ui-tests` common `fields` tests.

    Updated `@pankod/refine-ui-tests` `fields` properties.

-   [#2216](https://github.com/pankod/refine/pull/2216) [`201846c77d`](https://github.com/pankod/refine/commit/201846c77dba07a61f0c0335716b60641430c22a) Thanks [@aliemir](https://github.com/aliemir)! - Added `@pankod/refine-ui-tests` and `@pankod/refine-ui-types` packages. Now, all of button prop types comes from `@pankod/refine-ui-types` package and all of button tests comes from `@pankod/refine-ui-tests` package.

    Thus, button types and tests are managed by `@pankod/refine-ui-types` package and `@pankod/refine-ui-tests` package.

-   Updated dependencies [[`201846c77d`](https://github.com/pankod/refine/commit/201846c77dba07a61f0c0335716b60641430c22a)]:
    -   @pankod/refine-ui-types@0.2.0

## 3.35.0

### Minor Changes

-   Add React@18 support 🚀

### Patch Changes

-   Fixed `isMobile` control in `Sider` component detecting `desktop` dimensions as `mobile` on route changes

## 3.34.0

### Minor Changes

-   [#1718](https://github.com/pankod/refine/pull/1718) [`b38620d842`](https://github.com/pankod/refine/commit/b38620d84237e13212811daada7b49ee654c70eb) Thanks [@omeraplak](https://github.com/omeraplak)! - Add React@18 support 🚀

### Patch Changes

-   [#2255](https://github.com/pankod/refine/pull/2255) [`b56f43529f`](https://github.com/pankod/refine/commit/b56f43529f387ad1801e7bc0d94dfa5679bad77e) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed `isMobile` control in `Sider` component detecting `desktop` dimensions as `mobile` on route changes

## 3.33.2

### Patch Changes

-   Updated `console.warn`'s to trigger once.

## 3.33.1

### Patch Changes

-   [#2223](https://github.com/pankod/refine/pull/2223) [`0a215f2000`](https://github.com/pankod/refine/commit/0a215f2000b4069618e42efda48b8864b38129fd) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Updated `console.warn`'s to trigger once.

## 3.33.0

### Minor Changes

-   All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

    Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

## 3.32.0

### Minor Changes

-   [#2217](https://github.com/pankod/refine/pull/2217) [`b4aae00f77`](https://github.com/pankod/refine/commit/b4aae00f77a2476d847994db21298ae25e4cf6e5) Thanks [@omeraplak](https://github.com/omeraplak)! - All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

    Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

## 3.31.0

### Minor Changes

-   **BREAKING** Updated `useStepsForm` prop `isBackValidate` with default `false` instead of `true` to achieve consistency between packages (`@pankod/refine-react-hook-form`).

### Patch Changes

-   Fix `useModal` hook doesn't return `modalProps`

*   Added `hasPagination` support to [`useSimpleList`](https://refine.dev/docs/ui-frameworks/antd/hooks/list/useSimpleList/) hook.

## 3.30.0

### Minor Changes

-   [#2206](https://github.com/pankod/refine/pull/2206) [`874b05af37`](https://github.com/pankod/refine/commit/874b05af377b995c9cea6cbcde5407a19403f53d) Thanks [@aliemir](https://github.com/aliemir)! - **BREAKING** Updated `useStepsForm` prop `isBackValidate` with default `false` instead of `true` to achieve consistency between packages (`@pankod/refine-react-hook-form`).

### Patch Changes

-   [#2203](https://github.com/pankod/refine/pull/2203) [`3c80308ca1`](https://github.com/pankod/refine/commit/3c80308ca143d11d7daeb7e9624d0138ecede42d) Thanks [@omeraplak](https://github.com/omeraplak)! - Fix `useModal` hook doesn't return `modalProps`

*   [#2201](https://github.com/pankod/refine/pull/2201) [`62c261c2a7`](https://github.com/pankod/refine/commit/62c261c2a7eaaec77d10440f2ec37f3697d869c9) Thanks [@omeraplak](https://github.com/omeraplak)! - Added `hasPagination` support to [`useSimpleList`](https://refine.dev/docs/ui-frameworks/antd/hooks/list/useSimpleList/) hook.

## 3.29.0

### Minor Changes

-   Added `defaultSetFilterBehavior` prop to `useTable` and `useSimpleList` hooks. Return `setFilters` and `setSorter` from `useTable` of `@pankod/refine-core`.

    This feature will let `@pankod/refine-antd` users to set filters manually and change filter setter logic (defaults to `merge`).

### Patch Changes

-   Updated dependencies []:
    -   @pankod/refine-core@3.44.0

## 3.28.0

### Minor Changes

-   [#2168](https://github.com/pankod/refine/pull/2168) [`a9196ffe2d`](https://github.com/pankod/refine/commit/a9196ffe2de8bfe266be2cac1ac05eab039d0fb7) Thanks [@aliemir](https://github.com/aliemir)! - Added `defaultSetFilterBehavior` prop to `useTable` and `useSimpleList` hooks. Return `setFilters` and `setSorter` from `useTable` of `@pankod/refine-core`.

    This feature will let `@pankod/refine-antd` users to set filters manually and change filter setter logic (defaults to `merge`).

### Patch Changes

-   Updated dependencies [[`4d5f6b25e5`](https://github.com/pankod/refine/commit/4d5f6b25e51cf773e08a0ce0b93a3680e692564a)]:
    -   @pankod/refine-core@3.43.0

## 3.27.6

### Patch Changes

-   Fixed the `Unhandled Promise` error on console for `useForm` with failed requests (Resolves #2156).

    This fix only catches the errors triggered by submitting the form, requests by invoking `onFinish` function should be handled by the user.

## 3.27.5

### Patch Changes

-   [#2161](https://github.com/pankod/refine/pull/2161) [`8490f3c38f`](https://github.com/pankod/refine/commit/8490f3c38f8a7136a7dc396f3105334da8068b0b) Thanks [@aliemir](https://github.com/aliemir)! - Fixed the `Unhandled Promise` error on console for `useForm` with failed requests (Resolves #2156).

    This fix only catches the errors triggered by submitting the form, requests by invoking `onFinish` function should be handled by the user.

## 3.27.4

### Patch Changes

-   Removed unused cases in `useFileUploadState` and fixed conflicting type in `antd#UploadFileStatus` interface.

-   Updated dependencies []:
    -   @pankod/refine-core@3.40.0

## 3.27.3

### Patch Changes

-   [#2135](https://github.com/pankod/refine/pull/2135) [`cf90324cb4`](https://github.com/pankod/refine/commit/cf90324cb4043cb8c0fae79c15e9c17c2bda8044) Thanks [@aliemir](https://github.com/aliemir)! - Removed unused cases in `useFileUploadState` and fixed conflicting type in `antd#UploadFileStatus` interface.

-   Updated dependencies [[`868bb943ad`](https://github.com/pankod/refine/commit/868bb943adc42d80a7904e2acbd6397d097ad4e2)]:
    -   @pankod/refine-core@3.39.0

## 3.27.2

### Patch Changes

-   Add `dataProviderName` property for `<RefreshButton>` and `<DeleteButton>` in `<Edit>` and `<Show>` CRUD components - #2096

-   Updated dependencies []:
    -   @pankod/refine-core@3.38.0

## 3.27.1

### Patch Changes

-   [#2106](https://github.com/pankod/refine/pull/2106) [`10a20d8714`](https://github.com/pankod/refine/commit/10a20d87142b694bc9c02afaee5b4fe6c5853c5a) Thanks [@omeraplak](https://github.com/omeraplak)! - Add `dataProviderName` property for `<RefreshButton>` and `<DeleteButton>` in `<Edit>` and `<Show>` CRUD components - #2096

-   Updated dependencies [[`9d77c63a92`](https://github.com/pankod/refine/commit/9d77c63a925dca0133b3e83974dff486a2233017), [`98966b586f`](https://github.com/pankod/refine/commit/98966b586f6febd8669065b5b453a8e441f76bc1)]:
    -   @pankod/refine-core@3.37.0

## 3.27.0

### Minor Changes

-   Updated `useTable` hook with `hasPagination` to enable/disable pagination.

    **Implementation**

    Updated the `useTable` accordingly to the changes in the `useTable` of `@pankod/refine-core`. `hasPagination` property is being send directly to the `useTable` of `@pankod/refine-core` to disable pagination.

    **Use Cases**

    In some data providers, some of the resources might not support pagination which was not supported prior to these changes. To handle the pagination on the client-side or to disable completely, users can set `hasPagination` to `false`.

### Patch Changes

-   Fixed `<Link>` usage in packages.

    ```diff
    - <Link href={route} to={route}>
    -    {label}
    - </Link>
    + <Link to={route}>{label}</Link>
    ```

    We used to have to pass `href` and `to` for Next.js and React applications, now we just need to pass `to`. **refine** router providers handle for us.

-   Updated dependencies []:
    -   @pankod/refine-core@3.36.0

## 3.26.0

### Minor Changes

-   [#2050](https://github.com/pankod/refine/pull/2050) [`635cfe9fdb`](https://github.com/pankod/refine/commit/635cfe9fdbfe5940b950ae99c1f0b686c78bb8e5) Thanks [@ozkalai](https://github.com/ozkalai)! - Updated `useTable` hook with `hasPagination` to enable/disable pagination.

    **Implementation**

    Updated the `useTable` accordingly to the changes in the `useTable` of `@pankod/refine-core`. `hasPagination` property is being send directly to the `useTable` of `@pankod/refine-core` to disable pagination.

    **Use Cases**

    In some data providers, some of the resources might not support pagination which was not supported prior to these changes. To handle the pagination on the client-side or to disable completely, users can set `hasPagination` to `false`.

### Patch Changes

-   [#2061](https://github.com/pankod/refine/pull/2061) [`0237725cf3`](https://github.com/pankod/refine/commit/0237725cf32923f7d24d3f0c9a2994de30baa921) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Fixed `<Link>` usage in packages.

    ```diff
    - <Link href={route} to={route}>
    -    {label}
    - </Link>
    + <Link to={route}>{label}</Link>
    ```

    We used to have to pass `href` and `to` for Next.js and React applications, now we just need to pass `to`. **refine** router providers handle for us.

-   Updated dependencies [[`ecde34a9b3`](https://github.com/pankod/refine/commit/ecde34a9b38ef5667fa863f9ebb9dcb1cfff1651), [`635cfe9fdb`](https://github.com/pankod/refine/commit/635cfe9fdbfe5940b950ae99c1f0b686c78bb8e5)]:
    -   @pankod/refine-core@3.35.0

## 3.25.10

### Patch Changes

-   Updated the `id` parameter type to [`BaseKey`](https://refine.dev/docs/core/interfaceReferences/#basekey) for `show` function in [`useModalForm`](https://refine.dev/docs/packages/react-hook-form/useModalForm/) hook

*   Updated the `id` type to `BaseKey` for `isEditing` and `editButtonProps` properties in `useEditableTable` hook.

*   Updated dependencies []:
    -   @pankod/refine-core@3.34.2

## 3.25.9

### Patch Changes

-   [#2059](https://github.com/pankod/refine/pull/2059) [`326341c94e`](https://github.com/pankod/refine/commit/326341c94edb7f6a1507900506caccc60a386229) Thanks [@omeraplak](https://github.com/omeraplak)! - Updated the `id` parameter type to [`BaseKey`](https://refine.dev/docs/core/interfaceReferences/#basekey) for `show` function in [`useModalForm`](https://refine.dev/docs/packages/react-hook-form/useModalForm/) hook

*   [#2052](https://github.com/pankod/refine/pull/2052) [`cbb09e5b22`](https://github.com/pankod/refine/commit/cbb09e5b22add54d7dccf180cd17c9019d32ed44) Thanks [@omeraplak](https://github.com/omeraplak)! - Updated the `id` type to `BaseKey` for `isEditing` and `editButtonProps` properties in `useEditableTable` hook.

*   Updated dependencies [[`0338ce9d6b`](https://github.com/pankod/refine/commit/0338ce9d6bee673b76a18cf9e6ad480fd9928e09)]:
    -   @pankod/refine-core@3.34.1

## 3.25.8

### Patch Changes

-   Fix missing behavior for dashboard item in _deprecated_ `useMenu`

-   Updated dependencies []:
    -   @pankod/refine-core@3.32.0

## 3.25.7

### Patch Changes

-   [#2009](https://github.com/pankod/refine/pull/2009) [`5b893a9bff`](https://github.com/pankod/refine/commit/5b893a9bff707d90b0f898a52d46a7154108b0a0) Thanks [@aliemir](https://github.com/aliemir)! - Fix missing behavior for dashboard item in _deprecated_ `useMenu`

-   Updated dependencies [[`498c425a0e`](https://github.com/pankod/refine/commit/498c425a0e069b6b972a344ff32af46852306c71), [`498c425a0e`](https://github.com/pankod/refine/commit/498c425a0e069b6b972a344ff32af46852306c71), [`498c425a0e`](https://github.com/pankod/refine/commit/498c425a0e069b6b972a344ff32af46852306c71), [`5b893a9bff`](https://github.com/pankod/refine/commit/5b893a9bff707d90b0f898a52d46a7154108b0a0)]:
    -   @pankod/refine-core@3.31.0

## 3.25.6

### Patch Changes

-   Update `key`s in `<Sider/>` component to use `route`

*   Deprecated `useMenu` from `@pankod/refine-antd` and replaced with the `useMenu` from `@pankod/refine-core`

*   Updated dependencies []:
    -   @pankod/refine-core@3.30.0

## 3.25.6

### Patch Changes

-   Could not stop `e.preventDefault()` redirection in Next.js `<Link>` component. So we added in `e.stopPropagation()` for [Ant Design Buttons](https://refine.dev/docs/ui-frameworks/antd/components/buttons/clone-button/) and [Material UI Buttons](https://refine.dev/docs/ui-frameworks/mui/components/buttons/clone-button/)

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
