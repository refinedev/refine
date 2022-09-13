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
