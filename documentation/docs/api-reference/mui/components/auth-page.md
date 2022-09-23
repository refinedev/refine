---
id: mui-auth-page
title: <AuthPage>
sidebar_label: <AuthPage>
description: <AuthPage> component from refine is a authentication page that can be used to login, register, forgot password and update password.
---

`<AuthPage>` component from **refine** for **Material UI** contains authentication pages that can be used to login, register, forgot password and update password.

Before using `<AuthPage>` component you need to add [authProvider](/api-reference/core/providers/auth-provider.md) that will be used to handle authentication.

## **Usage**

`<AuthPage>` component can be used like below 👇🏻

```tsx url=http://localhost:3000/login
const { useNavigation } = RefineCore;
const { AuthPage } = RefineMui;

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
import { Refine, useNavigation } from "@pankod/refine-core";
import { AuthPage } from "@pankod/refine-mui";

import { authProvider } from "./authProvider";

const App = () => {
    return (
        <Refine
            authProvider={authProvider}
            // highlight-next-line
            LoginPage={AuthPage}
            resources={[
                {
                    name: "home",
                    list: () => {
                        const { replace } = useNavigation();

                        return (
                            <div>
                                Home Page
                                <br />
                                <button
                                    onClick={() => {
                                        replace("/login");
                                    }}
                                >
                                    Logout
                                </button>
                            </div>
                        );
                    },
                },
            ]}
        />
    );
};
// visible-block-end
render(
    <RefineMuiDemo
        routerProvider={{
            ...RefineDemoReactRouterV6(["/login"]),
            routes: [{ path: "/login", element: <AuthPage /> }],
        }}
        authProvider={authProvider}
        resources={[
            {
                name: "home",
                list: () => {
                    const { replace } = useNavigation();

                    return (
                        <div>
                            Home Page
                            <br />
                            <button
                                onClick={() => {
                                    replace("/login");
                                }}
                            >
                                Logout
                            </button>
                        </div>
                    );
                },
            },
        ]}
    />,
);
```

## Types

`<AuthPage>` component has the following types:

-   `login` - a type of login page and default type.
-   `register` - a type of registration page.
-   `forgotPassword` - a type of forgot password page.
-   `updatePassword` - type of update password page.

## Login

`login` will be used as the default type of the `<AuthPage>` component. The login page will be used to log in to the system.

You can use the following props for the `<AuthPage>` component when the type is `"login"`:

### Default

```tsx url=http://localhost:3000/login
const { useNavigation } = RefineCore;
const { AuthPage } = RefineMui;

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
import { Refine, useNavigation } from "@pankod/refine-core";
import { AuthPage } from "@pankod/refine-mui";

import { authProvider } from "./authProvider";

const App = () => {
    return (
        <Refine
            authProvider={authProvider}
            // highlight-next-line
            LoginPage={AuthPage}
            resources={[
                {
                    name: "home",
                    list: () => {
                        const { replace } = useNavigation();

                        return (
                            <div>
                                Home Page
                                <br />
                                <button
                                    onClick={() => {
                                        replace("/login");
                                    }}
                                >
                                    Logout
                                </button>
                            </div>
                        );
                    },
                },
            ]}
        />
    );
};
// visible-block-end
render(
    <RefineMuiDemo
        routerProvider={{
            ...RefineDemoReactRouterV6(["/login"]),
            routes: [{ path: "/login", element: <AuthPage /> }],
        }}
        authProvider={authProvider}
        resources={[
            {
                name: "home",
                list: () => {
                    const { replace } = useNavigation();

                    return (
                        <div>
                            Home Page
                            <br />
                            <button
                                onClick={() => {
                                    replace("/login");
                                }}
                            >
                                Logout
                            </button>
                        </div>
                    );
                },
            },
        ]}
    />,
);
```

### `registerLink`

`registerLink` property defines the link to the registration page and also you can give a node to render. Default value is `"/register"`.

```tsx previewHeight=500px hideCode url=http://localhost:3000/login
const { AuthPage } = RefineMui;
const { useRouterContext, useNavigation } = RefineCore;

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
import { Refine, useRouterContext, useNavigation } from "@pankod/refine-core";
import { AuthPage } from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";

import { authProvider } from "./authProvider";

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
                    {
                        path: "/register",
                        element: <Auth type="register" />,
                    },
                ],
            }}
            resources={[
                {
                    name: "home",
                    list: () => {
                        const { replace } = useNavigation();

                        return (
                            <div>
                                Home Page
                                <button
                                    onClick={() => {
                                        replace("/login");
                                    }}
                                >
                                    Logout
                                </button>
                            </div>
                        );
                    },
                },
            ]}
            LoginPage={Auth}
        />
    );
};
// visible-block-end
render(
    <RefineMuiDemo
        routerProvider={{
            ...RefineDemoReactRouterV6(["/login"]),
            routes: [
                {
                    path: "/login",
                    element: <Auth type="login" />,
                },
                {
                    path: "/register",
                    element: <Auth type="register" />,
                },
            ],
        }}
        authProvider={authProvider}
        resources={[
            {
                name: "home",
                list: () => {
                    const { replace } = useNavigation();

                    return (
                        <div>
                            Home Page
                            <button
                                onClick={() => {
                                    replace("/login");
                                }}
                            >
                                Logout
                            </button>
                        </div>
                    );
                },
            },
        ]}
    />,
);
```

### `providers`

`providers` property defines the list of providers used to handle login authentication.

