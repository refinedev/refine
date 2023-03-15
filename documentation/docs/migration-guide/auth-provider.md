---
id: auth-provider
title: Migrating Auth Provider from 3.x.x to 4.x.x
sidebar_label: Migrating Auth Provider 🆙
---

## Motivation behind the changes

Our motivation for modifying the `authProvider` prop in **refine** v4 is to enhance its flexibility and customization options to handle a wider range of use cases without over complicating the process.

We wanted to create a common interface for the `authProvider` methods to improve its transparency for developers for better understanding and debugging.

Previously, developers were expected to resolve the `authProvider` methods on success and reject them on failure. However, this approach had limitations, as rejected promises are generally associated with errors or unusual scenarios. Since some errors, such as incorrect login credentials, aren't necessarily failures and must be communicated to the user, rejected promises often led to confusion for developers and hindered the debugging process.

Now, the `authProvider` methods always return a resolved promise that includes an object with a success key. This key indicates whether the operation was successful or not, and in case of failure, an optional error key containing an `Error` object can be used to notify users.

Furthermore, the auth hooks no longer have default redirection paths, which had previously been a source of confusion for some developers. Instead, by adding a `redirectTo` property to the `authProvider` methods' return object, developers can have more control over the redirection after a successful operation.

## Naming changes

-   `AuthPovider` interface changed to `AuthBindings`.

    ```diff
    - import { AuthProvider } from "@refinedev/core";
    + import { AuthBindings } from "@refinedev/core";

    - const authProvider: AuthProvider = {/* ... */}
    + const authProvider: AuthBindings = {/* ... */}
    ```

-   `getUserIdentity` method of the `authProvider` changed to `getIdentity`.
-   `checkError` method of the `authProvider` changed to `onError`.
-   `checkAuth` method of the `authProvider` changed to `check`.

    ```diff
    const authProvider = {
    -     getUserIdentity,
    +     getIdentity,
    -     useCheckError,
    +     useOnError,
    -     checkAuth,
    +     check,
    }
    ```

-   `useAuthenticated` hook changed to `useIsAuthenticated`.

    ```diff
    - import { useAuthenticated } from "@refinedev/core";
    + import { useIsAuthenticated } from "@refinedev/core";
    ```

## Methods

### `login`

-   `login` method now requires promises to be resolved in all cases, with a return type of `AuthActionResponse`
-   `login` method expects promises to be resolved in all cases. You should always resolve the promise with a `success` key and an additional `error` key in case of a failure.
-   `useLogin` no longer has default redirection. You will need to add `redirectTo` property to the `login` method's return object.

```diff
const authProvider = {
    login: async ({ email, password }) => {
        const user = mockUsers.find((item) => item.email === email);

        if (user) {
            localStorage.setItem("auth", JSON.stringify(user));
-           return Promise.resolve();
+           return {
+               success: true,
+               redirectTo: "/",
+           };
        }

-       return Promise.reject();
+       return {
+           success: false,
+           error: new Error("Invalid email or password"),
+       };
    },
}
```

```ts
type AuthActionResponse = {
    success: boolean;
    redirectTo?: string;
    error?: Error;
    [key: string]: unknown;
};
```

### `logout`

-   `logout` method now requires promises to be resolved in all cases, with a return type of `AuthActionResponse`
-   `logout` method expects promises to be resolved in all cases. You should always resolve the promise with a `success` key and an additional `error` key in case of a failure.
-   `useLogout` no longer has default redirection. You will need to add `redirectTo` property to the `logout` method's return object.

```diff
const authProvider = {
    logout: async ({ email, password }) => {
        localStorage.removeItem("auth");
-       return Promise.resolve();
+       return {
+          success: true,
+          redirectTo: "/login",
+       };
    },
}
```

```ts
type AuthActionResponse = {
    success: boolean;
    redirectTo?: string;
    error?: Error;
    [key: string]: unknown;
};
```

### `register`

-   `register` method now requires promises to be resolved in all cases, with a return type of `AuthActionResponse`
-   `register` method expects promises to be resolved in all cases. You should always resolve the promise with a `success` key and an additional `error` key in case of a failure.
-   `useRegister` no longer has default redirection. You will need to add `redirectTo` property to the `register` method's return object.

