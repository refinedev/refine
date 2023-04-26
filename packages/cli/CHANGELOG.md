# @pankod/refine-cli

## 2.5.3

### Patch Changes

-   [#4195](https://github.com/refinedev/refine/pull/4195) [`18f955a064e`](https://github.com/refinedev/refine/commit/18f955a064ef7524eef3f4434fb030d30058b4f9) Thanks [@aliemir](https://github.com/aliemir)! - fix(cli): add file system check to find installed packages

    Updated the package find logic and added file system check for double checking if the package is installed or not.

## 2.5.2

### Patch Changes

-   [#4195](https://github.com/refinedev/refine/pull/4195) [`18f955a064e`](https://github.com/refinedev/refine/commit/18f955a064ef7524eef3f4434fb030d30058b4f9) Thanks [@aliemir](https://github.com/aliemir)! - fix(cli): add file system check to find installed packages

    Updated the package find logic and added file system check for double checking if the package is installed or not.

## 2.5.1

### Patch Changes

-   [#4195](https://github.com/refinedev/refine/pull/4195) [`18f955a064e`](https://github.com/refinedev/refine/commit/18f955a064ef7524eef3f4434fb030d30058b4f9) Thanks [@aliemir](https://github.com/aliemir)! - fix(cli): add file system check to find installed packages

    Updated the package find logic and added file system check for double checking if the package is installed or not.

## 2.5.0

### Minor Changes

-   [#4187](https://github.com/refinedev/refine/pull/4187) [`014ad4d5e79`](https://github.com/refinedev/refine/commit/014ad4d5e79069b0a5e393d0bfc5e30f66f99c49) Thanks [@aliemir](https://github.com/aliemir)! - refactor: use `require.resolve` to find script executables.

    Updated the runner command to use `require.resolve` to find the script executable. This allows the script to be run from anywhere in the project and allow mono-repos with workspaces to work.

-   [#4187](https://github.com/refinedev/refine/pull/4187) [`014ad4d5e79`](https://github.com/refinedev/refine/commit/014ad4d5e79069b0a5e393d0bfc5e30f66f99c49) Thanks [@aliemir](https://github.com/aliemir)! - refactor: use `require.resolve` to find refine package paths.

    Updated the refine package search to use `require.resolve` to find the package path. This allows the package to be run from anywhere in the project and allow mono-repos with workspaces to work.

## 2.4.0

### Minor Changes

-   [#4187](https://github.com/refinedev/refine/pull/4187) [`014ad4d5e79`](https://github.com/refinedev/refine/commit/014ad4d5e79069b0a5e393d0bfc5e30f66f99c49) Thanks [@aliemir](https://github.com/aliemir)! - refactor: use `require.resolve` to find script executables.

    Updated the runner command to use `require.resolve` to find the script executable. This allows the script to be run from anywhere in the project and allow mono-repos with workspaces to work.

-   [#4187](https://github.com/refinedev/refine/pull/4187) [`014ad4d5e79`](https://github.com/refinedev/refine/commit/014ad4d5e79069b0a5e393d0bfc5e30f66f99c49) Thanks [@aliemir](https://github.com/aliemir)! - refactor: use `require.resolve` to find refine package paths.

    Updated the refine package search to use `require.resolve` to find the package path. This allows the package to be run from anywhere in the project and allow mono-repos with workspaces to work.

## 2.3.0

### Minor Changes

-   [#4149](https://github.com/refinedev/refine/pull/4149) [`ca6a2b18576`](https://github.com/refinedev/refine/commit/ca6a2b185762e7dbae120da4090c47af5391fe45) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: added required packages to install after swizzling.
    Now with this feature, users can automatically install the required packages after swizzling.

### Patch Changes

-   [#4138](https://github.com/refinedev/refine/pull/4138) [`a15634d6621`](https://github.com/refinedev/refine/commit/a15634d66219f12de7cc195b5e97c9461e4b7164) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fix: When the project type is vite, the `refine dev` command was running `vite start`. It is now changed to `vite dev`, because there is no `start` command in vite.

## 2.2.0

### Minor Changes

-   [#4149](https://github.com/refinedev/refine/pull/4149) [`ca6a2b18576`](https://github.com/refinedev/refine/commit/ca6a2b185762e7dbae120da4090c47af5391fe45) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: added required packages to install after swizzling.
    Now with this feature, users can automatically install the required packages after swizzling.

### Patch Changes

-   [#4138](https://github.com/refinedev/refine/pull/4138) [`a15634d6621`](https://github.com/refinedev/refine/commit/a15634d66219f12de7cc195b5e97c9461e4b7164) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fix: When the project type is vite, the `refine dev` command was running `vite start`. It is now changed to `vite dev`, because there is no `start` command in vite.

## 2.1.2

### Patch Changes

-   [#3976](https://github.com/refinedev/refine/pull/3976) [`7e793ee9dc3`](https://github.com/refinedev/refine/commit/7e793ee9dc343751e6e9ee8aeaf00260afdf1c50) Thanks [@BatuhanW](https://github.com/BatuhanW)! - feat: added parcel support

    fixed: refine --version doesn't return refine cli's version.
    fixed: add error message if user tries to run script with unsupported package.
    fixed: added "unknown" project type as fallback.

## 2.1.1

### Patch Changes

-   [#3976](https://github.com/refinedev/refine/pull/3976) [`7e793ee9dc3`](https://github.com/refinedev/refine/commit/7e793ee9dc343751e6e9ee8aeaf00260afdf1c50) Thanks [@BatuhanW](https://github.com/BatuhanW)! - feat: added parcel support

    fixed: refine --version doesn't return refine cli's version.
    fixed: add error message if user tries to run script with unsupported package.
    fixed: added "unknown" project type as fallback.

## 2.1.0

### Minor Changes

-   Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
    **Moving to the `@refinedev` scope 🎉🎉**

    Moved to the `@refinedev` scope and updated our packages to use the new scope. From now on, all packages will be published under the `@refinedev` scope with their new names.

    Now, we're also removing the `refine` prefix from all packages. So, the `@pankod/refine-core` package is now `@refinedev/core`, `@pankod/refine-antd` is now `@refinedev/antd`, and so on.

### Patch Changes

## 1.19.0

### Minor Changes

-   [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

## 1.18.0

### Minor Changes

-   [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

## 1.17.2

### Patch Changes

-   [#3685](https://github.com/refinedev/refine/pull/3685) [`b6812af2293`](https://github.com/refinedev/refine/commit/b6812af22931c6d505914e452756fafe2d56b96b) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - Fixed: `provideCliHelpers` function type error.

## 1.17.1

### Patch Changes

-   [#3685](https://github.com/refinedev/refine/pull/3685) [`b6812af2293`](https://github.com/refinedev/refine/commit/b6812af22931c6d505914e452756fafe2d56b96b) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - Fixed: `provideCliHelpers` function type error.

## 1.17.0

### Minor Changes

-   [#3349](https://github.com/refinedev/refine/pull/3349) [`4853ac484df`](https://github.com/refinedev/refine/commit/4853ac484dfe8647050997a97183dcd44fc2d0cb) Thanks [@vanflux](https://github.com/vanflux)! - Ignoring "npm ls" exit code to get package list

### Patch Changes

-   [#3367](https://github.com/refinedev/refine/pull/3367) [`e850fe25400`](https://github.com/refinedev/refine/commit/e850fe2540080ab7c5da75b76160e2b71d6f7148) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Fixed: `ReferenceError: btoa is not defined`. #3366 use `Buffer.from` when `btoa` is `"undefined"` for base64 encoding.

## 1.16.0

### Minor Changes

-   [#3349](https://github.com/refinedev/refine/pull/3349) [`4853ac484df`](https://github.com/refinedev/refine/commit/4853ac484dfe8647050997a97183dcd44fc2d0cb) Thanks [@vanflux](https://github.com/vanflux)! - Ignoring "npm ls" exit code to get package list

### Patch Changes

-   [#3367](https://github.com/refinedev/refine/pull/3367) [`e850fe25400`](https://github.com/refinedev/refine/commit/e850fe2540080ab7c5da75b76160e2b71d6f7148) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Fixed: `ReferenceError: btoa is not defined`. #3366 use `Buffer.from` when `btoa` is `"undefined"` for base64 encoding.

## 1.15.0

### Minor Changes

-   [#3330](https://github.com/refinedev/refine/pull/3330) [`ff2b87f92af`](https://github.com/refinedev/refine/commit/ff2b87f92af66dc583e614f746646567d6d56eb9) Thanks [@aliemir](https://github.com/aliemir)! - Do not prompt the component selection if there is only one component to swizzle.

## 1.14.0

### Minor Changes

-   [#3330](https://github.com/refinedev/refine/pull/3330) [`ff2b87f92af`](https://github.com/refinedev/refine/commit/ff2b87f92af66dc583e614f746646567d6d56eb9) Thanks [@aliemir](https://github.com/aliemir)! - Do not prompt the component selection if there is only one component to swizzle.

## 1.13.6

### Patch Changes

-   [#3315](https://github.com/refinedev/refine/pull/3315) [`dda827e9a58`](https://github.com/refinedev/refine/commit/dda827e9a581b4427f6423740aed399090a5631f) Thanks [@yasnbouz](https://github.com/yasnbouz)! - Fixed: `Ctrl+c` not killing running dev; leaving ports open - #3175
    Fixed: terminal output color w/ env `FORCE_COLOR=true`

## 1.13.5

### Patch Changes

-   [#3315](https://github.com/refinedev/refine/pull/3315) [`dda827e9a58`](https://github.com/refinedev/refine/commit/dda827e9a581b4427f6423740aed399090a5631f) Thanks [@yasnbouz](https://github.com/yasnbouz)! - Fixed: `Ctrl+c` not killing running dev; leaving ports open - #3175
    Fixed: terminal output color w/ env `FORCE_COLOR=true`

## 1.13.4

### Patch Changes

-   [#3282](https://github.com/refinedev/refine/pull/3282) [`996b9077ea0`](https://github.com/refinedev/refine/commit/996b9077ea0c65a36550d0d6e5890652f6bc64bb) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Added: `npm -ls` was always throws an error. From now returns `null`, with this way `error` handling can be done when needed.

## 1.13.3

### Patch Changes

-   [#3282](https://github.com/refinedev/refine/pull/3282) [`996b9077ea0`](https://github.com/refinedev/refine/commit/996b9077ea0c65a36550d0d6e5890652f6bc64bb) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Added: `npm -ls` was always throws an error. From now returns `null`, with this way `error` handling can be done when needed.

## 1.13.2

### Patch Changes

-   [#3239](https://github.com/refinedev/refine/pull/3239) [`989ba9f13a1`](https://github.com/refinedev/refine/commit/989ba9f13a1f28cf23d8e4e9eb18ebb55cae1e61) Thanks [@omeraplak](https://github.com/omeraplak)! - fix: the build command was exiting with "0" exit code on error - #3234

## 1.13.1

### Patch Changes

-   [#3239](https://github.com/refinedev/refine/pull/3239) [`989ba9f13a1`](https://github.com/refinedev/refine/commit/989ba9f13a1f28cf23d8e4e9eb18ebb55cae1e61) Thanks [@omeraplak](https://github.com/omeraplak)! - fix: the build command was exiting with "0" exit code on error - #3234

## 1.13.0

### Minor Changes

-   [#3136](https://github.com/refinedev/refine/pull/3136) [`b5b99b485f2`](https://github.com/refinedev/refine/commit/b5b99b485f213147a436c6fe7e69ef8974408981) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Downgrade `jscodeshift` `"^0.14.0"` to `"0.13.0"`.

### Patch Changes

-   [#3133](https://github.com/refinedev/refine/pull/3133) [`87c875fcf51`](https://github.com/refinedev/refine/commit/87c875fcf51b7f1c88a4a3687d61a09ce3abbedb) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Fixed: add await to `telemetry` `fetch()`

## 1.12.0

### Minor Changes

-   [#3136](https://github.com/refinedev/refine/pull/3136) [`b5b99b485f2`](https://github.com/refinedev/refine/commit/b5b99b485f213147a436c6fe7e69ef8974408981) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Downgrade `jscodeshift` `"^0.14.0"` to `"0.13.0"`.

### Patch Changes

-   [#3133](https://github.com/refinedev/refine/pull/3133) [`87c875fcf51`](https://github.com/refinedev/refine/commit/87c875fcf51b7f1c88a4a3687d61a09ce3abbedb) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Fixed: add await to `telemetry` `fetch()`

## 1.11.0

### Minor Changes

-   [#3130](https://github.com/refinedev/refine/pull/3130) [`0b428512b98`](https://github.com/refinedev/refine/commit/0b428512b98ac010cbff9d343f6b12fa2980a662) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Removed UI framework requirement in `create-resource` command.

## 1.10.0

### Minor Changes

-   [#3130](https://github.com/refinedev/refine/pull/3130) [`0b428512b98`](https://github.com/refinedev/refine/commit/0b428512b98ac010cbff9d343f6b12fa2980a662) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Removed UI framework requirement in `create-resource` command.

## 1.9.0

### Minor Changes

-   [#3109](https://github.com/refinedev/refine/pull/3109) [`16549ed3012`](https://github.com/refinedev/refine/commit/16549ed30128750f04ae17da12024b9734d5adae) Thanks [@aliemir](https://github.com/aliemir)! - - Updated command order (`swizzle` to the top)
    -   Added installed packages notification at the start of the `swizzle` command.
    -   Updated `swizzle` command to respect project file paths (`/src` or `/app`)
    -   Added grouping option for installed packages at the first prompt of the `swizzle` command.
    -   Syntax highlighting and improvements for `swizzle` success messages.

## 1.8.0

### Minor Changes

-   [#3109](https://github.com/refinedev/refine/pull/3109) [`16549ed3012`](https://github.com/refinedev/refine/commit/16549ed30128750f04ae17da12024b9734d5adae) Thanks [@aliemir](https://github.com/aliemir)! - - Updated command order (`swizzle` to the top)
    -   Added installed packages notification at the start of the `swizzle` command.
    -   Updated `swizzle` command to respect project file paths (`/src` or `/app`)
    -   Added grouping option for installed packages at the first prompt of the `swizzle` command.
    -   Syntax highlighting and improvements for `swizzle` success messages.

## 1.7.0

### Minor Changes

-   [#3062](https://github.com/refinedev/refine/pull/3062) [`6c2ed708a9a`](https://github.com/refinedev/refine/commit/6c2ed708a9a76faddb9d27a0aca9f4ada3c270af) Thanks [@aliemir](https://github.com/aliemir)! - `swizzle` command added to the CLI. 🎉

    It allows you to copy the latest version of supported components and functions to your project and customize it the way you want. `swizzle` command will prompt you with package and component selection, then copy the latest version of the component to your project and log the path of the copied files.

## 1.6.0

### Minor Changes

-   [#3062](https://github.com/refinedev/refine/pull/3062) [`6c2ed708a9a`](https://github.com/refinedev/refine/commit/6c2ed708a9a76faddb9d27a0aca9f4ada3c270af) Thanks [@aliemir](https://github.com/aliemir)! - `swizzle` command added to the CLI. 🎉

    It allows you to copy the latest version of supported components and functions to your project and customize it the way you want. `swizzle` command will prompt you with package and component selection, then copy the latest version of the component to your project and log the path of the copied files.

## 1.5.3

### Patch Changes

-   [#3101](https://github.com/refinedev/refine/pull/3101) [`355937d7032`](https://github.com/refinedev/refine/commit/355937d703280e6c8c3cd66d744d07363126f84d) Thanks [@omeraplak](https://github.com/omeraplak)! - No more joke for CLI :(

## 1.5.2

### Patch Changes

-   [#3101](https://github.com/refinedev/refine/pull/3101) [`355937d7032`](https://github.com/refinedev/refine/commit/355937d703280e6c8c3cd66d744d07363126f84d) Thanks [@omeraplak](https://github.com/omeraplak)! - No more joke for CLI :(

## 1.5.1

### Patch Changes

-   [#3092](https://github.com/refinedev/refine/pull/3092) [`984f1c21ab6`](https://github.com/refinedev/refine/commit/984f1c21ab66fedcedb8630248e7429f7d4f26c3) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Added: Warning command description changed according `refine CLI` installed or not.

    -   If `refine CLI` is installed, It will be shown as `npm run refine update` command.
    -   IF `refine CLI` is not installed, It will be shown as `npx refine update` command.
        -   package manager will be detected automatically.

## 1.5.0

### Minor Changes

-   [#3085](https://github.com/refinedev/refine/pull/3085) [`1ff8002f31d`](https://github.com/refinedev/refine/commit/1ff8002f31d5a9970d41c8853cbd5ed9a2d7059e) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Inferencer support added to the resources created with the `refine-cli`.

## 1.4.0

### Minor Changes

-   [#3085](https://github.com/refinedev/refine/pull/3085) [`1ff8002f31d`](https://github.com/refinedev/refine/commit/1ff8002f31d5a9970d41c8853cbd5ed9a2d7059e) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Inferencer support added to the resources created with the `refine-cli`.

## 1.3.1

### Patch Changes

-   [#3083](https://github.com/refinedev/refine/pull/3083) [`9a2f3bd2d61`](https://github.com/refinedev/refine/commit/9a2f3bd2d6174e1cced430868ff63a3907b09e32) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Added: undefined `process.NODE_ENV` value set to the `development` from `production`.

## 1.3.0

### Minor Changes

-   [#3067](https://github.com/refinedev/refine/pull/3067) [`6f83ddba2ad`](https://github.com/refinedev/refine/commit/6f83ddba2ad35f02f4aa352d0f1587fd61a9f704) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Added: `whoami` command to `refine-cli`. It's shows details of the development environment.
    Added: telemetry to `refine-cli` commands.

### Patch Changes

-   [#3080](https://github.com/refinedev/refine/pull/3080) [`407250fba24`](https://github.com/refinedev/refine/commit/407250fba2474b276944f80a69ee00d6ed253ced) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Added: `@types/figlet` as a `devDependencies`

-   [#3078](https://github.com/refinedev/refine/pull/3078) [`37fac3e9cfa`](https://github.com/refinedev/refine/commit/37fac3e9cfa05df59d8c14f3cb1d5c56b31f466d) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Fixed: `figlet` moved to `dependencies` from `devDependencies`

## 1.2.0

### Minor Changes

-   [#3067](https://github.com/refinedev/refine/pull/3067) [`6f83ddba2ad`](https://github.com/refinedev/refine/commit/6f83ddba2ad35f02f4aa352d0f1587fd61a9f704) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Added: `whoami` command to `refine-cli`. It's shows details of the development environment.
    Added: telemetry to `refine-cli` commands.

### Patch Changes

-   [#3080](https://github.com/refinedev/refine/pull/3080) [`407250fba24`](https://github.com/refinedev/refine/commit/407250fba2474b276944f80a69ee00d6ed253ced) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Added: `@types/figlet` as a `devDependencies`

-   [#3078](https://github.com/refinedev/refine/pull/3078) [`37fac3e9cfa`](https://github.com/refinedev/refine/commit/37fac3e9cfa05df59d8c14f3cb1d5c56b31f466d) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Fixed: `figlet` moved to `dependencies` from `devDependencies`

## 1.1.4

### Patch Changes

-   [`1fa9e25ac23`](https://github.com/refinedev/refine/commit/1fa9e25ac23c01a7a673d069d54aa2b6d3dc4701) Thanks [@omeraplak](https://github.com/omeraplak)! - Added some fun

## 1.1.3

### Patch Changes

-   [#3063](https://github.com/refinedev/refine/pull/3063) [`949b8bd6ac9`](https://github.com/refinedev/refine/commit/949b8bd6ac9fbb50e5bc30b8521bb618b7ecdc1c) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Added unique check on `create-resource` with `refine-cli`.

## 1.1.2

### Patch Changes

-   [#3058](https://github.com/refinedev/refine/pull/3058) [`5f43dc6361f`](https://github.com/refinedev/refine/commit/5f43dc6361fa4621f098d3411ac58d2bd6e4d2e8) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Added: The description of `dev`,`start`,`build` commands changed according to project type.

-   [#3060](https://github.com/refinedev/refine/pull/3060) [`1a53f4c4699`](https://github.com/refinedev/refine/commit/1a53f4c46992b532946e5e5438cf909f446da8e2) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - - Rename command name `generate:resource` to `create-resource`.

    -   Removed the requirement for the `resource name` parameter. Ask for `resource name` and `actions` with `inquirer`.
    -   Add multiple resource create support. (`refine create-resource post category user`)

-   [#3056](https://github.com/refinedev/refine/pull/3056) [`29417155780`](https://github.com/refinedev/refine/commit/294171557809ffa46d298b8aeeaa64392316aeee) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Fixed `refine check-updates` showing packages when current version ahead of next

## 1.1.1

### Patch Changes

-   [#3049](https://github.com/refinedev/refine/pull/3049) [`da4d6320580`](https://github.com/refinedev/refine/commit/da4d63205801824ece5a8ee5ba0c936d32496b90) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - - Fix `create-refine-app` argument error.
    -   Add bin params on `refine-cli` package.json

## 1.1.0

### Minor Changes

-   [#3028](https://github.com/refinedev/refine/pull/3028) [`2af26e9b91b`](https://github.com/refinedev/refine/commit/2af26e9b91bed8a8b5e5a6792deed398270cf7f5) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Initial release for `@pankod/refine-cli` and `refine-create-app` 🎉
