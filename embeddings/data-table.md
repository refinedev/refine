# Refine DataTable Component

The DataTable is a set of composable primitives for displaying and managing tabular data in Refine applications. Instead of a single monolithic component, you compose structural pieces together — giving you full control over layout, loading UX, and cell rendering. Built on TanStack Table, it integrates seamlessly with Refine's data hooks and shadcn/ui components.

Features:

- **Composable Architecture**: Assemble structural primitives (`DataTable`, `DataTableHeader`, `DataTableBody`, `DataTableOverflowWrapper`) to control layout.
- **Built on TanStack Table**: Leverages TanStack Table v8 for column definitions, sorting, filtering, and row models.
- **Refine Integration**: Works with `@refinedev/react-table` adapter and `useTable` hook for data fetching, filtering, sorting, and pagination state management.
- **Loading States**: Three distinct states — skeleton (initial load), loading overlay (refetch), and empty state (no data).
- **Comprehensive Filtering**: Multiple filter types (text, numeric, date, combobox) with customizable operators.
- **Sorting**: Easy-to-use sorter component for column headers.
- **Pagination**: Page-based and cursor-based pagination components.
- **Column Pinning**: Sticky columns with automatic shadow effects on horizontal overflow.
- **Column Visibility**: Dropdown to show/hide columns.
- **Cell Helpers**: Layout wrappers for headers (`DataTableHeaderLabel`), truncated text (`DataTableCellTruncate`), badge lists (`DataTableCellBadges`), and action buttons (`DataTableCellActions`).
- **Value Renderers**: Typed cell components for status badges, dates, booleans, numbers, and relational data.
- **Relation Provider**: `DataTableCellRelationProvider` batches foreign key lookups into a single `useMany` call. `DataTableCellRelation` reads from the provider or falls back to `useOne` per cell.

**When to use:**

- Displaying lists of resources (e.g., posts, products, users) in a table format.
- When you need features like sorting, filtering (text, numeric, date, combobox), and pagination.
- To create a consistent and accessible data table experience.

## Installation

Install the `data-table` component package via shadcn/ui registry:

```bash
npx shadcn@latest add https://ui.refine.dev/r/data-table.json
```

This installs all structural primitives, cell helpers, value renderers, filtering, sorting, and pagination components.

- **Dependencies** (npm packages):
  - `@refinedev/core`
  - `@tanstack/react-table`
  - `react-day-picker`
  - `lucide-react`
- **Registry Dependencies** (other shadcn/ui or Refine UI components):
  - `table`, `button`, `input`, `badge`, `popover`, `command`, `separator`, `calendar`, `select`, `skeleton`, `dropdown-menu`

**Note:** The CLI will automatically install required npm dependencies.

After installation, you will have the following files in your project:

```
src/components/refine-ui/
├── data-table/
│   ├── data-table.tsx                  # Thin <table> wrapper + getCommonStyles
│   ├── data-table-overflow-wrapper.tsx # Scroll container with overflow detection
│   ├── data-table-header.tsx           # Renders <TableHeader> from header groups
│   ├── data-table-body.tsx             # Renders <TableBody> from row model
│   ├── data-table-skeleton.tsx         # Skeleton loading rows
│   ├── data-table-empty.tsx            # Empty state
│   ├── data-table-loading-overlay.tsx  # Refetch overlay spinner
│   ├── data-table-toolbar.tsx          # Flex wrapper for toolbar items
│   ├── data-table-column-visibility.tsx # Column visibility dropdown
│   ├── data-table-pagination.tsx       # Page-based pagination
│   ├── data-table-cursor-pagination.tsx # Cursor-based pagination
│   ├── data-table-sorter.tsx           # Column sorting toggle
│   ├── data-table-filter.tsx           # All filter components
│   ├── data-table-cell-helpers.tsx     # HeaderLabel, CellTruncate, CellBadges, CellActions
│   ├── data-table-cell-status.tsx      # Status → Badge renderer
│   ├── data-table-cell-date.tsx        # Date formatter
│   ├── data-table-cell-boolean.tsx     # Boolean → Check/X icon
│   ├── data-table-cell-number.tsx      # Number formatter
│   └── data-table-cell-relation.tsx    # Relation resolver + provider
└── ... (other registry components)
```

