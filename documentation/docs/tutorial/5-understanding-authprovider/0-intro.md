---
id: index
title: 1. Auth Provider
tutorial:
    order: 0
    prev: false
    next: tutorial/understanding-authprovider/create-authprovider
---

## What is auth provider?

Auth provider is a object which contains methods to handle authentication and authorization in your app. It provides a way to authenticate users and authorize them to access resources. **refine** consumes these methods via auth hooks.

Auth provider's methods expect to return a Promise. So, you can use async methods to create auth provider. Therefore, to create auth provider from scratch, you can use any third-party authentication service like Auth0, Okta, etc. or your own custom methods. We'll see how to create auth provider in the next sections.

Moreover, **refine** offers built-in examples for auth providers. You can use them as a starting point for your own auth provider. You can check [Auth Provider Examples](#auth-provider-examples) to see the list of examples.

The typical auth provider has following methods:

```ts
import { AuthProvider } from "@pankod/refine-core";

const authProvider: AuthProvider = {
    login: (params) => Promise;
    logout: (params) => Promise;
    checkAuth: (params?) => Promise;
    checkError: (error) => Promise;
    getPermissions: (params?) => Promise;
    ...
}
```

> Above methods are required. You can find other optional methods in next section.

These methods are used to perform auth operations by **refine** hooks. You can check [Auth Provider](/docs/api-reference/core/providers/auth-provider/) documentation to see the details of each method.

## Using Auth Providers in refine

When you create a new auth provider, you need to pass it to the `<Refine/>` component as a prop. So, **refine** can use it to handle authentication.

```tsx
...
import { AuthProvider } from "@pankod/refine-core";

// It is a mock auth provider.
const authProvider: AuthProvider = {
    login: (params) => Promise;
    logout: (params) => Promise;
    checkAuth: (params?) => Promise;
    checkError: (error) => Promise;
    getPermissions: (params?) => Promise;
    ...
}

<Refine
    ...
    authProvider={authProvider}
/>;
```

[Refer to the `<Refine/>` documentation for more information &#8594](/docs/api-reference/core/components/refine-config/)

## How data provider methods are using in the app?

Each method of auth provider is corresponding to a hook in **refine**. So, you can use these hooks to perform auth operations in your app. You can check [Auth Hooks](/docs/api-reference/core/hooks/auth/useAuthenticated/) documentation to see the details of each hook.

For example, you can use `useLogin` hook to perform login operation like below:

```tsx
import { useLogin } from "@pankod/refine-core";

type LoginVariables = {
    email: string;
    password: string;
};

const { mutate } = useLogin<LoginVariables>();

const handleLogin = async (values) => {
    await mutate(values);
};
```

As you can see, `useLogin` hook returns a `mutate` function. When you call this function, it calls the `login` method of auth provider like below:

```ts
const authProvider: AuthProvider = {
    login: ({ email, password }) => {
        const response = await axios.post("/api/login", { email, password });

        if (response.status === 200) {
            return Promise.resolve(response.data);
        }

        return Promise.reject();
    },
    ...
};
```

If the `login` method will return a resolved Promise, the `mutate` function will return a resolved Promise. Otherwise, it will return a rejected Promise. So, you can use the returned Promise to handle the login operation.

:::info

We made an example to show the relationship between auth provider methods and auth hooks. We used `useLogin` hook in the example, but all auth hooks work the same way.

:::

## Auth Provider Examples

You can use the following auth provider examples as a starting point for your own auth provider or you can use them as it is. Check the links below to see the details of each example.

-   [Basic](/docs/examples/authentication/headless/) - A basic auth provider example.
-   [Auth0](/docs/examples/auth-provider/auth0) - An auth provider example with Auth0.
-   [Google Auth](/docs/examples/auth-provider/google-auth) - An auth provider example with Google Auth.
-   [OTP Login](/docs/examples/auth-provider/otpLogin) - An auth provider example with OTP Login.
-   [Appwrite](/docs/examples/data-provider/appwrite) - An auth provider example with Appwrite.
-   [Supabase](/docs/examples/data-provider/supabase) - An auth provider example with Supabase.
-   [Strapi](/docs/examples/data-provider/strapi-v4) - An auth provider example with Strapi.
-   [Strapi Graphql](/docs/examples/data-provider/strapi-graphql) - An auth provider example with Strapi Graphql.
-   [Nhost](/docs/examples/data-provider/nhost) - An auth provider example with Nhost.
-   [Basic with Nextjs](/docs/examples/next-js/) - A basic auth provider example with Nextjs.
-   [Basic with Remix](/docs/examples/remix/remix-headless) - A basic auth provider example with Remix.
