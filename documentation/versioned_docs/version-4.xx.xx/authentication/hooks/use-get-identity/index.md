---
title: useGetIdentity
description: useGetIdentity data hook from Refine is a modified version of react-query's useQuery for retrieving user data
source: /packages/core/src/hooks/auth/useGetIdentity/index.ts
---

`useGetIdentity` calls the `getIdentity` method from the [`authProvider`](/docs/authentication/auth-provider) under the hood.

It returns the result of `react-query`'s `useQuery` which includes many properties, some of which being `isSuccess` and `isError`.

Data that is resolved from the `getIdentity` will be returned as the `data` in the query result.

## Usage

`useGetIdentity` can be useful when you want to get user information anywhere in your code.

Let's say that you want to show the user's name.

We have a logic in [`authProvider`](/docs/authentication/auth-provider)'s `getIdentity` method like below:

```tsx
import type { AuthProvider } from "@refinedev/core";

const authProvider: AuthProvider = {
  // ...
  // highlight-start
  getIdentity: async () => {
    return {
      id: 1,
      fullName: "Jane Doe",
    };
  },
  // highlight-end
};
```

You can access identity data like below:

```tsx
// highlight-next-line
import { useGetIdentity } from "@refinedev/core";

export const User = () => {
  // highlight-next-line
  const { data: identity } = useGetIdentity<IIdentity>();

  return <span>{identity?.fullName}</span>;
};

type IIdentity = {
  id: number;
  fullName: string;
};
```
