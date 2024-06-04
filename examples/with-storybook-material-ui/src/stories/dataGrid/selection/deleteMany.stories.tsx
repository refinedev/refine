import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
  DataGrid,
  type GridColDef,
  type GridRowSelectionModel,
} from "@mui/x-data-grid";
import { useDeleteMany } from "@refinedev/core";
import { useDataGrid } from "@refinedev/mui";
import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { useState } from "react";

import { RefineWithoutLayout } from "../../../../.storybook/preview";

export default {
  title: "Hooks / DataGrid / Selection",
  component: DataGrid,
  decorators: [(Story) => RefineWithoutLayout(Story)],
} as ComponentMeta<typeof DataGrid>;

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    type: "number",
  },
  { field: "title", headerName: "Title", flex: 1, minWidth: 350 },
  { field: "status", headerName: "Status", flex: 1 },
];

interface CustomToolbarProps {
  selectedRowIds: GridRowSelectionModel[];
}

const CustomToolbar: React.FC<CustomToolbarProps> = ({ selectedRowIds }) => {
  const { mutate } = useDeleteMany();

  return (
    <Box
      sx={{
        justifyContent: "center",
        display: "flex",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Button
        disabled={selectedRowIds.length === 0}
        color="error"
        onClick={() => {
          mutate({
            resource: "posts",
            ids: selectedRowIds.map(String),
          });
        }}
      >
        Delete Selected
      </Button>
    </Box>
  );
};

export const DeleteMany: ComponentStory<typeof DataGrid> = () => {
  const { dataGridProps } = useDataGrid();

  const [selectedRowIds, setSelectedRowIds] = useState<GridRowSelectionModel>(
    [],
  );

  return (
    <div style={{ height: 700, width: "100%" }}>
      <DataGrid
        {...dataGridProps}
        columns={columns}
        checkboxSelection
        disableRowSelectionOnClick
        onRowSelectionModelChange={(newSelectionModel) => {
          setSelectedRowIds(newSelectionModel);
        }}
        components={{
          Toolbar: CustomToolbar,
        }}
        componentsProps={{
          toolbar: {
            selectedRowIds,
          },
        }}
      />
    </div>
  );
};
