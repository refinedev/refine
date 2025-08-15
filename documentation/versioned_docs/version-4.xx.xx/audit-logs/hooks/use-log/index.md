---
title: useLog
---

If you need to create or update an audit log, you can use Refine's `useLog` hook. This hook will return two mutations called `log` and `rename`

```tsx
import { useLog } from "@refinedev/core";

const { log, rename } = useLog();
```

## log

The `log` mutation is used to create an audit log event using the `create` method from [`auditLogProvider`](/docs/audit-logs/audit-log-provider#create) under the hood.

```tsx
import { useLog } from "@refinedev/core";

const { log } = useLog();
const { mutate } = log;

mutate({
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

### Properties

| Property                      | Type                  |
| ----------------------------- | --------------------- |
| resource <PropTag asterisk /> | `string`              |
| action <PropTag asterisk />   | `string`              |
| author                        | `Record<string, any>` |
| meta                          | `Record<string, any>` |
| data                          | `Record<string, any>` |
| previousData                  | `Record<string, any>` |

### Type Parameters

| Property   | Description                                                                                     | Type                                                       | Default                                                    |
| ---------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
| TData      | Result data of the mutation. Extends [`BaseRecord`](/docs/core/interface-references#baserecord) | [`BaseRecord`](/docs/core/interface-references#baserecord) | [`BaseRecord`](/docs/core/interface-references#baserecord) |
| TError     | Custom error object that extends [`HttpError`](/docs/core/interface-references#httperror)       | [`HttpError`](/docs/core/interface-references#httperror)   | [`HttpError`](/docs/core/interface-references#httperror)   |
| TVariables | Values for mutation function                                                                    | `{}`                                                       | `{}`                                                       |

### Return value

| Description                               | Type                                                                                                                                           |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Result of the `react-query`'s useMutation | [`UseMutationResult<{ data: TData}, TError, { id: BaseKey; name: string; }, unknown>`](https://react-query.tanstack.com/reference/useMutation) |

## rename

The `rename` mutation is used to update an audit log event using the `update` method from [`auditLogProvider`](/docs/audit-logs/audit-log-provider#update) under the hood.

```tsx
import { useLog } from "@refinedev/core";

const { rename } = useLog();
const { mutate } = rename;

mutate({
  id: 1,
  name: "Updated Name",
});
```

### Properties

| Property                  | Type      |
| ------------------------- | --------- |
| id <PropTag asterisk />   | `BaseKey` |
| name <PropTag asterisk /> | `string`  |

### Type Parameters

| Property   | Description                                                                                     | Type                                                       | Default                                                    |
| ---------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
| TData      | Result data of the mutation. Extends [`BaseRecord`](/docs/core/interface-references#baserecord) | [`BaseRecord`](/docs/core/interface-references#baserecord) | [`BaseRecord`](/docs/core/interface-references#baserecord) |
| TError     | Custom error object that extends [`HttpError`](/docs/core/interface-references#httperror)       | [`HttpError`](/docs/core/interface-references#httperror)   | [`HttpError`](/docs/core/interface-references#httperror)   |
| TVariables | Values for mutation function                                                                    | `{}`                                                       | `{}`                                                       |

### Return value

| Description                               | Type                                                                                                                                           |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Result of the `react-query`'s useMutation | [`UseMutationResult<{ data: TData}, TError, { id: BaseKey; name: string; }, unknown>`](https://react-query.tanstack.com/reference/useMutation) |
