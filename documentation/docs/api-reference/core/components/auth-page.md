---
id: auth-page
title: <AuthPage>
sidebar_label: <AuthPage>
description: <AuthPage> component from refine is a authentication page that can be used to login, register, forgot password and update password.
---

`<AuthPage>` component from **refine** contains authentication pages that can be used to login, register, forgot password and update password.

Before using `<AuthPage>` component you need to add [authProvider](/api-reference/core/providers/auth-provider.md) that will be used to handle authentication.

```tsx live shared
const { useNavigation: useNavigationShared } = RefineCore;

window.__refineAuthStatus = false;

const authProvider = {
    login: () => { 
        window.__refineAuthStatus = true; 
        return Promise.resolve(); 
    },
    register: () => Promise.resolve(),
    forgotPassword: () => Promise.resolve(),
    updatePassword: () => Promise.resolve(),
    logout: () => { window.__refineAuthStatus = false },
    checkAuth: () => window.__refineAuthStatus ? Promise.resolve() : Promise.reject(),
    checkError: () => Promise.resolve(),
    getPermissions: () => Promise.resolve(),
    getUserIdentity: () => Promise.resolve(),
};

const DashboardPage = () => {
    const { replace } = useNavigationShared();
    return (
        <div>
            <h1>Dashboard Page</h1>
            <button
                onClick={() => {
                    replace("/login");
                }}
            >
                Logout
            </button>
        </div>
    );
};

const Wrapper = (children) => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    width: "400px",
                }}
            >
                {children}
            </div>
        </div>
    );
};
```

## Usage

`<AuthPage>` component can be used like this:

```tsx live disableScroll hideCode previewHeight=333px url=http://localhost:3000/login
setInitialRoutes(["/login"]);

// visible-block-start
import { Refine, AuthPage, useNavigation } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";

import { authProvider } from "./authProvider";
import { DashboardPage } from "pages/dashboard";

const App = () => {
    return (
        <Refine
            routerProvider={{
                ...routerProvider,
                routes: [
                    { path: "/login", element: <AuthPage type="login" /> },
                ],
            }}
            authProvider={authProvider}
            // highlight-next-line
            LoginPage={AuthPage}
            DashboardPage={DashboardPage}
            resources={[
                {
                    name: "posts",
                },
            ]}
        />
    );
};
// visible-block-end
render(<App />);
```

## Types

`<AuthPage>` component has the following types:

-   `"login"` - a type of the login page and default type.
-   `"register"` - type of the registration page.
-   `"forgotPassword"` - type of the forgot password page.
-   `"updatePassword"` - type of the update password page.


### Login

You can use the following props for the `<AuthPage>` component when the type is `"login"`:

```tsx live disableScroll hideCode url=http://localhost:3000/login previewHeight=390px
setInitialRoutes(["/login"]);
const { useNavigation, useRouterContext } = RefineCore;

// visible-block-start
import { Refine, AuthPage } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";

import { authProvider } from "./authProvider";
import { DashboardPage } from "./pages/dashboard";

const App = () => {
    return (
        <Refine
            authProvider={authProvider}
            routerProvider={{
                ...routerProvider,
                routes: [
                    // highlight-next-line
                    { path: "/login", element: <AuthPage /> }
                ],
            }}
            // highlight-next-line
            LoginPage={AuthPage}
            DashboardPage={DashboardPage}
            resources={[
                name: "posts",
            ]}
        />
    );
};
// visible-block-end
render(<App/>);
```

### Register
The register page will be used to register new users. You can use the following props for the `<AuthPage>` component when the type is `"register"`:

