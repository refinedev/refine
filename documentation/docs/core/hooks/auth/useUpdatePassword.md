---
id: useUpdatePassword
title: useUpdatePassword
siderbar_label: useUpdatePassword
description: useUpdatePassword data hook from refine is a modified version of react-query's useMutation for registration.
---

`useUpdatePassword` calls `updatePassword` method from [`authProvider`](/core/providers/auth-provider.md) under the hood. It updatePasswords the app if `updatePassword` method from `authProvider` resolves and if it rejects shows an error notification.

It returns the result of `react-query`'s [useMutation](https://react-query.tanstack.com/reference/useMutation).

Data that is resolved from `updatePassword` will be returned as the `data` in the query result.

## Usage

Normally refine provides a default updatePassword page. If you prefer to use this default updatePassword page, there is no need to handle updatePassword flow manually.  
If we want to build a custom updatePassword page instead of default one that comes with refine, `useUpdatePassword` can be used like this:

```tsx title="pages/customupdatePasswordPage"
import { useUpdatePassword } from "@pankod/refine-core";
import { Form } from "@pankod/refine-antd";

type updatePasswordVariables = {
    password: string;
};

export const updatePasswordPage = () => {
    const { mutate: updatePassword } =
        useUpdatePassword<updatePasswordVariables>();

    const onSubmit = (values: updatePasswordVariables) => {
        updatePassword(values);
    };

    return <Form onFinish={onSubmit}>// rest of the updatePassword form</Form>;
};
```

:::tip
`mutate` acquired from `useUpdatePassword` can accept any kind of object for values since `updatePassword` method from `authProvider` doesn't have a restriction on its parameters.  
A type parameter for the values can be provided to `useUpdatePassword`.

```tsx
const { mutate: updatePassword } = useUpdatePassword<{ newPassword: string }>();
```

:::

## Redirection after updatePassword

We have 2 options for redirecting the app after updatePassword successfully .

-   A custom url can be resolved from the promise returned from the `updatePassword` method of the [authProvider](/core/providers/auth-provider.md).

```tsx
const authProvider: AuthProvider = {
    ...
    updatePassword: () => {
        ...
        return Promise.resolve("/custom-url");
    }
}
```

A custom url can be given to mutate function from the `useUpdatePassword` hook if you want to redirect yourself to a certain url.

```tsx
import { useUpdatePassword } from "@pankod/refine-core";

const { mutate: updatePassword } = useUpdatePassword();

updatePassword({ redirectPath: "/custom-url" });
```

Then, you can handle this url in your `updatePassword` method of the `authProvider`.

```tsx

const authProvider: AuthProvider = {
    ...
    updatePassword: ({ redirectPath }) => {
        ...
        return Promise.resolve(redirectPath);
    }
}

```

-   If promise returned from the `updatePassword` method of the `authProvider` gets resolved with `false` no redirection will occur.

```tsx
const authProvider: AuthProvider = {
    ...
    updatePassword: () => {
        ...
        return Promise.resolve(false);
    }
}
```

:::info
`useUpdatePassword` gives you query strings for the `updatePassword` method from `authProvider`. if you want to use them, you can use `queryStrings` variable `updatePassword` method from `authProvider`. Why do we need this? Because you can use token is your update password flow

```tsx
const url=`YOUR_BASE_URL/update-password?token=${token}`;
const authProvider: AuthProvider = {
    ...
    updatePassword: (params) => {
        // you can access query strings from params.queryStrings
        console.log(params.queryStrings.token);
        ...
    }
}
```

:::

:::tip
If promise returned from `updatePassword` is resolved with nothing, app won't be redirected to any route by default.
:::

:::caution
This hook can only be used if `authProvider` is provided.
:::
