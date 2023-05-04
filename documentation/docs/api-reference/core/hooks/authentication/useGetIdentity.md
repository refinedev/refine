---
id: useGetIdentity
title: useGetIdentity
siderbar_label: useGetIdentity
description: useGetIdentity data hook from refine is a modified version of react-query's useQuery for retrieving user data
source: /packages/core/src/hooks/auth/useGetIdentity/index.ts
---

:::caution
This hook can only be used if the `authProvider` is provided.
:::

`useGetIdentity` calls the `getIdentity` method from the [`authProvider`](/api-reference/core/providers/auth-provider.md) under the hood.

It returns the result of `react-query`'s `useQuery` which includes many properties, some of which being `isSuccess` and `isError`. Data that is resolved from the `getIdentity` will be returned as the `data` in the query result.

## Usage

`useGetIdentity` can be useful when you want to get user information anywhere in your code.

Let's say that you want to show the user's name.

We have a logic in [`authProvider`](/api-reference/core/providers/auth-provider.md)'s `getIdentity` method like below.

```tsx
import type { AuthBindings } from "@refinedev/core";

const authProvider: AuthBindings = {
    // ---
    // highlight-start
    getIdentity: async () => {
        return {
            id: 1,
            fullName: "Jane Doe",
        };
    },
    // highlight-end
    // ---
};
```

<br/>

You can access identity data like below.

```tsx
// highlight-next-line
import { useGetIdentity } from "@refinedev/core";

export const User: React.FC = () => {
    // highlight-next-line
    const { data: identity } = useGetIdentity<{
        id: number;
        fullName: string;
    }>();

    return <span>{identity?.fullName}</span>;
};
```
