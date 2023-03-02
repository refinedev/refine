---
id: useOnError
title: useOnError
siderbar_label: useOnError
description: useOnError data hook from refine is a modified version of react-query's useMutation for create mutations
source: /packages/core/src/hooks/auth/useOnError/index.ts
---

`useOnError` calls the `onError` method from the [`authProvider`](/api-reference/core/providers/auth-provider.md) under the hood.

It returns the result of `react-query`'s [useMutation](https://react-query.tanstack.com/reference/useMutation) which includes many properties, some of which being isSuccess and isError.

Data that is resolved from the `onError` will be returned as the `data` in the query result with the following type:

```ts
type OnErrorResponse = {
    redirectTo?: string;
    logout?: boolean;
    error?: Error;
};
```

-   `redirectTo`: If has a value, the app will be redirected to the given URL.
-   `logout`: If is `true`, `useOnError` calls the `logout` method.
-   `error`: An Error object representing any errors that may have occurred during the operation.

## Usage

Imagine that we make a payment request which is declined by the API. If the error status code is `418`, the user will be logged out for security reasons.

```tsx
import { useOnError } from "@pankod/refine-core";

// highlight-next-line
const { mutate: onError } = useOnError();

fetch("http://example.com/payment")
    .then(() => console.log("Success"))
    // highlight-next-line
    .catch((error) => onError(error));
```

> Any error passed to `mutate` function will be available in the `onError` in the `authProvider`.

<br />

We have a logic in [`authProvider`](/api-reference/core/providers/auth-provider.md)'s `onError` method like below.

```tsx
const authProvider: AuthProvider = {
    // ---
    logout: () => {
        // ---
        return {
            success: true,
            redirectTo: "/login",
        };
    },
    // highlight-start
    onError: (error) => {
        const status = error.status;
        if (status === 418) {
            return {
                logout: true,
                redirectTo: "/login",
                error: new Error(error),
            };
        }
        return {};
    },
    // highlight-end
    // ---
};
```

:::caution
This hook can only be used if the `authProvider` is provided.
:::
