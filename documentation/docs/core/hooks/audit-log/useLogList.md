---
id: useLogList
title: useLogList
---

If you need to get audit logs **refine** provides the `useLogList` hook for it, It returns the `get` method from [`auditLogProvider`](/core/providers/audit-log-provider.md#get) under the hood.

## Usage

:::caution
This hook can only be used if `auditLogProvider`'s `get` method is provided.
:::

```tsx
import { useLogList } from "@pankod/refine-core";

const postAuditLogResults = useLogList({
    resource: "posts",
});
```


## API

### Properties

| Property                                                                                            | Description                                              | Type                                                              | Default |
| --------------------------------------------------------------------------------------------------- | -------------------------------------------------------- | ----------------------------------------------------------------- | ------- |
| <div className="required-block"><div>resource</div> <div className=" required">Required</div></div> | Resource name                                            | `string`                                                          |         |
| action                                                                                              | Action name                                              | `string`                                                          |         |
| author                                                                                              | Author info                                              | `Record<string, any>`                                             |         |
| meta                                                                                                | For make to unique                                       | `Record<string, any>`                                             |         |
| metaData                                                                                            | Metadata query for `dataProvider`                        | [`MetaDataQuery`](/core/interfaces.md#metadataquery)              | {}      |
| queryOptions                                                                                        | Callback to handle all related live events of this hook. | [`(event: LiveEvent) => void`](/core/interfaces.md#livemodeprops) |         |

### Type Parameters

| Property | Desription                                                                       | Type                                           | Default                                        |
| -------- | -------------------------------------------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| TData    | Result data of the query. Extends [`BaseRecord`](/core/interfaces.md#baserecord) | [`BaseRecord`](/core/interfaces.md#baserecord) | [`BaseRecord`](/core/interfaces.md#baserecord) |
| TError   | Custom error object that extends [`HttpError`](/core/interfaces.md#httperror)    | [`HttpError`](/core/interfaces.md#httperror)   | [`HttpError`](/core/interfaces.md#httperror)   |

### Return values

| Description                              | Type                                                                                      |
| ---------------------------------------- | ----------------------------------------------------------------------------------------- |
| Result of the `react-query`'s `useQuery` | [`UseQueryResult<{ data: TData; }>`](https://react-query.tanstack.com/reference/useQuery) |
