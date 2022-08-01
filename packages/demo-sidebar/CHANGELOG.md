# @pankod/refine-demo-sidebar

## 3.29.0

### Minor Changes

-   Add React@18 support 🚀

## 3.28.0

### Minor Changes

-   [#1718](https://github.com/pankod/refine/pull/1718) [`b38620d842`](https://github.com/pankod/refine/commit/b38620d84237e13212811daada7b49ee654c70eb) Thanks [@omeraplak](https://github.com/omeraplak)! - Add React@18 support 🚀

## 3.27.0

### Minor Changes

-   All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

    Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

## 3.26.0

### Minor Changes

-   [#2217](https://github.com/pankod/refine/pull/2217) [`b4aae00f77`](https://github.com/pankod/refine/commit/b4aae00f77a2476d847994db21298ae25e4cf6e5) Thanks [@omeraplak](https://github.com/omeraplak)! - All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

    Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

## 3.25.2

### Patch Changes

-   Fixed `react-dom` dependency version

    ```diff
    - "react-dom": "^17.0.4"
    + "react-dom": "^17.0.0 || ^18.0.0"
    ```

## 3.25.1

### Patch Changes

-   [#2178](https://github.com/pankod/refine/pull/2178) [`7a8e74a0af`](https://github.com/pankod/refine/commit/7a8e74a0afcd6c6d87630f4a5f5102808e4354e9) Thanks [@biskuvit](https://github.com/biskuvit)! - Fixed `react-dom` dependency version

    ```diff
    - "react-dom": "^17.0.4"
    + "react-dom": "^17.0.0 || ^18.0.0"
    ```

## 3.22.2

### Patch Changes

-   Updated dependencies [[`2deb19babf`](https://github.com/pankod/refine/commit/2deb19babfc6db5b00b111ec29aa5ece4c371bbc)]:
    -   @pankod/refine-antd@3.23.2
    -   @pankod/refine-core@3.23.2
