import { useMemo } from "react";
import { useTable } from "@refinedev/react-table";
import { cn } from "@/lib/utils";
import type { ColumnDef, HeaderContext } from "@tanstack/react-table";
import type { Post } from "@/examples/base-example/types/resources";
import { Button } from "@/registry/default/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/default/ui/dropdown-menu";
import { Edit, MoreVertical, Trash, Hash, Search } from "lucide-react";
import { Input } from "@/registry/default/ui/input";
import { DataTable } from "@/registry/default/refine-ui/table/data-table";

export function PostsListPage() {
  const columns = useMemo<ColumnDef<Post>[]>(
    () => [
      {
        id: "id",
        header: "ID",
        accessorKey: "id",
        size: 80,
        meta: {
          variant: "text",
          icon: (context: HeaderContext<Post, unknown>) => (
            <Hash
              className={cn(
                context.column.getIsFiltered()
                  ? "text-primary"
                  : "text-muted-foreground",
              )}
            />
          ),
          placeholder: "Filter by ID",
        },
      },
      {
        id: "image",
        header: "Image",
        accessorKey: "image",
        size: 100,
        enableSorting: false,
        enableColumnFilter: false,
        cell: ({ row }) => {
          const imageUrl = row.original.image?.[0]?.url;
          return imageUrl ? (
            <img
              src={imageUrl}
              alt={row.original.title}
              className="h-10 w-10 object-cover"
            />
          ) : (
            "No Image"
          );
        },
      },
      {
        id: "title",
        header: "Title",
        accessorKey: "title",
        size: 300,
        enableSorting: false,
        meta: {
          variant: "text",
          icon: (context: HeaderContext<Post, any>) => (
            <Search
              className={cn(
                context.column.getIsFiltered()
                  ? "text-primary"
                  : "text-muted-foreground",
              )}
            />
          ),
          placeholder: "Search by title",
          filterOperator: "contains",
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
        id: "status",
        header: "Status",
        accessorKey: "status",
        size: 100,
        enableSorting: false,
        meta: {
          filterOperator: "eq",
          variant: "combobox",
          placeholder: "Filter by status",
          options: [
            { label: "Published", value: "published" },
            { label: "Draft", value: "draft" },
            { label: "Rejected", value: "rejected" },
          ],
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
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => console.log("Edit", post.id)}>
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => console.log("Delete", post.id)}
                >
                  <Trash className="mr-2 h-4 w-4 text-destructive" />
                  <span className="text-destructive">Delete</span>
                </DropdownMenuItem>
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

  return (
    <div className="flex flex-col gap-4">
      <DataTable table={table} />
    </div>
  );
}