```tsx live disableScroll hideCode url=http://localhost:3000/login previewHeight=390px
setInitialRoutes(["/register"]);
const { useNavigation, useRouterContext } = RefineCore;

// visible-block-start
import { Refine, AuthPage } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";

import { authProvider } from "./authProvider";
import { DashboardPage } from "./pages/dashboard";

const App = () => {
    return (
        <Refine
            authProvider={authProvider}
            routerProvider={{
                ...routerProvider,
                routes: [
                    { path: "/login", element: <AuthPage /> },
                    // highlight-next-line
                    { path: "/register", element: <AuthPage type="register" /> }
                ],
            }}
            // highlight-next-line
            LoginPage={AuthPage}
            DashboardPage={DashboardPage}
            resources={[
                name: "posts",
            ]}
        />
    );
};
// visible-block-end
render(<App/>);
```

### ForgotPassword
The `forgotPassword` type is a page that allows users to reset their passwords. You can use this page to reset your password.

```tsx live url=http://localhost:3000/forgot-password
setInitialRoutes(["/forgot-password"]);
setRefineProps({ Sider: () => null });

// visible-block-start
import { Refine, useNavigation, AuthPage } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";

import { authProvider } from "./authProvider";
import { DashboardPage } from "./pages/dashboard";

const App = () => {
    return (
        <Refine
            authProvider={authProvider}
            routerProvider={{
                ...routerProvider,
                routes: [
                    // highlight-start
                    {
                        path: "/forgot-password",
                        element: <AuthPage type="forgotPassword" />,
                    },
                    // highlight-end
                ],
            }}
            LoginPage={AuthPage}
            DashboardPage={DashboardPage}
            resources={[{ name: "posts" }]}
        />
    );
};
// visible-block-end
render(<App />);
```

### UpdatePassword
The `updatePassword` type is the page used to update the password of the user.

```tsx live url=http://localhost:3000/update-password
setInitialRoutes(["/update-password"]);
setRefineProps({ Sider: () => null });

// visible-block-start
import { Refine, useNavigation, AuthPage } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";

import { authProvider } from "./authProvider";
import { DashboardPage } from "./pages/dashboard";

const App = () => {
    return (
        <Refine
            authProvider={authProvider}
            routerProvider={{
                ...routerProvider,
                routes: [
                    // highlight-start
                    {
                        path: "/update-password",
                        element: <AuthPage type="updatePassword" />,
                    },
                    // highlight-end
                ],
            }}
            LoginPage={AuthPage}
            DashboardPage={DashboardPage}
            resources={[{ name: "posts" }]}
        />
    );
};
// visible-block-end
render(<App />);
```

## Props
### `providers`
:::info
`providers` property is only available for types `login` and `register`.
:::

