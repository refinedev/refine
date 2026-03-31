import { useEffect, useMemo } from "react";
import { useTable } from "@refinedev/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import { type GetManyResponse, useList, useMany } from "@refinedev/core";
import { Button } from "@/registry/new-york/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/registry/new-york/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { DataTable } from "@/registry/new-york/refine-ui/data-table/data-table";
import { DataTableOverflowWrapper } from "@/registry/new-york/refine-ui/data-table/data-table-overflow-wrapper";
import { DataTableHeader } from "@/registry/new-york/refine-ui/data-table/data-table-header";
import { DataTableBody } from "@/registry/new-york/refine-ui/data-table/data-table-body";
import { DataTableSkeleton } from "@/registry/new-york/refine-ui/data-table/data-table-skeleton";
import { DataTableEmpty } from "@/registry/new-york/refine-ui/data-table/data-table-empty";
import { DataTableLoadingOverlay } from "@/registry/new-york/refine-ui/data-table/data-table-loading-overlay";
import { DataTableToolbar } from "@/registry/new-york/refine-ui/data-table/data-table-toolbar";
import { DataTableColumnVisibility } from "@/registry/new-york/refine-ui/data-table/data-table-column-visibility";
import { DataTablePagination } from "@/registry/new-york/refine-ui/data-table/data-table-pagination";
import { DataTableSorter } from "@/registry/new-york/refine-ui/data-table/data-table-sorter";
import {
  DataTableFilterDropdownText,
  DataTableFilterCombobox,
  DataTableFilterDropdownDateRangePicker,
  DataTableFilterDropdownDateSinglePicker,
  DataTableFilterDropdownNumeric,
} from "@/registry/new-york/refine-ui/data-table/data-table-filter";
import {
  DataTableHeaderLabel,
  DataTableCellTruncate,
  DataTableCellBadges,
  DataTableCellActions,
} from "@/registry/new-york/refine-ui/data-table/data-table-cell-helpers";
import { DataTableCellStatus } from "@/registry/new-york/refine-ui/data-table/data-table-cell-status";
import { DataTableCellDate } from "@/registry/new-york/refine-ui/data-table/data-table-cell-date";
import {
  DataTableCellRelation,
  DataTableCellRelationProvider,
} from "@/registry/new-york/refine-ui/data-table/data-table-cell-relation";
import { EditButton } from "@/registry/new-york/refine-ui/buttons/edit";
import { DeleteButton } from "@/registry/new-york/refine-ui/buttons/delete";
import {
  ListViewHeader,
  ListView,
} from "@/registry/new-york/refine-ui/views/list-view";
import { ShowButton } from "@/registry/new-york/refine-ui/buttons/show";
import { cn } from "@/lib/utils";
import type { Post, Category, Tag } from "../../types/resources";
import { Badge } from "@/registry/new-york/ui/badge";

export function PostsListPage() {
  // fetch all categories to use in the combobox filter
  const { result } = useList<Category>({
    resource: "categories",
    pagination: {
      currentPage: 1,
      pageSize: 999,
    },
  });
  const categories = result?.data ?? [];

  const columns = useMemo<ColumnDef<Post>[]>(
    () => [
      {
        id: "id",
        accessorKey: "id",
        size: 96,
        header: ({ column, table }) => {
          return (
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
          );
        },
      },
      {
        id: "title",
        accessorKey: "title",
        size: 300,
        header: ({ column, table }) => {
          return (
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
          );
        },
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
        header: ({ column }) => {
          return (
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
          );
        },
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
        header: ({ column }) => {
          return (
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
          );
        },
        cell: ({ getValue }) => {
          const status = getValue<string>();
          return (
            <DataTableCellStatus
              value={status}
              variants={{
                published: "default",
                draft: "outline",
                rejected: "destructive",
              }}
            />
          );
        },
      },
      {
        id: "createdAt",
        accessorKey: "createdAt",
        size: 220,
        header: ({ column }) => {
          return (
            <DataTableHeaderLabel>
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
            </DataTableHeaderLabel>
          );
        },
        cell: ({ row }) => {
          return <DataTableCellDate value={row.original.createdAt} />;
        },
      },
      {
        id: "updatedAt",
        accessorKey: "updatedAt",
        size: 220,
        header: ({ column }) => {
          return (
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
          );
        },
        cell: ({ row }) => {
          return <DataTableCellDate value={row.original.createdAt} />;
        },
      },
      {
        id: "actions",
        size: 84,
        enableSorting: false,
        enableColumnFilter: false,
        header: () => {
          return <DataTableCellActions>Actions</DataTableCellActions>;
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
        right: ["actions"],
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
    queryOptions: {
      enabled: tagIds.length > 0,
    },
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
