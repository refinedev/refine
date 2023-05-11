---
id: useOnError
title: useOnError
siderbar_label: useOnError
description: useOnError data hook from refine is a modified version of react-query's useMutation for create mutations
source: /packages/core/src/hooks/auth/useOnError/index.ts
---

:::caution
This hook can only be used if the [`authProvider`][auth-provider] is provided.
:::

`useOnError` calls the [`onError`][on-error] method from the [`authProvider`][auth-provider] under the hood.

It returns the result of `react-query`'s [useMutation](https://tanstack.com/query/v4/docs/react/reference/useMutation), which includes many properties like `isSuccess` and `isError`.

Data that is resolved from the [`onError`][on-error] will be returned as the `data` in the query result with the following type:

```ts
type OnErrorResponse = {
    redirectTo?: string;
    logout?: boolean;
    error?: Error;
};
```

According to the `onError` method's returned values, the following process will be executed:

-   `redirectTo`: If has a value, the app will be redirected to the given URL.
-   `logout`: If is `true`, `useOnError` calls the `logout` method.
-   `error`: An Error object representing any errors that may have occurred during the operation.

## Internal Usage

**refine** uses `useOnError` internally in the data hooks to handle errors in a unified way.

[Refer to Data Provider documentation for more information about data hooks. → ](/docs/api-reference/core/providers/data-provider/#supported-hooks)

When an error is thrown by any data hook, the `useOnError` function is triggered with the error object. Afterward, the error object is passed to the [`onError`][on-error] method of the [`authProvider`][auth-provider], which can be utilized to redirect the user or to log them out.

```tsx
import type { AuthBindings } from "@refinedev/core";

const authProvider: AuthBindings = {
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

## Usage

Imagine that we make a payment request which is declined by the API. If the error status code is `418`, the user will be logged out for security reasons.

```tsx
import { useOnError } from "@refinedev/core";

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
import type { AuthBindings } from "@refinedev/core";

const authProvider: AuthBindings = {
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

[on-error]: /docs/api-reference/core/providers/auth-provider/#onerror-
[auth-provider]: /docs/api-reference/core/providers/auth-provider/