```tsx previewHeight=500px hideCode url=http://localhost:3000/login
const { AuthPage } = RefineMui;
const { useRouterContext, useNavigation } = RefineCore;

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
import { Refine, useRouterContext, useNavigation } from "@pankod/refine-core";
import { AuthPage } from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

import { authProvider } from "./authProvider";

const App = () => {
    return (
        <Refine
            authProvider={authProvider}
            resources={[
                {
                    name: "home",
                    list: () => {
                        const { replace } = useNavigation();

                        return (
                            <div>
                                Home Page
                                <button
                                    onClick={() => {
                                        replace("/login");
                                    }}
                                >
                                    Logout
                                </button>
                            </div>
                        );
                    },
                },
            ]}
            // highlight-start
            LoginPage={() => (
                <AuthPage
                    providers={[
                        {
                            name: "google",
                            label: "Sign in with Google",
                            icon: (
                                <GoogleIcon
                                    style={{ fontSize: 24 }}
                                />
                            ),
                        },
                        {
                            name: "github",
                            label: "Sign in with GitHub",
                            icon: (
                                <GitHubIcon
                                    style={{ fontSize: 24 }}
                                />
                            ),
                        },
                    ]}
                />
            )}
            // highlight-end
        />
    );
};
// visible-block-end
render(
    <RefineMuiDemo
        routerProvider={{
            ...RefineDemoReactRouterV6(["/login"]),
            routes: [
                {
                    path: "/login",
                    element: (
                        <AuthPage
                            providers={[
                                {
                                    name: "google",
                                    label: "Sign in with Google",
                                    icon: (
                                        <GoogleIcon
                                            style={{ fontSize: 24 }}
                                        />
                                    ),
                                },
                                {
                                    name: "github",
                                    label: "Sign in with GitHub",
                                    icon: (
                                        <GitHubIcon
                                            style={{ fontSize: 24 }}
                                        />
                                    ),
                                },
                            ]}
                        />
                    ),
                },
            ],
        }}
        authProvider={authProvider}
        resources={[
            {
                name: "home",
                list: () => {
                    const { replace } = useNavigation();

                    return (
                        <div>
                            Home Page
                            <button
                                onClick={() => {
                                    replace("/login");
                                }}
                            >
                                Logout
                            </button>
                        </div>
                    );
                },
            },
        ]}
    />,
);
```

### `rememberMe`

`rememberMe` property defines to render your own remember me component or you can pass `false` to don't render it.

:::info
You have to wrap your remember me component with `Form.Item` component from **antd** and pass the `name` prop to it then you can access its value from the `formProps` `onFinish` function with `formValues`.
:::

```tsx previewHeight=500px hideCode url=http://localhost:3000/login
const { AuthPage, Form, Checkbox } = RefineMui;
const { useNavigation } = RefineCore;

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

import { Refine, useNavigation } from "@pankod/refine-core";
import { AuthPage, FormControlLabel, Checkbox } from "@pankod/refine-mui";

import { authProvider } from "./authProvider";

const App = () => {
    return (
        <Refine
            authProvider={authProvider}
            // highlight-start
            LoginPage={
                <AuthPage
                    rememberMe={
                        <FormControlLabel
                            sx={{
                                span: {
                                    fontSize: "12px",
                                    color: "text.secondary",
                                },
                            }}
                            color="secondary"
                            control={
                                <Checkbox size="small" id="remember" />
                            }
                            label="Remember me"
                        />
                    }
                />
            }
            // highlight-end
            resources={[
                {
                    name: "home",
                    list: () => {
                        const { replace } = useNavigation();

                        return (
                            <div>
                                Home Page
                                <button
                                    onClick={() => {
                                        replace("/login");
                                    }}
                                >
                                    Logout
                                </button>
                            </div>
                        );
                    },
                },
            ]}
        />
    );
};
// visible-block-end
render(
    <RefineMuiDemo
        routerProvider={{
            ...RefineDemoReactRouterV6(["/login"]),
            routes: [
                {
                    path: "/login",
                    element: (
                        <AuthPage
                            rememberMe={
                                <FormControlLabel
                                    sx={{
                                        span: {
                                            fontSize: "12px",
                                            color: "text.secondary",
                                        },
                                    }}
                                    color="secondary"
                                    control={
                                        <Checkbox size="small" id="remember" />
                                    }
                                    label="Remember me"
                                />
                            }
                        />
                    ),
                },
            ],
        }}
        authProvider={authProvider}
        resources={[
            {
                name: "home",
                list: () => {
                    const { replace } = useNavigation();

                    return (
                        <div>
                            Home Page
                            <button
                                onClick={() => {
                                    replace("/login");
                                }}
                            >
                                Logout
                            </button>
                        </div>
                    );
                },
            },
        ]}
    />,
);
```

### `wrapperProps`

`wrapperProps` uses for passing props to the wrapper component. In the example below you can see that the background color is changed with `wrapperProps`

```tsx previewHeight=500px hideCode url=http://localhost:3000/login
const { AuthPage } = RefineMui;
const { useNavigation } = RefineCore;

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
import { Refine, useNavigation } from "@pankod/refine-core";
import { AuthPage } from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";

import { authProvider } from "./authProvider";

const App = () => {
    return (
        <Refine
            authProvider={authProvider}
            LoginPage={() => (
                <AuthPage
                    // highlight-start
                    wrapperProps={{
                        style: {
                            background: "#331049",
                        },
                    }}
                    // highlight-end
                />
            )}
            resources={[
                {
                    name: "home",
                    list: () => {
                        const { replace } = useNavigation();

                        return (
                            <div>
                                Home Page
                                <button
                                    onClick={() => {
                                        replace("/login");
                                    }}
                                >
                                    Logout
                                </button>
                            </div>
                        );
                    },
                },
            ]}
        />
    );
};
// visible-block-end
render(
    <RefineMuiDemo
        routerProvider={{
            ...RefineDemoReactRouterV6(["/login"]),
            routes: [
                {
                    path: "/login",
                    element: (
                        <AuthPage
                            wrapperProps={{
                                style: {
                                    background: "#331049",
                                },
                            }}
                        />
                    ),
                },
            ],
        }}
        authProvider={authProvider}
        resources={[
            {
                name: "home",
                list: () => {
                    const { replace } = useNavigation();

                    return (
                        <div>
                            Home Page
                            <button
                                onClick={() => {
                                    replace("/login");
                                }}
                            >
                                Logout
                            </button>
                        </div>
                    );
                },
            },
        ]}
    />,
);
```

### `contentProps`

`contentProps` uses for passing props to the content component which is the card component. In the example below you can see that the title, header and content styles are changed with `contentProps`.

```tsx previewHeight=500px hideCode url=http://localhost:3000/login
const { AuthPage } = RefineMui;
const { useNavigation } = RefineCore;

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
import { Refine, useNavigation } from "@pankod/refine-core";
import { AuthPage } from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";

import { authProvider } from "./authProvider";

const App = () => {
    return (
        <Refine
            authProvider={authProvider}
            LoginPage={() => (
                <AuthPage
                    // highlight-start
                    contentProps={{
                        title: "Login",
                        headStyle: {
                            background: "cornflowerblue",
                            color: "white",
                        },
                        bodyStyle: {
                            background: "#673ab742",
                        },
                    }}
                    // highlight-end
                />
            )}
            resources={[
                {
                    name: "home",
                    list: () => {
                        const { replace } = useNavigation();

                        return (
                            <div>
                                Home Page
                                <button
                                    onClick={() => {
                                        replace("/login");
                                    }}
                                >
                                    Logout
                                </button>
                            </div>
                        );
                    },
                },
            ]}
        />
    );
};
// visible-block-end
render(
    <RefineMuiDemo
        routerProvider={{
            ...RefineDemoReactRouterV6(["/login"]),
            routes: [
                {
                    path: "/login",
                    element: (
                        <AuthPage
                            contentProps={{
                                title: "Login",
                                headStyle: {
                                    background: "cornflowerblue",
                                    color: "white",
                                },
                                bodyStyle: {
                                    background: "#673ab742",
                                },
                            }}
                        />
                    ),
                },
            ],
        }}
        authProvider={authProvider}
        resources={[
            {
                name: "home",
                list: () => {
                    const { replace } = useNavigation();

                    return (
                        <div>
                            Home Page
                            <button
                                onClick={() => {
                                    replace("/login");
                                }}
                            >
                                Logout
                            </button>
                        </div>
                    );
                },
            },
        ]}
    />,
);
```

