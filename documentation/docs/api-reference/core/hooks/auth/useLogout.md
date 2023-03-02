---
id: useLogout
title: useLogout
siderbar_label: useLogout
description: useLogout data hook from refine is a modified version of react-query's useMutation for unauthentication.
---

`useLogout` calls the `logout` method from the [`authProvider`](/api-reference/core/providers/auth-provider.md) under the hood.  
It unauthenticates the app if the `logout` method from the `authProvider` resolves and if it rejects, it keeps authentication state the same.

It returns the result of `react-query`'s [`useMutation`](https://react-query.tanstack.com/reference/useMutation).
Data that is resolved from the `logout` will be returned as the `data` in the query result.

## Usage

By default, Refine already provides a logout button on the sider and if you want to use this default button you won't need to handle the logout flow manually.
If you want to build a custom logout button instead of the default one, `useLogout` can be used like this:

```tsx title="components/customLogoutButton"
import { useLogout } from "@pankod/refine-core";

export const LogoutButton = () => {
    const { mutate: logout } = useLogout();

    return <button onClick={() => logout()}>Logout</button>;
};
```

## Redirection after logout

A custom URL can be given to mutate the function from the `useLogin` hook if you want to redirect yourself to a certain URL.

```tsx
import { useLogout } from "@pankod/refine-core";

const { mutate: logout } = useLogout();

logout({ redirectPath: "/custom-url" });
```

Then, you can handle this URL in your `logout` method of the `authProvider`.

```tsx
const authProvider: AuthBindings = {
    // ---
    logout: async ({ redirectPath }) => {
        // ---
        return {
            success: true,
            redirectTo: redirectPath,
        };
    },
};
```

:::caution
This hook can only be used if `authProvider` is provided.
:::

:::tip
`mutate` acquired from the `useLogout` can accept any kind of object for values since the `logout` method from the `authProvider` doesn't have a restriction on its parameters.
:::

:::caution
This hook can only be used if the `authProvider` is provided.
:::
