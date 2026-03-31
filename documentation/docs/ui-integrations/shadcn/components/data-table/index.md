---
title: "shadcn/ui DataTable Component | Data Table in Refine v5"
display_title: "<DataTable />"
sidebar_label: "<DataTable />"
description: "Learn to build composable data tables in Refine v5 with sorting, filtering, pagination, column pinning, cell renderers, and more."
source: https://github.com/refinedev/refine/tree/main/packages/refine-ui/registry/new-york/refine-ui/data-table/data-table.tsx
---

When you're building admin dashboards, you'll frequently need to display lists of data — whether it's posts, users, products, or any other resource. The DataTable components handle all the common table functionality you need: sorting columns, filtering data, pagination, loading states, empty states, and action buttons.

Built on TanStack Table, these composable primitives integrate directly with Refine's data fetching hooks for server-side sorting and filtering. Instead of a single monolithic component, you compose structural pieces together — giving you full control over layout, loading UX, and cell rendering.

## Installation

Add the DataTable components to your project:

```bash
npx shadcn@latest add https://ui.refine.dev/r/data-table.json
```

This installs all the structural primitives, cell helpers, value renderers, filtering, sorting, and pagination components you'll need. The CLI will automatically install the required dependencies like `@tanstack/react-table` and `react-day-picker`.

## Component Overview

The DataTable is built from composable pieces that you assemble to match your needs:

### Composition Structure

```
<DataTableToolbar>
  <DataTableColumnVisibility />
</DataTableToolbar>
<DataTableCellRelationProvider resource="..." ids={[...]}>
  <DataTableOverflowWrapper>
    <DataTableLoadingOverlay />
    <DataTable>
      <DataTableHeader />
      <DataTableBody>
        <DataTableSkeleton />  ← during initial load
        <DataTableEmpty />     ← when no data
        {null}                 ← normal rows render automatically
      </DataTableBody>
    </DataTable>
  </DataTableOverflowWrapper>
</DataTableCellRelationProvider>
<DataTablePagination />
```

### All Components

**Core Structure**

| Component                  | Description                                                                               |
| -------------------------- | ----------------------------------------------------------------------------------------- |
| `DataTable`                | Thin `<table>` wrapper with fixed layout                                                  |
| `DataTableOverflowWrapper` | Scroll container with overflow detection context                                          |
| `DataTableHeader`          | Renders `<TableHeader>` from TanStack header groups                                       |
| `DataTableBody`            | Renders `<TableBody>` from row model; accepts children override for skeleton/empty states |

**Loading & Empty States**

| Component                 | Description                                     |
| ------------------------- | ----------------------------------------------- |
| `DataTableSkeleton`       | Skeleton placeholder rows during initial load   |
| `DataTableEmpty`          | Customizable empty state with title/description |
| `DataTableLoadingOverlay` | Semi-transparent overlay spinner for refetch    |

**Toolbar**

| Component                   | Description                    |
| --------------------------- | ------------------------------ |
| `DataTableToolbar`          | Flex wrapper for toolbar items |
| `DataTableColumnVisibility` | Dropdown to show/hide columns  |

**Pagination**

| Component                   | Description                       |
| --------------------------- | --------------------------------- |
| `DataTablePagination`       | Offset/page-based pagination      |
| `DataTableCursorPagination` | Cursor-based prev/next pagination |

**Cell Helpers** — layout wrappers for column definitions

| Component               | Description                                                 |
| ----------------------- | ----------------------------------------------------------- |
| `DataTableHeaderLabel`  | Flex container for header content (label + sorter + filter) |
| `DataTableCellTruncate` | Truncated text wrapper                                      |
| `DataTableCellBadges`   | Flex-wrap container for badge lists                         |
| `DataTableCellActions`  | Centered flex container for action buttons                  |

**Value Renderers** — typed cell content

| Component                       | Description                                                                                 |
| ------------------------------- | ------------------------------------------------------------------------------------------- |
| `DataTableCellStatus`           | String → Badge with variant mapping                                                         |
| `DataTableCellDate`             | Date formatting (absolute, relative, or custom)                                             |
| `DataTableCellBoolean`          | Boolean → Check/X icon                                                                      |
| `DataTableCellNumber`           | Number formatting via `Intl.NumberFormat`                                                   |
| `DataTableCellRelationProvider` | Batches relation IDs into a single `useMany` request                                        |
| `DataTableCellRelation`         | Resolves a foreign key to a display value (uses provider cache or falls back to `useOne()`) |

**Sorting & Filtering** — unchanged from previous version

| Component                                 | Description                  |
| ----------------------------------------- | ---------------------------- |
| `DataTableSorter`                         | Column header sorting toggle |
| `DataTableFilterDropdownText`             | Text search filter           |
| `DataTableFilterDropdownNumeric`          | Numeric filter               |
| `DataTableFilterCombobox`                 | Dropdown/combobox filter     |
| `DataTableFilterDropdownDateRangePicker`  | Date range filter            |
| `DataTableFilterDropdownDateSinglePicker` | Single date filter           |

## Basic Usage

Create a list view with a composable data table:

