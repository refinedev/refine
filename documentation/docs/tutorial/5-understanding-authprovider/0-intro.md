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

Auth provider is an object that contains methods to handle authentication and access control in your app by having **refine** consume them. These methods expect to return a promise, so they can be used with async methods.

You can use any third-party authentication service like Auth0, Okta, etc. or your own custom methods while creating an auth provider from scratch, which we will explore in the next section.

:::tip
**refine** does offer built-in examples for auth providers that you can use as a starting point for your own auth providers as well.

Refer to the [Auth Provider Examples &#8594](#auth-provider-examples)
:::

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

> For more information about these methods and how **refine** hooks use them, refer to the [Auth Provider documentation&#8594](/docs/api-reference/core/providers/auth-provider/)

## Using Auth Providers in refine

When creating a new auth provider, you need to pass it to the `<Refine/>` component as a prop for authentication:

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

> For more information, refer to the [`<Refine/>` documentation&#8594](/docs/api-reference/core/components/refine-config/)

## How are auth provider methods used in the app?

Each method of auth provider corresponds to a hook in **refine** that you can use these hooks to perform auth operations in your app.

For example, to show you how relationship between auth provider methods and hooks, here is how you can use the `useLogin` hook to perform a login operation:

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

As you can see, the `useLogin` hook returns a `mutate` function. When you call this function, it calls the `login` method of auth provider like the below:

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
            error: {
                message: "Invalid credentials",
                name: "Invalid credentials",
            },
        };
    },
    // ---
};
```

:::info
All auth hooks are identical in usage
:::

> For more information about each hook, refer to the [Auth Hooks documentation&#8594](/docs/api-reference/core/hooks/authentication/useIsAuthenticated/)

## Auth Provider Examples

<AuthProviderExamplesLinks/>

<br />

<Checklist>

<ChecklistItem id="auth-provider-intro">
I understood what is auth provider and how it works.
</ChecklistItem>
<ChecklistItem id="auth-provider-intro-2">
I have learned that refine offers built-in auth provider examples.
</ChecklistItem>

</Checklist>