### `formProps`

`formProps` uses for passing props to the form component. In the example below you can see that the `initialValues` are changed with `formProps` and also the `onFinish` function is changed.

```tsx previewHeight=500px hideCode url=http://localhost:3000/login
const { AuthPage } = RefineMui;
const { useNavigation } = RefineCore;

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
import { Refine, useNavigation } from "@pankod/refine-core";
import { AuthPage } from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";

import { authProvider } from "./authProvider";

const App = () => {
    return (
        <Refine
            authProvider={authProvider}
            LoginPage={() => (
                <AuthPage
                    // highlight-start
                    formProps={{
                        initialValues: {
                            email: "demo@refine.dev",
                            password: "demo",
                        },
                        onFinish: (formValues) =>
                            alert(JSON.stringify(formValues, null, 2)),
                    }}
                    // highlight-end
                />
            )}
            resources={[
                {
                    name: "home",
                    list: () => {
                        const { replace } = useNavigation();

                        return (
                            <div>
                                Home Page
                                <button
                                    onClick={() => {
                                        replace("/login");
                                    }}
                                >
                                    Logout
                                </button>
                            </div>
                        );
                    },
                },
            ]}
        />
    );
};
// visible-block-end
render(
    <RefineMuiDemo
        routerProvider={{
            ...RefineDemoReactRouterV6(["/login"]),
            routes: [
                {
                    path: "/login",
                    element: (
                        <AuthPage
                            formProps={{
                                initialValues: {
                                    email: "demo@refine.dev",
                                    password: "demo",
                                },
                                onFinish: (formValues) =>
                                    alert(JSON.stringify(formValues, null, 2)),
                            }}
                        />
                    ),
                },
            ],
        }}
        authProvider={authProvider}
        resources={[
            {
                name: "home",
                list: () => {
                    const { replace } = useNavigation();

                    return (
                        <div>
                            Home Page
                            <button
                                onClick={() => {
                                    replace("/login");
                                }}
                            >
                                Logout
                            </button>
                        </div>
                    );
                },
            },
        ]}
    />,
);
```

### `renderContent`

`renderContent` uses to render the form content. You can use this property to render your own content or `renderContent` gives you default content you can use to add some extra elements to the content.

```tsx previewHeight=500px hideCode url=http://localhost:3000/login
const { AuthPage } = RefineMui;
const { useRouterContext, useNavigation } = RefineCore;

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
import { Refine, useRouterContext } from "@pankod/refine-core";
import { AuthPage } from "@pankod/refine-mui";

import { authProvider } from "./authProvider";

const App = () => {
    return (
        <Refine
            authProvider={authProvider}
            // highlight-start
            LoginPage={() => (
                <AuthPage
                    contentProps={{
                        style: {
                            width: "400px",
                        },
                    }}
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
                                <h1>Extra Footer</h1>
                            </div>
                        );
                    }}
                />
            )}
            // highlight-end
            resources={[
                {
                    name: "home",
                    list: () => {
                        const { replace } = useNavigation();

                        return (
                            <div>
                                Home Page
                                <button
                                    onClick={() => {
                                        replace("/login");
                                    }}
                                >
                                    Logout
                                </button>
                            </div>
                        );
                    },
                },
            ]}
        />
    );
};
// visible-block-end
render(
    <RefineMuiDemo
        routerProvider={{
            ...RefineDemoReactRouterV6(["/login"]),
            routes: [
                {
                    path: "/login",
                    element: (
                        <AuthPage
                            contentProps={{
                                style: {
                                    width: "400px",
                                },
                            }}
                            renderContent={(content: React.ReactNode) => {
                                return (
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            width: "100%",
                                        }}
                                    >
                                        <h1>Extra Header</h1>
                                        {content}
                                        <h1>Extra Footer</h1>
                                    </div>
                                );
                            }}
                        />
                    ),
                },
            ],
        }}
        authProvider={authProvider}
        resources={[
            {
                name: "home",
                list: () => {
                    const { replace } = useNavigation();

                    return (
                        <div>
                            Home Page
                            <button
                                onClick={() => {
                                    replace("/login");
                                }}
                            >
                                Logout
                            </button>
                        </div>
                    );
                },
            },
        ]}
    />,
);
```

## Register

The register page will be used to register new users. You can use the following props for the `<AuthPage>` component when the type is `"register"`:

### Default

```tsx url=http://localhost:3000/register
const { useNavigation } = RefineCore;
const { AuthPage } = RefineMui;

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
import { Refine, useNavigation } from "@pankod/refine-core";
import { AuthPage } from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";

import { authProvider } from "./authProvider";

const App = () => {
    return (
        <Refine
            authProvider={authProvider}
            routerProvider={{
                ...routerProvider,
                routes: [
                    {
                        path: "/register",
                        element: <Auth type="register" />,
                    },
                ],
            }}
            LoginPage={AuthPage}
            resources={[
                {
                    name: "home",
                    list: () => {
                        const { replace } = useNavigation();

                        return (
                            <div>
                                Home Page
                                <br />
                                <button
                                    onClick={() => {
                                        replace("/login");
                                    }}
                                >
                                    Logout
                                </button>
                            </div>
                        );
                    },
                },
            ]}
        />
    );
};
// visible-block-end
render(
    <RefineMuiDemo
        routerProvider={{
            ...RefineDemoReactRouterV6(["/register"]),
            routes: [
                { path: "/login", element: <AuthPage /> },
                { path: "/register", element: <AuthPage type="register" /> },
            ],
        }}
        authProvider={authProvider}
        resources={[
            {
                name: "home",
                list: () => {
                    const { replace } = useNavigation();

                    return (
                        <div>
                            Home Page
                            <br />
                            <button
                                onClick={() => {
                                    replace("/login");
                                }}
                            >
                                Logout
                            </button>
                        </div>
                    );
                },
            },
        ]}
    />,
);
```

