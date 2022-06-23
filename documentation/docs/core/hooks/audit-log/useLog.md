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

## API

### Properties

| Property                                                                                            | Description                                              | Type                                                              | Default |
| --------------------------------------------------------------------------------------------------- | -------------------------------------------------------- | ----------------------------------------------------------------- | ------- |
| <div className="required-block"><div>resource</div> <div className=" required">Required</div></div> | Resource name                                            | `string`                                                          |         |
| <div className="required-block"><div>action</div> <div className=" required">Required</div></div>   | Action name                                              | `string`                                                          |         |
| author                                                                                              | Author info                                              | `Record<string, any>`                                             |         |
| meta                                                                                                | For make to unique                                       | `Record<string, any>`                                             |         |
| data                                                                                                | Metadata query for `dataProvider`                        | [`MetaDataQuery`](/core/interfaces.md#metadataquery)              | {}      |
| previousData                                                                                        | Callback to handle all related live events of this hook. | [`(event: LiveEvent) => void`](/core/interfaces.md#livemodeprops) |         |

### Return values

| Type |
| ---- |
| any  |


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
