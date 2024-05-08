# @refinedev/devtools

## 1.2.1

### Patch Changes

- [#5928](https://github.com/refinedev/refine/pull/5928) [`db9756e7908`](https://github.com/refinedev/refine/commit/db9756e79086ff80774ee75d570d610bf0d5d76d) Thanks [@aliemir](https://github.com/aliemir)! - fix: type errors on typescript <5

  Due to the changes in #5881, typescript users below version 5 are facing type errors. This PR fixes the type errors by updating the file extensions required by the `d.mts` declaration files to provide a compatible declarations for both typescript 4 and 5 users.

- Updated dependencies [[`db9756e7908`](https://github.com/refinedev/refine/commit/db9756e79086ff80774ee75d570d610bf0d5d76d)]:
  - @refinedev/cli@2.16.31
  - @refinedev/devtools-shared@1.1.7
  - @refinedev/devtools-server@1.1.29

## 1.2.0

### Minor Changes

- [#5898](https://github.com/refinedev/refine/pull/5898) [`93c35d82a9c`](https://github.com/refinedev/refine/commit/93c35d82a9c412372d50d476f6e96ad5861181a3) Thanks [@aliemir](https://github.com/aliemir)! - feat: devtools selector with all selectables

  Updated devtools selector to display all available elements instead of relying on the user's pointer to select the element.

### Patch Changes

- [#5881](https://github.com/refinedev/refine/pull/5881) [`ba719f6ea26`](https://github.com/refinedev/refine/commit/ba719f6ea264ee87226f42de900a754e81f1f22f) Thanks [@aliemir](https://github.com/aliemir)! - fix: declaration files in node10, node16 and nodenext module resolutions

- Updated dependencies [[`1c9a95f22ab`](https://github.com/refinedev/refine/commit/1c9a95f22ab8c3f1d1e48c7c889227ce1d9160cf), [`1c9a95f22ab`](https://github.com/refinedev/refine/commit/1c9a95f22ab8c3f1d1e48c7c889227ce1d9160cf), [`1c9a95f22ab`](https://github.com/refinedev/refine/commit/1c9a95f22ab8c3f1d1e48c7c889227ce1d9160cf), [`a9dbd808782`](https://github.com/refinedev/refine/commit/a9dbd808782212ed0bf6cf4401f85b675975a744), [`ba719f6ea26`](https://github.com/refinedev/refine/commit/ba719f6ea264ee87226f42de900a754e81f1f22f)]:
  - @refinedev/devtools-server@1.1.28
  - @refinedev/devtools-shared@1.1.6
  - @refinedev/cli@2.16.30

## 1.1.37

### Patch Changes

- [#5823](https://github.com/refinedev/refine/pull/5823) [`aedc6a2961c`](https://github.com/refinedev/refine/commit/aedc6a2961cfe69309d4e14292147a858f94e3bf) Thanks [@aliemir](https://github.com/aliemir)! - fix: broken lodash imports in ESM builds

  Fixed lodash imports in ESM builds which requires `lodash-es` imports to use `.js` extension to work properly unless the bundler is configured to handle non-fully-specified imports.

  Resolves [#5822](https://github.com/refinedev/refine/issues/5822)

- Updated dependencies [[`aedc6a2961c`](https://github.com/refinedev/refine/commit/aedc6a2961cfe69309d4e14292147a858f94e3bf)]:
  - @refinedev/devtools-server@1.1.27
  - @refinedev/cli@2.16.29

## 1.1.36

### Patch Changes

- [#5765](https://github.com/refinedev/refine/pull/5765) [`0c197d82393`](https://github.com/refinedev/refine/commit/0c197d823939ae1fd4e0ee4b5a422322853b1e45) Thanks [@aliemir](https://github.com/aliemir)! - refactor: package bundles and package.json configuration for exports

  Previously, Refine packages had exported ESM and CJS bundles with same `.js` extension and same types for both with `.d.ts` extensions. This was causing issues with bundlers and compilers to pick up the wrong files for the wrong environment. Now we're outputting ESM bundles with `.mjs` extension and CJS bundles with `.cjs` extension. Also types are now exported with both `.d.mts` and `.d.cts` extensions.

  In older versions ESM and CJS outputs of some packages were using wrong imports/requires to dependencies causing errors in some environments. This will be fixed since now we're also enforcing the module type with extensions.

  Above mentioned changes also supported with changes in `package.json` files of the packages to support the new extensions and types. All Refine packages now include `exports` fields in their configuration to make sure the correct bundle is picked up by the bundlers and compilers.

- [#5754](https://github.com/refinedev/refine/pull/5754) [`56ed144a0f5`](https://github.com/refinedev/refine/commit/56ed144a0f5af218fd9e6edbfd999ae433329927) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - chore: TypeScript upgraded to [v5.x.x](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html). #5752

- Updated dependencies [[`b20a18e4dfc`](https://github.com/refinedev/refine/commit/b20a18e4dfc97481be865a2a012ea1c588bd76c6), [`0c197d82393`](https://github.com/refinedev/refine/commit/0c197d823939ae1fd4e0ee4b5a422322853b1e45), [`51f368eab1a`](https://github.com/refinedev/refine/commit/51f368eab1a72e2134981e999dc0b3e26e2b74e8), [`33a8a80d80f`](https://github.com/refinedev/refine/commit/33a8a80d80f160101907ad3a6e808b9d04b80107), [`56ed144a0f5`](https://github.com/refinedev/refine/commit/56ed144a0f5af218fd9e6edbfd999ae433329927), [`e9bbb1aa5af`](https://github.com/refinedev/refine/commit/e9bbb1aa5af94125cf0de562b3154302373a308f)]:
  - @refinedev/cli@2.16.28
  - @refinedev/devtools-server@1.1.26
  - @refinedev/devtools-shared@1.1.5

## 1.1.35

### Patch Changes

- [#5695](https://github.com/refinedev/refine/pull/5695) [`79865affa1c`](https://github.com/refinedev/refine/commit/79865affa1c657e6b14ed34585caeec1f3d3da7f) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: apply biome format and fix lint errors.

- Updated dependencies [[`79865affa1c`](https://github.com/refinedev/refine/commit/79865affa1c657e6b14ed34585caeec1f3d3da7f)]:
  - @refinedev/cli@2.16.27
  - @refinedev/devtools-server@1.1.25
  - @refinedev/devtools-shared@1.1.4

## 1.1.34

### Patch Changes

- Updated dependencies [[`363fd4ed5f6`](https://github.com/refinedev/refine/commit/363fd4ed5f6dffbd70c2acf43ce310ab773589fb)]:
  - @refinedev/cli@2.16.26

## 1.1.33

### Patch Changes

- Updated dependencies [[`e504c5b043c`](https://github.com/refinedev/refine/commit/e504c5b043c8cef7341356eeaa16df10e5e79a60)]:
  - @refinedev/cli@2.16.25

## 1.1.32

### Patch Changes

- [#5573](https://github.com/refinedev/refine/pull/5573) [`546df06482`](https://github.com/refinedev/refine/commit/546df06482807e59a7f2a735361a8e9169bb2563) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - chore: add "use client" directive to exported files to work with nextjs app router

- Updated dependencies [[`546df06482`](https://github.com/refinedev/refine/commit/546df06482807e59a7f2a735361a8e9169bb2563)]:
  - @refinedev/devtools-shared@1.1.3
  - @refinedev/devtools-server@1.1.24
  - @refinedev/cli@2.16.24

## 1.1.31

### Patch Changes

- Updated dependencies [[`ee0f7867c3`](https://github.com/refinedev/refine/commit/ee0f7867c3648dcbf1e2504f430a0b5814d91019)]:
  - @refinedev/devtools-server@1.1.23
  - @refinedev/cli@2.16.23

## 1.1.30

### Patch Changes

- Updated dependencies [[`fda3494215`](https://github.com/refinedev/refine/commit/fda349421509197b5a2be225bd3794adb2a7925c)]:
  - @refinedev/cli@2.16.22

## 1.1.29

### Patch Changes

- [#5425](https://github.com/refinedev/refine/pull/5425) [`190af9fce2`](https://github.com/refinedev/refine/commit/190af9fce292bc46b169e3e121be6bf1c2a939a5) Thanks [@aliemir](https://github.com/aliemir)! - Updated `@refinedev/core` peer dependencies to latest (`^4.46.1`)

- Updated dependencies [[`190af9fce2`](https://github.com/refinedev/refine/commit/190af9fce292bc46b169e3e121be6bf1c2a939a5)]:
  - @refinedev/cli@2.16.21

## 1.1.28

### Patch Changes

- Updated dependencies [[`1b031a2c19`](https://github.com/refinedev/refine/commit/1b031a2c19126ec1c01a85ecfbc794dc82480776), [`1b031a2c19`](https://github.com/refinedev/refine/commit/1b031a2c19126ec1c01a85ecfbc794dc82480776)]:
  - @refinedev/devtools-server@1.1.22
  - @refinedev/cli@2.16.20

## 1.1.27

### Patch Changes

- Updated dependencies [[`714841da4b24`](https://github.com/refinedev/refine/commit/714841da4b24ef0b392eb9cbb7320cb3be122292)]:
  - @refinedev/cli@2.16.19

## 1.1.26

### Patch Changes

- Updated dependencies [[`404f16a947f3`](https://github.com/refinedev/refine/commit/404f16a947f330aad494f11545022684133bf2d0)]:
  - @refinedev/cli@2.16.18

## 1.1.25

### Patch Changes

- Updated dependencies [[`97d5d9c98b28`](https://github.com/refinedev/refine/commit/97d5d9c98b28a1d69cada0a746202f82bec45622)]:
  - @refinedev/cli@2.16.17

## 1.1.24

### Patch Changes

- Updated dependencies []:
  - @refinedev/devtools-server@1.1.21
  - @refinedev/cli@2.16.16

## 1.1.23

### Patch Changes

- Updated dependencies [[`72f9f608f42`](https://github.com/refinedev/refine/commit/72f9f608f4205cf4f3266068326d029546cd9f88), [`72f9f608f42`](https://github.com/refinedev/refine/commit/72f9f608f4205cf4f3266068326d029546cd9f88)]:
  - @refinedev/devtools-server@1.1.20
  - @refinedev/cli@2.16.15

## 1.1.22

### Patch Changes

- Updated dependencies []:
  - @refinedev/devtools-server@1.1.19
  - @refinedev/cli@2.16.14

## 1.1.21

### Patch Changes

- Updated dependencies []:
  - @refinedev/devtools-server@1.1.18
  - @refinedev/cli@2.16.13

## 1.1.20

### Patch Changes

- Updated dependencies [[`2bd813f62bf`](https://github.com/refinedev/refine/commit/2bd813f62bf55eb1be55ffe5b2c1c7079d7a93f0), [`b5f93f60f1d`](https://github.com/refinedev/refine/commit/b5f93f60f1d9d7ed105cf50512b090337a4dde2d), [`38f2a9b2e71`](https://github.com/refinedev/refine/commit/38f2a9b2e7149ad3d5e5c2780e05ddde0285ac3c)]:
  - @refinedev/devtools-server@1.1.17
  - @refinedev/cli@2.16.12

## 1.1.19

### Patch Changes

- Updated dependencies [[`2bd813f62bf`](https://github.com/refinedev/refine/commit/2bd813f62bf55eb1be55ffe5b2c1c7079d7a93f0), [`b5f93f60f1d`](https://github.com/refinedev/refine/commit/b5f93f60f1d9d7ed105cf50512b090337a4dde2d), [`38f2a9b2e71`](https://github.com/refinedev/refine/commit/38f2a9b2e7149ad3d5e5c2780e05ddde0285ac3c)]:
  - @refinedev/devtools-server@1.1.16
  - @refinedev/cli@2.16.11

## 1.1.18

### Patch Changes

- Updated dependencies [[`be419eb31bc`](https://github.com/refinedev/refine/commit/be419eb31bc7b7a3934f39bcfcbaaa0b9db60be8)]:
  - @refinedev/devtools-server@1.1.15
  - @refinedev/cli@2.16.10

## 1.1.17

### Patch Changes

- Updated dependencies [[`be419eb31bc`](https://github.com/refinedev/refine/commit/be419eb31bc7b7a3934f39bcfcbaaa0b9db60be8)]:
  - @refinedev/devtools-server@1.1.14
  - @refinedev/cli@2.16.9

## 1.1.16

### Patch Changes

- Updated dependencies [[`78117485899`](https://github.com/refinedev/refine/commit/781174858992bb1d077069d2858a37b44344879e)]:
  - @refinedev/devtools-server@1.1.13
  - @refinedev/cli@2.16.8

## 1.1.15

### Patch Changes

- Updated dependencies [[`78117485899`](https://github.com/refinedev/refine/commit/781174858992bb1d077069d2858a37b44344879e)]:
  - @refinedev/devtools-server@1.1.12
  - @refinedev/cli@2.16.7

## 1.1.14

### Patch Changes

- [#5127](https://github.com/refinedev/refine/pull/5127) [`4f89ca46ac4`](https://github.com/refinedev/refine/commit/4f89ca46ac4af5c1eddf842bddd3d981f0e47556) Thanks [@aliemir](https://github.com/aliemir)! - Update panel and pin positioning for rounded numbers to avoid subpixel blurry rendering

## 1.1.13

### Patch Changes

- [#5127](https://github.com/refinedev/refine/pull/5127) [`4f89ca46ac4`](https://github.com/refinedev/refine/commit/4f89ca46ac4af5c1eddf842bddd3d981f0e47556) Thanks [@aliemir](https://github.com/aliemir)! - Update panel and pin positioning for rounded numbers to avoid subpixel blurry rendering

## 1.1.12

### Patch Changes

- [#5082](https://github.com/refinedev/refine/pull/5082) [`61366ebd866`](https://github.com/refinedev/refine/commit/61366ebd86694328fe5a7f4dcf322db3c43bbc9d) Thanks [@aliemir](https://github.com/aliemir)! - Fixed the server/client mismatch error due to `<DevtoolsPanel />` component.

- Updated dependencies [[`61366ebd866`](https://github.com/refinedev/refine/commit/61366ebd86694328fe5a7f4dcf322db3c43bbc9d), [`6c40a720140`](https://github.com/refinedev/refine/commit/6c40a720140a8fe7141033a282500d354b1e621f)]:
  - @refinedev/devtools-server@1.1.11
  - @refinedev/cli@2.16.6

## 1.1.11

### Patch Changes

- [#5082](https://github.com/refinedev/refine/pull/5082) [`61366ebd866`](https://github.com/refinedev/refine/commit/61366ebd86694328fe5a7f4dcf322db3c43bbc9d) Thanks [@aliemir](https://github.com/aliemir)! - Fixed the server/client mismatch error due to `<DevtoolsPanel />` component.

- Updated dependencies [[`61366ebd866`](https://github.com/refinedev/refine/commit/61366ebd86694328fe5a7f4dcf322db3c43bbc9d), [`6c40a720140`](https://github.com/refinedev/refine/commit/6c40a720140a8fe7141033a282500d354b1e621f)]:
  - @refinedev/devtools-server@1.1.10
  - @refinedev/cli@2.16.5

## 1.1.10

### Patch Changes

- [#26](https://github.com/TheRakeshPurohit/refine/pull/26) [`7533e541739`](https://github.com/refinedev/refine/commit/7533e541739faadffb763feef8739ac46f62bd17) Thanks [@pull](https://github.com/apps/pull)! - Use the proper devtools url coming from the websocket handshake rather than using the hardcoded port.

- Updated dependencies [[`7533e541739`](https://github.com/refinedev/refine/commit/7533e541739faadffb763feef8739ac46f62bd17), [`7533e541739`](https://github.com/refinedev/refine/commit/7533e541739faadffb763feef8739ac46f62bd17)]:
  - @refinedev/cli@2.16.4
  - @refinedev/devtools-server@1.1.9

## 1.1.9

### Patch Changes

- [#5056](https://github.com/refinedev/refine/pull/5056) [`1fa531ebe89`](https://github.com/refinedev/refine/commit/1fa531ebe89bdab2af0dd57db121e2c0e72d44e8) Thanks [@aliemir](https://github.com/aliemir)! - Use the proper devtools url coming from the websocket handshake rather than using the hardcoded port.

- Updated dependencies [[`68f24d5b596`](https://github.com/refinedev/refine/commit/68f24d5b596eaf1b5b1690c7a57baf3e93fcf42b), [`1fa531ebe89`](https://github.com/refinedev/refine/commit/1fa531ebe89bdab2af0dd57db121e2c0e72d44e8)]:
  - @refinedev/cli@2.16.3
  - @refinedev/devtools-server@1.1.8

## 1.1.8

### Patch Changes

- [#5056](https://github.com/refinedev/refine/pull/5056) [`1fa531ebe89`](https://github.com/refinedev/refine/commit/1fa531ebe89bdab2af0dd57db121e2c0e72d44e8) Thanks [@aliemir](https://github.com/aliemir)! - Use the proper devtools url coming from the websocket handshake rather than using the hardcoded port.

- Updated dependencies [[`68f24d5b596`](https://github.com/refinedev/refine/commit/68f24d5b596eaf1b5b1690c7a57baf3e93fcf42b), [`1fa531ebe89`](https://github.com/refinedev/refine/commit/1fa531ebe89bdab2af0dd57db121e2c0e72d44e8)]:
  - @refinedev/cli@2.16.2
  - @refinedev/devtools-server@1.1.7

![refine devtools](https://github.com/refinedev/refine/assets/1110414/15ed6907-d0c8-4213-9024-2f6b0a09968f)

## 1.0.0

### Major Changes

- [#4960](https://github.com/refinedev/refine/pull/4960) [`d8e464fa2c4`](https://github.com/refinedev/refine/commit/d8e464fa2c461d0fd60050cf18247758ecdc42e3) Thanks [@aliemir](https://github.com/aliemir)! - Initial beta release of refine devtools.🎉

  We're releasing refine devtools in beta. refine devtools is designed to help you debug and develop your refine apps. It will be a collection of features including monitoring queries and mutations, testing out inferencer generated codes, adding and updating refine packages from the UI and more. 🤯

  ## Usage

  Install latest version of `@refinedev/cli`:

  ```bash
  npm install @refinedev/cli@latest
  ```

  > 🚨 If you don't have `@refinedev/cli` installed already, you can follow the [installation guide](https://refine.dev/docs/packages/documentation/cli/#how-to-add-to-an-existing-project) to add it to your project.

  Install `@refinedev/devtools` with `@refinedev/cli`

  ```bash
  npm run refine devtools init
  ```

  ![devtools-install](https://github.com/refinedev/refine/assets/23058882/7d7341cc-1edd-4cf3-b330-1796c6a8afc5)

  Ta-da! 🎉 Everything is ready now, you can use the refine devtools in your project! 🕶

  > Devtools only works in development mode and have no overhead on production builds. You don't need to do anything special to exclude DevTools from your bundle.
