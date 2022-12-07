# @pankod/refine-sdk

## 0.8.0

### Minor Changes

-   [#3149](https://github.com/refinedev/refine/pull/3149) [`15d3fd535a2`](https://github.com/refinedev/refine/commit/15d3fd535a2f2ec18e984ee20c9064e35ce3f8b8) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Update compiler option on target `es6` for `@pankod/refine-sdk`.

## 0.7.0

### Minor Changes

-   [#3149](https://github.com/refinedev/refine/pull/3149) [`15d3fd535a2`](https://github.com/refinedev/refine/commit/15d3fd535a2f2ec18e984ee20c9064e35ce3f8b8) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Update compiler option on target `es6` for `@pankod/refine-sdk`.

## 0.6.0

### Minor Changes

-   Add storage support

## 0.5.0

### Minor Changes

-   [#2522](https://github.com/refinedev/refine/pull/2522) [`e0dce4dda7`](https://github.com/refinedev/refine/commit/e0dce4dda7ec2a2fa5a8619cb2747e68865b76ec) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Add storage support

## 0.4.0

### Minor Changes

-   Update type declaration generation with `tsc` instead of `tsup` for better navigation throughout projects source code.

## 0.3.0

### Minor Changes

-   [#2440](https://github.com/refinedev/refine/pull/2440) [`0150dcd070`](https://github.com/refinedev/refine/commit/0150dcd0700253f1c4908e7e5f2e178bb122e9af) Thanks [@aliemir](https://github.com/aliemir)! - Update type declaration generation with `tsc` instead of `tsup` for better navigation throughout projects source code.

## 0.2.0

### Minor Changes

-   Add React@18 support 🚀

## 0.1.0

### Minor Changes

-   [#1718](https://github.com/refinedev/refine/pull/1718) [`b38620d842`](https://github.com/refinedev/refine/commit/b38620d84237e13212811daada7b49ee654c70eb) Thanks [@omeraplak](https://github.com/omeraplak)! - Add React@18 support 🚀

## 0.0.25

### Patch Changes

-   Updated axios version (0.21.4 to 0.26.1). In this version, the way of sending headers has changed as follows.

    ```
    // old v0.21.4
    axiosInstance.defaults.headers = { Authorization: `Bearer ${data.jwt}` };

    // new v0.26.1
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${data.jwt}`;
    ```

## 0.0.24

### Patch Changes

-   Updated axios version (0.21.4 to 0.26.1). In this version, the way of sending headers has changed as follows.

    ```
    // old v0.21.4
    axiosInstance.defaults.headers = { Authorization: `Bearer ${data.jwt}` };

    // new v0.26.1
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${data.jwt}`;
    ```

## 0.0.23

### Patch Changes

-   Updated axios version (0.21.4 to 0.26.1). In this version, the way of sending headers has changed as follows.

    ```
    // old v0.21.4
    axiosInstance.defaults.headers = { Authorization: `Bearer ${data.jwt}` };

    // new v0.26.1
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${data.jwt}`;
    ```

## 0.0.22

### Patch Changes

-   [#1899](https://github.com/refinedev/refine/pull/1899) [`fbfea418a0`](https://github.com/refinedev/refine/commit/fbfea418a024a527a2b432c634f46a96d4f70d88) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Updated axios version (0.21.4 to 0.26.1). In this version, the way of sending headers has changed as follows.

    ```
    // old v0.21.4
    axiosInstance.defaults.headers = { Authorization: `Bearer ${data.jwt}` };

    // new v0.26.1
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${data.jwt}`;
    ```
