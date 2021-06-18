---
id: auth-provider
title: Auth Provider
sidebar_label: Auth Provider
---

import login from '@site/static/img/guides-and-concepts/providers/auth-provider/login.png';
import logout from '@site/static/img/guides-and-concepts/providers/auth-provider/logout.gif';

**refine** let's you set authentication logic by providing `authProvider` property to `<Admin>` component.

`authProvider` is an object with methods that **refine** uses when necessary. These methods need to return a Promise. They also can be accessed with specialized hooks.

An auth provider must include following methods:

```tsx
const authProvider = {
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    checkAuth: () => Promise.resolve(),
    checkError: () => Promise.resolve(),
    getPermissions: () => Promise.resolve(),
    getUserIdentity: () => Promise.resolve()
};
```

:::important
**refine** consumes this methods using [authorization hooks]((guides-and-concepts/hooks/auth/useLogin)).
Authorization hooks are used to manage authentication and authorization operations like login, logout and catching Http errors etc.
:::

## Usage

To use auth provider in **refine**, we have to pass the authProvider to `<Admin />` component.


```tsx title="App.tsx"
import {
    Admin,
    //highlight-next-line
    AuthProvider,
} from "@pankod/refine";
import dataProvider from "@pankod/refine-json-server";
//highlight-next-line
import authProvider from "./auth-provider";

const API_URL = "https://api.fake-rest.refine.dev";



const App = () => {
   
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

By default, **refine** doesn't require authentication configuration.  

If an `authProvider` property is not provided, **refine** will use a default `authProvider`. This default `authProvider` lets the app work without an authentication requirement.  
If your app doesn't require authentication, no further setup is necessary for the app to work.


## Creating an auth provider
We'll build a simple auth provider from scratch to show the logic of how auth provider methods interact with the app.



### `login`

**refine** expects this method to return a resolved Promise if login is successful, and a rejected Promise if not.

-   If login is successful, pages that requires authentication becomes accessible.

-   If the login fails, **refine** displays an error message to the user in a notification.

<br />




Here we show an example `login` method that stores auth data in localStorage.
For sake of simplicity, we'll use mock data and check the user credentials from local storage.

```tsx title="auth-provider.ts"
const mockUsers = [{ username: "admin" }, { username: "editor" }];

const authProvider = {
    //highlight-start
    login: ({ username, password, remember }) => {
        // Suppose we actually send a request to the back end here.
        const user = mockUsers.find((item) => item.username === username);

        if (user) {
            localStorage.setItem("auth", JSON.stringify(user));
            return Promise.resolve();
        }

        return Promise.reject();
    }
    //highlight-end
}
```
<br />

`login` method will be accessible via `useLogin` auth hook.

```tsx
import { useLogin } from "@pankod/refine";

const { mutate: login } = useLogin();

login(values);
```

:::tip
`mutate` acquired from `useLogin` can accept any kind of object for values since `login` method from `authProvider` doesn't have a restriction on its parameters.  
A type parameter for the values can be provided to `useLogin`.
```tsx
const { mutate: login } = useLogin<{ username: string; password: string; remember: boolean; }>();
```
:::



>[Refer to useLogin documentation for more information. &#8594](guides-and-concepts/hooks/auth/useLogin.md)

<br />

#### Default login page

 If an `authProvider` is given, refine shows a default login page on `"/"` and `"/login"` routes with a login form if a custom `LoginPage` is not provided.
Rest of the app won't be accessible until a successful authentication.  
After submission, login form calls the `login` method from `authProvider`.

<br />


<div style={{textAlign: "center"}}>
    <img style={{width: "50%"}} src={login} />
</div>

<br />
<br />

:::important
If an `authProvider` is given, [Resources](#) passed to `<Admin>` as children are only accessible if login is successful. In case of no `authProvider`, they are accessible without authentication.  
:::

:::tip
[Refer to documentation on how to customize default login page.&#8594](#)
:::

<br />

### `logout`

**refine** expects this method to return a resolved Promise if logout is successful, and a rejected Promise if not.

-   If logout is successful, pages that requires authentication becomes unaccessible.

-   If the logout fails, **refine** displays an error message to the user in a notification.

<br />

Here we show an example `logout` that removes auth data from local storage and returns a resolved promise.

```tsx title="auth-provider.ts"
const authProvider = {
    ...
    //highlight-start
    logout: () => {
        localStorage.removeItem("auth");
        return Promise.resolve();
    }
    //highlight-end
    ...
}
```


<br />

`logout` method will be accessible via `useLogout` auth hook.

```tsx
import { useLogout } from "@pankod/refine";

