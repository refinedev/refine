import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useUpdate } from "@refinedev/core";
import { useDataGrid } from "@refinedev/mui";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { RefineWithoutLayout } from "../../../.storybook/preview";

export default {
  title: "Hooks / DataGrid / Editable",
  component: DataGrid,
  argTypes: {
    editMode: {
      options: ["cell", "row"],
      defaultValue: "cell",
      control: { type: "inline-radio" },
    },
  },
  decorators: [(Story) => RefineWithoutLayout(Story)],
} as ComponentMeta<typeof DataGrid>;

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    type: "number",
  },
  {
    field: "title",
    headerName: "Title",
    flex: 1,
    minWidth: 350,
    editable: true,
  },
  { field: "status", headerName: "Status", flex: 1, editable: true },
];

export const Editable: ComponentStory<typeof DataGrid> = (args) => {
  const { dataGridProps } = useDataGrid();
  const { mutate } = useUpdate();

  return (
    <div style={{ height: 700, width: "100%" }}>
      <DataGrid
        {...dataGridProps}
        processRowUpdate={(newRow) => {
          mutate({
            id: newRow.id,
            resource: "posts",
            values: newRow,
          });
          return newRow;
        }}
        {...args}
        columns={columns}
      />
    </div>
  );
};
