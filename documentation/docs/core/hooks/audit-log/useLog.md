---
id: useLog
title: useLog
---

If you need to send a create audit log **refine** provides the `useLog` hook for it, It returns the `create` or `update` method from [`auditLogProvider`](/core/providers/audit-log-provider.md#create) under the hood.

## Usage

:::caution
This hook can only be used if `auditLogProvider`'s `create` method is provided.
:::

```tsx
import { useLog } from "@pankod/refine-core";

const { log } = useLog();

log({
    resource: "posts",
    action: "create",
    author: {
        username: "admin",
    },
    data: {
        id: 1,
        title: "New post",
    },
    meta: {
        id: 1,
    },
});
```

If you need to update the audit-log, you can use the `useLog` hook `rename` method. It returns the `update` method from [`auditLogProvider`](/core/providers/audit-log-provider.md#update) under the hood.

```tsx
import { useLog } from "@pankod/refine-core";

const { rename } = useLog();
const { mutate } = rename;

mutate({
    id: 1,
    name: "Updated Name",
});
```


:::info
You can get audit logs with [`useLogList`](/core/hooks/audit-log/useLogList.md).
:::
