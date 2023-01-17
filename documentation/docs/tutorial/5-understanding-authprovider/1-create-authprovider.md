---
id: create-authprovider
title: 2. Create Auth Provider From Scratch
tutorial:
    prev: tutorial/understanding-dataprovider/index
    next: tutorial/understanding-resources/index
---

This section will show you how to create an auth provider from scratch. We'll use mock data to be able to focus on the auth provider methods. When you understand the logic of auth provider, you can easly integrate third-party authentication services or your own custom auth provider which includes many possible strategies like JWT, OAuth, etc.

## Create Auth Provider

1. Create a new file named `authProvider.ts` in `src` folder and add the following code:

    ```tsx title="src/authProvider.ts"
    import { AuthProvider } from "@pankod/refine-core";

    const authProvider: AuthProvider = {
        login: () => Promise.resolve(),
        logout: () => Promise.resolve(),
        checkAuth: () => Promise.resolve(),
        checkError: () => Promise.resolve(),
        getPermissions: () => Promise.resolve(),
    };

    export default authProvider;
    ```

    We created a mock auth provider. It has all the required methods. But, they don't do anything. We'll add the logic to these methods in the next.

2. Now, we need to pass the `authProvider` to the `<Refine/>` component. Open `App.tsx` file and add related code:

    ```tsx title="src/App.tsx"
    ...
    import authProvider from "./authProvider";

    <Refine
        ...
        authProvider={authProvider}
    />
    ```

    The `authProvider` is not required for the `<Refine/>` component. If you don't pass it, your app will work without authentication. But, you won't be able to use the auth hooks.

<br />

We created a mock auth provider and passed it to the `<Refine/>` component. Now, we'll add the logic to the auth provider methods.

### login

`login` method is used to authenticate users. It expects to return a Promise.

-   If the Promise resolves, the user is authenticated and pages that require authentication will be accessible.

-   If the Promise rejects, the user is not authenticated and stays on the login page.

We'll use mock data to authenticate users. So, we'll create a mock user list and check if the user exists in the list. If the user exists, we'll save the user data to the local storage and resolve the Promise. Otherwise, we'll reject the Promise.

```tsx title="src/authProvider.ts"
import { AuthProvider } from "@pankod/refine-core";

const mockUsers = [{ email: "john@mail.com" }, { email: "jane@mail.com" }];

const authProvider: AuthProvider = {
    login: ({ email, password }) => {
        // Suppose we actually send a request to the back end here.
        const user = mockUsers.find((item) => item.email === email);

        if (user) {
            localStorage.setItem("auth", JSON.stringify(user));
            return Promise.resolve();
        }

        return Promise.reject();
    },
    ...
};
```

<br />

Invoking the `useLogin` hook's mutation will call the `login` method, passing in the mutation's parameters as arguments. This means the parameters for the `useLogin` hook's mutation must match the parameters of the login method.

