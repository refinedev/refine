import { useMemo, useState, useCallback } from "react";
import { useTable } from "@refinedev/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/registry/new-york/ui/badge";
import { DataTable } from "@/registry/new-york/refine-ui/data-table/data-table";
import { DataTableOverflowWrapper } from "@/registry/new-york/refine-ui/data-table/data-table-overflow-wrapper";
import { DataTableHeader } from "@/registry/new-york/refine-ui/data-table/data-table-header";
import { DataTableBody } from "@/registry/new-york/refine-ui/data-table/data-table-body";
import { DataTableSkeleton } from "@/registry/new-york/refine-ui/data-table/data-table-skeleton";
import { DataTableEmpty } from "@/registry/new-york/refine-ui/data-table/data-table-empty";
import { DataTableLoadingOverlay } from "@/registry/new-york/refine-ui/data-table/data-table-loading-overlay";
import { DataTableCursorPagination } from "@/registry/new-york/refine-ui/data-table/data-table-cursor-pagination";
import {
  DataTableHeaderLabel,
  DataTableCellTruncate,
  DataTableCellBadges,
} from "@/registry/new-york/refine-ui/data-table/data-table-cell-helpers";
import { DataTableCellStatus } from "@/registry/new-york/refine-ui/data-table/data-table-cell-status";
import { DataTableCellDate } from "@/registry/new-york/refine-ui/data-table/data-table-cell-date";
import {
  ListViewHeader,
  ListView,
} from "@/registry/new-york/refine-ui/views/list-view";
import type { PullRequest } from "../../types/resources";

type Cursor = { after: string } | { before: string } | Record<string, never>;

export function PullRequestsListPage() {
  const [cursor, setCursor] = useState<Cursor>({});

  const columns = useMemo<ColumnDef<PullRequest>[]>(
    () => [
      {
        id: "number",
        accessorKey: "number",
        size: 80,
        header: () => <DataTableHeaderLabel>#</DataTableHeaderLabel>,
      },
      {
        id: "title",
        accessorKey: "title",
        size: 400,
        header: () => <DataTableHeaderLabel>Title</DataTableHeaderLabel>,
        cell: ({ getValue }) => (
          <DataTableCellTruncate>{getValue<string>()}</DataTableCellTruncate>
        ),
      },
      {
        id: "state",
        accessorKey: "state",
        size: 120,
        header: () => <DataTableHeaderLabel>State</DataTableHeaderLabel>,
        cell: ({ getValue }) => (
          <DataTableCellStatus
            value={getValue<string>()}
            variants={{
              OPEN: "default",
              CLOSED: "destructive",
              MERGED: "secondary",
            }}
          />
        ),
      },
      {
        id: "author",
        accessorFn: (row) => row.author?.login ?? "unknown",
        size: 150,
        header: () => <DataTableHeaderLabel>Author</DataTableHeaderLabel>,
      },
      {
        id: "labels",
        accessorFn: (row) => row.labels.nodes,
        size: 250,
        header: () => <DataTableHeaderLabel>Labels</DataTableHeaderLabel>,
        cell: ({ getValue }) => {
          const labels = getValue<{ name: string; color: string }[]>();
          if (!labels.length) return null;
          return (
            <DataTableCellBadges>
              {labels.map((label) => (
                <Badge key={label.name} variant="outline">
                  {label.name}
                </Badge>
              ))}
            </DataTableCellBadges>
          );
        },
      },
      {
        id: "createdAt",
        accessorKey: "createdAt",
        size: 200,
        header: () => <DataTableHeaderLabel>Created</DataTableHeaderLabel>,
        cell: ({ getValue }) => (
          <DataTableCellDate value={getValue<string>()} format="relative" />
        ),
      },
    ],
    [],
  );

  const table = useTable<PullRequest>({
    columns,
    refineCoreProps: {
      resource: "pull-requests",
      dataProviderName: "github",
      pagination: {
        pageSize: 10,
        mode: "off",
      },
      meta: {
        cursor,
      },
    },
  });

  const {
    reactTable,
    refineCore: { tableQuery, pageSize, setPageSize },
  } = table;

  const isLoading = tableQuery.isLoading;
  const isFetching = tableQuery.isFetching && !isLoading;
  const rows = reactTable.getRowModel().rows;

  // Read cursor and pagination info from the data provider's extra response field
  const hasNextPage = tableQuery.data?.hasNextPage ?? false;
  const hasPreviousPage = tableQuery.data?.hasPreviousPage ?? false;
  const cursorNext = tableQuery.data?.cursor?.next ?? undefined;
  const cursorPrev = tableQuery.data?.cursor?.prev ?? undefined;

  const onNext = useCallback(() => {
    if (cursorNext) {
      setCursor({ after: cursorNext });
    }
  }, [cursorNext]);

  const onPrevious = useCallback(() => {
    if (cursorPrev) {
      setCursor({ before: cursorPrev });
    }
  }, [cursorPrev]);

  return (
    <ListView>
      <ListViewHeader />
      <div className="flex flex-col flex-1 gap-4">
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
        {!isLoading && (
          <DataTableCursorPagination
            hasNextPage={hasNextPage}
            hasPreviousPage={hasPreviousPage}
            onNext={onNext}
            onPrevious={onPrevious}
            isFetching={isFetching}
            pageSize={pageSize}
            setPageSize={setPageSize}
          />
        )}
      </div>
    </ListView>
  );
}
