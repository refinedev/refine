---
id: useLogin
title: useLogin
siderbar_label: useLogin
description: useLogin data hook from refine is a modified version of react-query's useMutation for create mutations
---

`useLogin` returns a callback that calls `login` method from `authProvider` under the hood.  
It authenticates the app if `login` method from `authProvider` resolves and if it rejects shows an error notification. After successful authentication it redirects the app to root.

## Usage

Normally refine provides a default login page. If you prefer to use this default login page, there is no need to handle login flow manually.  
If we want to build a custom login page instead of default one that comes with refine, `useLogin` can be used like this:

```tsx title="pages/customLoginPage"
import { useLogin, Form } from "@pankod/refine";

export const LoginPage = () => {
    const login = useLogin();

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
Callback returned from `useLogin` can accept any kind of object for values since `login` method from `authProvider` doesn't have a restriction on its parameters.
:::

:::caution
This hook can only be used if `authProvider` is provided.
:::