### `loginLink`

`loginLink` property defines the link to the login page and also you can give a node to render. Default value is `"/login"`.

```tsx previewHeight=500px hideCode url=http://localhost:3000/register
const { AuthPage } = RefineMui;
const { useRouterContext, useNavigation } = RefineCore;

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
import { Refine, useRouterContext, useNavigation } from "@pankod/refine-core";
import { AuthPage } from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";

import { authProvider } from "./authProvider";

const Auth = (props) => {
    const { Link } = useRouterContext();

    return (
        <AuthPage
            {...props}
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

const App = () => {
    return (
        <Refine
            authProvider={authProvider}
            // highlight-start
            routerProvider={{
                ...routerProvider,
                routes: [
                    {
                        path: "/register",
                        element: <Auth type="register" />,
                    },
                ],
            }}
            // highlight-end
            LoginPage={Auth}
            resources={[
                {
                    name: "home",
                    list: () => {
                        const { replace } = useNavigation();

                        return (
                            <div>
                                Home Page
                                <button
                                    onClick={() => {
                                        replace("/login");
                                    }}
                                >
                                    Logout
                                </button>
                            </div>
                        );
                    },
                },
            ]}
        />
    );
};
// visible-block-end
render(
    <RefineMuiDemo
        routerProvider={{
            ...RefineDemoReactRouterV6(["/register"]),
            routes: [
                {
                    path: "/login",
                    element: <Auth />,
                },
                {
                    path: "/register",
                    element: <Auth type="register" />,
                },
            ],
        }}
        authProvider={authProvider}
        resources={[
            {
                name: "home",
                list: () => {
                    const { replace } = useNavigation();

                    return (
                        <div>
                            Home Page
                            <button
                                onClick={() => {
                                    replace("/login");
                                }}
                            >
                                Logout
                            </button>
                        </div>
                    );
                },
            },
        ]}
    />,
);
```

### `wrapperProps`

`wrapperProps` uses for passing props to the wrapper component. In the example below you can see that the background color is changed with `wrapperProps`

```tsx previewHeight=500px hideCode url=http://localhost:3000/register
const { AuthPage } = RefineMui;
const { useNavigation } = RefineCore;

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
import { Refine, useNavigation } from "@pankod/refine-core";
import { AuthPage } from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";

import { authProvider } from "./authProvider";

const App = () => {
    return (
        <Refine
            authProvider={authProvider}
            routerProvider={{
                ...routerProvider,
                routes: [
                    {
                        path: "/register",
                        element: (
                            // highlight-start
                            <AuthPage
                                type="register"
                                wrapperProps={{
                                    style: {
                                        background: "#331049",
                                    },
                                }}
                                loginLink={false}
                            />
                            // highlight-end
                        ),
                    },
                ],
            }}
            LoginPage={AuthPage}
            resources={[
                {
                    name: "home",
                    list: () => {
                        const { replace } = useNavigation();

                        return (
                            <div>
                                Home Page
                                <button
                                    onClick={() => {
                                        replace("/login");
                                    }}
                                >
                                    Logout
                                </button>
                            </div>
                        );
                    },
                },
            ]}
        />
    );
};
// visible-block-end
render(
    <RefineMuiDemo
        routerProvider={{
            ...RefineDemoReactRouterV6(["/register"]),
            routes: [
                {
                    path: "/login",
                    element: <AuthPage />,
                },
                {
                    path: "/register",
                    element: (
                        <AuthPage
                            type="register"
                            wrapperProps={{
                                style: {
                                    background: "#331049",
                                },
                            }}
                            loginLink={false}
                        />
                    ),
                },
            ],
        }}
        authProvider={authProvider}
        resources={[
            {
                name: "home",
                list: () => {
                    const { replace } = useNavigation();

                    return (
                        <div>
                            Home Page
                            <button
                                onClick={() => {
                                    replace("/login");
                                }}
                            >
                                Logout
                            </button>
                        </div>
                    );
                },
            },
        ]}
    />,
);
```

### `contentProps`

`contentProps` uses for passing props to the content component which is the form component. In the example below you can see that the title, header and content styles are changed with `contentProps`.

```tsx previewHeight=500px hideCode url=http://localhost:3000/register
const { AuthPage } = RefineMui;
const { useRouterContext, useNavigation } = RefineCore;

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
import { Refine, useNavigation } from "@pankod/refine-core";
import { AuthPage } from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";

import { authProvider } from "./authProvider";

const App = () => {
    return (
        <Refine
            authProvider={authProvider}
            routerProvider={{
                ...routerProvider,
                routes: [
                    {
                        path: "/register",
                        element: (
                            <AuthPage
                                type="register"
                                loginLink={false}
                                // highlight-start
                                contentProps={{
                                    title: "Register",
                                    headStyle: {
                                        background: "cornflowerblue",
                                        color: "white",
                                    },
                                    bodyStyle: {
                                        background: "#673ab742",
                                    },
                                }}
                                // highlight-end
                            />
                        ),
                    },
                ],
            }}
            resources={[
                {
                    name: "home",
                    list: () => {
                        const { replace } = useNavigation();

                        return (
                            <div>
                                Home Page
                                <button
                                    onClick={() => {
                                        replace("/login");
                                    }}
                                >
                                    Logout
                                </button>
                            </div>
                        );
                    },
                },
            ]}
        />
    );
};
// visible-block-end
render(
    <RefineMuiDemo
        routerProvider={{
            ...RefineDemoReactRouterV6(["/register"]),
            routes: [
                {
                    path: "/register",
                    element: (
                        <AuthPage
                            type="register"
                            loginLink={false}
                            contentProps={{
                                title: "Register",
                                headStyle: {
                                    background: "cornflowerblue",
                                    color: "white",
                                },
                                bodyStyle: {
                                    background: "#673ab742",
                                },
                            }}
                        />
                    ),
                },
            ],
        }}
        authProvider={authProvider}
        resources={[
            {
                name: "home",
                list: () => {
                    const { replace } = useNavigation();

                    return (
                        <div>
                            Home Page
                            <button
                                onClick={() => {
                                    replace("/login");
                                }}
                            >
                                Logout
                            </button>
                        </div>
                    );
                },
            },
        ]}
    />,
);
```

### `formProps`

`formProps` uses for passing props to the form component. In the example below you can see that the `initialValues` are changed with `formProps` and also the `onFinish` function is changed.

