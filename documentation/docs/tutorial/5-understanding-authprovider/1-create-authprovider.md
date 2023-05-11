---
id: create-authprovider
title: 2. Create Auth Provider From Scratch
tutorial:
    prev: tutorial/understanding-authprovider/index
    next: tutorial/understanding-authprovider/{preferredUI}/auth-pages
---

We will show you how to create an auth provider from scratch in this section. After you understand the logic of the auth provider, you can easily integrate third-party authentication services or custom auth providers. We will be using mock data to better focus on the auth provider.

## Creating a Mock Auth Provider

First, create a new file named `authProvider.ts` in the `src` folder and add the following code:

```tsx title="src/authProvider.ts"
import type { AuthBindings } from "@refinedev/core";

const authProvider: AuthBindings = {
    login: async (params: any) => ({}),
    check: async (params: any) => ({}),
    logout: async (params: any) => ({}),
    onError: async (params: any) => ({}),
};

export default authProvider;
```

Now, to pass the `authProvider` to the `<Refine/>` component, open `App.tsx` file and add the related code:

```tsx title="src/App.tsx"
// ---
import authProvider from "./authProvider";

<Refine
    // ---
    authProvider={authProvider}
/>;
```

:::note
`authProvider` isn't required for the `<Refine/>` to work but your app won't have any authentication and incidentally, you wo'nt be able to use the auth hooks.
:::

Our mock auth provider is now up and running with all the required methods, but they don't do anything yet. We will now add logic to these methods.

## Required Methods

### login

`login` method is used to authenticate users. It expects to return a resolved promise with the following type:

```ts
type AuthActionResponse = {
    success: boolean;
    redirectTo?: string;
    error?: Error;
    [key: string]: unknown;
};
```

-   `success`: Determines whether the operation is successful or not.
-   `redirectTo`: The path of the page that the user will be redirected to after the operation is completed.
-   `error`: An object containing details about any errors encountered during the operation.
-   `[key: string]`: Any additional data you wish to include in the response, keyed by a string identifier.

We will use a mock user list and check if the user exists in the list. If they do, we will save the user data to the local storage and resolve the promise with `success: true`. Otherwise, we will resolve the promise with `success: false`:

```tsx title="src/authProvider.ts"
import { AuthBindings } from "@refinedev/core";

const mockUsers = [{ email: "john@mail.com" }, { email: "jane@mail.com" }];

const authProvider: AuthBindings = {
    login: async ({ email, password }) => {
        // Suppose we actually send a request to the back end here.
        const user = mockUsers.find((item) => item.email === email);

        if (user) {
            localStorage.setItem("auth", JSON.stringify(user));
            return {
                success: true,
                redirectTo: "/",
            };
        }

        return {
            success: false,
            error: {
                message: "Login Error",
                name: "Invalid email or password",
            },
        };
    },
    // ---
};
```

<br />

Invoking the `useLogin` hook's mutation will call the `login` method, passing in the mutation's parameters as arguments. This means the parameters for the `useLogin` hook's mutation must match the parameters of the login method.

For example, if we call the `useLogin` hook's mutation like this:

```tsx
import { useLogin } from "@refinedev/core";

const { mutate } = useLogin();

mutate({ email: "john@mail.com", password: "123456" });
```

The `login` method will get the mutation's parameters as arguments.

At this point, we can authenticate users but can't check if the user is authenticated or not when the user refreshes the page or navigates to another page. We will add the logic to the `check` method to solve this problem.

<br />

<details>
  <summary><strong>Can I pass any parameters to the <code>login</code> method?</strong></summary>

Yes, you can pass any parameters to the `login` method. `useLogin` hook's mutation will pass the mutation's parameters to the `login` method without any type constraints.

```ts
const { mutate } = useLogin<{
    username: string;
    password: string;
    foo: string;
    remember: boolean;
}>();
```

</details>

<details>
  <summary><strong>How can I redirect the user to a specific page after login?</strong></summary>

If you want to redirect the user to a specific page, you can resolve the promise with an object that has the `redirectTo` property.

```ts
const authProvider: AuthBindings = {
    // ---
    login: async () => {
        // ---
        if (user) {
            return {
                success: true,
                redirectTo: "/custom-page",
            };
        } else {
            return {
                success: false,
                redirectTo: "/register",
            };
        }
    },
};
```

