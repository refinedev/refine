# @pankod/refine-antd

## 4.7.0

### Minor Changes

-   [#3324](https://github.com/refinedev/refine/pull/3324) [`9bfb34749bc`](https://github.com/refinedev/refine/commit/9bfb34749bc8ddaaf80ccffbd0ad6d0a4487309b) Thanks [@aliemir](https://github.com/aliemir)! - Added the ability to pass mutation options to `useMutation` hooks in mutation hooks:
    -   `useForm`
    -   `useStepsForm`
    -   `useModalForm`
    -   `useDrawerForm`

## 4.6.0

### Minor Changes

-   [#3324](https://github.com/refinedev/refine/pull/3324) [`9bfb34749bc`](https://github.com/refinedev/refine/commit/9bfb34749bc8ddaaf80ccffbd0ad6d0a4487309b) Thanks [@aliemir](https://github.com/aliemir)! - Added the ability to pass mutation options to `useMutation` hooks in mutation hooks:
    -   `useForm`
    -   `useStepsForm`
    -   `useModalForm`
    -   `useDrawerForm`

## 4.5.0

### Minor Changes

-   [#3294](https://github.com/refinedev/refine/pull/3294) [`3c9c8c07d21`](https://github.com/refinedev/refine/commit/3c9c8c07d2183595402d70a3a2bc49093778e183) Thanks [@aliemir](https://github.com/aliemir)! - Remove `getContainer: false` from `useModalForm` and `useDrawerForm` and let it fallback to the default value. Users wanting to override the default value can still do so by passing `getContainer` prop to the `Modal` and `Drawer` components.

## 4.4.0

### Minor Changes

-   [#3294](https://github.com/refinedev/refine/pull/3294) [`3c9c8c07d21`](https://github.com/refinedev/refine/commit/3c9c8c07d2183595402d70a3a2bc49093778e183) Thanks [@aliemir](https://github.com/aliemir)! - Remove `getContainer: false` from `useModalForm` and `useDrawerForm` and let it fallback to the default value. Users wanting to override the default value can still do so by passing `getContainer` prop to the `Modal` and `Drawer` components.

## 4.3.0

### Minor Changes

-   [#3285](https://github.com/refinedev/refine/pull/3285) [`cc2c1f042bf`](https://github.com/refinedev/refine/commit/cc2c1f042bf43ae20c58745cccc815c337e17ae7) Thanks [@omeraplak](https://github.com/omeraplak)! - Added exports for new [`<App />`](https://ant.design/components/app), [`<QrCode />`](https://ant.design/components/qrcode) and [`<Watermark />`](https://ant.design/components/watermark) components.

## 4.2.0

### Minor Changes

-   [#3285](https://github.com/refinedev/refine/pull/3285) [`cc2c1f042bf`](https://github.com/refinedev/refine/commit/cc2c1f042bf43ae20c58745cccc815c337e17ae7) Thanks [@omeraplak](https://github.com/omeraplak)! - Added exports for new [`<App />`](https://ant.design/components/app), [`<QrCode />`](https://ant.design/components/qrcode) and [`<Watermark />`](https://ant.design/components/watermark) components.

## 4.1.5

### Patch Changes

-   [#3273](https://github.com/refinedev/refine/pull/3273) [`a30ba43cce2`](https://github.com/refinedev/refine/commit/a30ba43cce27279deaab60c000dac0537552f7c7) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Set the `theme="dark"` of the `Menu` component in `Sider` by default.

-   [`a8d3f648a28`](https://github.com/refinedev/refine/commit/a8d3f648a282329cac04c1dd4b736864d6fbf756) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed onClick event type of the `<Button />` component

## 4.1.4

### Patch Changes

-   [`a8d3f648a28`](https://github.com/refinedev/refine/commit/a8d3f648a282329cac04c1dd4b736864d6fbf756) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed onClick event type of the `<Button />` component
-   [#3273](https://github.com/refinedev/refine/pull/3273) [`a30ba43cce2`](https://github.com/refinedev/refine/commit/a30ba43cce27279deaab60c000dac0537552f7c7) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Set the `theme="dark"` of the `Menu` component in `Sider` by default.

## 4.1.3

### Patch Changes

-   [#3273](https://github.com/refinedev/refine/pull/3273) [`a30ba43cce2`](https://github.com/refinedev/refine/commit/a30ba43cce27279deaab60c000dac0537552f7c7) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Set the `theme="dark"` of the `Menu` component in `Sider` by default.

## 4.1.2

### Patch Changes

-   [#3269](https://github.com/refinedev/refine/pull/3269) [`8b86c0c4c45`](https://github.com/refinedev/refine/commit/8b86c0c4c4529dce9eef4d6e49958eb2c50c31f2) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Fixed: Wrong import and usage after `swizzling` `<Layout>` component.

## 4.1.1

### Patch Changes

-   [#3269](https://github.com/refinedev/refine/pull/3269) [`8b86c0c4c45`](https://github.com/refinedev/refine/commit/8b86c0c4c4529dce9eef4d6e49958eb2c50c31f2) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Fixed: Wrong import and usage after `swizzling` `<Layout>` component.

## 4.1.0

### Minor Changes

-   [#3249](https://github.com/refinedev/refine/pull/3249) [`fd2e1882e06`](https://github.com/refinedev/refine/commit/fd2e1882e060135674f53350f2fe1d22347543d7) Thanks [@rajaomariajaona](https://github.com/rajaomariajaona)! - Add ability to pass pagination values in `useTable` hook. (Resolves #3246)

    -   `current`
    -   `setCurrent`
    -   `pageSize`
    -   `setPageSize`
    -   `pageCount`

-   [#3121](https://github.com/refinedev/refine/pull/3121) [`214ea79c81c`](https://github.com/refinedev/refine/commit/214ea79c81c2f21573f999083612d30256be76a9) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - We've released Ant Design v5 support :tada:

    ## Upgrade

    ⚡️ You can easily update **refine** packages with **refine** CLI [`update`](https://refine.dev/docs/packages/documentation/cli/#update) command.

    ```bash
    npm run refine update
    ```

    > [How to add refine CLI to an existing project?](https://refine.dev/docs/packages/documentation/cli/#how-to-add-to-an-existing-project)

    ### 🪄 Migrating your project automatically with Codemod ✨

    `@pankod/refine-codemod` package handles the breaking changes for your project automatically, without any manual steps. It migrates your [`@pankod/refine-antd`](https://github.com/refinedev/refine/tree/next/packages/antd) version from 3.x.x to 4.x.x.

    Just `cd` into root folder of your project (where `package.json` is contained) and run this command:

    ```sh
    npx @pankod/refine-codemod antd4-to-antd5
    ```

    And it's done. Now your project uses `@pankod/refine-antd@4.x.x`.

    ## Changes

    -   `<PageHeader>` component moved into `@ant-design/pro-components`. **refine** is using `<PageHeader>` in `<List>`, `<Create>`, `<Edit>`, `<Show>` components and added as a dependency. You don't need to install `@ant-design/pro-components` package manually.
    -   `<Comment>` component moved into `@ant-design/compatible`.
    -   `moment.js` is replaced with `day.js`.
    -   `less` is removed from `antd` package.

    > Please refer to [Ant Design Migration Guide](https://ant.design/docs/react/migration-v5) for detailed information.

    🚨 Next.js 13 Not Supported Now

    Currently `ant-design/pro-components` does not compatible with Next.js 13.
    **refine** is using `ant-design/pro-components` as a dependency for `<PageHeader/>` component.

    > [Refer to a related issue on ant-design/pro-components repository](https://github.com/ant-design/pro-components/issues/6338)

## 4.0.0

### Major Changes

-   [#3121](https://github.com/refinedev/refine/pull/3121) [`214ea79c81c`](https://github.com/refinedev/refine/commit/214ea79c81c2f21573f999083612d30256be76a9) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - We've released Ant Design v5 support :tada:

    ## Upgrade

    ⚡️ You can easily update **refine** packages with **refine** CLI [`update`](https://refine.dev/docs/packages/documentation/cli/#update) command.

    ```bash
    npm run refine update
    ```

    > [How to add refine CLI to an existing project?](https://refine.dev/docs/packages/documentation/cli/#how-to-add-to-an-existing-project)

    ### 🪄 Migrating your project automatically with Codemod ✨

    `@pankod/refine-codemod` package handles the breaking changes for your project automatically, without any manual steps. It migrates your [`@pankod/refine-antd`](https://github.com/refinedev/refine/tree/next/packages/antd) version from 3.x.x to 4.x.x.

    Just `cd` into root folder of your project (where `package.json` is contained) and run this command:

    ```sh
    npx @pankod/refine-codemod antd4-to-antd5
    ```

    And it's done. Now your project uses `@pankod/refine-antd@4.x.x`.

    ## Changes

    -   `<PageHeader>` component moved into `@ant-design/pro-components`. **refine** is using `<PageHeader>` in `<List>`, `<Create>`, `<Edit>`, `<Show>` components and added as a dependency. You don't need to install `@ant-design/pro-components` package manually.
    -   `<Comment>` component moved into `@ant-design/compatible`.
    -   `moment.js` is replaced with `day.js`.
    -   `less` is removed from `antd` package.

    > Please refer to [Ant Design Migration Guide](https://ant.design/docs/react/migration-v5) for detailed information.

    🚨 Next.js 13 Not Supported Now

    Currently `ant-design/pro-components` does not compatible with Next.js 13.
    **refine** is using `ant-design/pro-components` as a dependency for `<PageHeader/>` component.

    > [Refer to a related issue on ant-design/pro-components repository](https://github.com/ant-design/pro-components/issues/6338)

### Minor Changes

-   [#3249](https://github.com/refinedev/refine/pull/3249) [`fd2e1882e06`](https://github.com/refinedev/refine/commit/fd2e1882e060135674f53350f2fe1d22347543d7) Thanks [@rajaomariajaona](https://github.com/rajaomariajaona)! - Add ability to pass pagination values in `useTable` hook. (Resolves #3246)
    -   `current`
    -   `setCurrent`
    -   `pageSize`
    -   `setPageSize`
    -   `pageCount`

## 3.70.4

### Patch Changes

-   [#3252](https://github.com/refinedev/refine/pull/3252) [`cf696235d0b`](https://github.com/refinedev/refine/commit/cf696235d0bdaca8554698293e8a644131522f34) Thanks [@aliemir](https://github.com/aliemir)! - Updated `esbuild` configuration to handle `antd/lib` imports in `esm` builds. (Resolves #3187)

## 3.70.3

### Patch Changes

-   [#3252](https://github.com/refinedev/refine/pull/3252) [`cf696235d0b`](https://github.com/refinedev/refine/commit/cf696235d0bdaca8554698293e8a644131522f34) Thanks [@aliemir](https://github.com/aliemir)! - Updated `esbuild` configuration to handle `antd/lib` imports in `esm` builds. (Resolves #3187)

## 3.70.2

### Patch Changes

-   [#3220](https://github.com/refinedev/refine/pull/3220) [`b867497f469`](https://github.com/refinedev/refine/commit/b867497f4694a5fbd330106a39256dee3c56199b) Thanks [@aliemir](https://github.com/aliemir)! - Updated image links in `README.MD` with CDN

-   Updated dependencies [[`b867497f469`](https://github.com/refinedev/refine/commit/b867497f4694a5fbd330106a39256dee3c56199b)]:
    -   @pankod/refine-ui-types@0.14.2

## 3.70.1

### Patch Changes

-   [#3220](https://github.com/refinedev/refine/pull/3220) [`b867497f469`](https://github.com/refinedev/refine/commit/b867497f4694a5fbd330106a39256dee3c56199b) Thanks [@aliemir](https://github.com/aliemir)! - Updated image links in `README.MD` with CDN

-   Updated dependencies [[`b867497f469`](https://github.com/refinedev/refine/commit/b867497f4694a5fbd330106a39256dee3c56199b)]:
    -   @pankod/refine-ui-types@0.14.1

## 3.70.0

### Minor Changes

-   [#3216](https://github.com/refinedev/refine/pull/3216) [`e09eb81588e`](https://github.com/refinedev/refine/commit/e09eb81588e985e270a7b3d49f9c5b28ffcbb134) Thanks [@leapful](https://github.com/leapful)! - Support filter dropdown on number value of single Select component

## 3.69.0

### Minor Changes

-   [#3216](https://github.com/refinedev/refine/pull/3216) [`e09eb81588e`](https://github.com/refinedev/refine/commit/e09eb81588e985e270a7b3d49f9c5b28ffcbb134) Thanks [@leapful](https://github.com/leapful)! - Support filter dropdown on number value of single Select component

## 3.68.0

### Minor Changes

-   [#3195](https://github.com/refinedev/refine/pull/3195) [`2fdc5c2a88e`](https://github.com/refinedev/refine/commit/2fdc5c2a88e490c7f3b6ed5b562974787863931e) Thanks [@leapful](https://github.com/leapful)! - Support Date Picker component when using with Filter Dropdown

## 3.67.0

### Minor Changes

-   [#3195](https://github.com/refinedev/refine/pull/3195) [`2fdc5c2a88e`](https://github.com/refinedev/refine/commit/2fdc5c2a88e490c7f3b6ed5b562974787863931e) Thanks [@leapful](https://github.com/leapful)! - Support Date Picker component when using with Filter Dropdown

## 3.66.0

### Minor Changes

-   [#3159](https://github.com/refinedev/refine/pull/3159) [`af2eefb32a4`](https://github.com/refinedev/refine/commit/af2eefb32a4df157062c28125c53aa3a47f48ff8) Thanks [@aliemir](https://github.com/aliemir)! - Updated `LoginPage` and `ReadyPage` to use **refine** logos from CDN rather than bundled svg files.

## 3.65.0

### Minor Changes

-   [#3159](https://github.com/refinedev/refine/pull/3159) [`af2eefb32a4`](https://github.com/refinedev/refine/commit/af2eefb32a4df157062c28125c53aa3a47f48ff8) Thanks [@aliemir](https://github.com/aliemir)! - Updated `LoginPage` and `ReadyPage` to use **refine** logos from CDN rather than bundled svg files.

## 3.64.4

### Patch Changes

-   [#3128](https://github.com/refinedev/refine/pull/3128) [`db1000a7628`](https://github.com/refinedev/refine/commit/db1000a7628d910c965eb63cd1cff81ffcd4fd4a) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Fixed: `crud` components import path changed to relative path due to export issues on build.

## 3.64.3

### Patch Changes

-   [#3128](https://github.com/refinedev/refine/pull/3128) [`db1000a7628`](https://github.com/refinedev/refine/commit/db1000a7628d910c965eb63cd1cff81ffcd4fd4a) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Fixed: `crud` components import path changed to relative path due to export issues on build.

## 3.64.2

### Patch Changes

-   [#3109](https://github.com/refinedev/refine/pull/3109) [`16549ed3012`](https://github.com/refinedev/refine/commit/16549ed30128750f04ae17da12024b9734d5adae) Thanks [@aliemir](https://github.com/aliemir)! - Updated `swizzle` items and their messages to include extra information and usage examples.

## 3.64.1

### Patch Changes

-   [#3109](https://github.com/refinedev/refine/pull/3109) [`16549ed3012`](https://github.com/refinedev/refine/commit/16549ed30128750f04ae17da12024b9734d5adae) Thanks [@aliemir](https://github.com/aliemir)! - Updated `swizzle` items and their messages to include extra information and usage examples.

## 3.64.0

### Minor Changes

-   [#3062](https://github.com/refinedev/refine/pull/3062) [`6c2ed708a9a`](https://github.com/refinedev/refine/commit/6c2ed708a9a76faddb9d27a0aca9f4ada3c270af) Thanks [@aliemir](https://github.com/aliemir)! - - Updated components and their type imports to make them compatible with `swizzle` feature.
    -   Added `refine.config.js` to configure the `swizzle` feature.

## 3.63.0

### Minor Changes

-   [#3062](https://github.com/refinedev/refine/pull/3062) [`6c2ed708a9a`](https://github.com/refinedev/refine/commit/6c2ed708a9a76faddb9d27a0aca9f4ada3c270af) Thanks [@aliemir](https://github.com/aliemir)! - - Updated components and their type imports to make them compatible with `swizzle` feature.
    -   Added `refine.config.js` to configure the `swizzle` feature.

## 3.62.0

### Minor Changes

-   [#2872](https://github.com/refinedev/refine/pull/2872) [`da3fc4a702`](https://github.com/refinedev/refine/commit/da3fc4a702b3ea50f7c1a2cc484fe6364fc3ddc0) Thanks [@TDP17](https://github.com/TDP17)! - Feat: Added ability to manage breadcrumb component globally via options

    > **The option set in individual CRUD components takes priority over the global option**

## 3.61.0

### Minor Changes

-   [#2872](https://github.com/refinedev/refine/pull/2872) [`da3fc4a702`](https://github.com/refinedev/refine/commit/da3fc4a702b3ea50f7c1a2cc484fe6364fc3ddc0) Thanks [@TDP17](https://github.com/TDP17)! - Feat: Added ability to manage breadcrumb component globally via options

    > **The option set in individual CRUD components takes priority over the global option**

## 3.60.0

### Minor Changes

-   [#2839](https://github.com/refinedev/refine/pull/2839) [`5388a338ab`](https://github.com/refinedev/refine/commit/5388a338abb9a5e03599da0a2786bea394cbc516) Thanks [@aliemir](https://github.com/aliemir)! - **Deprecation**

    `ignoreAccessControlProvider` prop on buttons is deprecated. Use `accessContro.enabled` instead.

    **Features**

    `accessControl.enabled` prop is added to buttons to enable/disable access control for buttons.
    `accessControl.hideIfUnauthorized` prop is added to buttons to hide the button if access is denied.

-   [#2836](https://github.com/refinedev/refine/pull/2836) [`e43e9a17ae`](https://github.com/refinedev/refine/commit/e43e9a17ae0ed41e649b8026b2b04d850136dcfd) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - added locales prop to date fields

### Patch Changes

-   [#2838](https://github.com/refinedev/refine/pull/2838) [`f7968fa16f`](https://github.com/refinedev/refine/commit/f7968fa16f9930442e1122fe5294e350252bdd5c) Thanks [@aliemir](https://github.com/aliemir)! - Fixed #2828 - Buttons were not respecting access control when navigating to a new page. Now, if button is disabled, it will not also block the navigation not just the onClick event.

-   Updated dependencies [[`476285e342`](https://github.com/refinedev/refine/commit/476285e3427c7e065892a281da529c038aee83d2), [`5388a338ab`](https://github.com/refinedev/refine/commit/5388a338abb9a5e03599da0a2786bea394cbc516), [`e43e9a17ae`](https://github.com/refinedev/refine/commit/e43e9a17ae0ed41e649b8026b2b04d850136dcfd)]:
    -   @pankod/refine-ui-types@0.14.0

## 3.59.0

### Minor Changes

-   [#2836](https://github.com/refinedev/refine/pull/2836) [`e43e9a17ae`](https://github.com/refinedev/refine/commit/e43e9a17ae0ed41e649b8026b2b04d850136dcfd) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - added locales prop to date fields

### Patch Changes

-   Updated dependencies [[`e43e9a17ae`](https://github.com/refinedev/refine/commit/e43e9a17ae0ed41e649b8026b2b04d850136dcfd)]:
    -   @pankod/refine-ui-types@0.13.0

## 3.58.0

### Minor Changes

-   [#2839](https://github.com/refinedev/refine/pull/2839) [`5388a338ab`](https://github.com/refinedev/refine/commit/5388a338abb9a5e03599da0a2786bea394cbc516) Thanks [@aliemir](https://github.com/aliemir)! - **Deprecation**

    `ignoreAccessControlProvider` prop on buttons is deprecated. Use `accessContro.enabled` instead.

    **Features**

    `accessControl.enabled` prop is added to buttons to enable/disable access control for buttons.
    `accessControl.hideIfUnauthorized` prop is added to buttons to hide the button if access is denied.

### Patch Changes

-   [#2838](https://github.com/refinedev/refine/pull/2838) [`f7968fa16f`](https://github.com/refinedev/refine/commit/f7968fa16f9930442e1122fe5294e350252bdd5c) Thanks [@aliemir](https://github.com/aliemir)! - Fixed #2828 - Buttons were not respecting access control when navigating to a new page. Now, if button is disabled, it will not also block the navigation not just the onClick event.

-   Updated dependencies [[`476285e342`](https://github.com/refinedev/refine/commit/476285e3427c7e065892a281da529c038aee83d2), [`5388a338ab`](https://github.com/refinedev/refine/commit/5388a338abb9a5e03599da0a2786bea394cbc516)]:
    -   @pankod/refine-ui-types@0.12.0

## 3.57.0

### Minor Changes

-   Only `or` was supported as a conditional filter. Now `and` and `or` can be used together and nested. 🚀

    ```
    {
      operator: "or",
      value: [
        {
          operator: "and",
          value: [
            {
              field: "name",
              operator: "eq",
              value: "John Doe",
            },
            {
              field: "age",
              operator: "eq",
              value: 30,
            },
          ],
        },
        {
          operator: "and",
          value: [
            {
              field: "name",
              operator: "eq",
              value: "JR Doe",
            },
            {
              field: "age",
              operator: "eq",
              value: 1,
            },
          ],
        },
      ],
    }
    ```

### Patch Changes

-   Updated dependencies []:
    -   @pankod/refine-ui-types@0.11.6

## 3.56.0

### Minor Changes

-   [#2751](https://github.com/refinedev/refine/pull/2751) [`addff64c77`](https://github.com/refinedev/refine/commit/addff64c777e4c9f044a1a109cb05453e6e9f762) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Only `or` was supported as a conditional filter. Now `and` and `or` can be used together and nested. 🚀

    ```
    {
      operator: "or",
      value: [
        {
          operator: "and",
          value: [
            {
              field: "name",
              operator: "eq",
              value: "John Doe",
            },
            {
              field: "age",
              operator: "eq",
              value: 30,
            },
          ],
        },
        {
          operator: "and",
          value: [
            {
              field: "name",
              operator: "eq",
              value: "JR Doe",
            },
            {
              field: "age",
              operator: "eq",
              value: 1,
            },
          ],
        },
      ],
    }
    ```

### Patch Changes

-   Updated dependencies [[`19124711a7`](https://github.com/refinedev/refine/commit/19124711a7dc23c0b0e61bc845fbd294927999da)]:
    -   @pankod/refine-ui-types@0.11.5

## 3.55.3

### Patch Changes

-   Fixed `providers` property empty array state in `<AuthPage />` component

## 3.55.2

### Patch Changes

-   Fixed `providers` property empty array state in `<AuthPage />` component

## 3.55.1

### Patch Changes

-   [#2712](https://github.com/refinedev/refine/pull/2712) [`c434055011`](https://github.com/refinedev/refine/commit/c434055011cbdd846c9f228c23987607bb828a1b) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed `providers` property empty array state in `<AuthPage />` component

## 3.55.0

### Minor Changes

-   Added infinite loading example to antd `useSelect()`
    `useSelect()` `fetchSize` prop is deprecated. From now [`pagination`](https://refine.dev/docs/api-reference/core/interfaceReferences/#pagination) should be used

### Patch Changes

-   Add AuthProps type export

## 3.54.0

### Minor Changes

-   [#2629](https://github.com/refinedev/refine/pull/2629) [`bc89228e73`](https://github.com/refinedev/refine/commit/bc89228e73dbf373cbbbd0fbf5e6e4721224a7c5) Thanks [@bungambohlah](https://github.com/bungambohlah)! - Added infinite loading example to antd `useSelect()`
    `useSelect()` `fetchSize` prop is deprecated. From now [`pagination`](https://refine.dev/docs/api-reference/core/interfaceReferences/#pagination) should be used

### Patch Changes

-   [#2666](https://github.com/refinedev/refine/pull/2666) [`8a562d2114`](https://github.com/refinedev/refine/commit/8a562d2114b7145707070e363981a4e31e02547a) Thanks [@omeraplak](https://github.com/omeraplak)! - Add AuthProps type export

## 3.53.0

### Minor Changes

-   -   Added new <AuthPage /> component core and mantine support.
    -   Move Auth types `@pankod/refine-ui-types` to `@pankod/refine-core`

## 3.52.0

### Minor Changes

-   [#2627](https://github.com/refinedev/refine/pull/2627) [`c5fb45d61f`](https://github.com/refinedev/refine/commit/c5fb45d61fa7470a7a34762ad19d17e9f87e4421) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - - Added new <AuthPage /> component core and mantine support.
    -   Move Auth types `@pankod/refine-ui-types` to `@pankod/refine-core`

## 3.51.0

### Minor Changes

-   Deprecated `LoginPage`.

    **Before**

    ```tsx
    import { LoginPage } from "@pankod/refine-antd";

    <Refine
      LoginPage={LoginPage}
      ...
    />
    ```

    **After**

    ```tsx
    import { AuthPage } from "@pankod/refine-antd";

    <Refine
      LoginPage={AuthPage}
      ...
    />
    ```

## 3.50.0

### Minor Changes

-   Deprecated `LoginPage`.

    **Before**

    ```tsx
    import { LoginPage } from "@pankod/refine-antd";

    <Refine
      LoginPage={LoginPage}
      ...
    />
    ```

    **After**

    ```tsx
    import { AuthPage } from "@pankod/refine-antd";

    <Refine
      LoginPage={AuthPage}
      ...
    />
    ```

## 3.49.0

### Minor Changes

-   [#2580](https://github.com/refinedev/refine/pull/2580) [`e1ab7da6b3`](https://github.com/refinedev/refine/commit/e1ab7da6b335bad62b15a537a3ed63c9f113bd01) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Deprecated `LoginPage`.

    **Before**

    ```tsx
    import { LoginPage } from "@pankod/refine-antd";

    <Refine
      LoginPage={LoginPage}
      ...
    />
    ```

    **After**

    ```tsx
    import { AuthPage } from "@pankod/refine-antd";

    <Refine
      LoginPage={AuthPage}
      ...
    />
    ```

## 3.48.10

### Patch Changes

-   ReadyPage examples link fixed.

## 3.48.9

### Patch Changes

-   [#2505](https://github.com/refinedev/refine/pull/2505) [`a4dbb63c88`](https://github.com/refinedev/refine/commit/a4dbb63c881a83e5146829130b1377e791b44469) Thanks [@salihozdemir](https://github.com/salihozdemir)! - ReadyPage examples link fixed.

## 3.48.8

### Patch Changes

-   Updated `disabled` attribute of buttons in CRUD components according to `isLoading` prop.

-   Removed redundant type inheritance

-   Updated dependencies []:
    -   @pankod/refine-ui-types@0.11.2

## 3.48.7

### Patch Changes

-   [#2586](https://github.com/refinedev/refine/pull/2586) [`d7c8b7642b`](https://github.com/refinedev/refine/commit/d7c8b7642b7ed41a2063798e779c3cfaa09b0e7b) Thanks [@necatiozmen](https://github.com/necatiozmen)! - Removed redundant type inheritance

-   Updated dependencies [[`d7c8b7642b`](https://github.com/refinedev/refine/commit/d7c8b7642b7ed41a2063798e779c3cfaa09b0e7b)]:
    -   @pankod/refine-ui-types@0.11.1

## 3.48.6

### Patch Changes

-   [#2585](https://github.com/refinedev/refine/pull/2585) [`e7ab42a73b`](https://github.com/refinedev/refine/commit/e7ab42a73b87625b2646864118ad25cbe31295ad) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Updated `disabled` attribute of buttons in CRUD components according to `isLoading` prop.

## 3.48.5

### Patch Changes

-   Rename `reset-password` -> `forgot-password` on docs.

## 3.48.4

### Patch Changes

-   Rename `reset-password` -> `forgot-password` on docs.

## 3.48.3

### Patch Changes

-   [#2568](https://github.com/refinedev/refine/pull/2568) [`efe99f7843`](https://github.com/refinedev/refine/commit/efe99f78433c46433f137fd9581f33f4d75778e0) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Rename `reset-password` -> `forgot-password` on docs.

## 3.48.2

### Patch Changes

-   Fixed `useModalForm` & `useStepsForm` return type

## 3.48.1

### Patch Changes

-   [#2552](https://github.com/refinedev/refine/pull/2552) [`52cd8d633e`](https://github.com/refinedev/refine/commit/52cd8d633e57f925bb51c875aab0406e3358ec45) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed `useModalForm` & `useStepsForm` return type

## 3.48.0

### Minor Changes

-   Add `providers` support on AuthPage register page.

### Patch Changes

-   Updated dependencies []:
    -   @pankod/refine-ui-types@0.11.0

## 3.47.0

### Minor Changes

-   [#2551](https://github.com/refinedev/refine/pull/2551) [`a65525de6f`](https://github.com/refinedev/refine/commit/a65525de6f995babfca1058e933cdbea67d6032e) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Add `providers` support on AuthPage register page.

### Patch Changes

-   Updated dependencies [[`a65525de6f`](https://github.com/refinedev/refine/commit/a65525de6f995babfca1058e933cdbea67d6032e)]:
    -   @pankod/refine-ui-types@0.10.0

## 3.46.4

### Patch Changes

-   -   Auth pages background color fixed.
    -   Removed unused `updatePasswordLink` prop from auth pages.
    -   Removed `onSubmit` prop from auth pages. use `formProps` instead.
-   Updated dependencies []:
    -   @pankod/refine-ui-types@0.9.2

## 3.46.3

### Patch Changes

-   [#2524](https://github.com/refinedev/refine/pull/2524) [`27bf81bebb`](https://github.com/refinedev/refine/commit/27bf81bebb217d2944e20e79a8f7618eda0e9db7) Thanks [@biskuvit](https://github.com/biskuvit)! - - Auth pages background color fixed.
    -   Removed unused `updatePasswordLink` prop from auth pages.
    -   Removed `onSubmit` prop from auth pages. use `formProps` instead.
-   Updated dependencies [[`27bf81bebb`](https://github.com/refinedev/refine/commit/27bf81bebb217d2944e20e79a8f7618eda0e9db7)]:
    -   @pankod/refine-ui-types@0.9.1

## 3.46.2

### Patch Changes

-   Fixed the spacing between `icon` and `breadcrumb label` in `Breadcrumb` component.

## 3.46.1

### Patch Changes

-   [#2534](https://github.com/refinedev/refine/pull/2534) [`a9676932cc`](https://github.com/refinedev/refine/commit/a9676932ccae00f364918f163e44e73032ffa029) Thanks [@ozkalai](https://github.com/ozkalai)! - Fixed the spacing between `icon` and `breadcrumb label` in `Breadcrumb` component.

## 3.46.0

### Minor Changes

-   Added `formProps` property support for AuthPage component

    ## Usage

    ```tsx
    <AuthPage
        type="login"
        formProps={{
            initialValues: {
                email: "demo@refine.dev",
                password: "demo",
            },
        }}
    />
    ```

### Patch Changes

-   Updated dependencies []:
    -   @pankod/refine-ui-types@0.9.0

## 3.45.0

### Minor Changes

-   [#2516](https://github.com/refinedev/refine/pull/2516) [`ad99916d6d`](https://github.com/refinedev/refine/commit/ad99916d6dbd181b857fd7df7b9619d8cac5e3e0) Thanks [@omeraplak](https://github.com/omeraplak)! - Added `formProps` property support for AuthPage component

    ## Usage

    ```tsx
    <AuthPage
        type="login"
        formProps={{
            initialValues: {
                email: "demo@refine.dev",
                password: "demo",
            },
        }}
    />
    ```

### Patch Changes

-   Updated dependencies [[`ad99916d6d`](https://github.com/refinedev/refine/commit/ad99916d6dbd181b857fd7df7b9619d8cac5e3e0)]:
    -   @pankod/refine-ui-types@0.8.0

## 3.44.0

### Minor Changes

-   Added `render` prop to `Sider` component. You can get `dashboard`, `logout` and `items` from `render` props to customize the `Sider` component.

-   Added `<AuthPage>` for Ant Design. `<AuthPage>` is a component that provides a login, register, forgot password and update password pages.

### Patch Changes

-   Fixed version of react-router to `6.3.0`

-   Passed `collapsed` prop to `render` method in `Sider` component of `@pankod/refine-antd`.

-   Updated dependencies []:
    -   @pankod/refine-ui-types@0.7.0

## 3.43.1

### Patch Changes

-   [#2501](https://github.com/refinedev/refine/pull/2501) [`4095a578d4`](https://github.com/refinedev/refine/commit/4095a578d471254ee58412f130ac5a0f3a62880f) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed version of react-router to `6.3.0`

## 3.43.0

### Minor Changes

-   [#2447](https://github.com/refinedev/refine/pull/2447) [`628a37a675`](https://github.com/refinedev/refine/commit/628a37a6753a778cbec5c29b698981e0157caa42) Thanks [@biskuvit](https://github.com/biskuvit)! - Added `<AuthPage>` for Ant Design. `<AuthPage>` is a component that provides a login, register, forgot password and update password pages.

### Patch Changes

-   Updated dependencies [[`628a37a675`](https://github.com/refinedev/refine/commit/628a37a6753a778cbec5c29b698981e0157caa42)]:
    -   @pankod/refine-ui-types@0.6.2

## 3.42.1

### Patch Changes

-   [#2492](https://github.com/refinedev/refine/pull/2492) [`7d5bf3023d`](https://github.com/refinedev/refine/commit/7d5bf3023d00617890ffa7f9d22b1116af15e0b9) Thanks [@ozkalai](https://github.com/ozkalai)! - Passed `collapsed` prop to `render` method in `Sider` component of `@pankod/refine-antd`.

-   Updated dependencies [[`7d5bf3023d`](https://github.com/refinedev/refine/commit/7d5bf3023d00617890ffa7f9d22b1116af15e0b9)]:
    -   @pankod/refine-ui-types@0.6.1

## 3.42.0

### Minor Changes

-   [#2454](https://github.com/refinedev/refine/pull/2454) [`72487a4126`](https://github.com/refinedev/refine/commit/72487a4126fb7d827dccd3bcbdee9a83aa1f56af) Thanks [@ozkalai](https://github.com/ozkalai)! - Added `render` prop to `Sider` component. You can get `dashboard`, `logout` and `items` from `render` props to customize the `Sider` component.

### Patch Changes

-   Updated dependencies [[`72487a4126`](https://github.com/refinedev/refine/commit/72487a4126fb7d827dccd3bcbdee9a83aa1f56af)]:
    -   @pankod/refine-ui-types@0.6.0

## 3.41.0

### Minor Changes

-   Added support nested sorting

## 3.40.0

### Minor Changes

-   [#2427](https://github.com/refinedev/refine/pull/2427) [`b21908e872`](https://github.com/refinedev/refine/commit/b21908e87209c3a8825991c6ab829f7c45c19e9b) Thanks [@geoffatsource](https://github.com/geoffatsource)! - Added support nested sorting

## 3.39.0

### Minor Changes

-   Update type declaration generation with `tsc` instead of `tsup` for better navigation throughout projects source code.

### Patch Changes

-   Updated dependencies []:
    -   @pankod/refine-ui-types@0.5.0

## 3.38.0

### Minor Changes

-   [#2440](https://github.com/refinedev/refine/pull/2440) [`0150dcd070`](https://github.com/refinedev/refine/commit/0150dcd0700253f1c4908e7e5f2e178bb122e9af) Thanks [@aliemir](https://github.com/aliemir)! - Update type declaration generation with `tsc` instead of `tsup` for better navigation throughout projects source code.

### Patch Changes

-   Updated dependencies [[`0150dcd070`](https://github.com/refinedev/refine/commit/0150dcd0700253f1c4908e7e5f2e178bb122e9af), [`0150dcd070`](https://github.com/refinedev/refine/commit/0150dcd0700253f1c4908e7e5f2e178bb122e9af)]:
    -   @pankod/refine-ui-types@0.4.0

## 3.37.11

### Patch Changes

-   Fix: `useStepsForm`'s `submit` function can be overridden

## 3.37.10

### Patch Changes

-   Fix: `useStepsForm`'s `submit` function can be overridden

## 3.37.9

### Patch Changes

-   [#2421](https://github.com/refinedev/refine/pull/2421) [`2b1c5e01b0`](https://github.com/refinedev/refine/commit/2b1c5e01b0f65b2c7558ba79539fab411480cc06) Thanks [@omeraplak](https://github.com/omeraplak)! - Fix: `useStepsForm`'s `submit` function can be overridden

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

-   [#2411](https://github.com/refinedev/refine/pull/2411) [`c61470a2e0`](https://github.com/refinedev/refine/commit/c61470a2e00df94a211395541601fd39b63e2cff) Thanks [@omeraplak](https://github.com/omeraplak)! - Fix: Wrap with [`<CanAccess />`](https://refine.dev/docs/core/components/accessControl/can-access/) component to parent sider items

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

-   [#2403](https://github.com/refinedev/refine/pull/2403) [`ef8622cba3`](https://github.com/refinedev/refine/commit/ef8622cba32acc8f5edf9e4190fbe90d99e642c6) Thanks [@omeraplak](https://github.com/omeraplak)! - Fix `useModalForm` hook reset issue after successful submit

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

-   [#2343](https://github.com/refinedev/refine/pull/2343) [`90b39d4f83`](https://github.com/refinedev/refine/commit/90b39d4f839dc97868b7126ffb2903e29b8bb51a) Thanks [@aliemir](https://github.com/aliemir)! - Updated `<Edit/>` component's default footer buttons property wrapper with `<Space/>` component like `<Footer>

## 3.37.0

### Minor Changes

-   Separated `styles.min.css` file as `antd.min.css` and `reset.min.css` to make users able to turn off `reset` styles when needed.

## 3.36.0

### Minor Changes

-   [#2312](https://github.com/refinedev/refine/pull/2312) [`ba5646c65c`](https://github.com/refinedev/refine/commit/ba5646c65cc09dee688fef1cf3a6556707754c3c) Thanks [@aliemir](https://github.com/aliemir)! - Separated `styles.min.css` file as `antd.min.css` and `reset.min.css` to make users able to turn off `reset` styles when needed.

## 3.35.4

### Patch Changes

-   Upgraded `react-query` version to 4.

## 3.35.3

### Patch Changes

-   [#2260](https://github.com/refinedev/refine/pull/2260) [`a97ec592df`](https://github.com/refinedev/refine/commit/a97ec592dfb6dcf5b5bd063d2d76f50ca195c20e) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Upgraded `react-query` version to 4.

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

-   [#2216](https://github.com/refinedev/refine/pull/2216) [`201846c77d`](https://github.com/refinedev/refine/commit/201846c77dba07a61f0c0335716b60641430c22a) Thanks [@aliemir](https://github.com/aliemir)! - Remove `data-testid` props from buttons in crud components to make use of button test ids presented by `@pankod/refine-ui-types` package.

*   [#2216](https://github.com/refinedev/refine/pull/2216) [`201846c77d`](https://github.com/refinedev/refine/commit/201846c77dba07a61f0c0335716b60641430c22a) Thanks [@aliemir](https://github.com/aliemir)! - Updated `@pankod/refine-antd` and `@pankod/refine-mui` `fields` properties by using `@pankod/refine-ui-types` common `fields` types.

    Updated `@pankod/refine-antd` and `@pankod/refine-mui` `fields` tests by using `@pankod/refine-ui-tests` common `fields` tests.

    Updated `@pankod/refine-ui-tests` `fields` properties.

-   [#2216](https://github.com/refinedev/refine/pull/2216) [`201846c77d`](https://github.com/refinedev/refine/commit/201846c77dba07a61f0c0335716b60641430c22a) Thanks [@aliemir](https://github.com/aliemir)! - Added `@pankod/refine-ui-tests` and `@pankod/refine-ui-types` packages. Now, all of button prop types comes from `@pankod/refine-ui-types` package and all of button tests comes from `@pankod/refine-ui-tests` package.

    Thus, button types and tests are managed by `@pankod/refine-ui-types` package and `@pankod/refine-ui-tests` package.

-   Updated dependencies [[`201846c77d`](https://github.com/refinedev/refine/commit/201846c77dba07a61f0c0335716b60641430c22a)]:
    -   @pankod/refine-ui-types@0.2.0

## 3.35.0

### Minor Changes

-   Add React@18 support 🚀

### Patch Changes

-   Fixed `isMobile` control in `Sider` component detecting `desktop` dimensions as `mobile` on route changes

## 3.34.0

### Minor Changes

-   [#1718](https://github.com/refinedev/refine/pull/1718) [`b38620d842`](https://github.com/refinedev/refine/commit/b38620d84237e13212811daada7b49ee654c70eb) Thanks [@omeraplak](https://github.com/omeraplak)! - Add React@18 support 🚀

### Patch Changes

-   [#2255](https://github.com/refinedev/refine/pull/2255) [`b56f43529f`](https://github.com/refinedev/refine/commit/b56f43529f387ad1801e7bc0d94dfa5679bad77e) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed `isMobile` control in `Sider` component detecting `desktop` dimensions as `mobile` on route changes

## 3.33.2

### Patch Changes

-   Updated `console.warn`'s to trigger once.

## 3.33.1

### Patch Changes

-   [#2223](https://github.com/refinedev/refine/pull/2223) [`0a215f2000`](https://github.com/refinedev/refine/commit/0a215f2000b4069618e42efda48b8864b38129fd) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Updated `console.warn`'s to trigger once.

## 3.33.0

### Minor Changes

-   All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

    Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

## 3.32.0

### Minor Changes

-   [#2217](https://github.com/refinedev/refine/pull/2217) [`b4aae00f77`](https://github.com/refinedev/refine/commit/b4aae00f77a2476d847994db21298ae25e4cf6e5) Thanks [@omeraplak](https://github.com/omeraplak)! - All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

    Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

## 3.31.0

### Minor Changes

-   **BREAKING** Updated `useStepsForm` prop `isBackValidate` with default `false` instead of `true` to achieve consistency between packages (`@pankod/refine-react-hook-form`).

### Patch Changes

-   Fix `useModal` hook doesn't return `modalProps`

*   Added `hasPagination` support to [`useSimpleList`](https://refine.dev/docs/ui-frameworks/antd/hooks/list/useSimpleList/) hook.

## 3.30.0

### Minor Changes

-   [#2206](https://github.com/refinedev/refine/pull/2206) [`874b05af37`](https://github.com/refinedev/refine/commit/874b05af377b995c9cea6cbcde5407a19403f53d) Thanks [@aliemir](https://github.com/aliemir)! - **BREAKING** Updated `useStepsForm` prop `isBackValidate` with default `false` instead of `true` to achieve consistency between packages (`@pankod/refine-react-hook-form`).

### Patch Changes

-   [#2203](https://github.com/refinedev/refine/pull/2203) [`3c80308ca1`](https://github.com/refinedev/refine/commit/3c80308ca143d11d7daeb7e9624d0138ecede42d) Thanks [@omeraplak](https://github.com/omeraplak)! - Fix `useModal` hook doesn't return `modalProps`

*   [#2201](https://github.com/refinedev/refine/pull/2201) [`62c261c2a7`](https://github.com/refinedev/refine/commit/62c261c2a7eaaec77d10440f2ec37f3697d869c9) Thanks [@omeraplak](https://github.com/omeraplak)! - Added `hasPagination` support to [`useSimpleList`](https://refine.dev/docs/ui-frameworks/antd/hooks/list/useSimpleList/) hook.

## 3.29.0

### Minor Changes

-   Added `defaultSetFilterBehavior` prop to `useTable` and `useSimpleList` hooks. Return `setFilters` and `setSorter` from `useTable` of `@pankod/refine-core`.

    This feature will let `@pankod/refine-antd` users to set filters manually and change filter setter logic (defaults to `merge`).

### Patch Changes

-   Updated dependencies []:
    -   @pankod/refine-core@3.44.0

## 3.28.0

### Minor Changes

-   [#2168](https://github.com/refinedev/refine/pull/2168) [`a9196ffe2d`](https://github.com/refinedev/refine/commit/a9196ffe2de8bfe266be2cac1ac05eab039d0fb7) Thanks [@aliemir](https://github.com/aliemir)! - Added `defaultSetFilterBehavior` prop to `useTable` and `useSimpleList` hooks. Return `setFilters` and `setSorter` from `useTable` of `@pankod/refine-core`.

    This feature will let `@pankod/refine-antd` users to set filters manually and change filter setter logic (defaults to `merge`).

### Patch Changes

-   Updated dependencies [[`4d5f6b25e5`](https://github.com/refinedev/refine/commit/4d5f6b25e51cf773e08a0ce0b93a3680e692564a)]:
    -   @pankod/refine-core@3.43.0

## 3.27.6

### Patch Changes

-   Fixed the `Unhandled Promise` error on console for `useForm` with failed requests (Resolves #2156).

    This fix only catches the errors triggered by submitting the form, requests by invoking `onFinish` function should be handled by the user.

## 3.27.5

### Patch Changes

-   [#2161](https://github.com/refinedev/refine/pull/2161) [`8490f3c38f`](https://github.com/refinedev/refine/commit/8490f3c38f8a7136a7dc396f3105334da8068b0b) Thanks [@aliemir](https://github.com/aliemir)! - Fixed the `Unhandled Promise` error on console for `useForm` with failed requests (Resolves #2156).

    This fix only catches the errors triggered by submitting the form, requests by invoking `onFinish` function should be handled by the user.

## 3.27.4

### Patch Changes

-   Removed unused cases in `useFileUploadState` and fixed conflicting type in `antd#UploadFileStatus` interface.

-   Updated dependencies []:
    -   @pankod/refine-core@3.40.0

## 3.27.3

### Patch Changes

-   [#2135](https://github.com/refinedev/refine/pull/2135) [`cf90324cb4`](https://github.com/refinedev/refine/commit/cf90324cb4043cb8c0fae79c15e9c17c2bda8044) Thanks [@aliemir](https://github.com/aliemir)! - Removed unused cases in `useFileUploadState` and fixed conflicting type in `antd#UploadFileStatus` interface.

-   Updated dependencies [[`868bb943ad`](https://github.com/refinedev/refine/commit/868bb943adc42d80a7904e2acbd6397d097ad4e2)]:
    -   @pankod/refine-core@3.39.0

## 3.27.2

### Patch Changes

-   Add `dataProviderName` property for `<RefreshButton>` and `<DeleteButton>` in `<Edit>` and `<Show>` CRUD components - #2096

-   Updated dependencies []:
    -   @pankod/refine-core@3.38.0

## 3.27.1

### Patch Changes

-   [#2106](https://github.com/refinedev/refine/pull/2106) [`10a20d8714`](https://github.com/refinedev/refine/commit/10a20d87142b694bc9c02afaee5b4fe6c5853c5a) Thanks [@omeraplak](https://github.com/omeraplak)! - Add `dataProviderName` property for `<RefreshButton>` and `<DeleteButton>` in `<Edit>` and `<Show>` CRUD components - #2096

-   Updated dependencies [[`9d77c63a92`](https://github.com/refinedev/refine/commit/9d77c63a925dca0133b3e83974dff486a2233017), [`98966b586f`](https://github.com/refinedev/refine/commit/98966b586f6febd8669065b5b453a8e441f76bc1)]:
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

-   [#2050](https://github.com/refinedev/refine/pull/2050) [`635cfe9fdb`](https://github.com/refinedev/refine/commit/635cfe9fdbfe5940b950ae99c1f0b686c78bb8e5) Thanks [@ozkalai](https://github.com/ozkalai)! - Updated `useTable` hook with `hasPagination` to enable/disable pagination.

    **Implementation**

    Updated the `useTable` accordingly to the changes in the `useTable` of `@pankod/refine-core`. `hasPagination` property is being send directly to the `useTable` of `@pankod/refine-core` to disable pagination.

    **Use Cases**

    In some data providers, some of the resources might not support pagination which was not supported prior to these changes. To handle the pagination on the client-side or to disable completely, users can set `hasPagination` to `false`.

### Patch Changes

-   [#2061](https://github.com/refinedev/refine/pull/2061) [`0237725cf3`](https://github.com/refinedev/refine/commit/0237725cf32923f7d24d3f0c9a2994de30baa921) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Fixed `<Link>` usage in packages.

    ```diff
    - <Link href={route} to={route}>
    -    {label}
    - </Link>
    + <Link to={route}>{label}</Link>
    ```

    We used to have to pass `href` and `to` for Next.js and React applications, now we just need to pass `to`. **refine** router providers handle for us.

-   Updated dependencies [[`ecde34a9b3`](https://github.com/refinedev/refine/commit/ecde34a9b38ef5667fa863f9ebb9dcb1cfff1651), [`635cfe9fdb`](https://github.com/refinedev/refine/commit/635cfe9fdbfe5940b950ae99c1f0b686c78bb8e5)]:
    -   @pankod/refine-core@3.35.0

## 3.25.10

### Patch Changes

-   Updated the `id` parameter type to [`BaseKey`](https://refine.dev/docs/core/interfaceReferences/#basekey) for `show` function in [`useModalForm`](https://refine.dev/docs/packages/react-hook-form/useModalForm/) hook

*   Updated the `id` type to `BaseKey` for `isEditing` and `editButtonProps` properties in `useEditableTable` hook.

*   Updated dependencies []:
    -   @pankod/refine-core@3.34.2

## 3.25.9

### Patch Changes

-   [#2059](https://github.com/refinedev/refine/pull/2059) [`326341c94e`](https://github.com/refinedev/refine/commit/326341c94edb7f6a1507900506caccc60a386229) Thanks [@omeraplak](https://github.com/omeraplak)! - Updated the `id` parameter type to [`BaseKey`](https://refine.dev/docs/core/interfaceReferences/#basekey) for `show` function in [`useModalForm`](https://refine.dev/docs/packages/react-hook-form/useModalForm/) hook

*   [#2052](https://github.com/refinedev/refine/pull/2052) [`cbb09e5b22`](https://github.com/refinedev/refine/commit/cbb09e5b22add54d7dccf180cd17c9019d32ed44) Thanks [@omeraplak](https://github.com/omeraplak)! - Updated the `id` type to `BaseKey` for `isEditing` and `editButtonProps` properties in `useEditableTable` hook.

*   Updated dependencies [[`0338ce9d6b`](https://github.com/refinedev/refine/commit/0338ce9d6bee673b76a18cf9e6ad480fd9928e09)]:
    -   @pankod/refine-core@3.34.1

## 3.25.8

### Patch Changes

-   Fix missing behavior for dashboard item in _deprecated_ `useMenu`

-   Updated dependencies []:
    -   @pankod/refine-core@3.32.0

## 3.25.7

### Patch Changes

-   [#2009](https://github.com/refinedev/refine/pull/2009) [`5b893a9bff`](https://github.com/refinedev/refine/commit/5b893a9bff707d90b0f898a52d46a7154108b0a0) Thanks [@aliemir](https://github.com/aliemir)! - Fix missing behavior for dashboard item in _deprecated_ `useMenu`

-   Updated dependencies [[`498c425a0e`](https://github.com/refinedev/refine/commit/498c425a0e069b6b972a344ff32af46852306c71), [`498c425a0e`](https://github.com/refinedev/refine/commit/498c425a0e069b6b972a344ff32af46852306c71), [`498c425a0e`](https://github.com/refinedev/refine/commit/498c425a0e069b6b972a344ff32af46852306c71), [`5b893a9bff`](https://github.com/refinedev/refine/commit/5b893a9bff707d90b0f898a52d46a7154108b0a0)]:
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

-   [#1945](https://github.com/refinedev/refine/pull/1945) [`592a401924`](https://github.com/refinedev/refine/commit/592a40192482cf88108348ed21db437e6d304a43) Thanks [@omeraplak](https://github.com/omeraplak)! - Could not stop `e.preventDefault()` redirection in Next.js `<Link>` component. So we added in `e.stopPropagation()` for [Ant Design Buttons](https://refine.dev/docs/ui-frameworks/antd/components/buttons/clone-button/) and [Material UI Buttons](https://refine.dev/docs/ui-frameworks/mui/components/buttons/clone-button/)

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

-   [#1897](https://github.com/refinedev/refine/pull/1897) [`b1636033fa`](https://github.com/refinedev/refine/commit/b1636033faee2b5eacbad413e2d1f975316e97cb) Thanks [@aliemir](https://github.com/aliemir)! - `@pankod/refine-antd` Pagination with Next.js Links breaks the app

## 3.23.2

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

## 3.23.1

### Patch Changes

-   [#1865](https://github.com/refinedev/refine/pull/1865) [`5c3392ccd1`](https://github.com/refinedev/refine/commit/5c3392ccd1eff70dae1479557eede8c246b76edc) Thanks [@omeraplak](https://github.com/omeraplak)! - Fix #1858 `useTable` creating nested `<a>` tag in Pagination component

-   Updated dependencies [[`3281378b11`](https://github.com/refinedev/refine/commit/3281378b119c698be3ae4ecb3866b40b883494d8)]:
    -   @pankod/refine-core@3.23.1

## 3.23.0

### Minor Changes

-   [#1843](https://github.com/refinedev/refine/pull/1843) [`31850119e0`](https://github.com/refinedev/refine/commit/31850119e069b93f0b5146b039a86e736164383e) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Add `useBreadcrumb` hook and `Breadrumb` component for `@pankod/refine-antd` package

### Patch Changes

-   Updated dependencies [[`31850119e0`](https://github.com/refinedev/refine/commit/31850119e069b93f0b5146b039a86e736164383e)]:
    -   @pankod/refine-core@3.23.0
