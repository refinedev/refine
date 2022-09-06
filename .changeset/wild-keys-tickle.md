---
"@pankod/refine-ui-tests": patch
---

Added new types for `<AuthPage>`. You can see following new types:

-   `RefineAuthPageProps`

```tsx
type RefineAuthPageProps = {
    type?: "login" | "register" | "resetPassword" | "updatePassword";
    providers?: IProvider[];
    submitButton?: React.ReactNode;
    registerLink?: React.ReactNode;
    loginLink?: React.ReactNode;
    resetPasswordLink?: React.ReactNode;
    updatePasswordLink?: React.ReactNode;
    remember?: boolean;
};

type IProvider = {
    name: string;
    icon?: React.ReactNode;
    label?: string;
};
```

-   `RefineLoginPageProps`

    ```tsx
    type RefineLoginPageProps = {
        providers?: IProvider[];
        submitButton?: React.ReactNode;
        registerLink?: React.ReactNode;
        resetPasswordLink?: React.ReactNode;
        remember?: boolean;
    };
    ```

-   `RefineRegisterPageProps`

    ```tsx
    type RefineRegisterPageProps = {
        submitButton?: React.ReactNode;
        loginLink?: React.ReactNode;
    };
    ```

-   `RefineResetPasswordPageProps`

    ```tsx
    type RefineResetPasswordPageProps = {
        submitButton?: React.ReactNode;
        loginLink?: React.ReactNode;
    };
    ```

-   `RefineUpdatePasswordPageProps`

    ```tsx
    type RefineUpdatePasswordPageProps = {
        submitButton?: React.ReactNode;
    };
    ```
