---
id: audit-log-provider
title: Audit Log Provider
---

## Overview

**refine** provides Audit Log support via `auditLogProvider`. A new log record is automatically created when a new record is created, updated and deleted. You can access these records from anywhere via hooks. You can also manually create or update an audit-log via hooks.

Complete all this by writing an `audit-log-provider` to **refine**. This provider must include following methods:

```ts
const auditLogProvider = {
    create: (params: {
        resource: string;
        action: string;
        data?: any;
        author?: {
            name?: string;
            [key: string]: any;
        };
        previousData?: any;
        meta: Record<number | string, any>;
    }) => void;
    get: (params: {
        resource: string;
        action?: string;
        meta?: Record<number | string, any>;
        author?: Record<number | string, any>;
        metaData?: MetaDataQuery;
    }) => Promise<any>;
    update: (params: {
        id: BaseKey;
        name: string;
    }) => Promise<any>;
}
```

:::note
**refine** uses these methods in [`useLog`](/core/hooks/audit-log/useLog.md) and [`useLogList`](/core/hooks/audit-log/useLogList.md).
:::

## Usage

You must pass a audit log provider to the `auditLogProvider` prop of `<Refine>`.

```tsx title="App.tsx"
import { Refine } from "@pankod/refine-core";

import auditLogProvider from "./auditLogProvider";

const App: React.FC = () => {
    return <Refine auditLogProvider={auditLogProvider} />;
};
```

## Creating a audit log provider

Now let's prepare an example audit log provider using the `https://api.fake-rest.refine.dev/logs` end-point.

### `get`

This method is used to get audit logs. Expects audit logs to be returned with the given parameters. Here we return activities using `resource` and `meta` data.

```ts title="auditLogProvider.ts"
const auditLogProvider: AuditLogProvider = {
    get: async ({ resource, meta }) => {
        const { data } = await dataProvider(API_URL).getList({
            resource: "logs",
            filters: [
                {
                    field: "resource",
                    operator: "eq",
                    value: resource,
                },
                {
                    field: "meta.id",
                    operator: "eq",
                    value: meta?.id,
                },
            ],
        });

        return data;
    },
};
```

#### Parameter Types

| Name     | Type                  |
| -------- | --------------------- |
| resource | `string`              |
| action   | `string`              |
| meta     | `Record<string, any>` |
| author   | `Record<string, any>` |


### `create`

This method is triggered when a new log is created. The incoming parameters contain the data we need and we need to return a Promise.

:::important
We recommend that you create audit logs server-side. So when the user performs an action (create, createMany, update, updateMany, delete and deleteMany), we recommend that you do it on the API side.
:::

```ts title="auditLogProvider.ts"
const auditLogProvider: AuditLogProvider = {
    create: (params) => {
        return dataProvider(API_URL).create({
            resource: "logs",
            variables: params,
        });
    },
};
```

When we test, we will see that an object like the one below is created in the `logs` resource.

```json
[
  {
    "action": "create",
    "resource": "posts",
    "data": {
      "title": "Test",
      "category": {
        "id": 1
      },
      "status": "published",
      "content": "Test Content"
    },
    "meta": {
      "id": 1001
    },
    "timestamp": "2022-06-22T10:04:47.157Z",
    "id": 1
  }
]
```

:::important
The `id` of the record created in the `meta` object is added. It is used for filtering purposes.
:::

#### Parameter Types

| Name     | Type                  |
| -------- | --------------------- |
| resource | `string`              |
| action   | `string`              |
| meta     | `Record<string, any>` |
| data     | `Record<string, any>` |
| author   | `Record<string, any>` |

:::important
The `author` object is the value returned from the [`getUserIdentity`](/core/providers/auth-provider.md) method in the `authProvider`.
:::

<br/>

**refine** will use this create method in the [`useLog`](/core/hooks/audit-log/useLog.md) hook.

> [Refer to the useLog documentation for more information. &#8594](/core/hooks/audit-log/useLog.md)

### `update`

This method is used to update the `name` data in the audit logs. `id` and `name` parameters come and Promise waits for you to resolve.

```ts title="auditLogProvider.ts"
const auditLogProvider: AuditLogProvider = {
    update: async ({ id, name }) => {
        const { data } = await dataProvider(API_URL).update({
            resource: "logs",
            id,
            variables: { name },
        });
        return data;
    },
};
```

#### Parameter Types

| Name   | Type      |
| ------ | --------- |
| `id`   | `BaseKey` |
| `name` | `string`  |

<br />

**refine** will use this update method in the [`useLog`](/core/hooks/audit-log/useLog.md) hook.

> [Refer to the useLog documentation for more information. &#8594](/core/hooks/audit-log/useLog.md)


## Supported Hooks

Supported hooks subscribe in the following way:

:::important
It only **works** on `useCreate`, `useUpdate` and `useDelete` hooks. 

`useCreateMany` **does not support** `useUpdateMany` and `useDeleteMany` hooks.
:::

### useCreate

When `useCreate` is called, `refine` sends the following parameters to auditLogProvider's `create` method.

```ts
const { mutate } = useCreate();
mutate({
    resource: "posts",
    values: {
        title: "New Post",
        status: "published",
        content: "New Post Content",
    },
    metaData: {
        foo: "bar",
    },
});
```

```json
{
    "action": "create",
    "resource": "posts",
    "data": {
        "title": "Title",
        "status": "published",
        "content": "New Post Content"
    },
    "meta": {
        "id": 1,
        "foo": "bar"
    }
}
```

:::tip
`metaData` is included in `meta`.
:::

### useUpdate

When `useUpdate` is called, `refine` sends the following parameters to auditLogProvider's `create` method.

```ts
const { mutate } = useUpdate();
mutate({
    id: 1,
    resource: "posts",
    values: {
        title: "Updated New Title",
    },
});
```

```json
{
    "action": "update",
    "resource": "posts",
    "data": {
        "title": "Updated New Title",
        "status": "published",
        "content": "New Post Content"
    },
    "previousData": {
        "title": "Title",
        "status": "published",
        "content": "New Post Content"
    },
    "meta": {
        "id": 1
    }
}
```

### useDelete

When `useDelete` is called, `refine` sends the following parameters to auditLogProvider's `create` method.

```ts
const { mutate } = useDelete();
mutate({
    id: 1,
    resource: "posts",
});
```

```json
{
    "action": "delete",
    "resource": "posts",
    "meta": {
        "id": 1
    }
}
```
<br/>

## Manage

The `options` section is used to determine in which actions the resources will work. **If no definition is made, it works in all actions**.

In this case, only the `create` logs will be active.

```ts title="App.tsx"
<Refein
    dataProvider={dataProvider(API_URL)}
    resources={[
        {
            name: "posts",
            list: PostList,
            create: PostCreate,
            edit: PostEdit,
            show: PostShow,
            canDelete: true,
            // highlight-start
            options: {
                auditLog: {
                    permissions: ["create"],
                },
            },
            // highlight-end
        },
    ]}
/>
```


