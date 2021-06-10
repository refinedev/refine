---
id: useLogout
title: useLogout
siderbar_label: useLogout
description: useLogout data hook from refine is a modified version of react-query's useMutation for create mutations
---

`useLogout` calls `logout` method from [`authProvider`](/docs/guides-and-concepts/providers/auth-provider) under the hood.  
It unauthenticates the app if `logout` method from `authProvider` resolves and if it rejects keeps authentication state the same, authenticates the app.

It returns the result of react-query's [useMutation](https://react-query.tanstack.com/reference/useMutation). 
Data that is resolved from `logout` will be returned as the `data` in the query result.

## Usage

Normally refine provides a default logout button on the sider. If you prefer to use this default logout button, there is no need to handle logout flow manually.  
If we want to build a custom logout button instead of default one that comes with refine, `useLogout` can be used like this:

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

We have 4 options to manage redirection after logout process.

- If promise returned from logout is resolved with nothing, app will be redirected to `/login` route by default. 

- A custom url can be given to callback returned from the `useLogout` hook:

```tsx
const logout = useLogout();
logout("/custom-url")
```

<br/>

- A custom url can be resolved from the promise returned from `logout` method of [authProvider](/docs/guides-and-concepts/providers/auth-provider).

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

- If promise returned from `logout` method of [authProvider](/docs/guides-and-concepts/providers/auth-provider) is resolved with `false` no redirection occurs.

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



:::important 
Custom url given to callback returned from `useLogout` overrides the one on the `authProvider`.
:::


:::tip
Callback returned from `useLogout` can accept any kind of object for params since `logout` method from `authProvider` doesn't have a restriction on its parameters.
:::

:::caution
This hook can only be used if `authProvider` is provided.
:::