const { mutate: logout } = useLogout();

logout();
```


:::tip
`mutate` acquired from `useLogout` can accept any kind of object for values since `logout` method from `authProvider` doesn't have a restriction on its parameters.  
:::


>[Refer to useLogout documentation for more information. &#8594](guides-and-concepts/hooks/auth/useLogout.md)

<br />


#### Default logout button

If authentication is enabled, a logout button appears at the bottom of the side bar menu. When the button is clicked, `logout` method from `authProvider` is called.

**refine** redirects the app to `/login` route by default.
<br />

<div>
    <img src={logout} />
</div>
<br/>


#### Redirection after logout
Redirection url can be customized by returning a route string, or false to disable redirection after logout.

```tsx
const authProvider = {
    ...
    logout: () => {
        localStorage.removeItem("auth");
        // highlight-next-line
        return Promise.resolve("custom-url");
    }
}
```


:::tip
Current authentication data needs to be cleaned by the `logout` method. For example if a token is stored in local storage, `logout` must remove it as shown above.
:::

<br />

### `checkError`


When a `dataProvider` method returns an error, `checkError` is called with the error object.  
If `checkError` returns a rejected promise, `logout` method is called and users become unauthorized and get redirected to `/login` page by default.


In this example, we log the user out when HTTP error status code is `401`.  
You can decide depending on any error status code you want to check if the users continue to process by returning a resolved promise or they are logged out by rejecting the promise.

```tsx title="auth-provider.ts"
const authProvider = {
    ...
    logout: () => {
        localStorage.removeItem("auth");
        return Promise.resolve();
    },
    // highlight-start
    checkError: (error) => {
        if (error.status === 401) {
            return Promise.reject();
        }
        return Promise.resolve();
    },
    // highlight-end
   ...
};
```
<br />


`checkError` method will be accessible via `useCheckError` auth hook.

```tsx
import { useCheckError } from "@pankod/refine";

const { mutate: checkError } = useCheckError();

