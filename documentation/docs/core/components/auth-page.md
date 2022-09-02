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

```tsx live url=http://localhost:3000/login previewHeight=333px
const { AuthPage, Refine, useNavigation } = RefineCore;
const authProvider = {
    login: () => Promise.resolve(),
    register: () => Promise.resolve(),
    resetPassword: () => Promise.resolve(),
    updatePassword: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    checkAuth: () => Promise.resolve(),
    checkError: () => Promise.resolve(),
    getPermissions: () => Promise.resolve(),
    getUserIdentity: () => Promise.resolve(),
};
// visible-block-start
import { Refine, AuthPage } from "@pankod/refine-core";
import { authProvider } from "./authProvider";

const App = () => {
    return (
        <Refine
            authProvider={authProvider}
            // highlight-next-line
            LoginPage={AuthPage}
        />
    );
};
// visible-block-end
render(
    <Refine
        routerProvider={{
            ...RefineDemoReactRouterV6(["/login"]),
            routes: [{ path: "/login", element: <AuthPage type="login" /> }],
        }}
        LoginPage={AuthPage}
        DashboardPage={() => {
            const { replace } = useNavigation();

            return (
                <div>
                    Login Succesful
                    <button
                        onClick={() => {
                            replace("/login");
                        }}
                    >
                        Logout
                    </button>
                </div>
            );
        }}
        authProvider={authProvider}
        resources={[
            {
                name: "posts",
                list: () => <div>List</div>,
            },
        ]}
    />,
);
```

## Types

`<AuthPage>` component has the following types:

-   `"login"` - a type of the login page and default type.
-   `"register"` - type of the registration page.
-   `"resetPassword"` - type of the reset password page.
-   `"updatePassword"` - type of the update password page.

## Login

You can use the following props for the `<AuthPage>` component when the type is `"login"`:

-   `registerLink` property defines the link to the registration page.
-   `resetPasswordLink` property defines the link to the reset password page.
-   `backLink` property defines the render ReactNode that will be used as a back link.
-   `submitButton` render your custom ReactNode to submit the form. Also, you can reach form values with the `onClick` property and use your own logic to submit the form.
-   `providers` property defines the list of providers used to handle social login authentication.

### `registerLink`

```tsx live url=http://localhost:3000/login previewHeight=350px
const { AuthPage, Refine, useNavigation } = RefineCore;
const authProvider = {
    login: () => Promise.resolve(),
    register: () => Promise.resolve(),
    resetPassword: () => Promise.resolve(),
    updatePassword: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    checkAuth: () => Promise.resolve(),
    checkError: () => Promise.resolve(),
    getPermissions: () => Promise.resolve(),
    getUserIdentity: () => Promise.resolve(),
};
// visible-block-start
import { Refine, AuthPage } from "@pankod/refine-core";
import { authProvider } from "./authProvider";

const LoginPage = () => <AuthPage type="login" registerLink="/register" />;
const RegisterPage = () => <AuthPage type="register" loginLink="/login" />;

const App = () => {
    return (
        <Refine
            authProvider={authProvider}
            // highlight-next-line
            LoginPage={LoginPage}
        />
    );
};
// visible-block-end
render(
    <Refine
        routerProvider={{
            ...RefineDemoReactRouterV6(["/login"]),
            routes: [
                { path: "/login", element: <LoginPage /> },
                { path: "/register", element: <RegisterPage /> },
            ],
        }}
        LoginPage={AuthPage}
        DashboardPage={() => {
            const { replace } = useNavigation();

            return (
                <div>
                    Login Succesful
                    <button
                        onClick={() => {
                            replace("/login");
                        }}
                    >
                        Logout
                    </button>
                </div>
            );
        }}
        authProvider={authProvider}
        resources={[
            {
                name: "posts",
                list: () => <div>List</div>,
            },
        ]}
    />,
);
```

### `resetPasswordLink`

```tsx live url=http://localhost:3000/login previewHeight=350px
const { AuthPage, Refine, useNavigation } = RefineCore;
const authProvider = {
    login: () => Promise.resolve(),
    register: () => Promise.resolve(),
    resetPassword: () => Promise.resolve(),
    updatePassword: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    checkAuth: () => Promise.resolve(),
    checkError: () => Promise.resolve(),
    getPermissions: () => Promise.resolve(),
    getUserIdentity: () => Promise.resolve(),
};
// visible-block-start
import { Refine, AuthPage } from "@pankod/refine-core";
import { authProvider } from "./authProvider";

const LoginPage = () => <AuthPage type="login" resetPasswordLink="/reset" />;
const RegisterPage = () => <AuthPage type="register" loginLink="/login" />;
const ResetPasswordPage = () => (
    <AuthPage type="resetPassword" backLink="/login" />
);

const App = () => {
    return (
        <Refine
            authProvider={authProvider}
            // highlight-next-line
            LoginPage={LoginPage}
        />
    );
};
// visible-block-end
render(
    <Refine
        routerProvider={{
            ...RefineDemoReactRouterV6(["/login"]),
            routes: [
                { path: "/login", element: <LoginPage /> },
                { path: "/register", element: <RegisterPage /> },
                { path: "/reset", element: <ResetPasswordPage /> },
            ],
        }}
        LoginPage={AuthPage}
        DashboardPage={() => {
            const { replace } = useNavigation();

            return (
                <div>
                    Login Succesful
                    <button
                        onClick={() => {
                            replace("/login");
                        }}
                    >
                        Logout
                    </button>
                </div>
            );
        }}
        authProvider={authProvider}
        resources={[
            {
                name: "posts",
                list: () => <div>List</div>,
            },
        ]}
    />,
);
```