```tsx
import { useMemo } from "react";
import { useTable } from "@refinedev/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/refine-ui/data-table/data-table";
import { DataTableOverflowWrapper } from "@/components/refine-ui/data-table/data-table-overflow-wrapper";
import { DataTableHeader } from "@/components/refine-ui/data-table/data-table-header";
import { DataTableBody } from "@/components/refine-ui/data-table/data-table-body";
import { DataTableSkeleton } from "@/components/refine-ui/data-table/data-table-skeleton";
import { DataTableEmpty } from "@/components/refine-ui/data-table/data-table-empty";
import { DataTablePagination } from "@/components/refine-ui/data-table/data-table-pagination";
import { DataTableSorter } from "@/components/refine-ui/data-table/data-table-sorter";
import { DataTableHeaderLabel } from "@/components/refine-ui/data-table/data-table-cell-helpers";
import {
  ListView,
  ListViewHeader,
} from "@/components/refine-ui/views/list-view";

type Post = {
  id: number;
  title: string;
  status: string;
};

export default function PostList() {
  const columns = useMemo<ColumnDef<Post>[]>(
    () => [
      {
        id: "id",
        accessorKey: "id",
        header: ({ column }) => (
          <DataTableHeaderLabel>
            <span>ID</span>
            <DataTableSorter column={column} />
          </DataTableHeaderLabel>
        ),
      },
      {
        id: "title",
        accessorKey: "title",
        header: "Title",
      },
      {
        id: "status",
        accessorKey: "status",
        header: "Status",
      },
    ],
    [],
  );

  const table = useTable<Post>({
    columns,
    refineCoreProps: {
      resource: "posts",
    },
  });

  const {
    reactTable,
    refineCore: {
      tableQuery,
      currentPage,
      setCurrentPage,
      pageCount,
      pageSize,
      setPageSize,
    },
  } = table;

  const isLoading = tableQuery.isLoading;
  const rows = reactTable.getRowModel().rows;

  return (
    <ListView>
      <ListViewHeader title="Posts" />
      <div className="flex flex-col flex-1 gap-4">
        <DataTableOverflowWrapper deps={[tableQuery.data?.data, pageSize]}>
          <DataTable>
            <DataTableHeader headerGroups={reactTable.getHeaderGroups()} />
            <DataTableBody
              rows={rows}
              leafColumns={reactTable.getAllLeafColumns()}
            >
              {isLoading ? (
                <DataTableSkeleton
                  columns={reactTable.getAllLeafColumns()}
                  rowCount={pageSize}
                />
              ) : rows.length === 0 ? (
                <DataTableEmpty
                  columnCount={reactTable.getAllColumns().length}
                />
              ) : null}
            </DataTableBody>
          </DataTable>
        </DataTableOverflowWrapper>
        {!isLoading && rows.length > 0 && (
          <DataTablePagination
            currentPage={currentPage}
            pageCount={pageCount}
            setCurrentPage={setCurrentPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            total={tableQuery.data?.total}
          />
        )}
      </div>
    </ListView>
  );
}
```

## Advanced Example

Here's a comprehensive example with filtering, sorting, column pinning, toolbar, loading states, relational data via providers, and value renderers:

