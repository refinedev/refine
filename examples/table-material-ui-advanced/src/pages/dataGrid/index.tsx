import { type BaseOption, useSelect } from "@refinedev/core";
import { List, useDataGrid } from "@refinedev/mui";
import React from "react";

import {
  DataGrid,
  GridActionsCellItem,
  type GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";

import type { ICategory, IPost } from "../../interfaces";

export const BasicDataGrid: React.FC = () => {
  const { dataGridProps } = useDataGrid<IPost>();

  const {
    options,
    query: { isLoading },
  } = useSelect<ICategory>({
    resource: "categories",
  });

  const columns = React.useMemo<GridColDef<IPost>[]>(
    () => [
      {
        field: "id",
        headerName: "ID",
        type: "number",
        maxWidth: 70,
      },
      { field: "title", headerName: "Title", flex: 1, minWidth: 350 },
      {
        field: "category.id",
        headerName: "Category",
        flex: 1,
        type: "singleSelect",
        valueOptions: options,
        display: "flex",
        renderCell: function render({ row }) {
          if (isLoading) {
            return "Loading...";
          }

          const category = options.find(
            (item) => item.value.toString() === row.category.id.toString(),
          );
          return category?.label;
        },
      },
      {
        field: "status",
        headerName: "Status",
        flex: 1,
        type: "singleSelect",
        valueOptions: ["draft", "published", "rejected"],
      },
      {
        field: "actions",
        type: "actions",
        headerName: "Actions",
        getActions: () => [
          // eslint-disable-next-line
          // @ts-ignore `@mui/x-data-grid@5.17.12` broke the props of `GridActionsCellItem` and requires `onResize` and `onResizeCapture` props which should be optional.
          <GridActionsCellItem key={1} label="Delete" showInMenu />,
          // eslint-disable-next-line
          // @ts-ignore `@mui/x-data-grid@5.17.12` broke the props of `GridActionsCellItem` and requires `onResize` and `onResizeCapture` props which should be optional.
          <GridActionsCellItem key={2} label="Print" showInMenu />,
        ],
      },
    ],
    [options, isLoading],
  );

  return (
    <List title="DataGrid Usage" headerProps={{ sx: { py: 0 } }}>
      <DataGrid
        {...dataGridProps}
        columns={columns}
        slots={{
          toolbar: GridToolbar,
        }}
      />
    </List>
  );
};
