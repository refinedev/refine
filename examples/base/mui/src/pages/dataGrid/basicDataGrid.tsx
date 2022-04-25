import { useOne } from "@pankod/refine-core";
import {
    useDataGrid,
    DataGrid,
    GridColumns,
    GridToolbar,
    GridActionsCellItem,
} from "@pankod/refine-mui";

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
    {
        field: "actions",
        type: "actions",
        getActions: () => [
            <GridActionsCellItem key={1} label="Delete" showInMenu />,
            <GridActionsCellItem key={2} label="Print" showInMenu />,
        ],
    },
];

export const BasicDataGrid: React.FC = () => {
    const { dataGridProps } = useDataGrid({
        columns,
    });

    return (
        <div style={{ height: 700, width: "100%" }}>
            <DataGrid
                {...dataGridProps}
                components={{
                    Toolbar: GridToolbar,
                }}
            />
        </div>
    );
};
