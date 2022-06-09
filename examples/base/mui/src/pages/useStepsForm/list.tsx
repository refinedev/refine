import {
    useDataGrid,
    DataGrid,
    GridColumns,
    GridToolbar,
    List,
    EditButton,
} from "@pankod/refine-mui";

const columns: GridColumns = [
    {
        field: "id",
        headerName: "ID",
        type: "number",
    },
    { field: "title", headerName: "Title", flex: 1, minWidth: 350 },
    { field: "status", headerName: "Status", flex: 1 },
    {
        field: "action",
        headerName: "Actions",
        // eslint-disable-next-line react/display-name
        renderCell: (params) => <EditButton recordItemId={params.id} />,
    },
];

export const UseStepsList: React.FC = () => {
    const { dataGridProps } = useDataGrid({
        columns,
    });

    return (
        <List>
            <div style={{ height: 700, width: "100%" }}>
                <DataGrid
                    {...dataGridProps}
                    components={{
                        Toolbar: GridToolbar,
                    }}
                />
            </div>
        </List>
    );
};
