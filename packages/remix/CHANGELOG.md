# @pankod/refine-remix-router

## 1.2.3

### Patch Changes

-   Fixed default login page is `<LoginPage>`.

*   🎉 Added `AuthPage` component to the `refine` app. This page is used to login, register, reset password and update password. Login page is default page and old `LoginPage` component is deprecated.

    # New Auth Hooks

    📌 Added `useRegister` hook. This hook is used to register new user. `useRegister` falls into register function of [`AuthProvider`](https://refine.dev/docs/core/providers/auth-provider/).

    📌 Added `useResetPassword` hook. This hook is used to reset password. `useResetPassword` falls into `resetPassword` function of [`AuthProvider`](https://refine.dev/docs/core/providers/auth-provider/).

    📌 Added `useUpdatePassword` hook. This hook is used to update password. `useUpdatePassword` falls into `updatePassword` function of [`AuthProvider`](https://refine.dev/docs/core/providers/auth-provider/).

    ```diff
    - <LoginPage>
    + <AuthPage>
    ```

    # New `AuthPage` props:

    ```info
    interface IAuthPageProps extends IAuthCommonProps {
        type?: "login" | "register" | "resetPassword" | "updatePassword";
    }

    interface IAuthCommonProps {
        submitButton?: React.ReactNode;
        registerLink?: React.ReactNode;
        loginLink?: React.ReactNode;
        resetPasswordLink?: React.ReactNode;
        updatePasswordLink?: React.ReactNode;
        backLink?: React.ReactNode;
        providers?: IProvider[];
    }

    interface IProvider {
        name: string;
        icon?: React.ReactNode;
        label?: string;
    }
    ```

## 1.2.2

### Patch Changes

-   [#2415](https://github.com/pankod/refine/pull/2415) [`f7c98f0ef9`](https://github.com/pankod/refine/commit/f7c98f0ef9743fbee2cc44206548cf2da3ceb01c) Thanks [@biskuvit](https://github.com/biskuvit)! - Fixed default login page is `<LoginPage>`.

## 1.2.1

### Patch Changes

-   [#2299](https://github.com/pankod/refine/pull/2299) [`a02cb9e8ef`](https://github.com/pankod/refine/commit/a02cb9e8ef20f14194d772720442208930e3aa40) Thanks [@biskuvit](https://github.com/biskuvit)! - 🎉 Added `AuthPage` to the `refine` app. This page is used to login, register, reset password and update password. Login page is default page and old `LoginPage` component is deprecated.

    # New Auth Hooks

    📌 Added `useRegister` hook. This hook is used to register new user. `useRegister` falls into register function of [`AuthProvider`](https://refine.dev/docs/core/providers/auth-provider/).

    📌 Added `useResetPassword` hook. This hook is used to reset password. `useResetPassword` falls into `resetPassword` function of [`AuthProvider`](https://refine.dev/docs/core/providers/auth-provider/).

    📌 Added `useUpdatePassword` hook. This hook is used to update password. `useUpdatePassword` falls into `updatePassword` function of [`AuthProvider`](https://refine.dev/docs/core/providers/auth-provider/).

    ```diff
    - <LoginPage>
    + <AuthPage>
    ```

    # New `AuthPage` props:

    ```info
    interface IAuthPageProps extends IAuthCommonProps {
        type?: "login" | "register" | "resetPassword" | "updatePassword";
    }

    interface IAuthCommonProps {
        registerLink?: React.ReactNode;
        loginLink?: React.ReactNode;
        resetPasswordLink?: React.ReactNode;
        updatePasswordLink?: React.ReactNode;
        backLink?: React.ReactNode;
        providers?: IProvider[];
    }

    interface IProvider {
        name: string;
        icon?: React.ReactNode;
        label?: string;
    }
    ```

    # Add `AuthPage` as a default page to Routers

    📌 Added `AuthPage` to the `refine-nextjs-router`. Default page is `AuthPage`.

    📌 Added `AuthPage` to the `refine-react-location`. Default page is `AuthPage`.

    📌 Added `AuthPage` to the `refine-react-router-v6`. Default page is `AuthPage`.

    📌 Added `AuthPage` to the `refine-remix-router`. Default page is `AuthPage`.

## 1.2.0

### Minor Changes

-   Add `checkAuthentication` to handle authentication processes more easily

## 1.1.0

### Minor Changes

-   [#2323](https://github.com/pankod/refine/pull/2323) [`c4157066bd`](https://github.com/pankod/refine/commit/c4157066bd18c93af13d12b45c0e2619766361d1) Thanks [@omeraplak](https://github.com/omeraplak)! - Add `checkAuthentication` to handle authentication processes more easily

## 1.0.2

### Patch Changes

-   Our Story with Remix begins 👊

## 1.0.1

### Patch Changes

-   [#2305](https://github.com/pankod/refine/pull/2305) [`db0157671d`](https://github.com/pankod/refine/commit/db0157671d978fb80b1f01989b1e1ee01ec5c974) Thanks [@omeraplak](https://github.com/omeraplak)! - Our Story with Remix begins 👊
