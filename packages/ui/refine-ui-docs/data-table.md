# Refine DataTable Component

## Purpose & Overview

The `DataTable` component and its associated sub-components (`DataTableSorter`, `DataTableFilterDropdown*`, `DataTablePagination`) provide a powerful and flexible solution for displaying and managing tabular data in Refine applications. It's built on top of TanStack Table and integrates seamlessly with Refine's data hooks and shadcn/ui components.

**When to use:**

- Displaying lists of resources (e.g., posts, products, users) in a table format.
- When you need features like sorting, filtering (text, numeric, date, combobox), and pagination.
- To create a consistent and accessible data table experience.

## Installation

Install the `data-table` component package via shadcn/ui registry:

```bash
npx shadcn@latest add https://ui.refine.dev/r/data-table.json
```

This command will install the `DataTable` main component and all its sub-components for filtering, sorting, and pagination.

- **Dependencies** (npm packages):
  - `@refinedev/core`
  - `@refinedev/react-table`
  - `@tanstack/react-table`
  - `react-day-picker`
  - `lucide-react`
- **Registry Dependencies** (other shadcn/ui or Refine UI components):
  - `table`
  - `button`
  - `input`
  - `badge`
  - `popover`
  - `command`
  - `separator`
  - `calendar`
  - `select`

**Note:** The CLI will automatically install required npm dependencies.

## Core Component: `DataTable`

The main component that renders the table structure.

### `DataTable` Props

| Prop    | Type                                                                   | Required | Description                                                                                                                                            |
| ------- | ---------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `table` | `UseTableReturnType<TData, HttpError>` (from `@refinedev/react-table`) | Yes      | The TanStack Table instance, typically obtained from Refine's `useTable` hook. This object contains all the necessary state and methods for the table. |

## Sub-Components

These components are typically used within the `header` a or `footer` of your `ColumnDef` in TanStack Table.

### 1. `DataTableSorter`

Provides a button to sort a column.

**Component:** `DataTableSorter` from `@/components/refine-ui/data-table/data-table-sorter`

**Props:**

| Prop     | Type                                      | Required | Description                                           |
| -------- | ----------------------------------------- | -------- | ----------------------------------------------------- |
| `column` | `Column<TData, unknown>` (TanStack Table) | Yes      | The column instance from TanStack Table to be sorted. |

### 2. Filter Components (`DataTableFilterDropdown*`)

These components provide various UI elements for filtering column data. They are found in `data-table-filter.tsx`.

**Common Props for Filter Dropdowns:**

| Prop              | Type                                      | Required | Description                                                                                             |
| ----------------- | ----------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------- |
| `column`          | `Column<TData, unknown>` (TanStack Table) | Yes      | The column instance to apply the filter to.                                                             |
| `table`           | `Table<TData>` (TanStack Table)           | Yes      | The table instance.                                                                                     |
| `defaultOperator` | `string`                                  | Yes      | The default filter operator (e.g., `eq`, `contains`, `in`, `gte`, `lte`). Specific to each filter type. |
| `placeholder`     | `string`                                  | No       | Placeholder text for the input/select field.                                                            |

**Available Filter Components:**

- **`DataTableFilterDropdownText`**: For text-based filtering (e.g., contains, equals, startsWith).
  - `defaultOperator` examples: `"contains"`, `"eq"`, `"startsWith"`, `"endsWith"`, `"empty"`, `"notEmpty"`
- **`DataTableFilterDropdownNumeric`**: For numeric filtering (e.g., equals, greater than, less than).
  - `defaultOperator` examples: `"eq"`, `"ne"`, `"gt"`, `"gte"`, `"lt"`, `"lte"`, `"empty"`, `"notEmpty"`
- **`DataTableFilterDropdownDateSinglePicker`**: For filtering by a single date.
  - `formatDate?: (date: Date | undefined) => string | number | undefined;`
  - `defaultOperator` examples: `"eq"`, `"ne"`, `"gt"`, `"gte"`, `"lt"`, `"lte"`
- **`DataTableFilterDropdownDateRangePicker`**: For filtering by a date range.
  - `formatDateRange?: (dateRange: { from?: Date; to?: Date } | undefined) => [string, string] | [number, number] | undefined;`
- **`DataTableFilterCombobox`**: For filtering based on a selection from a list of options (single or multiple).
  - `options: Array<{ label: string; value: string; icon?: React.ComponentType<{ className?: string }> }>` (Required)
  - `multiple?: boolean` (Default: `false`)
  - `defaultOperator` examples: `"in"`, `"eq"` (for single select)

### 3. `DataTablePagination`

Provides pagination controls for the table.

**Component:** `DataTablePagination` from `@/components/refine-ui/data-table/data-table-pagination`

**Props:**

| Prop        | Type                                 | Required | Description                                          |
| ----------- | ------------------------------------ | -------- | ---------------------------------------------------- |
| `table`     | `Table<TData>` (from TanStack Table) | Yes      | The TanStack Table instance.                         |
| `className` | `string`                             | No       | Additional CSS classes for the pagination container. |