```diff
const authProvider = {
    register: async ({ email, password }) => {
        const user = mockUsers.find((item) => item.email === email);

        if (user) {
-           return Promise.reject();
+           return {
+               success: false,
+               error: {
+                   name: "Register Error"",
+                   message: "User already exists",
+               },
+           };
        }

        mockUsers.push({ email });

-       return Promise.resolve();
+       return {
+           success: true,
+           redirectTo: "/",
+       };
    },
}
```

### `forgotPassword`

-   `forgotPassword` method now requires promises to be resolved in all cases, with a return type of `AuthActionResponse`
-   `forgotPassword` method expects promises to be resolved in all cases. You should always resolve the promise with a `success` key and an additional `error` key in case of a failure.
-   `useForgotPassword` no longer has default redirection. You will need to add `redirectTo` property to the `forgotPassword` method's return object.

```diff
const authProvider = {
    forgotPassword: async ({ password }) => {
        // send password reset link to the user's email address here

        // if request is successful
-       return Promise.resolve();
+       return {
+           success: true,
+           redirectTo: "/login",
+       };

        // if request is not successful
-       return Promise.reject();
+       return {
+           success: false,
+           error: {
+               name: "Forgot Password Error",
+               message: "Email address does not exist",
+           },
+       };
    },
};
```

```ts
type AuthActionResponse = {
    success: boolean;
    redirectTo?: string;
    error?: Error;
    [key: string]: unknown;
};
```

### `updatePassword`

-   `updatePassword` method now requires promises to be resolved in all cases, with a return type of `AuthActionResponse`
-   `updatePassword` method expects promises to be resolved in all cases. You should always resolve the promise with a `success` key and an additional `error` key in case of a failure.
-   `useUpdatePassword` no longer has default redirection. You will need to add `redirectTo` property to the `updatePassword` method's return object.

```diff
const authProvider = {
    updatePassword: async ({ password }) => {
        // update the user's password here

        // if request is successful
-       return Promise.resolve();
+       return {
+           success: true,
+           redirectTo: "/login",
+       });

        // if request is not successful
-       return Promise.reject();
+       return {
+           success: false,
+           error: {
+               name: "Forgot Password Error",
+               message: "Email address does not exist",
+           },
+       };
    },
};
```

```ts
type AuthActionResponse = {
    success: boolean;
    redirectTo?: string;
    error?: Error;
    [key: string]: unknown;
};
```

### `check`

-   `checkAuth` method of the authProvider changed to `check`.
-   `check` method now requires promises to be resolved in all cases, with a return type of `CheckResponse`
-   `check` method expects promises to be resolved in all cases. You should always resolve the promise with a `success` key and an additional `error` key in case of a failure.
-   `<Authenticated/>` component no longer has default redirection. You will need to add `redirectTo` property to the `check` method's return object.
-   `<Authenticated/>` component no longer call `logout` method by default. You will need to add `logout` property to `true` to the `check` method's return object.

```diff
const authProvider = {
-   checkAuth: async () => {
+   check: async () => {
        const user = localStorage.getItem("auth");

        if (user) {
-           return Promise.resolve();
+           return {
+               authenticated: true,
+           };
        }

-       return Promise.reject();
+       return {
+           authenticated: false,
+           redirectTo: "/login",
+           logout: true,
+           error: new Error("User not found"),
+       };
    },
};
```

```ts
type CheckResponse = {
    authenticated: boolean;
    redirectTo?: string;
    logout?: boolean;
    error?: Error;
};
```

### `onError`

-   `authProvider`'s `checkError` method renamed to `onError`.
-   `onError` method now requires promises to be resolved in all cases, with a return type of `OnErrorResponse`
-   `onError` method expects promises to be resolved in all cases. You should always resolve the promise with a `success` key and an additional `error` key in case of a failure.
-   `useOnError` no longer has default redirection. You will need to add `redirectTo` property to the `onError` method's return object.
-   `useOnError` component no longer call `logout` method by default. You will need to add `logout` property to `true` to the `check` method's return object.

