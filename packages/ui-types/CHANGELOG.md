# @pankod/refine-ui-types

## 0.11.5

### Patch Changes

-   [#2786](https://github.com/pankod/refine/pull/2786) [`19124711a7`](https://github.com/pankod/refine/commit/19124711a7dc23c0b0e61bc845fbd294927999da) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Added descriptions to ui-types

-   Updated dependencies [[`addff64c77`](https://github.com/pankod/refine/commit/addff64c777e4c9f044a1a109cb05453e6e9f762)]:
    -   @pankod/refine-core@3.85.0

## 0.11.4

### Patch Changes

-   Added tsdoc comments to crud component interfaces.

## 0.11.3

### Patch Changes

-   [#2718](https://github.com/pankod/refine/pull/2718) [`d78d2a2a99`](https://github.com/pankod/refine/commit/d78d2a2a99adb508094069cda23deaba55c25b63) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Added tsdoc comments to crud component interfaces.

## 0.11.2

### Patch Changes

-   Removed redundant type inheritance and type casting

-   Updated dependencies []:
    -   @pankod/refine-core@3.74.2

## 0.11.1

### Patch Changes

-   [#2586](https://github.com/pankod/refine/pull/2586) [`d7c8b7642b`](https://github.com/pankod/refine/commit/d7c8b7642b7ed41a2063798e779c3cfaa09b0e7b) Thanks [@necatiozmen](https://github.com/necatiozmen)! - Removed redundant type inheritance and type casting

-   Updated dependencies [[`d7c8b7642b`](https://github.com/pankod/refine/commit/d7c8b7642b7ed41a2063798e779c3cfaa09b0e7b)]:
    -   @pankod/refine-core@3.74.1

## 0.11.0

### Minor Changes

-   Add `providers` support on AuthPage register page.

## 0.10.0

### Minor Changes

-   [#2551](https://github.com/pankod/refine/pull/2551) [`a65525de6f`](https://github.com/pankod/refine/commit/a65525de6f995babfca1058e933cdbea67d6032e) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Add `providers` support on AuthPage register page.

## 0.9.2

### Patch Changes

-   Removed unused `updatePasswordLink` and `onSubmit` props from auth pages.

    Renamed `RefineResetPasswordFormTypes` to `RefineForgotPasswordFormTypes`.

    Renamed `resetPasswordLink` to `forgotPasswordLink`.

-   Updated dependencies []:
    -   @pankod/refine-core@3.71.0

## 0.9.1

### Patch Changes

-   [#2524](https://github.com/pankod/refine/pull/2524) [`27bf81bebb`](https://github.com/pankod/refine/commit/27bf81bebb217d2944e20e79a8f7618eda0e9db7) Thanks [@biskuvit](https://github.com/biskuvit)! - Removed unused `updatePasswordLink` and `onSubmit` props from auth pages.

    Renamed `RefineResetPasswordFormTypes` to `RefineForgotPasswordFormTypes`.

    Renamed `resetPasswordLink` to `forgotPasswordLink`.

-   Updated dependencies [[`27bf81bebb`](https://github.com/pankod/refine/commit/27bf81bebb217d2944e20e79a8f7618eda0e9db7)]:
    -   @pankod/refine-core@3.70.0

## 0.9.0

### Minor Changes

-   Added `formProps` property to `RefineAuthPageProps`, `RefineForgotPasswordPageProps`, `RefineRegisterPageProps`, and `RefineUpdatePasswordPageProps`

## 0.8.0

### Minor Changes

-   [#2516](https://github.com/pankod/refine/pull/2516) [`ad99916d6d`](https://github.com/pankod/refine/commit/ad99916d6dbd181b857fd7df7b9619d8cac5e3e0) Thanks [@omeraplak](https://github.com/omeraplak)! - Added `formProps` property to `RefineAuthPageProps`, `RefineForgotPasswordPageProps`, `RefineRegisterPageProps`, and `RefineUpdatePasswordPageProps`

## 0.7.0

### Minor Changes

-   Updated `Sider` types for `render` props.

### Patch Changes

-   Updated `render` method type with `collapsed` prop in `RefineLayoutSiderProps`.

-   Added new types for `<AuthPage>`. You can see following new types:

    **`RefineAuthPageProps`**

    ```tsx
    export type RefineAuthPageProps<
        TWrapperProps extends {} = Record<keyof any, unknown>,
        TContentProps extends {} = Record<keyof any, unknown>,
    > = (
        | PropsWithChildren<{
              type?: "login";
              providers?: IProvider[];
              registerLink?: React.ReactNode;
              forgotPasswordLink?: React.ReactNode;
              rememberMe?: React.ReactNode;
              onSubmit?: (formValues: RefineLoginFormTypes) => void;
          }>
        | PropsWithChildren<{
              type: "register";
              loginLink?: React.ReactNode;
              updatePasswordLink?: React.ReactNode;
              onSubmit?: (formValues: RefineRegisterFormTypes) => void;
          }>
        | PropsWithChildren<{
              type: "forgotPassword";
              loginLink?: React.ReactNode;
              onSubmit?: (formValues: RefineForgotPasswordFormTypes) => void;
          }>
        | PropsWithChildren<{
              type: "updatePassword";
              onSubmit?: (formValues: RefineUpdatePasswordFormTypes) => void;
          }>
    ) & {
        wrapperProps?: TWrapperProps;
        contentProps?: TContentProps;
        renderContent?: (content: React.ReactNode) => React.ReactNode;
    };
    ```

-   Updated dependencies []:
    -   @pankod/refine-core@3.69.9

## 0.6.2

### Patch Changes

-   [#2447](https://github.com/pankod/refine/pull/2447) [`628a37a675`](https://github.com/pankod/refine/commit/628a37a6753a778cbec5c29b698981e0157caa42) Thanks [@biskuvit](https://github.com/biskuvit)! - Added new types for `<AuthPage>`. You can see following new types:

    **`RefineAuthPageProps`**

    ```tsx
    export type RefineAuthPageProps<
        TWrapperProps extends {} = Record<keyof any, unknown>,
        TContentProps extends {} = Record<keyof any, unknown>,
    > = (
        | PropsWithChildren<{
              type?: "login";
              providers?: IProvider[];
              registerLink?: React.ReactNode;
              forgotPasswordLink?: React.ReactNode;
              rememberMe?: React.ReactNode;
              onSubmit?: (formValues: RefineLoginFormTypes) => void;
          }>
        | PropsWithChildren<{
              type: "register";
              loginLink?: React.ReactNode;
              updatePasswordLink?: React.ReactNode;
              onSubmit?: (formValues: RefineRegisterFormTypes) => void;
          }>
        | PropsWithChildren<{
              type: "forgotPassword";
              loginLink?: React.ReactNode;
              onSubmit?: (formValues: RefineForgotPasswordFormTypes) => void;
          }>
        | PropsWithChildren<{
              type: "updatePassword";
              onSubmit?: (formValues: RefineUpdatePasswordFormTypes) => void;
          }>
    ) & {
        wrapperProps?: TWrapperProps;
        contentProps?: TContentProps;
        renderContent?: (content: React.ReactNode) => React.ReactNode;
    };
    ```

-   Updated dependencies [[`628a37a675`](https://github.com/pankod/refine/commit/628a37a6753a778cbec5c29b698981e0157caa42)]:
    -   @pankod/refine-core@3.69.7

## 0.6.1

### Patch Changes

-   [#2492](https://github.com/pankod/refine/pull/2492) [`7d5bf3023d`](https://github.com/pankod/refine/commit/7d5bf3023d00617890ffa7f9d22b1116af15e0b9) Thanks [@ozkalai](https://github.com/ozkalai)! - Updated `render` method type with `collapsed` prop in `RefineLayoutSiderProps`.

## 0.6.0

### Minor Changes

-   [#2454](https://github.com/pankod/refine/pull/2454) [`72487a4126`](https://github.com/pankod/refine/commit/72487a4126fb7d827dccd3bcbdee9a83aa1f56af) Thanks [@ozkalai](https://github.com/ozkalai)! - Updated `Sider` types for `render` props.

## 0.5.0

### Minor Changes

-   Update type declaration generation with `tsc` instead of `tsup` for better navigation throughout projects source code.

### Patch Changes

-   Update `TestWrapper` props with `children` prop type.

-   Updated dependencies []:
    -   @pankod/refine-core@3.67.0

## 0.4.0

### Minor Changes

-   [#2440](https://github.com/pankod/refine/pull/2440) [`0150dcd070`](https://github.com/pankod/refine/commit/0150dcd0700253f1c4908e7e5f2e178bb122e9af) Thanks [@aliemir](https://github.com/aliemir)! - Update type declaration generation with `tsc` instead of `tsup` for better navigation throughout projects source code.

### Patch Changes

-   [#2440](https://github.com/pankod/refine/pull/2440) [`0150dcd070`](https://github.com/pankod/refine/commit/0150dcd0700253f1c4908e7e5f2e178bb122e9af) Thanks [@aliemir](https://github.com/aliemir)! - Update `TestWrapper` props with `children` prop type.

-   Updated dependencies [[`0150dcd070`](https://github.com/pankod/refine/commit/0150dcd0700253f1c4908e7e5f2e178bb122e9af), [`f2faf99f25`](https://github.com/pankod/refine/commit/f2faf99f25542f73215ee89c74b241311177b327), [`0150dcd070`](https://github.com/pankod/refine/commit/0150dcd0700253f1c4908e7e5f2e178bb122e9af), [`2c428b3105`](https://github.com/pankod/refine/commit/2c428b31057e3e7c8901fc3da2773bc810235491)]:
    -   @pankod/refine-core@3.66.0

## 0.3.0

### Minor Changes

-   Added unified types for common UI components and their props to simplify the process of adding a new UI framework and also to keep existing ui frameworks easy to maintain.

### Patch Changes

-   Updated dependencies []:
    -   @pankod/refine-core@3.56.2

## 0.2.0

### Minor Changes

-   [#2216](https://github.com/pankod/refine/pull/2216) [`201846c77d`](https://github.com/pankod/refine/commit/201846c77dba07a61f0c0335716b60641430c22a) Thanks [@aliemir](https://github.com/aliemir)! - Added unified types for common UI components and their props to simplify the process of adding a new UI framework and also to keep existing ui frameworks easy to maintain.
