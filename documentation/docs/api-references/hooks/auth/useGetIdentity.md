---
id: useGetIdentity
title: useGetIdentity
siderbar_label: useGetIdentity
description: useGetIdentity data hook from refine is a modified version of react-query's useQuery for retrieving user data
---

`useGetIdentity` calls `getUserIdentity` method from [`authProvider`](/docs/api-references/providers/auth-provider) under the hood. It returns the result of react-query's useQuery which includes properties like `isSuccess` and `isError` with many others.  
Data that is resolved from `getUserIdentity` will be returned as the `data` in the query result.

## Usage

It can be useful when you want to get user information anywhere in your code.


Imagine you want to show user name.

We have a logic in [`authProvider`](/docs/api-references/providers/auth-provider)'s `getUserIdentity` method like below.

```tsx
const authProvider: AuthProvider = {
  ...
    // highlight-start
    getUserIdentity: () =>
            Promise.resolve({
                id: 1,
                fullName: "Jane Doe",
            }),
    // highlight-end
  ...
};
```
<br/>


You can access identity data like below.

```tsx
// highlight-next-line
import { useGetIdentity } from "@pankod/refine";

export const User: React.FC = () => {
    // highlight-next-line
    const { data: identity } = useGetIdentity<{ id: string; fullName: string}>();

    return <span>{identity?.fullName}</span>
}
```

:::caution
This hook can only be used if `authProvider` is provided.
:::
