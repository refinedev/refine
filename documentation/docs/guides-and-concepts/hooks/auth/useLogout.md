---
id: useLogout
title: useLogout
siderbar_label: useLogout
description: useLogout data hook from refine is a modified version of react-query's useMutation for create mutations
---

`useLogout` returns a callback that calls `logout` method from `authProvider` under the hood.  
It unauthenticates the app if `logout` method from `authProvider` resolves and if it rejects keeps authentication state the same, authenticates the app.

## Usage

Normally refine provides a default logout button on the sider. If you prefer to use this default logout button, there is no need to handle logout flow manually.  
If we want to build a custom logout button instead of default one that comes with refine, `useLogout` can be used like this:

```tsx title="components/customLogoutButton"
import { useLogout, Button } from "@pankod/refine";

export const LogoutButton = () => {
    const logout = useLogout();

    return (
        <Button onClick={() => logout()}>
            Logout
        </Button>
    )
}
```

:::tip
Callback returned from `useLogout` can accept any kind of object for params since `login` method from `authProvider` doesn't have a restriction on its parameters.
:::

:::caution
This hook can only be used if `authProvider` is provided.
:::