```tsx previewHeight=500px hideCode url=http://localhost:3000/register
const { AuthPage } = RefineMui;
const { useNavigation } = RefineCore;

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
import { Refine, useNavigation } from "@pankod/refine-core";
import { AuthPage } from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";

import { authProvider } from "./authProvider";

const App = () => {
    return (
        <Refine
            authProvider={authProvider}
            LoginPage={() => (
                <AuthPage
                    type="register"
                    // highlight-start
                    formProps={{
                        initialValues: {
                            email: "demo@refine.dev",
                            password: "demo",
                        },
                        onFinish: (formValues) =>
                            alert(JSON.stringify(formValues, null, 2)),
                    }}
                    // highlight-end
                />
            )}
            resources={[
                {
                    name: "home",
                    list: () => {
                        const { replace } = useNavigation();

                        return (
                            <div>
                                Home Page
                                <button
                                    onClick={() => {
                                        replace("/login");
                                    }}
                                >
                                    Logout
                                </button>
                            </div>
                        );
                    },
                },
            ]}
        />
    );
};
// visible-block-end
render(
    <RefineMuiDemo
        routerProvider={{
            ...RefineDemoReactRouterV6(["/register"]),
            routes: [
                {
                    path: "/register",
                    element: (
                        <AuthPage
                            type="register"
                            formProps={{
                                initialValues: {
                                    email: "demo@refine.dev",
                                    password: "demo",
                                },
                                onFinish: (formValues) =>
                                    alert(JSON.stringify(formValues, null, 2)),
                            }}
                        />
                    ),
                },
            ],
        }}
        authProvider={authProvider}
        resources={[
            {
                name: "home",
                list: () => {
                    const { replace } = useNavigation();

                    return (
                        <div>
                            Home Page
                            <button
                                onClick={() => {
                                    replace("/login");
                                }}
                            >
                                Logout
                            </button>
                        </div>
                    );
                },
            },
        ]}
    />,
);
```

### `renderContent`

`renderContent` uses to render the form content. You can use this property to render your own content or `renderContent` gives you default content you can use to add some extra elements to the content.

```tsx previewHeight=500px hideCode url=http://localhost:3000/register
const { AuthPage } = RefineMui;
const { useNavigation } = RefineCore;

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
import { Refine, useNavigation } from "@pankod/refine-core";
import { AuthPage } from "@pankod/refine-mui";

import { authProvider } from "./authProvider";

const App = () => {
    return (
        <Refine
            authProvider={authProvider}
            routerProvider={{
                ...routerProvider,
                routes: [
                    {
                        path: "/register",
                        // highlight-start
                        element: (
                            <AuthPage
                                type="register"
                                loginLink={false}
                                formProps={{
                                    onFinish: (formValues) =>
                                        alert(
                                            JSON.stringify(formValues, null, 2),
                                        ),
                                }}
                                contentProps={{
                                    style: {
                                        width: "400px",
                                    },
                                }}
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
                                            <h1>Extra Footer</h1>
                                        </div>
                                    );
                                }}
                            />
                        ),
                        // highlight-end
                    },
                ],
            }}
            resources={[
                {
                    name: "home",
                    list: () => {
                        const { replace } = useNavigation();

                        return (
                            <div>
                                Home Page
                                <button
                                    onClick={() => {
                                        replace("/login");
                                    }}
                                >
                                    Logout
                                </button>
                            </div>
                        );
                    },
                },
            ]}
        />
    );
};
// visible-block-end
render(
    <RefineMuiDemo
        routerProvider={{
            ...RefineDemoReactRouterV6(["/register"]),
            routes: [
                {
                    path: "/register",
                    element: (
                        <AuthPage
                            type="register"
                            loginLink={false}
                            formProps={{
                                onFinish: (formValues) =>
                                    alert(JSON.stringify(formValues, null, 2)),
                            }}
                            contentProps={{
                                style: {
                                    width: "400px",
                                },
                            }}
                            renderContent={(content: React.ReactNode) => {
                                return (
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            width: "100%",
                                        }}
                                    >
                                        <h1>Extra Header</h1>
                                        {content}
                                        <h1>Extra Footer</h1>
                                    </div>
                                );
                            }}
                        />
                    ),
                },
            ],
        }}
        authProvider={authProvider}
        resources={[
            {
                name: "home",
                list: () => {
                    const { replace } = useNavigation();

                    return (
                        <div>
                            Home Page
                            <button
                                onClick={() => {
                                    replace("/login");
                                }}
                            >
                                Logout
                            </button>
                        </div>
                    );
                },
            },
        ]}
    />,
);
```

## Forgot Password

The forgot Password Page is a page that allows users to reset their passwords. You can use this page to reset your password.

### Default

```tsx url=http://localhost:3000/forgot-password
const { useNavigation } = RefineCore;
const { AuthPage } = RefineMui;

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
import { Refine, useNavigation } from "@pankod/refine-core";
import { AuthPage } from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";

import { authProvider } from "./authProvider";

const App = () => {
    return (
        <Refine
            authProvider={authProvider}
            routerProvider={{
                ...routerProvider,
                routes: [
                    {
                        path: "/forgot-password",
                        element: <AuthPage type="forgotPassword" />,
                    },
                ],
            }}
            LoginPage={AuthPage}
            resources={[
                {
                    name: "home",
                    list: () => {
                        const { replace } = useNavigation();

                        return (
                            <div>
                                Home Page
                                <br />
                                <button
                                    onClick={() => {
                                        replace("/login");
                                    }}
                                >
                                    Logout
                                </button>
                            </div>
                        );
                    },
                },
            ]}
        />
    );
};
// visible-block-end
render(
    <RefineMuiDemo
        routerProvider={{
            ...RefineDemoReactRouterV6(["/forgot-password"]),
            routes: [
                { path: "/login", element: <AuthPage /> },
                {
                    path: "/forgot-password",
                    element: <AuthPage type="forgotPassword" />,
                },
            ],
        }}
        authProvider={authProvider}
        resources={[
            {
                name: "home",
                list: () => {
                    const { replace } = useNavigation();

                    return (
                        <div>
                            Home Page
                            <br />
                            <button
                                onClick={() => {
                                    replace("/login");
                                }}
                            >
                                Logout
                            </button>
                        </div>
                    );
                },
            },
        ]}
    />,
);
```

### `loginLink`

`loginLink` property defines the link to the login page and also you can give a node to render. Default value is `"/login"`.

