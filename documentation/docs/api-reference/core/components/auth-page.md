---
id: auth-page
title: <AuthPage>
sidebar_label: <AuthPage>
description: <AuthPage> component from refine is an authentication page that can be used to login, register, forgot password, and update password.
source: packages/core/src/components/pages/auth/index.tsx
---

`<AuthPage>` component from **refine** contains authentication pages that can be used to login, register, forgot password, and update password.

Before using `<AuthPage>` component you need to add [authProvider](/api-reference/core/providers/auth-provider.md) that will be used to handle authentication.

```css live shared
body {
    background-color: #f5f5f5;
}
```

```tsx live shared
const { useLogout: useLogoutShared } = RefineCore;

window.__refineAuthStatus = false;

const authProvider = {
    login: async () => {
        window.__refineAuthStatus = true;
        return {
            success: true,
            redirectTo: "/",
        };
    },
    register: async () => {
        return {
            success: true,
        };
    },
    forgotPassword: async () => {
        return {
            success: true,
        };
    },
    updatePassword: async () => {
        return {
            success: true,
        };
    },
    logout: async () => {
        window.__refineAuthStatus = false;
        return {
            success: true,
            redirectTo: "/login",
        };
    },
    check: async () => ({
        authenticated: window.__refineAuthStatus,
    }),
    onError: async (error) => {
        console.error(error);
        return { error };
    },
    getPermissions: async () => ["admin"],
    getIdentity: async () => null,
};

const DashboardPage = () => {
    const { mutate: logout } = useLogoutShared();

    return (
        <div>
            <h1>Dashboard Page</h1>
            <button
                onClick={() => {
                    logout();
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

```tsx live disableScroll  previewHeight=333px url=http://localhost:3000/login
setInitialRoutes(["/login"]);

// visible-block-start
import { Refine, AuthPage, Authenticated } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, { CatchAllNavigate } from "@refinedev/react-router-v6";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { authProvider } from "./authProvider";

import { DashboardPage } from "pages/dashboard";

const App = () => {
    return (
        <BrowserRouter>
            <Refine
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                routerProvider={routerProvider}
                authProvider={authProvider}
            >
                <Routes>
                    <Route
                        element={
                            <Authenticated
                                fallback={<CatchAllNavigate to="/login" />}
                            >
                                <Outlet />
                            </Authenticated>
                        }
                    >
                        <Route index element={<DashboardPage />} />
                    </Route>
                    <Route element={<Authenticated fallback={<Outlet />} />}>
                        {/* highlight-next-line */}
                        <Route path="/login" element={<AuthPage />} />
                    </Route>
                </Routes>
            </Refine>
        </BrowserRouter>
    );
};
// visible-block-end
render(<App />);
```

## Types

`<AuthPage>` component has the following types:

-   [`login`](#login) - a type of login page and default type.
-   [`register`](#register) - a type of registration page.
-   [`forgotPassword`](#forgotpassword) - a type of forgot password page.
-   [`updatePassword`](#updatepassword) - a type of update password page.

### Login

You can use the following props for the `<AuthPage>` component when the type is `"login"`:

```tsx live disableScroll hideCode url=http://localhost:3000/login previewHeight=390px
setInitialRoutes(["/login"]);

// visible-block-start
import { Refine, AuthPage, Authenticated } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, { CatchAllNavigate } from "@refinedev/react-router-v6";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { authProvider } from "./authProvider";

import { DashboardPage } from "pages/dashboard";

const App = () => {
    return (
        <BrowserRouter>
            <Refine
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                routerProvider={routerProvider}
                authProvider={authProvider}
            >
                <Routes>
                    <Route
                        element={
                            <Authenticated
                                fallback={<CatchAllNavigate to="/login" />}
                            >
                                <Outlet />
                            </Authenticated>
                        }
                    >
                        <Route index element={<DashboardPage />} />
                    </Route>
                    <Route element={<Authenticated fallback={<Outlet />} />}>
                        {/* highlight-next-line */}
                        <Route path="/login" element={<AuthPage />} />
                    </Route>
                </Routes>
            </Refine>
        </BrowserRouter>
    );
};
// visible-block-end
render(<App />);
```

After form submission, the [`login`][login] method of the [`authProvider`][auth-provider] will be called with the form values.

```tsx title="src/authProvider.ts"
import { AuthBindings } from "@refinedev/core";

const authProvider: AuthBindings = {
    // --
    login: async ({ email, password, remember, providerName }) => {
        // You can handle the login process according to your needs.

        // If the process is successful.
        return {
            success: true,
        };

        return {
            success: false,
            error: {
                name: "Login Error",
                message: "Invalid email or password",
            },
        };
    },
    // --
};
```

### Register

The register page will be used to register new users. You can use the following props for the `<AuthPage>` component when the type is `"register"`:

```tsx live disableScroll hideCode url=http://localhost:3000/login previewHeight=390px
setInitialRoutes(["/register"]);

// visible-block-start
import { Refine, AuthPage, Authenticated } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, { CatchAllNavigate } from "@refinedev/react-router-v6";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { authProvider } from "./authProvider";

import { DashboardPage } from "pages/dashboard";

