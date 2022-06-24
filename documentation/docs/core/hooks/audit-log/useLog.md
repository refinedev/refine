---
id: useLog
title: useLog
---

If you need to create an audit log, **refine** provides the useLog hook for it. Returns two mutations `log` and `rename` that the methods uses `create` or `update` from [`auditLogProvider`](/core/providers/audit-log-provider.md#create) under the hood.

```tsx
import { useLog } from "@pankod/refine-core";

const { log, rename } = useLog();

```

## `log`

```tsx
import { useLog } from "@pankod/refine-core";

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

:::caution
This hook can only be used if `auditLogProvider`'s `create` method is provided.
:::

### Properties

| Property                                                                                            | Description                                                                                                                  | Type                                                 |
| --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| <div className="required-block"><div>resource</div> <div className=" required">Required</div></div> | Resource name that it reads from URL                                                                                         | `string`                                             |
| <div className="required-block"><div>action</div> <div className=" required">Required</div></div>   | Action name                                                                                                                  | `string`                                             |
| author                                                                                              | Author info                                                                                                                  | `Record<string, any>`                                |
| meta                                                                                                | For make to unique                                                                                                           | `Record<string, any>`                                |
| data                                                                                                | Metadata query for `dataProvider`                                                                                            | [`MetaDataQuery`](/core/interfaces.md#metadataquery) |
| previousData                                                                                        | Gets it automatically with [`getQueryData`](https://react-query.tanstack.com/reference/QueryClient#queryclientgetquerydata). | `Record<string, any>`                                |

### Type Parameters

| Property   | Desription                                                                          | Type                                           | Default                                        |
| ---------- | ----------------------------------------------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| TData      | Result data of the mutation. Extends [`BaseRecord`](/core/interfaces.md#baserecord) | [`BaseRecord`](/core/interfaces.md#baserecord) | [`BaseRecord`](/core/interfaces.md#baserecord) |
| TError     | Custom error object that extends [`HttpError`](/core/interfaces.md#httperror)       | [`HttpError`](/core/interfaces.md#httperror)   | [`HttpError`](/core/interfaces.md#httperror)   |
| TVariables | Values for mutation function                                                        | `{}`                                           | `{}`                                           |


### Return value

| Description                               | Type                                                                                                                                                                      |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Result of the `react-query`'s useMutation | [`UseMutationResult<`<br/>`{ data: TData},`<br/>`TError,`<br/>` { id: BaseKey; name: string; },`<br/>` unknown>`](https://react-query.tanstack.com/reference/useMutation) |


## Rename

If you need to update the audit-log, you can use the `useLog` hook `rename` method. It returns the `update` method from [`auditLogProvider`](/core/providers/audit-log-provider.md) under the hood.

```tsx
import { useLog } from "@pankod/refine-core";

const { rename } = useLog();
const { mutate } = rename;

mutate({
    id: 1,
    name: "Updated Name",
});
```

:::caution
This hook can only be used if `auditLogProvider`'s `update` method is provided.
:::

### Properties

| Property                                       | Description  | Type      |
| ---------------------------------------------- | ------------ | --------- |
| id<div className=" required">Required</div>    | Id           | `BaseKey` |
| name <div className=" required">Required</div> | Updated name | `string`  |

### Type Parameters

| Property   | Desription                                                                          | Type                                           | Default                                        |
| ---------- | ----------------------------------------------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| TData      | Result data of the mutation. Extends [`BaseRecord`](/core/interfaces.md#baserecord) | [`BaseRecord`](/core/interfaces.md#baserecord) | [`BaseRecord`](/core/interfaces.md#baserecord) |
| TError     | Custom error object that extends [`HttpError`](/core/interfaces.md#httperror)       | [`HttpError`](/core/interfaces.md#httperror)   | [`HttpError`](/core/interfaces.md#httperror)   |
| TVariables | Values for mutation function                                                        | `{}`                                           | `{}`                                           |


### Return value

| Description                               | Type                                                                                                                                                                      |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Result of the `react-query`'s useMutation | [`UseMutationResult<`<br/>`{ data: TData},`<br/>`TError,`<br/>` { id: BaseKey; name: string; },`<br/>` unknown>`](https://react-query.tanstack.com/reference/useMutation) |



:::info
You can get audit logs with [`useLogList`](/core/hooks/audit-log/useLogList.md).
:::
