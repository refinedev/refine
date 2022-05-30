import { useOne } from "@pankod/refine-core";
import {
    useDataGrid,
    DataGrid,
    GridColumns,
    EditButton,
    ShowButton,
    DeleteButton,
    List,
    Stack,
} from "@pankod/refine-mui";

const columns: GridColumns = [
    { field: "title", headerName: "Title", flex: 1, minWidth: 350 },
    {
        field: "category.id",
        headerName: "Category",
        type: "number",
        minWidth: 350,
        valueGetter: (params) => {
            const { data } = useOne({
                resource: "categories",
                id: params.row.category.id,
            });
            return data?.data.title;
        },
    },
    { field: "status", headerName: "Status", minWidth: 150 },
    {
        headerName: "Actions",
        field: "actions",
        minWidth: 250,
        // eslint-disable-next-line react/display-name
        renderCell: (params) => {
            return (
                <Stack direction="row" spacing={1}>
                    <EditButton
                        hideText
                        size="small"
                        variant="outlined"
                        recordItemId={params.row.id}
                    />
                    <ShowButton
                        hideText
                        size="small"
                        variant="outlined"
                        recordItemId={params.row.id}
                    />
                    <DeleteButton
                        hideText
                        size="small"
                        variant="outlined"
                        recordItemId={params.row.id}
                    />
                </Stack>
            );
        },
    },
];

export const PostList: React.FC = () => {
    const { dataGridProps } = useDataGrid({
        columns,
    });

    return (
        <List>
            <DataGrid {...dataGridProps} autoHeight />
        </List>
    );
};
