---
id: useLogin
title: useLogin
siderbar_label: useLogin
description: useLogin data hook from refine is a modified version of react-query's useMutation for authenttication.
---

`useLogin` calls the `login` method from the [`authProvider`](/docs/api-references/providers/auth-provider) under the hood.  
It authenticates the app if `login` method from the `authProvider` resolves and if it rejects, it shows an error notification. After a successful authentication it redirects the app to root.

`useLogin` returns the result of react-query's [useMutation](https://react-query.tanstack.com/reference/useMutation). 
Data that is resolved from `login` will be returned as the `data` in the query result.

## Usage

By default, Refine already provides a login page and if you want to use this default page, you won't need to handle the login flow manually.
If you want to build a custom login page instead of the default one, `useLogin` can be used like this:

```tsx title="pages/customLoginPage"
import { useLogin, Form } from "@pankod/refine";

export const LoginPage = () => {
    const { mutate: login } = useLogin();

    const onSubmit = async (values) => {
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
This hook can only be used if the `authProvider` is provided.
:::