## Usage Example

This example demonstrates how to use `DataTable` with sorting, various filters, and pagination within a Refine list page.

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
  DataTableFilterDropdownDateRangePicker,
  DataTableFilterDropdownDateSinglePicker,
  DataTableFilterDropdownNumeric,
} from "@/components/refine-ui/data-table/data-table-filter";
import { EditButton } from "@/components/refine-ui/buttons/edit";
import { DeleteButton } from "@/components/refine-ui/buttons/delete";
import {
  ListViewHeader,
  ListView,
} from "@/components/refine-ui/views/list-view";
import { ShowButton } from "@/components/refine-ui/buttons/show";
import { cn } from "@/lib/utils";
import type { Post, Category } from "../../types/resources"; // Define your types

export function PostsListPage() {
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
        header: ({ column, table }) => {
          return (
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
          );
        },
      },
      {
        id: "title",
        accessorKey: "title",
        size: 300,
        header: ({ column, table }) => {
          // Added table prop for filter
          return (
            <div className="flex items-center gap-1">
              <span>Title</span>
              <div>
                <DataTableFilterDropdownText
                  defaultOperator="contains"
                  column={column}
                  table={table} // Pass table instance
                  placeholder="Filter by title"
                />
              </div>
            </div>
          );
        },
      },
      {
        id: "description",
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

1.  **Initialize `useTable`**: Get `setOptions` and `tableQuery` from `useTable`.

    ```tsx
    const {
      // ... other properties
      setOptions,
      refineCore: {
        tableQuery: { data: tableData },
      },
    } = useTable<IPost, HttpError>({
      columns,
      // ...other useTable options
    });
    ```

2.  **Extract Foreign Keys**: From `tableData` (the array of posts), map over them to get an array of unique IDs for the categories.

    ```tsx
    const categoryIds = React.useMemo(
      () =>
        tableData?.data?.map((post) => post.category.id).filter(Boolean) ?? [],
      [tableData?.data],
    );
    ```

3.  **Fetch Relational Data with `useMany`**: Use the extracted `categoryIds` and the "categories" resource name.

    ```tsx
    // Assuming ICategory is your related data type
    const { data: categoriesData, isLoading: categoriesIsLoading } =
      useMany<ICategory>({
        resource: "categories",
        ids: categoryIds,
        queryOptions: {
          enabled: categoryIds.length > 0,
        },
      });
    ```

4.  **Set Table Meta Options**: Use `setOptions` to add the `categoriesData` to `table.options.meta`.

    ```tsx
    React.useEffect(() => {
      setOptions((prev) => ({
        ...prev,
        meta: {
          ...prev.meta,
          categoriesData: categoriesData,
          categoriesIsLoading: categoriesIsLoading,
        },
      }));
    }, [setOptions, categoriesData, categoriesIsLoading]);
    ```

5.  **Render in Cell**: In your `ColumnDef`, within the `cell` render function, access the category data from `table.options.meta`.

    ```tsx
    // ... inside columns definition for TanStack Table
    {
      accessorKey: "category.id", // Accessor for the foreign key in your Post data
      header: "Category",
      cell: function render({ getValue, table }) {
        const meta = table.options.meta as {
          categoriesData: GetManyResponse<ICategory> | undefined;
          categoriesIsLoading: boolean
        };

        const categoryId = getValue<number>();

        if (meta?.categoriesIsLoading) return "Loading category...";

        const category = meta?.categoriesData?.data?.find(item => item.id === categoryId);
        return category?.title ?? "N/A"; // Display category title
      },
    }
    // ...
    ```

This approach efficiently batches the fetching of related data and correctly passes it to the cell rendering context via the table's meta options.

Refer to the [Refine `useMany` hook documentation](https://refine.dev/docs/data/hooks/use-many/) and the [Refine `useTable` with TanStack Table for relational data](https://refine.dev/docs/packages/tanstack-table/use-table/#how-can-i-handle-relational-data) for more details.

## Features

- **Built on TanStack Table**: Leverages the power and flexibility of TanStack Table v8.
- **Refine Integration**: Works seamlessly with `@refinedev/react-table` adapter and `useTable` hook for data fetching, filtering, sorting, and pagination state management.
- **Comprehensive Filtering**: Multiple filter types (text, numeric, date, combobox) with customizable operators.
- **Sorting**: Easy-to-use sorter component for column headers.
- **Pagination**: Includes a pagination component with page navigation and page size selection.
- **shadcn/ui Styling**: All components are styled using shadcn/ui primitives, ensuring consistency with your UI.
- **Customizable Column Definitions**: Define columns using TanStack Table's `ColumnDef` API, allowing for custom cell rendering, header components, and more.
- **Sticky Header/Columns**: Optional props for sticky table header and actions column.
- **Action Buttons**: The "actions" column in the example uses `DropdownMenu` with `ShowButton`, `EditButton`, and `DeleteButton` from the Refine UI `buttons` package. You can customize these as needed.
