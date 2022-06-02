import { useOne } from "@pankod/refine-core";
import {
    useDataGrid,
    DataGrid,
    GridColumns,
    EditButton,
    ShowButton,
    DeleteButton,
    TagField,
    DateField,
    List,
    Stack,
} from "@pankod/refine-mui";

import { IPost, ICategory } from "interfaces";

export const PostList: React.FC = () => {
    const columns: GridColumns = [
        { field: "title", headerName: "Title", flex: 1, minWidth: 350 },
        {
            field: "category.id",
            headerName: "Category",
            type: "number",
            minWidth: 350,
            valueGetter: (params) => {
                const { data } = useOne<ICategory>({
                    resource: "categories",
                    id: params.row.category.id,
                });
                return data?.data.title;
            },
        },
        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            renderCell: function render(params) {
                return <TagField value={params.row.status} />;
            },
        },
        {
            field: "createdAt",
            headerName: "CreatedAt",
            minWidth: 200,
            renderCell: function render(params) {
                return <DateField format="LLL" value={params.row.createdAt} />;
            },
        },
        {
            headerName: "Actions",
            field: "actions",
            minWidth: 250,
            renderCell: function render(params) {
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

    const { dataGridProps } = useDataGrid<IPost>({
        columns,
    });

    const {
        filterMode,
        filterModel,
        onFilterModelChange,
        ...restDataGridProps
    } = dataGridProps;

    return (
        <List>
            <DataGrid
                {...restDataGridProps}
                filterMode={filterMode}
                filterModel={filterModel}
                onFilterModelChange={onFilterModelChange}
                autoHeight
            />
        </List>
    );
};
