import {
    useDataGrid,
    DataGrid,
    GridColumns,
    List,
    EditButton,
} from "@pankod/refine-mui";

import { IPost } from "interfaces";

const columns: GridColumns = [
    {
        field: "id",
        headerName: "ID",
        type: "number",
    },
    { field: "title", headerName: "Title", minWidth: 500, flex: 1 },
    { field: "status", headerName: "Status", minWidth: 120, flex: 0.5 },
    {
        field: "actions",
        headerName: "Actions",
        renderCell: function render({ row }) {
            return <EditButton hideText recordItemId={row.id} />;
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
    },
];

export const PostsList: React.FC = () => {
    const { dataGridProps } = useDataGrid<IPost>({
        columns,
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