```tsx previewHeight=500px hideCode url=http://localhost:3000/forgot-password
const { AuthPage } = RefineMui;
const { useRouterContext, useNavigation } = RefineCore;

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
import { Refine, useRouterContext, useNavigation } from "@pankod/refine-core";
import { AuthPage } from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";

import { authProvider } from "./authProvider";

const Auth = (props) => {
    const { Link } = useRouterContext();

    return (
        <AuthPage
            {...props}
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

const App = () => {
    return (
        <Refine
            authProvider={authProvider}
            // highlight-start
            routerProvider={{
                ...routerProvider,
                routes: [
                    {
                        path: "/forgot-password",
                        element: <Auth type="forgotPassword" />,
                    },
                ],
            }}
            // highlight-end
            LoginPage={Auth}
            resources={[
                {
                    name: "home",
                    list: () => {
                        const { replace } = useNavigation();

                        return (
                            <div>
                                Home Page
                                <button
                                    onClick={() => {
                                        replace("/login");
                                    }}
                                >
                                    Logout
                                </button>
                            </div>
                        );
                    },
                },
            ]}
        />
    );
};
// visible-block-end
render(
    <RefineMuiDemo
        routerProvider={{
            ...RefineDemoReactRouterV6(["/forgot-password"]),
            routes: [
                {
                    path: "/login",
                    element: <Auth type="login" />,
                },
                {
                    path: "/forgot-password",
                    element: <Auth type="forgotPassword" />,
                },
            ],
        }}
        authProvider={authProvider}
        resources={[
            {
                name: "home",
                list: () => {
                    const { replace } = useNavigation();

                    return (
                        <div>
                            Home Page
                            <button
                                onClick={() => {
                                    replace("/login");
                                }}
                            >
                                Logout
                            </button>
                        </div>
                    );
                },
            },
        ]}
    />,
);
```

### `wrapperProps`

`wrapperProps` uses for passing props to the wrapper component. In the example below you can see that the background color is changed with `wrapperProps`

```tsx previewHeight=500px hideCode url=http://localhost:3000/forgot-password
const { AuthPage } = RefineMui;
const { useNavigation } = RefineCore;

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
import { Refine, useNavigation } from "@pankod/refine-core";
import { AuthPage } from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";

import { authProvider } from "./authProvider";

const App = () => {
    return (
        <Refine
            authProvider={authProvider}
            // highlight-start
            routerProvider={{
                ...routerProvider,
                routes: [
                    {
                        path: "/forgot-password",
                        element: (
                            <AuthPage
                                type="forgotPassword"
                                wrapperProps={{
                                    style: {
                                        background: "#331049",
                                    },
                                }}
                                loginLink={false}
                            />
                        ),
                    },
                ],
            }}
            // highlight-end
            LoginPage={AuthPage}
            resources={[
                {
                    name: "home",
                    list: () => {
                        const { replace } = useNavigation();

                        return (
                            <div>
                                Home Page
                                <button
                                    onClick={() => {
                                        replace("/login");
                                    }}
                                >
                                    Logout
                                </button>
                            </div>
                        );
                    },
                },
            ]}
        />
    );
};
// visible-block-end
render(
    <RefineMuiDemo
        routerProvider={{
            ...RefineDemoReactRouterV6(["/forgot-password"]),
            routes: [
                {
                    path: "/forgot-password",
                    element: (
                        <AuthPage
                            type="forgotPassword"
                            wrapperProps={{
                                style: {
                                    background: "#331049",
                                },
                            }}
                            loginLink={false}
                        />
                    ),
                },
            ],
        }}
        authProvider={authProvider}
        resources={[
            {
                name: "home",
                list: () => {
                    const { replace } = useNavigation();

                    return (
                        <div>
                            Home Page
                            <button
                                onClick={() => {
                                    replace("/login");
                                }}
                            >
                                Logout
                            </button>
                        </div>
                    );
                },
            },
        ]}
    />,
);
```

### `contentProps`

`contentProps` uses for passing props to the content component which is the form component. In the example below you can see that the title, header and content styles are changed with `contentProps`.

```tsx previewHeight=500px hideCode url=http://localhost:3000/forgot-password
const { AuthPage } = RefineMui;
const { useRouterContext, useNavigation } = RefineCore;

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
import { Refine } from "@pankod/refine-core";
import { AuthPage } from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";

import { authProvider } from "./authProvider";

const App = () => {
    return (
        <Refine
            authProvider={authProvider}
            // highlight-start
            routerProvider={{
                ...routerProvider,
                routes: [
                    {
                        path: "/forgot-password",
                        element: (
                            <AuthPage
                                type="forgotPassword"
                                loginLink={false}
                                contentProps={{
                                    title: "Forgot Password",
                                    headStyle: {
                                        background: "cornflowerblue",
                                        color: "white",
                                    },
                                    bodyStyle: {
                                        background: "#673ab742",
                                    },
                                }}
                            />
                        ),
                    },
                ],
            }}
            // highlight-end
        />
    );
};
// visible-block-end
render(
    <RefineMuiDemo
        routerProvider={{
            ...RefineDemoReactRouterV6(["/forgot-password"]),
            routes: [
                {
                    path: "/forgot-password",
                    element: (
                        <AuthPage
                            type="forgotPassword"
                            loginLink={false}
                            contentProps={{
                                title: "Forgot Password",
                                headStyle: {
                                    background: "cornflowerblue",
                                    color: "white",
                                },
                                bodyStyle: {
                                    background: "#673ab742",
                                },
                            }}
                        />
                    ),
                },
            ],
        }}
        authProvider={authProvider}
        resources={[
            {
                name: "Home",
                list: () => {
                    return <div>Home</div>;
                },
            },
        ]}
    />,
);
```

### `formProps`

`formProps` uses for passing props to the form component. In the example below you can see that the `initialValues` are changed with `formProps` and also the `onFinish` function is changed.

```tsx previewHeight=500px hideCode url=http://localhost:3000/forgot-password
const { AuthPage } = RefineMui;
const { useNavigation } = RefineCore;

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
import { Refine, useNavigation } from "@pankod/refine-core";
import { AuthPage } from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";

import { authProvider } from "./authProvider";

const App = () => {
    return (
        <Refine
            authProvider={authProvider}
            LoginPage={() => (
                <AuthPage
                    type="forgotPassword"
                    // highlight-start
                    formProps={{
                        initialValues: {
                            email: "demo@refine.dev",
                            password: "demo",
                        },
                        onFinish: (formValues) =>
                            alert(JSON.stringify(formValues, null, 2)),
                    }}
                    // highlight-end
                />
            )}
            resources={[
                {
                    name: "Home",
                    list: () => {
                        return <div>Home</div>;
                    },
                },
            ]}
        />
    );
};
// visible-block-end
render(
    <RefineMuiDemo
        routerProvider={{
            ...RefineDemoReactRouterV6(["/forgot-password"]),
            routes: [
                {
                    path: "/forgot-password",
                    element: (
                        <AuthPage
                            type="forgotPassword"
                            formProps={{
                                initialValues: {
                                    email: "demo@refine.dev",
                                    password: "demo",
                                },
                                onFinish: (formValues) =>
                                    alert(JSON.stringify(formValues, null, 2)),
                            }}
                        />
                    ),
                },
            ],
        }}
        authProvider={authProvider}
        resources={[
            {
                name: "Home",
                list: () => {
                    return <div>Home</div>;
                },
            },
        ]}
    />,
);
```

