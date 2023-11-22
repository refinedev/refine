---
title: Tables
---

import BaseAntdTableExample from "./example/antd.md";
import BaseTanStackTable from "./example/tanstack-table.md";
import BaseHeadlessTable from "./example/core.md";
import BaseMaterialUiTable from "./example/material-ui.md";
import BaseMantineTable from "./example/mantine.md";
import BaseChakraUi from "./example/chakra-ui.md";
import Relationship from "./example/relationship";

Tables are essential in data-intensive applications, serving as the primary way for organizing and displaying data in a readable format using rows and columns. Their integration, however, is complex due to the vast data and functionalities like sorting, filtering, and pagination. Refine's **tables** integration aims to make this process as simple as possible while providing as many real world features as possible out of the box. This guide will cover the basics of **tables** in Refine and how to use them.

## Handling Data

[`useTable`][use-table-core] allows us to fetch data according to the sorter, filter, and pagination states. Under the hood, it uses [`useList`][use-list] for the fetch. Its designed to be headless, but Refine offers seamless integration with several popular UI libraries, simplifying the use of their table components.

- [React Table](https://react-table.tanstack.com/) (for TanStack Table users) - [Documentation](/docs/packages/documentation/react-table) - [Example](/examples/table/react-table/basic.md)
- [Ant Design Table](https://ant.design/components/table/#header) (for Ant Design users) - [Documentation](/docs/api-reference/antd/hooks/table/useTable) - [Example](/examples/table/antd/useTable.md)
- [Material UI Table](https://mui.com/x/react-data-grid/) (for Material UI users) - [Documentation](/docs/api-reference/mui/hooks/useDataGrid) - [Example](/examples/table/mui/useDataGrid.md)

## Basic Usage

The usage of the `useTable` hooks may slightly differ between libraries, the core functionality is provided by the @refinedev/core's `useTable` hook and is the same across all implementations. Refine's core has the `useTable` hook which is the foundation of all the other extensions and `useTable` implementations in the other helper libraries.

To learn more about the usage and see `useTable` in action, check out the reference pages for each library:

<Tabs>

<TabItem value="Headless">

<BaseHeadlessTable />

[Check out Refine's `useTable` reference page to learn more about the usage and see it in action.][use-table-core]

</TabItem>

<TabItem value="TanStack Table">

<BaseTanStackTable />

[Check out TanStack Table's `useTable` reference page to learn more about the usage and see it in action.](/docs/packages/documentation/react-table/#installation)

</TabItem>

<TabItem value="Ant Design">

<BaseAntdTableExample />

[Check out Ant Design's `useTable` reference page to learn more about the usage and see it in action.](/docs/api-reference/antd/hooks/table/useTable)

</TabItem>

<TabItem value="Material UI">

<BaseMaterialUiTable />

[Check out Material UI's `useDataGrid` reference page to learn more about the usage and see it in action.](/docs/api-reference/mui/hooks/useDataGrid)

</TabItem>

<TabItem value="Mantine">

<BaseMantineTable />

[Check out TanStack Table's `useTable` reference page to learn more about the usage and see it in action.](/docs/packages/documentation/react-table/#installation)

</TabItem>

<TabItem value="Chakra UI">

<BaseChakraUi />

[Check out TanStack Table's `useTable` reference page to learn more about the usage and see it in action.](/docs/packages/documentation/react-table/#installation)

</TabItem>

</Tabs>

## Pagination

`useTable` has a pagination feature. The pagination is done by passing the `current` and `pageSize` keys to `pagination` object.

`pagination` object has the following shape:

```ts
interface Pagination {
  /**
   * Initial page index
   * @default 1
   */
  current?: number;
  /**
   * Initial number of items per page
   * @default 10
   */
  pageSize?: number;
  /**
   * Whether to use server side pagination or not.
   * @default "server"
   */
  mode?: "client" | "server" | "off";
}
```

You can also change the `current` and `pageSize` values by using the `setCurrent` and `setPageSize` functions that are returned by the `useTable` hook. Every change will trigger a new fetch.

By default, pagination happens on the server side. If you want to do pagination handling on the client side, you can pass the pagination.mode property and set it to "client". Also, you can disable the pagination by setting it to "off".

```tsx
import React from "react";
import { useTable } from "@refinedev/core";

const PostList: React.FC = () => {
  const { tableQueryResult, current, setCurrent, pageCount } = useTable({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  // Fetches the posts for the current page
  const posts = tableQueryResult?.data?.data ?? [];
  // Checks if there is a next page available
  const hasNext = current < pageCount;
  // Checks if there is a previous page available
  const hasPrev = current > 1;

  return (
    <div>
      <h1>Posts</h1>
      <table>{/* Render the table */}</table>
      <div>
        <button onClick={() => setCurrent((prev) => prev - 1)} disabled={!hasPrev}>
          Previous
        </button>
        <button onClick={() => setCurrent((prev) => prev + 1)} disabled={!hasNext}>
          Next
        </button>
      </div>
    </div>
  );
};
```

## Filtering

`useTable` has a filter feature. The filter is done by using the `initial`, `permanent`, `defaultBehavior` and `mode` keys to `filters` object.

- **initial**: The initial filter state. It can be changed by the `setFilters` function.
- **permanent**: The default and unchangeable filter state. It can't be changed by the `setFilters` function.
- **defaultBehavior**: The default behavior of the `setFilters` function.
  - When `merge` is selected, the new filters will be merged with the old ones.
  - When `replace` is selected, the new filters will replace the old ones. It means that the old filters will be deleted.
- **mode**: Whether to use server side filter or not.
  - When `server` is selected, the filters will be sent to the server.
  - When `off` is selected, the filters will be applied on the client side.

`filters` object has the following shape:

```ts
type Filters = {
  /**
   * Initial filter state. It can be changed by the `setFilters` function.
   */
  initial?: CrudFilters;
  /**
   * Default and unchangeable filter state. It can't be changed by the `setFilters` function.
   *  @default `[]`
   */
  permanent?: CrudFilters;
  /**
   * Default behavior of the `setFilters` function
   * When `merge` is selected, the new filters will be merged with the old ones.
   * When `replace` is selected, the new filters will replace the old ones. It means that the old filters will be deleted.
   * @default `"merge"`
   */
  defaultBehavior?: "merge" | "replace";
  /**
   * Whether to use server side filter or not.
   * When `server` is selected, the filters will be sent to the server.
   * When `off` is selected, the filters will be applied on the client side.
   * @default "server"
   */
  mode?: "server" | "off";
};

// It's a union of LogicalFilter and ConditionalFilter[]. It's used to create complex multiple filters.
type CrudFilters = (LogicalFilter | ConditionalFilter)[];

// to support filters like { id: { eq: 1 } }
type LogicalFilter = {
  field: string;
  operator: Exclude<CrudOperators, "or" | "and">;
  value: any;
};

// To support multiple or/and filters
type ConditionalFilter = {
  key?: string;
  operator: Extract<CrudOperators, "or" | "and">;
  value: (LogicalFilter | ConditionalFilter)[];
};
```

With this flexible interface, you can create complex filters.

For example, we can fetch products

- With wooden material
- Belongs to category ID 45
- OR have a price between 1000 and 2000.

```ts
import { useTable } from "@refinedev/core";

useTable({
  filters: {
    initial: [
      {
        operator: "and",
        value: [
          { field: "material", operator: "eq", value: "wooden" },
          { field: "category.id", operator: "eq", value: 45 },
        ],
      },
      {
        operator: "or",
        value: [
          { field: "price", operator: "gte", value: 1000 },
          { field: "price", operator: "lte", value: 2000 },
        ],
      },
    ],
  },
});
```

You can change the filters state by using the `setFilters` function. Every change will trigger a new fetch.

```tsx
import { useTable, HttpError } from "@refinedev/core";

const PostList = () => {
  const { tableQueryResult, setFilters } = useTable<IPost, HttpError, IPostFilters>();
  const posts = tableQueryResult?.data?.data ?? [];

  const resetFilters = () => {
    // we can reset the filters by passing an empty array
    // we used the `replace` behavior to replace the old filters with the new ones
    setFilters([], "replace");
  };

  const filterByStatus = (option: IPostStatus) => {
    // we can filter the posts by status
    setFilters([{ field: "status", operator: "eq", value: option }]);
  };

  return (
    <div>
      <h1>Posts</h1>
      <button onClick={resetFilters}>reset filters</button>
      <select onChange={filterByStatus}>
        <option value="draft">draft</option>
        <select onChange={(e) => filterByStatus(e.target.value as IPostStatus)}>
          <option value="draft">draft</option>
          <option value="published">published</option>
        </select>
      </select>
      <table>{/* Render the table */}</table>
    </div>
  );
};

type IPostStatus = "draft" | "published";

type IPostFilters = {
  status: IPostStatus;
};

interface IPost {
  id: number;
  title: string;
  content: string;
  status: IPostStatus;
}
```

## Sorting

`useTable` has a sorter feature. The sorter is done by using the `initial` and `permanent` keys to `sorters` object. The `initial` is the initial sorter state, and the `permanent` is the permanent sorter state. These states are a [`CrudSorter`][crudsorting] type that contains the field and the order of the sorter.

`sorters` object (CrudSorters) has the following shape:

```ts
export type CrudSorting = CrudSort[];

export type CrudSort = {
  field: string;
  order: "asc" | "desc";
};
```

With this interface, you can create single or multiple sorters.

For example, we can fetch products

- Sorted by price ascending
- Then sorted by name descending

```ts
import { useTable } from "@refinedev/core";

useTable({
  sorters: [
    { field: "price", order: "asc" },
    { field: "name", order: "desc" },
  ],
});
```

You can change the sorters state by using the `setSorters` function. Every change will trigger a new fetch.

## Search

`useTable` has a search feature with `onSearch`. The search is done by using the `onSearch` function with `searchFormProps`. These feature enables you to easily connect form state to the table filters.

`onSearch`: This function is triggered when the `searchFormProps.onFinish is called`. It receives the form values as the first argument and expectes a promise that returns a [`CrudFilters`][crudfilters] type.
`searchFormProps`: Has nessesary props for the form.

For example we can fetch posts with the title that contains the search value.

```tsx
import { useTable, HttpError } from "@refinedev/core";

const PostList: React.FC = () => {
  const { searchFormProps } = useTable<IPost, HttpError, IPostFilters>({
    onSearch: async (values) => {
      return [
        {
          field: "title",
          operator: "contains",
          value: values.title,
        },
      ];
    },
  });

  return (
    <div>
      <h1>Posts</h1>
      <form {...searchFormProps}>
        <input name="title" />
        <button type="submit">Search</button>
      </form>
      <table>{/* Render the table */}</table>
    </div>
  );
};

type IPostFilters = {
  title: string;
};

interface IPost {
  id: number;
  title: string;
  content: string;
}
```

## Integrating with Routers

### Syncing with Location <GlobalConfigBadge id="api-reference/core/components/refine-config/#syncwithlocation" />

When you use the [`syncWithLocation`](/docs/api-reference/core/hooks/useTable/#syncwithlocation) feature, the `useTable`'s state (e.g., sort order, filters, pagination) is automatically encoded in the query parameters of the URL, and when the URL changes, the `useTable` state is automatically updated to match. This makes it easy to share table state across different routes or pages, and to allow users to bookmark or share links to specific table views.

## Relationships

Refine handles data relations with data hooks(eg: `useOne`, `useMany`, etc.). This compositional design allows you to flexibly and efficiently manage data relationships to suit your specific requirements.

For example imagine each post has a many category. We can fetch the categories of the post by using the `useMany` hook.

 <Relationship />

[use-table-core]: /docs/api-reference/core/hooks/useTable/
[use-list]: /docs/api-reference/core/hooks/data/useList/
[usequery]: https://react-query.tanstack.com/reference/useQuery
[baserecord]: /api-reference/core/interfaces.md#baserecord
[crudsorting]: /api-reference/core/interfaces.md#crudsorting
[crudfilters]: /api-reference/core/interfaces.md#crudfilters
[httperror]: /api-reference/core/interfaces.md#httperror
[refine swl]: /api-reference/core/components/refine-config.md#syncwithlocation
[syncwithlocationparams]: /api-reference/core/interfaces.md#syncwithlocationparams
[notification-provider]: /api-reference/core/providers/notification-provider.md