checkError(error);
```
:::tip
`mutate` acquired from `useLogout` can accept any kind of object for values since `logout` method from `authProvider` doesn't have a restriction on its parameters.  
:::


>[Refer to useCheckError documentation for more information. &#8594](guides-and-concepts/hooks/auth/useCheckError.md)

<br />

#### Redirection after error

You can override the default redirection by giving a path to the rejected promise.

```tsx
checkError: (error) => {
    if (error.status === 401) {
        // highlight-next-line
        return Promise.reject("custom-url");
    }
    ...
}
```

:::important
Redirection path given to `checkError` overrides the one on `logout`.
:::

<br />

### `checkAuth`

Whenever route changes, `checkAuth` from `authProvider` is called.  
When `checkAuth` returns a rejected promise, authentication is cancelled and the app is redirected to an error page that allows the user to navigate to the root path which shows a login page by default.

Checking the authentication data can be easily done here. For example if the authentication data is stored in the local storage:

```tsx title="auth-provider.ts"
const authProvider = {
   ...
    // highlight-start
    checkAuth: () => {
        localStorage.getItem("auth") ? Promise.resolve() : Promise.reject(),
    // highlight-end
   ...
};
```

<br />

`checkAuth` method will be accessible via `useAuthenticated` auth hook.

```tsx
import { useAuthenticated } from "@pankod/refine";

const { isSuccess, isLoading, isError, refetch: checkAuth } = useAuthenticated();
```

>[Refer to useAuthenticated documentation for more information. &#8594](guides-and-concepts/hooks/auth/useAuthenticated.md)

<br />


### `getPermissions`

You may want to require authorization for certain parts of the app based on the permissions that current user have. Permission logic can be defined in `getPermission` method.

We will show how to add authorization based on roles determined in `getPermissions`.

```tsx title="auth-provider.ts"
const mockUsers = [
    {
        username: "admin",
        // highlight-next-line
        roles: ["admin"],
    },
    {
        username: "editor",
         // highlight-next-line
        roles: ["editor"],
    }
];

const authProvider = {
...
    // highlight-start
    getPermissions: () => {
        const auth = localStorage.getItem("auth");
        if (auth) {
            const parsedUser = JSON.parse(auth);
            return Promise.resolve(parsedUser.roles);
        }
        return Promise.reject();
    },
    // highlight-end
 ...   
};
```

<br/>


Data that `getPermissions` resolves with is accesible by [`usePermissions`](#) hook.


For example if only admins must be able to create new posts from list page.
`<List>` can show a button for creating new posts. If it's required that only admins can create new posts, this button must be only accessible to users who has `"admin"` role.

```tsx title="pages/post/list"
import { List, usePermissions } from "@pankod/refine";

export const PostList: React.FC = () => {
    const { data: permissionsData } = usePermissions();

    return <List canCreate={permissionsData?.includes("admin")}>...</List>;
};
```

> [Refer to usePermissions documentation for more information. &#8594](guides-and-concepts/hooks/auth/usePermissions.md)

<br/>


### `getUserIdentity`

User data can be accessed within the app by returning a resolved Promise in `getUserIdentity` method.

```tsx title="auth-provider.ts"
const authProvider = {
...
        // highlight-start
    getUserIdentity: () => {
        const auth = localStorage.getItem("auth");
        if (auth) {
            const parsedUser = JSON.parse(auth);
            return Promise.resolve(parsedUser.username);
        }
        return Promise.reject();
    }
    // highlight-end
};
```

<br />

The resolved data can be get using [`useGetIdentity`](#) hook.

```tsx
import { useGetIdentity } from "@pankod/refine";

const { data: userIdentity } = useGetIdentity();
// userIdentity: "admin"
```

> [Refer to useGetIdentity documentation for more information. &#8594](guides-and-concepts/hooks/auth/useGetIdentity.md)

<!-- User data will be shown at right top of the app. -->

<!-- Kullanıcı adı ve avatar oluşturulduğu zaman eklenecek.. -->

<br />

## Setting Authorization Credentials

After user logins, their credentials can be sent along with the API request by configuring the [`dataProvider`](#). A custom `httpClient` can be passed to `dataProvider` to include configurations like cookies, request headers.

We'll show how to add a token got from `login` method to **Authorization** header of **HTTP** requests.

```tsx title="App.tsx"
...
//highlight-next-line
import axios from "axios";

//highlight-next-line
const axiosInstance = axios.create();

//highlight-start
const mockUsers = [
    { username: "admin", token: "123" },
    { username: "editor", token: "321" }
];
//highlight-end

const App = () => {
    const authProvider: AuthProvider = {
        login: ({ username, password }) => {
                // Suppose we actually send a request to the back end here.
                const user = mockUsers.find((item) => item.username === username);

                if (user) {
                    localStorage.setItem("auth", JSON.stringify(user));

                    // highlight-start
                    axiosInstance.defaults.headers = {
                        Authorization: `Bearer ${user.token}`,
                    };
                    // highlight-end

                    return Promise.resolve();
                }
                return Promise.reject();
            },
            ...
        };

    return (
        <Admin
            authProvider={authProvider}
            // highlight-next-line
            dataProvider={dataProvider(API_URL, axiosInstance)}>
            ...
        </Admin>
    );
}
```

:::note
We recommend to use **axios** as Http client with **@pankod/refine-json-server** data provider. Other Http clients can be also preferred.
:::



## Hooks and Components

This hooks can be used with `authProvider` authentication and authorization operations.

-   [useAuthenticated](#)
-   [useCheckError](#)
-   [useGetIdentity](#)
-   [useLogin](#)
-   [useLogout](#)
-   [usePermissions](#)
-   [Authenticated](#)

<br />

## API Reference

### Properties

| Property                                                                                                 | Description                               | Resolve condition                     |
| -------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ------------------------------------- |
| login <div className=" required">Required</div>                                                        | Log user in                               | Auth confirms login                   |
| logout <div className=" required">Required</div>                                                         | Log user out                              | Auth confirms logout                  |
| checkAuth <div className=" required">Required</div>                                                      | Check credentials on each route changes   | Authentication still persist          |
| checkError <div className=" required">Required</div>                                                   | Check if a data provider returns an error | Data provider doesn't return an error |
| <div className="required-block"><div>getPermissions</div> <div className="required">Required</div></div> | Can be use to get user credentials        | Authorization roles accepted          |
| getUserIdentity                                                                                          | Can be use to get user identity           | User identity avaliable to return     |


<br />

## Live Codesandbox Example

<iframe src="https://codesandbox.io/embed/refine-authorization-example-b26r5?autoresize=1&fontsize=14&module=%2Fsrc%2FApp.tsx&theme=dark&view=preview"
    style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
    title="refine-authorization-example"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>