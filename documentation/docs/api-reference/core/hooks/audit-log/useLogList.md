---
id: useLogList
title: useLogList
---

## Overview

If you need to list audit log events **refine** provides the `useLogList` hook for it, It uses the `get` method from [`auditLogProvider`](/api-reference/core/providers/audit-log-provider.md#get) under the hood.

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

| Property                                                                                            | Type                                                 | Default                         |
| --------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | ------------------------------- |
| <div className="required-block"><div>resource</div> <div className=" required">Required</div></div> | `string`                                             | Action that it reads from route |
| action                                                                                              | `string`                                             |                                 |
| author                                                                                              | `Record<string, any>`                                |                                 |
| meta                                                                                                | `Record<string, any>`                                |                                 |
| metaData                                                                                            | [`MetaDataQuery`](/api-reference/core/interfaces.md#metadataquery) |                                 |
| queryOptions                                                                                        | `UseQueryOptions<TData, TError>`                     |                                 |

### Type Parameters

| Property | Desription                                                                       | Type                                           | Default                                        |
| -------- | -------------------------------------------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| TData    | Result data of the query. Extends [`BaseRecord`](/api-reference/core/interfaces.md#baserecord) | [`BaseRecord`](/api-reference/core/interfaces.md#baserecord) | [`BaseRecord`](/api-reference/core/interfaces.md#baserecord) |
| TError   | Custom error object that extends [`HttpError`](/api-reference/core/interfaces.md#httperror)    | [`HttpError`](/api-reference/core/interfaces.md#httperror)   | [`HttpError`](/api-reference/core/interfaces.md#httperror)   |

### Return values

| Description                              | Type                                                                                      |
| ---------------------------------------- | ----------------------------------------------------------------------------------------- |
| Result of the `react-query`'s `useQuery` | [`UseQueryResult<{ data: TData; }>`](https://react-query.tanstack.com/reference/useQuery) |
