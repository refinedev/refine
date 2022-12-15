# @pankod/refine-cli

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
