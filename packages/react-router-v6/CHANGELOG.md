# @pankod/refine-react-router-v6

## 3.27.0

### Minor Changes

-   All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

    Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

### Patch Changes

-   Fix adding the current path to the `to` parameter when redirecting to the login page after `logout` - #2211

## 3.26.0

### Minor Changes

-   [#2217](https://github.com/pankod/refine/pull/2217) [`b4aae00f77`](https://github.com/pankod/refine/commit/b4aae00f77a2476d847994db21298ae25e4cf6e5) Thanks [@omeraplak](https://github.com/omeraplak)! - All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

    Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

## 3.25.3

### Patch Changes

-   [#2214](https://github.com/pankod/refine/pull/2214) [`91db05caf7`](https://github.com/pankod/refine/commit/91db05caf796025d2ad4f64221541cc1fc5f9c5d) Thanks [@omeraplak](https://github.com/omeraplak)! - Fix adding the current path to the `to` parameter when redirecting to the login page after `logout` - #2211

## 3.25.2

### Patch Changes

-   Fixed a bug that caused `<ErrorComponent/>` to does not appear in the `404` state

## 3.25.1

### Patch Changes

-   [#1918](https://github.com/pankod/refine/pull/1918) [`b8a4093fda`](https://github.com/pankod/refine/commit/b8a4093fdabab3d1ff821182ee5b96e2c74a9ecd) Thanks [@biskuvit](https://github.com/biskuvit)! - Fixed a bug that caused `<ErrorComponent/>` to does not appear in the `404` state

## 3.22.2

### Patch Changes

-   Updated dependencies [[`2deb19babf`](https://github.com/pankod/refine/commit/2deb19babfc6db5b00b111ec29aa5ece4c371bbc)]:
    -   @pankod/refine-core@3.23.2