```tsx
import { useEffect, useMemo } from "react";
import { useTable } from "@refinedev/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import { type GetManyResponse, useList, useMany } from "@refinedev/core";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/refine-ui/data-table/data-table";
import { DataTableOverflowWrapper } from "@/components/refine-ui/data-table/data-table-overflow-wrapper";
import { DataTableHeader } from "@/components/refine-ui/data-table/data-table-header";
import { DataTableBody } from "@/components/refine-ui/data-table/data-table-body";
import { DataTableSkeleton } from "@/components/refine-ui/data-table/data-table-skeleton";
import { DataTableEmpty } from "@/components/refine-ui/data-table/data-table-empty";
import { DataTableLoadingOverlay } from "@/components/refine-ui/data-table/data-table-loading-overlay";
import { DataTableToolbar } from "@/components/refine-ui/data-table/data-table-toolbar";
import { DataTableColumnVisibility } from "@/components/refine-ui/data-table/data-table-column-visibility";
import { DataTablePagination } from "@/components/refine-ui/data-table/data-table-pagination";
import { DataTableSorter } from "@/components/refine-ui/data-table/data-table-sorter";
import {
  DataTableFilterDropdownText,
  DataTableFilterCombobox,
  DataTableFilterDropdownDateRangePicker,
  DataTableFilterDropdownNumeric,
} from "@/components/refine-ui/data-table/data-table-filter";
import {
  DataTableHeaderLabel,
  DataTableCellTruncate,
  DataTableCellBadges,
  DataTableCellActions,
} from "@/components/refine-ui/data-table/data-table-cell-helpers";
import { DataTableCellStatus } from "@/components/refine-ui/data-table/data-table-cell-status";
import { DataTableCellDate } from "@/components/refine-ui/data-table/data-table-cell-date";
import {
  DataTableCellRelation,
  DataTableCellRelationProvider,
} from "@/components/refine-ui/data-table/data-table-cell-relation";
import { EditButton } from "@/components/refine-ui/buttons/edit";
import { DeleteButton } from "@/components/refine-ui/buttons/delete";
import { ShowButton } from "@/components/refine-ui/buttons/show";
import {
  ListView,
  ListViewHeader,
} from "@/components/refine-ui/views/list-view";

type Post = {
  id: number;
  title: string;
  content: string;
  status: "published" | "draft" | "rejected";
  category: { id: number };
  user: { id: number };
  tags: number[];
  createdAt: string;
};

type Category = { id: number; title: string };
type Tag = { id: number; title: string };

export default function PostList() {
  // Fetch categories for the combobox filter
  const { result } = useList<Category>({
    resource: "categories",
    pagination: { currentPage: 1, pageSize: 999 },
  });
  const categories = result?.data ?? [];

  const columns = useMemo<ColumnDef<Post>[]>(
    () => [
      {
        id: "id",
        accessorKey: "id",
        size: 96,
        header: ({ column, table }) => (
          <DataTableHeaderLabel>
            <span>ID</span>
            <div>
              <DataTableSorter column={column} />
              <DataTableFilterDropdownNumeric
                defaultOperator="eq"
                column={column}
                table={table}
                placeholder="Filter by ID"
              />
            </div>
          </DataTableHeaderLabel>
        ),
      },
      {
        id: "title",
        accessorKey: "title",
        size: 300,
        header: ({ column, table }) => (
          <DataTableHeaderLabel>
            <span>Title</span>
            <div>
              <DataTableFilterDropdownText
                defaultOperator="contains"
                column={column}
                table={table}
                placeholder="Filter by title"
              />
            </div>
          </DataTableHeaderLabel>
        ),
        cell: ({ getValue }) => (
          <DataTableCellTruncate>{getValue<string>()}</DataTableCellTruncate>
        ),
      },
      {
        id: "category.id",
        accessorKey: "category.id",
        size: 200,
        header: ({ column }) => (
          <DataTableHeaderLabel>
            <span>Category</span>
            <DataTableFilterCombobox
              column={column}
              defaultOperator="in"
              multiple
              options={categories.map((c) => ({
                label: c.title,
                value: c.id.toString(),
              }))}
            />
          </DataTableHeaderLabel>
        ),
        // Uses DataTableCellRelationProvider — batched via useMany
        cell: ({ getValue }) => (
          <DataTableCellRelation
            resource="categories"
            id={getValue<number>()}
            field="title"
          />
        ),
      },
      {
        id: "tags",
        accessorKey: "tags",
        size: 200,
        header: "Tags",
        // Manual useMany + table meta approach for tags
        cell: ({ getValue, table }) => {
          const meta = table.options.meta as {
            tagsData: GetManyResponse<Tag>["data"] | undefined;
          };
          const allTags = meta?.tagsData ?? [];
          const postTags = allTags.filter((t) =>
            getValue<number[]>().includes(t.id),
          );
          return (
            <DataTableCellBadges>
              {postTags.map((tag) => (
                <Badge key={tag.id}>{tag.title}</Badge>
              ))}
            </DataTableCellBadges>
          );
        },
      },
      {
        id: "user.id",
        accessorKey: "user.id",
        size: 200,
        header: "Author",
        // No provider for "users" — falls back to useOne per cell
        cell: ({ getValue }) => (
          <DataTableCellRelation
            resource="users"
            id={getValue<number>()}
            field="firstName"
          />
        ),
      },
      {
        id: "status",
        accessorKey: "status",
        size: 100,
        header: ({ column }) => (
          <DataTableHeaderLabel>
            <span>Status</span>
            <DataTableFilterCombobox
              column={column}
              defaultOperator="in"
              multiple
              options={[
                { label: "Published", value: "published" },
                { label: "Draft", value: "draft" },
                { label: "Rejected", value: "rejected" },
              ]}
            />
          </DataTableHeaderLabel>
        ),
        cell: ({ getValue }) => (
          <DataTableCellStatus
            value={getValue<string>()}
            variants={{
              published: "default",
              draft: "outline",
              rejected: "destructive",
            }}
          />
        ),
      },
      {
        id: "createdAt",
        accessorKey: "createdAt",
        size: 220,
        header: ({ column }) => (
          <DataTableHeaderLabel>
            <span>Created At</span>
            <DataTableFilterDropdownDateRangePicker
              column={column}
              formatDateRange={(range) => {
                if (!range?.from || !range?.to) return undefined;
                return [range.from.toISOString(), range.to.toISOString()];
              }}
            />
          </DataTableHeaderLabel>
        ),
        cell: ({ row }) => <DataTableCellDate value={row.original.createdAt} />,
      },
      {
        id: "actions",
        size: 84,
        enableSorting: false,
        enableColumnFilter: false,
        header: () => <DataTableCellActions>Actions</DataTableCellActions>,
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 mx-auto flex">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="flex flex-col gap-2 p-2"
            >
              <ShowButton
                variant="ghost"
                size="sm"
                recordItemId={row.original.id}
              />
              <EditButton
                variant="ghost"
                size="sm"
                recordItemId={row.original.id}
              />
              <DeleteButton
                key={row.original.id}
                size="sm"
                recordItemId={row.original.id}
              />
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [categories],
  );

  const table = useTable<Post>({
    columns,
    refineCoreProps: {},
    initialState: {
      columnPinning: {
        right: ["actions"], // Pin actions column to the right
      },
    },
  });

  const {
    reactTable,
    refineCore: {
      tableQuery,
      currentPage,
      setCurrentPage,
      pageCount,
      pageSize,
      setPageSize,
    },
  } = table;

  const isLoading = tableQuery.isLoading;
  const isFetching = tableQuery.isFetching && !isLoading;
  const rows = reactTable.getRowModel().rows;

  // Collect category IDs for the relation provider (batched useMany)
  const categoryIds = useMemo(
    () => tableQuery.data?.data?.map((post) => post.category.id) ?? [],
    [tableQuery.data],
  );

  // Manual useMany for tags — passed to cells via table meta
  const tagIds = useMemo(
    () => tableQuery.data?.data?.flatMap((post) => post.tags) ?? [],
    [tableQuery.data],
  );

  const {
    result: { data: tagsData },
    query: { isLoading: tagsIsLoading },
  } = useMany<Tag>({
    resource: "tags",
    ids: tagIds,
    queryOptions: { enabled: tagIds.length > 0 },
  });

  useEffect(() => {
    reactTable.setOptions((prev) => ({
      ...prev,
      meta: { ...prev.meta, tagsData, tagsIsLoading },
    }));
  }, [reactTable, tagsData, tagsIsLoading]);

  return (
    <ListView>
      <ListViewHeader />
      <div className="flex flex-col flex-1 gap-4">
        <DataTableToolbar>
          <DataTableColumnVisibility table={reactTable} />
        </DataTableToolbar>
        {/* Provider batches category IDs into a single useMany call.
            Tags use manual useMany + table meta.
            "users" has no provider — DataTableCellRelation falls back to useOne. */}
        <DataTableCellRelationProvider resource="categories" ids={categoryIds}>
          <DataTableOverflowWrapper deps={[tableQuery.data?.data, pageSize]}>
            <DataTableLoadingOverlay loading={isFetching} />
            <DataTable>
              <DataTableHeader headerGroups={reactTable.getHeaderGroups()} />
              <DataTableBody
                rows={rows}
                leafColumns={reactTable.getAllLeafColumns()}
              >
                {isLoading ? (
                  <DataTableSkeleton
                    columns={reactTable.getAllLeafColumns()}
                    rowCount={pageSize}
                  />
                ) : rows.length === 0 ? (
                  <DataTableEmpty
                    columnCount={reactTable.getAllColumns().length}
                  />
                ) : null}
              </DataTableBody>
            </DataTable>
          </DataTableOverflowWrapper>
        </DataTableCellRelationProvider>
        {!isLoading && rows.length > 0 && (
          <DataTablePagination
            currentPage={currentPage}
            pageCount={pageCount}
            setCurrentPage={setCurrentPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            total={tableQuery.data?.total}
          />
        )}
      </div>
    </ListView>
  );
}
```

