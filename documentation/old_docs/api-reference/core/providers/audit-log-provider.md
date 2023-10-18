---
id: audit-log-provider
title: Audit Log Provider
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Overview

**refine** allows you to track changes and who made them in your data by sending a new log event record whenever a new record is created, updated or deleted. Mutations made with data hooks are automatically sent to the `auditLogProvider` as an event. You can also manually send events to the `auditLogProvider` via hooks.

To use `auditLogProvider`, you just need to pass it to `<Refine>`:

```tsx title="App.tsx"
import { Refine } from "@refinedev/core";

import auditLogProvider from "./auditLogProvider";

const App: React.FC = () => {
    return <Refine auditLogProvider={auditLogProvider} />;
};
```

An `auditLogProvider` must have the following methods:

-   `create`: Logs an event to the audit log.
-   `get`: Returns a list of events.
-   `update`: Updates an event in the audit log.

Below are the corresponding interfaces for each of these methods:

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
        meta?: Record<string, any>;
    }) => void;
    get: (params: {
        resource: string;
        action?: string;
        meta?: Record<string, any>;
        author?: Record<string, any>;
        metaData?: MetaDataQuery;
    }) => Promise<any>;
    update: (params: {
        id: BaseKey;
        name: string;
    }) => Promise<any>;
}
```

:::note
**refine** provides the `useLog` and `useLogList` hooks that can be used to access your `auditLogProvider` methods from anywhere in your application.
:::

## Creating an Audit Log Provider

Let's create an `auditLogProvider` to understand how it works better. Though we will be using `dataProvider` to handle events, you can do it however you want thanks to **refine** providing an agnostic API.

### `get`

This method is used to get a list of audit log events.

For example, using the `useLogList` hook to list all resource activities by a specific record id creates an event like this:

```json
{
    "resource": "posts",
    "meta": {
        "id": "1"
    }
}
```

:::info
The event is created with parameters that were passed to the `useLogList` hook.
:::

Now let's see how we can handle these events in our audit log provider.

```ts title="auditLogProvider.ts"
import refineSimpleRestDataProvider from "@refinedev/simple-rest";

const API_URL = "https://api.fake-rest.refine.dev";

const dataProvider = refineSimpleRestDataProvider(API_URL);

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

This method can take the following parameters via hooks. You can use these parameters to filter the events.

| Name     | Type                                                                                                     |
| -------- | -------------------------------------------------------------------------------------------------------- |
| resource | `string`                                                                                                 |
| action   | `"create"` \| `"update"` \| `"delete"` \| `"createMany"` \| `"updateMany"` \| `"deleteMany"` \| `string` |
| meta     | `Record<string, any>`                                                                                    |
| author   | `Record<string, any>`                                                                                    |

### `create`

This method is used to create an audit log event. It is triggered when a new successful mutation is made or when you use `useLog`'s `log` method. The incoming parameters show the values of the new record to be created.

:::caution
We recommend you create audit logs on the API side for security concerns since the data can be changed on the client side.
:::

When the mutations is successful, the `create` method is called with the following parameters, depending on the mutation type:

<Tabs
defaultValue="create"
values={[
{label: 'Create Event', value: 'create'},
{label: 'Update Event', value: 'update'},
{label: 'Delete Event', value: 'delete'},
{label: 'Create Many Event', value: 'createMany'},
{label: 'Update Many Event', value: 'updateMany'},
{label: 'Delete Many Event', value: 'deleteMany'}
]}>
<TabItem value="create">

When a record is created, refine automatically sends an event to `create` method like this:

```json
{
    "action": "create",
    "resource": "posts",
    "data": {
        "title": "Hello World",
        "content": "Hello World"
    },
    "meta": {
        "dataProviderName": "simple-rest",
        // If request response has a `id` field, it will be add in the `meta` field.
        "id": 1
    }
}
```

:::info
The `id` of the created record is added to the `meta` object and can be used for filtering purposes.
:::

</TabItem>
<TabItem value="update">

When a record is updated, refine automatically sends an event to `create` method like this:

```json
{
    "action": "update",
    "resource": "posts",
    "data": {
        "title": "New Hello World",
        "content": "New Hello World"
    },
    "previousData": {
        "title": "Hello World",
        "content": "Hello World"
    },
    "meta": {
        "dataProviderName": "simple-rest",
        "id": 1
    }
}
```

:::info
**refine** returns the `previousData` from the react-query cache but it can't find it, it will return `undefined`.
:::

</TabItem>
<TabItem value="delete">

When a record is deleted, refine automatically sends an event to `create` method like this:

```json
{
    "action": "delete",
    "resource": "posts",
    "meta": {
        "dataProviderName": "simple-rest",
        "id": 1
    }
}
```

</TabItem>
<TabItem value="createMany">

When a record is created with the `useCreateMany` hook, refine automatically sends an event to the `create` method like this:

```json
{
    "action": "createMany",
    "resource": "posts",
    "data": [
        {
            "title": "Hello World 1"
        },
        {
            "title": "Hello World 2"
        }
    ],
    "meta": {
        "dataProviderName": "simple-rest",
        // If request response has a `id` field, it will be add in the `meta` field.
        "ids": [1, 2]
    }
}
```

:::info
The `id` of the created record is added to the `meta` object and can be used for filtering purposes.
:::

</TabItem>
<TabItem value="updateMany">

When a record is updated with the `useUpdateMany` hook, refine automatically sends an event to the `create` method like this:

