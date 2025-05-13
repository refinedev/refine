import type { HttpError, BaseRecord } from "@refinedev/core";
import type { UseTableReturnType } from "@refinedev/react-table";
import { flexRender } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import type { Column } from "@tanstack/react-table";
import { Button } from "@/registry/default/ui/button";
import { ArrowUp, ArrowDown, ArrowUpDown, Filter, Check } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/default/ui/table";
import { DataTablePagination } from "@/registry/default/refine-ui/table/pagination";
import { Input } from "@/registry/default/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/default/ui/popover";
import { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/registry/default/ui/command";
import { Separator } from "@/registry/default/ui/separator";

type DataTableProps<TData extends BaseRecord> = {
  table: UseTableReturnType<TData, HttpError>;
};

export function DataTable<TData extends BaseRecord>({
  table,
}: DataTableProps<TData>) {
  const {
    getHeaderGroups,
    getRowModel,
    getAllColumns,
    refineCore: {
      tableQuery,
      current,
      pageCount,
      setCurrent,
      pageSize,
      setPageSize,
    },
  } = table;

  const columns = getAllColumns();

  return (
    <div className={cn("flex", "flex-col", "flex-1", "gap-4")}>
      <div className={cn("rounded-md", "border")}>
        <Table style={{ tableLayout: "fixed", width: "100%" }}>
          <TableHeader>
            {getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const isPlaceholder = header.isPlaceholder;

                  return (
                    <TableHead
                      key={header.id}
                      style={{
                        ...getCommonStyles({ column: header.column }),
                      }}
                    >
                      {isPlaceholder ? null : (
                        <div className={cn("flex", "items-center", "gap-1")}>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        </div>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {tableQuery.isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className={cn("h-24", "text-center")}
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : getRowModel().rows?.length ? (
              getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell
                        key={cell.id}
                        style={{
                          ...getCommonStyles({ column: cell.column }),
                        }}
                        className={cn("truncate")}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className={cn("h-24", "text-center")}
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination
        current={current}
        pageCount={pageCount}
        setCurrent={setCurrent}
        pageSize={pageSize}
        setPageSize={setPageSize}
        total={tableQuery.data?.total}
      />
    </div>
  );
}

export type TableHeaderSorterProps<TData> = {
  column: Column<TData>;
} & React.ComponentProps<typeof Button>;

export function TableHeaderSorter<TData>({
  column,
  className,
  ...props
}: TableHeaderSorterProps<TData>) {
  const title =
    column.getIsSorted() === "desc"
      ? `Sort by ${column.id} as descending`
      : column.getIsSorted() === "asc"
        ? `Sort by ${column.id} as ascending`
        : `Sort by ${column.id}`;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => column.toggleSorting(undefined, true)}
      title={title}
      aria-label={title}
      {...props}
      className={cn("data-[state=open]:bg-accent", "w-6 h-6", className)}
    >
      {column.getIsSorted() === "desc" ? (
        <ArrowDown className={cn("text-primary", "!w-3", "!h-3")} />
      ) : column.getIsSorted() === "asc" ? (
        <ArrowUp className={cn("text-primary", "!w-3", "!h-3")} />
      ) : (
        <ArrowUpDown className={cn("text-muted-foreground", "!w-3", "!h-3")} />
      )}
    </Button>
  );
}

export type TableHeaderFilterDropdownProps<TData> = {
  column: Column<TData>;
  className?: string;
  children: (args: {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => React.ReactNode;
};

export function TableHeaderFilterDropdown<TData>({
  column,
  className,
  children,
}: TableHeaderFilterDropdownProps<TData>) {
  const [isOpen, setIsOpen] = useState(false);

  const isFiltered = column.getIsFiltered();

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          onClick={() => setIsOpen(true)}
          variant="ghost"
          size="icon"
          className={cn(
            "data-[state=open]:bg-accent",
            "w-6 h-6",
            {
              "text-primary": isFiltered,
              "text-muted-foreground": !isFiltered,
            },
            className,
          )}
        >
          <Filter className="!h-3 !w-3" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        {children({ isOpen, setIsOpen })}
      </PopoverContent>
    </Popover>
  );
}

export type TableHeaderFilterDropdownTextProps<TData> = {
  column: Column<TData>;
  placeholder: string;
};

export function TableHeaderFilterDropdownText<TData>({
  column,
  placeholder,
}: TableHeaderFilterDropdownTextProps<TData>) {
  const [filterValue, setFilterValue] = useState(
    (column.getFilterValue() as string) || "",
  );

  return (
    <TableHeaderFilterDropdown column={column}>
      {({ isOpen: _, setIsOpen }) => {
        return (
          <div
            className="flex flex-col items-center gap-4"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                column.setFilterValue(filterValue);
                setIsOpen(false);
              }
            }}
          >
            <Input
              placeholder={placeholder}
              value={filterValue}
              onChange={(event) => {
                setFilterValue(event.target.value);
              }}
            />
            <div className="flex items-center justify-end w-full gap-2">
              <Button
                size="sm"
                variant="destructive"
                onClick={() => {
                  column.setFilterValue("");
                  setFilterValue("");
                  setIsOpen(false);
                }}
              >
                Clear
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  column.setFilterValue(filterValue);
                  setIsOpen(false);
                }}
              >
                Save
              </Button>
            </div>
          </div>
        );
      }}
    </TableHeaderFilterDropdown>
  );
}

export type TableHeaderFilterComboboxProps<TData> = {
  column: Column<TData>;
  options: { label: string; value: string }[];
  placeholder?: string;
  noResultsText?: string;
};

export function TableHeaderFilterCombobox<TData>({
  column,
  options,
  placeholder = "Search...",
  noResultsText = "No results found.",
}: TableHeaderFilterComboboxProps<TData>) {
  const [filterValue, setFilterValue] = useState<string | null>(
    column.getFilterValue() as string | null,
  );

  return (
    <TableHeaderFilterDropdown column={column}>
      {({ isOpen: _, setIsOpen }) => {
        return (
          <div>
            <Command>
              <CommandInput placeholder={placeholder} />
              <CommandList>
                <CommandEmpty>{noResultsText}</CommandEmpty>
                <CommandGroup className="mt-2">
                  {options.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onSelect={() => {
                        setFilterValue(option.value);
                      }}
                    >
                      {option.label}
                      <Check
                        className={cn(
                          "ml-auto",
                          filterValue === option.value
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>

            <Separator className="my-2" />

            <div className="flex items-center justify-end w-full gap-2">
              <Button
                size="sm"
                variant="destructive"
                onClick={() => {
                  column.setFilterValue(null);
                  setFilterValue(null);
                  setIsOpen(false);
                }}
              >
                Clear
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  column.setFilterValue(filterValue);
                  setIsOpen(false);
                }}
              >
                Save
              </Button>
            </div>
          </div>
        );
      }}
    </TableHeaderFilterDropdown>
  );
}

export function getCommonStyles<TData>({
  column,
}: {
  column: Column<TData>;
}): React.CSSProperties {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn =
    isPinned === "left" && column.getIsLastColumn("left");
  const isFirstRightPinnedColumn =
    isPinned === "right" && column.getIsFirstColumn("right");

  return {
    boxShadow: isLastLeftPinnedColumn
      ? "-4px 0 4px -4px var(--border) inset"
      : isFirstRightPinnedColumn
        ? "4px 0 4px -4px var(--border) inset"
        : undefined,
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    opacity: 1,
    position: isPinned ? "sticky" : "relative",
    background: isPinned ? "var(--background)" : "",
    borderTopRightRadius: isPinned === "right" ? "var(--radius)" : undefined,
    borderBottomRightRadius: isPinned === "right" ? "var(--radius)" : undefined,
    borderTopLeftRadius: isPinned === "left" ? "var(--radius)" : undefined,
    borderBottomLeftRadius: isPinned === "left" ? "var(--radius)" : undefined,
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
  };
}
