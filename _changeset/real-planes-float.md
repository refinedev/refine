---
"@pankod/refine-core": minor
"@pankod/refine-nextjs-router": patch
"@pankod/refine-react-location": patch
"@pankod/refine-react-router-v6": patch
"@pankod/refine-remix-router": patch
---

🎉 Added `AuthPage` component to the `refine` app. This page is used to login, register, reset password and update password. Login page is default page and old `LoginPage` component is deprecated.

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
