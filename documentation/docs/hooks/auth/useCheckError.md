---
id: useCheckError
title: useCheckError
siderbar_label: useCheckError
description: useCheckError data hook from refine is a modified version of react-query's useMutation for create mutations
---

`useCheckError`  calls `checkError` method from [`authProvider`](/docs/guides-and-concepts/providers/auth-provider) under the hood.
 If `checkError` returns a rejected promise, `useCheckError` calls the `logout` method of `authProvider` and the app is unauthenticated.


It returns the result of react-query's [useMutation](https://react-query.tanstack.com/reference/useMutation). 
Data that is resolved from `checkError` will be returned as the `data` in the query result.
## Usage

Imagine we make a payment request which is declined from API. If error status code is `418`, user needs to be logged out for security reasons.

```tsx
import { useCheckError } from "@pankod/refine";

// inside a component
const { mutate: checkError } = useCheckError();

fetch('http://example.com/payment', { options })
    .then(() => console.log("Success"))
    // highlight-next-line
    .catch((error) => checkError(error));
```

> Any error passed to `mutate` function will be available in the `checkError` in the `authProvider`.

<br />

We have a logic in [`authProvider`](/docs/guides-and-concepts/providers/auth-provider)'s `checkError` method like below.

```tsx
const authProvider: AuthProvider = {
    ...
    logout: () => {
        ...
        return Promise.resolve();
    },
    // highlight-start
    checkError: (error) => {
        const status = error.status;
        if (status === 418) {
            return Promise.reject();
        }
        return Promise.resolve();
    },
    // highlight-end
   ...
};
```

<br/>

## Redirection after error

We have 2 options to manage redirection after logout process.

- If promise returned from `checkError` is rejected with nothing, app will be redirected to `/login` route by default. 

- The promise returned from `checkError` method of [`authProvider`](/docs/guides-and-concepts/providers/auth-provider) can reject with a custom url.

```tsx
const authProvider: AuthProvider = {
    ...
    checkError: () => {
        ...
        return Promise.reject("/custom-url");
    }
}
```
<br/>

:::caution
This hook can only be used if `authProvider` is provided.
:::
