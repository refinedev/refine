---
id: useForgotPassword
title: useForgotPassword
siderbar_label: useForgotPassword
description: useForgotPassword data hook from refine is a modified version of react-query's useMutation for registration.
source: /packages/core/src/hooks/auth/useForgotPassword/index.ts
---

:::caution
This hook can only be used if `authProvider` is provided.
:::

`useForgotPassword` calls `forgotPassword` method from [`authProvider`](/api-reference/core/providers/auth-provider.md) under the hood.

It returns the result of `react-query`'s [useMutation](https://react-query.tanstack.com/reference/useMutation) which includes many properties, some of which being isSuccess and isError.

Data that is resolved from `forgotPassword` will be returned as the `data` in the query result with the following type:

```ts
type AuthActionResponse = {
    success: boolean;
    redirectTo?: string;
    error?: Error;
    [key: string]: unknown;
};
```

-   `success`: A boolean indicating whether the operation was successful. If `success` is false, a notification will be shown.
    -   When `error` is provided, the notification will contain the error message and name. Otherwise, a generic error message will be shown with the following values `{ name: "Forgot Password Error", message: "Invalid credentials" }`.
-   `redirectTo`: If has a value, the app will be redirected to the given URL.
-   `error`: If has a value, a notification will be shown with the error message and name.
-   `[key: string]`: Any additional data you wish to include in the response, keyed by a string identifier.

## Usage

Normally refine provides a default forgot password page. If you prefer to use this default forgot password page, there is no need to handle forgot password flow manually.  
If we want to build a custom forgotPassword page instead of the default one that comes with **refine**, `useForgotPassword` can be used like this:

```tsx title="pages/customForgotPasswordPage"
import { useForgotPassword } from "@refinedev/core";

type forgotPasswordVariables = {
    email: string;
};

export const forgotPasswordPage = () => {
    const { mutate: forgotPassword } =
        useForgotPassword<forgotPasswordVariables>();

    const onSubmit = (values: forgotPasswordVariables) => {
        forgotPassword(values);
    };

    return (
        <form onSubmit={onSubmit}>
            <label>Email</label>
            <input name="email" value="test@refine.com" />
            <button type="submit">Submit</button>
        </form>
    );
};
```

:::tip
`mutate` acquired from `useForgotPassword` can accept any kind of object for values since `forgotPassword` method from `authProvider` doesn't have a restriction on its parameters.  
A type parameter for the values can be provided to `useForgotPassword`.

```tsx
import { useForgotPassword } from "@refinedev/core";

const { mutate: forgotPassword } = useForgotPassword<{ email: string }>();
```

:::

## Redirection after forgotPassword

A custom URL can be given to mutate the function from the `useForgotPassword` hook if you want to redirect yourself to a certain URL.

```tsx
import { useForgotPassword } from "@refinedev/core";

const { mutate: forgotPassword } = useForgotPassword();

forgotPassword({ redirectPath: "/custom-url" });
```

Then, you can handle this URL in your `forgotPassword` method of the `authProvider`.

```tsx
import type { AuthBindings } from "@refinedev/core";

const authProvider: AuthBindings = {
    // ---
    forgotPassword: async ({ redirectPath }) => {
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
import { useForgotPassword } from "@refinedev/core";

const { mutate: forgotPassword } = useForgotPassword();

forgotPassword(
    {
        email: "refine@example.com",
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

The `onError` callback of the `useForgotPassword` hook will not be called if `success` is `false` because the callback is triggered only when the promise is rejected. However, the methods of `authProvider` always return a resolved promise.

:::
