---
id: useLogout
title: useLogout
siderbar_label: useLogout
description: useLogout data hook from refine is a modified version of react-query's useMutation for unauthentication.
source: /packages/core/src/hooks/auth/useLogout/index.ts
---

:::caution
This hook can only be used if the `authProvider` is provided.
:::

`useLogout` calls the `logout` method from the [`authProvider`](/api-reference/core/providers/auth-provider.md) under the hood.

It returns the result of `react-query`'s [useMutation](https://react-query.tanstack.com/reference/useMutation) which includes many properties, some of which being isSuccess and isError.
Data that is resolved from `logout` will be returned as the `data` in the query result with the following type:

```ts
type AuthActionResponse = {
    success: boolean;
    redirectTo?: string;
    error?: Error;
    [key: string]: unknown;
};
```

-   `success`: A boolean indicating whether the operation was successful. If `success` is false, a notification will be shown.
    -   When `error` is provided, the notification will contain the error message and name. Otherwise, a generic error message will be shown with the following values `{ name: "useLogout Error", message: "Something went wrong during logout" }`.
-   `redirectTo`: If has a value, the app will be redirected to the given URL.
-   `error`: If has a value, a notification will be shown with the error message and name.
-   `[key: string]`: Any additional data you wish to include in the response, keyed by a string identifier.

## Usage

By default, Refine already provides a logout button on the sider and if you want to use this default button you won't need to handle the logout flow manually.
If you want to build a custom logout button instead of the default one, `useLogout` can be used like this:

```tsx title="components/customLogoutButton"
import { useLogout } from "@refinedev/core";

export const LogoutButton = () => {
    const { mutate: logout } = useLogout();

    return <button onClick={() => logout()}>Logout</button>;
};
```

:::tip
`mutate` acquired from the `useLogout` can accept any kind of object for values since the `logout` method from the `authProvider` doesn't have a restriction on its parameters.
A type parameter for the values can be provided to `useLogout`.

```tsx
const { mutate: logout } = useLogout<{ redirectPath: string }>();
```

:::

## Redirection after logout

A custom URL can be given to mutate the function from the `useLogin` hook if you want to redirect yourself to a certain URL.

```tsx
import { useLogout } from "@refinedev/core";

const { mutate: logout } = useLogout();

logout({ redirectPath: "/custom-url" });
```

Then, you can handle this URL in your `logout` method of the `authProvider`.

```tsx
import type { AuthBindings } from "@refinedev/core";

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

## Error handling

Since the methods of `authProvider` always return a resolved promise, you can handle errors by using the `success` value in the response.

```tsx
import { useLogout } from "@refinedev/core";

const { mutate: logout } = useLogout();

logout(
    {
        redirectPath: "/custom-url",
    },
    {
        onSuccess: (data) => {
            if (!data.success) {
                // handle error
            }

            // handle success
        },
    },
);
```

:::caution

The `onError` callback of the `useLogout` hook will not be called if `success` is `false` because the callback is triggered only when the promise is rejected. However, the methods of `authProvider` always return a resolved promise.

:::
