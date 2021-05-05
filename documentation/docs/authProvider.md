---
title: Auth Providers
sidebar_label: Auth Providers
---

import login from '@site/static/img/login.png';

`refine` lets you secure your admin app with the authentication strategy of your choice. Since there are many possible strategies (Basic Auth, JWT, OAuth, etc.), refine delegates authentication logic to an `authProvider`.

## Enabling Auth Features

By default, refine apps don’t require authentication. To restrict access to the admin, pass an authProvider to the `<Admin>` component.

```tsx title="src/App.tsx"
import authProvider from "./authProvider";

const App = () => <Admin authProvider={authProvider}>...</Admin>;
```

React-admin delegates the [Authentication](#authentication) and [Authorization](#authorization) logic to an object that you must write, the `authProvider`.

“Authentication” logic allows to restrict an app to identified users only, and reject anonymous users
“Authorization” logic allows to tweak the features based on user permissions

## Anatomy Of An `authProvider`

What’s an authProvider? Just like a `dataProvider`, an `authProvider` is an object that handles authentication and authorization logic. It exposes methods that `refine` calls when needed, and that you can call manually through specialized [hooks](#hooks). The `authProvider` methods must return a Promise. The simplest `authProvider` is:

```tsx
import { AuthProvider } from "@pankod/refine";

const authProvider: AuthProvider = {
    // authentication
    login: (params) => Promise.resolve(),
    checkError: (error) => Promise.resolve(),
    checkAuth: (params) => Promise.resolve(),
    logout: () => Promise.resolve(),
    getIdentity: () => Promise.resolve(),
    // authorization
    getPermissions: (params) => Promise.resolve(),
};
```

You can get more details about input params, response and error formats in the [Building Your Own Auth Provider](#building-your-own-auth-provider) section below.

## Available Providers

Sanırsam Strapi bizde şuan var.
...
...
...
Bu alan şimdilik burda kalsın.

## Authentication

Let’s see when `refine` calls the authProvider, and how customize it depending on your authentication strategy and backend.

### Login Configuration

Once an admin has an authProvider, `refine` enables a new page on the /login route, which displays a login form asking for a username and password.

<div style={{textAlign: "center"}}>
    <img  width="40%" src={login} />
</div>
<br/>

Upon submission, this form calls the `authProvider.login({ login, password })` method. `refine` expects this method to return a resolved Promise if the credentials are correct, and a rejected Promise if they’re not.

For instance, to query an authentication route via `axios` and store the credentials (a token) in local storage, configure the authProvider as follows:

```tsx title="src/App.ts"
import { AuthProvider } from "@pankod/refine";

const App = () => {
    const axiosInstance = axios.create();

    const authProvider: AuthProvider = {
        login: async ({ username, password }) => {
            const { data, status } = await axiosInstance.post(
                "auth",
                username,
                password,
            );
            if (status === 200) {
                localStorage.setItem(TOKEN_KEY, data.jwt);

                // set header axios instance
                axiosInstance.defaults.headers = {
                    Authorization: `Bearer ${data.jwt}`,
                };

                return Promise.resolve;
            }
            return Promise.reject;
        },
        //...
    };

    return <Admin authProvider={authProvider}>...</Admin>;
};

export default App;
```

Once the promise resolves, the login form redirects to the previous page, or to the admin index if the user just arrived.

If the login fails, `authProvider.login()` should return a rejected Promise with an Error object. `refine` displays the Error message to the user in a notification.

### Catching Authentication Errors On The API

When the user credentials are missing or become invalid, a secure API usually answers to the `dataProvider` with an HTTP error code 401 or 403.

Fortunately, each time the `dataProvider` returns an error, `refine` calls the authProvider.checkError() method. If it returns a rejected promise, `refine` calls the `authProvider.logout()` method immediately, and asks the user to log in again.

So it’s up to you to decide which HTTP status codes should let the user continue (by returning a resolved promise) or log them out (by returning a rejected promise).

For instance, to log the user out for both 401 and 403 code

```tsx title="src/App.ts"
import { AuthProvider } from "@pankod/refine";

const App = () => {
    const axiosInstance = axios.create();

    const authProvider: AuthProvider = {
        login: ({ username, password }) => {
            // ...
        },
        checkError: (error) => {
            const status = error.status;
            if (status === 401 || status === 403) {
                localStorage.removeItem(TOKEN_KEY);
                return Promise.reject();
            }
            // other error code (404, 500, etc): no need to log out
            return Promise.resolve();
        },
        // ...
    };

    return <Admin authProvider={authProvider}>...</Admin>;
};

export default App;
```
