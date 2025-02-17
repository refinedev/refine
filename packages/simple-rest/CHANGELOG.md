# @refinedev/simple-rest

## 5.0.10

### Patch Changes

📢 **Refine Community Release** 📢

- chore: update package descriptions

## 5.0.9

### Patch Changes

⚡ **Refine Enterprise Release** ⚡

- [#6554](https://github.com/refinedev/refine/pull/6554) [`3cb2ca6f687398e422b867692b597b0c0d911706`](https://github.com/refinedev/refine/commit/3cb2ca6f687398e422b867692b597b0c0d911706) Thanks [@necatiozmen](https://github.com/necatiozmen)! - chore: update package descriptions

## 5.0.8

### Patch Changes

- [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046) Thanks [@BatuhanW](https://github.com/BatuhanW)! - fix: "mapOperator" test type error.
  Some `CrudOperators` not supported in `operatorMappings` type but still extended from `CrudOperators`. To fix that we use `Partial` type for `operatorMappings` type.

- [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: added `type` qualifier to imports used as type only.

  ```diff
  - import { A } from "./example.ts";
  + import type { A } from "./example.ts";
  ```

## 5.0.7

### Patch Changes

- [#5945](https://github.com/refinedev/refine/pull/5945) [`8d9ce12215b0871de47b4f5113efcbc4e50ac19b`](https://github.com/refinedev/refine/commit/8d9ce12215b0871de47b4f5113efcbc4e50ac19b) Thanks [@aliemir](https://github.com/aliemir)! - fix: "mapOperator" test type error.
  Some `CrudOperators` not supported in `operatorMappings` type but still extended from `CrudOperators`. To fix that we use `Partial` type for `operatorMappings` type.

- [#5945](https://github.com/refinedev/refine/pull/5945) [`90930b381d8d369c63bc59beedf69c391875166d`](https://github.com/refinedev/refine/commit/90930b381d8d369c63bc59beedf69c391875166d) Thanks [@aliemir](https://github.com/aliemir)! - chore: added `type` qualifier to imports used as type only.

  ```diff
  - import { A } from "./example.ts";
  + import type { A } from "./example.ts";
  ```

## 5.0.6

### Patch Changes

- [#5928](https://github.com/refinedev/refine/pull/5928) [`db9756e7908`](https://github.com/refinedev/refine/commit/db9756e79086ff80774ee75d570d610bf0d5d76d) Thanks [@aliemir](https://github.com/aliemir)! - fix: type errors on typescript <5

  Due to the changes in #5881, typescript users below version 5 are facing type errors. This PR fixes the type errors by updating the file extensions required by the `d.mts` declaration files to provide a compatible declarations for both typescript 4 and 5 users.

## 5.0.5

### Patch Changes

- [#5881](https://github.com/refinedev/refine/pull/5881) [`ba719f6ea26`](https://github.com/refinedev/refine/commit/ba719f6ea264ee87226f42de900a754e81f1f22f) Thanks [@aliemir](https://github.com/aliemir)! - fix: declaration files in node10, node16 and nodenext module resolutions

## 5.0.4

### Patch Changes

- [#5765](https://github.com/refinedev/refine/pull/5765) [`0c197d82393`](https://github.com/refinedev/refine/commit/0c197d823939ae1fd4e0ee4b5a422322853b1e45) Thanks [@aliemir](https://github.com/aliemir)! - refactor: package bundles and package.json configuration for exports

  Previously, Refine packages had exported ESM and CJS bundles with same `.js` extension and same types for both with `.d.ts` extensions. This was causing issues with bundlers and compilers to pick up the wrong files for the wrong environment. Now we're outputting ESM bundles with `.mjs` extension and CJS bundles with `.cjs` extension. Also types are now exported with both `.d.mts` and `.d.cts` extensions.

  In older versions ESM and CJS outputs of some packages were using wrong imports/requires to dependencies causing errors in some environments. This will be fixed since now we're also enforcing the module type with extensions.

  Above mentioned changes also supported with changes in `package.json` files of the packages to support the new extensions and types. All Refine packages now include `exports` fields in their configuration to make sure the correct bundle is picked up by the bundlers and compilers.

- [#5754](https://github.com/refinedev/refine/pull/5754) [`56ed144a0f5`](https://github.com/refinedev/refine/commit/56ed144a0f5af218fd9e6edbfd999ae433329927) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - chore: TypeScript upgraded to [v5.x.x](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html). #5752

## 5.0.3

### Patch Changes

- [#5695](https://github.com/refinedev/refine/pull/5695) [`79865affa1c`](https://github.com/refinedev/refine/commit/79865affa1c657e6b14ed34585caeec1f3d3da7f) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: apply biome format and fix lint errors.

## 5.0.2

### Patch Changes

- [#5378](https://github.com/refinedev/refine/pull/5378) [`63e39ed312`](https://github.com/refinedev/refine/commit/63e39ed3127c29fa044f29c69299f46d563636ff) Thanks [@amanzrx4](https://github.com/amanzrx4)! - fix: `dataProvider.getList` method adds `?` to the request url when there is no `filters`, `sorters` and `pagination` in the request. #5359

  ```diff
  - Expected
  + Received

  - "https://api.fake-rest.refine.dev/categories",
  + "https://api.fake-rest.refine.dev/categories?",
  ```

  From now on, `dataProvider.getList` method will not add `?` to the request url when there is no `filters`, `sorters` and `pagination` in the request.

## 5.0.1

### Patch Changes

- [#5425](https://github.com/refinedev/refine/pull/5425) [`190af9fce2`](https://github.com/refinedev/refine/commit/190af9fce292bc46b169e3e121be6bf1c2a939a5) Thanks [@aliemir](https://github.com/aliemir)! - Updated `@refinedev/core` peer dependencies to latest (`^4.46.1`)

## 5.0.0

### Major Changes

- [#5330](https://github.com/refinedev/refine/pull/5330) [`7c8827b43d`](https://github.com/refinedev/refine/commit/7c8827b43d9e378818be6ee23032925c97ce02d5) Thanks [@BatuhanW](https://github.com/BatuhanW)! - feat: upgrade axios dependency to ^1.6.2

## 4.5.4

### Patch Changes

- [#5036](https://github.com/refinedev/refine/pull/5036) [`fba8f737005`](https://github.com/refinedev/refine/commit/fba8f7370057fa8d4c27de6b9432fec4ccada268) Thanks [@saarthak08](https://github.com/saarthak08)! - fix: headers persisting in useCustomMutation hook

## 4.5.3

### Patch Changes

- [#5036](https://github.com/refinedev/refine/pull/5036) [`fba8f737005`](https://github.com/refinedev/refine/commit/fba8f7370057fa8d4c27de6b9432fec4ccada268) Thanks [@saarthak08](https://github.com/saarthak08)! - fix: headers persisting in useCustomMutation hook

## 4.5.2

### Patch Changes

- [#5022](https://github.com/refinedev/refine/pull/5022) [`80513a4e42f`](https://github.com/refinedev/refine/commit/80513a4e42f8dda39e01157643594a9e4c32001b) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update README.md

  - fix grammar errors.
  - make all README.md files consistent.
  - add code example code snippets.

## 4.5.1

### Patch Changes

- [#5022](https://github.com/refinedev/refine/pull/5022) [`80513a4e42f`](https://github.com/refinedev/refine/commit/80513a4e42f8dda39e01157643594a9e4c32001b) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update README.md

  - fix grammar errors.
  - make all README.md files consistent.
  - add code example code snippets.

## 4.5.0

### Minor Changes

- [#4177](https://github.com/refinedev/refine/pull/4177) [`623691b10f0`](https://github.com/refinedev/refine/commit/623691b10f07f13af11ed56c24161cc0dc9dd3f1) Thanks [@salihozdemir](https://github.com/salihozdemir)! - feat: add the abilities to pass custom headers and custom http method to the request

  Example of changing the http method:

  ```tsx
  import { useUpdate } from "@refinedev/core";

  const { mutate } = useUpdate();

  mutate({
    resource: "posts",
    id: 1,
    variables: {
      title: "New title",
    },
    //highlight-start
    meta: {
      method: "put",
    },
    //highlight-end
  });
  ```

  Example of passing custom headers:

  ```tsx
  import { useOne } from "@refinedev/core";

  useOne({
    resource: "posts",
    id: 1,
    //highlight-start
    meta: {
      headers: {
        "X-Custom-Header": "Custom header value",
      },
    },
    //highlight-end
  });
  ```

## 4.4.0

### Minor Changes

- [#4177](https://github.com/refinedev/refine/pull/4177) [`623691b10f0`](https://github.com/refinedev/refine/commit/623691b10f07f13af11ed56c24161cc0dc9dd3f1) Thanks [@salihozdemir](https://github.com/salihozdemir)! - feat: add the abilities to pass custom headers and custom http method to the request

  Example of changing the http method:

  ```tsx
  import { useUpdate } from "@refinedev/core";

  const { mutate } = useUpdate();

  mutate({
    resource: "posts",
    id: 1,
    variables: {
      title: "New title",
    },
    //highlight-start
    meta: {
      method: "put",
    },
    //highlight-end
  });
  ```

  Example of passing custom headers:

  ```tsx
  import { useOne } from "@refinedev/core";

  useOne({
    resource: "posts",
    id: 1,
    //highlight-start
    meta: {
      headers: {
        "X-Custom-Header": "Custom header value",
      },
    },
    //highlight-end
  });
  ```

## 4.3.0

### Minor Changes

- [#4162](https://github.com/refinedev/refine/pull/4162) [`4ebd298fa8a`](https://github.com/refinedev/refine/commit/4ebd298fa8a9245a17fb724ae5817908cbb13926) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: `requiredPackages` added to refine.config.js for CLI to automatically install required packages for the project.

## 4.2.0

### Minor Changes

- [#4162](https://github.com/refinedev/refine/pull/4162) [`4ebd298fa8a`](https://github.com/refinedev/refine/commit/4ebd298fa8a9245a17fb724ae5817908cbb13926) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: `requiredPackages` added to refine.config.js for CLI to automatically install required packages for the project.

## 4.1.0

### Minor Changes

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!

  - `metaData` prop is now deprecated for all data provider methods. Use `meta` prop instead.

    > For backward compatibility, we still support `metaData` prop with refine v4.

    ```diff
    create: async ({
    -    metaData
    +    meta
    }) => {
        ...
    },
    ```

  - `sort`, `hasPagination`, and `metaData` parameters of `getList` method are now deprecated. Use `sorters`, `pagination`, and `meta` parameters instead.

    > For backward compatibility, we still support `sort`, `hasPagination` and `metaData` props with refine v4.

    ```diff
    getList: async ({
    -    sort
    +    sorters
    -    hasPagination
    +    pagination: { mode: "off" | "server | "client" }
    -    metaData
    +    meta
    }) => {
        ...
    },
    ```

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
  **Moving to the `@refinedev` scope 🎉🎉**

  Moved to the `@refinedev` scope and updated our packages to use the new scope. From now on, all packages will be published under the `@refinedev` scope with their new names.

  Now, we're also removing the `refine` prefix from all packages. So, the `@pankod/refine-core` package is now `@refinedev/core`, `@pankod/refine-antd` is now `@refinedev/antd`, and so on.

### Patch Changes

## 3.39.0

### Minor Changes

- [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

## 3.38.0

### Minor Changes

- [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

## 3.37.4

### Patch Changes

- [#3115](https://github.com/refinedev/refine/pull/3115) [`836f7091c13`](https://github.com/refinedev/refine/commit/836f7091c130ee0220105646869b484253525a7d) Thanks [@aliemir](https://github.com/aliemir)! - Add `refine.config.js` to included package files.

## 3.37.3

### Patch Changes

- [#3115](https://github.com/refinedev/refine/pull/3115) [`836f7091c13`](https://github.com/refinedev/refine/commit/836f7091c130ee0220105646869b484253525a7d) Thanks [@aliemir](https://github.com/aliemir)! - Add `refine.config.js` to included package files.

## 3.37.2

### Patch Changes

- [#3109](https://github.com/refinedev/refine/pull/3109) [`16549ed3012`](https://github.com/refinedev/refine/commit/16549ed30128750f04ae17da12024b9734d5adae) Thanks [@aliemir](https://github.com/aliemir)! - Updated `swizzle` message to include extra information and usage example.

## 3.37.1

### Patch Changes

- [#3109](https://github.com/refinedev/refine/pull/3109) [`16549ed3012`](https://github.com/refinedev/refine/commit/16549ed30128750f04ae17da12024b9734d5adae) Thanks [@aliemir](https://github.com/aliemir)! - Updated `swizzle` message to include extra information and usage example.

## 3.37.0

### Minor Changes

- [#3062](https://github.com/refinedev/refine/pull/3062) [`6c2ed708a9a`](https://github.com/refinedev/refine/commit/6c2ed708a9a76faddb9d27a0aca9f4ada3c270af) Thanks [@aliemir](https://github.com/aliemir)! - - Moved helpers to separate files and updated the exports to make it compatible with `swizzle` feature.
  - Added `refine.config.js` to configure the `swizzle` feature.
  - `stringify` helper is now exported from `@pankod/refine-simple-rest` package.
  - `axios` instance is now exported from `@pankod/refine-simple-rest` package to allow users to configure the data provider without adding `axios` dependency.

## 3.36.0

### Minor Changes

- [#3062](https://github.com/refinedev/refine/pull/3062) [`6c2ed708a9a`](https://github.com/refinedev/refine/commit/6c2ed708a9a76faddb9d27a0aca9f4ada3c270af) Thanks [@aliemir](https://github.com/aliemir)! - - Moved helpers to separate files and updated the exports to make it compatible with `swizzle` feature.
  - Added `refine.config.js` to configure the `swizzle` feature.
  - `stringify` helper is now exported from `@pankod/refine-simple-rest` package.
  - `axios` instance is now exported from `@pankod/refine-simple-rest` package to allow users to configure the data provider without adding `axios` dependency.

## 3.35.2

### Patch Changes

- [#2980](https://github.com/refinedev/refine/pull/2980) [`b8f8b0eab9`](https://github.com/refinedev/refine/commit/b8f8b0eab98e94ac243bd5aed98fe0e55e7e6762) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Added warning on unsupported filters

## 3.35.1

### Patch Changes

- [#2980](https://github.com/refinedev/refine/pull/2980) [`b8f8b0eab9`](https://github.com/refinedev/refine/commit/b8f8b0eab98e94ac243bd5aed98fe0e55e7e6762) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Added warning on unsupported filters

## 3.35.0

### Minor Changes

- Only `or` was supported as a conditional filter. Now `and` and `or` can be used together and nested. 🚀

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

- Fixed using `data` in `axios'` `delete` function

## 3.34.0

### Minor Changes

- [#2751](https://github.com/refinedev/refine/pull/2751) [`addff64c77`](https://github.com/refinedev/refine/commit/addff64c777e4c9f044a1a109cb05453e6e9f762) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Only `or` was supported as a conditional filter. Now `and` and `or` can be used together and nested. 🚀

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

- [#2790](https://github.com/refinedev/refine/pull/2790) [`8144e10156`](https://github.com/refinedev/refine/commit/8144e10156c2691f4f298e27720eea183241e971) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed using `data` in `axios'` `delete` function

## 3.33.0

### Minor Changes

- Updated `dataProvider` types with `Required` utility to mark `getMany`, `createMany`, `updateMany` and `deleteMany` as implemented.

- Remove unimplemented `createMany`, `updateMany` and `deleteMany` functions.

## 3.32.0

### Minor Changes

- [#2688](https://github.com/refinedev/refine/pull/2688) [`508045ac30`](https://github.com/refinedev/refine/commit/508045ac30cd3948f68497e13fdf04f7c72ce387) Thanks [@aliemir](https://github.com/aliemir)! - Updated `dataProvider` types with `Required` utility to mark `getMany`, `createMany`, `updateMany` and `deleteMany` as implemented.

- [#2688](https://github.com/refinedev/refine/pull/2688) [`508045ac30`](https://github.com/refinedev/refine/commit/508045ac30cd3948f68497e13fdf04f7c72ce387) Thanks [@aliemir](https://github.com/aliemir)! - Remove unimplemented `createMany`, `updateMany` and `deleteMany` functions.

## 3.31.0

### Minor Changes

- Fixed payload data in delete on nestjsx data provider custom method.

## 3.30.0

### Minor Changes

- [#2465](https://github.com/refinedev/refine/pull/2465) [`4d07f33993`](https://github.com/refinedev/refine/commit/4d07f33993fa5a6facaf33cd651ef94892d15dae) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Fixed payload data in delete on nestjsx data provider custom method.

## 3.29.0

### Minor Changes

- Update type declaration generation with `tsc` instead of `tsup` for better navigation throughout projects source code.

## 3.28.0

### Minor Changes

- [#2440](https://github.com/refinedev/refine/pull/2440) [`0150dcd070`](https://github.com/refinedev/refine/commit/0150dcd0700253f1c4908e7e5f2e178bb122e9af) Thanks [@aliemir](https://github.com/aliemir)! - Update type declaration generation with `tsc` instead of `tsup` for better navigation throughout projects source code.

## 3.27.0

### Minor Changes

- All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

  Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

## 3.26.0

### Minor Changes

- [#2217](https://github.com/refinedev/refine/pull/2217) [`b4aae00f77`](https://github.com/refinedev/refine/commit/b4aae00f77a2476d847994db21298ae25e4cf6e5) Thanks [@omeraplak](https://github.com/omeraplak)! - All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

  Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

## 3.25.6

### Patch Changes

- Updated pagination parameters default values and added `hasPagination` property to `getList` method of the data providers.

  **Implementation**

  Updated the `getList` method accordingly to the changes in the `useTable` and `useList` of `@pankod/refine-core`. `hasPagination` is used to disable pagination (defaults to `true`)

  **Use Cases**

  For some resources, there might be no support for pagination or users might want to see all of the data without any pagination, prior to these changes this was not supported in **refine** data providers.

- Updated dependencies []:
  - @pankod/refine-core@3.36.0

## 3.25.5

### Patch Changes

- [#2050](https://github.com/refinedev/refine/pull/2050) [`635cfe9fdb`](https://github.com/refinedev/refine/commit/635cfe9fdbfe5940b950ae99c1f0b686c78bb8e5) Thanks [@ozkalai](https://github.com/ozkalai)! - Updated pagination parameters default values and added `hasPagination` property to `getList` method of the data providers.

  **Implementation**

  Updated the `getList` method accordingly to the changes in the `useTable` and `useList` of `@pankod/refine-core`. `hasPagination` is used to disable pagination (defaults to `true`)

  **Use Cases**

  For some resources, there might be no support for pagination or users might want to see all of the data without any pagination, prior to these changes this was not supported in **refine** data providers.

- Updated dependencies [[`ecde34a9b3`](https://github.com/refinedev/refine/commit/ecde34a9b38ef5667fa863f9ebb9dcb1cfff1651), [`635cfe9fdb`](https://github.com/refinedev/refine/commit/635cfe9fdbfe5940b950ae99c1f0b686c78bb8e5)]:
  - @pankod/refine-core@3.35.0

## 3.25.4

### Patch Changes

- Updated axios version (0.21.4 to 0.26.1). In this version, the way of sending headers has changed as follows.

  ```
  // old v0.21.4
  axiosInstance.defaults.headers = { Authorization: `Bearer ${data.jwt}` };

  // new v0.26.1
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${data.jwt}`;
  ```

- Updated dependencies []:
  - @pankod/refine-core@3.29.0

## 3.25.3

### Patch Changes

- Updated axios version (0.21.4 to 0.26.1). In this version, the way of sending headers has changed as follows.

  ```
  // old v0.21.4
  axiosInstance.defaults.headers = { Authorization: `Bearer ${data.jwt}` };

  // new v0.26.1
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${data.jwt}`;
  ```

- Updated dependencies []:
  - @pankod/refine-core@3.28.0

## 3.25.2

### Patch Changes

- Updated axios version (0.21.4 to 0.26.1). In this version, the way of sending headers has changed as follows.

  ```
  // old v0.21.4
  axiosInstance.defaults.headers = { Authorization: `Bearer ${data.jwt}` };

  // new v0.26.1
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${data.jwt}`;
  ```

- Updated dependencies []:
  - @pankod/refine-core@3.27.0

## 3.25.1

### Patch Changes

- [#1899](https://github.com/refinedev/refine/pull/1899) [`fbfea418a0`](https://github.com/refinedev/refine/commit/fbfea418a024a527a2b432c634f46a96d4f70d88) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Updated axios version (0.21.4 to 0.26.1). In this version, the way of sending headers has changed as follows.

  ```
  // old v0.21.4
  axiosInstance.defaults.headers = { Authorization: `Bearer ${data.jwt}` };

  // new v0.26.1
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${data.jwt}`;
  ```

- Updated dependencies [[`2ba2a96fd2`](https://github.com/refinedev/refine/commit/2ba2a96fd24aa733c355ac9ef4c99b7d48115746)]:
  - @pankod/refine-core@3.26.0

## 3.22.2

### Patch Changes

- Updated dependencies [[`2deb19babf`](https://github.com/refinedev/refine/commit/2deb19babfc6db5b00b111ec29aa5ece4c371bbc)]:
  - @pankod/refine-core@3.23.2