### `backLink`

```tsx live url=http://localhost:3000/login previewHeight=350px
const { AuthPage, Refine, useNavigation } = RefineCore;
const authProvider = {
    login: () => Promise.resolve(),
    register: () => Promise.resolve(),
    resetPassword: () => Promise.resolve(),
    updatePassword: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    checkAuth: () => Promise.resolve(),
    checkError: () => Promise.resolve(),
    getPermissions: () => Promise.resolve(),
    getUserIdentity: () => Promise.resolve(),
};
// visible-block-start
import { Refine, AuthPage } from "@pankod/refine-core";
import { authProvider } from "./authProvider";

const LoginPage = () => <AuthPage type="login" backLink="/home" />;
const HomePage = () => <div>Home</div>;

const App = () => {
    return (
        <Refine
            authProvider={authProvider}
            // highlight-next-line
            LoginPage={LoginPage}
        />
    );
};
// visible-block-end
render(
    <Refine
        routerProvider={{
            ...RefineDemoReactRouterV6(["/login"]),
            routes: [
                { path: "/login", element: <LoginPage /> },
                { path: "/home", element: HomePage },
            ],
        }}
        LoginPage={AuthPage}
        DashboardPage={() => {
            const { replace } = useNavigation();

            return (
                <div>
                    Login Succesful
                    <button
                        onClick={() => {
                            replace("/login");
                        }}
                    >
                        Logout
                    </button>
                </div>
            );
        }}
        authProvider={authProvider}
        resources={[
            {
                name: "posts",
                list: () => <div>List</div>,
            },
        ]}
    />,
);
```

### `submitButton`

```tsx live url=http://localhost:3000/login previewHeight=350px
const { AuthPage, Refine, useNavigation, useLogin } = RefineCore;
const authProvider = {
    login: () => Promise.resolve(),
    register: () => Promise.resolve(),
    resetPassword: () => Promise.resolve(),
    updatePassword: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    checkAuth: () => Promise.resolve(),
    checkError: () => Promise.resolve(),
    getPermissions: () => Promise.resolve(),
    getUserIdentity: () => Promise.resolve(),
};
// visible-block-start
import { Refine, AuthPage, useLogin } from "@pankod/refine-core";
import { authProvider } from "./authProvider";

const LoginPage = () => {
    const { mutate: login } = useLogin();

    return (
        <AuthPage
            type="login"
            backLink="/home"
            submitButton={
                <button
                    type="submit"
                    onClick={(event) => {
                        event.preventDefault();
                        // you can access login form data from `event.target`
                        console.log("email", event.target.form);
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

const App = () => {
    return (
        <Refine
            authProvider={authProvider}
            // highlight-next-line
            LoginPage={LoginPage}
        />
    );
};
// visible-block-end
render(
    <Refine
        routerProvider={{
            ...RefineDemoReactRouterV6(["/login"]),
            routes: [{ path: "/login", element: <LoginPage /> }],
        }}
        LoginPage={AuthPage}
        DashboardPage={() => {
            const { replace } = useNavigation();

            return (
                <div>
                    Login Succesful
                    <button
                        onClick={() => {
                            replace("/login");
                        }}
                    >
                        Logout
                    </button>
                </div>
            );
        }}
        authProvider={authProvider}
        resources={[
            {
                name: "posts",
                list: () => <div>List</div>,
            },
        ]}
    />,
);
```

### `providers`

```tsx live url=http://localhost:3000/login previewHeight=455px
const { AuthPage, Refine, useNavigation } = RefineCore;
const authProvider = {
    login: () => Promise.resolve(),
    register: () => Promise.resolve(),
    resetPassword: () => Promise.resolve(),
    updatePassword: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    checkAuth: () => Promise.resolve(),
    checkError: () => Promise.resolve(),
    getPermissions: () => Promise.resolve(),
    getUserIdentity: () => Promise.resolve(),
};
// visible-block-start
import { Refine, AuthPage, useLogin } from "@pankod/refine-core";
import { authProvider } from "./authProvider";

const LoginPage = () => {
    return (
        <AuthPage
            type="login"
            providers={[
                {
                    name: "github",
                    icon: (
                        <svg
                            height="32"
                            aria-hidden="true"
                            viewBox="0 0 16 16"
                            version="1.1"
                            width="32"
                            data-view-component="true"
                            class="octicon octicon-mark-github v-align-middle"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                            ></path>
                        </svg>
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
    );
};

const App = () => {
    return (
        <Refine
            authProvider={authProvider}
            // highlight-next-line
            LoginPage={LoginPage}
        />
    );
};
// visible-block-end
render(
    <Refine
        routerProvider={{
            ...RefineDemoReactRouterV6(["/login"]),
            routes: [{ path: "/login", element: <LoginPage /> }],
        }}
        LoginPage={AuthPage}
        DashboardPage={() => {
            const { replace } = useNavigation();

            return (
                <div>
                    Login Succesful
                    <button
                        onClick={() => {
                            replace("/login");
                        }}
                    >
                        Logout
                    </button>
                </div>
            );
        }}
        authProvider={authProvider}
        resources={[
            {
                name: "posts",
                list: () => <div>List</div>,
            },
        ]}
    />,
);
```

--- NOTE ---

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

--- NOTE ---

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
