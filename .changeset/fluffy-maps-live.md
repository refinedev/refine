---
"@refinedev/antd": minor
"@refinedev/chakra-ui": minor
"@refinedev/mantine": minor
"@refinedev/mui": minor
---

feat: updated Created, Show, Edit, Delete, Clone buttons to respect new global `accessControlProvider` configuration.

fix: Delete button's text wasn't rendered as `reason` field of `accessControlProvider`.

Given the following `can` method:

```ts
const accessControlProvider: IAccessControlContext = {
    can: async (): Promise<CanReturnType> => {
        return { can: false, reason: "Access Denied!" };
    },
};
```

If user is unauthorized, `Delete` button's text should be `Access Denied!` instead of default `Delete`.

This is the default behaviour for Create, Show, List, Edit buttons already.
