import { ComponentStory, ComponentMeta } from "@storybook/react";
import { DataGrid, GridColumns, useDataGrid } from "@pankod/refine-mui";
import { useUpdate } from "@pankod/refine-core";

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

const columns: GridColumns = [
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
                experimentalFeatures={{ newEditingApi: true }}
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
