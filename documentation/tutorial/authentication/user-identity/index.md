---
title: Using User Identity
---

import { Sandpack, AddGetIdentityMethodToAuthProvider, CreateUserGreetingComponentFile, AddUserGreetingToAppTsx, AddUseGetIdentityToUserGreetingComponent } from "./sandpack.tsx";

<Sandpack>

In the previous steps, we've added login and logout functionalities and protected our content from unauthenticated users. Now, we'll be learning about the Refine's `useGetIdentity` hook to get the user's identity from our API and implement the `getIdentity` method in our auth provider.

We'll be implementing a simple component called `UserGreeting` to display a welcome message to the user.

## Implementing the `getIdentity` Method

The `getIdentity` method is used to get the user's identity from our API. It should return a `Promise` which resolves to an object. The object should contain the user's identity.

Our fake REST API requires us to send a `GET` request to `/auth/me` endpoint with the `token` in the `Authorization` header. It will return the user's identity in the response body.

Try to add the following lines to your `src/auth-provider.ts` file:

```ts title="src/auth-provider.ts"
// TODO: change this
import { AuthProvider } from "@refinedev/core";

export const authProvider: AuthProvider = {
  // highlight-start
  getIdentity: async () => {
    const response = await fetch("https://api.fake-rest.refine.dev/auth/me", {
      headers: {
        Authorization: localStorage.getItem("my_access_token"),
      },
    });

    if (response.status !== 200) {
      return null;
    }

    const data = await response.json();

    return data;
  },
  // highlight-end
  logout: async () => {
    /* ... */
  },
  login: async ({ email, password }) => {
    /* ... */
  },
  check: async () => {
    /* ... */
  },
  onError: async (error) => {
    /* ... */
  },
  // ...
};
```

<AddGetIdentityMethodToAuthProvider />

## Using the `useGetIdentity` Hook

After implementing the `getIdentity` method, we'll be able to call `useGetIdentity` hook and get the user's identity from our API. Let's create a component called `UserGreeting` and mount it inside our `<Refine />` component.

<CreateUserGreetingComponentFile />

Then, we'll mount our `<UserGreeting />` component and pass it to the `<Authenticated />` component as the `children` prop in our `src/App.tsx` file.

Try to add the following lines to your `src/App.tsx` file:

```tsx title="src/App.tsx"
import { Refine, Authenticated } from "@refinedev/core";

import { dataProvider } from "./data-provider";
import { authProvider } from "./auth-provider";

import { ShowProduct } from "./show-product";
import { EditProduct } from "./edit-product";
import { ListProducts } from "./list-products";
import { CreateProduct } from "./create-product";

import { Login } from "./login";
import { Logout } from "./logout";
// highlight-next-line
import { UserGreeting } from "./user-greeting";

export default function App(): JSX.Element {
  return (
    <Refine dataProvider={dataProvider} authProvider={authProvider}>
      <Authenticated key="protected" fallback={<Login />}>
        {/* highlight-next-line */}
        <UserGreeting />
        <Logout />
        {/* <ShowProduct /> */}
        {/* <EditProduct /> */}
        <ListProducts />
        {/* <CreateProduct /> */}
      </Authenticated>
    </Refine>
  );
}
```

<AddUserGreetingToAppTsx />

Finally, we'll import `useGetIdentity` hook and use it inside our `UserGreeting` component to get the user's identity from our API.

Try to add the following lines to your `src/user-greeting.tsx` file:

```tsx title="src/user-greeting.tsx"
import React from "react";
// highlight-next-line
import { useGetIdentity } from "@refinedev/core";

export const UserGreeting = () => {
  // highlight-next-line
  const { data } = useGetIdentity();

  return (
    <div>
      {/* highlight-start */}
      <h2>{`Welcome, ${data?.name ?? "user"}!`}</h2>
      {/* highlight-end */}
    </div>
  );
};
```

<AddUseGetIdentityToUserGreetingComponent />

Now when we login, we should be able to see a welcome message with the user's name on our screen.

:::simple Note

Our fake REST API returns "John Doe" as the user's name, regardless of the token we send. This is just for demonstration purposes.

:::

Now we've set up with the basic authentication flow, in the next step, we'll be learning about how to integrate it with our data provider.

</Sandpack>
