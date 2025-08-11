# DataTable

When you're building admin dashboards, you'll frequently need to display lists of data - whether it's posts, users, products, or any other resource. The `DataTable` component handles all the common table functionality you need: sorting columns, filtering data, pagination, and action buttons.

Built on TanStack Table, it integrates directly with Refine's data fetching hooks, so you get features like server-side sorting and filtering without extra configuration.

## Installation

Add the DataTable components to your project:

```bash
npx shadcn@latest add https://ui.refine.dev/r/data-table.json
```

This installs the main `DataTable` component plus all the filtering, sorting, and pagination components you'll need. The CLI will automatically install the required dependencies like `@tanstack/react-table` and `react-day-picker`.

## Usage

Here's a comprehensive example showing how to create a data table with filtering, sorting, and pagination:

```tsx
import { useMemo } from "react";
import { useTable } from "@refinedev/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import { useList } from "@refinedev/core";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { DataTable } from "@/components/refine-ui/data-table/data-table";
import { DataTableSorter } from "@/components/refine-ui/data-table/data-table-sorter";
import {
  DataTableFilterDropdownText,
  DataTableFilterCombobox,
  DataTableFilterDropdownNumeric,
} from "@/components/refine-ui/data-table/data-table-filter";
import {
  EditButton,
  DeleteButton,
  ShowButton,
} from "@/components/refine-ui/buttons";
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
  createdAt: string;
};

export default function PostList() {
  const { data: categories } = useList({
    resource: "categories",
  });

  const columns = useMemo<ColumnDef<Post>[]>(
    () => [
      {
        id: "id",
        accessorKey: "id",
        size: 80,
        header: ({ column }) => (
          <DataTableSorter column={column}>ID</DataTableSorter>
        ),
        cell: ({ getValue }) => getValue(),
      },
      {
        id: "title",
        accessorKey: "title",
        size: 300,
        header: ({ column }) => (
          <div className="flex items-center gap-1">
            <DataTableSorter column={column}>Title</DataTableSorter>
            <DataTableFilterDropdownText column={column} />
          </div>
        ),
      },
      {
        id: "status",
        accessorKey: "status",
        size: 120,
        header: ({ column }) => (
          <div className="flex items-center gap-1">
            <span>Status</span>
            <DataTableFilterCombobox
              column={column}
              options={[
                { label: "Published", value: "published" },
                { label: "Draft", value: "draft" },
                { label: "Rejected", value: "rejected" },
              ]}
            />
          </div>
        ),
      },
      {
        id: "actions",
        size: 100,
        enableSorting: false,
        enableColumnFilter: false,
        header: "Actions",
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <ShowButton hideText size="sm" recordItemId={row.original.id} />
              <EditButton hideText size="sm" recordItemId={row.original.id} />
              <DeleteButton hideText size="sm" recordItemId={row.original.id} />
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [categories],
  );

  const table = useTable<Post>({
    columns,
    refineCoreProps: {
      resource: "posts",
    },
  });

  return (
    <ListView>
      <ListViewHeader title="Posts" />
      <DataTable table={table} />
    </ListView>
  );
}
```

This example demonstrates the key features: sortable columns, multiple filter types (text, numeric, dropdown), and action buttons in a dropdown menu.

## Key Features

### Column Sorting

Click any column header to sort by that field. The DataTable automatically handles the sorting state and sends the appropriate parameters to your data provider.

### Filtering Options

The DataTable supports several filter types:

- **Text filters**: Search within text columns
- **Numeric filters**: Range filtering for numbers
- **Dropdown filters**: Select from predefined options
- **Date filters**: Date range selection

### Action Buttons

Add action buttons for each row using the dropdown menu pattern shown above.

## Component Structure

The DataTable is built from several focused components:

- **DataTable**: Main table component that handles rendering
- **DataTableSorter**: Column header sorting controls
- **DataTableFilter**: Various filter components for different data types
- **DataTablePagination**: Pagination controls

## Handling Relational Data

When your main data records (e.g., `posts`) contain references to other resources (e.g., a `category` with an `id`), you often need to fetch and display details from these related resources.

The `@refinedev/core` package provides the `useMany` hook, which is ideal for this scenario. You can collect all the foreign key IDs (e.g., `category.id` from all posts in the current table view) and pass them to `useMany` to fetch all related categories in a single request.

The recommended way to make this related data available to your column cell renderers is by using the `setOptions` function returned by `useTable` (from `@refinedev/react-table`) to add the fetched data to the table's `meta` object.

## Adding Filters and Sorting

You can add different types of filters to your columns. Here are the most common ones:

### Text Search Filter

```tsx
import { DataTableFilterDropdownText } from "@/components/refine-ui/data-table/data-table-filter";

// In your column definition:
header: ({ column }) => (
  <div className="flex items-center gap-1">
    <DataTableSorter column={column}>Title</DataTableSorter>
    <DataTableFilterDropdownText column={column} />
  </div>
),
```

