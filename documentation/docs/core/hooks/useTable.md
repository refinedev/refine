---
id: useTable
title: useTable
---

`useTable` allows us to fetch data according to the sorter state, the filter state and the pagination states.

:::info
If you're looking for a complete table library, Refine supports two table libraries out-of-the-box.

- [React Table](https://react-table.tanstack.com/) (for Headless users) - [Documentation](/packages/react-table.md) - [Example](/examples/react-table/react-table.md)
- [Ant Design Table](https://ant.design/components/table/#header) (for Ant Design users) - [Documentation](/ui-frameworks/antd/hooks/table/useTable.md) - [Example](/examples/table/useTable.md)
:::

Lets say you have a endpoint that returns the following data:

```json title="https://api.fake-rest.refine.dev/posts"
[
    {
        "id": 182,
        "title": "A aspernatur rerum molestiae.",
        "content": "Natus molestias incidunt voluptatibus. Libero delectus facilis...",
        "status": "published",
        "createdAt": "2021-04-18T00:09:11.607Z"
    },
    {
        "id": 989,
        "title": "A molestiae vel voluptatem enim.",
        "content": "Voluptas consequatur quia beatae. Ipsa est qui culpa deleniti...",
        "status": "draft",
        "createdAt": "2020-01-28T02:57:58.892Z"
    }
]
```

## Basic Usage

In basic usage `useTable` returns the data as it comes from the endpoint.

```tsx
import { useTable } from "@pankod/core";

interface IPost {
    id: string;
    title: string;
    content: string;
    status: "published" | "draft" | "rejected";
}

const { tableQueryResult } = useTable<IPost>({
    resource: "posts",
});
```

## Pagination

`useTable` has a pagination feature. The pagination is done by using the `current` and `pageSize` props. The `current` is the current page and the `pageSize` is the number of records per page.

By default, the `current` is 1 and the `pageSize` is 10. You can change default values by passing the `initialCurrent` and `initialPageSize` props to the `useTable` hook.

You can also change the `current` and `pageSize` values by using the `setCurrent` and `setPageSize` functions that are returned by the `useTable` hook. Every change will trigger a new fetch.

```tsx
import { useTable } from "@pankod/core";

const { pageSize, setPageSize, current, setCurrent } = useTable({
    resource: "posts",
    initialCurrent: 1,
    initialPageSize: 10,
});

console.log(pageSize); // 10
console.log(current); // 1

setPageSize(20);
console.log(pageSize); // 20

setCurrent(2);
console.log(current); // 2
```

## Sorting

`useTable` has a sorter feature. The sorter is done by using the `sorter` state. The `sorter` state is a [`CrudSorting`][crudsorting] type that contains the field and the order of the sort. You can change the sorter state by using the `setSorter` function. Every change will trigger a new fetch.

Also you can add initial sorter state by passing the `initialSorter` prop and permanent sorter state by passing the `permanentSorter` prop to the `useTable` hook. Even if you change the sorter state, the `permanentSorter` will be used together with the sorter state.

```tsx
import { useTable } from "@pankod/core";

const { sorter, setSorter } = useTable({
    resource: "posts",
    initialSorter: [
        {
            field: "title",
            order: "asc",
        },
    ],
    permanentSorter: [
        {
            field: "id",
            order: "desc",
        },
    ],
});

console.log(sorter); // [{ field: "id", order: "desc" }, { field: "title", order: "asc" }]

setSorter([
    {
        field: "createdAt",
        order: "desc",
    },
]);

console.log(sorter); // [{ field: "createdAt", order: "desc" }, { field: "id", order: "desc" }]
```

## Filtering

`useTable` has a filter feature. The filter is done by using the `filters` state. The `filters` state is a [`CrudFilters`][crudfilters] type that contains the field, the operator and the value of the filter. You can change the filter state by using the `setFilters` function. Every change will trigger a new fetch.

Also you can add initial filter state by passing the `initialFilter` prop and permanent filter state by passing the `permanentFilter` prop to the `useTable` hook. Even if you change the filter state, the `permanentFilter` will be used together with the filter state.

```tsx
import { useTable } from "@pankod/core";

const { filters, setFilters } = useTable({
    resource: "posts",
    initialFilter: [
        {
            field: "title",
            operator: "contains",
            value: "rerum",
        },
    ],
    permanentFilter: [
        {
            field: "status",
            operator: "equals",
            value: "published",
        },
    ],
});

console.log(filters); // [{ field: "title", operator: "contains", value: "rerum" }, { field: "status", operator: "equals", value: "published" }]

setFilter([
    {
        field: "title",
        operator: "contains",
        value: "A",
    },
]);

console.log(filters); // [{ field: "title", operator: "contains", value: "A" }, { field: "status", operator: "equals", value: "published" }]
```

## API

### Properties

| Key                   | Description                                                                                                                                                        | Type                                                         | Default                                                                              |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| resource              | Resource name for API data interactions                                                                                                                            | `string` \| `undefined`                                      | Resource name that it reads from the URL                                             |
| initialCurrent        | Initial page index                                                                                                                                                 | `number`                                                     | `1`                                                                                  |
| initialPageSize       | Initial number of items per page                                                                                                                                   | `number`                                                     | `10`                                                                                 |
| initialSorter         | Initial sorter state                                                                                                                                               | [`CrudSorting`][crudsorting]                                 |                                                                                      |
| permanentSorter       | Default and unchangeable sorter state                                                                                                                              | [`CrudSorting`][crudsorting]                                 | `[]`                                                                                 |
| initialFilter         | Initial filter state                                                                                                                                               | [`CrudFilters`][crudfilters]                                 |                                                                                      |
| permanentFilter       | Default and unchangeable filter state                                                                                                                              | [`CrudFilters`][crudfilters]                                 | `[]`                                                                                 |
| syncWithLocation      | Sortings, filters, page index and records shown per page are tracked by browser history                                                                            | `boolean`                                                    | Value set in [Refine][refine swl]. If a custom resource is given, it will be `false` |
| queryOptions          | `react-query`'s `useQuery` options                                                                                                                                 | ` UseQueryOptions<`<br/>`{ data: TData[]; },`<br/>`TError>`  |
| metaData              | Metadata query for `dataProvider`                                                                                                                                  | [`MetaDataQuery`](/core/interfaces.md#metadataquery)         | {}                                                                                   |
| dataProviderName      | If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use.                                                                 | `string`                                                     | `default`                                                                            |
| [liveMode][live mode] | Whether to update data automatically (`"auto"`) or not (`"manual"`) if a related live event is received. The "off" value is used to avoid creating a subscription. | [`"auto"` \| `"manual"` \| `"off"`][live mod props]          | `"off"`                                                                              |
| liveParams            | Params to pass to `liveProvider`'s `subscribe` method if `liveMode` is enabled.                                                                                    | [`{ ids?: BaseKey[]; [key: string]: any; }`][live mod props] | `undefined`                                                                          |
| onLiveEvent           | Callback to handle all related live events of this hook.                                                                                                           | [`(event: LiveEvent) => void`][live mod props]               | `undefined`                                                                          |

### Type Parameters

| Property | Desription                                                   | Type                       | Default                    |
| -------- | ------------------------------------------------------------ | -------------------------- | -------------------------- |
| TData    | Result data of the query. Extends [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] |
| TError   | Custom error object that extends [`HttpError`][httperror]    | [`HttpError`][httperror]   | [`HttpError`][httperror]   |

### Return values

| Property         | Description                                 | Type                                                                                              |
| ---------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| tableQueryResult | Result of the `react-query`'s `useQuery`    | [`QueryObserverResult<{`<br/>` data: TData[];`<br/>` total: number; },`<br/>` TError>`][usequery] |
| current          | Current page index state                    | `number`                                                                                          |
| totalPage        | Total page count                             | `number`                                                                                          |
| setCurrent       | A function that changes the current         | `React.Dispatch<React.SetStateAction<number>>`                                                    |
| pageSize         | Current pageSize state                      | `number`                                                                                          |
| setPageSize      | A function that changes the pageSize.       | `React.Dispatch<React.SetStateAction<number>>`                                                    |
| sorter           | Current sorting state                       | [`CrudSorting`][crudsorting]                                                                      |
| setSorter        | A function that accepts a new sorter state. | `(sorter: CrudSorting) => void`                                                                   |
| filters          | Current filters state                       | [`CrudFilters`][crudfilters]                                                                      |
| setFilters       | A function that accepts a new filter state  | `(filters: CrudFilters) => void`                                                                  |

<br />

[table]: https://ant.design/components/table/#API
[form]: https://ant.design/components/form/#API
[usequery]: https://react-query.tanstack.com/reference/useQuery
[baserecord]: /core/interfaces.md#baserecord
[crudsorting]: /core/interfaces.md#crudsorting
[crudfilters]: /core/interfaces.md#crudfilters
[httperror]: /core/interfaces.md#httperror
[table search]: /guides-and-concepts/search/table-search.md
[refine swl]: /core/components/refine-config.md#syncwithlocation
[live mode]: /core/providers/live-provider.md#usage-in-a-hook
[live mod props]: /core/interfaces.md#livemodeprops
