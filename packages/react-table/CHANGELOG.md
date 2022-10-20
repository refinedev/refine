# @pankod/refine-react-table

## 4.9.0

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

## 4.8.0

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

## 4.7.8

### Patch Changes

-   Fix `@tanstack/react-table` exports

-   Removed the old version of `react-table` dependency.

## 4.7.7

### Patch Changes

-   [#2746](https://github.com/refinedev/refine/pull/2746) [`f19369d911`](https://github.com/refinedev/refine/commit/f19369d91166cb00b2c042034fb856bb0ba0a8d7) Thanks [@omeraplak](https://github.com/omeraplak)! - Fix `@tanstack/react-table` exports

-   [#2740](https://github.com/refinedev/refine/pull/2740) [`8a4a96ac6a`](https://github.com/refinedev/refine/commit/8a4a96ac6acb8d497f78fdd6af5a0ff5b71b6429) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Removed the old version of `react-table` dependency.

## 4.7.6

### Patch Changes

-   Update `@tanstack/react-table` exports

-   Fixed type exports for `UseTableProps` and `UseTableReturnType`.

-   Update `@pankod/refine-react-table` exports

## 4.7.5

### Patch Changes

-   [#2648](https://github.com/refinedev/refine/pull/2648) [`61db8c3800`](https://github.com/refinedev/refine/commit/61db8c3800d7ab5c7b8b301457f7e55266246f17) Thanks [@omeraplak](https://github.com/omeraplak)! - Update `@pankod/refine-react-table` exports

## 4.7.4

### Patch Changes

-   [#2648](https://github.com/refinedev/refine/pull/2648) [`61db8c3800`](https://github.com/refinedev/refine/commit/61db8c3800d7ab5c7b8b301457f7e55266246f17) Thanks [@omeraplak](https://github.com/omeraplak)! - Update `@tanstack/react-table` exports

## 4.7.3

### Patch Changes

-   [#2645](https://github.com/refinedev/refine/pull/2645) [`430c7a3d56`](https://github.com/refinedev/refine/commit/430c7a3d565e7fe9aab981625e7e18f7a1584f75) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed type exports for `UseTableProps` and `UseTableReturnType`.

## 4.7.2

### Patch Changes

-   Fixed version of react-router to `6.3.0`

## 4.7.1

### Patch Changes

-   [#2501](https://github.com/refinedev/refine/pull/2501) [`4095a578d4`](https://github.com/refinedev/refine/commit/4095a578d471254ee58412f130ac5a0f3a62880f) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed version of react-router to `6.3.0`

## 4.7.0

### Minor Changes

-   Update type declaration generation with `tsc` instead of `tsup` for better navigation throughout projects source code.

## 4.6.0

### Minor Changes

-   [#2440](https://github.com/refinedev/refine/pull/2440) [`0150dcd070`](https://github.com/refinedev/refine/commit/0150dcd0700253f1c4908e7e5f2e178bb122e9af) Thanks [@aliemir](https://github.com/aliemir)! - Update type declaration generation with `tsc` instead of `tsup` for better navigation throughout projects source code.

## 4.5.0

### Minor Changes

-   Add React@18 support 🚀

## 4.4.0

### Minor Changes

-   [#1718](https://github.com/refinedev/refine/pull/1718) [`b38620d842`](https://github.com/refinedev/refine/commit/b38620d84237e13212811daada7b49ee654c70eb) Thanks [@omeraplak](https://github.com/omeraplak)! - Add React@18 support 🚀

## 4.3.0

### Minor Changes

-   All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

    Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

## 4.2.0

### Minor Changes

-   [#2217](https://github.com/refinedev/refine/pull/2217) [`b4aae00f77`](https://github.com/refinedev/refine/commit/b4aae00f77a2476d847994db21298ae25e4cf6e5) Thanks [@omeraplak](https://github.com/omeraplak)! - All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

    Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

## 4.1.0

### Minor Changes

-   Upgrade the package accordingly to Tanstack Table v8.

## 4.0.0

### Major Changes

-   [#2160](https://github.com/refinedev/refine/pull/2160) [`d9cac36454`](https://github.com/refinedev/refine/commit/d9cac3645426e92d7579b18f18f39e911f6c41a5) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Upgrade the package accordingly to Tanstack Table v8.

## 3.27.0

### Minor Changes

-   Add `hasPagination` property to `useTable` hook to enable/disable pagination.

    **Implementation**

    Updated the `useTable` hook accordingly to the changes in the `useTable` of `@pankod/refine-core`. `hasPagination` property is being send directly to the `useTable` of `@pankod/refine-core` to disable pagination.

    **Use Cases**

    In some data providers, some of the resources might not support pagination which was not supported prior to these changes. To handle the pagination on the client-side or to disable completely, users can set `hasPagination` to `false`.

### Patch Changes

-   Updated dependencies []:
    -   @pankod/refine-core@3.36.0

## 3.26.0

### Minor Changes

-   [#2050](https://github.com/refinedev/refine/pull/2050) [`635cfe9fdb`](https://github.com/refinedev/refine/commit/635cfe9fdbfe5940b950ae99c1f0b686c78bb8e5) Thanks [@ozkalai](https://github.com/ozkalai)! - Add `hasPagination` property to `useTable` hook to enable/disable pagination.

    **Implementation**

    Updated the `useTable` hook accordingly to the changes in the `useTable` of `@pankod/refine-core`. `hasPagination` property is being send directly to the `useTable` of `@pankod/refine-core` to disable pagination.

    **Use Cases**

    In some data providers, some of the resources might not support pagination which was not supported prior to these changes. To handle the pagination on the client-side or to disable completely, users can set `hasPagination` to `false`.

### Patch Changes

-   Updated dependencies [[`ecde34a9b3`](https://github.com/refinedev/refine/commit/ecde34a9b38ef5667fa863f9ebb9dcb1cfff1651), [`635cfe9fdb`](https://github.com/refinedev/refine/commit/635cfe9fdbfe5940b950ae99c1f0b686c78bb8e5)]:
    -   @pankod/refine-core@3.35.0

## 3.22.2

### Patch Changes

-   Updated dependencies [[`2deb19babf`](https://github.com/refinedev/refine/commit/2deb19babfc6db5b00b111ec29aa5ece4c371bbc)]:
    -   @pankod/refine-core@3.23.2
