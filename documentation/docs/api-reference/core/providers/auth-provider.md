---
id: auth-provider
title: Auth Provider
sidebar_label: Auth Provider
---

import AuthProviderExamplesLinks from "@site/src/partials/auth-provider-examples-links.md";

Auth provider is an object that contains methods to handle authentication and access control in your app by having **refine** consume them. These methods expect to return a promise, so they can be used with async methods.

You can use any third-party authentication service like [Auth0, Okta, etc.](#examples) or your own custom methods while creating an auth provider from scratch.

> For more information on how you can create your own data providers, refer to the [Create a Data Provider tutorial&#8594][create-auth-provider-tutorial]

## Usage

To use `authProvider` in **refine**, just pass it to the `<Refine />` component.

```tsx title="App.tsx"
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";

// highlight-next-line
import authProvider from "./auth-provider";

const App = () => {
    return (
        <Refine
            // highlight-next-line
            authProvider={authProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
        >
            {/* ... */}
        </Refine>
    );
};
```

## Examples

<AuthProviderExamplesLinks/>

## Methods

An `authProvider` includes the following methods:

```tsx
import type { AuthBindings } from "@refinedev/core";

const authProvider: AuthBindings = {
    // required methods
    login: async (params: any) => ({}),
    check: async (params: any) => ({}),
    logout: async (params: any) => ({}),
    onError: async (params: any) => ({}),
    // optional methods
    register: async (params: any) => ({}),
    forgotPassword: async (params: any) => ({}),
    updatePassword: async (params: any) => ({}),
    getPermissions: async (params: any) => ({}),
    getIdentity: async (params?: any) => ({}),
};
```

`login`, `logout`, `register`, `forgotPassword`, `updatePassword` expect to return a resolved promise with the following type:

```ts
type AuthActionResponse = {
    success: boolean;
    redirectTo?: string;
    error?: Error;
    [key: string]: unknown;
};
```

-   `success`: A boolean indicating whether the operation was successful.
-   `redirectTo`: A string indicating the URL to redirect to after the operation completes.
-   `error`: An object containing details about any errors encountered during the operation.
-   `[key: string]`: Any additional data you wish to include in the response, keyed by a string identifier.

`check` expects to return a promise with the following type:

```ts
type CheckResponse = {
    authenticated: boolean;
    redirectTo?: string;
    logout?: boolean;
    error?: Error;
};
```

-   `authenticated`: A boolean indicating whether the user is authenticated or not.
-   `redirectTo`: A string indicating the URL to redirect to after the operation completes.
-   `error`: An object containing details about any errors encountered during the operation.
-   `[key: string]`: Any additional data you wish to include in the response, keyed by a string identifier.

`getPermission` expects to return a promise with the following type:

```ts
type PermissionResponse = unknown;
```

`getIdentity` expects to return a promise with the following type:

```ts
type IdentityResponse = unknown;
```

:::tip
You can return any type of data from the `getPermission` and `getIdentity` methods.
:::

---

:::info-tip
**refine** consumes these methods using the [authorization hooks](#hooks-and-components), which are used for authorization operations like login, logout, catching **HTTP** errors, etc.
:::

## Required Methods

### login <PropTag required />

`login` method is used to authenticate users.

It can be called with the [`useLogin`][use-login] hook

### check <PropTag required />

`check` method is used to check if the user is authenticated.

It can be called with the [`useIsAuthenticated`][use-is-authenticated] hook

### logout <PropTag required />

`logout` method is used to log out users.

It can be called with the [`useLogout`][use-logout] hook

### onError <PropTag required />

`onError` method is called when you get an error response from the API. You can create your own business logic to handle the error such as refreshing the token, logging out the user, etc.

It can be called with the [`useOnError`][use-on-error] hook

## Optional Methods

### getPermissions

`getPermissions` method is used to get the user's permissions.

It can be called with the [`usePermissions`][use-permissions] hook

### getIdentity

`getIdentity` method is used to get the user's identity.

It can be called with the [`useGetIdentity`][use-get-identity] hook

### register

`register` method is used to register a new user.

It can be called with the [`useRegister`][use-register] hook

### forgotPassword

`forgotPassword` method is used to send a password reset link to the user's email address.

It can be called with the [`useForgotPassword`][use-forgot-password] hook

### updatePassword

`updatePassword` method is used to update the user's password.

It can be called with the [`useUpdatePassword`][use-update-password] hook

## Hooks and Components

These hooks can be used with the `authProvider` authentication and authorization operations:

-   [useIsAuthenticated][use-is-authenticated]
-   [useOnError][use-on-error]
-   [useGetIdentity][use-get-identity]
-   [useLogin][use-login]
-   [useLogout][use-logout]
-   [usePermissions][use-permissions]
-   [`<Authenticated />`][authenticated]
-   [useRegister][use-register]
-   [useForgotPassword][use-forgot-password]
-   [useUpdatePassword][use-update-password]

## Legacy Auth Provider

**refine**'s v4 release is backward compatible and supports legacy auth provider implementations until v5.

If you want to use a legacy auth provider, you can pass them to the `<Refine />` component using the `legacyAuthProvider` prop.

[Refer to the Migration Guide for more information. &#8594](/docs/migration-guide/auth-provider/)

```tsx
import { LegacyAuthProvider, Refine } from "@refinedev/core";

const legacyAuthProvider: LegacyAuthProvider = {
    /* --- */
};

const App = () => {
    return (
        <Refine
            // ---
            legacyAuthProvider={legacyAuthProvider}
        >
            {/* --- */}
        </Refine>
    );
};
```

## API Reference

### Properties

| Property                                          | Description                               | Success condition                     |
| ------------------------------------------------- | ----------------------------------------- | ------------------------------------- |
| login <div className=" required">Required</div>   | Logs user in                              | Auth confirms login                   |
| logout <div className=" required">Required</div>  | Logs user out                             | Auth confirms logout                  |
| check <div className=" required">Required</div>   | Checks credentials on each route changes  | Authentication still persist          |
| onError <div className=" required">Required</div> | Checks if a dataProvider returns an error | Data provider doesn't return an error |
| getPermissions                                    | Can be use to get user credentials        | Authorization roles accepted          |
| getIdentity                                       | Can be use to get user identity           | User identity available to return     |
| register                                          | Register user                             | Auth confirms register                |
| forgotPassword                                    | Can be use to get password reset          | Auth confirms forgot password         |
| updatePassword                                    | Can be use to get update password         | Auth confirms update password         |

## FAQ

### How can I create an auth provider?

[Refer to the "Create Auth Provider From Scratch" section in the tutorial for more information &#8594](/docs/tutorial/understanding-authprovider/create-authprovider/)

### How can I set authorization credentials?

[Refer to the "Setting Authorization Credentials" section in the tutorial for more information &#8594](/docs/tutorial/understanding-authprovider/create-authprovider/#setting-authorization-credentials)

### How can I implement refresh token mechanism?

[Refer to the "Implementing Refresh Token Mechanism" section in the tutorial for more information &#8594](/docs/tutorial/understanding-authprovider/create-authprovider/#implementing-refresh-token-mechanism)

<br />

## Example

<CodeSandboxExample path="auth-antd" />

[use-login]: /docs/api-reference/core/hooks/authentication/useLogin/
[use-logout]: /docs/api-reference/core/hooks/authentication/useLogout/
[use-is-authenticated]: /docs/api-reference/core/hooks/authentication/useIsAuthenticated/
[use-on-error]: /docs/api-reference/core/hooks/authentication/useOnError/
[use-get-identity]: /docs/api-reference/core/hooks/authentication/useGetIdentity/
[use-permissions]: /docs/api-reference/core/hooks/authentication/usePermissions/
[authenticated]: /docs/api-reference/core/components/auth/authenticated/
[use-register]: /docs/api-reference/core/hooks/authentication/useRegister/
[use-forgot-password]: /docs/api-reference/core/hooks/authentication/useForgotPassword/
[use-update-password]: /docs/api-reference/core/hooks/authentication/useUpdatePassword/
[create-auth-provider-tutorial]: /docs/tutorial/understanding-authprovider/create-authprovider
