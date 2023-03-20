# @pankod/refine-chakra-ui

## 2.1.1

### Patch Changes

-   [#3919](https://github.com/refinedev/refine/pull/3919) [`dd90bf43d50`](https://github.com/refinedev/refine/commit/dd90bf43d50ffe4e78a5caa5c0831d2ba8610e0d) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - Fixed: When `title` prop is `false` in crud components, the default `title` was rendered. It should not render anything.

## 2.1.0

### Minor Changes

-   Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
    `meta` prop is added. To ensure backward compatibility, `metaData` prop will be used if `meta` prop is not provided.

-   Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
    Updated buttons with `resource` property. `resourceNameOrRouteName` is now deprecated but kept working until next major version.

-   Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!

    ## 🪄 Migrating your project automatically with refine-codemod ✨

    [`@refinedev/codemod`](https://github.com/refinedev/refine/tree/master/packages/codemod) package handles the breaking changes for your project automatically, without any manual steps. It migrates your project from `3.x.x` to `4.x.x`.

    Just `cd` into root folder of your project (where `package.json` is contained) and run this command:

    ```sh
    npx @refinedev/codemod@latest refine3-to-refine4
    ```

    And it's done. Now your project uses `refine@4.x.x`.

    ## 📝 Changelog

    All **Chakra UI** components re-exported from `@refinedev/chakra-ui` have been removed. You should import them from `@chakra-ui/react` package directly.

    If the packages are not installed, you can install them with your package manager:

    > You don't have to install all of these packages below. Only install the packages you use.

    ```bash
    npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion
    # or
    pnpm add @chakra-ui/react @emotion/react @emotion/styled framer-motion
    # or
    yarn add @chakra-ui/react @emotion/react @emotion/styled framer-motion
    ```

    After that, you can import them from related packages directly.

    ```diff
    - import {
    -    ChakraProvider,
    -    Input,
    -    Select,
    -    ShowButton,
    -    usePagination,
    - } from "@refinedev/chakra-ui";

    + import { usePagination, ShowButton } from "@refinedev/chakra-ui";
    + import { ChakraProvider, Input, Select } from "@chakra-ui/react";
    ```

-   Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!

    -   `<ReadyPage>` isnow deprecated.
    -   Created a `<WelcomePage>` component to welcome users.

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

    ## Removed props

    `ignoreAccessControlProvider` prop is removed from buttons.

-   Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
    Added legacy auth provider and new auth provider support to all components and hooks.

-   Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
    **Moving to the `@refinedev` scope 🎉🎉**

    Moved to the `@refinedev` scope and updated our packages to use the new scope. From now on, all packages will be published under the `@refinedev` scope with their new names.

    Now, we're also removing the `refine` prefix from all packages. So, the `@pankod/refine-core` package is now `@refinedev/core`, `@pankod/refine-antd` is now `@refinedev/antd`, and so on.

### Patch Changes

## 1.8.0

### Minor Changes

-   [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

### Patch Changes

-   Updated dependencies [[`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb)]:
    -   @pankod/refine-react-hook-form@3.39.0
    -   @pankod/refine-ui-types@0.16.0

## 1.7.0

### Minor Changes

-   [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

### Patch Changes

-   Updated dependencies [[`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb)]:
    -   @pankod/refine-react-hook-form@3.38.0
    -   @pankod/refine-ui-types@0.15.0

## 1.6.6

### Patch Changes

-   [`03afb3215ef`](https://github.com/refinedev/refine/commit/03afb3215ef6e2331ca4f1315905366ec3617e2e) Thanks [@omeraplak](https://github.com/omeraplak)! - fix: button disabled states

## 1.6.5

### Patch Changes

-   [`03afb3215ef`](https://github.com/refinedev/refine/commit/03afb3215ef6e2331ca4f1315905366ec3617e2e) Thanks [@omeraplak](https://github.com/omeraplak)! - fix: button disabled states

## 1.6.4

### Patch Changes

-   [`89a020942c8`](https://github.com/refinedev/refine/commit/89a020942c887e6c74f60c52ebc707774221871a) Thanks [@omeraplak](https://github.com/omeraplak)! - fix: deleted unused chakra-ui exports

## 1.6.3

### Patch Changes

-   [`89a020942c8`](https://github.com/refinedev/refine/commit/89a020942c887e6c74f60c52ebc707774221871a) Thanks [@omeraplak](https://github.com/omeraplak)! - fix: deleted unused chakra-ui exports

## 1.6.2

### Patch Changes

-   [#3220](https://github.com/refinedev/refine/pull/3220) [`b867497f469`](https://github.com/refinedev/refine/commit/b867497f4694a5fbd330106a39256dee3c56199b) Thanks [@aliemir](https://github.com/aliemir)! - Updated image links in `README.MD` with CDN

-   Updated dependencies [[`b867497f469`](https://github.com/refinedev/refine/commit/b867497f4694a5fbd330106a39256dee3c56199b)]:
    -   @pankod/refine-ui-types@0.14.2

## 1.6.1

### Patch Changes

-   [#3220](https://github.com/refinedev/refine/pull/3220) [`b867497f469`](https://github.com/refinedev/refine/commit/b867497f4694a5fbd330106a39256dee3c56199b) Thanks [@aliemir](https://github.com/aliemir)! - Updated image links in `README.MD` with CDN

-   Updated dependencies [[`b867497f469`](https://github.com/refinedev/refine/commit/b867497f4694a5fbd330106a39256dee3c56199b)]:
    -   @pankod/refine-ui-types@0.14.1

## 1.6.0

### Minor Changes

-   [#3159](https://github.com/refinedev/refine/pull/3159) [`af2eefb32a4`](https://github.com/refinedev/refine/commit/af2eefb32a4df157062c28125c53aa3a47f48ff8) Thanks [@aliemir](https://github.com/aliemir)! - Updated `LoginPage` and `ReadyPage` to use **refine** logos from CDN rather than bundled svg files.

## 1.5.0

### Minor Changes

-   [#3159](https://github.com/refinedev/refine/pull/3159) [`af2eefb32a4`](https://github.com/refinedev/refine/commit/af2eefb32a4df157062c28125c53aa3a47f48ff8) Thanks [@aliemir](https://github.com/aliemir)! - Updated `LoginPage` and `ReadyPage` to use **refine** logos from CDN rather than bundled svg files.

## 1.4.4

### Patch Changes

-   [#3128](https://github.com/refinedev/refine/pull/3128) [`db1000a7628`](https://github.com/refinedev/refine/commit/db1000a7628d910c965eb63cd1cff81ffcd4fd4a) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Fixed: `crud` components import path changed to relative path due to export issues on build.

## 1.4.3

### Patch Changes

-   [#3128](https://github.com/refinedev/refine/pull/3128) [`db1000a7628`](https://github.com/refinedev/refine/commit/db1000a7628d910c965eb63cd1cff81ffcd4fd4a) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Fixed: `crud` components import path changed to relative path due to export issues on build.

## 1.4.2

### Patch Changes

-   [#3109](https://github.com/refinedev/refine/pull/3109) [`16549ed3012`](https://github.com/refinedev/refine/commit/16549ed30128750f04ae17da12024b9734d5adae) Thanks [@aliemir](https://github.com/aliemir)! - Updated `swizzle` items and their messages to include extra information and usage examples.

## 1.4.1

### Patch Changes

-   [#3109](https://github.com/refinedev/refine/pull/3109) [`16549ed3012`](https://github.com/refinedev/refine/commit/16549ed30128750f04ae17da12024b9734d5adae) Thanks [@aliemir](https://github.com/aliemir)! - Updated `swizzle` items and their messages to include extra information and usage examples.

## 1.4.0

### Minor Changes

-   [#3062](https://github.com/refinedev/refine/pull/3062) [`6c2ed708a9a`](https://github.com/refinedev/refine/commit/6c2ed708a9a76faddb9d27a0aca9f4ada3c270af) Thanks [@aliemir](https://github.com/aliemir)! - - Updated components and their type imports to make them compatible with `swizzle` feature.
    -   Added `refine.config.js` to configure the `swizzle` feature.

## 1.3.0

### Minor Changes

-   [#3062](https://github.com/refinedev/refine/pull/3062) [`6c2ed708a9a`](https://github.com/refinedev/refine/commit/6c2ed708a9a76faddb9d27a0aca9f4ada3c270af) Thanks [@aliemir](https://github.com/aliemir)! - - Updated components and their type imports to make them compatible with `swizzle` feature.
    -   Added `refine.config.js` to configure the `swizzle` feature.

## 1.2.12

### Patch Changes

-   [#3011](https://github.com/refinedev/refine/pull/3011) [`593531713c3`](https://github.com/refinedev/refine/commit/593531713c3f88d8bca7f6b0397f4068ebc85a04) Thanks [@aliemir](https://github.com/aliemir)! - Fixed `<NumberField />` type for missing `value` prop type, which was erroring out when using `<NumberField />`.

## 1.2.11

### Patch Changes

-   [#3011](https://github.com/refinedev/refine/pull/3011) [`593531713c3`](https://github.com/refinedev/refine/commit/593531713c3f88d8bca7f6b0397f4068ebc85a04) Thanks [@aliemir](https://github.com/aliemir)! - Fixed `<NumberField />` type for missing `value` prop type, which was erroring out when using `<NumberField />`.

## 1.2.10

### Patch Changes

-   [#2969](https://github.com/refinedev/refine/pull/2969) [`a9459550a4`](https://github.com/refinedev/refine/commit/a9459550a49a640c5a1e393d4f2b8e6e9cd53dc6) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed peerDependencies of packages

## 1.2.9

### Patch Changes

-   [#2969](https://github.com/refinedev/refine/pull/2969) [`a9459550a4`](https://github.com/refinedev/refine/commit/a9459550a49a640c5a1e393d4f2b8e6e9cd53dc6) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed peerDependencies of packages

## 1.2.8

### Patch Changes

-   [#2970](https://github.com/refinedev/refine/pull/2970) [`513c078df1`](https://github.com/refinedev/refine/commit/513c078df1aa7b694fc41e5d710eff0d9a716fed) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Fixed responsive style for error page.

## 1.2.7

### Patch Changes

-   [#2970](https://github.com/refinedev/refine/pull/2970) [`513c078df1`](https://github.com/refinedev/refine/commit/513c078df1aa7b694fc41e5d710eff0d9a716fed) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Fixed responsive style for error page.

## 1.2.6

### Patch Changes

-   [#2959](https://github.com/refinedev/refine/pull/2959) [`3cd13fa5c2`](https://github.com/refinedev/refine/commit/3cd13fa5c24a38c3a14458e26a8a43567144b4ea) Thanks [@salihozdemir](https://github.com/salihozdemir)! - - Fixed error and ready pages issues that dark mode compatibility and mobile view issues.
    -   Fixed crud components mobile view issues and spacing issues.
    -   Update `Save` button icon button color and variant.
    -   Rename `TextFieldComponent` export name to `TextField`.
    -   Update `DeleteButton` color scheme.
    -   Add missing props to `RefreshButton`'s `IconButton`.

## 1.2.5

### Patch Changes

-   [#2959](https://github.com/refinedev/refine/pull/2959) [`3cd13fa5c2`](https://github.com/refinedev/refine/commit/3cd13fa5c24a38c3a14458e26a8a43567144b4ea) Thanks [@salihozdemir](https://github.com/salihozdemir)! - - Fixed error and ready pages issues that dark mode compatibility and mobile view issues.
    -   Fixed crud components mobile view issues and spacing issues.
    -   Update `Save` button icon button color and variant.
    -   Rename `TextFieldComponent` export name to `TextField`.
    -   Update `DeleteButton` color scheme.
    -   Add missing props to `RefreshButton`'s `IconButton`.

## 1.2.4

### Patch Changes

-   [#2948](https://github.com/refinedev/refine/pull/2948) [`add3da4c76`](https://github.com/refinedev/refine/commit/add3da4c76472d6c025aa3a2f0f21ecd3ab1589e) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Fix AuthPage styles props and dark theme colors.

## 1.2.3

### Patch Changes

-   [#2948](https://github.com/refinedev/refine/pull/2948) [`add3da4c76`](https://github.com/refinedev/refine/commit/add3da4c76472d6c025aa3a2f0f21ecd3ab1589e) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Fix AuthPage styles props and dark theme colors.

## 1.2.2

### Patch Changes

-   [`59d6bd5b83`](https://github.com/refinedev/refine/commit/59d6bd5b832e96304623ed8417d77a6556a41b82) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Added `href` property for `BreadcrumbItem` component to be able to fix the Next.js undefined `href` error.

## 1.2.1

### Patch Changes

-   [`59d6bd5b83`](https://github.com/refinedev/refine/commit/59d6bd5b832e96304623ed8417d77a6556a41b82) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Added `href` property for `BreadcrumbItem` component to be able to fix the Next.js undefined `href` error.

## 1.2.0

### Minor Changes

-   [`89f20b1da4`](https://github.com/refinedev/refine/commit/89f20b1da4301c4591341b3a39717fe0b7a587ca) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Add inital release of chakra-ui package.

## 1.1.0

### Minor Changes

-   [`89f20b1da4`](https://github.com/refinedev/refine/commit/89f20b1da4301c4591341b3a39717fe0b7a587ca) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Add inital release of chakra-ui package.
