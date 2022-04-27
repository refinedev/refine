import { ComponentStory, ComponentMeta } from "@storybook/react";
import { DataGrid, GridColumns, useDataGrid } from "@pankod/refine-mui";
import { useOne } from "@pankod/refine-core";

import { RefineWithoutLayout } from "../../../.storybook/preview";

export default {
    title: "Hooks / DataGrid",
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
    {
        field: "category.id",
        headerName: "Category",
        flex: 1,
        align: "left",
        headerAlign: "left",
        type: "number",
        valueGetter: (params) => {
            const { data } = useOne({
                resource: "categories",
                id: params.row.category.id,
            });
            return data?.data.title;
        },
    },
    { field: "status", headerName: "Status", flex: 1 },
];

export const Basic: ComponentStory<typeof DataGrid> = () => {
    const { dataGridProps } = useDataGrid({ columns });

    return (
        <div style={{ height: 700, width: "100%" }}>
            <DataGrid {...dataGridProps} />
        </div>
    );
};
