// @ts-nocheck — suppresses React 19 / Radix-UI JSX return-type mismatches
import { useMemo, type FC } from "react";
import { useTable } from "@refinedev/react-table";
import type { HttpError } from "@refinedev/core";
import { type ColumnDef, flexRender } from "@tanstack/react-table";
import { useEditableTable } from "@/hooks/use-editable-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  ArrowLeftToLine,
  ArrowRightToLine,
  CheckIcon,
  PencilIcon,
  XIcon,
} from "lucide-react";

import type { IPost } from "../../interfaces";

const STATUS_OPTIONS: IPost["status"][] = ["published", "draft", "rejected"];

const statusColors: Record<IPost["status"], string> = {
  published: "bg-green-100 text-green-800",
  draft: "bg-yellow-100 text-yellow-800",
  rejected: "bg-red-100 text-red-800",
};

export const PostList: FC = () => {
  const {
    editingId,
    editValues,
    setEditValues,
    isEditing,
    editButtonProps,
    cancelButtonProps,
    saveButtonProps,
  } = useEditableTable<IPost, HttpError, Partial<IPost>>({
    resource: "posts",
    mutationMode: "optimistic",
  });

  const columns = useMemo<ColumnDef<IPost>[]>(
    () => [
      {
        id: "id",
        header: "ID",
        accessorKey: "id",
        cell: ({ getValue }) => (
          <span className="text-muted-foreground text-xs font-mono">
            #{getValue() as number}
          </span>
        ),
      },
      {
        id: "title",
        header: "Title",
        accessorKey: "title",
        cell: ({ getValue, row }) => {
          if (isEditing(row.original.id)) {
            return (
              <Input
                value={editValues.title ?? (getValue() as string)}
                onChange={(e) =>
                  setEditValues((prev) => ({ ...prev, title: e.target.value }))
                }
                className="h-8 min-w-[200px]"
                autoFocus
              />
            );
          }
          return (
            <span className="font-medium">{getValue() as string}</span>
          );
        },
      },
      {
        id: "status",
        header: "Status",
        accessorKey: "status",
        cell: ({ getValue, row }) => {
          const status = getValue() as IPost["status"];
          if (isEditing(row.original.id)) {
            return (
              <Select
                value={editValues.status ?? status}
                onValueChange={(val) =>
                  setEditValues((prev) => ({
                    ...prev,
                    status: val as IPost["status"],
                  }))
                }
              >
                <SelectTrigger className="h-8 w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            );
          }
          return (
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${statusColors[status] ?? ""}`}
            >
              {status}
            </span>
          );
        },
      },
      {
        id: "createdAt",
        header: "Created At",
        accessorKey: "createdAt",
        cell: ({ getValue }) => (
          <span className="text-muted-foreground text-sm">
            {new Date(getValue() as string).toLocaleDateString()}
          </span>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        accessorKey: "id",
        cell: ({ getValue, row }) => {
          const id = getValue() as number;
          if (isEditing(id)) {
            return (
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  title="Save"
                  {...saveButtonProps}
                >
                  <CheckIcon size={16} className="text-green-600" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  title="Cancel"
                  {...cancelButtonProps}
                >
                  <XIcon size={16} className="text-red-500" />
                </Button>
              </div>
            );
          }
          return (
            <Button
              variant="ghost"
              size="icon"
              title="Edit row"
              disabled={editingId !== undefined}
              {...editButtonProps(id, row.original)}
            >
              <PencilIcon size={16} />
            </Button>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [editingId, editValues, saveButtonProps],
  );

  const {
    reactTable: {
      getHeaderGroups,
      getRowModel,
      getState,
      setPageIndex,
      getCanPreviousPage,
      getPageCount,
      getCanNextPage,
      nextPage,
      previousPage,
      setPageSize,
    },
  } = useTable<IPost>({ columns });

  return (
    <div className="p-4 space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Posts</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Click the pencil icon to edit a row inline. Changes are saved
          immediately.
        </p>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {!header.isPlaceholder &&
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  No records found.
                </TableCell>
              </TableRow>
            ) : (
              getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={editingId === row.original.id ? "selected" : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Page {getState().pagination.pageIndex + 1} of {getPageCount()}
        </p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Rows per page</span>
            <Select
              value={`${getState().pagination.pageSize}`}
              onValueChange={(val) => setPageSize(Number(val))}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 50].map((size) => (
                  <SelectItem key={size} value={`${size}`}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Pagination className="w-auto mx-0">
            <PaginationContent>
              <PaginationItem>
                <PaginationLink
                  onClick={() => setPageIndex(0)}
                  aria-disabled={!getCanPreviousPage()}
                  className={
                    !getCanPreviousPage()
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                >
                  <ArrowLeftToLine className="h-4 w-4" />
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => previousPage()}
                  aria-disabled={!getCanPreviousPage()}
                  className={
                    !getCanPreviousPage()
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={() => nextPage()}
                  aria-disabled={!getCanNextPage()}
                  className={
                    !getCanNextPage()
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  onClick={() => setPageIndex(getPageCount() - 1)}
                  aria-disabled={!getCanNextPage()}
                  className={
                    !getCanNextPage()
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                >
                  <ArrowRightToLine className="h-4 w-4" />
                </PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};
