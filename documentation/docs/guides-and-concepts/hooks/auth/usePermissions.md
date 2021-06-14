---
id: usePermissions
title: usePermissions
siderbar_label: usePermissions
description: usePermissions data hook from refine is a modified version of react-query's useQuery for retrieving user data
---

`usePermissions` calls `getPermissions` method from [`authProvider`](/docs/guides-and-concepts/providers/auth-provider) under the hood. It returns the result of react-query's useQuery which includes properties like `isSuccess` and `isError` with many others.  
Data that is resolved from `getPermissions` will be returned as the `data` in the query result.

## Usage

It can be useful when you want to get user permission information anywhere in your code.

Imagine you want to allow only users with admin role to see the create button in a list page.

- We have a logic in [`authProvider`](/docs/guides-and-concepts/providers/auth-provider)'s `getPermissions` method like below.

```tsx
const authProvider: AuthProvider = {
  ...
    // highlight-start
    getPermissions: () => {
        return Promise.resolve(["admin"]);
    },
    // highlight-end
  ...
};
```
<br/>

- Get permissions data in the list page with `usePermissions` and check if the user has `"admin`" role.

```tsx title="pages/post/list"
// highlight-next-line
import { List, usePermissions } from "@pankod/refine";

export const PostList: React.FC = () => {
    // highlight-next-line
    const { data: permissionsData } = usePermissions();

    return <List canCreate={permissionsData?.includes("admin")}>...</List>;
};
```


> [Refer to `<List>` documentation for detailed usage. &#8594](guides-and-concepts/basic-views/list.md)


:::caution
This hook can only be used if `authProvider` is provided.
:::
