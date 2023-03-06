---
id: index
title: 1. Auth Provider
tutorial:
    order: 0
    prev: false
    next: tutorial/understanding-authprovider/create-authprovider
---

import AuthProviderExamplesLinks from "@site/src/partials/auth-provider-examples-links.md";

## What is auth provider?

Auth provider is an object which contains methods to handle authentication and authorization in your app. It provides a way to authenticate users and authorize them to access resources. **refine** consumes these methods via auth hooks.

Auth provider's methods expect to return a Promise. So, you can use async methods to create auth provider. Therefore, to create auth provider from scratch, you can use any third-party authentication service like Auth0, Okta, etc. or your own custom methods. We'll see how to create auth provider in the next sections.

Moreover, **refine** offers built-in examples for auth providers. You can use them as a starting point for your own auth provider. You can check [Auth Provider Examples](#auth-provider-examples) to see the list of examples.

The typical auth provider has the following methods:

```ts
import { AuthBindings } from "@refinedev/core";

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

These methods are used to perform auth operations by **refine** hooks. You can check [Auth Provider](/docs/api-reference/core/providers/auth-provider/) documentation to see the details of each method.

## Using Auth Providers in refine

When you create a new auth provider, you need to pass it to the `<Refine/>` component as a prop. So, **refine** can use to handle authentication.

```tsx
// ---
import { AuthBindings, Refine } from "@refinedev/core";

// It is a mock auth provider.
const authProvider: AuthBindings = {
    // required methods
    login: async (params: any) => ({}),
    check: async (params: any) => ({}),
    logout: async (params: any) => ({}),
    onError: async (params: any) => ({}),
};

<Refine
    // ---
    authProvider={authProvider}
/>;
```

[Refer to the `<Refine/>` documentation for more information &#8594](/docs/api-reference/core/components/refine-config/)

## How are auth provider methods used in the app?

Each method of auth provider is corresponding to a hook in **refine**. So, you can use these hooks to perform auth operations in your app. You can check [Auth Hooks](/docs/api-reference/core/hooks/auth/useIsAuthenticated/) documentation to see the details of each hook.

For example, you can use `useLogin` hook to perform login operation like below:

```tsx
import { useLogin } from "@refinedev/core";

type LoginVariables = {
    email: string;
    password: string;
};

const { mutate } = useLogin<LoginVariables>();

const handleLogin = async (values) => {
    await mutate(values);
};
```

As you can see, `useLogin` hook returns a `mutate` function. When you call this function, it calls the `login` method of auth provider like the below:

```ts
import { AuthBindings } from "@refinedev/core";

const authProvider: AuthBindings = {
    login: ({ email, password }) => {
        const response = await axios.post("/api/login", { email, password });

        if (response.status === 200) {
            return {
                success: true,
                redirectTo: "/",
            };
        }

        return {
            success: false,
            error: new Error("Invalid credentials"),
        };
    },
    // ---
};
```

:::info

We made an example to show the relationship between auth provider methods and auth hooks. We used the `useLogin` hook in the example, but all auth hooks work the same way.

:::

## Auth Provider Examples

<AuthProviderExamplesLinks/>

<br />
<br />

<Checklist>

<ChecklistItem id="auth-provider-intro">
I understood what is auth provider and how it works.
</ChecklistItem>
<ChecklistItem id="auth-provider-intro-2">
I learned that refine offers built-in auth provider examples.
</ChecklistItem>

</Checklist>
