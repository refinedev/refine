---
id: auth-provider
title: Migrating Auth Provider from 3.x.x to 4.x.x
sidebar_label: Migrating Auth Provider
---

## Motivation behind the changes

Our motivation behind the changes in `authProvider` prop in **refine**'s v4 is to make it flexible and customizable enough to cover much more cases than before without going down the rabbit hole.

We wanted to create a common interface for the methods of `authProvider` to make it easier to debug and understand the authentication process more easily.

Previously, the `authProvider` methods were expected to be resolved on success and rejected on any failure. This behavior wasn't ideal since rejected promise is typically associated with an error or an exceptional case. Considering some expected errors like wrong email/password combination isn't a failure and needs to be propagated to the user, rejected promises caused confusion for developers and made it harder to debug real unexpected behaviors.

`authProvider` methods now returns a resolved promise in all cases, with an object containing `success` key. The `success` key indicates whether the operation was successful or not, and an optional `error` key with `Error` object in case of a failure.

Additionally, the auth hooks no longer have default redirection paths. This behavior could be confusing for developers who were not aware of it. By adding a `redirectTo` property to the `authProvider` methods' return object explicitly, developers can have more control over where the user is redirected after a successful operation.

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

:::
