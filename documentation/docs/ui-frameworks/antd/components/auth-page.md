---
id: antd-auth-page
title: <AuthPage>
sidebar_label: <AuthPage>
description: <AuthPage> component from refine is a authentication page that can be used to login, register, reset password and update password.
---

`<AuthPage>` component from **refine** for **ant design** contains authentication pages that can be used to login, register, reset password and update password.

Before using `<AuthPage>` component you need to add [authProvider](/core/providers/auth-provider.md) that will be used to handle authentication.

## Usage

`<AuthPage>` component can be used like below 👇🏻

```tsx live url=http://localhost:3000/login
const { useNavigation } = RefineCore;
const { AuthPage } = RefineAntd;

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
import { Refine, useNavigation } from "@pankod/refine-core";
import { AuthPage } from "@pankod/refine-antd";

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
                                Login Succesful
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
    <RefineAntdDemo
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
                            Login Succesful
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

-   `"login"` - a type of the login page and default type.
-   `"register"` - type of the registration page.
-   `"resetPassword"` - type of the reset password page.
-   `"updatePassword"` - type of the update password page.

## Login

`login` will be used as default type of `<AuthPage>` component. Login page will be used to login to the system.

You can use the following props for the `<AuthPage>` component when the type is `"login"`:

### `registerLink`

`registerLink` property defines the link to the registration page and also you can give a node to render. Default value is `"/register"`.

```tsx live previewHeight=500px hideCode url=http://localhost:3000/login
const { AuthPage } = RefineAntd;
const { useRouterContext, useNavigation } = RefineCore;

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
import { Refine, useRouterContext, useNavigation } from "@pankod/refine-core";
import { AuthPage } from "@pankod/refine-antd";
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
                    },
                },
            ]}
            // highlight-next-line
            LoginPage={Auth}
        />
    );
};
// visible-block-end
render(
    <RefineAntdDemo
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
                },
            },
        ]}
    />,
);
```

### `providers`

`providers` property defines the list of providers used to handle login authentication.

```tsx live previewHeight=500px hideCode url=http://localhost:3000/login
const { AuthPage } = RefineAntd;
const { useRouterContext, useNavigation } = RefineCore;

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
import { Refine, useRouterContext, useNavigation } from "@pankod/refine-core";
import { AuthPage } from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-react-router-v6";
import { GoogleOutlined, GithubOutlined } from "@ant-design/icons";

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
                        },
                        {
                            name: "github",
                            label: "Sign in with GitHub",
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
    <RefineAntdDemo
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
                                },
                                {
                                    name: "github",
                                    label: "Sign in with GitHub",
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
                },
            },
        ]}
    />,
);
```

### `onSubmit`

`onSubmit` is a function that will be triggered after submitting the form and verifying data successfully.

```tsx live previewHeight=500px hideCode url=http://localhost:3000/login
const { useNavigation } = RefineCore;
const { AuthPage } = RefineAntd;

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
import { Refine, useNavigation } from "@pankod/refine-core";
import { AuthPage } from "@pankod/refine-antd";

import { authProvider } from "./authProvider";

