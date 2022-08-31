---
id: auth-page
title: <AuthPage>
sidebar_label: <AuthPage>
description: <AuthPage> component from refine is a authentication page that can be used to login, register, reset password and update password.
---

`<AuthPage>` component from **refine** is a authentication page that can be used to login, register, reset password and update password.

Before using `<AuthPage>` component you need to add [authProvider](/core/providers/auth-provider.md) that will be used to handle authentication.

:::info
`<AuthPage>` default type is `"login"`.
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

`registerLink` property defines the link to the registration page.

#### When `type` is `"login"`

`registerLink` property defines the link to the registration page. It render a link to the registration page.

#### When `type` is `"register"`

`registerLink` render a ReactNode that will be used as a register link. If you want to use custom link you can use `registerLink` property. Also, you can reach to form values with the `onClick` property.

```tsx
<AuthPage
    type="register"
    registerLink={
        <button
            type="submit"
            onClick={(event) => {
                event.preventDefault();
                // you can access register form data from `event.target`
                console.log(event.target.form);
            }}
        >
            login
        </button>
    }
/>
```

### `resetPasswordLink`

`resetPasswordLink` property defines the link to the reset password page.

#### When `type` is `"login"`

`resetPasswordLink` property defines the link to the reset password page. It render a link to the reset password page.

#### When `type` is `"resetPassword"`

`resetPasswordLink` render a ReactNode that will be used as a reset password link. If you want to use custom link you can use `resetPasswordLink` property. Also, you can reach to form values with the `onClick` property.

```tsx
<AuthPage
    type="resetPassword"
    registerLink={
        <button
            type="submit"
            onClick={(event) => {
                event.preventDefault();
                // you can access reset password form data from `event.target`
                console.log(event.target.form);
            }}
        >
            login
        </button>
    }
/>
```

### `updatePasswordLink`

It is used when `type` is `"updatePassword"`. It render a ReactNode that will be used as a update password link. If you want to use custom link you can use `updatePasswordLink` property. Also, you can reach to form values with the `onClick` property.

```tsx
<AuthPage
    type="updatePassword"
    registerLink={
        <button
            type="submit"
            onClick={(event) => {
                event.preventDefault();
                // you can access update Password form data from `event.target`
                console.log(event.target.form);
            }}
        >
            login
        </button>
    }
/>
```

### `loginLink`

`loginLink` property defines the render a ReactNode for the login link.

#### When `type` is `"register"`

`loginLink` render a ReactNode that will be used as a login link.

#### When `type` is `"login"`

`loginLink` render a ReactNode that will be used as a login link. If you want to use custom link you can use `loginLink` property. Also, you can reach to form values with the `onClick` property.

```tsx
<AuthPage
    type="login"
    loginLink={
        <button
            type="submit"
            onClick={(event) => {
                event.preventDefault();
                // you can access login form data from `event.target`
                console.log(event.target.form);
            }}
        >
            login
        </button>
    }
/>
```

### `providers`

It is used when `type` is `"login"`. `providers` property defines the list of providers that will be used to handle social login authentication.

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

`backLink` property defines the render ReactNode that will be used as a back link.

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