## Key Features

### Composable Structure

Each component has a single responsibility. You control what renders where — omit components you don't need, or insert custom elements between them. For example, you can add a search bar inside `DataTableToolbar`, or render custom content inside `DataTableEmpty`.

### Loading States

The DataTable supports three distinct loading states:

- **Initial load**: `DataTableSkeleton` renders placeholder rows while data is fetched for the first time.
- **Refetch**: `DataTableLoadingOverlay` shows a semi-transparent overlay with a spinner when data is being refetched (e.g., after changing filters or sorting). Existing data remains visible underneath.
- **Empty**: `DataTableEmpty` renders when the query returns zero results.

```tsx
<DataTableBody rows={rows} leafColumns={reactTable.getAllLeafColumns()}>
  {isLoading ? (
    <DataTableSkeleton
      columns={reactTable.getAllLeafColumns()}
      rowCount={pageSize}
    />
  ) : rows.length === 0 ? (
    <DataTableEmpty columnCount={reactTable.getAllColumns().length} />
  ) : null}
</DataTableBody>
```

When `children` is `null` (i.e., data is loaded and rows exist), `DataTableBody` automatically renders the rows.

### Column Sorting

Click any column header to sort by that field. The DataTable automatically handles the sorting state and sends the appropriate parameters to your data provider.

### Filtering Options

The DataTable supports several filter types:

- **Text filters**: Search within text columns
- **Numeric filters**: Range filtering for numbers
- **Dropdown filters**: Select from predefined options
- **Date filters**: Date range or single date selection

### Column Pinning

Pin columns to the left or right edge of the table so they remain visible during horizontal scrolling. Set this in your `useTable` call:

```tsx
const table = useTable<Post>({
  columns,
  initialState: {
    columnPinning: {
      left: [],
      right: ["actions"],
    },
  },
});
```

The `getCommonStyles` utility (exported from `data-table.tsx`) automatically handles sticky positioning and shadow effects for pinned columns.

### Column Visibility

Let users toggle column visibility with `DataTableColumnVisibility`:

```tsx
<DataTableToolbar>
  <DataTableColumnVisibility table={reactTable} />
</DataTableToolbar>
```

This renders a dropdown button listing all hideable columns with checkboxes.

## Adding Filters and Sorting

You can add different types of filters to your columns. Here are the most common ones:

### Text Search Filter

```tsx
import { DataTableFilterDropdownText } from "@/components/refine-ui/data-table/data-table-filter";
import { DataTableHeaderLabel } from "@/components/refine-ui/data-table/data-table-cell-helpers";

// In your column definition:
header: ({ column, table }) => (
  <DataTableHeaderLabel>
    <span>Title</span>
    <div>
      <DataTableFilterDropdownText
        defaultOperator="contains"
        column={column}
        table={table}
        placeholder="Filter by title"
      />
    </div>
  </DataTableHeaderLabel>
),
```

### Dropdown/Select Filter

```tsx
import { DataTableFilterCombobox } from "@/components/refine-ui/data-table/data-table-filter";
import { DataTableHeaderLabel } from "@/components/refine-ui/data-table/data-table-cell-helpers";

// In your column definition:
header: ({ column }) => (
  <DataTableHeaderLabel>
    <span>Status</span>
    <DataTableFilterCombobox
      column={column}
      defaultOperator="in"
      multiple={true}
      options={[
        { label: "Published", value: "published" },
        { label: "Draft", value: "draft" },
      ]}
    />
  </DataTableHeaderLabel>
),
```

### Numeric Range Filter

```tsx
import { DataTableFilterDropdownNumeric } from "@/components/refine-ui/data-table/data-table-filter";
import { DataTableSorter } from "@/components/refine-ui/data-table/data-table-sorter";
import { DataTableHeaderLabel } from "@/components/refine-ui/data-table/data-table-cell-helpers";

// In your column definition:
header: ({ column, table }) => (
  <DataTableHeaderLabel>
    <span>Price</span>
    <div>
      <DataTableSorter column={column} />
      <DataTableFilterDropdownNumeric
        defaultOperator="eq"
        column={column}
        table={table}
        placeholder="Filter by price"
      />
    </div>
  </DataTableHeaderLabel>
),
```

### Date Range Filter