## Composition Structure

```
<DataTableToolbar>
  <DataTableColumnVisibility />
</DataTableToolbar>
<DataTableCellRelationProvider resource="categories" ids={categoryIds}>
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

## Usage

This example demonstrates the composable DataTable with sorting, filters, column pinning, relational data (provider, manual useMany, and useOne fallback), and value renderers.

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
  DataTableFilterDropdownDateSinglePicker,
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
  ListViewHeader,
  ListView,
} from "@/components/refine-ui/views/list-view";
import type { Post, Category, Tag } from "../../types/resources";

export function PostsListPage() {
  // Fetch all categories for the combobox filter
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
        id: "description",
        header: "Description",
        accessorKey: "content",
        size: 400,
        enableSorting: false,
        enableColumnFilter: false,
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
              multiple={true}
              options={categories.map((item) => ({
                label: item.title,
                value: item.id.toString(),
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
          const postTags = allTags.filter((tag) =>
            getValue<number[]>().includes(tag.id),
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
              multiple={true}
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
        cell: ({ row }) => <DataTableCellDate value={row.original.createdAt} />,
      },
      {
        id: "updatedAt",
        accessorKey: "updatedAt",
        size: 220,
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
        cell: ({ row }) => <DataTableCellDate value={row.original.createdAt} />,
      },
      {
        id: "actions",
        size: 84,
        enableSorting: false,
        enableColumnFilter: false,
        header: () => <DataTableCellActions>Actions</DataTableCellActions>,
        cell: ({ row }) => {
          const post = row.original;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex size-8 border rounded-full text-muted-foreground mx-auto"
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
    refineCoreProps: {},
    columns,
    initialState: {
      columnPinning: {
        left: [],
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

  const tableData = tableQuery.data;

  // Collect category IDs for the relation provider (batched useMany)
  const categoryIds = useMemo(
    () => tableData?.data?.map((post) => post.category.id) ?? [],
    [tableData],
  );

  // Manual useMany for tags — passed to cells via table meta
  const tagIds = useMemo(
    () => tableData?.data?.flatMap((post) => post.tags) ?? [],
    [tableData],
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

## Handling Relational Data

Three approaches for resolving foreign keys in table cells:

### 1. DataTableCellRelationProvider (Recommended)

Wrap your table with `DataTableCellRelationProvider` to batch all IDs into a single `useMany` request. Nest multiple providers for different resources:

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

### 2. Manual useMany + Table Meta

For more control (e.g., custom rendering), collect IDs and fetch them via `useMany`. Pass data to cells via table meta:

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

useEffect(() => {
  reactTable.setOptions((prev) => ({
    ...prev,
    meta: { ...prev.meta, tagsData },
  }));
}, [reactTable, tagsData]);
```

Then access it in your cell via `table.options.meta`.

### 3. Per-Cell Fallback (useOne)

Without a provider, `DataTableCellRelation` automatically falls back to `useOne()` per cell:

```tsx
cell: ({ getValue }) => (
  <DataTableCellRelation resource="users" id={getValue<number>()} field="firstName" />
),
```

### Custom Rendering with Children

Use render function children for full control:

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

## How to Pin Columns

Pin columns to the left or right of the table using the `initialState` prop:

```tsx
const table = useTable<Post>({
  columns,
  initialState: {
    columnPinning: {
      left: ["id"],
      right: ["actions"],
    },
  },
});
```

The `getCommonStyles` utility (exported from `data-table.tsx`) automatically handles sticky positioning and shadow effects for pinned columns.

## DataTablePagination

Page-based pagination component. Includes page navigation, page size selection, and row count display.

