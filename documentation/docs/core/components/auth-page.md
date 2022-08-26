---
id: auth-page
title: <AuthPage>
sidebar_label: <AuthPage>
description: <AuthPage> component from refine is a authentication page that can be used to login, register, reset password and update password.
---

`<AuthPage>` component from **refine** is a authentication page that can be used to login, register, reset password and update password.

Before using `<AuthPage>` component you need to add [authProvider](/core/providers/auth-provider.md) that will be used to handle authentication.

:::info

-   `<LoginPage>` is deprecated and use `<AuthPage>` instead.
-   `<AuthPage>` default type is `"login"`.

:::

## Usage

`<AuthPage>` component can be used like this:

```tsx title="pages/auth/register"
import { AuthPage } from "@pankod/refine-core";

const RegisterPage = () => {
    return <AuthPage type="register" />;
};
```

## Properties

### `type`

`type` property defines the type of the authentication page.

It can be one of the following:

-   `"login"` - type of the login page and also default type.
-   `"register"` - type of the registration page.
-   `"resetPassword"` - type of the reset password page.
-   `"updatePassword"` - type of the update password page.

```tsx
<AuthPage type="register" />
```

### `registerLink`

`registerLink` property defines the link to the registration page. It is used when `type` is `"login"`. It render a link to the registration page.

```tsx
<AuthPage type="login" registerLink="/register" />
```

### `resetPasswordLink`

`resetPasswordLink` property defines the link to the reset password page. It is used when `type` is `"login"`. It render a link to the reset password page. Also it is used when `type` is `"resetPassword"`. If `type` is `"resetPassword"` then `resetPasswordLink` uses for rendering link to the reset password button.

```tsx
<AuthPage type="login" resetPasswordLink="/reset-password" />
```

### `updatePasswordLink`

`updatePasswordLink` property defines the render node for the update password link. It is used when `type` is `"updatePassword"`. If `updatePasswordLink` doesn't exist then `<AuthPage>` is rendered `<button>` for submitting update password form.

```tsx
<AuthPage
    type="updatePassword"
    updatePasswordLink={<a href="/update-password">Update password</a>}
/>
```

### `loginLink`

`loginLink` property defines the render node for the login link. It is used when `type` is `"register"`. If `loginLink` doesn't exist then `<AuthPage>` is rendered `<button>` for submitting login form.

```tsx
<AuthPage type="register" loginLink={<a href="/login">Login</a>} />
```

:::tip
You can use your own elements for submit all kind of forms(`login` \| `register` \| `resetPassword` \| `updatePassword`).
For example you can use `<button>`. But you need to handle submit form logic in `onSubmit` callback. You can access `form` from `<AuthPage>` component and use `form` values as you want.

```tsx
<AuthPage
    type="login"
    loginLink={
        <button
            type="submit"
            onClick={(event) => {
                event.preventDefault();
                // you can access form data from `event.target`
                console.log(event.target.form);
            }}
        >
            login
        </button>
    }
/>
```

:::

### `providers`

`providers` property defines the list of providers that will be used to handle social login authentication.

```tsx
<AuthPage
    type="login"
    providers={[
        {
            name: "Google",
            icon: "google-icon",
            color: "red",
        },
        {
            name: "Facebook",
            icon: "facebook",
            color: "blue",
        },
    ]}
/>
```

:::info
If you want to use providers then you need to handle your provider name to use social authentication in `login` method from [authProvider](/core/providers/auth-provider.md) that will be used to handle authentication.
`providerName` is the name of the selected provider from your list of providers.

```tsx
const authProvider: AuthProvider = {
    ...
    login: ({ providerName }) => {
        if (providerName === "Google") {
            return GoogleAuth.login();
        }
        if (providerName === "Facebook") {
            return FacebookAuth.login();
        }
    }
}
```

:::

### `backLink`

`backLink` property defines the render node for the go back link.

```tsx
<AuthPage type="register" backLink={<a href="/login">Login</a>} />
```

## API Reference

### Properties

| Property           | Description                                                                      | Type                                                         |
| ------------------ | -------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| type               | Render `<AuthPage>` forms by `type` property.                                    | `login` \| `register` \| `resetPassword` \| `updatePassword` |
| registerLink       | Custom node that will be rendered as a register link to the `<AuthPage>`.        | `React.ReactNode`                                            |
| loginLink          | Custom node that will be rendered as a link to the `<AuthPage>`.                 | `React.ReactNode`                                            |
| resetPasswordLink  | Custom node that will be rendered as a reset password link to the `<AuthPage>`.  | `React.ReactNode`                                            |
| updatePasswordLink | Custom node that will be rendered as a update password link to the `<AuthPage>`. | `React.ReactNode`                                            |
| backLink           | Custom node that will be displayed as a back link.                               | `React.ReactNode`                                            |
| providers          | Render social logins if `type` is `"login"`.                                     | [`IProvider[]`](#interface)                                  |

### Interface

```tsx
interface IProvider {
    name: string;
    icon?: React.ReactNode;
    label?: string;
}
```