```tsx
import { DataTableFilterDropdownDateRangePicker } from "@/components/refine-ui/data-table/data-table-filter";
import { DataTableHeaderLabel } from "@/components/refine-ui/data-table/data-table-cell-helpers";

// In your column definition:
header: ({ column }) => (
  <DataTableHeaderLabel>
    <span>Created</span>
    <DataTableFilterDropdownDateRangePicker
      column={column}
      formatDateRange={(dateRange) => {
        if (!dateRange?.from || !dateRange?.to) return undefined;
        return [
          dateRange.from.toISOString(),
          dateRange.to.toISOString(),
        ];
      }}
    />
  </DataTableHeaderLabel>
),
```

### Date Single Picker Filter

```tsx
import { DataTableFilterDropdownDateSinglePicker } from "@/components/refine-ui/data-table/data-table-filter";
import { DataTableHeaderLabel } from "@/components/refine-ui/data-table/data-table-cell-helpers";

// In your column definition:
header: ({ column }) => (
  <DataTableHeaderLabel>
    <span>Updated At</span>
    <DataTableFilterDropdownDateSinglePicker
      column={column}
      defaultOperator="eq"
      formatDate={(date) => {
        if (!date) return undefined;
        return date.toISOString().split("T")[0];
      }}
    />
  </DataTableHeaderLabel>
),
```

### Column Sorting

```tsx
import { DataTableSorter } from "@/components/refine-ui/data-table/data-table-sorter";
import { DataTableHeaderLabel } from "@/components/refine-ui/data-table/data-table-cell-helpers";

// In your column definition:
header: ({ column }) => (
  <DataTableHeaderLabel>
    <span>Column Name</span>
    <DataTableSorter column={column} />
  </DataTableHeaderLabel>
),
```

## Cell Helpers

Cell helpers are layout wrappers you use inside column definitions to keep cell content consistent.

### DataTableHeaderLabel

Wraps header content in a flex row with gap — use it for headers with sorters and filters:

```tsx
import { DataTableHeaderLabel } from "@/components/refine-ui/data-table/data-table-cell-helpers";

header: ({ column }) => (
  <DataTableHeaderLabel>
    <span>Title</span>
    <DataTableSorter column={column} />
  </DataTableHeaderLabel>
),
```

### DataTableCellTruncate

Truncates long text with ellipsis:

```tsx
import { DataTableCellTruncate } from "@/components/refine-ui/data-table/data-table-cell-helpers";

cell: ({ getValue }) => (
  <DataTableCellTruncate>{getValue<string>()}</DataTableCellTruncate>
),
```

### DataTableCellBadges

Renders a flex-wrap row of badges:

```tsx
import { DataTableCellBadges } from "@/components/refine-ui/data-table/data-table-cell-helpers";
import { Badge } from "@/components/ui/badge";

cell: ({ getValue }) => (
  <DataTableCellBadges>
    {getValue<string[]>().map((tag) => (
      <Badge key={tag}>{tag}</Badge>
    ))}
  </DataTableCellBadges>
),
```

### DataTableCellActions

Centers action buttons:

```tsx
import { DataTableCellActions } from "@/components/refine-ui/data-table/data-table-cell-helpers";

header: () => <DataTableCellActions>Actions</DataTableCellActions>,
```

## Value Renderers

Value renderers are typed components for common cell content patterns.

### DataTableCellStatus

Renders a status string as a Badge with variant mapping:

```tsx
import { DataTableCellStatus } from "@/components/refine-ui/data-table/data-table-cell-status";

cell: ({ getValue }) => (
  <DataTableCellStatus
    value={getValue<string>()}
    variants={{
      published: "default",
      draft: "outline",
      rejected: "destructive",
    }}
  />
),
```

If no variant is provided for a value, it defaults to `"default"`.

### DataTableCellDate

Formats dates with three modes:

```tsx
import { DataTableCellDate } from "@/components/refine-ui/data-table/data-table-cell-date";

// Absolute (default) — e.g., "Mar 17, 2026, 2:30 PM"
cell: ({ row }) => <DataTableCellDate value={row.original.createdAt} />,

// Relative — e.g., "3 days ago"
cell: ({ row }) => <DataTableCellDate value={row.original.createdAt} format="relative" />,

// Custom function
cell: ({ row }) => (
  <DataTableCellDate
    value={row.original.createdAt}
    format={(date) => date.toLocaleDateString()}
  />
),
```

### DataTableCellBoolean

Renders a boolean as a Check or X icon:

```tsx
import { DataTableCellBoolean } from "@/components/refine-ui/data-table/data-table-cell-boolean";

cell: ({ getValue }) => <DataTableCellBoolean value={getValue<boolean>()} />,
```

### DataTableCellNumber

Formats numbers using `Intl.NumberFormat`:

```tsx
import { DataTableCellNumber } from "@/components/refine-ui/data-table/data-table-cell-number";

// Plain number
cell: ({ getValue }) => <DataTableCellNumber value={getValue<number>()} />,

// Currency
cell: ({ getValue }) => (
  <DataTableCellNumber
    value={getValue<number>()}
    options={{ style: "currency", currency: "USD" }}
  />
),
```

### DataTableCellRelation

Resolves a foreign key to a display value. Without a provider, it calls `useOne()` per cell. For better performance, wrap with `DataTableCellRelationProvider` to batch IDs via `useMany`. Supports render function children for custom rendering.

```tsx
import { DataTableCellRelation } from "@/components/refine-ui/data-table/data-table-cell-relation";

cell: ({ getValue }) => (
  <DataTableCellRelation
    resource="categories"
    id={getValue<number>()}
    field="title"
  />
),
```

Shows a skeleton during loading and falls back to the raw ID on error.

#### Batch Loading with DataTableCellRelationProvider

