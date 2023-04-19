---
id: auth-pages
title: 3. Auth Pages
tutorial:
    prev: tutorial/understanding-authprovider/create-authprovider
    next: false
---

```tsx live shared
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
            redirectTo: "/",
        };
    },
    check: async () => {
        return {
            authenticated: window.__refineAuthStatus ? true : false,
            redirectTo: window.__refineAuthStatus ? undefined : "/login",
        };
    },
    onError: async (error) => {
        console.error(error);
        return { error };
    },
    getPermissions: async () => null,
    getIdentity: async () => null,
};

import { Refine, Authenticated } from "@refinedev/core";
import routerBindings, {
    CatchAllNavigate,
    NavigateToResource,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import {
    ErrorComponent,
    ThemedLayoutV2,
    refineTheme,
    notificationProvider,
    AuthPage,
} from "@refinedev/chakra-ui";
import { ChakraProvider } from "@chakra-ui/react";
import { ChakraUIInferencer } from "@refinedev/inferencer/chakra-ui";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

const App = () => {
    return (
        <ChakraProvider theme={refineTheme}>
            <BrowserRouter>
                <Refine
                    authProvider={authProvider}
                    routerProvider={routerBindings}
                    dataProvider={dataProvider(
                        "https://api.fake-rest.refine.dev",
                    )}
                    notificationProvider={notificationProvider}
                    resources={[
                        {
                            name: "blog_posts",
                            list: "/blog-posts",
                            show: "/blog-posts/show/:id",
                            edit: "/blog-posts/edit/:id",
                            create: "/blog-posts/create",
                        },
                    ]}
                >
                    <Routes>
                        <Route
                            element={
                                <Authenticated
                                    fallback={<CatchAllNavigate to="/login" />}
                                >
                                    <ThemedLayoutV2>
                                        <Outlet />
                                    </ThemedLayoutV2>
                                </Authenticated>
                            }
                        >
                            <Route path="blog-posts">
                                <Route index element={<ChakraUIInferencer />} />
                                <Route
                                    path="show/:id"
                                    element={<ChakraUIInferencer />}
                                />
                                <Route
                                    path="edit/:id"
                                    element={<ChakraUIInferencer />}
                                />
                                <Route
                                    path="create"
                                    element={<ChakraUIInferencer />}
                                />
                            </Route>
                        </Route>
                        <Route
                            element={
                                <Authenticated fallback={<Outlet />}>
                                    <NavigateToResource />
                                </Authenticated>
                            }
                        >
                            <Route
                                path="/login"
                                element={<AuthPage type="login" />}
                            />
                            <Route
                                path="/register"
                                element={<AuthPage type="register" />}
                            />
                            <Route
                                path="/forgot-password"
                                element={<AuthPage type="forgotPassword" />}
                            />
                            <Route
                                path="/update-password"
                                element={<AuthPage type="updatePassword" />}
                            />
                        </Route>
                        <Route
                            element={
                                <Authenticated fallback={<Outlet />}>
                                    <ThemedLayoutV2>
                                        <Outlet />
                                    </ThemedLayoutV2>
                                </Authenticated>
                            }
                        >
                            <Route path="*" element={<ErrorComponent />} />
                        </Route>
                    </Routes>
                </Refine>
            </BrowserRouter>
        </ChakraProvider>
    );
};
```

In this section, we will learn how to create auth pages such as login, signup, forgot password and reset password using the `<AuthPage/>` component.

It will allow us to easily create and customize them with various props. Though we do need to have an auth provider to use it, since we already created one in the previous section, we will just use that.

