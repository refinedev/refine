---
id: auth-page
title: <AuthPage>
sidebar_label: <AuthPage>
description: <AuthPage> component from refine is a authentication page that can be used to login, register, forgot password and update password.
---

`<AuthPage>` component from **refine** contains authentication pages that can be used to login, register, forgot password and update password.

Before using `<AuthPage>` component you need to add [authProvider](/api-reference/core/providers/auth-provider.md) that will be used to handle authentication.

## Usage

`<AuthPage>` component can be used like this:

```tsx live disableScroll hideCode previewHeight=333px url=http://localhost:3000/login
const { AuthPage, Refine, useNavigation } = RefineCore;
const authProvider = {
    login: () => Promise.resolve(),
    register: () => Promise.resolve(),
    forgotPassword: () => Promise.resolve(),
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
-   `"forgotPassword"` - type of the forgot password page.
-   `"updatePassword"` - type of the update password page.

## Login

You can use the following props for the `<AuthPage>` component when the type is `"login"`:

### `registerLink`

`registerLink` property defines the link to the registration page and also you can give a node to render.

```tsx live disableScroll hideCode url=http://localhost:3000/login previewHeight=390px
const { AuthPage, Refine, useNavigation, useRouterContext } = RefineCore;
const authProvider = {
    login: () => Promise.resolve(),
    register: () => Promise.resolve(),
    forgotPassword: () => Promise.resolve(),
    updatePassword: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    checkAuth: () => Promise.resolve(),
    checkError: () => Promise.resolve(),
    getPermissions: () => Promise.resolve(),
    getUserIdentity: () => Promise.resolve(),
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
// visible-block-start
import { Refine, AuthPage } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";

import { Wrapper } from "./Wrapper";
import { authProvider } from "./authProvider";

const LoginPage = () => {
    const { Link } = useRouterContext();
    return Wrapper(
        <AuthPage
            type="login"
            registerLink={
                <div
                    style={{
                        border: "1px dashed cornflowerblue",
                        marginTop: 5,
                    }}
                >
                    <Link to="/register">Don't have an account? Register</Link>
                </div>
            }
        />,
    );
};

const RegisterPage = () =>
    Wrapper(<AuthPage type="register" loginLink="/login" />);

const App = () => {
    return (
        <Refine
            authProvider={authProvider}
            routerProvider={{
                ...routerProvider,
                // highlight-next-line
                routes: [{ path: "/register", element: <RegisterPage /> }],
            }}
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

### `forgotPasswordLink`

`forgotPasswordLink` property defines the link to the forgot password page and also you can a give node to render.

```tsx live disableScroll hideCode url=http://localhost:3000/login previewHeight=350px
const { AuthPage, Refine, useNavigation, useRouterContext } = RefineCore;
const authProvider = {
    login: () => Promise.resolve(),
    register: () => Promise.resolve(),
    forgotPassword: () => Promise.resolve(),
    updatePassword: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    checkAuth: () => Promise.resolve(),
    checkError: () => Promise.resolve(),
    getPermissions: () => Promise.resolve(),
    getUserIdentity: () => Promise.resolve(),
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

// visible-block-start
import { Refine, AuthPage } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";

import { authProvider } from "./authProvider";
import { Wrapper } from "./Wrapper";

const LoginPage = () => {
    const { Link } = useRouterContext();

    return Wrapper(
        <AuthPage
            type="login"
            forgotPasswordLink={
                <div
                    style={{
                        border: "1px dashed cornflowerblue",
                        marginTop: 5,
                    }}
                >
                    <Link to="/forgot-password">Forgot your password?</Link>
                </div>
            }
        />,
    );
};
const RegisterPage = () =>
    Wrapper(<AuthPage type="register" loginLink="/login" />);
const ForgotPasswordPage = () =>
    Wrapper(<AuthPage type="forgotPassword" backLink="/login" />);

const App = () => {
    return (
        <Refine
            authProvider={authProvider}
            routerProvider={{
                ...routerProvider,
                // highlight-start
                routes: [
                    { path: "/register", element: <RegisterPage /> },
                    { path: "/forgot-password", element: <ForgotPasswordPage /> },
                ],
                // highlight-end
            }}
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
                { path: "/forgot-password", element: <ForgotPasswordPage /> },
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

`backLink` property defines the render ReactNode that will be used as a back link and also you can give a node to render.

```tsx live disableScroll hideCode url=http://localhost:3000/login previewHeight=350px
const { AuthPage, Refine, useNavigation, useRouterContext } = RefineCore;
const authProvider = {
    login: () => Promise.resolve(),
    register: () => Promise.resolve(),
    forgotPassword: () => Promise.resolve(),
    updatePassword: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    checkAuth: () => Promise.resolve(),
    checkError: () => Promise.resolve(),
    getPermissions: () => Promise.resolve(),
    getUserIdentity: () => Promise.resolve(),
};
// visible-block-start
import { Refine, AuthPage } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";

import { authProvider } from "./authProvider";

const LoginPage = () => {
    const { Link } = useRouterContext();
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
                <AuthPage
                    type="login"
                    backLink={
                        <div
                            style={{
                                border: "1px dashed cornflowerblue",
                                marginTop: 5,
                            }}
                        >
                            <Link to="/home">Go Home</Link>
                        </div>
                    }
                />
            </div>
        </div>
    );
};
const HomePage = () => {
    const { replace } = useNavigation();

    return (
        <div>
            Home
            <button
                onClick={() => {
                    replace("/login");
                }}
            >
                Login
            </button>
        </div>
    );
};

const App = () => {
    return (
        <Refine
            authProvider={authProvider}
            routerProvider={{
                ...routerProvider,
                // highlight-next-line
                routes: [{ path: "/home", element: <HomePage /> }],
            }}
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
                { path: "/home", element: <HomePage /> },
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

`submitButton` render your custom ReactNode to submit the form. Also, you can reach form values with the `onClick` property and use your own logic to submit the form.

```tsx live disableScroll hideCode url=http://localhost:3000/login previewHeight=350px
const { AuthPage, Refine, useNavigation, useLogin } = RefineCore;
const authProvider = {
    login: () => Promise.resolve(),
    register: () => Promise.resolve(),
    forgotPassword: () => Promise.resolve(),
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
                <AuthPage
                    type="login"
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
                        </div>
                    }
                />
            </div>
        </div>
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

`providers` property defines the list of providers used to handle social login authentication.

```tsx live disableScroll hideCode url=http://localhost:3000/login previewHeight=455px
const { AuthPage, Refine, useNavigation } = RefineCore;
const authProvider = {
    login: () => Promise.resolve(),
    register: () => Promise.resolve(),
    forgotPassword: () => Promise.resolve(),
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
        <div
            style={{
                display: "flex",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    width: "400px",
                    position: "relative",
                    zIndex: 1,
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        display: "flex",
                        justifyContent: "center",
                        border: "1px dashed cornflowerblue",
                        width: "220px",
                        height: "115px",
                        top: 40,
                        left: 90,
                        zIndex: -1,
                    }}
                />
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
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                >
                                    <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                                        <path
                                            fill="#4285F4"
                                            d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                                        />
                                        <path
                                            fill="#34A853"
                                            d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                                        />
                                        <path
                                            fill="#FBBC05"
                                            d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                                        />
                                        <path
                                            fill="#EA4335"
                                            d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
                                        />
                                    </g>
                                </svg>
                            ),
                            label: "Sign in with Google",
                        },
                    ]}
                />
            </div>
        </div>
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

:::info
If you want to use providers then you need to handle your provider name to use social authentication in the`login` method from [authProvider](/api-reference/core/providers/auth-provider.md) that will be used to handle authentication.
`providerName` is the name of the selected provider from your list of providers.

```tsx
const authProvider: AuthProvider = {
    ...
    login: ({ providerName }) => {
        if (providerName === "github") {
            window.location.href = "https://example.com/auth/github"; // your github auth url 
            return Promise.resolve(false);
        }
    }
}
```

:::

## Register

You can use following props for `<AuthPage>` component when type is `"register"`:

### `loginLink`

`loginLink` property defines the link to the login page and also you can give a node to render.

```tsx live disableScroll hideCode url=http://localhost:3000/register
const { AuthPage, Refine, useNavigation, useRouterContext } = RefineCore;
const authProvider = {
    login: () => Promise.resolve(),
    register: () => Promise.resolve(),
    forgotPassword: () => Promise.resolve(),
    updatePassword: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    checkAuth: () => Promise.resolve(),
    checkError: () => Promise.resolve(),
    getPermissions: () => Promise.resolve(),
    getUserIdentity: () => Promise.resolve(),
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
// visible-block-start
import { Refine, AuthPage } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";

import { Wrapper } from "./Wrapper";
import { authProvider } from "./authProvider";

const RegisterPage = () => {
    const { Link } = useRouterContext();
    return Wrapper(
        <AuthPage
            type="register"
            loginLink={
                <div
                    style={{
                        border: "1px dashed cornflowerblue",
                        marginTop: 5,
                    }}
                >
                    <Link to="/login">Have an account? Login</Link>
                </div>
            }
        />,
    );
};
const LoginPage = () =>
    Wrapper(<AuthPage type="login" registerLink="/register" />);

const App = () => {
    return (
        <Refine
            authProvider={authProvider}
            routerProvider={{
                ...routerProvider,
                // highlight-next-line
                routes: [{ path: "/register", element: <RegisterPage /> }],
            }}
            // highlight-next-line
            LoginPage={LoginPage}
        />
    );
};
// visible-block-end
render(
    <Refine
        routerProvider={{
            ...RefineDemoReactRouterV6(["/register"]),
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

### `backLink`

`backLink` property defines the render ReactNode that will be used as a back link and also you can give a node to render.

```tsx live disableScroll hideCode url=http://localhost:3000/register
const { AuthPage, Refine, useNavigation, useRouterContext } = RefineCore;
const authProvider = {
    login: () => Promise.resolve(),
    register: () => Promise.resolve(),
    forgotPassword: () => Promise.resolve(),
    updatePassword: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    checkAuth: () => Promise.resolve(),
    checkError: () => Promise.resolve(),
    getPermissions: () => Promise.resolve(),
    getUserIdentity: () => Promise.resolve(),
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

// visible-block-start
import { Refine, AuthPage } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";

import { Wrapper } from "./Wrapper";
import { authProvider } from "./authProvider";

const RegisterPage = () => {
    const { Link } = useRouterContext();
    return Wrapper(
        <AuthPage
            type="register"
            backLink={
                <div
                    style={{
                        border: "1px dashed cornflowerblue",
                        marginTop: 5,
                    }}
                >
                    <Link to="/login">Go Back</Link>
                </div>
            }
        />,
    );
};
const LoginPage = () =>
    Wrapper(<AuthPage type="login" registerLink="/register" />);

const App = () => {
    return (
        <Refine
            authProvider={authProvider}
            routerProvider={{
                ...routerProvider,
                // highlight-next-line
                routes: [{ path: "/register", element: <RegisterPage /> }],
            }}
            // highlight-next-line
            LoginPage={LoginPage}
        />
    );
};
// visible-block-end
render(
    <Refine
        routerProvider={{
            ...RefineDemoReactRouterV6(["/register"]),
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

### `submitButton`

`submitButton` render your custom ReactNode to submit the form. Also, you can reach form values with the `onClick` property and use your own logic to submit the form.

```tsx live disableScroll hideCode url=http://localhost:3000/register
const { AuthPage, Refine, useNavigation, useRegister } = RefineCore;
const authProvider = {
    login: () => Promise.resolve(),
    register: () => Promise.resolve(),
    forgotPassword: () => Promise.resolve(),
    updatePassword: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    checkAuth: () => Promise.resolve(),
    checkError: () => Promise.resolve(),
    getPermissions: () => Promise.resolve(),
    getUserIdentity: () => Promise.resolve(),
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

// visible-block-start
import { Refine, AuthPage, useRegister } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";

import { Wrapper } from "./Wrapper";
import { authProvider } from "./authProvider";

const RegisterPage = () => {
    const { mutate: register } = useRegister();

    return Wrapper(
        <AuthPage
            type="register"
            backLink="/login"
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
                        onClick={(event) => {
                            event.preventDefault();
                            // you can access register form data from `event.target`
                            console.log(event.target.form);
                            // run your custom register logic(validation, etc.)
                            register();
                        }}
                    >
                        Register
                    </button>
                </div>
            }
        />,
    );
};
const LoginPage = () =>
    Wrapper(<AuthPage type="login" registerLink="/register" />);

const App = () => {
    return (
        <Refine
            authProvider={authProvider}
            routerProvider={{
                ...routerProvider,
                // highlight-next-line
                routes: [{ path: "/register", element: <RegisterPage /> }],
            }}
            // highlight-next-line
            LoginPage={LoginPage}
        />
    );
};
// visible-block-end
render(
    <Refine
        routerProvider={{
            ...RefineDemoReactRouterV6(["/register"]),
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
                    Register Succesful
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

## Reset Password

You can use the following props for the `<AuthPage>` component when the type is `"forgotPassword"`:

### `backLink`

`backLink` property defines the render ReactNode that will be used as a back link and also you can give a node to render.

```tsx live disableScroll hideCode url=http://localhost:3000/forgot-password
const { AuthPage, Refine, useNavigation, useRouterContext } = RefineCore;
const authProvider = {
    login: () => Promise.resolve(),
    register: () => Promise.resolve(),
    forgotPassword: () => Promise.resolve(),
    updatePassword: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    checkAuth: () => Promise.resolve(),
    checkError: () => Promise.resolve(),
    getPermissions: () => Promise.resolve(),
    getUserIdentity: () => Promise.resolve(),
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
                    width: "375px",
                }}
            >
                {children}
            </div>
        </div>
    );
};
// visible-block-start
import { Refine, AuthPage } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";

import { Wrapper } from "./Wrapper";
import { authProvider } from "./authProvider";

const ForgotPasswordPage = () => {
    const { Link } = useRouterContext();

    return Wrapper(
        <AuthPage
            type="forgotPassword"
            backLink={
                <div
                    style={{
                        border: "1px dashed cornflowerblue",
                        marginTop: 5,
                    }}
                >
                    <Link to="/login">Go Back</Link>
                </div>
            }
        />,
    );
};

const LoginPage = () =>
    Wrapper(<AuthPage type="login" forgotPasswordLink="/forgot-password" />);

const App = () => {
    return (
        <Refine
            authProvider={authProvider}
            routerProvider={{
                ...routerProvider,
                // highlight-start
                routes: [
                    { path: "/forgot-password", element: <ForgotPasswordPage /> },
                ],
                // highlight-end
            }}
            // highlight-next-line
            LoginPage={LoginPage}
        />
    );
};
// visible-block-end
render(
    <Refine
        routerProvider={{
            ...RefineDemoReactRouterV6(["/forgot-password"]),
            routes: [
                { path: "/login", element: <LoginPage /> },
                { path: "/forgot-password", element: <ForgotPasswordPage /> },
            ],
        }}
        LoginPage={AuthPage}
        DashboardPage={() => {
            const { replace } = useNavigation();

            return (
                <div>
                    Reset Password Succesful
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

`submitButton` render your custom ReactNode to submit the form. Also, you can reach form values with the `onClick` property and use your own logic to submit the form.

```tsx live disableScroll hideCode url=http://localhost:3000/forgot-password
const { AuthPage, Refine, useNavigation, useForgotPassword } = RefineCore;
const authProvider = {
    login: () => Promise.resolve(),
    register: () => Promise.resolve(),
    forgotPassword: () => Promise.resolve(),
    updatePassword: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    checkAuth: () => Promise.resolve(),
    checkError: () => Promise.resolve(),
    getPermissions: () => Promise.resolve(),
    getUserIdentity: () => Promise.resolve(),
};
// visible-block-start
import { Refine, AuthPage, useForgotPassword } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";

import { authProvider } from "./authProvider";

const ForgotPasswordPage = () => {
    const { mutate: forgotPassword } = useForgotPassword();
    const { replace } = useNavigation();

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    width: "375px",
                }}
            >
                <AuthPage
                    type="forgotPassword"
                    backLink="/login"
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
                                onClick={(event) => {
                                    event.preventDefault();
                                    // you can access forgot password form data from `event.target`
                                    console.log(event.target.form);
                                    // run your custom forgot password logic(validation, etc.)
                                    forgotPassword();
                                    replace("/login");
                                }}
                            >
                                Reset Password
                            </button>
                        </div>
                    }
                />
            </div>
        </div>
    );
};
const LoginPage = () => (
    <AuthPage type="login" forgotPasswordLink="/forgot-password" />
);

const App = () => {
    return (
        <Refine
            authProvider={authProvider}
            routerProvider={{
                ...routerProvider,
                // highlight-start
                routes: [
                    { path: "/forgot-password", element: <ForgotPasswordPage /> },
                ],
                // highlight-end
            }}
            // highlight-next-line
            LoginPage={LoginPage}
        />
    );
};
// visible-block-end
render(
    <Refine
        routerProvider={{
            ...RefineDemoReactRouterV6(["/forgot-password"]),
            routes: [
                { path: "/login", element: <LoginPage /> },
                { path: "/forgot-password", element: <ForgotPasswordPage /> },
            ],
        }}
        LoginPage={AuthPage}
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

## Update Password

You can use the following props for the `<AuthPage>` component when the type is `"updatePassword"`:

### `backLink`

`backLink` property defines the render ReactNode that will be used as a back link and also you can give a node to render.

```tsx live disableScroll hideCode url=http://localhost:3000/update-password
const { AuthPage, Refine, useNavigation, useRouterContext } = RefineCore;
const authProvider = {
    login: () => Promise.resolve(),
    register: () => Promise.resolve(),
    forgotPassword: () => Promise.resolve(),
    updatePassword: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    checkAuth: () => Promise.resolve(),
    checkError: () => Promise.resolve(),
    getPermissions: () => Promise.resolve(),
    getUserIdentity: () => Promise.resolve(),
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
// visible-block-start
import { Refine, AuthPage } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";

import { Wrapper } from "./Wrapper";
import { authProvider } from "./authProvider";

const UpdatePasswordPage = () => {
    const { Link } = useRouterContext();

    return Wrapper(
        <AuthPage
            type="updatePassword"
            backLink={
                <div
                    style={{
                        border: "1px dashed cornflowerblue",
                        marginTop: 5,
                    }}
                >
                    <Link to="/login">Go Back</Link>
                </div>
            }
        />,
    );
};

const LoginPage = () =>
    Wrapper(<AuthPage type="login" backLink="/update-password" />);

const App = () => {
    return (
        <Refine
            authProvider={authProvider}
            routerProvider={{
                ...routerProvider,
                // highlight-start
                routes: [
                    {
                        path: "/update-password",
                        element: <UpdatePasswordPage />,
                    },
                ],
                // highlight-end
            }}
            // highlight-next-line
            LoginPage={LoginPage}
        />
    );
};
// visible-block-end
render(
    <Refine
        routerProvider={{
            ...RefineDemoReactRouterV6(["/update-password"]),
            routes: [
                { path: "/login", element: <LoginPage /> },
                { path: "/update-password", element: <UpdatePasswordPage /> },
            ],
        }}
        LoginPage={AuthPage}
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

`submitButton` render your custom ReactNode to submit the form. Also, you can reach form values with the `onClick` property and use your own logic to submit the form.

```tsx live disableScroll hideCode url=http://localhost:3000/forgot-password
const { AuthPage, Refine, useNavigation, useUpdatePassword } = RefineCore;
const authProvider = {
    login: () => Promise.resolve(),
    register: () => Promise.resolve(),
    forgotPassword: () => Promise.resolve(),
    updatePassword: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    checkAuth: () => Promise.resolve(),
    checkError: () => Promise.resolve(),
    getPermissions: () => Promise.resolve(),
    getUserIdentity: () => Promise.resolve(),
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
// visible-block-start
import { Refine, AuthPage, useUpdatePassword } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";

import { Wrapper } from "./Wrapper";
import { authProvider } from "./authProvider";

const UpdatePasswordPage = () => {
    const { mutate: updatePassword } = useUpdatePassword();

    return Wrapper(
        <AuthPage
            type="updatePassword"
            backLink="/login"
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
                        onClick={(event) => {
                            event.preventDefault();
                            // you can access update password form data from `event.target`
                            console.log(event.target.form);
                            // run your custom update password logic(validation, etc.)
                            updatePassword();
                        }}
                    >
                        Update Password
                    </button>
                </div>
            }
        />,
    );
};
const LoginPage = () =>
    Wrapper(<AuthPage type="login" backLink="/update-password" />);

const App = () => {
    return (
        <Refine
            authProvider={authProvider}
            routerProvider={{
                ...routerProvider,
                // highlight-start
                routes: [
                    {
                        path: "/update-password",
                        element: <UpdatePasswordPage />,
                    },
                ],
                // highlight-end
            }}
            // highlight-next-line
            LoginPage={LoginPage}
        />
    );
};
// visible-block-end
render(
    <Refine
        routerProvider={{
            ...RefineDemoReactRouterV6(["/update-password"]),
            routes: [
                { path: "/login", element: <LoginPage /> },
                { path: "/update-password", element: <UpdatePasswordPage /> },
            ],
        }}
        LoginPage={AuthPage}
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

## API Reference

### Properties

| Property           | Description                                                                      | Type                                                          |
| ------------------ | -------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| type               | Render `<AuthPage>` forms by `type` property.                                    | `login` \| `register` \| `forgotPassword` \| `updatePassword` |
| registerLink       | Custom node that will be rendered as a register link to the `<AuthPage>`.        | `React.ReactNode`                                             |
| loginLink          | Custom node that will be rendered as a link to the `<AuthPage>`.                 | `React.ReactNode`                                             |
| forgotPasswordLink | Custom node that will be rendered as a forgot password link to the `<AuthPage>`. | `React.ReactNode`                                             |
| updatePasswordLink | Custom node that will be rendered as a update password link to the `<AuthPage>`. | `React.ReactNode`                                             |
| submitButton       | Custom node that will be used to submit form.                                    | `React.ReactNode`                                             |
| backLink           | Custom node that will be displayed as a back link.                               | `React.ReactNode`                                             |
| providers          | Render social logins if `type` is `"login"`.                                     | [`IProvider[]`](#interface)                                   |

### Interface

```tsx
interface IProvider {
    name: string;
    icon?: React.ReactNode;
    label?: string;
}
```
