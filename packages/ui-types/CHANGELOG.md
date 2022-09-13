# @pankod/refine-ui-types

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
              resetPasswordLink?: React.ReactNode;
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
              type: "resetPassword";
              loginLink?: React.ReactNode;
              onSubmit?: (formValues: RefineResetPasswordFormTypes) => void;
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
