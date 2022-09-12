---
"@pankod/refine-ui-types": patch
---

Added new types for `<AuthPage>`. You can see following new types:

-   `RefineAuthPageProps`

```tsx
export type IProvider = {
    name: string;
    icon?: React.ReactNode;
    label?: string;
};

export interface LoginFormTypes {
    email?: string;
    password?: string;
    remember?: boolean;
    providerName?: string;
}

export interface RegisterFormTypes {
    email?: string;
    password?: string;
}

export interface ResetPasswordFormTypes {
    email: string;
}

export interface UpdatePasswordFormTypes {
    password?: string;
    confirmPassword?: string;
}

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
          onSubmit?: (formValues: LoginFormTypes) => void;
      }>
    | PropsWithChildren<{
          type: "register";
          loginLink?: React.ReactNode;
          updatePasswordLink?: React.ReactNode;
          onSubmit?: (formValues: RegisterFormTypes) => void;
      }>
    | PropsWithChildren<{
          type: "resetPassword";
          loginLink?: React.ReactNode;
          onSubmit?: (formValues: ResetPasswordFormTypes) => void;
      }>
    | PropsWithChildren<{
          type: "updatePassword";
          onSubmit?: (formValues: UpdatePasswordFormTypes) => void;
      }>
) & {
    wrapperProps?: TWrapperProps;
    contentProps?: TContentProps;
    renderContent?: (content: React.ReactNode) => React.ReactNode;
};

type IProvider = {
    name: string;
    icon?: React.ReactNode;
    label?: string;
};
```

-   `RefineLoginPageProps`

    ```tsx
    export type RefineLoginPageProps<
        TWrapperProps extends {} = Record<keyof any, unknown>,
        TContentProps extends {} = Record<keyof any, unknown>,
    > = PropsWithChildren<{
        providers?: IProvider[];
        onSubmit?: (formValues: LoginFormTypes) => void;
        registerLink?: React.ReactNode;
        resetPasswordLink?: React.ReactNode;
        rememberMe?: React.ReactNode;
        wrapperProps?: TWrapperProps;
        renderContent?: (content: React.ReactNode) => React.ReactNode;
        contentProps?: TContentProps;
    }>;
    ```

-   `RefineRegisterPageProps`

    ```tsx
    export type RefineRegisterPageProps<
        TWrapperProps extends {} = Record<keyof any, unknown>,
        TContentProps extends {} = Record<keyof any, unknown>,
    > = PropsWithChildren<{
        onSubmit?: (formValues: RegisterFormTypes) => void;
        loginLink?: React.ReactNode;
        wrapperProps?: TWrapperProps;
        renderContent?: (content: React.ReactNode) => React.ReactNode;
        contentProps?: TContentProps;
    }>;
    ```

-   `RefineResetPasswordPageProps`

    ```tsx
    export type RefineResetPasswordPageProps<
        TWrapperProps extends {} = Record<keyof any, unknown>,
        TContentProps extends {} = Record<keyof any, unknown>,
    > = PropsWithChildren<{
        onSubmit?: (formValues: ResetPasswordFormTypes) => void;
        loginLink?: React.ReactNode;
        wrapperProps?: TWrapperProps;
        renderContent?: (content: React.ReactNode) => React.ReactNode;
        contentProps?: TContentProps;
    }>;
    ```

-   `RefineUpdatePasswordPageProps`

    ```tsx
    export type RefineUpdatePasswordPageProps<
        TWrapperProps extends {} = Record<keyof any, unknown>,
        TContentProps extends {} = Record<keyof any, unknown>,
    > = PropsWithChildren<{
        onSubmit?: (formValues: UpdatePasswordFormTypes) => void;
        wrapperProps?: TWrapperProps;
        renderContent?: (content: React.ReactNode) => React.ReactNode;
        contentProps?: TContentProps;
    }>;
    ```