You can also use the `useLogin` hook's for this purpose:

```tsx
const { mutate } = useLogin();

mutate({ redirectPath: "/custom-page" });
```

Then use the `redirectPath` parameter in the `login` method to redirect the user to the specific page:

```ts
const authProvider: AuthBindings = {
    // ---
    login: async ({ redirectPath }) => {
        //---
        return {
            success: false,
            redirectTo: redirectPath,
        };
    },
};
```

If you don't want to redirect the user anywhere, you can resolve the `login` method's promise with `redirectTo: undefined`.

```ts
const authProvider: AuthBindings = {
    // ---
    login: async () => {
        // ---
        return {
            success: false,
            redirectTo: undefined,
        };
    },
};
```

</details>

<details>
  <summary><strong>How can I customize the error message?</strong></summary>

**refine** automatically displays an error notification when the `login` method resolves the promise with `success: false`. If you want to customize the error message, you can resolve the promise with an `error` object that has `name` and `message` properties.

```tsx title="src/authProvider.ts"
import { AuthBindings } from "@refinedev/core";

const authProvider: AuthBindings = {
    login: async ({ email, password }) => {
        // ---
        return {
            success: false,
            error: {
                name: "Login Failed!",
                message:
                    "The email or password that you've entered doesn't match any account.",
            },
        };
    },
    // ---
};
```

</details>