[Refer to the `useLogin` documentation for more information &#8594](/docs/api-reference/core/hooks/auth/useLogin/)

For example, if we call the `useLogin` hook's mutation like this:

```tsx
import { useLogin } from "@pankod/refine-core";

const { mutate } = useLogin();

mutate({ email: "john@mail.com", password: "123456"}}

```

The `login` method will get the above values as parameters.

<br />

<details>
  <summary><strong>Can I pass any parameters to the <code>login</code> method?</strong></summary>

Yes, you can pass any parameters to the `login` method as long as you pass the same parameters to the `useLogin` hook's mutation as well.

```ts
const { mutate } = useLogin<{
    username: string;
    password: string;
    confirmPassword: string;
    remember: boolean;
}>();
```

</details>

<details>
  <summary><strong>How can I redirect the user to a specific page after login?</strong></summary>

By default, the user will be redirected to the `/` route after login. If you want to redirect the user to a specific page, you can resolve the `login` method's Promise with the path of the page.

```ts
const authProvider: AuthProvider = {
    ...
    login: () => {
        ...
        return Promise.resolve("/custom-page");
    }
}
```

Also, you can use the `useLogin` hook's for this purpose.

```tsx
const { mutate } = useLogin();

mutate({ redirectPath: "/custom-page" });
```

Then, you can use the `redirectPath` parameter in the `login` method to redirect the user to the specific page.

```ts
const authProvider: AuthProvider = {
    ...
    login: ({ redirectPath }) => {
        ...
        return Promise.resolve(redirectPath);
    }
}
```

If you don't want to redirect the user to anywhere, you can resolve the `login` method's Promise with `false`.

```ts
const authProvider: AuthProvider = {
    ...
    login: () => {
        ...
        return Promise.resolve(false);
    }
}
```

</details>

<details>
  <summary><strong>How can I customize the error message?</strong></summary>

**refine** automatically displays an error notification when the `login` method rejects the Promise. If you want to customize the error message, you can reject the Promise with an object that has `name` and `message` properties.

```tsx title="src/authProvider.ts"
import { AuthProvider } from "@pankod/refine-core";

const mockUsers = [{ email: "john@mail.com" }, { email: "jane@mail.com" }];

const authProvider: AuthProvider = {
    login: ({ email, password }) => {
        const user = mockUsers.find((item) => item.email === email);

        if (user) {
            localStorage.setItem("auth", JSON.stringify(user));
            return Promise.resolve();
        }

        //highlight-start
        return Promise.reject({
            name: "Login Failed!",
            message: "The email or password that you've entered doesn't match any account.",
        });
        //highlight-end
    },
    ...
};
```

</details>

### logout

`logout` method is used to log out users. It expects to return a Promise.

-   If the Promise resolves, the user is logged out and pages that require authentication will not be accessible.

-   If the Promise rejects, the user is not logged out and stays on the page.

We'll remove the user data from the local storage and resolve the Promise.

```tsx title="src/authProvider.ts"
import { AuthProvider } from "@pankod/refine-core";

const authProvider: AuthProvider = {
    ...
    logout: () => {
        localStorage.removeItem("auth");
        return Promise.resolve();
    },
    ...
};
```

<br />

Invoking the `useLogout` hook's mutation will call the `logout` method. If you need to pass any parameters to the `logout` method, you can use the `useLogout` hook's mutation.

[Refer to the `useLogout` documentation for more information &#8594](/docs/api-reference/core/hooks/auth/useLogout/)

For example, if we call the `useLogout` hook's mutation like this:

```tsx
import { useLogout } from "@pankod/refine-core";

const { mutate } = useLogout();

mutate({ id: 1 });
```

The `logout` method will get the above values as parameters.

<br />

<details>
  <summary><strong>How can I redirect the user to a specific page after logout?</strong></summary>

By default, the user will be redirected to the `/login` route after logout. If you want to redirect the user to a specific page, you can resolve the `logout` method's Promise with the path of the page.

```ts
const authProvider: AuthProvider = {
    ...
    logout: () => {
        ...
        return Promise.resolve("/custom-page");
    }
}
```

Also, you can use the `useLogout` hook's for this purpose.

```tsx
const { mutate } = useLogout();

mutate({ redirectPath: "/custom-page" });
```

Then, you can use the `redirectPath` parameter in the `logout` method to redirect the user to the specific page.

```ts
const authProvider: AuthProvider = {
    ...
    logout: ({ redirectPath }) => {
        ...
        return Promise.resolve(redirectPath);
    }
}
```

If you don't want to redirect the user to anywhere, you can resolve the `logout` method's Promise with `false`.

```ts

const authProvider: AuthProvider = {
    ...
    logout: () => {
        ...
        return Promise.resolve(false);
    }
}
```

</details>

<details>
  <summary><strong>How can I customize the error message?</strong></summary>

**refine** automatically displays an error notification when the `logout` method rejects the Promise. If you want to customize the error message, you can reject the Promise with an object that has `name` and `message` properties.

```tsx title="src/authProvider.ts"
import { AuthProvider } from "@pankod/refine-core";

const authProvider: AuthProvider = {
    logout: () => {
        ...
        //highlight-start
        return Promise.reject({
            name: "Logout Failed!",
            message: "Something went wrong.",
        });
        //highlight-end
    },
    ...
};
```

</details>

### checkAuth

`checkAuth` method is used to check if the user is authenticated. Internally, it is called when the user navigates to a page that requires authentication.

`checkAuth` method expects to return a Promise.

-   If the Promise resolves, the user is authenticated and pages that require authentication will be accessible.

-   If the Promise rejects, the user is not authenticated and pages that require authentication will not be accessible.

We'll check if the user data exists in the local storage and resolve the Promise.

```tsx title="src/authProvider.ts"
import { AuthProvider } from "@pankod/refine-core";

const authProvider: AuthProvider = {
    ...
    checkAuth: () => {
        const user = localStorage.getItem("auth");

        if (user) {
            return Promise.resolve();
        }

        return Promise.reject();
    },
    ...
};
```

<br />

Invoking the `useAuthenticated` hook will call the `checkAuth` method. If `checkAuth` method resolves a data, it will be available in the `useAuthenticated` hook's `data` property.

[Refer to the `useAuthenticated` documentation for more information &#8594](/docs/api-reference/core/hooks/auth/useAuthenticated/)

```tsx
import { useAuthenticated } from "@pankod/refine-core";

const { data, isSuccess, isLoading, isError, refetch } = useAuthenticated();
```

<br />

<details>
  <summary><strong>How can I redirect the user if the user is not authenticated?</strong></summary>

By default, the user will be redirected to the `/login` route if the `checkAuth` method rejects the Promise. If you want to redirect the user to a specific page, you can reject the Promise with the path of the page.

```ts
const authProvider: AuthProvider = {
    ...
    checkAuth: () => {
        ...
        return Promise.reject("/custom-page");
    }
}
```

</details>

### checkError

`checkError` method is called when you get an error response from the API. If the error is related to authentication, you can create your own business logic to handle the error such as refreshing the token.

`checkError` method expects to return a Promise.

-   If the Promise resolves, the error is not related to authentication and the user will be continued to use the application.

-   If the Promise rejects, the error is related to authentication and the [`logout`](#logout) method will be called.

We'll check if the error is related to authentication and reject the Promise.

```tsx title="src/authProvider.ts"
import { AuthProvider } from "@pankod/refine-core";

const authProvider: AuthProvider = {
    ...
    checkError: (error) => {
        if (error.status === 401 || error.status === 403) {
            return Promise.reject();
        }

        return Promise.resolve();
    },
    ...
};
```

<br />

Invoking the `useCheckError` hook's mutation will call the `checkError` method, passing in the mutation's parameters as arguments.

[Refer to the `useCheckError` documentation for more information &#8594](/docs/api-reference/core/hooks/auth/useCheckError/)

For example, if you want to check the error of a fetch request, you can use the `useCheckError` hook's mutation like this:

```tsx
import { useCheckError } from "@pankod/refine-core";

const { mutate } = useCheckError();

fetch("http://example.com/payment")
    .then(() => console.log("Success"))
    .catch((error) => checkError(error));
```

<br />

<details>
  <summary><strong>How can I redirect the user if the user is not authenticated?</strong></summary>

By default, the user will be redirected to the `/login` route if the `checkError` method rejects the Promise. If you want to redirect the user to a specific page, you can reject the Promise with the path of the page.

```ts
const authProvider: AuthProvider = {
    ...
    checkError: (error) => {
        ...
        return Promise.reject("/custom-page");
    }
}
```

</details>

### getPermissions

`getPermissions` method is used to get the user's permissions. It expects to return a Promise.

-   If the Promise resolves, the user's permissions will be available in the `usePermissions` hook's `data` property.

-   If the Promise rejects, the user's permissions will not be available and `usePermissions` hook throw an error.

We'll get the user's permissions from the local storage and resolve the Promise.

```tsx title="src/authProvider.ts"
import { AuthProvider } from "@pankod/refine-core";

const mockUsers = [
    { email: "john@mail.com", roles: ["admin"] },
    { email: "jane@mail.com", roles: ["editor"] },
];

const authProvider: AuthProvider = {
    ...
    getPermissions: () => {
        const user = localStorage.getItem("auth");

        if (user) {
            const { email } = JSON.parse(user);

            const { roles } = mockUsers.find((user) => user.email === email);

            return Promise.resolve(roles);
        }

        return Promise.reject();
    },
    ...
};
```

<br />

Invoking the `usePermissions` hook will call the `getPermissions` method. If `getPermissions` method resolves a data, it will be available in the `usePermissions` hook's `data` property.

[Refer to the `usePermissions` documentation for more information &#8594](/docs/api-reference/core/hooks/auth/usePermissions/)

For example, if you want to check if the user has a specific permission, you can use the `usePermissions` hook's `data` property like this:

```tsx
import { usePermissions } from "@pankod/refine-core";

const { data } = usePermissions();

if (data?.includes("admin")) {
    console.log("User has admin permission");
}
```
