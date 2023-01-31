---
id: auth-provider
title: Auth Provider
sidebar_label: Auth Provider
---

Auth provider is a object which contains methods to handle authentication and authorization in your app. It provides a way to authenticate users and authorize them to access resources. **refine** consumes these methods via auth hooks.

By default, **refine** doesn't require authentication configuration. When you need, **refine** let's you set authentication logic by providing the `authProvider` property to the `<Refine>` component.

:::caution

**refine** consumes these methods using [authorization hooks](#hooks-and-components).
Authorization hooks are used to manage authentication and authorization operations like login, logout and catching **HTTP** errors etc.

:::

:::tip
You can find auth provider examples made with **refine**

-   **Basic** &#8594 [Source Code](https://github.com/refinedev/refine/tree/master/examples/auth-headless) - [Demo](/docs/examples/authentication/headless/)
-   **Auth0** &#8594 [Source Code](https://github.com/refinedev/refine/tree/master/examples/auth-auth0/) - [Demo](examples/auth-provider/auth0.md)
-   **Keycloak** &#8594 [Source Code](https://github.com/refinedev/refine/tree/master/examples/auth-keycloak) - [Demo](examples/auth-provider/keycloak.md)
-   **Google** &#8594 [Source Code](https://github.com/refinedev/refine/tree/master/examples/auth-google-login) - [Demo](examples/auth-provider/google-auth.md)
-   **OTP Login** &#8594 [Source Code](https://github.com/refinedev/refine/tree/master/examples/auth-otp) - [Demo](examples/auth-provider/otpLogin.md)
-   **Appwrite** &#8594 [Source Code](https://github.com/refinedev/refine/tree/master/examples/data-provider-appwrite) - [Demo](/docs/examples/data-provider/appwrite)
-   **Supabase** &#8594 [Source Code](https://github.com/refinedev/refine/tree/master/examples/data-provider-supabase) - [Demo](/docs/examples/data-provider/supabase)
-   **Strapi** &#8594 [Source Code](https://github.com/refinedev/refine/tree/master/examples/data-provider-strapi-v4) - [Demo](/docs/examples/data-provider/strapi-v4)
-   **Strapi GraphQL** &#8594 [Source Code](https://github.com/refinedev/refine/tree/master/examples/data-provider-strapi-graphql) - [Demo](/docs/examples/data-provider/strapi-graphql)
-   **Nhost** &#8594 [Source Code](https://github.com/refinedev/refine/tree/master/examples/data-provider-nhost) - [Demo](/docs/examples/data-provider/nhost)
-   **Basic with Nextjs** &#8594 [Source Code](https://github.com/refinedev/refine/tree/master/examples/with-nextjs) - [Demo](/docs/examples/next-js/)
-   **Basic with Remix** &#8594 [Source Code](https://github.com/refinedev/refine/tree/master/examples/with-remix-headless) - [Demo](/docs/examples/remix/remix-headless)

:::

## Basic Usage

To use `authProvider` in **refine**, we have to pass the `authProvider` to the `<Refine />` component.

```tsx title="App.tsx"
import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// highlight-next-line
import authProvider from "./auth-provider";

const API_URL = "https://api.fake-rest.refine.dev";

const App = () => {
    return (
        <Refine
            // highlight-next-line
            authProvider={authProvider}
            routerProvider={routerProvider}
            dataProvider={dataProvider(API_URL)}
        />
    );
};
```

[Refer to the Auth Provider tutorial for more information and usage examples &#8594](/docs/tutorial/understanding-authprovider/create-authprovider)

## Methods

Auth provider's methods are expected to return a Promise. So, you can use these async methods to create auth provider.

An `authProvider` include the following methods:

```tsx
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
```

### login <PropTag required />

`login` method is used to authenticate users. It expects to return a Promise.

-   If the Promise resolves, the user is authenticated and pages that require authentication will be accessible.

-   If the Promise rejects, the user is not authenticated and stays on the login page.

You can use [`useLogin`][use-login] hook to call `login` method.

### checkAuth <PropTag required />

`checkAuth` method is used to check if the user is authenticated. Internally, it is called when the user navigates to a page that requires authentication.

`checkAuth` method expects to return a Promise.

-   If the Promise resolves, the user is authenticated and pages that require authentication will be accessible.

-   If the Promise rejects, the user is not authenticated and pages that require authentication will not be accessible and by default, the user will be redirected to the `/login` page.

You can use [`useAuthenticated`][use-authenticated] hook to call `checkAuth` method.

### logout <PropTag required />

`logout` method is used to log out users. It expects to return a Promise.

-   If the Promise resolves, the user is logged out and pages that require authentication will not be accessible and by default, the user will be redirected to the `/login` page.

-   If the Promise rejects, the user is not logged out and stays on the page.

You can use [`useLogout`][use-logout] hook to call `logout` method.

### checkError <PropTag required />

`checkError` method is called when you get an error response from the API. You can create your own business logic to handle the error such as refreshing the token, logging out the user, etc.

`checkError` method expects to return a Promise.

-   If the Promise resolves, the user is not logged out and stays on the page.

-   If the Promise rejects, the `logout` method is called to log out the user and by default, the user is redirected to the `/login` route.

You can use [`useCheckError`][use-check-error] hook to call `checkError` method.

### getPermissions

`getPermissions` method is used to get the user's permissions. It expects to return a Promise.

-   If the Promise resolves with data, the user's permissions will be available in the `usePermissions` hook's `data` property.

-   If the Promise rejects, the user's permissions will not be available and `usePermissions` hook throw an error.

You can use [`usePermissions`][use-permissions] hook to call `getPermissions` method.

### getUserIdentity

`getUserIdentity` method is used to get the user's identity. It expects to return a Promise.

-   If the Promise resolves with a data, the user's identity will be available in the `useGetIdentity` hook's `data` property.

-   If the Promise rejects, the user's identity will not be available and `useGetIdentity` hook throw an error.

You can use [`useGetIdentity`][use-get-identity] hook to call `getUserIdentity` method.

### register

`register` method is used to register a new user. It is similar to the `login` method. It expects to return a Promise.

-   If the Promise resolves, by default, the user will be redirected to the `/` page.

-   If the Promise rejects, the `useRegister` hook will throw an error.

You can use [`useRegister`][use-register] hook to call `register` method.

### forgotPassword

`forgotPassword` method is used to send a password reset link to the user's email address. It expects to return a Promise.

You can use [`useForgotPassword`][use-forgot-password] hook to call `forgotPassword` method.

### updatePassword

`updatePassword` method is used to update the user's password. It expects to return a Promise.

You can use [`useUpdatePassword`][use-update-password] hook to call `updatePassword` method.

## Hooks and Components

These hooks can be used with the `authProvider` authentication and authorization operations.

-   [useAuthenticated][use-authenticated]
-   [useCheckError][use-check-error]
-   [useGetIdentity][use-get-identity]
-   [useLogin][use-login]
-   [useLogout][use-logout]
-   [usePermissions][use-permissions]
-   [`<Authenticated />`][authenticated]
-   [useRegister][use-register]
-   [useForgotPassword][use-forgot-password]
-   [useUpdatePassword][use-update-password]

## FAQ

### How can I create authProvider?

[Refer to the "Create Auth Provider From Scratch" section in the tutorial for more information &#8594](/docs/tutorial/understanding-authprovider/create-authprovider/)

### How can I set authorization credentials ?

[Refer to the "Setting Authorization Credentials" section in the tutorial for more information &#8594](/docs/tutorial/understanding-authprovider/create-authprovider/#setting-authorization-credentials)

## API Reference

### Properties

| Property                                             | Description                               | Resolve condition                     |
| ---------------------------------------------------- | ----------------------------------------- | ------------------------------------- |
| login <div className=" required">Required</div>      | Logs user in                              | Auth confirms login                   |
| logout <div className=" required">Required</div>     | Logs user out                             | Auth confirms logout                  |
| checkAuth <div className=" required">Required</div>  | Checks credentials on each route changes  | Authentication still persist          |
| checkError <div className=" required">Required</div> | Checks if a dataProvider returns an error | Data provider doesn't return an error |
| getPermissions                                       | Can be use to get user credentials        | Authorization roles accepted          |
| getUserIdentity                                      | Can be use to get user identity           | User identity available to return     |
| register                                             | Register user                             | Auth confirms register                |
| forgotPassword                                       | Can be use to get password reset          | Auth confirms forgot password         |
| updatePassword                                       | Can be use to get update password         | Auth confirms update password         |

<br />

## Example

<CodeSandboxExample path="auth-antd" />

[use-login]: /docs/api-reference/core/hooks/auth/useLogin/
[use-logout]: /docs/api-reference/core/hooks/auth/useLogout/
[use-authenticated]: /docs/api-reference/core/hooks/auth/useAuthenticated/
[use-check-error]: /docs/api-reference/core/hooks/auth/useCheckError/
[use-get-identity]: /docs/api-reference/core/hooks/auth/useGetIdentity/
[use-permissions]: /docs/api-reference/core/hooks/auth/usePermissions/
[authenticated]: /docs/api-reference/core/components/auth/authenticated/
[use-register]: /docs/api-reference/core/hooks/auth/useRegister/
[use-forgot-password]: /docs/api-reference/core/hooks/auth/useForgotPassword/
[use-update-password]: /docs/api-reference/core/hooks/auth/useUpdatePassword/
