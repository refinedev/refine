---
title: Audit Logs
---

Audit logs are useful tool for web applications, providing a reliable record of user actions and system changes. Capturing and storing these logs ensures transparency and accountability which can be crucial for **security**, **compliance**, and debugging purposes.

## Audit Log Provider

**Refine** offers **Audit Log Provider** to centralize capturing audit logs easily across your application.

CRUD operations are automatically logged when **Audit Log Provider** is provided, along with the current user information coming from `useGetIdentity` hook.

**Audit Log Provider** is an object that contains `get`, `create` and `update` methods.

```tsx title="audit-log-provider.ts"
import { AuditLogProvider } from "@refinedev/core";

export const auditLogProvider: AuditLogProvider = {
  create: async (params) => {
    const { resource, meta, action, author, data, previousData } = params;

    console.log(resource); // "produts", "posts", etc.
    console.log(meta); // { id: "1" }, { id: "2" }, etc.
    console.log(action); // "create", "update", "delete"
    // author object is `useGetIdentity` hook's return value.
    console.log(author); // { id: "1", name: "John Doe" }
    console.log(data); // { name: "Product 1", price: 100 }
    console.log(previousData); // {name: "Product 1", price: 50}

    fetch("https://example.com/api/audit-logs", {
      method: "POST",
      body: JSON.stringify(params),
    });

    return { success: true };
  },
  get: async (params) => {
    const { resource, meta, action, author, metaData } = params;

    const response = await fetch(`https://example.com/api/audit-logs/${resource}/${meta.id}`, {
      method: "GET",
    });

    const data = await response.json();

    return data;
  },
};
```

### Hook Integrations

**Refine**'s mutation hooks such as `useCreate`, `useCreateMany`, `useUpdate`, `useUpdateMany`, `useDelete`, `useDeleteMany` are already integrated with **Audit Log Provider**.

See the [Supported Hooks](/docs/api-reference/core/providers/audit-log-provider#supported-hooks) section for more information.
