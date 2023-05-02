---
id: useUpdatePassword
title: useUpdatePassword
siderbar_label: useUpdatePassword
description: useUpdatePassword data hook from refine is a modified version of react-query's useMutation for registration.
source: /packages/core/src/hooks/auth/useUpdatePassword/index.ts
---

:::caution
This hook can only be used if `authProvider` is provided.
:::

`useUpdatePassword` calls `updatePassword` method from [`authProvider`](/api-reference/core/providers/auth-provider.md) under the hood.

It returns the result of `react-query`'s [useMutation](https://react-query.tanstack.com/reference/useMutation).

Data that is resolved from `updatePassword` will be returned as the `data` in the query result with the following type:

```ts
type AuthActionResponse = {
    success: boolean;
    redirectTo?: string;
    error?: Error;
    [key: string]: unknown;
};
```

-   `success`: A boolean indicating whether the operation was successful. If `success` is false, a notification will be shown.
    -   When `error` is provided, the notification will contain the error message and name. Otherwise, a generic error message will be shown with the following values `{ name: "Update Password Error", message: "Error while resetting password" }`.
-   `redirectTo`: If has a value, the app will be redirected to the given URL.
-   `error`: If has a value, a notification will be shown with the error message and name.
-   `[key: string]`: Any additional data you wish to include in the response, keyed by a string identifier.

## Usage

Normally refine provides a default update password page. If you prefer to use this default update password page, there is no need to handle update password flow manually.  
If we want to build a custom update password page instead of the default one that comes with **refine**, `useUpdatePassword` can be used like this:

```tsx title="pages/customupdatePasswordPage"
import { useUpdatePassword } from "@refinedev/core";

type updatePasswordVariables = {
    password: string;
};

export const updatePasswordPage = () => {
    const { mutate: updatePassword } =
        useUpdatePassword<updatePasswordVariables>();

    const onSubmit = (values: updatePasswordVariables) => {
        updatePassword(values);
    };

    return (
        <form onSubmit={onSubmit}>
            <label>Password</label>
            <input name="password" value="refine" />
            <button type="submit">Submit</button>
        </form>
    );
};
```

:::tip
`mutate` acquired from `useUpdatePassword` can accept any kind of object for values since the `updatePassword` method from `authProvider` doesn't have a restriction on its parameters.  
A type parameter for the values can be provided to `useUpdatePassword`.

```tsx
const { mutate: updatePassword } = useUpdatePassword<{ newPassword: string }>();
```

:::

:::info
`useUpdatePassword` gives you query strings for the `updatePassword` method from `authProvider`. If you have a logic that sends a password regeneration email to the email address while resetting the password and proceeds through the access token. You can use `queryStrings` variable `updatePassword` method from `authProvider`. For example, your regeneration link is `YOUR_DOMAIN/update-password?token=123`. You can access the token from the parameters of the URL.

```tsx
import type { AuthBindings } from "@refinedev/core";

const authProvider: AuthBindings = {
    // ---
    updatePassword: (params) => {
        // you can access query strings from params.queryStrings
        console.log(params.token);
        if (param.token === "123") {
            // your logic to update the password
        }
        // ---
    },
};
```

:::

## Redirection after updatePassword

A custom URL can be given to mutate the function from the `useUpdatePassword` hook if you want to redirect yourself to a certain URL.

```tsx
import { useUpdatePassword } from "@refinedev/core";

const { mutate: updatePassword } = useUpdatePassword();

updatePassword({ redirectPath: "/custom-url" });
```

Then, you can handle this URL in your `updatePassword` method of the `authProvider`.

```tsx
import type { AuthBindings } from "@refinedev/core";

const authProvider: AuthBindings = {
    // ---
    updatePassword: async ({ redirectPath }) => {
        // ---
        return {
            success: true,
            redirectTo: redirectPath,
        };
    },
};
```

:::info
If the promise returned from `updatePassword` is resolved with nothing, app won't be redirected to any route by default.
:::

## Error handling

Since the methods of `authProvider` always return a resolved promise, you can handle errors by using the `success` value in the response.

```tsx
import { useUpdatePassword } from "@refinedev/core";

const { mutate: updatePassword } = useUpdatePassword();

updatePassword(
    {
        newPassword: "refine",
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

The `onError` callback of the `useUpdatePassword` hook will not be called if `success` is `false` because the callback is triggered only when the promise is rejected. However, the methods of `authProvider` always return a resolved promise.

:::
