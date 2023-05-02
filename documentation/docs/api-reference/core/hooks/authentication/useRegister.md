---
id: useRegister
title: useRegister
siderbar_label: useRegister
description: useRegister data hook from refine is a modified version of react-query's useMutation for registration.
source: /packages/core/src/hooks/auth/useRegister/index.ts
---

:::caution
This hook can only be used if `authProvider` is provided.
:::

`useRegister` calls `register` method from [`authProvider`](/api-reference/core/providers/auth-provider.md) under the hood.

It returns the result of `react-query`'s [useMutation](https://react-query.tanstack.com/reference/useMutation) which includes many properties, some of which being isSuccess and isError.

Data that is resolved from `register` will be returned as the `data` in the query result with the following type:

```ts
type AuthActionResponse = {
    success: boolean;
    redirectTo?: string;
    error?: Error;
    [key: string]: unknown;
};
```

-   `success`: A boolean indicating whether the operation was successful. If `success` is false, a notification will be shown.
    -   When an `error` is provided, the notification will contain the error message and name. Otherwise, a generic error message will be shown with the following values `{ name: "Register Error", message: "Error while registering" }`.
-   `redirectTo`: If has a value, the app will be redirected to the given URL.
-   `error`: If has a value, a notification will be shown with the error message and name.
-   `[key: string]`: Any additional data you wish to include in the response, keyed by a string identifier.

## Usage

Normally refine provides a default register page. If you prefer to use this default register page, there is no need to handle the register flow manually.  
If we want to build a custom register page instead of the default one that comes with **refine**, `useRegister` can be used like this:

```tsx title="pages/customRegisterPage"
import { useRegister } from "@refinedev/core";

type RegisterVariables = {
    email: string;
    password: string;
};

export const RegisterPage = () => {
    const { mutate: register } = useRegister<RegisterVariables>();

    const onSubmit = (values: RegisterVariables) => {
        register(values);
    };

    return (
        <form onSubmit={onSubmit}>
            <label>Email</label>
            <input name="email" value="test@refine.com" />
            <label>Password</label>
            <input name="password" value="refine" />
            <button type="submit">Submit</button>
        </form>
    );
};
```

:::tip
`mutate` acquired from `useRegister` can accept any kind of object for values since `register` method from `authProvider` doesn't have a restriction on its parameters.  
A type parameter for the values can be provided to `useRegister`.

```tsx
const { mutate: register } = useRegister<{ email: string; password: string }>();
```

:::

## Logged In after successful registration

If you want to log in to the user after successful registration, you can use `useLogin` hook after `useRegister` hook `onSuccess` callback.

```tsx title="pages/customRegisterPage"
import { useRegister, useLogin } from "@refinedev/core";

type FormVariables = {
    email: string;
    password: string;
};

export const RegisterPage = () => {
    const { mutate: register } = useRegister<FormVariables>();
    const { mutate: login } = useLogin<FormVariables>();

    const onSubmit = (values: FormVariables) => {
        register(values, {
            //highlight-start
            onSuccess: () => {
                login(values);
            },
            //highlight-end
        });
    };

    return (
        <form onSubmit={onSubmit}>
            <label>Email</label>
            <input name="email" value="test@refine.com" />
            <label>Password</label>
            <input name="password" value="refine" />
            <button type="submit">Submit</button>
        </form>
    );
};
```

## Redirection after register

A custom URL can be given to mutate the function from the `useRegister` hook if you want to redirect yourself to a certain URL.

```tsx
import { useRegister } from "@refinedev/core";

const { mutate: register } = useRegister();

register({ redirectPath: "/custom-url" });
```

Then, you can handle this URL in your `register` method of the `authProvider`.

```tsx
const authProvider: AuthBindings = {
    // ---
    register: ({ redirectPath }) => {
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
import { useRegister } from "@refinedev/core";

const { mutate: register } = useRegister();

register(
    {
        email: "refine@example.com",
        password: "refine",
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

The `onError` callback of the `useRegister` hook will not be called if `success` is `false` because the callback is triggered only when the promise is rejected. However, the methods of `authProvider` always return a resolved promise.

:::