### `renderContent`

`renderContent` uses to render the form content. You can use this property to render your own content or `renderContent` gives you default content you can use to add some extra elements to the content.

```tsx previewHeight=500px hideCode url=http://localhost:3000/forgot-password
const { AuthPage } = RefineMui;
const { useRouterContext, useNavigation } = RefineCore;

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
import { Refine, useRouterContext } from "@pankod/refine-core";
import { AuthPage } from "@pankod/refine-mui";

import { authProvider } from "./authProvider";

const App = () => {
    return (
        <Refine
            authProvider={authProvider}
            // highlight-start
            routerProvider={{
                ...routerProvider,
                routes: [
                    {
                        path: "/forgot-password",
                        element: (
                            <AuthPage
                                type="forgotPassword"
                                loginLink={false}
                                formProps={{
                                    onFinish: (formValues) =>
                                        alert(
                                            JSON.stringify(formValues, null, 2),
                                        ),
                                }}
                                contentProps={{
                                    style: {
                                        width: "400px",
                                    },
                                }}
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
                                            <h1>Extra Footer</h1>
                                        </div>
                                    );
                                }}
                            />
                        ),
                    },
                ],
            }}
            // highlight-end
            resources={[
                {
                    name: "Home",
                    list: () => {
                        return <div>Home Page</div>;
                    },
                },
            ]}
        />
    );
};
// visible-block-end
render(
    <RefineMuiDemo
        routerProvider={{
            ...RefineDemoReactRouterV6(["/forgot-password"]),
            routes: [
                {
                    path: "/forgot-password",
                    element: (
                        <AuthPage
                            type="forgotPassword"
                            loginLink={false}
                            formProps={{
                                onFinish: (formValues) =>
                                    alert(JSON.stringify(formValues, null, 2)),
                            }}
                            contentProps={{
                                style: {
                                    width: "400px",
                                },
                            }}
                            renderContent={(content: React.ReactNode) => {
                                return (
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            width: "100%",
                                        }}
                                    >
                                        <h1>Extra Header</h1>
                                        {content}
                                        <h1>Extra Footer</h1>
                                    </div>
                                );
                            }}
                        />
                    ),
                },
            ],
        }}
        authProvider={authProvider}
        resources={[
            {
                name: "Home",
                list: () => {
                    return <div>Home Page</div>;
                },
            },
        ]}
    />,
);
```

## Update Password

The update Password page is used to update the password of the user.

### Default

```tsx url=http://localhost:3000/update-password
const { useNavigation } = RefineCore;
const { AuthPage } = RefineMui;

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
import { Refine, useNavigation } from "@pankod/refine-core";
import { AuthPage } from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";

import { authProvider } from "./authProvider";

const App = () => {
    return (
        <Refine
            authProvider={authProvider}
            // highlight-start

            routerProvider={{
                ...routerProvider,
                routes: [
                    {
                        path: "/update-password",
                        element: <AuthPage type="updatePassword" />,
                    },
                ],
            }}
            // highlight-end
            LoginPage={AuthPage}
            resources={[
                {
                    name: "home",
                    list: () => {
                        const { replace } = useNavigation();

                        return (
                            <div>
                                Home Page
                                <br />
                                <button
                                    onClick={() => {
                                        replace("/login");
                                    }}
                                >
                                    Logout
                                </button>
                            </div>
                        );
                    },
                },
            ]}
        />
    );
};
// visible-block-end
render(
    <RefineMuiDemo
        routerProvider={{
            ...RefineDemoReactRouterV6(["/update-password"]),
            routes: [
                { path: "/login", element: <AuthPage /> },
                {
                    path: "/update-password",
                    element: <AuthPage type="updatePassword" />,
                },
            ],
        }}
        authProvider={authProvider}
        resources={[
            {
                name: "home",
                list: () => {
                    const { replace } = useNavigation();

                    return (
                        <div>
                            Home Page
                            <br />
                            <button
                                onClick={() => {
                                    replace("/login");
                                }}
                            >
                                Logout
                            </button>
                        </div>
                    );
                },
            },
        ]}
    />,
);
```

### `wrapperProps`

`wrapperProps` uses for passing props to the wrapper component. In the example below you can see that the background color is changed with `wrapperProps`

```tsx previewHeight=500px hideCode url=http://localhost:3000/update-password
const { AuthPage } = RefineMui;

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
import { Refine } from "@pankod/refine-core";
import { AuthPage } from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";

import { authProvider } from "./authProvider";

const App = () => {
    return (
        <Refine
            authProvider={authProvider}
            routerProvider={{
                ...routerProvider,
                routes: [
                    {
                        path: "/update-password",
                        element: (
                            <AuthPage
                                type="updatePassword"
                                // highlight-start
                                wrapperProps={{
                                    style: {
                                        background: "#331049",
                                    },
                                }}
                                // highlight-end
                            />
                        ),
                    },
                ],
            }}
        />
    );
};
// visible-block-end
render(
    <RefineMuiDemo
        routerProvider={{
            ...RefineDemoReactRouterV6(["/update-password"]),
            routes: [
                {
                    path: "/update-password",
                    element: (
                        <AuthPage
                            type="updatePassword"
                            wrapperProps={{
                                style: {
                                    background: "#331049",
                                },
                            }}
                            loginLink={false}
                        />
                    ),
                },
            ],
        }}
        authProvider={authProvider}
        resources={[
            {
                name: "posts",
                list: () => {
                    return <div>Empty Page</div>;
                },
            },
        ]}
    />,
);
```

### `contentProps`

`contentProps` uses for passing props to the content component which is the form component. In the example below you can see that the title, header and content styles are changed with `contentProps`.

