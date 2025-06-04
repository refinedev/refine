import { useMemo } from "react";
import { useTable } from "@refinedev/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import { useList } from "@refinedev/core";
import { Button } from "@/registry/new-york/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/registry/new-york/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { DataTable } from "@/registry/new-york/refine-ui/data-table/data-table";
import { DataTableSorter } from "@/registry/new-york/refine-ui/data-table/data-table-sorter";
import {
  DataTableFilterDropdownText,
  DataTableFilterCombobox,
  DataTableFilterDropdownDateRangePicker,
  DataTableFilterDropdownDateSinglePicker,
  DataTableFilterDropdownNumeric,
} from "@/registry/new-york/refine-ui/data-table/data-table-filter";
import { EditButton } from "@/registry/new-york/refine-ui/buttons/edit";
import { DeleteButton } from "@/registry/new-york/refine-ui/buttons/delete";
import {
  ListViewHeader,
  ListView,
} from "@/registry/new-york/refine-ui/views/list-view";
import { ShowButton } from "@/registry/new-york/refine-ui/buttons/show";
import { cn } from "@/lib/utils";
import type { Post, Category } from "../../types/resources";

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
        header: ({ column }) => {
          return (
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
        accessorKey: "category.id",
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
          const category = categories.find((item) => item.id === getValue());

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
        id: "updatedAt",
        accessorKey: "createdAt",
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
    columns,
    initialState: {
      columnPinning: {
        left: [],
        right: ["actions"],
      },
    },
  });

  return (
    <ListView>
      <ListViewHeader />
      <DataTable table={table} />
    </ListView>
  );
}