const App = () => {
    return (
        <BrowserRouter>
            <Refine
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                routerProvider={routerProvider}
                authProvider={authProvider}
            >
                <Routes>
                    <Route
                        element={
                            <Authenticated
                                fallback={<CatchAllNavigate to="/login" />}
                            >
                                <Outlet />
                            </Authenticated>
                        }
                    >
                        <Route index element={<DashboardPage />} />
                    </Route>
                    <Route element={<Authenticated fallback={<Outlet />} />}>
                        <Route path="/login" element={<AuthPage />} />
                        {/* highlight-next-line */}
                        <Route
                            path="/register"
                            element={<AuthPage type="register" />}
                        />
                    </Route>
                </Routes>
            </Refine>
        </BrowserRouter>
    );
};
// visible-block-end
render(<App />);
```

After form submission, the [`register`][register] method of the [`authProvider`][auth-provider] will be called with the form values.

```tsx title="src/authProvider.ts"
import { AuthBindings } from "@refinedev/core";

const authProvider: AuthBindings = {
    // --
    register: async ({ email, password, providerName }) => {
        // You can handle the register process according to your needs.

        // If the process is successful.
        return {
            success: true,
        };

        return {
            success: false,
            error: {
                name: "Register Error",
                message: "Invalid email or password",
            },
        };
    },
    // --
};
```

### ForgotPassword

The `forgotPassword` type is a page that allows users to reset their passwords. You can use this page to reset your password.

```tsx live url=http://localhost:3000/forgot-password
setInitialRoutes(["/forgot-password"]);
setRefineProps({ Sider: () => null });

// visible-block-start
import { Refine, AuthPage, Authenticated } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, { CatchAllNavigate } from "@refinedev/react-router-v6";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { authProvider } from "./authProvider";

import { DashboardPage } from "pages/dashboard";

const App = () => {
    return (
        <BrowserRouter>
            <Refine
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                routerProvider={routerProvider}
                authProvider={authProvider}
            >
                <Routes>
                    <Route
                        element={
                            <Authenticated
                                fallback={<CatchAllNavigate to="/login" />}
                            >
                                <Outlet />
                            </Authenticated>
                        }
                    >
                        <Route index element={<DashboardPage />} />
                    </Route>
                    <Route element={<Authenticated fallback={<Outlet />} />}>
                        <Route path="/login" element={<AuthPage />} />
                        <Route
                            path="/register"
                            element={<AuthPage type="register" />}
                        />
                        {/* highlight-next-line */}
                        <Route
                            path="/forgot-password"
                            element={<AuthPage type="forgotPassword" />}
                        />
                    </Route>
                </Routes>
            </Refine>
        </BrowserRouter>
    );
};
// visible-block-end
render(<App />);
```

After form submission, the [`forgotPassword`][forgot-password] method of the [`authProvider`][auth-provider] will be called with the form values.

```tsx title="src/authProvider.ts"
import { AuthBindings } from "@refinedev/core";

const authProvider: AuthBindings = {
    // --
    forgotPassword: async ({ email }) => {
        // You can handle the reset password process according to your needs.

        // If process is successful.
        return {
            success: true,
        };

        return {
            success: false,
            error: {
                name: "Forgot Password Error",
                message: "Invalid email or password",
            },
        };
    },
    // --
};
```

### UpdatePassword

The `updatePassword` type is the page used to update the password of the user.

```tsx live url=http://localhost:3000/update-password
setInitialRoutes(["/update-password"]);
setRefineProps({ Sider: () => null });

// visible-block-start
import { Refine, AuthPage, Authenticated } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, { CatchAllNavigate } from "@refinedev/react-router-v6";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { authProvider } from "./authProvider";

import { DashboardPage } from "pages/dashboard";

const App = () => {
    return (
        <BrowserRouter>
            <Refine
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                routerProvider={routerProvider}
                authProvider={authProvider}
            >
                <Routes>
                    <Route
                        element={
                            <Authenticated
                                fallback={<CatchAllNavigate to="/login" />}
                            >
                                <Outlet />
                            </Authenticated>
                        }
                    >
                        <Route index element={<DashboardPage />} />
                    </Route>
                    <Route element={<Authenticated fallback={<Outlet />} />}>
                        <Route path="/login" element={<AuthPage />} />
                        <Route
                            path="/register"
                            element={<AuthPage type="register" />}
                        />
                        <Route
                            path="/forgot-password"
                            element={<AuthPage type="forgotPassword" />}
                        />
                        {/* highlight-next-line */}
                        <Route
                            path="/update-password"
                            element={<AuthPage type="updatePassword" />}
                        />
                    </Route>
                </Routes>
            </Refine>
        </BrowserRouter>
    );
};
// visible-block-end
render(<App />);
```

After form submission, the [`updatePassword`][update-password] method of the [`authProvider`][auth-provider] will be called with the form values.

```tsx title="src/authProvider.ts"
import { AuthBindings } from "@refinedev/core";

