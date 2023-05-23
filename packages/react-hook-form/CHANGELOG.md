# @pankod/refine-react-hook-form

## 4.4.0

### Minor Changes

-   [#4306](https://github.com/refinedev/refine/pull/4306) [`e6eb4dea627`](https://github.com/refinedev/refine/commit/e6eb4dea6279983d04a9f654ac2cd74915fba075) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: `syncWithLocation.syncId` default to `true` for `useModalForm`.

## 4.3.0

### Minor Changes

-   [#4306](https://github.com/refinedev/refine/pull/4306) [`e6eb4dea627`](https://github.com/refinedev/refine/commit/e6eb4dea6279983d04a9f654ac2cd74915fba075) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: `syncWithLocation.syncId` default to `true` for `useModalForm`.

## 4.2.4

### Patch Changes

-   [#4241](https://github.com/refinedev/refine/pull/4241) [`fbe109b5a8b`](https://github.com/refinedev/refine/commit/fbe109b5a8ba8f5d870eab2d96b7477508bceec0) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Added new generic types to the `useForm` hooks. Now you can pass the query types and the mutation types to the hook.

## 4.2.3

### Patch Changes

-   [#4241](https://github.com/refinedev/refine/pull/4241) [`fbe109b5a8b`](https://github.com/refinedev/refine/commit/fbe109b5a8ba8f5d870eab2d96b7477508bceec0) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Added new generic types to the `useForm` hooks. Now you can pass the query types and the mutation types to the hook.

## 4.2.2

### Patch Changes

-   [#4210](https://github.com/refinedev/refine/pull/4210) [`b992e11e338`](https://github.com/refinedev/refine/commit/b992e11e3387464186d552112460aebbc18d3cc5) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: The values of the registered fields were set using the `reset()` function. This has been changed to use `getValues()` instead. This fixes an issue where the values of the registered fields' dirty state were not being set correctly.

## 4.2.1

### Patch Changes

-   [#4210](https://github.com/refinedev/refine/pull/4210) [`b992e11e338`](https://github.com/refinedev/refine/commit/b992e11e3387464186d552112460aebbc18d3cc5) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: The values of the registered fields were set using the `reset()` function. This has been changed to use `getValues()` instead. This fixes an issue where the values of the registered fields' dirty state were not being set correctly.

## 4.2.0

### Minor Changes

-   [#4113](https://github.com/refinedev/refine/pull/4113) [`1c13602e308`](https://github.com/refinedev/refine/commit/1c13602e308ffba93099922c144966f25fb2087d) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Added missing third generic parameter to hooks which are using `useQuery` internally.

    For example:

    ```ts
    import { useOne, HttpError } from "@refinedev/core";

    const { data } = useOne<{ count: string }, HttpError, { count: number }>({
        resource: "product-count",
        queryOptions: {
            select: (rawData) => {
                return {
                    data: {
                        count: Number(rawData?.data?.count),
                    },
                };
            },
        },
    });

    console.log(typeof data?.data.count); // number
    ```

## 4.1.6

### Patch Changes

-   [#4120](https://github.com/refinedev/refine/pull/4120) [`1f310bd7b69`](https://github.com/refinedev/refine/commit/1f310bd7b6900f534bb57db90d3fc8a6ea4364c9) Thanks [@aliemir](https://github.com/aliemir)! - Fix broken `useModalForm` with `create` actions.

## 4.1.5

### Patch Changes

-   [#4120](https://github.com/refinedev/refine/pull/4120) [`1f310bd7b69`](https://github.com/refinedev/refine/commit/1f310bd7b6900f534bb57db90d3fc8a6ea4364c9) Thanks [@aliemir](https://github.com/aliemir)! - Fix broken `useModalForm` with `create` actions.

## 4.1.4

### Patch Changes

-   [#4114](https://github.com/refinedev/refine/pull/4114) [`afdaed3dd83`](https://github.com/refinedev/refine/commit/afdaed3dd8357d6106ed5a4e524d82cfcceaf7ec) Thanks [@aliemir](https://github.com/aliemir)! - Updated `useModalForm` hook's `modal.show` method to check if there's an `id` present or provided. If there is, it will continue to show the modal. If not, the modal will not show. (Resolves #4062)

## 4.1.3

### Patch Changes

-   [#4114](https://github.com/refinedev/refine/pull/4114) [`afdaed3dd83`](https://github.com/refinedev/refine/commit/afdaed3dd8357d6106ed5a4e524d82cfcceaf7ec) Thanks [@aliemir](https://github.com/aliemir)! - Updated `useModalForm` hook's `modal.show` method to check if there's an `id` present or provided. If there is, it will continue to show the modal. If not, the modal will not show. (Resolves #4062)

## 4.1.2

### Patch Changes

-   [#3909](https://github.com/refinedev/refine/pull/3909) [`631512e91ec`](https://github.com/refinedev/refine/commit/631512e91ecf79f12d735de6b11e4822f01cc6f5) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Fixed a bug that the form values were not filled when the user next to steps.

## 4.1.1

### Patch Changes

-   [#3909](https://github.com/refinedev/refine/pull/3909) [`631512e91ec`](https://github.com/refinedev/refine/commit/631512e91ecf79f12d735de6b11e4822f01cc6f5) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Fixed a bug that the form values were not filled when the user next to steps.

## 4.1.0

### Minor Changes

-   Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
    All `react-hook-form` imports re-exported from `@refinedev/react-hook-form` have been removed. You should import them from the `react-hook-form` package directly.

    If the package is not installed, you can install it with your package manager:

    ```bash
    npm install react-hook-form
    # or
    pnpm add react-hook-form
    # or
    yarn add react-hook-form
    ```

    After that, you can import them from `react-hook-form` package directly.

    ```diff
    - import { useForm, Controller } from "@refinedev/react-hook-form";

    + import { useForm } from "@refinedev/react-hook-form";
    + import { Controller } from "react-hook-form";
    ```

-   Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
    Updated the components to match the changes in routing system of `@refinedev/core`.

    ## `meta` property in components

    This includes `meta` props in buttons and `Sider` component. `meta` property can be used to pass additional parameters to the navigation paths.

    For a `posts` resource definition like this:

    ```tsx
    <Refine
        resources={[
            {
                name: "posts",
                list: "/posts",
                show: "/:authorId/posts/:id",
            }
        ]}
    >
    ```

    You can pass `authorId` to the `ShowButton` component like this:

    ```tsx
    <ShowButton resource="posts" id="1" meta={{ authorId: 123 }}>
    ```

    This will navigate to `/123/posts/1` path.

-   Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
    **Moving to the `@refinedev` scope 🎉🎉**

    Moved to the `@refinedev` scope and updated our packages to use the new scope. From now on, all packages will be published under the `@refinedev` scope with their new names.

    Now, we're also removing the `refine` prefix from all packages. So, the `@pankod/refine-core` package is now `@refinedev/core`, `@pankod/refine-antd` is now `@refinedev/antd`, and so on.

### Patch Changes

## 3.39.0

### Minor Changes

-   [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

## 3.38.0

### Minor Changes

-   [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

## 3.37.2

### Patch Changes

-   [#3307](https://github.com/refinedev/refine/pull/3307) [`1262f2c4589`](https://github.com/refinedev/refine/commit/1262f2c45897aaea7acc8bb67b825305749c220c) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed resetting values on step changes - #3290

## 3.37.1

### Patch Changes

-   [#3307](https://github.com/refinedev/refine/pull/3307) [`1262f2c4589`](https://github.com/refinedev/refine/commit/1262f2c45897aaea7acc8bb67b825305749c220c) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed resetting values on step changes - #3290

## 3.37.0

### Minor Changes

-   [#3209](https://github.com/refinedev/refine/pull/3209) [`e0279bce6f1`](https://github.com/refinedev/refine/commit/e0279bce6f1a743014df225ea1eacf2668f91200) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Export all types.

## 3.36.0

### Minor Changes

-   [#3209](https://github.com/refinedev/refine/pull/3209) [`e0279bce6f1`](https://github.com/refinedev/refine/commit/e0279bce6f1a743014df225ea1eacf2668f91200) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Export all types.

## 3.35.0

### Minor Changes

-   [#3196](https://github.com/refinedev/refine/pull/3196) [`78b3fd90fcf`](https://github.com/refinedev/refine/commit/78b3fd90fcf44b85a3b1d022722f047feb26f664) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Export `UseFieldArrayReplace` type from `react-hook-form`.

## 3.34.0

### Minor Changes

-   [#3196](https://github.com/refinedev/refine/pull/3196) [`78b3fd90fcf`](https://github.com/refinedev/refine/commit/78b3fd90fcf44b85a3b1d022722f047feb26f664) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Export `UseFieldArrayReplace` type from `react-hook-form`.

## 3.33.2

### Patch Changes

-   Fixed version of react-router to `6.3.0`

## 3.33.1

### Patch Changes

-   [#2501](https://github.com/refinedev/refine/pull/2501) [`4095a578d4`](https://github.com/refinedev/refine/commit/4095a578d471254ee58412f130ac5a0f3a62880f) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed version of react-router to `6.3.0`

## 3.33.0

### Minor Changes

-   Update type declaration generation with `tsc` instead of `tsup` for better navigation throughout projects source code.

## 3.32.0

### Minor Changes

-   [#2440](https://github.com/refinedev/refine/pull/2440) [`0150dcd070`](https://github.com/refinedev/refine/commit/0150dcd0700253f1c4908e7e5f2e178bb122e9af) Thanks [@aliemir](https://github.com/aliemir)! - Update type declaration generation with `tsc` instead of `tsup` for better navigation throughout projects source code.

## 3.31.4

### Patch Changes

-   Added type checking to fix fields reset bug

## 3.31.3

### Patch Changes

-   [#2296](https://github.com/refinedev/refine/pull/2296) [`cca5a3d0c1`](https://github.com/refinedev/refine/commit/cca5a3d0c14a20e0454c6e15cc44abdcfe6420c5) Thanks [@ozkalai](https://github.com/ozkalai)! - Added type checking to fix fields reset bug

## 3.31.2

### Patch Changes

-   Fixed immediate triggering of `handleSubmit`

## 3.31.1

### Patch Changes

-   [#2288](https://github.com/refinedev/refine/pull/2288) [`6847672849`](https://github.com/refinedev/refine/commit/68476728494dc0fd412883de30e2c99c75a1d559) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed immediate triggering of `handleSubmit`

## 3.31.0

### Minor Changes

-   Add React@18 support 🚀

## 3.30.0

### Minor Changes

-   [#1718](https://github.com/refinedev/refine/pull/1718) [`b38620d842`](https://github.com/refinedev/refine/commit/b38620d84237e13212811daada7b49ee654c70eb) Thanks [@omeraplak](https://github.com/omeraplak)! - Add React@18 support 🚀

## 3.29.0

### Minor Changes

-   All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

    Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

## 3.28.0

### Minor Changes

-   [#2217](https://github.com/refinedev/refine/pull/2217) [`b4aae00f77`](https://github.com/refinedev/refine/commit/b4aae00f77a2476d847994db21298ae25e4cf6e5) Thanks [@omeraplak](https://github.com/omeraplak)! - All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

    Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

## 3.27.2

### Patch Changes

-   Fixed a bug that prevented modal or drawer from closing after submit.

## 3.27.1

### Patch Changes

-   [#1931](https://github.com/refinedev/refine/pull/1931) [`4012d3c4ae`](https://github.com/refinedev/refine/commit/4012d3c4aeb61a6190f7624b662cbd20ca900679) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Fixed a bug that prevented modal or drawer from closing after submit.

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

-   [#1923](https://github.com/refinedev/refine/pull/1923) [`45cd1f7097`](https://github.com/refinedev/refine/commit/45cd1f7097e68604f6f2908b8befd0c61e44d419) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Removed `saveButtonProps` exported from `useModalForm` because `saveButtonProps` is already exported from `useForm` hook in `@pankod/refine-react-hook-form`.

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

-   [#1866](https://github.com/refinedev/refine/pull/1866) [`9c72dae441`](https://github.com/refinedev/refine/commit/9c72dae4418fde8792375be00a9628a0df751c6d) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Change `isBackValidate` default value to `false` for [`useStepsForm`](https://refine.dev/docs/packages/react-hook-form/useStepsForm/).

## 3.22.2

### Patch Changes

-   [#1873](https://github.com/refinedev/refine/pull/1873) [`2deb19babf`](https://github.com/refinedev/refine/commit/2deb19babfc6db5b00b111ec29aa5ece4c371bbc) Thanks [@aliemir](https://github.com/aliemir)! - Removed dummy default values from internal contexts.
    Updated contexts:

    -   Auth
    -   Access Control
    -   Notification
    -   Translation (i18n)
    -   unsavedWarn

    **BREAKING:** `useGetLocale` hook now can return `undefined` instead of a fallback value of `en` in cases of `i18nProvider` being `undefined`.

-   Updated dependencies [[`2deb19babf`](https://github.com/refinedev/refine/commit/2deb19babfc6db5b00b111ec29aa5ece4c371bbc)]:
    -   @pankod/refine-core@3.23.2
