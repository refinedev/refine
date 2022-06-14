# @pankod/refine-react-hook-form

## 3.27.1

### Patch Changes

-   [#1931](https://github.com/pankod/refine/pull/1931) [`4012d3c4ae`](https://github.com/pankod/refine/commit/4012d3c4aeb61a6190f7624b662cbd20ca900679) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Fixed a bug that prevented modal or drawer from closing after submit.

## 3.27.0

### Minor Changes

-   Removed `saveButtonProps` exported from `useModalForm` because `saveButtonProps` is already exported from `useForm` hook in `@pankod/refine-react-hook-form`.

    ```diff
     const {
       modal: {
    -    saveButtonProps
       },
    +  saveButtonProps
     } = useModalForm();
    ```

## 3.26.0

### Minor Changes

-   [#1923](https://github.com/pankod/refine/pull/1923) [`45cd1f7097`](https://github.com/pankod/refine/commit/45cd1f7097e68604f6f2908b8befd0c61e44d419) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Removed `saveButtonProps` exported from `useModalForm` because `saveButtonProps` is already exported from `useForm` hook in `@pankod/refine-react-hook-form`.

    ```diff
     const {
       modal: {
    -    saveButtonProps
       },
    +  saveButtonProps
     } = useModalForm();
    ```

## 3.23.0

### Minor Changes

-   [#1866](https://github.com/pankod/refine/pull/1866) [`9c72dae441`](https://github.com/pankod/refine/commit/9c72dae4418fde8792375be00a9628a0df751c6d) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Change `isBackValidate` default value to `false` for [`useStepsForm`](https://refine.dev/docs/packages/react-hook-form/useStepsForm/).

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