`providers` property defines the list of providers used to handle login authentication. `providers` accepts an array of `Provider` type. Check out the [Interface](#interface) section for more information.

```tsx live previewHeight=560px url=http://localhost:3000/login
setInitialRoutes(["/login"]);
setRefineProps({ Sider: () => null });

// visible-block-start
import { Refine, useRouterContext, useNavigation, AuthPage } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";

import { authProvider } from "./authProvider";
import { DashboardPage } from "./pages/dashboard";

const LoginPage = () => {
    return (
        <AuthPage
            providers={[
                {
                    name: "github",
                    icon: (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 0a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.4 1 .2-.8.5-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.1-.4-.6-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.6.2 2.9.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.9 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 0z" />
                        </svg>
                    ),
                    label: "Sign in with GitHub",
                },
                {
                    name: "google",
                    icon: (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="#4285F4"
                                d="m23.7 12.3-.1-2.3H12.3v4.5h6.4a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.2-2.1 3.5-5.2 3.5-8.8Z"
                            />
                            <path
                                fill="#34A853"
                                d="M12.3 24c3.2 0 6-1 7.9-3l-3.9-3a7.2 7.2 0 0 1-10.8-3.7h-4v3c2 4 6 6.7 10.8 6.7Z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M5.5 14.3a7 7 0 0 1 0-4.6v-3h-4a11.9 11.9 0 0 0 0 10.7l4-3.1Z"
                            />
                            <path
                                fill="#EA4335"
                                d="M12.3 4.8c1.7 0 3.3.6 4.6 1.8L20.3 3A12 12 0 0 0 1.6 6.6l4 3.1c.9-2.8 3.5-5 6.7-5Z"
                            />
                        </svg>
                    ),
                    label: "Sign in with Google",
                },
            ]}
        />
    );

}

const App = () => {
    return (
        <Refine
            authProvider={authProvider}
            routerProvider={routerProvider}
            // highlight-start
            LoginPage={LoginPage}
            // highlight-end
            DashboardPage={DashboardPage}
            resources={[{ name: "posts" }]}
        />
    );
};
// visible-block-end
render(
    <App />,
);
```

### `registerLink`

:::info
`registerLink` property is only available for type `login`.
:::

`registerLink` property defines the link to the registration page and also you can give a node to render. Default value is `"/register"`.

```tsx live previewHeight=500px url=http://localhost:3000/login
setInitialRoutes(["/login"]);

// visible-block-start
import { Refine, useRouterContext, AuthPage } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";

import { authProvider } from "./authProvider";
import { DashboardPage } from "./pages/dashboard";

const Auth = (props) => {
    const { Link } = useRouterContext();

    return (
        <AuthPage
            {...props}
            // highlight-start
            registerLink={
                <div
                    style={{
                        border: "1px dashed cornflowerblue",
                        marginTop: 5,
                        padding: 5,
                    }}
                >
                    <Link to="/register">Register</Link>
                </div>
            }
            // highlight-end
        />
    );
};

const App = () => {
    return (
        <Refine
            authProvider={authProvider}
            routerProvider={{
                ...routerProvider,
                routes: [
                    { path: "/register", element: <Auth type="register" /> },
                ]
            }}
            // highlight-next-line
            LoginPage={Auth}
            DashboardPage={DashboardPage}
            resources={[{ name: "posts" }]}
        />
    );
};
// visible-block-end
render(<App />);
```

### `loginLink`

`loginLink` property defines the link to the login page and also you can give a node to render.

```tsx live previewHeight=500px url=http://localhost:3000/register
setInitialRoutes(["/register"]);

// visible-block-start
import { Refine, useRouterContext, AuthPage } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";

import { authProvider } from "./authProvider";
import { DashboardPage } from "./pages/dashboard";

const RegisterPage = () => {
    const { Link } = useRouterContext();

    return (
        <AuthPage
            type="register"
            // highlight-start
            loginLink={
                <div
                    style={{
                        border: "1px dashed cornflowerblue",
                        marginTop: 5,
                        padding: 5,
                    }}
                >
                    <Link to="/login">Login</Link>
                </div>
            }
            // highlight-end
        />
    );
};

const App = () => {
    return (
        <Refine
            authProvider={authProvider}
            routerProvider={{
                ...routerProvider,
                routes: [
                    { path: "/register", element: <RegisterPage /> },
                ]
            }}
            // highlight-next-line
            LoginPage={AuthPage}
            DashboardPage={DashboardPage}
            resources={[{ name: "posts" }]}
        />
    );
};
// visible-block-end
render(<App />);
```

### `forgotPasswordLink`

`forgotPasswordLink` property defines the link to the forgot password page and also you can a give node to render.

```tsx live previewHeight=500px url=http://localhost:3000/register
setInitialRoutes(["/login"]);

// visible-block-start
import { Refine, useRouterContext, AuthPage } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";

import { authProvider } from "./authProvider";
import { DashboardPage } from "./pages/dashboard";

const LoginPage = () => {
    const { Link } = useRouterContext();

    return (
        <AuthPage
            type="login"
            // highlight-start
            forgotPasswordLink={
                <div
                    style={{
                        border: "1px dashed cornflowerblue",
                        marginTop: 5,
                        padding: 5,
                    }}
                >
                    <Link to="/forgot-password">Forgot Password</Link>
                </div>
            }
            // highlight-end
        />
    );
};

const App = () => {
    return (
        <Refine
            authProvider={authProvider}
            routerProvider={{
                ...routerProvider,
                routes: [
                    { path: "/forgot-password", element: <AuthPage type="forgotPassword" /> },
                ]
            }}
            // highlight-next-line
            LoginPage={LoginPage}
            DashboardPage={DashboardPage}
            resources={[{ name: "posts" }]}
        />
    );
};
// visible-block-end
render(<App />);
```



### `submitButton`

`submitButton` render your custom ReactNode to submit the form. Also, you can reach form values with the `onClick` property and use your own logic to submit the form.

```tsx live previewHeight=500px url=http://localhost:3000/login
setInitialRoutes(["/login"]);

// visible-block-start
import { Refine, useRouterContext, AuthPage, useRegister } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";

import { authProvider } from "./authProvider";
import { DashboardPage } from "./pages/dashboard";

const LoginPage = () => {
    const { Link } = useRouterContext();
    const { mutate: register } = useRegister();

    return (
        <AuthPage
            type="login"
            // highlight-start
            submitButton={
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        padding: 5,
                        border: "1px dashed cornflowerblue",
                        marginTop: 5,
                    }}
                >
                    <button
                        type="submit"
                        style={{
                            display: "flex",
                            flex: 1,
                            justifyContent: "center",
                        }}
                        onClick={(e) => {
                            event.preventDefault();
                            // you can access register form data from `event.target`
                            console.log(e.target.form);
                            // run your custom register logic(validation, etc.)
                            register();
                        }}
                    >
                        Login
                    </button>
                </div>
            }
            // highlight-end
        />
    );
};

const App = () => {
    return (
        <Refine
            authProvider={authProvider}
            routerProvider={routerProvider}
            // highlight-next-line
            LoginPage={LoginPage}
            DashboardPage={DashboardPage}
            resources={[{ name: "posts" }]}
        />
    );
};
// visible-block-end
render(<App />);
```

### `backLink`

`backLink` property defines the render ReactNode that will be used as a back link and also you can give a node to render.


```tsx live previewHeight=500px url=http://localhost:3000/register
setInitialRoutes(["/register"]);

// visible-block-start
import { Refine, useRouterContext, AuthPage, useRegister } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";

import { authProvider } from "./authProvider";
import { DashboardPage } from "./pages/dashboard";

const RegisterPage = () => {
    const { Link } = useRouterContext();

    return (
        <AuthPage
            type="register"
            // highlight-start
            backLink={
                <div
                    style={{
                        border: "1px dashed cornflowerblue",
                        marginTop: 5,
                        padding: 5,
                    }}
                >
                    <Link to="/login">Go Back</Link>
                </div>
            }
            // highlight-end
        />
    );
};

const App = () => {
    return (
        <Refine
            authProvider={authProvider}
            routerProvider={{
                ...routerProvider,
                routes: [
                    // highlight-start
                    {
                        path: "/register",
                        element: <RegisterPage />,
                    },
                    // highlight-end
                ],
            }}
            // highlight-next-line
            LoginPage={AuthPage}
            DashboardPage={DashboardPage}
            resources={[{ name: "posts" }]}
        />
    );
};
// visible-block-end
render(<App />);
```

## API Reference
### Properties

| Property           | Description                                                                      | Type                                                          |
| ------------------ | -------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| type               | Render `<AuthPage>` forms by `type` property.                                    | `login` \| `register` \| `forgotPassword` \| `updatePassword` |
| providers          | Render social logins if `type` is `"login"`.                                     | [`IProvider[]`](#interface)                                   |
| registerLink       | Custom node that will be rendered as a register link to the `<AuthPage>`.        | `React.ReactNode`                                             |
| loginLink          | Custom node that will be rendered as a link to the `<AuthPage>`.                 | `React.ReactNode`                                             |
| forgotPasswordLink | Custom node that will be rendered as a forgot password link to the `<AuthPage>`. | `React.ReactNode`                                             |
| submitButton       | Custom node that will be used to submit form.                                    | `React.ReactNode`                                             |
| backLink           | Custom node that will be displayed as a back link.                               | `React.ReactNode`                                             |

### Interface

```tsx
interface IProvider {
    name: string;
    icon?: React.ReactNode;
    label?: string;
}
```
