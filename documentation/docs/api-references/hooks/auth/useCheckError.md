---
id: useCheckError
title: useCheckError
siderbar_label: useCheckError
description: useCheckError data hook from refine is a modified version of react-query's useMutation for create mutations
---

`useCheckError` calls the `checkError` method from the [`authProvider`](/docs/api-references/providers/auth-provider) under the hood.
If the `checkError` returns a rejected promise, `useCheckError` calls the the `logout` method of the `authProvider` and the app is unauthenticated.

It returns the result of `react-query`'s [useMutation](https://react-query.tanstack.com/reference/useMutation). 
Data that is resolved from the `checkError` will be returned as the `data` in the query result.
## Usage

Imagine that we make a payment request which is declined by the API. If error status code is `418`, user will be logged out for security reasons.

```tsx twoslash {2,6}
import { useCheckError } from "@pankod/refine";

const { mutate: checkError } = useCheckError();

fetch('http://example.com/payment')
    .then(() => console.log("Success"))
    .catch((error) => checkError(error));
```

> Any error passed to `mutate` function will be available in the `checkError` in the `authProvider`.

<br />

We have a logic in [`authProvider`](/docs/api-references/providers/auth-provider)'s `checkError` method like below.

```tsx {6-12}
const authProvider: AuthProvider = {
    ...
    logout: () => {
        ...
        return Promise.resolve();
    },
    checkError: (error) => {
        const status = error.status;
        if (status === 418) {
            return Promise.reject();
        }
        return Promise.resolve();
    },
   ...
};
```

<br/>

## Redirection after error

We have 2 options to manage redirection after logout process.

- If promise returned from `checkError` is rejected with nothing, app will be redirected to `/login` route by default. 

- The promise returned from `checkError` method of [`authProvider`](/docs/api-references/providers/auth-provider) can reject with a custom url instead.

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
This hook can only be used if the `authProvider` is provided.
:::
