---
title: Authentication
---

import Register from "./register";
import Login from "./login";
import IsAuthentcated from "./is-authenticated";
import OnError from "./on-error";
import AuthProviderInterface from "./auth-provider-interface.md";
import AuthHooks from "@site/src/partials/auth-provider/auth-hooks.md";
import AuthProviderExamplesLinks from "@site/src/partials/auth-provider/auth-provider-examples-links.md";

Authentication is the process of verifying the identity of a user or client. It's a critical component of security, ensuring that only authorized users can access certain features or data within the application.

Refine handles authentication by [auth provider](#auth-provider) and consumes the auth provider methods by [auth hooks](#auth-hooks).

## Auth Provider

Auth provider is an object that contains methods to handles authentication in your app, designed to return promises for use with async methods. By offering a structured architecture it simplifies authentication implementation and management through your app. With its flexible architecture, it allows for easy integration of your **own** or [third-party authentication systems](#supported-auth-provider) into Refine.

To activate authentication in your app, you need to pass an `authProvider` to the `<Refine />` as a prop. Once you provide auth provider, you can utilize our auth hooks (useLogin, useRegister, useIsAuthenticated etc.) to easily manage your authentication.

```tsx title="App.tsx"
import { Refine } from "@refinedev/core";

// highlight-next-line
import authProvider from "./auth-provider";

const App = () => {
    // highlight-next-line
    return <Refine authProvider={authProvider}>...</Refine>;
};
```

## Handling authentication

Refine provides a set of hooks to handle authentication. You can use these hooks to manage your authentication process. You can find the [list of hooks](#auth-hooks) below.

### Register

Let's start with registering a new user. To register a new user, we will implement `authProvider.register` method. We will call this method with `useRegister` hook when the user submits the registration form.

<Register />

### Login

After registering a new user, we will implement `authProvider.login` method to login the user. We will call this method with `useLogin` hook when the user submits the login form. This implementation is very similar to the registration process.

<Login />

### Is Authenticated

We setup registration and login process. Now we need to check if the user is authenticated or not. We will implement `authProvider.check` method and we will call this method with `useIsAuthenticated` hook to check if the user is authenticated or not.

By using `useIsAuthenticated` hook, we can easily check if the user is authenticated or not. If the user is authenticated, we will show the user profile, otherwise we will show the `<Login />` component.

Also in this example, we will implement `authProvider.logout` and `authProvider.getIdentity` methods. We will call these methods with `useLogout` and `useGetIdentity` hooks respectively. With help of this hooks, we can easily logout the user and get the user identity.

<IsAuthentcated />

Refine also provides `<Auhtenticated />` component to easily handle authentication state. You can use this component for conditionally render your components.

[To learn more about the `<Auhtenticated />` component, check out the reference page.](/docs/api-reference/core/components/auth/authenticated)

```tsx
import { Authenticated } from "@refinedev/core";

const Page = () => {
    return (
        <Authenticated
            loading={<div>loading...</div>}
            fallback={<div>You cannot access this section</div>}
        >
            <h1>Welcome to your dashboard</h1>
        </Authenticated>
    );
};
```

### Usage with data provider <GuideBadge id="guides-concepts/data-fetching/" />

After implementing the authentication process, we need to inform data provider about the authentication credentials. We can do this by sending the authentication credentials with the request. For example after obtaining the authentication token we can store it in cookies and sent it with on every request.

[To learn more about the how to use authentication with data provider and working example, check out data fetching guide.](/docs/guides-concepts/data-fetching/#authentication-)

## Error handling

`authProvider.onError` method is used to handle errors that occur during the http request.

Under the hood, Refine utilizes the [`useOnError`][use-on-error] hook on every data hooks. This means that when a promise is rejected from the `dataProvider` or when you get you get an error response from the API, Refine automatically calls `authProvider.onError` by using the `useOnError` hook.

Let's say wan't to get product from the API with [`useOne`][use-one] hook. If the user is not authenticated, the API will return an error response. You can handle this error by implementing `authProvider.onError` method and Refine will automatically call this method when the error occurs.

<OnError />

Once you implement `authProvider.onError` method, you can call this method with [`useOnError`][use-on-error] hook. This will help you to handle errors in single place.

For example imagine a payment request was declined by the API. If the error status code is 418, the user should be logged out for security reasons:

```tsx
import { useOnError } from "@refinedev/core";

const { mutate: onError } = useOnError();

fetch("http://example.com/payment")
    .then(() => console.log("Success"))
    .catch((error) => onError(error));
```

We can handle this error by implementing `authProvider.onError` method. If the error status code is 418, we will logout the user and redirect to the login page. Otherwise we will do nothing. Refine will automatically handles redirection and logout process.

```tsx
import type { AuthBindings } from "@refinedev/core";

const authProvider: AuthBindings = {
    // ---
    logout: () => {
        // ---
        return {
            success: true,
            redirectTo: "/login",
        };
    },
    onError: (error) => {
        const status = error.status;
        if (status === 418) {
            return {
                logout: true,
                redirectTo: "/login",
                error: new Error(error),
            };
        }
        return {};
    },
    // ---
};
```

## `<AuthPage />`

Refine provides `<AuthPage />` components to easily handle authentication pages (login, register, update password, forgot passowrd). Simply you can import and use `<AuthPage />` component to speed up your development process.

```tsx
import { Refine, AuthPage } from "@refinedev/core";

const App = () => {
    return (
        <Refine
        // ...
        >
            <AuthPage type="login" />
            <AuthPage type="register" />
            <AuthPage type="updatePassword" />
            <AuthPage type="forgotPassword" />
        </Refine>
    );
};
```

To learn more information about `<AuthPage />` component and see the detailed examples, check out the following reference pages:

-   [Headless](/docs/api-reference/core/components/auth-page)
-   [Ant Design](/docs/api-reference/antd/components/antd-auth-page/)
-   [Material UI](/docs/api-reference/mui/components/mui-auth-page/)
-   [Chakra UI](/docs/api-reference/chakra-ui/components/chakra-auth-page/)
-   [Mantine](/docs/api-reference/mantine/components/mantine-auth-page/)

<AuthPage />

## oAuth services

Flexible architecture of auth provider allows you to integrate your **own** or [third-party authentication systems](#supported-auth-provider) into Refine.

You can use the following oAuth provider implementations as a starting point for your own auth provider or you can use them as it is.

-   [Google](https://github.com/refinedev/refine/tree/master/examples/auth-google-login)
-   [Auth0](https://github.com/refinedev/refine/tree/master/examples/auth-auth0)
-   [Kinde](https://github.com/refinedev/refine/tree/master/examples/auth-kinde)
-   [Keycloak](https://github.com/refinedev/refine/tree/master/examples/auth-keycloak)
-   [supabase](https://github.com/refinedev/refine/tree/master/examples/data-provider-supabase)
-   [Strapi](https://github.com/refinedev/refine/tree/master/examples/data-provider-strapi-v4)
-   [Strapi GraphQL](https://github.com/refinedev/refine/tree/master/examples/data-provider-strapi-graphql)
-   [Auth.js](https://github.com/refinedev/refine/tree/master/examples/with-nextjs-next-auth)

## `authProvider` interface

To better understand the auth provider interface, we have created an example that demonstrates how the required methods are implemented. For more comprehensive and diverse examples, you can refer to the [supported auth providers](#supported-auth-providers) section.

<AuthProviderInterface />

[To learn more about the `authProvider` interface, check out the reference page.](/docs/api-reference/core/providers/auth-provider/)

## Auth hooks

<AuthHooks />

## Supported auth providers

<AuthProviderExamplesLinks />

> For more information on how you can create your own auth providers, refer to the [Create a Auth Provider tutorial &#8594][create-auth-provider-tutorial]

[use-login]: /docs/api-reference/core/hooks/authentication/useLogin/
[use-logout]: /docs/api-reference/core/hooks/authentication/useLogout/
[use-is-authenticated]: /docs/api-reference/core/hooks/authentication/useIsAuthenticated/
[use-on-error]: /docs/api-reference/core/hooks/authentication/useOnError/
[use-get-identity]: /docs/api-reference/core/hooks/authentication/useGetIdentity/
[use-permissions]: /docs/api-reference/core/hooks/authentication/usePermissions/
[use-register]: /docs/api-reference/core/hooks/authentication/useRegister/
[use-forgot-password]: /docs/api-reference/core/hooks/authentication/useForgotPassword/
[use-update-password]: /docs/api-reference/core/hooks/authentication/useUpdatePassword/
[create-auth-provider-tutorial]: /docs/tutorial/understanding-authprovider/create-authprovider
[use-one]: /docs/api-reference/core/hooks/data/useOne/