const authProvider: AuthBindings = {
    // --
    updatePassword: async ({ password, confirmPassword }) => {
        // You can handle the update password process according to your needs.

        // If the process is successful.
        return {
            success: true,
        };

        return {
            success: false,
            error: {
                name: "Update Password Error",
                message: "Invalid email or password",
            },
        };
    },
    // --
};
```

## Props

### `providers`

:::info
`providers` property is only available for types `login` and `register`.
:::

`providers` property defines the list of providers used to handle login authentication. `providers` accepts an array of `Provider` type. Check out the [Interface](#interface) section for more information.

```tsx
const LoginPage = () => {
    return (
        <AuthPage
            providers={[
                {
                    name: "github",
                    icon: <svg>{/* ... */}</svg>,
                    label: "Sign in with GitHub",
                },
                {
                    name: "google",
                    icon: <svg>{/* ... */}</svg>,
                    label: "Sign in with Google",
                },
            ]}
        />
    );
};
```

### `rememberMe`

:::info
`rememberMe` property is only available for type `login`.
:::

`rememberMe` property defines to render your own remember me component or you can pass `false` to don't render it.

```tsx
const LoginPage = () => {
    return (
        <AuthPage
            type="login"
            // highlight-start
            rememberMe={
                <div
                    style={{
                        border: "1px dashed cornflowerblue",
                        padding: 3,
                    }}
                >
                    <input name="CustomRememberMe" type="checkbox" /> Custom
                    remember me
                </div>
            }
            // highlight-end
        />
    );
};
```

### `loginLink`

:::info
`loginLink` property is only available for types `register` and `forgotPassword`.
:::

`loginLink` property defines the link to the login page and also you can give a node to render. The default value is `"/login"`.

```tsx
const MyRegisterPage = () => {
    return (
        <AuthPage
            type="register"
            // highlight-start
            loginLink={
                <div
                    style={{
                        border: "1px dashed cornflowerblue",
                        padding: 3,
                    }}
                >
                    <Link to="/login">Login</Link>
                </div>
            }
            // highlight-end
        />
    );
};
```

### `registerLink`

:::info
`registerLink` property is only available for type `login`.
:::

`registerLink` property defines the link to the registration page and also you can give a node to render. The default value is `"/register"`.

```tsx
const MyLoginPage = () => {
    return (
        <AuthPage
            type="login"
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
```

### `forgotPasswordLink`

:::info
`forgotPasswordLink` property is only available for type `login`.
:::

`forgotPasswordLink` property defines the link to the forgot password page and also you can give a node to render. The default value is `"/forgot-password"`.

```tsx
const MyLoginPage = () => {
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
```

### `wrapperProps`

`wrapperProps` uses for passing props to the wrapper component. In the example below you can see that the background color is changed with `wrapperProps`

```tsx
const MyLoginPage = () => {
    return (
        <AuthPage
            type="login"
            // highlight-start
            wrapperProps={{
                style: {
                    background:
                        "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                    position: "absolute",
                    top: "0px",
                    right: "0px",
                    bottom: "0px",
                    left: "0px",
                },
            }}
            // highlight-end
        />
    );
};
```

### `contentProps`

`contentProps` uses for passing props to the content component which is the card component. In the example below you can see that the title, header, and content styles are changed with `contentProps`.

```tsx
const MyLoginPage = () => {
    return (
        <AuthPage
            type="login"
            // highlight-start
            contentProps={{
                style: {
                    background:
                        "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                },
            }}
            // highlight-end
        />
    );
};
```

### `formProps`

`formProps` uses for passing props to the form component.

```tsx
const MyLoginPage = () => {
    return (
        <AuthPage
            type="login"
            // highlight-start
            formProps={{
                onSubmit: (e: any) => {
                    e.preventDefault();

                    const email = e.target.email.value;
                    const password = e.target.password.value;

                    alert(
                        JSON.stringify({
                            email,
                            password,
                        }),
                    );
                },
            }}
            // highlight-end
        />
    );
};
```

### `renderContent`

`renderContent` uses to render the form content. You can use this property to render your own content or `renderContent` gives you default content you can use to add some extra elements to the content.

```tsx
const MyLoginPage = () => {
    return (
        <AuthPage
            type="login"
            // highlight-start
            renderContent={(content: React.ReactNode) => {
                return (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <h1>Extra Header</h1>
                        {content}
                        <h2>Extra Footer</h2>
                    </div>
                );
            }}
            // highlight-end
        />
    );
};
```

## API Reference

### Properties

<PropsTable module="@refinedev/core/AuthPage"/>

### Interface

```tsx
interface OAuthProvider {
    name: string;
    icon?: React.ReactNode;
    label?: string;
}
```

[auth-provider]: /docs/api-reference/core/providers/auth-provider/
[login]: /docs/api-reference/core/providers/auth-provider/#login-
[register]: /docs/api-reference/core/providers/auth-provider/#register
[forgot-password]: /docs/api-reference/core/providers/auth-provider/#forgotpassword
[update-password]: /docs/api-reference/core/providers/auth-provider/#updatepassword
[get-permissions]: /docs/api-reference/core/providers/auth-provider/#getpermissions-
[check-auth]: /docs/api-reference/core/providers/auth-provider/#check-
[logout]: /docs/api-reference/core/providers/auth-provider/#logout-