| Prop             | Type                     | Description                                    |
| ---------------- | ------------------------ | ---------------------------------------------- |
| `currentPage`    | `number`                 | Current page number (1-based)                  |
| `pageCount`      | `number`                 | Total number of pages                          |
| `setCurrentPage` | `(page: number) => void` | Function to change the current page            |
| `pageSize`       | `number`                 | Number of rows per page                        |
| `setPageSize`    | `(size: number) => void` | Function to change the page size               |
| `total`          | `number` (optional)      | Total number of rows (displayed as "X row(s)") |

## DataTableCursorPagination

Cursor-based pagination with prev/next buttons and optional page size selector. Use with cursor state passed via `meta`:

```tsx
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

const { tableQuery, pageSize, setPageSize } = table.refineCore;
const hasNextPage = tableQuery.data?.hasNextPage ?? false;
const hasPreviousPage = tableQuery.data?.hasPreviousPage ?? false;
const cursorNext = tableQuery.data?.cursor?.next;
const cursorPrev = tableQuery.data?.cursor?.prev;

<DataTableCursorPagination
  hasNextPage={hasNextPage}
  hasPreviousPage={hasPreviousPage}
  onNext={() => cursorNext && setCursor({ after: cursorNext })}
  onPrevious={() => cursorPrev && setCursor({ before: cursorPrev })}
  isFetching={tableQuery.isFetching}
  pageSize={pageSize}
  setPageSize={setPageSize}
/>;
```

The data provider receives `meta.cursor` and uses it to build the right query (e.g., `after`/`before` for GraphQL relay). It returns `hasNextPage`, `hasPreviousPage`, and `cursor` as extra fields on the response.

**Note:** The cursor shape in `meta` and the extra response fields are entirely data provider specific. The example above uses `{ after }` / `{ before }` for GraphQL relay, but your data provider may use a different structure. `DataTableCursorPagination` is agnostic — it only cares about `hasNextPage`, `hasPreviousPage`, and the callbacks you provide.

| Prop              | Type                     | Description                                    |
| ----------------- | ------------------------ | ---------------------------------------------- |
| `hasNextPage`     | `boolean`                | Whether a next page is available               |
| `hasPreviousPage` | `boolean`                | Whether a previous page is available           |
| `onNext`          | `() => void`             | Handler for "next page" button                 |
| `onPrevious`      | `() => void`             | Handler for "previous page" button             |
| `isFetching`      | `boolean`                | Disables buttons during fetch                  |
| `pageSize`        | `number`                 | Current page size (enables page size selector) |
| `setPageSize`     | `(size: number) => void` | Page size change handler                       |

## DataTableFilterDropdownText

Text filtering for data tables. Supports contains, equals, startswith, endswith operators.

```tsx
import { DataTableFilterDropdownText } from "@/components/refine-ui/data-table/data-table-filter";
import { DataTableHeaderLabel } from "@/components/refine-ui/data-table/data-table-cell-helpers";

{
  id: "title",
  accessorKey: "title",
  header: ({ column, table }) => (
    <DataTableHeaderLabel>
      <span>Title</span>
      <DataTableFilterDropdownText
        defaultOperator="contains"
        column={column}
        table={table}
        placeholder="Filter by title"
        operators={["eq", "ne", "contains", "ncontains", "startswith", "endswith"]}
      />
    </DataTableHeaderLabel>
  ),
}
```

## DataTableFilterDropdownNumeric

Numeric filtering. Supports equals, greater than, less than operators.

```tsx
import { DataTableFilterDropdownNumeric } from "@/components/refine-ui/data-table/data-table-filter";
import { DataTableHeaderLabel } from "@/components/refine-ui/data-table/data-table-cell-helpers";

{
  id: "id",
  accessorKey: "id",
  header: ({ column, table }) => (
    <DataTableHeaderLabel>
      <span>ID</span>
      <DataTableFilterDropdownNumeric
        defaultOperator="eq"
        column={column}
        table={table}
        placeholder="Filter by ID"
        operators={["eq", "ne", "gt", "lt", "gte", "lte"]}
      />
    </DataTableHeaderLabel>
  ),
}
```

## DataTableFilterCombobox

Select filtering with single or multiple selection.

