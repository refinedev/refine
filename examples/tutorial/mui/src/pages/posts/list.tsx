import React from "react";
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
    const columns = React.useMemo<GridColumns<IPost>>(
        () => [
            { field: "title", headerName: "Title", flex: 1, minWidth: 350 },
            {
                field: "category.id",
                headerName: "Category",
                minWidth: 250,
                flex: 1,
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
                flex: 1,
                renderCell: function render(params) {
                    return <TagField value={params.row.status} />;
                },
            },
            {
                field: "createdAt",
                headerName: "CreatedAt",
                minWidth: 220,
                renderCell: function render(params) {
                    return (
                        <DateField format="LLL" value={params.row.createdAt} />
                    );
                },
            },
            {
                headerName: "Actions",
                headerAlign: "center",
                field: "actions",
                minWidth: 180,
                align: "center",
                flex: 1,
                renderCell: function render(params) {
                    return (
                        <Stack direction="row" spacing={1}>
                            <EditButton
                                size="small"
                                hideText
                                recordItemId={params.row.id}
                            />
                            <ShowButton
                                size="small"
                                hideText
                                recordItemId={params.row.id}
                            />
                            <DeleteButton
                                size="small"
                                hideText
                                recordItemId={params.row.id}
                            />
                        </Stack>
                    );
                },
            },
        ],
        [],
    );

    const { dataGridProps } = useDataGrid<IPost>({
        columns,
    });

    return (
        <List>
            <DataGrid {...dataGridProps} autoHeight />
        </List>
    );
};
