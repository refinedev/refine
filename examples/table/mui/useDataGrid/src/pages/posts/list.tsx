import { useDataGrid, DataGrid, GridColumns, List } from "@pankod/refine-mui";

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
        initialCurrent: 1,
        initialPageSize: 10,
        initialSorter: [
            {
                field: "title",
                order: "asc",
            },
        ],
        initialFilter: [
            {
                field: "status",
                operator: "eq",
                value: "draft",
            },
        ],
        syncWithLocation: true,
    });

    return (
        <List>
            <DataGrid
                {...dataGridProps}
                autoHeight
                rowsPerPageOptions={[10, 20, 30, 50, 100]}
            />
        </List>
    );
};
