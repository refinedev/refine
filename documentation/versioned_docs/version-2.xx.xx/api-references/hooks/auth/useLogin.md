---
id: useLogin
title: useLogin
siderbar_label: useLogin
description: useLogin data hook from refine is a modified version of react-query's useMutation for authenttication.
---

`useLogin`  calls `login` method from [`authProvider`](/api-references/providers/auth-provider.md) under the hood.  
It authenticates the app if `login` method from `authProvider` resolves and if it rejects shows an error notification. After successful authentication it redirects the app to root.

It returns the result of `react-query`'s [useMutation](https://react-query.tanstack.com/reference/useMutation). 

Data that is resolved from `login` will be returned as the `data` in the query result.

## Usage

Normally refine provides a default login page. If you prefer to use this default login page, there is no need to handle login flow manually.  
If we want to build a custom login page instead of default one that comes with refine, `useLogin` can be used like this:

```tsx title="pages/customLoginPage"
import { useLogin, Form } from "@pankod/refine";

type LoginVariables = {
    username: string;
    password: string;
}

export const LoginPage = () => {
    const { mutate: login } = useLogin<LoginVariables>();

    const onSubmit = (values: LoginVariables) => {
        login(values);
    };

    return (
        <Form onFinish={onSubmit}>
            // rest of the login form
        </Form>
    )
}
```

:::tip
`mutate` acquired from `useLogin` can accept any kind of object for values since `login` method from `authProvider` doesn't have a restriction on its parameters.  
A type parameter for the values can be provided to `useLogin`.
```tsx
const { mutate: login } = useLogin<{ username: string; password: string; }>();
```
:::

:::caution
This hook can only be used if `authProvider` is provided.
:::
