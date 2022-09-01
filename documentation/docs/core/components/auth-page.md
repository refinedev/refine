---
id: auth-page
title: <AuthPage>
sidebar_label: <AuthPage>
description: <AuthPage> component from refine is a authentication page that can be used to login, register, reset password and update password.
---

`<AuthPage>` component from **refine** contains authentication pages that can be used to login, register, reset password and update password.

Before using `<AuthPage>` component you need to add [authProvider](/core/providers/auth-provider.md) that will be used to handle authentication.

## Usage

`<AuthPage>` component can be used like this:

```tsx title="pages/auth/register"
import { AuthPage } from "@pankod/refine-core";

const RegisterPage = () => {
    return <AuthPage type="register" />;
};
```

## Types

`<AuthPage>` component has the following types:

-   `"login"` - a type of the login page and default type.
-   `"register"` - type of the registration page.
-   `"resetPassword"` - type of the reset password page.
-   `"updatePassword"` - type of the update password page.

### `login`

You can use the following props for the `<AuthPage>` component when the type is `"login"`:

-   `registerLink` property defines the link to the registration page.
-   `resetPasswordLink` property defines the link to the reset password page.
-   `backLink` property defines the render ReactNode that will be used as a back link.
-   `submitButton` render your custom ReactNode to submit the form. Also, you can reach form values with the `onClick` property and use your own logic to submit the form.

```tsx
import { useLogin } from "@pankod/refine-core";

const LoginPage = () => {
    const { mutate: login } = useLogin();

    return (
        <AuthPage
            type="login"
            backLink={
                <button
                    type="button"
                    onClick={() => {
                        // your custom back link logic
                    }}
                >
                    Go Back
                </button>
            }
            submitButton={
                <button
                    type="submit"
                    onClick={(event) => {
                        event.preventDefault();
                        // you can access login form data from `event.target`
                        console.log(event.target.form);
                        // run your custom login logic
                        login();
                    }}
                >
                    Login
                </button>
            }
        />
    );
};
```

-   `providers` property defines the list of providers used to handle social login authentication.

```tsx
<AuthPage
    type="login"
    providers={[
        {
            name: "github",
            icon: (
                <img src="https://img.icons8.com/color/48/000000/github.png" />
            ),
            label: "Sign in with GitHub",
        },
        {
            name: "google",
            icon: (
                <img src="https://img.icons8.com/color/48/000000/google-logo.png" />
            ),
            label: "Sign in with Google",
        },
    ]}
/>
```

:::info
If you want to use providers then you need to handle your provider name to use social authentication in the`login` method from [authProvider](/core/providers/auth-provider.md) that will be used to handle authentication.
`providerName` is the name of the selected provider from your list of providers.

```tsx
const authProvider: AuthProvider = {
    ...
    login: ({ providerName }) => {
        if (providerName === "github") {
            // handle Github Auth flow
        }
        if (providerName === "google") {
            // handle Google Auth flow
        }
    }
}
```

:::

### `register`

You can use following props for `<AuthPage>` component when type is `"register"`:

-   `backLink` property defines the render ReactNode that will be used as a back link.
-   `loginLink` property defines the link to the login page.
-   `submitButton` render your custom ReactNode to submit the form. Also, you can reach form values with the `onClick` property and use your own logic to submit the form.

```tsx
import { useRegister } from "@pankod/refine-core";

const RegisterPage = () => {
    const { mutate: register } = useRegister();

    return (
        <AuthPage
            type="register"
            backLink={
                <button
                    type="button"
                    onClick={() => {
                        // your custom back link logic
                    }}
                >
                    Go Back
                </button>
            }
            submitButton={
                <button
                    type="submit"
                    onClick={(event) => {
                        event.preventDefault();
                        // you can access register form data from `event.target`
                        console.log(event.target.form);
                        // run your custom login logic
                        register();
                    }}
                >
                    Register
                </button>
            }
        />
    );
};
```

### `resetPassword`

You can use the following props for the `<AuthPage>` component when the type is `"resetPassword"`:

-   `backLink` property defines the render ReactNode that will be used as a back link.
-   `submitButton` render your custom ReactNode to submit the form. Also, you can reach form values with the `onClick` property and use your own logic to submit the form.

```tsx
import { useResetPassword } from "@pankod/refine-core";

const ResetPasswordPage = () => {
    const { mutate: resetPassword } = useResetPassword();

    return (
        <AuthPage
            type="resetPassword"
            backLink={
                <button
                    type="button"
                    onClick={() => {
                        // your custom back link logic
                    }}
                >
                    Go Back
                </button>
            }
            submitButton={
                <button
                    type="submit"
                    onClick={(event) => {
                        event.preventDefault();
                        // you can access reset password form data from `event.target`
                        console.log(event.target.form);
                        // run your custom reset password logic
                        resetPassword();
                    }}
                >
                    Reset Password
                </button>
            }
        />
    );
};
```

### `updatePassword`

You can use the following props for the `<AuthPage>` component when the type is `"updatePassword"`:

-   `backLink` property defines the render ReactNode that will be used as a back link.
-   `submitButton` render your custom ReactNode to submit the form. Also, you can reach form values with the `onClick` property and use your own logic to submit the form.

```tsx
import { useUpdatePassword } from "@pankod/refine-core";

const UpdatePasswordPage = () => {
    const { mutate: updatePassword } = useUpdatePassword();

    return (
        <AuthPage
            type="updatePassword"
            backLink={
                <button
                    type="button"
                    onClick={() => {
                        // your custom back link logic
                    }}
                >
                    Go Back
                </button>
            }
            submitButton={
                <button
                    type="submit"
                    onClick={(event) => {
                        event.preventDefault();
                        // you can access update password form data from `event.target`
                        console.log(event.target.form);
                        // run your custom update password logic
                        updatePassword();
                    }}
                >
                    Update Password
                </button>
            }
        />
    );
};
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
| submitButton       | Custom node that will be used to submit form.                                    | `React.ReactNode`                                            |
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