```tsx
import { DataTableFilterCombobox } from "@/components/refine-ui/data-table/data-table-filter";
import { DataTableHeaderLabel } from "@/components/refine-ui/data-table/data-table-cell-helpers";

// Single selection
{
  id: "status",
  accessorKey: "status",
  header: ({ column }) => (
    <DataTableHeaderLabel>
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
    </DataTableHeaderLabel>
  ),
}

// Multiple selection
{
  id: "category.id",
  accessorKey: "category.id",
  header: ({ column }) => (
    <DataTableHeaderLabel>
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
    </DataTableHeaderLabel>
  ),
}
```

## DataTableFilterDropdownDateSinglePicker

Date filtering with calendar picker.

```tsx
import { DataTableFilterDropdownDateSinglePicker } from "@/components/refine-ui/data-table/data-table-filter";
import { DataTableHeaderLabel } from "@/components/refine-ui/data-table/data-table-cell-helpers";

{
  id: "createdAt",
  accessorKey: "createdAt",
  header: ({ column }) => (
    <DataTableHeaderLabel>
      <span>Created At</span>
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
}
```

## DataTableFilterDropdownDateRangePicker

Date range filtering with dual calendar picker.

```tsx
import { DataTableFilterDropdownDateRangePicker } from "@/components/refine-ui/data-table/data-table-filter";
import { DataTableHeaderLabel } from "@/components/refine-ui/data-table/data-table-cell-helpers";

{
  id: "dateRange",
  accessorKey: "createdAt",
  header: ({ column }) => (
    <DataTableHeaderLabel>
      <span>Date Range</span>
      <DataTableFilterDropdownDateRangePicker
        column={column}
        defaultOperator="between"
        formatDateRange={(dateRange) => {
          if (!dateRange?.from || !dateRange?.to) return undefined;
          return [dateRange.from.toISOString(), dateRange.to.toISOString()];
        }}
      />
    </DataTableHeaderLabel>
  ),
}
```

## Value Renderers

### DataTableCellStatus

Renders a status string as a Badge with variant mapping:

```tsx
cell: ({ getValue }) => (
  <DataTableCellStatus
    value={getValue<string>()}
    variants={{ published: "default", draft: "outline", rejected: "destructive" }}
  />
),
```

### DataTableCellDate

Formats dates (absolute, relative, or custom):

```tsx
// Absolute (default) — e.g., "Mar 17, 2026, 2:30 PM"
cell: ({ row }) => <DataTableCellDate value={row.original.createdAt} />,

// Relative — e.g., "3 days ago"
cell: ({ row }) => <DataTableCellDate value={row.original.createdAt} format="relative" />,

// Custom function
cell: ({ row }) => (
  <DataTableCellDate value={row.original.createdAt} format={(date) => date.toLocaleDateString()} />
),
```

### DataTableCellBoolean

Renders a boolean as Check or X icon:

```tsx
cell: ({ getValue }) => <DataTableCellBoolean value={getValue<boolean>()} />,
```

### DataTableCellNumber

Formats numbers using `Intl.NumberFormat`:

```tsx
// Plain number
cell: ({ getValue }) => <DataTableCellNumber value={getValue<number>()} />,

// Currency
cell: ({ getValue }) => (
  <DataTableCellNumber value={getValue<number>()} options={{ style: "currency", currency: "USD" }} />
),
```

### DataTableCellRelation

Resolves a foreign key to a display value. Uses provider cache if available, otherwise falls back to `useOne()`:

```tsx
cell: ({ getValue }) => (
  <DataTableCellRelation resource="categories" id={getValue<number>()} field="title" />
),
```

### DataTableCellRelationProvider

Batches all IDs for a resource into a single `useMany` call. Nest multiple providers for different resources:

```tsx
<DataTableCellRelationProvider resource="categories" ids={categoryIds}>
  <DataTableCellRelationProvider resource="tags" ids={tagIds}>
    {/* table content */}
  </DataTableCellRelationProvider>
</DataTableCellRelationProvider>
```
