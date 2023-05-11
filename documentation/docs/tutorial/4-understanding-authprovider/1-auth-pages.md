---
id: auth-pages
title: 5.2. Auth Pages
tutorial:
    prev: tutorial/understanding-authprovider/index
    next: false
---

This post examines how auth related actions are implemented in **refine** with the `<Authpage />` component. We examine `<AuthPage />` variants for `login`, `register` and `forgotPassword` methods of the auth provider object.

## Auth Pages in refine

**refine** provides a robust set of auth pages with `<AuthPage />` components provided by the supplementary UI packages such as **Material UI**, **Ant Design**, **Mantine**, etc.

The `<AuthPage />` component we have in use in our React admin panel app is provided by `@refinedev/mui`, which is **refine**'s support package for **Material UI**. It comes with all required variations for login, register, forgot password pages that basically implement their respctive `authProvider` methods. The component used is the same `<AuthPage />` component, but the UI and actions are characterized by the `type` prop passed to the component.

For example, the `<AuthPage type="login" >` implements `useLogin()` hook and shows only the login fields in the form.

[Refer to the `<AuthPage />` documentation for more information &#8594](/docs/api-reference/mui/components/mui-auth-page/)


### Login Page with `<AuthPage type="login" />`

The login page is used to authenticate users. Logging in a user is carried out by the auth provider's `login` method, which is accessible via the `useLogin()` hook.

Our **Blog** based React admin panel app initialized by **refine.new** with **Custom Auth** option implements user login in the `<Login />` component with the `<AuthPage type="login" />` component. The `<Login />` component looks like this:

```tsx title="src/pages/login/index.tsx"

import { AuthPage, ThemedTitleV2 } from "@refinedev/mui";
import { AppIcon } from "../../components/app-icon";

export const Login = () => {
  return (
    <AuthPage
      type="login"
      title={
        <ThemedTitleV2
          collapsed={false}
          text="refine Project"
          icon={<AppIcon />}
        />
      }
      formProps={{
        defaultValues: { email: "demo@refine.dev", password: "demodemo" },
      }}
    />
  );
};
```

This is a simple login page that allows an email / password login. The `<AuthPage type="login" />` component provides all the form fields, UI features and login functionality for a user to login. The corresponding UI for the above `<Login />` looks like this:

![login-page](https://imgbox.com/wAtDTupL)

The `<AuthPage type="login" />` internally implements the `useLogin()` hook to access and invoke the `authProvider.login` method to sign a user in.

[Refer to the login section in the `<AuthPage />` documentation for more information &#8594](https://refine.dev/docs/api-reference/mui/components/mui-auth-page/#login)


### Signup Page with `<AuthPage type="register" />`

The signup / register page is used to register a user to our React admin panel app. Registering a user is carried out by the `authProvider.register` method, which is accessible via the `useRegister()` hook.

Our app implements user registration in the `<Register />` component with the `<AuthPage type="register" />` component. The `<Register />` component looks like this:

```tsx title="src/pages/register/index.tsx"

import { AuthPage, ThemedTitleV2 } from "@refinedev/mui";
import { AppIcon } from "../../components/app-icon";

export const Register = () => {
  return (
    <AuthPage
      type="register"
      title={
        <ThemedTitleV2
          collapsed={false}
          text="refine Project"
          icon={<AppIcon />}
        />
      }
    />
  );
};
```

This is a simple user sign up page that allows users to sign up with an email and password. The `<AuthPage type="register" />` component provides necessary form fields, UI features and sign up functionality to register a user with our app. The corresponding UI for the above `<Register />` component looks like this:

![signup-page](https://imgbox.com/zMfFaz73)

The `<AuthPage type="register" />` uses the `useRegister()` hook to access and invoke the `authProvider.register` method to sign a user up.

[Refer to the Register section in the `<AuthPage />` documentation for more information &#8594](https://refine.dev/docs/api-reference/mui/components/mui-auth-page/#register)


### Password Resetting with `<AuthPage type="forgotPassword" />`

The forgot password page is used to reset a password. Password resetting is carried out by the `authProvider.forgotPassword` method, which is accessible via the `useForgotPassword()` hook.

Our app implements resetting password in the `<ForgotPassword />` component with the `<AuthPage type="forgotPassword" />` variant. The `<ForgotPassword />` component looks like this:

```tsx title="src/pages/forgotPassword/index.tsx"

import { AuthPage, ThemedTitleV2 } from "@refinedev/mui";
import { AppIcon } from "../../components/app-icon";

export const ForgotPassword = () => {
  return (
    <AuthPage
      type="forgotPassword"
      title={
        <ThemedTitleV2
          collapsed={false}
          text="refine Project"
          icon={<AppIcon />}
        />
      }
    />
  );
};
```

This is a simple password reset page that allows users to renew their password with their email. The `<AuthPage type="forgotPassword" />` component provides necessary form fields, UI features and reset logic for renewing a user's password. The corresponding UI for the above `<ForgotPassword />` component looks like this:

![forgot-password-page](https://imgbox.com/vaw5Hjws)

The `<AuthPage type="forgotPassword" />` uses the `useForgotPassword()` hook to access and invoke the `authProvider.forgotPassword` method to set a new password.

[Refer to the forgot password section in the `<AuthPage />` documentation for more information &#8594](https://refine.dev/docs/api-reference/mui/components/mui-auth-page/#forgotpassword)

<Checklist>
<ChecklistItem id="auth-provider-auth-pages">
I understand how to implement login using {`<AuthPage type="login" />`} variant.
</ChecklistItem>
<ChecklistItem id="auth-provider-auth-pages-1">
I undersanod how to implement user sign up using {`<AuthPage type="register" />`} variant.
</ChecklistItem><ChecklistItem id="auth-provider-auth-pages-2">
I understand how to implement password reset using {`<AuthPage type="forgotPassword" />`} variant.
</ChecklistItem>
<ChecklistItem id="auth-provider-auth-pages-3">
I understand how {`<AuthPage />`} variants work.
</ChecklistItem>
</Checklist>