For better performance, wrap your table with `DataTableCellRelationProvider` to batch all IDs into a single `useMany` request. The provider is keyed by resource name, so you can nest multiple providers for different resources:

```tsx
import {
  DataTableCellRelation,
  DataTableCellRelationProvider,
} from "@/components/refine-ui/data-table/data-table-cell-relation";

const categoryIds = useMemo(
  () => tableQuery.data?.data?.map((post) => post.category.id) ?? [],
  [tableQuery.data],
);

const tagIds = useMemo(
  () => tableQuery.data?.data?.flatMap((post) => post.tags) ?? [],
  [tableQuery.data],
);

// Nest providers for multiple resources
<DataTableCellRelationProvider resource="categories" ids={categoryIds}>
  <DataTableCellRelationProvider resource="tags" ids={tagIds}>
    <DataTableOverflowWrapper>
      <DataTable>{/* ... */}</DataTable>
    </DataTableOverflowWrapper>
  </DataTableCellRelationProvider>
</DataTableCellRelationProvider>;
```

Each `DataTableCellRelation` reads from the provider matching its `resource` prop. If no provider exists for a given resource, or if a specific ID isn't found in the provider's cache, it automatically falls back to `useOne()` per cell.

#### Custom Rendering with Children

Use render function children for full control over how the relation is displayed:

```tsx
cell: ({ getValue }) => (
  <DataTableCellRelation resource="categories" id={getValue<number>()}>
    {({ data, isLoading, isError }) => {
      if (isLoading) return <Skeleton className="h-4 w-20" />;
      if (isError || !data) return <span>Unknown</span>;
      return (
        <Badge variant="outline">{data.title}</Badge>
      );
    }}
  </DataTableCellRelation>
),
```

## Cursor Pagination

For APIs that use cursor-based pagination (e.g., GraphQL relay-style), use `DataTableCursorPagination` with cursor state passed via `meta`:

```tsx
import { useState, useCallback } from "react";
import { useTable } from "@refinedev/react-table";
import { DataTableCursorPagination } from "@/components/refine-ui/data-table/data-table-cursor-pagination";

type Cursor = { after: string } | { before: string } | Record<string, never>;

const [cursor, setCursor] = useState<Cursor>({});

const table = useTable({
  columns,
  refineCoreProps: {
    resource: "pull-requests",
    dataProviderName: "github",
    pagination: { pageSize: 10, mode: "off" },
    meta: { cursor },
  },
});

const {
  reactTable,
  refineCore: { tableQuery, pageSize, setPageSize },
} = table;

// Read pagination info from data provider's extra response fields
const hasNextPage = tableQuery.data?.hasNextPage ?? false;
const hasPreviousPage = tableQuery.data?.hasPreviousPage ?? false;
const cursorNext = tableQuery.data?.cursor?.next;
const cursorPrev = tableQuery.data?.cursor?.prev;

const onNext = useCallback(() => {
  if (cursorNext) setCursor({ after: cursorNext });
}, [cursorNext]);

const onPrevious = useCallback(() => {
  if (cursorPrev) setCursor({ before: cursorPrev });
}, [cursorPrev]);

// In JSX:
<DataTableCursorPagination
  hasNextPage={hasNextPage}
  hasPreviousPage={hasPreviousPage}
  onNext={onNext}
  onPrevious={onPrevious}
  isFetching={tableQuery.isFetching}
  pageSize={pageSize}
  setPageSize={setPageSize}
/>;
```

The data provider receives `meta.cursor` and uses it to pass the right query parameters (e.g., `after`/`before` for GraphQL). It returns `hasNextPage`, `hasPreviousPage`, and `cursor` as extra fields on the response.

> **Note:** The cursor shape in `meta` and the extra fields returned by the response are entirely data provider specific. The example above uses `{ after }` / `{ before }` because that's how GraphQL relay pagination works, but your data provider may use a different structure. `DataTableCursorPagination` is agnostic — it only cares about `hasNextPage`, `hasPreviousPage`, and the `onNext`/`onPrevious` callbacks you provide.

The `isFetching` prop disables the prev/next buttons during fetch. The page size selector is shown when `pageSize` and `setPageSize` are provided.

## Handling Relational Data

When your records contain references to other resources (e.g., a `category.id` foreign key), you need to fetch and display the related data. There are three approaches:

### DataTableCellRelationProvider (Recommended)

Wrap your table with `DataTableCellRelationProvider` to batch all IDs into a single `useMany` request. The provider is keyed by resource name — nest multiple providers for different resources:

```tsx
import {
  DataTableCellRelation,
  DataTableCellRelationProvider,
} from "@/components/refine-ui/data-table/data-table-cell-relation";

const categoryIds = useMemo(
  () => tableQuery.data?.data?.map((post) => post.category.id) ?? [],
  [tableQuery.data],
);

<DataTableCellRelationProvider resource="categories" ids={categoryIds}>
  {/* DataTable with DataTableCellRelation in column definitions */}
</DataTableCellRelationProvider>;
```

Then in your column definition:

```tsx
cell: ({ getValue }) => (
  <DataTableCellRelation resource="categories" id={getValue<number>()} field="title" />
),
```

Each cell reads from the provider matching its `resource`. If no provider exists for a resource, or if a specific ID isn't in the provider's data, it falls back to `useOne()` automatically.

### Manual Batch Loading with useMany

For more complex scenarios (e.g., multiple related resources, custom rendering), collect all foreign key IDs and fetch them via `useMany`. Pass the data to column renderers via table meta:

