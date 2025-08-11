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
  status: string;
  category?: { id: number; title: string };
  createdAt: string;
};

type Category = {
  id: number;
  title: string;
};

export function PostsList() {
  const { data: categoriesData } = useList<Category>({
    resource: "categories",
  });
  const categories = categoriesData?.data ?? [];

  const columns = useMemo<ColumnDef<Post>[]>(
    () => [
      {
        id: "id",
        accessorKey: "id",
        size: 96,
        header: ({ column, table }) => (
          <div className="flex items-center gap-1">
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
          </div>
        ),
      },
      {
        id: "title",
        accessorKey: "title",
        size: 300,
        header: ({ column, table }) => (
          <div className="flex items-center gap-1">
            <span>Title</span>
            <div>
              <DataTableFilterDropdownText
                defaultOperator="contains"
                column={column}
                table={table}
                placeholder="Filter by title"
              />
            </div>
          </div>
        ),
      },
      {
        id: "status",
        accessorKey: "status",
        size: 140,
        header: ({ column, table }) => (
          <div className="flex items-center gap-1">
            <span>Status</span>
            <DataTableFilterCombobox
              column={column}
              table={table}
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
        id: "category",
        accessorKey: "category.title",
        size: 200,
        header: "Category",
        cell: ({ row }) => {
          return row.original.category?.title ?? "No Category";
        },
      },
      {
        id: "actions",
        size: 84,
        enableSorting: false,
        enableColumnFilter: false,
        header: () => (
          <div className="flex w-full items-center justify-center">Actions</div>
        ),
        cell: ({ row }) => {
          const post = row.original;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex size-8 border rounded-full text-muted-foreground data-[state=open]:bg-muted data-[state=open]:text-foreground mx-auto"
                >
                  <span className="sr-only">Open menu</span>
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
                  recordItemId={post.id}
                  className="justify-start"
                />
                <EditButton
                  variant="ghost"
                  size="sm"
                  recordItemId={post.id}
                  className="justify-start"
                />
                <DeleteButton
                  variant="ghost"
                  size="sm"
                  recordItemId={post.id}
                  className="justify-start"
                />
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [categories],
  );

  const table = useTable({
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
<div className="flex items-center gap-1">
Title
<DataTableFilterDropdownText
              column={column}
              table={table}
              placeholder="Search titles..."
            />
</div>
),
},
{
accessorKey: "status",
header: "Status",
},
{
id: "actions",
header: "Actions",
cell: ({ row }) => (
<div className="flex gap-2">
<EditButton recordItemId={row.original.id} />
<DeleteButton recordItemId={row.original.id} />
</div>
),
},
],
[],
);

const table = useTable({
columns,
refineCoreProps: {
resource: "posts",
},
});

return <DataTable table={table} />;
}

```

This example shows the essential features: sortable columns, text filtering, and action buttons. You can add more filter types and customize columns as needed for your specific data.
        header: "Description",
        accessorKey: "content",
        size: 400,
        enableSorting: false,
        enableColumnFilter: false,
      },
      {
        id: "category.id",
        accessorKey: "category.id", // Ensure this matches your data structure
        size: 200,
        header: ({ column }) => {
          return (
            <div className="flex items-center gap-1">
              <span>Category</span>
              <DataTableFilterCombobox
                column={column}
                defaultOperator="in"
                multiple={true}
                options={categories.map((item) => ({
                  label: item.title,
                  value: item.id.toString(),
                }))}
              />
            </div>
          );
        },
        cell: ({ getValue }) => {
          const categoryId = getValue<number>();
          const category = categories.find((item) => item.id === categoryId);
          return category?.title || "-";
        },
      },
      {
        id: "status",
        accessorKey: "status",
        size: 100,
        header: ({ column }) => {
          return (
            <div className="flex items-center gap-1">
              <span>Status</span>
              <DataTableFilterCombobox
                column={column}
                defaultOperator="in"
                multiple={true}
                options={[
                  { label: "Published", value: "published" },
                  { label: "Draft", value: "draft" },
                  { label: "Rejected", value: "rejected" },
                ]}
              />
            </div>
          );
        },
      },
      {
        id: "createdAt",
        accessorKey: "createdAt",
        size: 220,
        header: ({ column }) => {
          return (
            <div className="flex items-center gap-1">
              <span>Created At</span>
              <DataTableFilterDropdownDateRangePicker
                column={column}
                formatDateRange={(dateRange) => {
                  if (!dateRange?.from || !dateRange?.to) {
                    return undefined;
                  }
                  return [
                    dateRange.from.toISOString(),
                    dateRange.to.toISOString(),
                  ];
                }}
              />
            </div>
          );
        },
        cell: ({ row }) => {
          return <div>{row.original.createdAt}</div>;
        },
      },
      {
        id: "updatedAt", // If you have an updatedAt field
        accessorKey: "updatedAt", // Change to updatedAt if available
        size: 220,
        header: ({ column }) => {
          return (
            <div className="flex items-center gap-1">
              <span>Updated At</span>
              <DataTableFilterDropdownDateSinglePicker
                column={column}
                defaultOperator="eq"
                formatDate={(date) => {
                  if (!date) return undefined;
                  return date.toISOString().split("T")[0];
                }}
              />
            </div>
          );
        },
        cell: ({ row }) => {
          return <div>{row.original.createdAt}</div>;
        },
      },
      {
        id: "actions",
        size: 84,
        enableSorting: false,
        enableColumnFilter: false,
        header: () => {
          return (
            <div
              className={cn("flex", "w-full", "items-center", "justify-center")}
            >
              Actions
            </div>
          );
        },
        cell: ({ row }) => {
          const post = row.original;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "flex",
                    "size-8",
                    "border",
                    "rounded-full",
                    "text-muted-foreground",
                    "data-[state=open]:bg-muted",
                    "data-[state=open]:text-foreground",
                    "mx-auto",
                  )}
                >
                  <span className="sr-only">Open menu</span>
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
                  className="w-full items-center justify-start"
                  resource="posts"
                  recordItemId={post.id}
                />
                <EditButton
                  variant="ghost"
                  size="sm"
                  className="w-full items-center justify-start"
                  resource="posts"
                  recordItemId={post.id}
                />
                <DeleteButton
                  // add key for each button for popover to work
                  key={post.id}
                  size="sm"
                  className="w-full items-center justify-start"
                  resource="posts"
                  recordItemId={post.id}
                />
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [categories],
  );

  const table = useTable<Post>({
    // Replace Post with your data type
    columns,
    refineCoreProps: {
      // Pass Refine core props for filtering, sorting, pagination
      // Example: filters, sorters, pagination controlled by Refine
    },
    // TanStack Table options can be passed here
    initialState: {
      columnPinning: {
        left: [],
        right: ["actions"], // Pin actions column to the right
      },
    },
  });

  return (
    <ListView>
      <ListViewHeader canCreate={true} />
      <DataTable table={table} />
    </ListView>
  );
}
```

## Handling Relational Data

When your main data records (e.g., `posts`) contain references to other resources (e.g., a `category` with an `id`), you often need to fetch and display details from these related resources.

The `@refinedev/core` package provides the `useMany` hook, which is ideal for this scenario. You can collect all the foreign key IDs (e.g., `category.id` from all posts in the current table view) and pass them to `useMany` to fetch all related categories in a single request.

The recommended way to make this related data available to your column cell renderers is by using the `setOptions` function returned by `useTable` (from `@refinedev/react-table`) to add the fetched data to the table's `meta` object.

**Steps:**

## Adding Filters and Sorting

You can add different types of filters to your columns. Here are the most common ones:

### Text Search Filter

```tsx
import { DataTableFilterDropdownText } from "@/components/refine-ui/data-table/data-table-filter";

{
  accessorKey: "title",
  header: ({ column, table }) => (
    <div className="flex items-center gap-1">
      Title
      <DataTableFilterDropdownText
        column={column}
        table={table}
        placeholder="Search titles..."
      />
    </div>
  ),
}
```

### Number Filter

```tsx
import { DataTableFilterDropdownNumeric } from "@/components/refine-ui/data-table/data-table-filter";

{
  accessorKey: "price",
  header: ({ column, table }) => (
    <div className="flex items-center gap-1">
      Price
      <DataTableFilterDropdownNumeric
        column={column}
        table={table}
        placeholder="Filter by price"
      />
    </div>
  ),
}
```

### Dropdown Select Filter

```tsx
import { DataTableFilterCombobox } from "@/components/refine-ui/data-table/data-table-filter";

{
  accessorKey: "status",
  header: ({ column, table }) => (
    <div className="flex items-center gap-1">
      Status
      <DataTableFilterCombobox
        column={column}
        table={table}
        options={[
          { label: "Published", value: "published" },
          { label: "Draft", value: "draft" },
        ]}
      />
    </div>
  ),
}
```

## Pagination

The DataTable automatically includes pagination when you use it with the `useTable` hook. You can customize the page size:

```tsx
const table = useTable({
  columns,
  refineCoreProps: {
    resource: "posts",
    pagination: {
      pageSize: 20, // Show 20 items per page
    },
  },
});
```

Props

| Prop          | Type                     | Description                         |
| ------------- | ------------------------ | ----------------------------------- |
| `current`     | `number`                 | Current page number (1-based)       |
| `pageCount`   | `number`                 | Total number of pages               |
| `setCurrent`  | `(page: number) => void` | Function to change the current page |
| `pageSize`    | `number`                 | Number of rows per page             |
| `setPageSize` | `(size: number) => void` | Function to change the page size    |
| `total`       | `number` (optional)      | Total number of rows in the dataset |

You can also use `DataTablePagination` independently with your own pagination state:

```tsx
import { useState } from "react";
import { DataTablePagination } from "@/components/refine-ui/data-table/data-table-pagination";

export function MyPaginatedList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Your data fetching logic here
  const currentPage = 1;
  const pageSize = 10;
  const total = 100;
  const pageCount = Math.ceil(total / pageSize);

  return (
    <div>
      {/* Your data display component */}

      <DataTablePagination
        current={currentPage}
        pageCount={pageCount}
        setCurrent={setCurrentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        total={total}
      />
    </div>
  );
}
```

## DataTableFilterDropdownText

Text filtering for data tables. Filter table by text fields with useTable hook. Supports contains, equals, startswith, endswith operators. Perfect for filtering by title, name, or description columns.

```tsx
import { DataTableFilterDropdownText } from "@/components/refine-ui/data-table/data-table-filter";

// In your TanStack Table column definition
{
  id: "title",
  accessorKey: "title",
  header: ({ column, table }) => {
    return (
      <div className="flex items-center gap-1">
        <span>Title</span>
        <DataTableFilterDropdownText
          defaultOperator="contains"
          column={column}
          table={table}
          placeholder="Filter by title"
          operators={["eq", "ne", "contains", "ncontains", "startswith", "endswith"]}
        />
      </div>
    );
  },
}
```

## DataTableFilterDropdownNumeric

Numeric filtering for data tables. Filter table by numbers with useTable hook. Supports equals, greater than, less than operators. Perfect for filtering by ID, price, or quantity columns.

```tsx
import { DataTableFilterDropdownNumeric } from "@/components/refine-ui/data-table/data-table-filter";

// In your TanStack Table column definition
{
  id: "id",
  accessorKey: "id",
  header: ({ column, table }) => {
    return (
      <div className="flex items-center gap-1">
        <span>ID</span>
        <DataTableFilterDropdownNumeric
          defaultOperator="eq"
          column={column}
          table={table}
          placeholder="Filter by ID"
          operators={["eq", "ne", "gt", "lt", "gte", "lte"]}
        />
      </div>
    );
  },
}
```

## DataTableFilterCombobox

Select filtering for data tables. Filter table by predefined options with useTable hook. Supports single and multiple selection. Perfect for filtering by status, category, or tags columns.

```tsx
import { DataTableFilterCombobox } from "@/components/refine-ui/data-table/data-table-filter";

// Single selection
{
  id: "status",
  accessorKey: "status",
  header: ({ column }) => {
    return (
      <div className="flex items-center gap-1">
        <span>Status</span>
        <DataTableFilterCombobox
          column={column}
          defaultOperator="eq"
          multiple={false}
          options={[
            { label: "Published", value: "published" },
            { label: "Draft", value: "draft" },
            { label: "Rejected", value: "rejected" },
          ]}
        />
      </div>
    );
  },
}

// Multiple selection
{
  id: "category.id",
  accessorKey: "category.id",
  header: ({ column }) => {
    return (
      <div className="flex items-center gap-1">
        <span>Category</span>
        <DataTableFilterCombobox
          column={column}
          defaultOperator="in"
          multiple={true}
          options={categories.map((item) => ({
            label: item.title,
            value: item.id.toString(),
          }))}
        />
      </div>
## API Reference

### DataTable

| Prop    | Type                        | Description                                    |
| ------- | --------------------------- | ---------------------------------------------- |
| `table` | `Table<TData>`              | TanStack Table instance from `useTable` hook  |

### Filter Components

All filter components accept these common props:

| Prop          | Type                   | Description                               |
| ------------- | ---------------------- | ----------------------------------------- |
| `column`      | `Column<TData>`        | TanStack Table column instance            |
| `table`       | `Table<TData>`         | TanStack Table instance                   |
| `placeholder` | `string`               | Placeholder text for the filter input    |

### Available Filter Types

- `DataTableFilterDropdownText` - Text search filter
- `DataTableFilterDropdownNumeric` - Number range filter
- `DataTableFilterCombobox` - Dropdown select filter
- `DataTableFilterDropdownDateSinglePicker` - Single date picker
- `DataTableFilterDropdownDateRangePicker` - Date range picker
- `DataTableSorter` - Column sorting button
```
