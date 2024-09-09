import type { GridValueFormatterParams } from "@mui/x-data-grid";
import { DataGridPro, type GridColDef } from "@mui/x-data-grid-pro";
import { type Option, useSelect } from "@refinedev/core";
import { List, useDataGrid } from "@refinedev/mui";
import React from "react";

import type { ICategory, IPost } from "../../interfaces";

export const PostList: React.FC = () => {
  const { dataGridProps } = useDataGrid<IPost>({
    initialCurrent: 2,
    initialPageSize: 10,
    initialSorter: [
      {
        field: "title",
        order: "asc",
      },
      {
        field: "id",
        order: "asc",
      },
    ],
    initialFilter: [
      {
        field: "status",
        operator: "eq",
        value: "draft",
      },
      {
        field: "title",
        operator: "contains",
        value: "A",
      },
    ],
    syncWithLocation: true,
    pagination: {
      mode: "client",
    },
  });

  const {
    options,
    query: { isLoading },
  } = useSelect<ICategory>({
    resource: "categories",
    hasPagination: false,
  });

  const columns = React.useMemo<GridColDef<IPost>[]>(
    () => [
      {
        field: "id",
        headerName: "ID",
        type: "number",
      },
      { field: "title", headerName: "Title", minWidth: 400, flex: 1 },
      {
        field: "category.id",
        headerName: "Category",
        type: "singleSelect",
        headerAlign: "left",
        align: "left",
        minWidth: 250,
        flex: 0.5,
        valueOptions: options,
        valueFormatter: (params: GridValueFormatterParams<Option>) => {
          return params.value;
        },
        renderCell: function render({ row }: any) {
          if (isLoading) {
            return "Loading...";
          }

          const category = options.find(
            (item: any) =>
              item.value?.toString() === row.category?.id?.toString(),
          );
          return category?.label;
        },
      },
      {
        field: "status",
        headerName: "Status",
        minWidth: 120,
        flex: 0.3,
        type: "singleSelect",
        valueOptions: ["draft", "published", "rejected"],
      },
    ],
    [options, isLoading],
  );

  return (
    <List>
      <DataGridPro
        {...dataGridProps}
        columns={columns}
        autoHeight
        pageSizeOptions={[10, 20, 30, 50, 100]}
      />
    </List>
  );
};
