---
id: authProvider
title: Auth Provider
sidebar_label: Auth Provider
---

import login from '@site/static/img/login.png';
import logout from '@site/static/img/logout.gif';

`refine` let's you set authentication logic by providing `authProvider` property to `<Admin>` component.

`authProvider` is an object with methods that `refine` uses when necessary. These methods need to return a Promise. They also can be accessed with specialized hooks.

## Usage

We'll show how to implement basic authentication flow:

```tsx title="src/App.tsx"
import {
    Admin,
    //highlight-next-line
    AuthProvider,
} from "@pankod/refine";
import dataProvider from "@pankod/refine-json-server";

const API_URL = "https://refine-fake-rest.pankod.com";
const mockUsers = [{ username: "admin" }, { username: "editor" }];

const App = () => {
    //highlight-start
    const authProvider: AuthProvider = {
        login: ({ username, password }) => {
            // Suppose we actually send a request to the back end here.
            const user = mockUsers.find((item) => item.username === username);

            if (user) {
                localStorage.setItem("auth", JSON.stringify(user));
                return Promise.resolve();
            }

            return Promise.reject();
        },
        logout: () => {
            localStorage.removeItem("auth");
            return Promise.resolve();
        },
        checkError: () => Promise.resolve(),
        checkAuth: () =>
            localStorage.getItem("auth") ? Promise.resolve() : Promise.reject(),
        getPermissions: () => Promise.resolve(),
        getUserIdentity: () => Promise.resolve(),
    };
    //highlight-end

    return (
        <Admin
            //highlight-next-line
            authProvider={authProvider}
            dataProvider={dataProvider(API_URL)}
        >
            ...
        </Admin>
    );
};
```

:::tip
By default, `refine` doesn't require authentication configuration.  
If an `authProvider` property is not provided, `refine` will use a default `authProvider`:

```tsx
const defaultProvider = {
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    checkAuth: () => Promise.resolve(),
    checkError: () => Promise.resolve(),
    getPermissions: () => Promise.resolve(),
    getUserIdentity: () => Promise.resolve(),
};
```

This `authProvider` lets the app work without an authentication requirement. If your app doesn't require authentication, no further setup is necessary for the app to work.
:::

<br />

## Login

If an `authProvider` is given, `refine` shows a default login page on `/` and `/login` routes with a login form. Rest of the app won't be accessible until a successful authentication.

<br />

<div style={{textAlign: "center"}}>
    <img style={{width: "50%"}} src={login} />
</div>
<br/>

After submission, login form calls the `login` method from `authProvider`.

`refine` expects this method to return a resolved Promise if login is successful, and a rejected Promise if not.

-   If login is successful, pages that requires authentication becomes accessible.

-   If the login fails, default login page from `refine` displays an Error message to the user in a notification.

:::important
If an `authProvider` is given, [Resources](#) passed to `<Admin>` as children are only accessible if login is successful. In case of no `authProvider`, they are accessible without authentication.  
:::

<br />

## Logout

If authentication is enabled, a logout button appears at the bottom of the side bar menu. When the button is clicked, `logout` method from `authProvider` is called.

refine redirects the app to `/login` route by default.
<br />

<div>
    <img src={logout} />
</div>
<br/>

Redirection url can be customized by returning a route string, or false to disable redirection after logout.

```tsx
const authProvider: AuthProvider = {
    ...
    logout: () => {
        localStorage.removeItem("auth");
        // highlight-next-line
        return Promise.resolve("/custom-url");
    }
}
```

:::tip
Current authentication data needs to be cleaned by the `logout` method. For example if a token is stored in local storage, `logout` must remove it as shown above.
:::

<br />

## Catching Http Errors

Each time `dataProvider` returns an error, `checkError` method of `authProvider` is called with error object.  
If `checkError` returns a rejected promise, `logout` method is called and users become unauthorized and get redirected to `/login` page by default.

```tsx
export default {
    ...
    logout: () => {
        localStorage.removeItem("auth");
        return Promise.resolve();
    },
    checkError: (error) => {
        const status = error.status;
        if (status === 401) {
            localStorage.removeItem('auth');
            return Promise.reject();
        }
        return Promise.resolve();
    },
   ...
};
```

<br />

In this example, we log the user out when Http error status code is 401.  
You can decide depending on any error status code you want to check if the users continue to process by returning a resolved promise or they are logged out by rejecting the promise.

:::tip
You can override the default redirection by giving a path to the rejected promise.

```tsx
if (status === 401) {
    localStorage.removeItem("auth");
    // highlight-next-line
    return Promise.reject("custom-url");
}
```

Redirection path given to `checkError` overrides the one on `logout`.
:::