```diff
const authProvider = {
-   checkError: async (error) => {
+   onError: async (error) => {
        if (error.status === 401 || error.status === 403) {
-           return Promise.reject();
+           return {
+               redirectTo: "/login",
+               logout: true,
+               error: error,
+           };
        }

-       return Promise.reject();
+       return {};
    },
};
```

```ts
type OnErrorResponse = {
    redirectTo?: string;
    logout?: boolean;
    error?: Error;
};
```

### `getPermissions`

-   `getPermissions` method now requires promises to be resolved in all cases, with a return type of `PermissionResponse`

```diff
const authProvider = {
    getPermissions: async () => {
        const user = localStorage.getItem("auth");

        if (user) {
            const { roles } = JSON.parse(user);

            return roles;
        }

-        return Promise.reject();
+        return null;
    },
};
```

```ts
type PermissionResponse = unknown;
```

### `getIdentity`

-   `authProvider`'s `getUserIdentity` method renamed to `getIdentity`.
-   `getIdentity` method now requires promises to be resolved in all cases, with a return type of `IdentityResponse`

```diff
const authProvider: AuthProvider = {
-   getUserIdentity: async () => {
+   getIdentity: async () => {
        const user = localStorage.getItem("auth");

        if (user) {
            const { email, roles } = JSON.parse(user);

            return Promise.resolve({ email, roles });
        }

-        return Promise.reject();
+        return null;
    },
};
```

```ts
type IdentityResponse = unknown;
```

## Auth hooks

:::caution

If you have used `codemod`, `v3LegacyAuthProviderCompatible: true` prop to the auth hooks for backward compatibility. If you have updated to the new auth provider, you need to manually remove this prop.

```diff
useLogin({
-       v3LegacyAuthProviderCompatible: true,
})
```

:::

The Auth Provider used to work based on a promise reject-resolve system. Now, all auth hooks are resolving promises. Therefore, if you have used auth hooks in your application, you need to update them according to the new system.

Let's create a wrapper component that renders children according to the authentication status:

Auth Provider v3:

```ts
import { useAuthenticated } from "@pankod/refine-core";

export const Authenticated: React.FC = ({ children }) => {
    const { isSuccess, isLoading, isError } = useAuthenticated();

    if (isLoading) {
        return <div>loading...</div>;
    }

    if (isError) {
        return null;
    }

    if (isSuccess) {
        return <>{children}</>;
    }

    return null;
};
```

Auth Provider v4:

```ts
import { useIsAuthenticated } from "@refinedev/core";

export const Authenticated: React.FC = ({ children }) => {
    const { isLoading, data } = useIsAuthenticated();

    if (isLoading) {
        return <div>loading...</div>;
    }

    if (data.error) {
        return null;
    }

    if (data.authenticated) {
        return <>{children}</>;
    }

    return null;
};
```

All hooks are similar and you need to update your auth hooks according to the new system.

[Please refer to the hooks documentation for more information.](/api-reference/core/providers/auth-provider/#hooks-and-components)

## Backward compatibility

:::note

**refine** still supports the `authProvider@v3` for backward compatibility. We changed name to `legacyAuthProvider` and it will be removed in the next major version. If you want to continue using the `authProvider@v3` you can use it as `legacyAuthProvider` in your project.

```diff
- import { AuthProvider } from "@refinedev/core";
+ import { LegacyAuthProvider } from "@refinedev/core";

- const authProvider: AuthProvider = {/* ... */}
+ const authProvider: LegacyAuthProvider = {/* ... */}

const App = () => {
    return (
        <Refine
-           authProvider={authProvider}
+           legacyAuthProvider={authProvider}
        >
            <AppLayout />
        </Refine>
    );
};

```

Also you need to add `v3LegacyAuthProviderCompatible: true` to your auth hooks to continue using the `authProvider@v3` in your project.

```ts
import { useLogin } from "@refinedev/core";

const login = useLogin({
    // highlight-next-line
    v3LegacyAuthProviderCompatible: true,
});
```
