import { useDataGrid, List } from "@pankod/refine-mui";
import { DataGridPro, GridColumns } from "@mui/x-data-grid-pro";

import { IPost } from "interfaces";

const columns: GridColumns = [
    {
        field: "id",
        headerName: "ID",
        type: "number",
    },
    { field: "title", headerName: "Title", width: 500 },
    { field: "status", headerName: "Status", width: 120 },
];

export const PostsList: React.FC = () => {
    const { dataGridProps } = useDataGrid<IPost>({
        columns,
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
    });

    return (
        <List>
            <DataGridPro
                {...dataGridProps}
                autoHeight
                rowsPerPageOptions={[10, 20, 30, 50, 100]}
            />
        </List>
    );
};