### Dropdown/Select Filter

```tsx
import { DataTableFilterCombobox } from "@/components/refine-ui/data-table/data-table-filter";

// In your column definition:
header: ({ column }) => (
  <div className="flex items-center gap-1">
    <span>Status</span>
    <DataTableFilterCombobox
      column={column}
      options={[
        { label: "Published", value: "published" },
        { label: "Draft", value: "draft" },
      ]}
    />
  </div>
),
```

### Numeric Range Filter

```tsx
import { DataTableFilterDropdownNumeric } from "@/components/refine-ui/data-table/data-table-filter";

// In your column definition:
header: ({ column }) => (
  <div className="flex items-center gap-1">
    <DataTableSorter column={column}>Price</DataTableSorter>
    <DataTableFilterDropdownNumeric column={column} />
  </div>
),
```

### Date Range Filter

```tsx
import { DataTableFilterDropdownDateRangePicker } from "@/components/refine-ui/data-table/data-table-filter";

// In your column definition:
header: ({ column }) => (
  <div className="flex items-center gap-1">
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
  </div>
),
```

### Column Sorting

```tsx
import { DataTableSorter } from "@/components/refine-ui/data-table/data-table-sorter";

// In your column definition:
header: ({ column }) => (
  <DataTableSorter column={column}>Column Name</DataTableSorter>
),
```

## Props

### DataTable

| Prop  | Type           | Description                                  |
| ----- | -------------- | -------------------------------------------- |
| table | `Table<TData>` | TanStack Table instance from `useTable` hook |

### DataTableSorter

| Prop     | Type              | Description                              |
| -------- | ----------------- | ---------------------------------------- |
| column   | `Column<TData>`   | TanStack Table column instance           |
| children | `React.ReactNode` | Content to display (usually column name) |

### DataTableFilterDropdownText

| Prop   | Type            | Description                    |
| ------ | --------------- | ------------------------------ |
| column | `Column<TData>` | TanStack Table column instance |

### DataTableFilterCombobox

| Prop     | Type                                      | Description                    |
| -------- | ----------------------------------------- | ------------------------------ |
| column   | `Column<TData>`                           | TanStack Table column instance |
| options  | `Array<{ label: string; value: string }>` | Dropdown options               |
| multiple | `boolean`                                 | Allow multiple selections      |

### DataTableFilterDropdownNumeric

| Prop   | Type            | Description                    |
| ------ | --------------- | ------------------------------ |
| column | `Column<TData>` | TanStack Table column instance |

## Examples

### Basic Data Table

The most common use case - displaying a list of resources with basic sorting and filtering:

```tsx
export default function UserList() {
  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        id: "name",
        accessorKey: "name",
        header: ({ column }) => (
          <div className="flex items-center gap-1">
            <DataTableSorter column={column}>Name</DataTableSorter>
            <DataTableFilterDropdownText column={column} />
          </div>
        ),
      },
      {
        id: "email",
        accessorKey: "email",
        header: ({ column }) => (
          <div className="flex items-center gap-1">
            <DataTableSorter column={column}>Email</DataTableSorter>
            <DataTableFilterDropdownText column={column} />
          </div>
        ),
      },
    ],
    [],
  );

  const table = useTable<User>({ columns });

  return (
    <ListView>
      <ListViewHeader title="Users" />
      <DataTable table={table} />
    </ListView>
  );
}
```

### Advanced Filtering Example

Using multiple filter types and relational data:

```tsx
export default function ProductList() {
  const { data: categories } = useList({ resource: "categories" });

  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      {
        id: "name",
        accessorKey: "name",
        header: ({ column }) => (
          <div className="flex items-center gap-1">
            <DataTableSorter column={column}>Product</DataTableSorter>
            <DataTableFilterDropdownText column={column} />
          </div>
        ),
      },
      {
        id: "price",
        accessorKey: "price",
        header: ({ column }) => (
          <div className="flex items-center gap-1">
            <DataTableSorter column={column}>Price</DataTableSorter>
            <DataTableFilterDropdownNumeric column={column} />
          </div>
        ),
        cell: ({ getValue }) => `$${getValue()}`,
      },
      {
        id: "category",
        accessorKey: "category.id",
        header: ({ column }) => (
          <div className="flex items-center gap-1">
            <span>Category</span>
            <DataTableFilterCombobox
              column={column}
              options={
                categories?.map((cat) => ({
                  label: cat.name,
                  value: cat.id.toString(),
                })) || []
              }
            />
          </div>
        ),
        cell: ({ row }) => {
          const categoryId = row.original.category?.id;
          const category = categories?.find((c) => c.id === categoryId);
          return category?.name || "-";
        },
      },
    ],
    [categories],
  );

  const table = useTable<Product>({ columns });

  return (
    <ListView>
      <ListViewHeader title="Products" />
      <DataTable table={table} />
    </ListView>
  );
}
```
