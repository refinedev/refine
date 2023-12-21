---
title: useLogList
---

If you need to list audit log events, you can use the `useLogList` hook of Refine, which uses the `get` method from [`auditLogProvider`](/docs/audit-logs/audit-log-provider#get) under the hood.

## Usage

```tsx
import { useLogList } from "@refinedev/core";

const postAuditLogResults = useLogList({
  resource: "posts",
});
```

## API Reference

### Properties

| Property                      | Type                                                         | Default                         |
| ----------------------------- | ------------------------------------------------------------ | ------------------------------- |
| resource <PropTag asterisk /> | `string`                                                     | Action that it reads from route |
| action                        | `string`                                                     |                                 |
| author                        | `Record<string, any>`                                        |                                 |
| meta                          | `Record<string, any>`                                        |                                 |
| metaData                      | [`MetaDataQuery`](/docs/core/interface-references#metaquery) |                                 |
| queryOptions                  | `UseQueryOptions<TQueryFnData, TError, TData>`               |                                 |

### Type Parameters

| Property     | Description                                                                                                                                                         | Type                       | Default                    |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | -------------------------- |
| TQueryFnData | Result data returned by the query function. Extends [`BaseRecord`][baserecord]                                                                                      | [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] |
| TError       | Custom error object that extends [`HttpError`][httperror]                                                                                                           | [`HttpError`][httperror]   | [`HttpError`][httperror]   |
| TData        | Result data returned by the `select` function. Extends [`BaseRecord`][baserecord]. If not specified, the value of `TQueryFnData` will be used as the default value. | [`BaseRecord`][baserecord] | `TQueryFnData`             |

### Return values

| Description                              | Type                                                                                      |
| ---------------------------------------- | ----------------------------------------------------------------------------------------- |
| Result of the `react-query`'s `useQuery` | [`UseQueryResult<{ data: TData; }>`](https://react-query.tanstack.com/reference/useQuery) |

[baserecord]: /docs/core/interface-references#baserecord
[httperror]: /docs/core/interface-references#httperror
