"use client";

import { useState } from "react";
import { type HttpError, type BaseRecord, useTranslate } from "@refinedev/core";
import type { UseTableReturnType } from "@refinedev/react-table";
import type { Column, Table as ReactTable } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";

// 3 shadcn nerede bitircem

import {
  ArrowUp,
  ArrowDown,
  Check,
  Loader2,
  ChevronsUpDown,
  ListFilter,
  X,
} from "lucide-react";

import { Button } from "@/registry/default/ui/button";
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/registry/default/ui/command";
import { Separator } from "@/registry/default/ui/separator";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

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
  const leafColumns = table.getAllLeafColumns();
  const isLoading = tableQuery.isLoading;

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
          <TableBody className="relative">
            {isLoading ? (
              <>
                {Array.from({ length: pageSize < 1 ? 1 : pageSize }).map(
                  (_, rowIndex) => (
                    <TableRow
                      key={`skeleton-row-${rowIndex}`}
                      aria-hidden="true"
                    >
                      {leafColumns.map((column) => (
                        <TableCell
                          key={`skeleton-cell-${rowIndex}-${column.id}`}
                          style={{
                            ...getCommonStyles({ column }),
                          }}
                          className={cn("truncate")}
                        >
                          <div className="h-8" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ),
                )}
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className={cn("absolute", "inset-0", "pointer-events-none")}
                  >
                    <Loader2
                      className={cn(
                        "absolute",
                        "top-1/2",
                        "left-1/2",
                        "animate-spin",
                        "text-primary",
                        "h-8",
                        "w-8",
                        "-translate-x-1/2",
                        "-translate-y-1/2",
                      )}
                    />
                  </TableCell>
                </TableRow>
              </>
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
                      >
                        <div className="truncate">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </div>
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
      className={cn("data-[state=open]:bg-accent", "w-5 h-5", className)}
    >
      {column.getIsSorted() === "desc" ? (
        <ArrowDown className={cn("text-primary", "!w-3", "!h-3")} />
      ) : column.getIsSorted() === "asc" ? (
        <ArrowUp className={cn("text-primary", "!w-3", "!h-3")} />
      ) : (
        <ChevronsUpDown
          className={cn("text-muted-foreground", "!w-3", "!h-3")}
        />
      )}
    </Button>
  );
}

export type TableHeaderFilterDropdownProps<TData> = {
  column: Column<TData>;
  contentClassName?: string;
  triggerClassName?: string;
  children: (args: {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => React.ReactNode;
};

export function TableHeaderFilterDropdown<TData>({
  column,
  triggerClassName,
  contentClassName,
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
            "w-5 h-5",
            {
              "text-primary": isFiltered,
              "text-muted-foreground": !isFiltered,
            },
            triggerClassName,
          )}
        >
          <ListFilter className="!h-3 !w-3" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className={cn(contentClassName)}>
        {children({ isOpen, setIsOpen })}
      </PopoverContent>
    </Popover>
  );
}

type TableHeaderFilterDropdownActionsProps = {
  className?: string;
  onClear: () => void;
  onApply: () => void;
};

export function TableHeaderFilterDropdownActions({
  className,
  onClear,
  onApply,
}: TableHeaderFilterDropdownActionsProps) {
  const t = useTranslate();

  return (
    <div
      className={cn(
        "flex",
        "items-center",
        "justify-between",
        "w-full",
        "gap-2",
        className,
      )}
    >
      <Button
        size="sm"
        variant="ghost"
        className={cn(
          "h-6",
          "!px-2",
          "!py-1",
          "rounded-sm",
          "text-xs",
          "font-semibold",
          "text-muted-foreground",
        )}
        onClick={() => {
          onClear();
        }}
      >
        <X className={cn("w-3.5", "h-3.5", "text-muted-foreground")} />
        {t("buttons.clear", "Clear")}
      </Button>

      <Button
        size="sm"
        className={cn(
          "h-6",
          "!px-2",
          "!py-1",
          "rounded-sm",
          "text-xs",
          "font-semibold",
        )}
        onClick={() => {
          onApply();
        }}
      >
        {t("buttons.apply", "Apply")}
      </Button>
    </div>
  );
}

export type TableHeaderFilterDropdownTextProps<TData> = {
  column: Column<TData>;
  table: ReactTable<TData>;
  placeholder: string;
};

export function TableHeaderFilterDropdownText<TData>({
  column: columnFromProps,
  table: tableFromProps,
  placeholder,
}: TableHeaderFilterDropdownTextProps<TData>) {
  const t = useTranslate();

  const columnMeta = columnFromProps?.columnDef?.meta as {
    filterOperator?: string;
  };

  const [filterType, setFilterType] = useState(
    columnMeta?.filterOperator || "eq",
  );

  const [filterValue, setFilterValue] = useState(
    (columnFromProps.getFilterValue() as string) || "",
  );

  const handleFilterTypeChange = (type: string) => {
    setFilterType(type);
    tableFromProps.setOptions((prev) => ({
      ...prev,
      columns: prev.columns.map((column) => {
        if (column.id === columnFromProps.id) {
          console.log("column", {
            ...column.meta,
            filterOperator: type,
          });
          return {
            ...column,
            meta: {
              ...column.meta,
              filterOperator: type,
            },
          };
        }
        return column;
      }),
    }));
  };

  console.log("columnMeta", columnMeta);

  return (
    <TableHeaderFilterDropdown column={columnFromProps}>
      {({ isOpen: _, setIsOpen }) => {
        return (
          <div
            className={cn(
              "flex",
              "flex-col",
              "items-center",
              "gap-4",
              "w-full",
            )}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                columnFromProps.setFilterValue(filterValue);
                setIsOpen(false);
              }
            }}
          >
            <div className={cn("flex", "items-center", "gap-2")}>
              <Select value={filterType} onValueChange={handleFilterTypeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="contains">Contains</SelectItem>
                  <SelectItem value="equals">Equals</SelectItem>
                </SelectContent>
              </Select>

              <Input
                placeholder={
                  placeholder ?? t("table.filter.text.placeholder", "Search...")
                }
                value={filterValue}
                onChange={(event) => {
                  setFilterValue(event.target.value);
                }}
              />
            </div>
            <TableHeaderFilterDropdownActions
              onClear={() => {
                columnFromProps.setFilterValue("");
                setFilterValue("");
                setIsOpen(false);
              }}
              onApply={() => {
                columnFromProps.setFilterValue(filterValue);
                setIsOpen(false);
              }}
            />
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
  placeholder,
  noResultsText,
}: TableHeaderFilterComboboxProps<TData>) {
  const t = useTranslate();

  const [filterValue, setFilterValue] = useState<string | null>(
    column.getFilterValue() as string | null,
  );

  return (
    <TableHeaderFilterDropdown column={column}>
      {({ isOpen: _, setIsOpen }) => {
        return (
          <div>
            <Command>
              <CommandInput
                placeholder={
                  placeholder ??
                  t("table.filter.combobox.placeholder", "Search...")
                }
              />
              <CommandList>
                <CommandEmpty>
                  {noResultsText ??
                    t("table.filter.combobox.noResults", "Results not found.")}
                </CommandEmpty>
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

            <Separator className={cn("mt-4", "mb-4")} />

            <TableHeaderFilterDropdownActions
              onClear={() => {
                column.setFilterValue(null);
                setFilterValue(null);
                setIsOpen(false);
              }}
              onApply={() => {
                column.setFilterValue(filterValue);
                setIsOpen(false);
              }}
            />
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

DataTable.displayName = "DataTable";
TableHeaderSorter.displayName = "TableHeaderSorter";
TableHeaderFilterDropdown.displayName = "TableHeaderFilterDropdown";
TableHeaderFilterDropdownText.displayName = "TableHeaderFilterDropdownText";
TableHeaderFilterCombobox.displayName = "TableHeaderFilterCombobox";
TableHeaderFilterDropdownActions.displayName =
  "TableHeaderFilterDropdownActions";
