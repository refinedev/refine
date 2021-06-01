---
id: interfaceReferences
title: Interface References
---

## CrudFilters

[`CrudFilter`](#crudfilter)

### CrudFilter

| Key      | Type                              |
| -------- | --------------------------------- |
| field    | `string`                          |
| operator | [`CrudOperators`](#crudoperators) |

#### CrudOperators

```ts
"eq" | "ne" | "lt" | "gt" | "lte" | "gte" | "in" | "nin" | "contains" | "ncontains" | "containss" | "ncontainss" | "null";
```

| Type           | Description                     |
| -------------- | ------------------------------- |
| `"eq"`         | Equal                           |
| `"ne"`         | Not equal                       |
| `"lt"`         | Less than                       |
| `"gt"`         | Greater than                    |
| `"lte"`        | Less than or equal to           |
| `"gte"`        | Greater than or equal to        |
| `"in"`         | Included in an array            |
| `"nin"`        | Not included in an array        |
| `"contains"`   | Contains                        |
| `"ncontains"`  | Doesn't contain                 |
| `"containss"`  | Contains, case sensitive        |
| `"ncontainss"` | Doesn't contain, case sensitive |
| `"null"`       | Is null or not null             |

## CrudSorting

[`CrudSort[]`](#crudsort)

### CrudSort

| Key   | Type                  |
| ----- | --------------------- |
| field | `string`              |
| order | `"asc"`  \| ` "desc"` |

| `order` type | Description      |
| ------------ | ---------------- |
| `"asc"`      | Ascending order  |
| `"desc"`     | Descending order |

## BaseRecord

| Key             | Type                 |
| --------------- | -------------------- |
| id?             | `string` \| `number` |
| `[key: string]` | `any`                |

## HttpError

| Key        | Type     |
| ---------- | -------- |
| message    | `string` |
| statusCode | `number` |