> For more information, refer to the [`<AuthPage/>` documentation &#8594](/docs/api-reference/chakra-ui/components/chakra-auth-page)

## Login Page

Login page is used for authenticating the users. It provides a basic form to enter email, password and remember, which it sends to auth provider’s `login` method via the `useLogin` hook.

To implement the page, open `src/App.tsx` file and import the `<AuthPage/>` component.

```tsx
import { AuthPage } from "@refinedev/chakra-ui";
```

Then place the `<AuthPage/>` component to the respective route inside your router.

```tsx
import { Refin, Authenticated } from "@refinedev/core";
import routerBindings, {
    CatchAllNavigate,
    NavigateToResource,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import {
    ErrorComponent,
    ThemedLayoutV2,
    refineTheme,
    notificationProvider,
    //highlight-next-line
    AuthPage,
} from "@refinedev/chakra-ui";
import { ChakraProvider } from "@chakra-ui/react";
import { ChakraUIInferencer } from "@refinedev/inferencer/chakra-ui";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { BlogPostList } from "pages/blog-posts/list";

import { authProvider } from "./authProvider";

const App = () => {
    return (
        <ChakraProvider theme={refineTheme}>
            <BrowserRouter>
                <Refine
                    authProvider={authProvider}
                    routerProvider={routerBindings}
                    dataProvider={dataProvider(
                        "https://api.fake-rest.refine.dev",
                    )}
                    notificationProvider={notificationProvider}
                    resources={[
                        {
                            name: "blog_posts",
                            list: "/blog-posts",
                        },
                    ]}
                >
                    <Routes>
                        <Route
                            element={
                                <Authenticated
                                    fallback={<CatchAllNavigate to="/login" />}
                                >
                                    <ThemedLayoutV2>
                                        <Outlet />
                                    </ThemedLayoutV2>
                                </Authenticated>
                            }
                        >
                            <Route path="blog-posts">
                                <Route index element={<BlogPostList />} />
                            </Route>
                        </Route>
                        <Route
                            element={
                                <Authenticated fallback={<Outlet />}>
                                    <NavigateToResource />
                                </Authenticated>
                            }
                        >
                            {/* highlight-start */}
                            <Route
                                path="/login"
                                element={<AuthPage type="login" />}
                            />
                            {/* highlight-end */}
                        </Route>
                        <Route
                            element={
                                <Authenticated fallback={<Outlet />}>
                                    <ThemedLayoutV2>
                                        <Outlet />
                                    </ThemedLayoutV2>
                                </Authenticated>
                            }
                        >
                            <Route path="*" element={<ErrorComponent />} />
                        </Route>
                    </Routes>
                </Refine>
            </BrowserRouter>
        </ChakraProvider>
    );
};
```

The `<AuthPage>` component renders the login page by default, so we don't need to pass any props to the `<AuthPage/>` component.

:::note

Email, password and remember are passed to the auth provider's `login` method like below upon login:

```ts
const authProvider = {
    login: ({ email, password, remember }) => {
        ...
    },
    ...
};
```

:::

Finally, run the app and navigate to the `/login` page.

```tsx live previewOnly previewHeight=600px url=http://localhost:3000/login
setInitialRoutes(["/login"]);

render(<App />);
```

## Register Page

Register page is used to register new users. It provides a basic form to enter email and password, which it sends to the auth provider's `register` method via the `useRegister` hook.

To implement the page, place the `<AuthPage/>` component to the respective route inside your router.

```tsx
import { Refine, Authenticated } from "@refinedev/core";
import routerBindings, {
    CatchAllNavigate,
    NavigateToResource,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import {
    ErrorComponent,
    ThemedLayoutV2,
    refineTheme,
    notificationProvider,
    //highlight-next-line
    AuthPage,
} from "@refinedev/chakra-ui";
import { ChakraProvider } from "@chakra-ui/react";
import { ChakraUIInferencer } from "@refinedev/inferencer/chakra-ui";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { BlogPostList } from "pages/blog-posts/list";

import { authProvider } from "./authProvider";

const App = () => {
    return (
        <ChakraProvider theme={refineTheme}>
            <BrowserRouter>
                <Refine
                    authProvider={authProvider}
                    routerProvider={routerBindings}
                    dataProvider={dataProvider(
                        "https://api.fake-rest.refine.dev",
                    )}
                    notificationProvider={notificationProvider}
                    resources={[
                        {
                            name: "blog_posts",
                            list: "/blog-posts",
                        },
                    ]}
                >
                    <Routes>
                        <Route
                            element={
                                <Authenticated
                                    fallback={<CatchAllNavigate to="/login" />}
                                >
                                    <ThemedLayoutV2>
                                        <Outlet />
                                    </ThemedLayoutV2>
                                </Authenticated>
                            }
                        >
                            <Route path="blog-posts">
                                <Route index element={<BlogPostList />} />
                            </Route>
                        </Route>
                        <Route
                            element={
                                <Authenticated fallback={<Outlet />}>
                                    <NavigateToResource />
                                </Authenticated>
                            }
                        >
                            <Route
                                path="/login"
                                element={<AuthPage type="login" />}
                            />
                            {/* highlight-start */}
                            <Route
                                path="/register"
                                element={<AuthPage type="register" />}
                            />
                            {/* highlight-end */}
                        </Route>
                        <Route
                            element={
                                <Authenticated fallback={<Outlet />}>
                                    <ThemedLayoutV2>
                                        <Outlet />
                                    </ThemedLayoutV2>
                                </Authenticated>
                            }
                        >
                            <Route path="*" element={<ErrorComponent />} />
                        </Route>
                    </Routes>
                </Refine>
            </BrowserRouter>
        </ChakraProvider>
    );
};
```

We need to pass the `type` prop to the `<AuthPage/>` component to render the register page.

:::note

Email and password are passed to the auth provider's `register` method like below:

```ts
const authProvider = {
    register: ({ email, password }) => {
        ...
    },
    ...
};
```

:::

Then run the app and navigate to the `/register` page.

```tsx live previewOnly previewHeight=600px url=http://localhost:3000/register
setInitialRoutes(["/register"]);

render(<App />);
```

## Forgot Password Page

Forgot password page is used to send a reset password link to the user's email. It provides a basic form to enter email, which it sends to the auth provider's `forgotPassword` method via the `useForgotPassword` hook.

To implement the page, place the `<AuthPage/>` component to the respective route inside your router:

```tsx
import { Refine, Authenticated } from "@refinedev/core";
import routerBindings, {
    CatchAllNavigate,
    NavigateToResource,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import {
    ErrorComponent,
    ThemedLayoutV2,
    refineTheme,
    notificationProvider,
    //highlight-next-line
    AuthPage,
} from "@refinedev/chakra-ui";
import { ChakraProvider } from "@chakra-ui/react";
import { ChakraUIInferencer } from "@refinedev/inferencer/chakra-ui";

import { BlogPostList } from "pages/blog-posts/list";

import { authProvider } from "./authProvider";

const App = () => {
    return (
        <ChakraProvider theme={refineTheme}>
            <BrowserRouter>
                <Refine
                    authProvider={authProvider}
                    routerProvider={routerBindings}
                    dataProvider={dataProvider(
                        "https://api.fake-rest.refine.dev",
                    )}
                    notificationProvider={notificationProvider}
                    resources={[
                        {
                            name: "blog_posts",
                            list: "/blog-posts",
                        },
                    ]}
                >
                    <Routes>
                        <Route
                            element={
                                <Authenticated
                                    fallback={<CatchAllNavigate to="/login" />}
                                >
                                    <ThemedLayoutV2>
                                        <Outlet />
                                    </ThemedLayoutV2>
                                </Authenticated>
                            }
                        >
                            <Route path="blog-posts">
                                <Route index element={<BlogPostList />} />
                            </Route>
                        </Route>
                        <Route
                            element={
                                <Authenticated fallback={<Outlet />}>
                                    <NavigateToResource />
                                </Authenticated>
                            }
                        >
                            <Route
                                path="/login"
                                element={<AuthPage type="login" />}
                            />
                            <Route
                                path="/register"
                                element={<AuthPage type="register" />}
                            />
                            {/* highlight-start */}
                            <Route
                                path="/forgot-password"
                                element={<AuthPage type="forgotPassword" />}
                            />
                            {/* highlight-end */}
                        </Route>
                        <Route
                            element={
                                <Authenticated fallback={<Outlet />}>
                                    <ThemedLayoutV2>
                                        <Outlet />
                                    </ThemedLayoutV2>
                                </Authenticated>
                            }
                        >
                            <Route path="*" element={<ErrorComponent />} />
                        </Route>
                    </Routes>
                </Refine>
            </BrowserRouter>
        </ChakraProvider>
    );
};
```

We need to pass the `forgotPassword` prop to the `<AuthPage/>` component to render the forgot password page.

:::note

The email is passed to the auth provider's `forgotPassword` method like below:

```ts

const authProvider = {
    forgotPassword: ({ email }) => {
        ...
    },
    ...
};
```

:::

Then run the app and navigate to the `/forgot-password` page.

```tsx live previewOnly previewHeight=600px url=http://localhost:3000/forgot-password
setInitialRoutes(["/forgot-password"]);

render(<App />);
```

## Update Password Page

Update password page is used to update the user's password. It provides a basic form to enter new password and confirm password, which it sends to the auth provider's `updatePassword` method via `useUpdatePassword` hook.

To implement this page, place the `<AuthPage/>` component to the respective route inside your router:

```tsx
import { Refine, Authenticated } from "@refinedev/core";
import routerBindings, {
    CatchAllNavigate,
    NavigateToResource,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import {
    ErrorComponent,
    ThemedLayoutV2,
    refineTheme,
    notificationProvider,
    //highlight-next-line
    AuthPage,
} from "@refinedev/chakra-ui";
import { ChakraProvider } from "@chakra-ui/react";
import { ChakraUIInferencer } from "@refinedev/inferencer/chakra-ui";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { BlogPostList } from "pages/blog-posts/list";

import { authProvider } from "./authProvider";

const App = () => {
    return (
        <ChakraProvider theme={refineTheme}>
            <BrowserRouter>
                <Refine
                    authProvider={authProvider}
                    routerProvider={routerBindings}
                    dataProvider={dataProvider(
                        "https://api.fake-rest.refine.dev",
                    )}
                    notificationProvider={notificationProvider}
                    resources={[
                        {
                            name: "blog_posts",
                            list: "/blog-posts",
                        },
                    ]}
                >
                    <Routes>
                        <Route
                            element={
                                <Authenticated
                                    fallback={<CatchAllNavigate to="/login" />}
                                >
                                    <ThemedLayoutV2>
                                        <Outlet />
                                    </ThemedLayoutV2>
                                </Authenticated>
                            }
                        >
                            <Route path="blog-posts">
                                <Route index element={<BlogPostList />} />
                            </Route>
                        </Route>
                        <Route
                            element={
                                <Authenticated fallback={<Outlet />}>
                                    <NavigateToResource />
                                </Authenticated>
                            }
                        >
                            <Route
                                path="/login"
                                element={<AuthPage type="login" />}
                            />
                            <Route
                                path="/register"
                                element={<AuthPage type="register" />}
                            />
                            <Route
                                path="/forgot-password"
                                element={<AuthPage type="forgotPassword" />}
                            />
                            {/* highlight-start */}
                            <Route
                                path="/update-password"
                                element={<AuthPage type="updatePassword" />}
                            />
                            {/* highlight-end */}
                        </Route>
                        <Route
                            element={
                                <Authenticated fallback={<Outlet />}>
                                    <ThemedLayoutV2>
                                        <Outlet />
                                    </ThemedLayoutV2>
                                </Authenticated>
                            }
                        >
                            <Route path="*" element={<ErrorComponent />} />
                        </Route>
                    </Routes>
                </Refine>
            </BrowserRouter>
        </ChakraProvider>
    );
};
```

We need to pass the `updatePassword` prop to the `<AuthPage/>` component to render the update password page.

:::note

The new password and confirm password are passed to the auth provider's `updatePassword` method like below:

```ts
const authProvider = {
    updatePassword: ({ password, confirmPassword }) => {
        ...
    },
    ...
};
```

:::

Then run the app and navigate to the `/update-password` page.

```tsx live previewOnly previewHeight=600px url=http://localhost:3000/update-password
setInitialRoutes(["/update-password"]);

render(<App />);
```

## Customizing Auth Pages

You can use [`refine-cli`](/docs/packages/documentation/cli/) to [swizzle](/docs/packages/documentation/cli.md#swizzle) the auth pages and customize them:

1. Run the following command in the project directory:

    ```bash
        npm run refine swizzle
    ```

2. Select the `@refinedev/chakra-ui` package:

    ```bash
            ? Which package do you want to swizzle?
            UI Framework
            ❯  @refinedev/chakra-ui
    ```

3. Select the `AuthPage` component:

    ```bash
            ? Which component do you want to swizzle?
            Pages
            ErrorPage
            ❯  AuthPage
    ```

After swizzling the auth pages, you should see a success message like below:

```bash
    Successfully swizzled AuthPage

    Files created:
    - src/components/pages/auth/index.tsx
    - src/components/pages/auth/components/forgotPassword.tsx
    - src/components/pages/auth/components/login.tsx
    - src/components/pages/auth/components/register.tsx
    - src/components/pages/auth/components/updatePassword.tsx
    - src/components/pages/auth/components/index.tsx
    - src/components/pages/auth/components/styles.ts
    ...
```

Now, you can customize the auth pages by editing the files in the `src/components/pages/auth` folder.

:::tip
You can also customize the auth pages by using the `<AuthPage>` component's props.

For more information, refer to the [component props section of the `<AuthPage/>` documentation &#8594](/docs/api-reference/chakra-ui/components/auth-page.md#props)
:::

<br/>

<Checklist>

<ChecklistItem id="auth-provider-chakra-ui-auth-pages">
I understood how to use AuthPage component to render auth pages.
</ChecklistItem>
<ChecklistItem id="auth-provider-chakra-ui-auth-pages-2">
I understood how to customize auth pages.
</ChecklistItem>

</Checklist>
