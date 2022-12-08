---
id: useLogout
title: useLogout
siderbar_label: useLogout
description: useLogout data hook from refine is a modified version of react-query's useMutation for unauthentication.
---

`useLogout` calls the `logout` method from the [`authProvider`](/api-references/providers/auth-provider.md) under the hood.  
It unauthenticates the app if the `logout` method from the `authProvider` resolves and if it rejects, it keeps authentication state the same.

It returns the result of `react-query`'s [`useMutation`](https://react-query.tanstack.com/reference/useMutation). 
Data that is resolved from the `logout` will be returned as the `data` in the query result.

## Usage
By default, Refine already provides a logout button on the sider and if you want to use this default button you won't need to handle the logout flow manually. 
If you want to build a custom logout button instead of the default one, `useLogout` can be used like this:

```tsx title="components/customLogoutButton"
import { useLogout, Button } from "@pankod/refine";

export const LogoutButton = () => {
    const { mutate: logout } = useLogout();

    return (
        <Button onClick={() => logout()}>
            Logout
        </Button>
    )
}
```
<br/>

## Redirection after logout

We have 4 options to manage the redirection after logout process.

- If promise returned from logout is resolved with nothing, app will be redirected to the `/login` route by default. 

- A custom url can be given to mutate function from the `useLogout` hook if you want to redirect yourself to a certain url.

```tsx 
import { useLogout } from "@pankod/refine";

const { mutate: logout } = useLogout();

logout({ redirectPath:"/custom-url" });
```

<br/>

- A custom url can be resolved from the promise returned from the `logout` method of the [authProvider](/api-references/providers/auth-provider.md).

```tsx
const authProvider: AuthProvider = {
    ...
    logout: () => {
        ...
        return Promise.resolve("/custom-url");
    }
}
```
<br/>

- If promise returned from the `logout` method of the [authProvider](/api-references/providers/auth-provider.md) gets resolved with `false` no redirection will occur.

```tsx
const authProvider: AuthProvider = {
    ...
    logout: () => {
        ...
        return Promise.resolve(false);
    }
}
```

<br/>



:::caution 
Custom url given to mutate function from `useLogout` overrides the one on the `authProvider`.
:::

:::tip
`mutate` acquired from the `useLogout` can accept any kind of object for values since the `logout` method from the `authProvider` doesn't have a restriction on its parameters.
:::

:::caution
This hook can only be used if the `authProvider` is provided.
:::
