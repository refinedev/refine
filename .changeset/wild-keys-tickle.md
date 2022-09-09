---
"@pankod/refine-ui-types": patch
---

Added new types for `<AuthPage>`. You can see following new types:

-   `RefineAuthPageProps`

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
      }>
    | PropsWithChildren<{
          type: "register";
          loginLink?: React.ReactNode;
          updatePasswordLink?: React.ReactNode;
      }>
    | PropsWithChildren<{
          type: "resetPassword";
          loginLink?: React.ReactNode;
      }>
    | PropsWithChildren<{
          type: "updatePassword";
      }>
) & {
    submitButton?: React.ReactNode;
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
        submitButton?: React.ReactNode;
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
        submitButton?: React.ReactNode;
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
        submitButton?: React.ReactNode;
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
        submitButton?: React.ReactNode;
        wrapperProps?: TWrapperProps;
        renderContent?: (content: React.ReactNode) => React.ReactNode;
        contentProps?: TContentProps;
    }>;
    ```
