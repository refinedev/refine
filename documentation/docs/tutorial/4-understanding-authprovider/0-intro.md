---
id: index
title: 5.1. Auth Provider
tutorial:
    prev: tutorial/adding-crud-actions/sort-and-filters
    next: tutorial/understanding-authprovider/auth-pages
---

import AuthProviderExamplesLinks from "@site/src/partials/auth-provider-examples-links.md";

This unit explores the auth provider object passed to `<Refine />`. It also shows how **refine**'s supplementary **Material UI** package implement various auth pages with the `<AuthPage />` component.


## What is Auth Provider?

**refine**'s Auth Provider represents the layer which handles authentication and access control in the app. It provides a way to authenticate users and authorize them to access resources.

The Auth Provider is an object which contains methods related to authentication and access control. It is passed as a value to `<Refine />`'s `authProvider` prop. The methods are consumed from UI components via **refine**'s auth hooks.

A typical auth provider has the following methods:

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

We have methods to handle login, logging out, registering, recovering and updating passwords, and getting auth status, user identity and user permissions.

As indicated above, an auth provider's methods are expected to return a Promise. So, `async` methods are used to compose an auth provider. These methods perform their respective operations when they are invoked via **refine** auth hooks.

[Refer to Auth Provider documentation to see the details of each method](/docs/api-reference/core/providers/auth-provider/).


## Using an Auth Provider in refine

`<Refine />`'s auth context is enabled by passing the `authProvider` object to its `authProvider` prop. It already comes enabled with our initialized app.

```tsx
// Inside App.tsx

<Refine
    // ---
    authProvider={authProvider}
/>;
```

The auth provider is closely related to the backend API service, which is **Simple REST API** in our case. At initialization, **refine.new** generated an auth provider for us, which is tailored to address **Simple REST API**, a simple RESTful API service provided by **refine**. It looks like below:

```tsx title="src/authProvider.ts"

import { AuthBindings } from "@refinedev/core";

export const TOKEN_KEY = "refine-auth";

export const authProvider: AuthBindings = {
  login: async ({ username, email, password }) => {
    if ((username || email) && password) {
      localStorage.setItem(TOKEN_KEY, username);
      return {
        success: true,
        redirectTo: "/",
      };
    }

    return {
      success: false,
      error: {
        name: "LoginError",
        message: "Invalid username or password",
      },
    };
  },
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        id: 1,
        name: "John Doe",
        avatar: "https://i.pravatar.cc/300",
      };
    }
    return null;
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
```

These methods define the app's ability to authenticate and authorize requests with the backend for our React admin panel app.

[Refer to the `<Refine />` documentation for more information &#8594](/docs/api-reference/core/components/refine-config/)


## Using Auth Provider Methods in Components

Each auth provider method in **refine** has corresponding hooks via which they can be accessed from inside a component. So, we use these hooks to perform auth operations in our app.

For example, we can use the `useLogin()` hook to implement login operations like below:

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

As we can see, `useLogin()` returns a `mutate` function, which basically gives us access to the `authProvider.login` method. Ivoking this `mutate()` function then executes the auth provider `login` method and logs the user in.

[Refer to Auth Hooks documentation for the details of each hook](/docs/api-reference/core/hooks/auth/useIsAuthenticated/).

:::info

We made an example to show the relationship between auth provider methods and auth hooks. We used the `useLogin()` hook in the example, but all auth hooks work the same way.

:::

## Auth Provider Examples

<AuthProviderExamplesLinks/>

<br />
<br />

<Checklist>

<ChecklistItem id="auth-provider-intro">
I understand that auth provider methods deal with user authentication adn authorization.
</ChecklistItem>
<ChecklistItem id="auth-provider-intro-2">
I understand that in <strong>refine</strong>, <code>useLogin()</code> hook is used to log a user in.
</ChecklistItem>
<ChecklistItem id="auth-provider-intro-3">
I learned that refine offers built-in auth provider examples for various Auth Providers like Google Auth, Auth0, Okta, etc.
</ChecklistItem>

</Checklist>