```json
{
    "action": "updateMany",
    "resource": "posts",
    "data": {
        "status": "published"
    },
    "previousData": [
        {
            "status": "draft"
        },
        {
            "status": "archived"
        }
    ],
    "meta": {
        "dataProviderName": "simple-rest",
        "ids": [1, 2]
    }
}
```

:::info
**refine** returns the `previousData` from the react-query cache but if it can't find it, it will return `undefined`.
:::

</TabItem>
<TabItem value="deleteMany">

When a record is deleted with the `useDeleteMany` hook, refine automatically sends an event to the `create` method like this:

```json
{
    "action": "deleteMany",
    "resource": "posts",
    "meta": {
        "dataProviderName": "simple-rest",
        "id": [1, 2]
    }
}
```

</TabItem>
</Tabs>

:::tip
If [`getUserIdentity`](/api-reference/core/providers/auth-provider.md) is defined in your auth provider, the `author` object will be added to the event with the value returned by `getUserIdentity`.

:::

<br />

And here is how we can handle these events in our audit log provider:

```ts title="auditLogProvider.ts"
import refineSimpleRestDataProvider from "@refinedev/simple-rest";

const API_URL = "https://api.fake-rest.refine.dev";

const dataProvider = refineSimpleRestDataProvider(API_URL);

const auditLogProvider: AuditLogProvider = {
    create: (params) => {
        return dataProvider(API_URL).create({
            resource: "logs",
            variables: params,
        });
    },
};
```

#### Parameter Types

This method can take the following parameters.

| Name     | Type                                                                                                     |
| -------- | -------------------------------------------------------------------------------------------------------- |
| resource | `string`                                                                                                 |
| action   | `"create"` \| `"update"` \| `"delete"` \| `"createMany"` \| `"updateMany"` \| `"deleteMany"` \| `string` |
| meta     | `Record<string, any>`                                                                                    |
| data     | `Record<string, any>`                                                                                    |
| author   | `Record<string, any>`                                                                                    |

<br/>

:::info
For more information, refer to the [`useLog` documentation&#8594](/api-reference/core/hooks/audit-log/useLog.md)

:::

### `update`

This method is used to update an audit log event.

For example, using `useLog`'s `log` method creates an event like below:

```json
{
    "id": "1",
    "name": "event name"
}
```

```ts title="auditLogProvider.ts"
import refineSimpleRestDataProvider from "@refinedev/simple-rest";

const API_URL = "https://api.fake-rest.refine.dev";

const dataProvider = refineSimpleRestDataProvider(API_URL);

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

:::info
For more information, refer to the [`useLog` documentation&#8594](/api-reference/core/hooks/audit-log/useLog.md)
:::

#### Parameter Types

This method can take the following parameters.

| Name | Type      |
| ---- | --------- |
| id   | `BaseKey` |
| name | `string`  |

<br />

:::tip
You can use this hook to name an event and create a milestone.
:::

## Supported Hooks

**refine** will send specific parameters to the audit log provider's `create` method when a mutation is successful.

Here are the parameters each hook send to `create`:

### `useCreate`

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

```json title="Create event"
{
    "action": "create",
    "resource": "posts",
    "data": {
        "title": "Title",
        "status": "published",
        "content": "New Post Content"
    },
    "meta": {
        "id": "1",
        // `metaData` is included in `meta`.
        "foo": "bar"
    }
}
```

### `useCreateMany`

```ts
const { mutate } = useCreateMany();

mutate({
    resource: "posts",
    values: [
        {
            title: "Title1",
            status: "published",
            content: "New Post Content1",
        },
        {
            title: "Title2",
            status: "published",
            content: "New Post Content2",
        },
    ],
    metaData: {
        foo: "bar",
    },
});
```

```json title="CreateMany event"
{
    "action": "createMany",
    "resource": "posts",
    "data": [
        {
            "title": "Title1",
            "status": "published",
            "content": "New Post Content1"
        },
        {
            "title": "Title2",
            "status": "published",
            "content": "New Post Content2"
        }
    ],
    "meta": {
        "ids": [1, 2],
        // `metaData` is included in `meta`.
        "foo": "bar"
    }
}
```

### `useUpdate`

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

```json title="Update event"
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

### `useUpdateMany`

```ts
const { mutate } = useUpdateMany();

mutate({
    ids: [1, 2],
    resource: "posts",
    values: {
        title: "Updated New Title",
    },
});
```

```json title="UpdateMany event"
{
    "action": "updateMany",
    "resource": "posts",
    "data": {
        "title": "Updated New Title"
    },
    "previousData": [
        {
            "title": "Title1"
        },
        {
            "title": "Title2"
        }
    ],
    "meta": {
        "ids": [1, 2]
    }
}
```

### `useDelete`

```ts
const { mutate } = useDelete();

mutate({
    id: 1,
    resource: "posts",
});
```

```json title="Delete event"
{
    "action": "delete",
    "resource": "posts",
    "meta": {
        "id": 1
    }
}
```

### `useDeleteMany`

```ts
const { mutate } = useDeleteMany();

mutate({
    ids: [1, 2],
    resource: "posts",
});
```

```json title="DeleteMany event"
{
    "action": "deleteMany",
    "resource": "posts",
    "meta": {
        "ids": [1, 2]
    }
}
```

## Enable/Disable to Audit Log by Mutation Type for a Resource

With `meta.audit`, you can specify which mutations trigger audit logs; otherwise, all create, update, and delete actions will be logged by default.

For example, if you have the code below, only events will be created for the `create` mutation.

```ts title="App.tsx"
<Refine
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
            meta: {
                audit: ["create"],
            },
            // highlight-end
        },
    ]}
/>
```

## Example

<CodeSandboxExample path="audit-log-provider" />