> For more information, refer to the [`useLogin` documentation&#8594](/docs/api-reference/core/hooks/authentication/useLogin/)

### check

The `check` method is used to check if the user is authenticated. It is internally called when the user navigates to a page that requires authentication. This method expects to return a resolved promise with the following type:

```ts
type CheckResponse = {
    authenticated: boolean;
    redirectTo?: string;
    logout?: boolean;
    error?: Error;
};
```

-   `authenticated`: A boolean value indicating whether the user is authenticated or not.
-   `redirectTo`: A string value indicating the URL to redirect to if authentication is required.
-   `logout`: A boolean value indicating whether the user should be logged out.
-   `error`: An Error object representing any errors that may have occurred during the check.

Since we saved the user data to the local storage, we will check that to determine if the user is authenticated:

```tsx title="src/authProvider.ts"
import { AuthBindings } from "@refinedev/core";

const authProvider: AuthBindings = {
    // ---
    check: async () => {
        const user = localStorage.getItem("auth");

        if (user) {
            return {
                authenticated: true,
            };
        }

        return {
            authenticated: false,
            logout: true,
            redirectTo: "/login",
            error: {
                message: "Check failed",
                name: "Unauthorized",
            },
        };
    },
    // ---
};
```

<br />

Invoking the `useIsAuthenticated` hook will call the `check` method. If `check` method resolves a data, it will be available in the `useIsAuthenticated` hook's `data` property.

```tsx
import { useIsAuthenticated } from "@refinedev/core";

const { data, isSuccess, isLoading, isError, refetch } = useIsAuthenticated();
```

:::tip

The `<Authenticated>` component makes use of the `useIsAuthenticated` hook, allowing you to render the components only if the user is authenticated.

For more information, refer to the [`<Authenticated>`&#8594](/docs/api-reference/core/components/auth/authenticated/)

:::

<br />

<details>
  <summary><strong>How can I redirect the user if they are not authenticated?</strong></summary>

If you want to redirect the user to a specific page, you can resolve the Promise with an object that has `redirectTo` property.

```ts
const authProvider: AuthBindings = {
    // ---
    check: async () => {
        // ---
        return {
            authenticated: false,
            redirectTo: "/custom-page",
        };
    },
};
```

</details>

> For more information, refer to the [`useIsAuthenticated` documentation&#8594](/docs/api-reference/core/hooks/authentication/useIsAuthenticated/)

### logout

The `logout` method is used to log out users. It expects to return a resolved promise with the following type:

```ts
type AuthActionResponse = {
    success: boolean;
    redirectTo?: string;
    error?: Error;
    [key: string]: unknown;
};
```

-   `success`: Determines whether the operation is successful or not.
-   `redirectTo`: The path of the page that the user will be redirected to after the operation is completed.
-   `error`: An object containing details about any errors encountered during the operation.
-   `[key: string]`: Any additional data you wish to include in the response, keyed by a string identifier.

Opposite to what we did in the `login` method, we now need to remove the user data from the local storage upon log out:

```tsx title="src/authProvider.ts"
import { AuthBindings } from "@refinedev/core";

const authProvider: AuthBindings = {
    // ---
    logout: async () => {
        localStorage.removeItem("auth");
        return {
            success: true,
            redirectTo: "/login",
        };
    },
    // ---
};
```

<br />

Invoking the `useLogout` hook's mutation will call the `logout` method. If you need to pass any parameters to the `logout` method, you can use the `useLogout` hook's mutation.

For example, if we call the `useLogout` hook's mutation like this:

```tsx
import { useLogout } from "@refinedev/core";

const { mutate } = useLogout();

mutate({ id: "1" });
```

The `logout` method will get the mutation's parameters as an argument.

<br />

<details>
  <summary><strong>Can I pass any parameters to the <code>logout</code> method?</strong></summary>

Yes, you can pass any parameters to the `logout` method. The `useLogout` hook's mutation will pass the mutation's parameters to the `logout` method without any type constraints.

```ts
const { mutate } = useLogout<{
    id: string;
    name: string;
}>();
```

</details>

<details>
  <summary><strong>How can I redirect the user to a specific page after logout?</strong></summary>

If you want to redirect the user to a specific page, you can resolve the promise with an object that has the `redirectTo` property.

```ts
const authProvider: AuthBindings = {
    // ---
    logout: async () => {
        // ---
        return {
            success: true,
            redirectTo: "/login",
        };
    },
};
```

You can also use the `useLogout` hook for this purpose:

```tsx
const { mutate } = useLogout();

mutate({ redirectPath: "/custom-page" });
```

Then use the `redirectPath` parameter in the `logout` method to redirect the user to the specific page:

```ts
const authProvider: AuthBindings = {
    // ---
    logout: ({ redirectPath }) => {
        // ---
        return {
            success: true,
            redirectTo: redirectPath,
        };
    },
};
```

If you don't want to redirect the user to anywhere, you can resolve the `logout` method's Promise with `redirectTo: undefined`.

```ts
const authProvider: AuthBindings = {
    // ---
    logout: async () => {
        // ---
        return {
            success: true,
            redirectTo: undefined,
        };
    },
};
```

</details>

<details>
  <summary><strong>How can I customize the error message?</strong></summary>

**refine** automatically displays an error notification when the `logout` method resolves the Promise with `success: false`. If you want to customize the error message, you can resolve the Promise with an `error` object that has `name` and `message` properties.

```tsx title="src/authProvider.ts"
import { AuthBindings } from "@refinedev/core";

const authProvider: AuthBindings = {
    logout: async () => {
        // ---
        return {
            success: false,
            error: {
                name: "Logout Failed!",
                message: "Something went wrong.",
            },
        };
    },
    // ---
};
```

</details>

> For more information, refer to the [`useLogout` documentation&#8594](/docs/api-reference/core/hooks/authentication/useLogout/)

### onError

`onError` method is called when you get an error response from the API. You can create your own business logic to handle the error such as refreshing the token, logging out the user, etc.

`onError` method expects to return a Promise with the following type:

```ts
type OnErrorResponse = {
    redirectTo?: string;
    logout?: boolean;
    error?: Error;
};
```

-   `redirectTo`: If has a value, the app will be redirected to the given URL.
-   `logout`: If is `true`, useOnError calls the `logout` method.
-   `error`: An Error object representing any errors that may have occurred during the operation.

We'll use the `onError` method to log out the user if the API returns a `401` or `403` error. If `redirectTo` is set, `logout` method will be called with the `redirectTo` value.

```tsx title="src/authProvider.ts"
import { AuthBindings } from "@refinedev/core";

const authProvider: AuthBindings = {
    // ---
    onError: async (error) => {
        if (error.status === 401 || error.status === 403) {
            return {
                logout: true,
                redirectTo: "/login",
                error,
            };
        }

        return {};
    },
    // ---
};
```

<br />

Invoking the `useOnError` hook's mutation will call the `onError` method, passing in the mutation's parameters as arguments.

For example, if you want to check the error of a fetch request, you can use the `useOnError` hook's mutation like this:

```tsx
import { useOnError } from "@refinedev/core";

const { mutate } = useOnError();

fetch("http://example.com/payment")
    .then(() => console.log("Success"))
    .catch((error) => mutate(error));
```

<br />

<details>
  <summary><strong>How can I redirect the user to a specific page after logout?</strong></summary>

If you want to redirect the user to a specific page, you can resolve the promise with an object that has `redirectTo` property.

```ts
const authProvider: AuthBindings = {
    // ---
    onError: async (error) => {
        if (error.status === 401 || error.status === 403) {
            return {
                redirectTo: "/custom-page",
            };
        }

        return {};
    },
    // ---
};
```

</details>

> For more information, refer to the [`useOnError` documentation&#8594](/docs/api-reference/core/hooks/authentication/useOnError/)

## Optional Methods

### getPermissions

`getPermissions` method is used to get the user's permissions. It expects to return a resolved promise.

We will use the `getPermissions` method to get the user's permissions from the `localStorage`.

```tsx title="src/authProvider.ts"
import { AuthBindings } from "@refinedev/core";

const mockUsers = [
    { email: "john@mail.com", roles: ["admin"] },
    { email: "jane@mail.com", roles: ["editor"] },
];

const authProvider: AuthBindings = {
    // ---
    getPermissions: () => {
        const user = localStorage.getItem("auth");

        if (user) {
            const { roles } = JSON.parse(user);

            return roles;
        }

        return null;
    },
    // ---
};
```

<br />

Invoking the `usePermissions` hook will call the `getPermissions` method. If `getPermissions` method resolves a data, it will be available in the `usePermissions` hook's `data` property.

For example, if you want to check if the user has a specific permission, you can use the `usePermissions` hook like this:

```tsx
import { usePermissions } from "@refinedev/core";

const { data } = usePermissions();

if (data?.includes("admin")) {
    console.log("User has admin permissions");
}
```

<br />

:::info
Though `usePermissions` hook can be used for simple authorization purposes, if you need more complex authorization logic, we recommend using the access control provider.

For more information, refer to the [`accessControlProvider` documentation&#8594](docs/api-reference/core/providers/accessControl-provider/)
:::

> For more information, refer to the [`usePermissions` documentation &#8594](/docs/api-reference/core/hooks/authentication/usePermissions/)

### getIdentity

`getIdentity` method is used to get the user's identity. It expects to return a resolved promise.

To get the user's identity from the local storage and resolve the promise:

```tsx title="src/authProvider.ts"
import { AuthBindings } from "@refinedev/core";

const mockUsers = [
    { email: "john@mail.com", roles: ["admin"] },
    { email: "jane@mail.com", roles: ["editor"] },
];

const authProvider: AuthBindings = {
    // ---
    getIdentity: async () => {
        const user = localStorage.getItem("auth");

        if (user) {
            const { email, roles } = JSON.parse(user);

            return { email, roles };
        }

        return null;
    },
    // ---
};
```

<br />

Invoking the `useGetIdentity` hook will call the `getIdentity` method. If `getIdentity` method resolves a data, it will be available in the `useGetIdentity` hook's `data` property.

For example, if you want to get the user's email, you can use the `useGetIdentity` hook like this:

```tsx
import { useGetIdentity } from "@refinedev/core";

const { data } = useGetIdentity();

if (data) {
    console.log(data.email);
}
```

:::info

Depending on the UI framework you use, resolving `name` and `avatar` properties in the `getIdentity` method may show the user's name and avatar in the header in the default layout.

```ts
const authProvider: AuthBindings = {
    // ---
    getIdentity: async () => {
        const user = localStorage.getItem("auth");

        if (user) {
            const { email, roles } = JSON.parse(user);

            return {
                email,
                roles,
                // highlight-start
                name: "John Doe",
                avatar: "https://i.pravatar.cc/300",
                // highlight-end
            };
        }

        return null;
    },
    // ---
};
```

:::

> For more information, refer to the [`useGetIdentity` documentation&#8594](/docs/api-reference/core/hooks/authentication/useGetIdentity/)

### register

`register` method is used to register a new user. It is similar to the `login` method. It expects to return a resolved promise with the following type:

```ts
type RegisterResponse = {
    success: boolean;
    redirectTo?: string;
    error?: Error;
    [key: string]: unknown;
};
```

-   `success`: Determines whether the operation is successful or not.
-   `redirectTo`: The path of the page that the user will be redirected to after the operation is completed.
-   `error`: An object containing details about any errors encountered during the operation.
-   `[key: string]`: Any additional data you wish to include in the response, keyed by a string identifier.

We'll register a new user and resolve the promise.

```tsx title="src/authProvider.ts"
import { AuthBindings } from "@refinedev/core";

const mockUsers = [{ email: "john@mail.com" }, { email: "jane@mail.com" }];

const authProvider: AuthBindings = {
    // ---
    register: async async ({ email }) => {
        const user = mockUsers.find((user) => user.email === email);

        if (user) {
            return {
                success: false,
                error: {
                    name: "Register Error",
                    message: "User already exists",
                },
            };
        }

        mockUsers.push({ email });

        return {
            success: true,
            redirectTo: "/login",
        };
    },
    // ---
};
```

<br />

Invoking the `useRegister` hook's mutation will call the `register` method, passing in the mutation's parameters as arguments.

For example, if you want to register a new user, you can use the `useRegister` hook like this:

```tsx
import { useRegister } from "@refinedev/core";

const { mutate } = useRegister();

const handleRegister = (values) => {
    mutate(values);
};
```

The `register` method will get the mutation's parameters as arguments.

<br />

<details>
  <summary><strong>Can I pass any parameters to the <code>register</code> method?</strong></summary>

Yes, you can pass any parameters to the `register` method. `useRegister` hook's mutation will pass the mutation's parameters to the `register` method without any type constraints.

```ts
const { mutate } = useRegister<{
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    remember: boolean;
}>();
```

</details>

<details>
  <summary><strong>How can I redirect the user to a specific page after registration?</strong></summary>

If you want to redirect the user to a specific page, you can resolve the Promise with an object that has `redirectTo` property.

```ts
const authProvider: AuthBindings = {
    // ---
    register: async () => {
        // ---
        return {
            success: true, // or false
            redirectTo: "/custom-page",
        };
    },
};
```

You can also use the `useRegister` hook's for this purpose:

```tsx
const { mutate } = useRegister();

mutate({ redirectPath: "/custom-page" });
```

Then use the `redirectPath` parameter in the `register` method to redirect the user to the specific page:

```ts
const authProvider: AuthBindings = {
    // ---
    register: async ({ redirectPath }) => {
        // ---
        return {
            success: true, // or false
            redirectTo: redirectPath,
        };
    },
};
```

If you don't want to redirect the user to anywhere, you can resolve the `register` method's Promise with `redirectTo: undefined`.

```ts
const authProvider: AuthBindings = {
    // ---
    register: async () => {
        // ---
        return {
            success: true, // or false
            redirectTo: undefined,
        };
    },
};
```

</details>

<details>
  <summary><strong>How can I customize the error message?</strong></summary>

**refine** automatically displays an error notification when the `register` method resolves the Promise with `success: false`. If you want to customize the error message, you can resolve the Promise with an `error` object that has `name` and `message` properties.

```tsx title="src/authProvider.ts"
const authProvider: AuthBindings = {
    // ---
    register: async () => {
        // ---
        return {
            success: false,
            error: {
                name: "Error",
                message: "Something went wrong!",
            },
        };
    },
};
```

</details>

> For more information, refer to the [`useRegister` documentation&#8594](/docs/api-reference/core/hooks/authentication/useRegister/)

### forgotPassword

`forgotPassword` method is used to send a password reset link to the user's email address. It expects to return a resolved promise with the following type:

```ts
type AuthActionResponse = {
    success: boolean;
    redirectTo?: string;
    error?: Error;
    [key: string]: unknown;
};
```

-   `success`: Determines whether the operation is successful or not.
-   `redirectTo`: The path of the page that the user will be redirected to after the operation is completed.
-   `error`: An object containing details about any errors encountered during the operation.
-   `[key: string]`: Any additional data you wish to include in the response, keyed by a string identifier.

To send a password reset link to the user's email address and resolve the promise:

```tsx title="src/authProvider.ts"
import { AuthBindings } from "@refinedev/core";

const authProvider: AuthBindings = {
    // ---
    forgotPassword: async ({ email }) => {
        // send password reset link to the user's email address here

        // if request is successful
        return {
            success: true,
            redirectTo: "/login",
        };

        // if request is not successful
        return {
            success: false,
            error: {
                name: "Forgot Password Error",
                message: "Email address does not exist",
            },
        };
    },
    // ---
};
```

<br />

Invoking the `useForgotPassword` hook's mutation will call the `forgotPassword` method, passing in the mutation's parameters as arguments.

For example, if you want to send a password reset link to the user's email address, you can use the `useForgotPassword` hook like this:

```tsx
import { useForgotPassword } from "@refinedev/core";

const { mutate } = useForgotPassword();

const handleForgotPassword = (values) => {
    mutate(values);
};
```

The `forgotPassword` method will get the mutation's parameters as arguments.

<br />

<details>
  <summary><strong>Can I pass any parameters to the <code>forgotPassword</code> method?</strong></summary>

Yes, you can pass any parameters to the `forgotPassword` method. `useForgotPassword` hook's mutation will pass the mutation's parameters to the `forgotPassword` method without any type constraints.

```ts
const { mutate } = useForgotPassword<{
    email: string;
}>();
```

</details>

<details>
  <summary><strong>How can I redirect the user to a specific page after sending the password reset link?</strong></summary>

If you want to redirect the user to a specific page, you can resolve the `forgotPassword` method's Promise with the path of the page.

```ts
const authProvider: AuthBindings = {
    // ---
    forgotPassword: async () => {
        // ---
        return {
            success: true,
            redirectTo: "/login",
        };
    },
};
```

Also, you can use the `useForgotPassword` hook's for this purpose.

```ts
const { mutate } = useForgotPassword();

useForgotPassword({ redirectPath: "/custom-page" });
```

Then, you can use the `redirectPath` parameter in the `forgotPassword` method to redirect the user to the specific page.

```ts
const authProvider: AuthBindings = {
    // ---
    forgotPassword: async ({ redirectPath }) => {
        // ---
        return {
            success: true,
            redirectTo: redirectPath,
        };
    },
};
```

</details>

<details>
  <summary><strong>How can I customize the error message?</strong></summary>

**refine** automatically displays an error notification when the `forgotPassword` method resolves the Promise with `success: false`. If you want to customize the error message, you can resolve the Promise with an object that has `name` and `message` properties.

```tsx title="src/authProvider.ts"
const authProvider: AuthBindings = {
    // ---
    forgotPassword: async () => {
        // ---
        return {
            success: false,
            error: {
                name: "Error",
                message: "Something went wrong!",
            },
        };
    },
};
```

</details>

> For more information, refer to the [`useForgotPassword` documentation &#8594](/docs/api-reference/core/hooks/authentication/useForgotPassword/)

### updatePassword

`updatePassword` method is used to update the user's password. It expects to return a resolved promise with the following type:

```ts
type AuthActionResponse = {
    success: boolean;
    redirectTo?: string;
    error?: Error;
    [key: string]: unknown;
};
```

-   `success`: Determines whether the operation is successful or not.
-   `redirectTo`: The path of the page that the user will be redirected to after the operation is completed.
-   `error`: An object containing details about any errors encountered during the operation.
-   `[key: string]`: Any additional data you wish to include in the response, keyed by a string identifier.

To update the user's password and resolve the promise:

```tsx title="src/authProvider.ts"
import { AuthBindings } from "@refinedev/core";

const authProvider: AuthBindings = {
    // ---
    updatePassword: async ({ password }) => {
        // update the user's password here

        // if request is successful
        return {
            success: true,
            redirectTo: "/login",
        };

        // if request is not successful
        return {
            success: false,
            error: {
                name: "Forgot Password Error",
                message: "Email address does not exist",
            },
        };
    },
    // ---
};
```

<br />

Invoking the `useUpdatePassword` hook's mutation will call the `updatePassword` method, passing in the mutation's parameters as arguments. Additionally, the `updatePassword` method will take query parameters as arguments from the URL.

For example, if you want to update the user's password, you can use the `useUpdatePassword` hook like this:

```tsx
import { useUpdatePassword } from "@refinedev/core";

const { mutate } = useUpdatePassword();

const handleUpdatePassword = ({ password, confirmPassword }) => {
    mutate({ password, confirmPassword }});
};
```

If we assume that the URL is `http://localhost:3000/reset-password?token=123`, the `updatePassword` method will get the mutation's parameters as arguments and the `token` query parameter as well.

```ts
const authProvider: AuthBindings = {
    // ---
    updatePassword: async ({ password, confirmPassword, token }) => {
        console.log(token); // 123

        // if request is successful
        return {
            success: true,
            redirectTo: "/login",
        };
    },
};
```

<br />

<details>
  <summary><strong>Can I pass any parameters to the <code>updatePassword</code> method?</strong></summary>

Yes, you can pass any parameters to the `updatePassword` method. `useUpdatePassword` hook's mutation will pass the mutation's parameters to the `updatePassword` method without any type constraints.

```ts
const { mutate } = useUpdatePassword<{
    password: string;
    newPassword: string;
}>();
```

</details>

<details>
  <summary><strong>How can I redirect the user to a specific page after updating the password?</strong></summary>

If you want to redirect the user to a specific page, you can resolve the Promise with an object that has `redirectTo` property.

```ts
const authProvider: AuthBindings = {
    // ---
    updatePassword: async () => {
        // ---
        return {
            success: true,
            redirectTo: "/login",
        };
    },
};
```

You can also use the `useUpdatePassword` hook's for this purpose:

```ts
const { mutate } = useUpdatePassword();

useUpdatePassword({ redirectPath: "/custom-page" });
```

Then use the `redirectPath` parameter in the `updatePassword` method to redirect the user to the specific page:

```ts
const authProvider: AuthBindings = {
    // ---
    updatePassword: async ({ redirectPath }) => {
        // ---
        return {
            success: true,
            redirectTo: redirectPath,
        };
    },
};
```

</details>

<details>
  <summary><strong>How can I customize the error message?</strong></summary>

**refine** automatically displays an error notification when the `updatePassword` method resolves the Promise with `success: false`. If you want to customize the error message, you can resolve the Promise with an `error` object that has `name` and `message` properties.

```tsx title="src/authProvider.ts"
const authProvider: AuthBindings = {
    // ---
    updatePassword: async () => {
        // ---
        return {
            success: false,
            error: {
                name: "Error",
                message: "Something went wrong!",
            },
        };
    },
};
```

</details>

> For more information, refer to the [`useUpdatePassword` documentation &#8594](/docs/api-reference/core/hooks/authentication/useUpdatePassword/)

## Setting Authorization Credentials

After a user logs in, you can save the user's authorization credentials (such as a token) to the browser's `localStorage` or `sessionStorage`. This allows you to include the credentials in API calls by configuring the `dataProvider`.

Here's an example using `axios` and the `localStorage` to add a token acquired from the `login` method to the `Authorization` header of API calls.

```tsx title="App.tsx"
// ---
import { AuthBindings } from "@refinedev/core";
// highlight-next-line
import axios from "axios";

// highlight-next-line
const axiosInstance = axios.create();

const mockUsers = [
    { username: "admin", token: "123" },
    { username: "editor", token: "321" },
];

const App = () => {
    const authProvider: AuthBindings = {
        login: async ({ username, password }) => {
            // Suppose we actually send a request to the back end here.
            const user = mockUsers.find((item) => item.username === username);

            if (user) {
                localStorage.setItem("auth", JSON.stringify(user));
                // This sets the authorization headers on Axios instance
                // highlight-start
                axiosInstance.defaults.headers.common = {
                    Authorization: `Bearer ${user.token}`,
                };
                // highlight-end

                return {
                    redirectTo: "/",
                    success: true,
                };
            }
            return {
                success: false,
                error: {
                    name: "Login Error",
                    message: "Username or password is incorrect",
                },
            };
        },
        // ---
    };

    return (
        <Refine
            authProvider={authProvider}
            routerProvider={routerProvider}
            // In order to use the axios instance, we need to pass it to the dataProvider
            // highlight-next-line
            dataProvider={dataProvider(API_URL, axiosInstance)}
        />
    );
};
```

:::note
We recommend using **axios** as the **HTTP** client with the **@refinedev/simple-rest** [`dataProvider`](/api-reference/core/providers/data-provider.md) but other **HTTP** clients can also be preferred.
:::

<br />

You can also use `axios.interceptors.request.use` to add the token acquired from the `login` method to the `Authorization` header of API calls. It is similar to the above example, but it is more flexible for more complex use cases such as refreshing tokens when they expire.

```tsx title="App.tsx"
// ---
import { AuthBindings } from "@refinedev/core";
// highlight-next-line
import axios, { AxiosRequestConfig } from "axios";

// highlight-next-line
const axiosInstance = axios.create();

// highlight-start
axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
    // Retrieve the token from local storage
    const token = JSON.parse(localStorage.getItem("auth"));
    // Check if the header property exists
    if (request.headers) {
        // Set the Authorization header if it exists
        request.headers["Authorization"] = `Bearer ${token}`;
    } else {
        // Create the headers property if it does not exist
        request.headers = {
            Authorization: `Bearer ${token}`,
        };
    }

    return request;
});
// highlight-end

const mockUsers = [
    { username: "admin", token: "123" },
    { username: "editor", token: "321" },
];

const App = () => {
    const authProvider: AuthBindings = {
        //highlight-start
        login: async ({ username, password }) => {
            // Suppose we actually send a request to the back end here.
            const user = mockUsers.find((item) => item.username === username);

            if (user) {
                localStorage.setItem("auth", JSON.stringify(user));
                return {
                    redirectTo: "/",
                    success: true,
                };
            }
            return {
                success: false,
                error: {
                    name: "Login Error",
                    message: "Username or password is incorrect",
                },
            };
        },
        //highlight-end
        // ---
    };

    return (
        <Refine
            authProvider={authProvider}
            routerProvider={routerProvider}
            //highlight-next-line
            dataProvider={dataProvider(API_URL, axiosInstance)}
        >
            {/* ... */}
        </Refine>
    );
};
```

> For mor information, refer to the [interceptors section of the `axios` documentation &#8594](https://axios-http.com/docs/interceptors)

## Implementing Refresh Token Mechanism

Though we were able to store the token in the `localStorage`, it will have a limited life time. To avoid the user from logging out in mid session, we can implement a refresh token mechanism using the `axios-auth-refresh` package:

```tsx title="App.tsx"
/* ... */
import { Refine, AuthBindings } from "@refinedev/core";
import axios from "axios";
//highlight-next-line
import createAuthRefreshInterceptor from "axios-auth-refresh";

//highlight-next-line
const axiosInstance = axios.create();

// Function that will be called to refresh authorization
//highlight-start
const refreshAuthLogic = (failedRequest) =>
    axiosInstance
        .post(`${API_URL}/auth/token/refresh`)
        .then((tokenRefreshResponse) => {
            localStorage.setItem("token", tokenRefreshResponse.data.token);

            failedRequest.response.config.headers["Authorization"] =
                "Bearer " + tokenRefreshResponse.data.token;

            return Promise.resolve();
        });
//highlight-end

// Instantiate the interceptor
//highlight-next-line
createAuthRefreshInterceptor(axiosInstance, refreshAuthLogic);

const App = () => {
    const authProvider: AuthBindings = {
        /* ... */
    };

    return (
        <Refine
            authProvider={authProvider}
            //highlight-next-line
            dataProvider={dataProvider(API_URL, axiosInstance)}
        >
            /* ... */
        </Refine>
    );
};
```

:::note
Though we used the `axios-auth-refresh` package, you can use another package or create a method of your own for this purpose
:::

> For more information, refer to the [`axios-auth-refresh` repository&#8594](https://github.com/Flyrell/axios-auth-refresh)

<br />

<Checklist>

<ChecklistItem id="auth-provider-create-auth-provider">
I understood how to create a auth provider.
</ChecklistItem>

</Checklist>
