---
title: Auth Pages
---

import { Sandpack, RefactorLoginComponentToAuthPage } from "./sandpack.tsx";

<Sandpack>

In the previous steps, we've added the `<Login />` component and used the `useLogin` hook to login our users. Now, we'll be refactoring our `<Login />` component to use an `<AuthPage />` component.

Refine offers `<AuthPage />` components that can be used to create login, register, forgot password and reset password pages. These components are built on top of the `useLogin`, `useRegister`, `useForgotPassword`, `useResetPassword` and `useChangePassword` hooks.

To learn more about the `<AuthPage />` components, please refer to the [Auth Pages](/docs/guides-concepts/authentication/#authpage-) section of the Authentication guide.

## Refactoring the `<Login />` Component

We'll remove all the elements and logic in our `<Login />` component and replace it with the `<AuthPage />` component.

`<AuthPage />` will be passed a `type` prop to determine which operation it will be performing. We'll be passing `login` as the `type` prop to our `<AuthPage />` component.

Try to add the following lines to your `src/login.tsx` file:

```tsx title="src/login.tsx"
import React from "react";
// highlight-next-line
import { AuthPage } from "@refinedev/core";

export const Login = () => {
  // highlight-next-line
  return <AuthPage type="login" />;
};
```

<RefactorLoginComponentToAuthPage />

Notice that `<AuthPage />` comes with some additional elements, these elements will become useful when rest of the authentication operations are implemented. They can be removed or modified using props.

## Summary

Now we have our authentication integrated with Refine, additional methods can be implemented in the same way and used with the respective hooks of Refine.

All of the built-in data providers of Refine have the ability to customize the client/fetcher instance. They can be used to handle authentication in the same way as we did in this tutorial without requiring a custom data provider.

In the next units, we'll start learning about the routing in Refine and how to integrate routing solutions such as React Router and Next.js.

Current way of handling authentication will be refactored but the concepts will remain the same.

</Sandpack>
