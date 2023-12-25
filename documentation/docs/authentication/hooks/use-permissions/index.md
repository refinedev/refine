---
title: usePermissions
description: usePermissions data hook from Refine is a modified version of react-query's useQuery for retrieving user data
source: /packages/core/src/hooks/auth/usePermissions/index.ts
---

`usePermissions` calls the `getPermissions` method from the [`authProvider`](/docs/authentication/auth-provider) under the hood.

It returns the result of `react-query`'s `useQuery` which includes many properties, some of which being `isSuccess` and `isError`.

Data that is resolved from the `getPermissions` will be returned as the `data` in the query result.

## Usage

`usePermissions` can be useful when you want to get user's permission's anywhere in your code.

For example, if you want only the users with the admin role to see the create button in a list page, we have a logic in [`authProvider`](/docs/authentication/auth-provider)'s `getPermissions` method like below:

```tsx
import type { AuthBindings } from "@refinedev/core";

const authProvider: AuthBindings = {
  // ...
  // highlight-start
  getPermissions: async () => {
    return ["admin"];
  },
  // highlight-end
  // ...
};
```

Get permissions data in the list page with `usePermissions` and check if the user has `"admin`" role:

```tsx title="pages/post/list"
// highlight-next-line
import { usePermissions } from "@refinedev/core";
import { List } from "@refinedev/antd";

export const PostList: React.FC = () => {
  // highlight-next-line
  const { data: permissionsData } = usePermissions();

  return <List canCreate={permissionsData?.includes("admin")}>...</List>;
};
```

To learn more about the `List` component and CRUD views, refer to the [UI Libraries](/docs/guides-concepts/ui-libraries/#views) guide.
