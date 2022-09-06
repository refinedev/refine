---
id: useResetPassword
title: useResetPassword
siderbar_label: useResetPassword
description: useResetPassword data hook from refine is a modified version of react-query's useMutation for registration.
---

`useResetPassword` calls `resetPassword` method from [`authProvider`](/core/providers/auth-provider.md) under the hood. It reset passwords the user if `resetPassword` method from `authProvider` resolves and if it rejects shows an error notification.

It returns the result of `react-query`'s [useMutation](https://react-query.tanstack.com/reference/useMutation).

Data that is resolved from `resetPassword` will be returned as the `data` in the query result.

## Usage

Normally refine provides a default reset password page. If you prefer to use this default reset password page, there is no need to handle reset password flow manually.  
If we want to build a custom resetPassword page instead of default one that comes with refine, `useResetPassword` can be used like this:

```tsx title="pages/customResetPasswordPage"
import { useResetPassword } from "@pankod/refine-core";

type resetPasswordVariables = {
    email: string;
};

export const resetPasswordPage = () => {
    const { mutate: resetPassword } =
        useResetPassword<resetPasswordVariables>();

    const onSubmit = (values: resetPasswordVariables) => {
        resetPassword(values);
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
`mutate` acquired from `useResetPassword` can accept any kind of object for values since `resetPassword` method from `authProvider` doesn't have a restriction on its parameters.  
A type parameter for the values can be provided to `useResetPassword`.

```tsx
const { mutate: resetPassword } = useResetPassword<{ email: string }>();
```

:::

## Redirection after resetPassword

We have 2 options for redirecting the app after resetPassword successfully .

-   A custom url can be resolved from the promise returned from the `resetPassword` method of the [authProvider](/core/providers/auth-provider.md).

```tsx
const authProvider: AuthProvider = {
    ...
    resetPassword: () => {
        ...
        return Promise.resolve("/custom-url");
    }
}
```

A custom url can be given to mutate function from the `useResetPassword` hook if you want to redirect yourself to a certain url.

```tsx
import { useResetPassword } from "@pankod/refine-core";

const { mutate: resetPassword } = useResetPassword();

resetPassword({ redirectPath: "/custom-url" });
```

Then, you can handle this url in your `resetPassword` method of the `authProvider`.

```tsx

const authProvider: AuthProvider = {
    ...
    resetPassword: ({ redirectPath }) => {
        ...
        return Promise.resolve(redirectPath);
    }
}

```

-   If the promise returned from the `resetPassword` method of the `authProvider` gets resolved with `false` no redirection will occur.

```tsx
const authProvider: AuthProvider = {
    ...
    resetPassword: () => {
        ...
        return Promise.resolve(false);
    }
}
```

:::tip
If the promise returned from `resetPassword` is resolved with nothing, app won't be redirected to any route by default.
:::

:::caution
This hook can only be used if `authProvider` is provided.
:::