const App = () => {
    return (
        <Refine
            authProvider={authProvider}
            // highlight-next-line
            LoginPage={AuthPage}
            resources={[
                {
                    name: "posts",
                    list: () => {
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
                    },
                },
            ]}
        />
    );
};
// visible-block-end
render(
    <RefineAntdDemo
        routerProvider={{
            ...RefineDemoReactRouterV6(["/login"]),
            routes: [
                {
                    path: "/login",
                    element: (
                        <AuthPage
                            type="login"
                            onSubmit={(formValues) =>
                                alert(JSON.stringify(formValues, null, 2))
                            }
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
                },
            },
        ]}
    />,
);
```

### `rememberMe`

`rememberMe` property defines to render your own remember me component or you can pass `false` to don't render it.

:::info
You have to wrap your remember me component with `Form.Item` component from **antd** and pass `name` prop to it then you can access it's value from `onSubmit` function with `formValues`.
:::

```tsx live previewHeight=500px hideCode url=http://localhost:3000/login
const { AuthPage, Form, Checkbox } = RefineAntd;
const { useNavigation } = RefineCore;

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

import { Refine, useNavigation } from "@pankod/refine-core";
import { AuthPage, Form, Checkbox } from "@pankod/refine-antd";

import { authProvider } from "./authProvider";

const App = () => {
    return (
        <Refine
            authProvider={authProvider}
            // highlight-start
            LoginPage={
                <AuthPage
                    rememberMe={
                        <div
                            style={{
                                border: "1px dashed cornflowerblue",
                                padding: 3,
                            }}
                        >
                            <Form.Item
                                name="remember"
                                valuePropName="checked"
                                noStyle
                            >
                                <Checkbox>Custom remember me</Checkbox>
                            </Form.Item>
                        </div>
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
                    },
                },
            ]}
        />
    );
};
// visible-block-end
render(
    <RefineAntdDemo
        routerProvider={{
            ...RefineDemoReactRouterV6(["/login"]),
            routes: [
                {
                    path: "/login",
                    element: (
                        <AuthPage
                            rememberMe={
                                <div
                                    style={{
                                        border: "1px dashed cornflowerblue",
                                        padding: 3,
                                    }}
                                >
                                    <Form.Item
                                        name="remember"
                                        valuePropName="checked"
                                        noStyle
                                    >
                                        <Checkbox>Custom remember me</Checkbox>
                                    </Form.Item>
                                </div>
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
                },
            },
        ]}
    />,
);
```

### `wrapperProps`

`wrapperProps` uses for passing props to the wrapper component. In the example below you can see that the background color is changed with `wrapperProps`

```tsx live previewHeight=500px hideCode url=http://localhost:3000/login
const { AuthPage } = RefineAntd;
const { useNavigation } = RefineCore;

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
import { Refine, useNavigation } from "@pankod/refine-core";
import { AuthPage } from "@pankod/refine-antd";
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
                    },
                },
            ]}
        />
    );
};
// visible-block-end
render(
    <RefineAntdDemo
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
                },
            },
        ]}
    />,
);
```

### `contentProps`

`contentProps` uses for passing props to the content component which is the form component. In the example below you can see that the title, header and content styles are changed with `contentProps`.

```tsx live previewHeight=500px hideCode url=http://localhost:3000/login
const { AuthPage } = RefineAntd;
const { useNavigation } = RefineCore;

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
import { Refine, useNavigation } from "@pankod/refine-core";
import { AuthPage } from "@pankod/refine-antd";
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
                    },
                },
            ]}
        />
    );
};
// visible-block-end
render(
    <RefineAntdDemo
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
                },
            },
        ]}
    />,
);
```

### `renderContent`

`renderContent` uses to render the form content. You can use this property to render your own content or `renderContent` gives you default content you can use it to add some extra elements to the content.

```tsx live previewHeight=500px hideCode url=http://localhost:3000/login
const { AuthPage } = RefineAntd;
const { useRouterContext, useNavigation } = RefineCore;

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
import { Refine, useRouterContext } from "@pankod/refine-core";
import { AuthPage } from "@pankod/refine-antd";

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
                    },
                },
            ]}
        />
    );
};
// visible-block-end
render(
    <RefineAntdDemo
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
                },
            },
        ]}
    />,
);
```

## Register

Register page will be used to register new users. You can use following props for `<AuthPage>` component when type is `"register"`:

### `loginLink`

`loginLink` property defines the link to the login page and also you can give a node to render. Default value is `"/login"`.

```tsx live previewHeight=500px hideCode url=http://localhost:3000/register
const { AuthPage } = RefineAntd;
const { useRouterContext, useNavigation } = RefineCore;

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
import { Refine, useRouterContext, useNavigation } from "@pankod/refine-core";
import { AuthPage } from "@pankod/refine-antd";
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
                    },
                },
            ]}
        />
    );
};
// visible-block-end
render(
    <RefineAntdDemo
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
                },
            },
        ]}
    />,
);
```

### `onSubmit`

`onSubmit` is a function that will be triggered after submitting the form and verifying data successfully.

```tsx live previewHeight=500px hideCode url=http://localhost:3000/register
const { AuthPage } = RefineAntd;
const { useNavigation } = RefineCore;

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
import { Refine, useNavigation } from "@pankod/refine-core";
import { AuthPage } from "@pankod/refine-antd";
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
                        // highlight-start
                        element: (
                            <Auth
                                type="register"
                                onSubmit={(formValues) =>
                                    alert(JSON.stringify(formValues, null, 2))
                                }
                                loginLink={false}
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
                    },
                },
            ]}
        />
    );
};
// visible-block-end
render(
    <RefineAntdDemo
        routerProvider={{
            ...RefineDemoReactRouterV6(["/register"]),
            routes: [
                {
                    path: "/register",
                    element: (
                        <AuthPage
                            type="register"
                            onSubmit={(formValues) =>
                                alert(JSON.stringify(formValues, null, 2))
                            }
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
                },
            },
        ]}
    />,
);
```

### `wrapperProps`

`wrapperProps` uses for passing props to the wrapper component. In the example below you can see that the background color is changed with `wrapperProps`

```tsx live previewHeight=500px hideCode url=http://localhost:3000/register
const { AuthPage } = RefineAntd;
const { useNavigation } = RefineCore;

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
import { Refine, useNavigation } from "@pankod/refine-core";
import { AuthPage } from "@pankod/refine-antd";
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
                                Home
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
    <RefineAntdDemo
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
                            Home
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

```tsx live previewHeight=500px hideCode url=http://localhost:3000/register
const { AuthPage } = RefineAntd;
const { useRouterContext, useNavigation } = RefineCore;

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
import { Refine, useNavigation } from "@pankod/refine-core";
import { AuthPage } from "@pankod/refine-antd";
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
                        // highlight-start
                        element: (
                            <AuthPage
                                type="register"
                                loginLink={false}
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
                                Home
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
    <RefineAntdDemo
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
                            Home
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

`renderContent` uses to render the form content. You can use this property to render your own content or `renderContent` gives you default content you can use it to add some extra elements to the content.

```tsx live previewHeight=500px hideCode url=http://localhost:3000/register
const { AuthPage } = RefineAntd;
const { useNavigation } = RefineCore;

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
import { Refine, useNavigation } from "@pankod/refine-core";
import { AuthPage } from "@pankod/refine-antd";

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
                                onSubmit={(formValues) =>
                                    alert(JSON.stringify(formValues, null, 2))
                                }
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
                                Home
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
    <RefineAntdDemo
        routerProvider={{
            ...RefineDemoReactRouterV6(["/register"]),
            routes: [
                {
                    path: "/register",
                    element: (
                        <AuthPage
                            type="register"
                            loginLink={false}
                            onSubmit={(formValues) =>
                                alert(JSON.stringify(formValues, null, 2))
                            }
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
                            Home
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

## Reset Password

Reset Password Page is a page that allows users to reset their password. You can use this page to reset your password.

### `loginLink`

`loginLink` property defines the link to the login page and also you can give a node to render. Default value is `"/login"`.

```tsx live previewHeight=500px hideCode url=http://localhost:3000/reset-password
const { AuthPage } = RefineAntd;
const { useRouterContext, useNavigation } = RefineCore;

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
import { Refine, useRouterContext, useNavigation } from "@pankod/refine-core";
import { AuthPage } from "@pankod/refine-antd";
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
                        path: "/reset-password",
                        element: <Auth type="resetPassword" />,
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
                                Home
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
    <RefineAntdDemo
        routerProvider={{
            ...RefineDemoReactRouterV6(["/reset-password"]),
            routes: [
                {
                    path: "/login",
                    element: <Auth type="login" />,
                },
                {
                    path: "/reset-password",
                    element: <Auth type="resetPassword" />,
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
                            Home
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

### `onSubmit`

`onSubmit` is a function that will be triggered after submitting the form and verifying data successfully.

```tsx live previewHeight=500px hideCode url=http://localhost:3000/reset-password
const { AuthPage } = RefineAntd;

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
import { Refine, useNavigation } from "@pankod/refine-core";
import { AuthPage } from "@pankod/refine-antd";
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
                        path: "/reset-password",
                        element: (
                            <Auth type="resetPassword" loginLink={false} />
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
    <RefineAntdDemo
        routerProvider={{
            ...RefineDemoReactRouterV6(["/reset-password"]),
            routes: [
                {
                    path: "/reset-password",
                    element: (
                        <AuthPage
                            type="resetPassword"
                            onSubmit={(formValues) =>
                                alert(JSON.stringify(formValues, null, 2))
                            }
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
                            Home
                            <button
                                onClick={() => {
                                    replace("/reset-password");
                                }}
                            >
                                Reset Password
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

```tsx live previewHeight=500px hideCode url=http://localhost:3000/reset-password
const { AuthPage } = RefineAntd;
const { useNavigation } = RefineCore;

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
import { Refine, useNavigation } from "@pankod/refine-core";
import { AuthPage } from "@pankod/refine-antd";
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
                        path: "/reset-password",
                        element: (
                            <AuthPage
                                type="resetPassword"
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
                                Home
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
    <RefineAntdDemo
        routerProvider={{
            ...RefineDemoReactRouterV6(["/reset-password"]),
            routes: [
                {
                    path: "/reset-password",
                    element: (
                        <AuthPage
                            type="resetPassword"
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
                            Home
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

```tsx live previewHeight=500px hideCode url=http://localhost:3000/reset-password
const { AuthPage } = RefineAntd;
const { useRouterContext, useNavigation } = RefineCore;

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
import { Refine } from "@pankod/refine-core";
import { AuthPage } from "@pankod/refine-antd";
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
                        path: "/reset-password",

                        element: (
                            // highlight-start
                            <AuthPage
                                type="resetPassword"
                                loginLink={false}
                                contentProps={{
                                    title: "Reset Password",
                                    headStyle: {
                                        background: "cornflowerblue",
                                        color: "white",
                                    },
                                    bodyStyle: {
                                        background: "#673ab742",
                                    },
                                }}
                            />
                            // highlight-end
                        ),
                    },
                ],
            }}
        />
    );
};
// visible-block-end
render(
    <RefineAntdDemo
        routerProvider={{
            ...RefineDemoReactRouterV6(["/reset-password"]),
            routes: [
                {
                    path: "/reset-password",
                    element: (
                        <AuthPage
                            type="resetPassword"
                            loginLink={false}
                            contentProps={{
                                title: "Reset Password",
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

### `renderContent`

`renderContent` uses to render the form content. You can use this property to render your own content or `renderContent` gives you default content you can use it to add some extra elements to the content.

```tsx live previewHeight=500px hideCode url=http://localhost:3000/reset-password
const { AuthPage } = RefineAntd;
const { useRouterContext, useNavigation } = RefineCore;

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
import { Refine, useRouterContext } from "@pankod/refine-core";
import { AuthPage } from "@pankod/refine-antd";

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
                        path: "/reset-password",
                        element: (
                            <AuthPage
                                type="resetPassword"
                                loginLink={false}
                                onSubmit={(formValues) =>
                                    alert(JSON.stringify(formValues, null, 2))
                                }
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
    <RefineAntdDemo
        routerProvider={{
            ...RefineDemoReactRouterV6(["/reset-password"]),
            routes: [
                {
                    path: "/reset-password",
                    element: (
                        <AuthPage
                            type="resetPassword"
                            loginLink={false}
                            onSubmit={(formValues) =>
                                alert(JSON.stringify(formValues, null, 2))
                            }
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

Update Password page is used to update the password of the user.

### `onSubmit`

`onSubmit` is a function that will be triggered after submitting the form and verifying data successfully.

```tsx live previewHeight=500px hideCode url=http://localhost:3000/update-password
const { AuthPage } = RefineAntd;

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
import { Refine } from "@pankod/refine-core";
import { AuthPage } from "@pankod/refine-antd";
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
                        // highlight-next-line
                        element: <Auth type="updatePassword" />,
                    },
                ],
            }}
        />
    );
};
// visible-block-end
render(
    <RefineAntdDemo
        routerProvider={{
            ...RefineDemoReactRouterV6(["/update-password"]),
            routes: [
                {
                    path: "/update-password",
                    element: (
                        <AuthPage
                            type="updatePassword"
                            onSubmit={(formValues) =>
                                alert(JSON.stringify(formValues, null, 2))
                            }
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

### `wrapperProps`

`wrapperProps` uses for passing props to the wrapper component. In the example below you can see that the background color is changed with `wrapperProps`

```tsx live previewHeight=500px hideCode url=http://localhost:3000/update-password
const { AuthPage } = RefineAntd;

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
import { Refine } from "@pankod/refine-core";
import { AuthPage } from "@pankod/refine-antd";
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
                            // highlight-start
                            <AuthPage
                                type="updatePassword"
                                wrapperProps={{
                                    style: {
                                        background: "#331049",
                                    },
                                }}
                            />
                            // highlight-end
                        ),
                    },
                ],
            }}
        />
    );
};
// visible-block-end
render(
    <RefineAntdDemo
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

```tsx live previewHeight=500px hideCode url=http://localhost:3000/update-password
const { AuthPage } = RefineAntd;
const { useRouterContext, useNavigation } = RefineCore;

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
import { Refine } from "@pankod/refine-core";
import { AuthPage } from "@pankod/refine-antd";
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
                            // highlight-start
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
                            // highlight-end
                        ),
                    },
                ],
            }}
        />
    );
};
// visible-block-end
render(
    <RefineAntdDemo
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

### `renderContent`

`renderContent` uses to render the form content. You can use this property to render your own content or `renderContent` gives you default content you can use it to add some extra elements to the content.

```tsx live previewHeight=500px hideCode url=http://localhost:3000/update-password
const { AuthPage } = RefineAntd;
const { useRouterContext, useNavigation } = RefineCore;

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
import { Refine, useRouterContext } from "@pankod/refine-core";
import { AuthPage } from "@pankod/refine-antd";

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
                        // highlight-start
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
                                            }}
                                        >
                                            <h1>Extra Header</h1>
                                            {content}
                                            <h1>Extra Footer</h1>
                                        </div>
                                    );
                                }}
                            />
                            // highlight-end
                        ),
                    },
                ],
            }}
        />
    );
};
// visible-block-end
render(
    <RefineAntdDemo
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

| Property           | Description                                                                         | Type                                                         |
| ------------------ | ----------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| type               | Render `<AuthPage>` forms by `type` property.                                       | `login` \| `register` \| `resetPassword` \| `updatePassword` |
| providers          | Render social logins if `type` is `"login"`.                                        | [`IProvider[]`](#interface)                                  |
| registerLink       | Custom node that will be rendered as a register link to the `<AuthPage>`.           | `React.ReactNode`                                            |
| loginLink          | Custom node that will be rendered as a link to the `<AuthPage>`.                    | `React.ReactNode`                                            |
| resetPasswordLink  | Custom node that will be rendered as a reset password link to the `<AuthPage>`.     | `React.ReactNode`                                            |
| updatePasswordLink | Custom node that will be rendered as a update password link to the `<AuthPage>`.    | `React.ReactNode`                                            |
| onSubmit           | Trigger after submitting the form and verifying data successfully                   | `function(formValues)`                                       |
| wrapperProps       | Wrapper element props                                                               | `React.DetailedHTMLProps<HTMLDivElement>`                    |
| contentProps       | Content wrapper element props                                                       | `CardProps`                                                  |
| renderContent      | Gives you default content you can use it to add some extra elements to the content. | `function(content)`                                          |

### Interface

```tsx
interface IProvider {
    name: string;
    icon?: React.ReactNode;
    label?: string;
}
```
