import { useMemo } from "react";
import { useTable } from "@refinedev/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import type { Post } from "@/examples/base-example/types/resources";
import { useMany } from "@refinedev/core";
import { Button } from "@/registry/default/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/registry/default/ui/dropdown-menu";
import { MoreVertical, Trash, Pencil, Eye } from "lucide-react";
import {
  DataTable,
  TableHeaderSorter,
  TableHeaderFilterDropdownText,
  TableHeaderFilterCombobox,
} from "@/registry/default/refine-ui/table/data-table";
import { EditButton } from "@/registry/default/refine-ui/buttons/edit";
import { DeleteButton } from "@/registry/default/refine-ui/buttons/delete";
import {
  ListViewContent,
  ListViewHeader,
  ListView,
} from "@/registry/default/refine-ui/views/list-view";
import { ShowButton } from "@/registry/default/refine-ui/buttons/show";

export function PostsListPage() {
  const columns = useMemo<ColumnDef<Post>[]>(
    () => [
      {
        id: "id",
        accessorKey: "id",
        size: 96,
        header: ({ column }) => {
          return (
            <div className="flex items-center gap-1">
              <span>ID</span>
              <div>
                <TableHeaderSorter column={column} />
                <TableHeaderFilterDropdownText
                  column={column}
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
        meta: {
          filterOperator: "contains",
        },
        header: ({ column }) => {
          return (
            <div className="flex items-center gap-1">
              <span>Title</span>
              <div>
                <TableHeaderFilterDropdownText
                  column={column}
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
        id: "category",
        header: "Category",
        accessorKey: "category.id",
        size: 200,
        cell: ({ getValue, table }) => {
          const meta = table.options.meta as {
            categoriesData?: { data?: Array<{ id: number; title: string }> };
          };
          const category = meta?.categoriesData?.data?.find(
            (item) => item.id === getValue(),
          );
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
              <TableHeaderFilterCombobox
                column={column}
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
        id: "actions",
        header: "",
        size: 64,
        enableSorting: false,
        enableColumnFilter: false,
        cell: ({ row }) => {
          const post = row.original;

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex size-8 text-muted-foreground data-[state=open]:bg-muted data-[state=open]:text-foreground ml-auto"
                >
                  <span className="sr-only">Open menu</span>
                  <MoreVertical className="h-4 w-4" />
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
                  refineCoreProps={{
                    resource: "posts",
                    recordItemId: post.id,
                  }}
                >
                  <Eye className="h-4 w-4" />
                  Show
                </ShowButton>
                <EditButton
                  variant="ghost"
                  size="sm"
                  className="w-full items-center justify-start"
                  refineCoreProps={{
                    resource: "posts",
                    recordItemId: post.id,
                  }}
                >
                  <Pencil className="h-4 w-4" />
                  Edit
                </EditButton>
                <DeleteButton
                  size="sm"
                  className="w-full items-center justify-start"
                  refineCoreProps={{
                    resource: "posts",
                    recordItemId: post.id,
                  }}
                >
                  <Trash className="h-4 w-4" />
                  Delete
                </DeleteButton>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [],
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

  const posts = table.options.data as Post[] | undefined;
  const categoryIds =
    posts?.map((item) => item.category?.id).filter(Boolean) ?? [];

  const { data: categoriesData } = useMany({
    resource: "categories",
    ids: categoryIds,
    queryOptions: {
      enabled: categoryIds.length > 0,
    },
  });

  table.setOptions((prev) => ({
    ...prev,
    meta: {
      ...prev.meta,
      categoriesData,
    },
  }));

  return (
    <ListView>
      <ListViewHeader canCreate={true} />
      <ListViewContent>
        <DataTable table={table} />
      </ListViewContent>
    </ListView>
  );
}