```tsx
const tagIds = useMemo(
  () => tableQuery.data?.data?.flatMap((post) => post.tags) ?? [],
  [tableQuery.data],
);

const {
  result: { data: tagsData },
} = useMany<Tag>({
  resource: "tags",
  ids: tagIds,
  queryOptions: { enabled: tagIds.length > 0 },
});

// Make the data available to cell renderers
useEffect(() => {
  reactTable.setOptions((prev) => ({
    ...prev,
    meta: { ...prev.meta, tagsData },
  }));
}, [reactTable, tagsData]);
```

Then access it in your cell renderer via `table.options.meta`.

### Per-Cell Loading (Fallback)

Without a provider, `DataTableCellRelation` automatically falls back to `useOne()` per cell. This is convenient for quick prototyping but makes one request per row:

```tsx
cell: ({ getValue }) => (
  <DataTableCellRelation resource="categories" id={getValue<number>()} field="title" />
),
```

### Custom Rendering with Children

Use render function children for full control over how the relation is displayed. This works with or without a provider:

```tsx
cell: ({ getValue }) => (
  <DataTableCellRelation resource="categories" id={getValue<number>()}>
    {({ data, isLoading, isError }) => {
      if (isLoading) return <Skeleton className="h-4 w-20" />;
      if (isError || !data) return <span>Unknown</span>;
      return <Badge variant="outline">{data.title}</Badge>;
    }}
  </DataTableCellRelation>
),
```

## Props

### DataTable

| Prop      | Type                            | Description                                              |
| --------- | ------------------------------- | -------------------------------------------------------- |
| className | `string`                        | Additional CSS classes                                   |
| children  | `ReactNode`                     | Table content (`DataTableHeader`, `DataTableBody`, etc.) |
| ...props  | `React.ComponentProps<"table">` | All standard HTML table attributes                       |

### DataTableOverflowWrapper

| Prop      | Type        | Description                                                            |
| --------- | ----------- | ---------------------------------------------------------------------- |
| children  | `ReactNode` | Content to render inside the scroll container                          |
| className | `string`    | Additional CSS classes                                                 |
| deps      | `unknown[]` | Dependencies that trigger overflow re-check (e.g., `[data, pageSize]`) |

### DataTableHeader

| Prop         | Type                   | Description                                       |
| ------------ | ---------------------- | ------------------------------------------------- |
| headerGroups | `HeaderGroup<TData>[]` | Header groups from `reactTable.getHeaderGroups()` |
| className    | `string`               | Additional CSS classes                            |

### DataTableBody

| Prop        | Type              | Description                                                                |
| ----------- | ----------------- | -------------------------------------------------------------------------- |
| rows        | `Row<TData>[]`    | Rows from `reactTable.getRowModel().rows`                                  |
| leafColumns | `Column<TData>[]` | Leaf columns from `reactTable.getAllLeafColumns()`                         |
| children    | `ReactNode`       | Override content (skeleton/empty). When `null`, rows render automatically. |
| className   | `string`          | Additional CSS classes                                                     |

### DataTableSkeleton

| Prop     | Type              | Description                          |
| -------- | ----------------- | ------------------------------------ |
| columns  | `Column<TData>[]` | Columns to render skeleton cells for |
| rowCount | `number`          | Number of skeleton rows to display   |

### DataTableEmpty

| Prop        | Type        | Description                                                             |
| ----------- | ----------- | ----------------------------------------------------------------------- |
| columnCount | `number`    | Number of columns (for `colSpan`)                                       |
| title       | `ReactNode` | Custom title (default: "No data to display")                            |
| description | `ReactNode` | Custom description (default: "This table is empty for the time being.") |
| children    | `ReactNode` | Fully custom empty state content                                        |

### DataTableLoadingOverlay

| Prop    | Type      | Description                 |
| ------- | --------- | --------------------------- |
| loading | `boolean` | Whether to show the overlay |

### DataTableToolbar

| Prop      | Type                          | Description                      |
| --------- | ----------------------------- | -------------------------------- |
| className | `string`                      | Additional CSS classes           |
| ...props  | `React.ComponentProps<"div">` | All standard HTML div attributes |

### DataTableColumnVisibility

| Prop  | Type                | Description                       |
| ----- | ------------------- | --------------------------------- |
| table | `ReactTable<TData>` | TanStack Table instance           |
| label | `string`            | Button label (default: "Columns") |

### DataTablePagination

| Prop           | Type                     | Description                                    |
| -------------- | ------------------------ | ---------------------------------------------- |
| currentPage    | `number`                 | Current page number                            |
| pageCount      | `number`                 | Total number of pages                          |
| setCurrentPage | `(page: number) => void` | Page change handler                            |
| pageSize       | `number`                 | Current page size                              |
| setPageSize    | `(size: number) => void` | Page size change handler                       |
| total          | `number`                 | Total number of rows (displayed as "X row(s)") |

### DataTableCursorPagination

| Prop            | Type                     | Description                                    |
| --------------- | ------------------------ | ---------------------------------------------- |
| hasNextPage     | `boolean`                | Whether a next page is available               |
| hasPreviousPage | `boolean`                | Whether a previous page is available           |
| onNext          | `() => void`             | Handler for "next page" button                 |
| onPrevious      | `() => void`             | Handler for "previous page" button             |
| isFetching      | `boolean`                | Disables buttons during fetch                  |
| pageSize        | `number`                 | Current page size (enables page size selector) |
| setPageSize     | `(size: number) => void` | Page size change handler                       |

### DataTableHeaderLabel

| Prop      | Type        | Description            |
| --------- | ----------- | ---------------------- |
| children  | `ReactNode` | Header content         |
| className | `string`    | Additional CSS classes |

### DataTableCellTruncate

| Prop      | Type        | Description              |
| --------- | ----------- | ------------------------ |
| children  | `ReactNode` | Cell content to truncate |
| className | `string`    | Additional CSS classes   |

