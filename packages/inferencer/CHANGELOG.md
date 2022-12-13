# @pankod/refine-mantine

## 1.6.1

### Patch Changes

-   [#3200](https://github.com/refinedev/refine/pull/3200) [`8c9efbd40db`](https://github.com/refinedev/refine/commit/8c9efbd40dba7b6a2bb4e9060942cdc0cfe6d056) Thanks [@aliemir](https://github.com/aliemir)! - Handle kebab-case relation suffixes for a wider case support. (e.g. `category-id`,`category-ids`)

## 1.6.0

### Minor Changes

-   [#3173](https://github.com/refinedev/refine/pull/3173) [`15402d3a70f`](https://github.com/refinedev/refine/commit/15402d3a70fead18bb7d49eae75fe5afa6b9b4f3) Thanks [@aliemir](https://github.com/aliemir)! - - Added `fieldTransformer` prop to inferencer components to let users transform or hide the field to be rendered.
    -   Hide networks errors caused by the relation detection process.
    -   Added the ability to detect relations from basic types like `"text"` and `"number"`.

## 1.5.0

### Minor Changes

-   [#3173](https://github.com/refinedev/refine/pull/3173) [`15402d3a70f`](https://github.com/refinedev/refine/commit/15402d3a70fead18bb7d49eae75fe5afa6b9b4f3) Thanks [@aliemir](https://github.com/aliemir)! - - Added `fieldTransformer` prop to inferencer components to let users transform or hide the field to be rendered.
    -   Hide networks errors caused by the relation detection process.
    -   Added the ability to detect relations from basic types like `"text"` and `"number"`.

## 1.4.0

### Minor Changes

-   [#3166](https://github.com/refinedev/refine/pull/3166) [`b41e89ea7eb`](https://github.com/refinedev/refine/commit/b41e89ea7eb9c2a930dcf41713c527a875de7cbf) Thanks [@aliemir](https://github.com/aliemir)! - Replaced `react-live` package with a maintained fork `@aliemir/react-live` with TypeScript support.

## 1.3.0

### Minor Changes

-   [#3166](https://github.com/refinedev/refine/pull/3166) [`b41e89ea7eb`](https://github.com/refinedev/refine/commit/b41e89ea7eb9c2a930dcf41713c527a875de7cbf) Thanks [@aliemir](https://github.com/aliemir)! - Replaced `react-live` package with a maintained fork `@aliemir/react-live` with TypeScript support.

## 1.2.2

### Patch Changes

-   [#3123](https://github.com/refinedev/refine/pull/3123) [`5e480338852`](https://github.com/refinedev/refine/commit/5e48033885273a05f3eebbcb4bcf1d28220bb6b3) Thanks [@salihozdemir](https://github.com/salihozdemir)! - - Removed the requirement to define resource for relations.
    -   Component names and variable names are now generated primarily by label after the resource name.
    -   Added a new base interface component
        > ```diff
        > - import {
        > -    AntdShowInferencer,
        > -    AntdEditInferencer,
        > -    AntdListInferencer,
        > -    AntdEditInferencer,
        > - } from "@pankod/refine-inferencer/antd";
        > + import { AntdInferencer } from "@pankod/refine-inferencer/antd";
        >
        > <Refine
        >     ...
        >     resources={[
        >         {
        >             name: "samples",
        > -           list: AntdListInferencer,
        > +           list: AntdInferencer,
        > -           edit: AntdEditInferencer,
        > +           edit: AntdInferencer,
        > -           show: AntdShowInferencer,
        > +           show: AntdInferencer,
        > -           create: AntdEditInferencer,
        > +           create: AntdInferencer,
        >         },
        >
        >     ]}
        > />
        >
        > ```

## 1.2.1

### Patch Changes

-   [#3123](https://github.com/refinedev/refine/pull/3123) [`5e480338852`](https://github.com/refinedev/refine/commit/5e48033885273a05f3eebbcb4bcf1d28220bb6b3) Thanks [@salihozdemir](https://github.com/salihozdemir)! - - Removed the requirement to define resource for relations.
    -   Component names and variable names are now generated primarily by label after the resource name.
    -   Added a new base interface component
        > ```diff
        > - import {
        > -    AntdShowInferencer,
        > -    AntdEditInferencer,
        > -    AntdListInferencer,
        > -    AntdEditInferencer,
        > - } from "@pankod/refine-inferencer/antd";
        > + import { AntdInferencer } from "@pankod/refine-inferencer/antd";
        >
        > <Refine
        >     ...
        >     resources={[
        >         {
        >             name: "samples",
        > -           list: AntdListInferencer,
        > +           list: AntdInferencer,
        > -           edit: AntdEditInferencer,
        > +           edit: AntdInferencer,
        > -           show: AntdShowInferencer,
        > +           show: AntdInferencer,
        > -           create: AntdEditInferencer,
        > +           create: AntdInferencer,
        >         },
        >
        >     ]}
        > />
        >
        > ```

## 1.2.0

### Minor Changes

-   [#3027](https://github.com/refinedev/refine/pull/3027) [`177d0a764fe`](https://github.com/refinedev/refine/commit/177d0a764feb60fe9235a36debc052133dc72fa8) Thanks [@aliemir](https://github.com/aliemir)! - Initial release of the **Inferencer** package.

    This package provides series of components per each UI integration to generate **list**, **show** and **edit** pages for your resources. The fields and their representation are inferred from your resource's API response. Code is generated and presented with a preview and option to copy and edit in your project.

    **Note:** It's highly advised to only use this package in development environments. While generating the sample code, multiple requests are made to the API and the result might not be the best application for your data.

    ## Usage

    Components for UI integrations are exported in sub directories. For example, to use the components for Ant Design integration, you can import them like this:

    ```tsx
    import {
        AntdListInferencer,
        AntdShowInferencer,
        AntdEditInferencer,
    } from "@pankod/refine-inferencer/antd";
    ```

    After importing the component, you can directly use it in `<Refine/>` component's `resources` prop.

    ```tsx
    <Refine
        resources={[
            {
                name: "posts",
                list: AntdListInferencer,
                show: AntdShowInferencer,
                edit: AntdEditInferencer,
            },
        ]}
    />
    ```

    **Tip:** Relation data is only handled if the resource is present in the `resources` array. For example, if you have a `posts` resource with a `users` relation, you need to add `users` resource to the `resources` array as well. Otherwise, inferencer will try to show the relation data as a simple field like string or a number.

### Patch Changes

-   [#3064](https://github.com/refinedev/refine/pull/3064) [`27df262dd0a`](https://github.com/refinedev/refine/commit/27df262dd0acf6cfefac1518b4133668384a89ac) Thanks [@aliemir](https://github.com/aliemir)! - Added `undefined` check for date field values in `@pankod/refine-inferencer/antd`'s `EditInferencer` component to prevent setting it to current date when it's not provided.

## 1.1.0

### Minor Changes

-   [#3027](https://github.com/refinedev/refine/pull/3027) [`177d0a764fe`](https://github.com/refinedev/refine/commit/177d0a764feb60fe9235a36debc052133dc72fa8) Thanks [@aliemir](https://github.com/aliemir)! - Initial release of the **Inferencer** package.

    This package provides series of components per each UI integration to generate **list**, **show** and **edit** pages for your resources. The fields and their representation are inferred from your resource's API response. Code is generated and presented with a preview and option to copy and edit in your project.

    **Note:** It's highly advised to only use this package in development environments. While generating the sample code, multiple requests are made to the API and the result might not be the best application for your data.

    ## Usage

    Components for UI integrations are exported in sub directories. For example, to use the components for Ant Design integration, you can import them like this:

    ```tsx
    import {
        AntdListInferencer,
        AntdShowInferencer,
        AntdEditInferencer,
    } from "@pankod/refine-inferencer/antd";
    ```

    After importing the component, you can directly use it in `<Refine/>` component's `resources` prop.

    ```tsx
    <Refine
        resources={[
            {
                name: "posts",
                list: AntdListInferencer,
                show: AntdShowInferencer,
                edit: AntdEditInferencer,
            },
        ]}
    />
    ```

    **Tip:** Relation data is only handled if the resource is present in the `resources` array. For example, if you have a `posts` resource with a `users` relation, you need to add `users` resource to the `resources` array as well. Otherwise, inferencer will try to show the relation data as a simple field like string or a number.

### Patch Changes

-   [#3064](https://github.com/refinedev/refine/pull/3064) [`27df262dd0a`](https://github.com/refinedev/refine/commit/27df262dd0acf6cfefac1518b4133668384a89ac) Thanks [@aliemir](https://github.com/aliemir)! - Added `undefined` check for date field values in `@pankod/refine-inferencer/antd`'s `EditInferencer` component to prevent setting it to current date when it's not provided.

## 1.6.11

### Patch Changes

-   Add primary color to `<SaveButton/>`'s `<ActionIcon/>` component.

## 1.6.10

### Patch Changes

-   [#2758](https://github.com/pankod/refine/pull/2758) [`3960549907`](https://github.com/pankod/refine/commit/39605499074d73a75d73f8bfce03088f63915027) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Add primary color to `<SaveButton/>`'s `<ActionIcon/>` component.

## 1.6.9

### Patch Changes

-   Fixed incorrectly used hooks in AuthPage component

## 1.6.8

### Patch Changes

-   [#2769](https://github.com/pankod/refine/pull/2769) [`501aebe997`](https://github.com/pankod/refine/commit/501aebe9974520c30093cc9cec781ee58129d053) Thanks [@dgelineau](https://github.com/dgelineau)! - Fixed incorrectly used hooks in AuthPage component

## 1.6.7

### Patch Changes

-   Fixed <ErrorComponent /> responsive design for mobile devices

## 1.6.6

### Patch Changes

-   [#2748](https://github.com/pankod/refine/pull/2748) [`0eaddb65ee`](https://github.com/pankod/refine/commit/0eaddb65ee77777fd1e6b9e5501c18d69bef4be8) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Fixed <ErrorComponent /> responsive design for mobile devices

## 1.6.5

### Patch Changes

-   -   Added `<LoadingOverlay />` component to basic view components.
    -   Update `goBack` prop usage, now it can be passed to `<ActionButton />`'s children.
    -   Fixed the issue that when `title` prop is passed to basic views, the back button is not shown.
    -   Default title size decreased from `h2` to `h3`.
-   Updated dependencies []:
    -   @pankod/refine-ui-types@0.11.4

## 1.6.4

### Patch Changes

-   [#2718](https://github.com/pankod/refine/pull/2718) [`d78d2a2a99`](https://github.com/pankod/refine/commit/d78d2a2a99adb508094069cda23deaba55c25b63) Thanks [@salihozdemir](https://github.com/salihozdemir)! - - Added `<LoadingOverlay />` component to basic view components.
    -   Update `goBack` prop usage, now it can be passed to `<ActionButton />`'s children.
    -   Fixed the issue that when `title` prop is passed to basic views, the back button is not shown.
    -   Default title size decreased from `h2` to `h3`.
-   Updated dependencies [[`d78d2a2a99`](https://github.com/pankod/refine/commit/d78d2a2a99adb508094069cda23deaba55c25b63)]:
    -   @pankod/refine-ui-types@0.11.3

## 1.6.3

### Patch Changes

-   Fixed `providers` property empty array state in `<AuthPage />` component

## 1.6.2

### Patch Changes

-   Fixed `providers` property empty array state in `<AuthPage />` component

## 1.6.1

### Patch Changes

-   [#2712](https://github.com/pankod/refine/pull/2712) [`c434055011`](https://github.com/pankod/refine/commit/c434055011cbdd846c9f228c23987607bb828a1b) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed `providers` property empty array state in `<AuthPage />` component

## 1.6.0

### Minor Changes

-   Updated `formProps` property on `<AuthPage />` component

### Patch Changes

-   Added `clearable` prop to `useSelect` hook that is `true` by default.

## 1.5.0

### Minor Changes

-   [#2663](https://github.com/pankod/refine/pull/2663) [`c624a52b23`](https://github.com/pankod/refine/commit/c624a52b2310db1349ec556a7671f23779cc3622) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Updated `formProps` property on `<AuthPage />` component

### Patch Changes

-   [#2701](https://github.com/pankod/refine/pull/2701) [`ddd9eb3aff`](https://github.com/pankod/refine/commit/ddd9eb3aff961fcedf354f2c77c1844131d713a1) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Added `clearable` prop to `useSelect` hook that is `true` by default.

## 1.4.0

### Minor Changes

-   -   Added new <AuthPage /> component core and mantine support.
    -   Move Auth types `@pankod/refine-ui-types` to `@pankod/refine-core`

## 1.3.0

### Minor Changes

-   [#2627](https://github.com/pankod/refine/pull/2627) [`c5fb45d61f`](https://github.com/pankod/refine/commit/c5fb45d61fa7470a7a34762ad19d17e9f87e4421) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - - Added new <AuthPage /> component core and mantine support.
    -   Move Auth types `@pankod/refine-ui-types` to `@pankod/refine-core`

## 1.2.0

### Minor Changes

-   First release of `@pankod/refine-mantine` 🎉

## 1.1.0

### Minor Changes

-   [#2505](https://github.com/pankod/refine/pull/2505) [`a4dbb63c88`](https://github.com/pankod/refine/commit/a4dbb63c881a83e5146829130b1377e791b44469) Thanks [@salihozdemir](https://github.com/salihozdemir)! - First release of `@pankod/refine-mantine` 🎉

## 1.0.6

### Patch Changes

-   Updated dependencies []:
    -   @pankod/refine-ui-types@0.11.0

## 1.0.5

### Patch Changes

-   Updated dependencies [[`a65525de6f`](https://github.com/pankod/refine/commit/a65525de6f995babfca1058e933cdbea67d6032e)]:
    -   @pankod/refine-ui-types@0.10.0

## 1.0.4

### Patch Changes

-   Updated dependencies []:
    -   @pankod/refine-ui-types@0.9.0

## 1.0.3

### Patch Changes

-   Updated dependencies [[`ad99916d6d`](https://github.com/pankod/refine/commit/ad99916d6dbd181b857fd7df7b9619d8cac5e3e0)]:
    -   @pankod/refine-ui-types@0.8.0

## 1.0.2

### Patch Changes

-   Fixed version of react-router to `6.3.0`

-   Updated dependencies []:
    -   @pankod/refine-ui-types@0.7.0

## 1.0.1

### Patch Changes

-   [#2501](https://github.com/pankod/refine/pull/2501) [`4095a578d4`](https://github.com/pankod/refine/commit/4095a578d471254ee58412f130ac5a0f3a62880f) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed version of react-router to `6.3.0`
