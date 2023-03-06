import { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useDataGrid } from "@refinedev/mui";
import { DataGrid, GridColumns, GridSelectionModel } from "@mui/x-data-grid";
import { Button, Box } from "@mui/material";
import { useUpdateMany } from "@refinedev/core";

import { RefineWithoutLayout } from "../../../../.storybook/preview";

export default {
    title: "Hooks / DataGrid / Selection",
    component: DataGrid,
    decorators: [(Story) => RefineWithoutLayout(Story)],
} as ComponentMeta<typeof DataGrid>;

const columns: GridColumns = [
    {
        field: "id",
        headerName: "ID",
        type: "number",
    },
    { field: "title", headerName: "Title", flex: 1, minWidth: 350 },
    { field: "status", headerName: "Status", flex: 1 },
];

interface CustomToolbarProps {
    selectedRowIds: GridSelectionModel[];
}

const CustomToolbar: React.FC<CustomToolbarProps> = ({ selectedRowIds }) => {
    const { mutate } = useUpdateMany();

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
                color="primary"
                onClick={() => {
                    mutate({
                        ids: selectedRowIds.map(String),
                        resource: "posts",
                        values: { status: "draft" },
                    });
                }}
            >
                Update Status
            </Button>
        </Box>
    );
};

export const UpdateMany: ComponentStory<typeof DataGrid> = () => {
    const { dataGridProps } = useDataGrid();

    const [selectedRowIds, setSelectedRowIds] = useState<GridSelectionModel>(
        [],
    );

    return (
        <div style={{ height: 700, width: "100%" }}>
            <DataGrid
                {...dataGridProps}
                columns={columns}
                checkboxSelection
                disableSelectionOnClick
                onSelectionModelChange={(newSelectionModel) => {
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