### DataTableCellBadges

| Prop      | Type        | Description            |
| --------- | ----------- | ---------------------- |
| children  | `ReactNode` | Badge elements         |
| className | `string`    | Additional CSS classes |

### DataTableCellActions

| Prop      | Type        | Description            |
| --------- | ----------- | ---------------------- |
| children  | `ReactNode` | Action elements        |
| className | `string`    | Additional CSS classes |

### DataTableCellStatus

| Prop      | Type                           | Description                                                                                       |
| --------- | ------------------------------ | ------------------------------------------------------------------------------------------------- |
| value     | `string`                       | Status string to display                                                                          |
| variants  | `Record<string, BadgeVariant>` | Map of status values to badge variants (`"default"`, `"secondary"`, `"destructive"`, `"outline"`) |
| className | `string`                       | Additional CSS classes                                                                            |

### DataTableCellDate

| Prop      | Type                                                   | Description                             |
| --------- | ------------------------------------------------------ | --------------------------------------- |
| value     | `string \| number \| Date`                             | Date value to format                    |
| format    | `"relative" \| "absolute" \| ((date: Date) => string)` | Format mode (default: `"absolute"`)     |
| locale    | `string`                                               | Locale for formatting (e.g., `"en-US"`) |
| className | `string`                                               | Additional CSS classes                  |

### DataTableCellBoolean

| Prop      | Type      | Description              |
| --------- | --------- | ------------------------ |
| value     | `boolean` | Boolean value to display |
| className | `string`  | Additional CSS classes   |

### DataTableCellNumber

| Prop      | Type                       | Description                                                         |
| --------- | -------------------------- | ------------------------------------------------------------------- |
| value     | `number`                   | Number to format                                                    |
| options   | `Intl.NumberFormatOptions` | Formatting options (e.g., `{ style: "currency", currency: "USD" }`) |
| locale    | `string`                   | Locale for formatting                                               |
| className | `string`                   | Additional CSS classes                                              |

### DataTableCellRelationProvider

| Prop     | Type                      | Description                                                    |
| -------- | ------------------------- | -------------------------------------------------------------- |
| resource | `string`                  | Resource name to fetch from                                    |
| ids      | `(string \| number)[]`    | All IDs to batch-fetch via `useMany`                           |
| meta     | `Record<string, unknown>` | Additional meta passed to `useMany()`                          |
| children | `ReactNode`               | Table content that contains `DataTableCellRelation` components |

### DataTableCellRelation

| Prop      | Type                                                 | Description                                                         |
| --------- | ---------------------------------------------------- | ------------------------------------------------------------------- |
| resource  | `string`                                             | Resource name to fetch from                                         |
| id        | `string \| number`                                   | Record ID to look up                                                |
| field     | `string`                                             | Field to display from the fetched record (default: `"title"`)       |
| meta      | `Record<string, unknown>`                            | Additional meta passed to `useOne()` (only used without a provider) |
| className | `string`                                             | Additional CSS classes                                              |
| children  | `(props: { data, isLoading, isError }) => ReactNode` | Optional render function for custom rendering                       |

### DataTableSorter

| Prop   | Type            | Description                    |
| ------ | --------------- | ------------------------------ |
| column | `Column<TData>` | TanStack Table column instance |

### DataTableFilterDropdownText

| Prop            | Type              | Description                    |
| --------------- | ----------------- | ------------------------------ |
| column          | `Column<TData>`   | TanStack Table column instance |
| table           | `Table<TData>`    | TanStack Table instance        |
| defaultOperator | `CrudOperators`   | Default filter operator        |
| operators       | `CrudOperators[]` | Available filter operators     |
| placeholder     | `string`          | Placeholder text for the input |

### DataTableFilterCombobox

| Prop            | Type                                      | Description                        |
| --------------- | ----------------------------------------- | ---------------------------------- |
| column          | `Column<TData>`                           | TanStack Table column instance     |
| table           | `Table<TData>`                            | TanStack Table instance (optional) |
| options         | `Array<{ label: string; value: string }>` | Dropdown options                   |
| defaultOperator | `CrudOperators`                           | Default filter operator            |
| operators       | `CrudOperators[]`                         | Available filter operators         |
| placeholder     | `string`                                  | Placeholder text                   |
| noResultsText   | `string`                                  | Text when no results found         |
| multiple        | `boolean`                                 | Allow multiple selections          |

### DataTableFilterDropdownNumeric

| Prop            | Type              | Description                    |
| --------------- | ----------------- | ------------------------------ |
| column          | `Column<TData>`   | TanStack Table column instance |
| table           | `Table<TData>`    | TanStack Table instance        |
| defaultOperator | `CrudOperators`   | Default filter operator        |
| operators       | `CrudOperators[]` | Available filter operators     |
| placeholder     | `string`          | Placeholder text for the input |

### DataTableFilterDropdownDateRangePicker

| Prop            | Type                                                                                  | Description                                |
| --------------- | ------------------------------------------------------------------------------------- | ------------------------------------------ |
| column          | `Column<TData>`                                                                       | TanStack Table column instance             |
| defaultOperator | `CrudOperators`                                                                       | Default filter operator                    |
| formatDateRange | `(dateRange: { from: Date; to: Date } \| undefined) => [string, string] \| undefined` | Function to format the selected date range |

### DataTableFilterDropdownDateSinglePicker

| Prop            | Type                                               | Description                          |
| --------------- | -------------------------------------------------- | ------------------------------------ |
| column          | `Column<TData>`                                    | TanStack Table column instance       |
| defaultOperator | `CrudOperators`                                    | Default filter operator              |
| formatDate      | `(date: Date \| undefined) => string \| undefined` | Function to format the selected date |