```tsx previewHeight=500px hideCode url=http://localhost:3000/update-password
const { AuthPage } = RefineMui;
const { useRouterContext, useNavigation } = RefineCore;

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
import { Refine } from "@pankod/refine-core";
import { AuthPage } from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";

import { authProvider } from "./authProvider";

const App = () => {
    return (
        <Refine
            authProvider={authProvider}
            routerProvider={{
                ...routerProvider,
                routes: [
                    {
                        path: "/update-password",

                        element: (
                            <AuthPage
                                type="updatePassword"
                                // highlight-start
                                contentProps={{
                                    title: "Update Password",
                                    headStyle: {
                                        background: "cornflowerblue",
                                        color: "white",
                                    },
                                    bodyStyle: {
                                        background: "#673ab742",
                                    },
                                }}
                                // highlight-end
                            />
                        ),
                    },
                ],
            }}
        />
    );
};
// visible-block-end
render(
    <RefineMuiDemo
        routerProvider={{
            ...RefineDemoReactRouterV6(["/update-password"]),
            routes: [
                {
                    path: "/update-password",
                    element: (
                        <AuthPage
                            type="updatePassword"
                            contentProps={{
                                title: "Update Password",
                                headStyle: {
                                    background: "cornflowerblue",
                                    color: "white",
                                },
                                bodyStyle: {
                                    background: "#673ab742",
                                },
                            }}
                        />
                    ),
                },
            ],
        }}
        authProvider={authProvider}
        resources={[
            {
                name: "posts",
                list: () => {
                    return <div>Empty Page</div>;
                },
            },
        ]}
    />,
);
```

### `formProps`

`formProps` uses for passing props to the form component. In the example below you can see that the `initialValues` are changed with `formProps` and also the `onFinish` function is changed.

```tsx previewHeight=500px hideCode url=http://localhost:3000/update-password
const { AuthPage } = RefineMui;
const { useNavigation } = RefineCore;

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
import { Refine, useNavigation } from "@pankod/refine-core";
import { AuthPage } from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";

import { authProvider } from "./authProvider";

const App = () => {
    return (
        <Refine
            authProvider={authProvider}
            LoginPage={() => (
                <AuthPage
                    type="updatePassword"
                    // highlight-start
                    formProps={{
                        initialValues: {
                            email: "demo@refine.dev",
                            password: "demo",
                        },
                        onFinish: (formValues) =>
                            alert(JSON.stringify(formValues, null, 2)),
                    }}
                    // highlight-end
                />
            )}
            resources={[
                {
                    name: "home",
                    list: () => {
                        const { replace } = useNavigation();

                        return (
                            <div>
                                Home Page
                                <button
                                    onClick={() => {
                                        replace("/login");
                                    }}
                                >
                                    Logout
                                </button>
                            </div>
                        );
                    },
                },
            ]}
        />
    );
};
// visible-block-end
render(
    <RefineMuiDemo
        routerProvider={{
            ...RefineDemoReactRouterV6(["/update-password"]),
            routes: [
                {
                    path: "/update-password",
                    element: (
                        <AuthPage
                            type="updatePassword"
                            formProps={{
                                initialValues: {
                                    email: "demo@refine.dev",
                                    password: "demo",
                                },
                                onFinish: (formValues) =>
                                    alert(JSON.stringify(formValues, null, 2)),
                            }}
                        />
                    ),
                },
            ],
        }}
        authProvider={authProvider}
        resources={[
            {
                name: "home",
                list: () => {
                    const { replace } = useNavigation();

                    return (
                        <div>
                            Home Page
                            <button
                                onClick={() => {
                                    replace("/login");
                                }}
                            >
                                Logout
                            </button>
                        </div>
                    );
                },
            },
        ]}
    />,
);
```

### `renderContent`

`renderContent` uses to render the form content. You can use this property to render your own content or `renderContent` gives you default content you can use to add some extra elements to the content.

```tsx previewHeight=500px hideCode url=http://localhost:3000/update-password
const { AuthPage } = RefineMui;
const { useRouterContext, useNavigation } = RefineCore;

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
import { Refine, useRouterContext } from "@pankod/refine-core";
import { AuthPage } from "@pankod/refine-mui";

import { authProvider } from "./authProvider";

const App = () => {
    return (
        <Refine
            authProvider={authProvider}
            routerProvider={{
                ...routerProvider,
                routes: [
                    {
                        path: "/update-password",
                        element: (
                            <AuthPage
                                type="updatePassword"
                                contentProps={{
                                    style: {
                                        width: "400px",
                                    },
                                }}
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
                                            <h1>Extra Footer</h1>
                                        </div>
                                    );
                                }}
                                // highlight-end
                            />
                        ),
                    },
                ],
            }}
        />
    );
};
// visible-block-end
render(
    <RefineMuiDemo
        routerProvider={{
            ...RefineDemoReactRouterV6(["/update-password"]),
            routes: [
                {
                    path: "/update-password",
                    element: (
                        <AuthPage
                            type="updatePassword"
                            contentProps={{
                                style: {
                                    width: "400px",
                                },
                            }}
                            renderContent={(content: React.ReactNode) => {
                                return (
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            width: "100%",
                                        }}
                                    >
                                        <h1>Extra Header</h1>
                                        {content}
                                        <h1>Extra Footer</h1>
                                    </div>
                                );
                            }}
                        />
                    ),
                },
            ],
        }}
        authProvider={authProvider}
        resources={[
            {
                name: "posts",
                list: () => {
                    return <div>Empty Page</div>;
                },
            },
        ]}
    />,
);
```

## API Reference

### Properties

| Property           | Description                                                                         | Type                                                          |
| ------------------ | ----------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| type               | Render `<AuthPage>` forms by `type` property.                                       | `login` \| `register` \| `forgotPassword` \| `updatePassword` |
| providers          | Render auth logins if `type` is `"login"`.                                          | [`IProvider[]`](#interface)                                   |
| registerLink       | A custom node that will be rendered as a register link to the `<AuthPage>`.         | `React.ReactNode`                                             |
| loginLink          | A custom node that will be rendered as a link to the `<AuthPage>`.                  | `React.ReactNode`                                             |
| forgotPasswordLink | A custom node that will be rendered as a forgot password link to the `<AuthPage>`.  | `React.ReactNode`                                             |
| wrapperProps       | Wrapper element props.                                                              | [`WrapperProps`](https://ant.design/components/layout/#API)   |
| contentProps       | Content wrapper element props.                                                      | [`CardProps`](https://ant.design/components/card/#API)        |
| formProps          | Props for the form component.                                                       | [`FormProps`](https://ant.design/components/form/#API)        |
| renderContent      | Gives you default content you can use it to add some extra elements to the content. | `function(content: React.ReactNode) => React.ReactNode`       |

### Interface

```tsx
interface IProvider {
    name: string;
    icon?: React.ReactNode;
    label?: string;
}
```
