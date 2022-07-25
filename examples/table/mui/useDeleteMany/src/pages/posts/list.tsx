import React from "react";
import { useMany, useDeleteMany } from "@pankod/refine-core";
import {
    useDataGrid,
    DataGrid,
    GridColumns,
    List,
    Button,
} from "@pankod/refine-mui";

import { ICategory, IPost } from "interfaces";

export const PostsList: React.FC = () => {
    const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>(
        [],
    );
    const hasSelected = selectedRowKeys.length > 0;

    const { mutate } = useDeleteMany<IPost>();

    const deleteSelectedItems = () => {
        mutate(
            {
                resource: "posts",
                ids: selectedRowKeys.map(String),
            },
            {
                onSuccess: () => {
                    setSelectedRowKeys([]);
                },
            },
        );
    };

    const { dataGridProps } = useDataGrid<IPost>({
        initialPageSize: 10,
    });

    const categoryIds = dataGridProps.rows.map((item) => item.category.id);
    const { data: categoriesData, isLoading } = useMany<ICategory>({
        resource: "categories",
        ids: categoryIds,
        queryOptions: {
            enabled: categoryIds.length > 0,
        },
    });

    const columns = React.useMemo<GridColumns<IPost>>(
        () => [
            {
                field: "id",
                headerName: "ID",
                type: "number",
                width: 50,
            },
            { field: "title", headerName: "Title", minWidth: 400, flex: 1 },
            {
                field: "category.id",
                headerName: "Category",
                type: "number",
                headerAlign: "left",
                align: "left",
                minWidth: 250,
                flex: 0.5,
                renderCell: function render({ row }) {
                    if (isLoading) {
                        return "Loading...";
                    }

                    const category = categoriesData?.data.find(
                        (item) => item.id === row.category.id,
                    );
                    return category?.title;
                },
            },
            { field: "status", headerName: "Status", minWidth: 120, flex: 0.3 },
        ],
        [categoriesData, isLoading],
    );

    return (
        <List
            cardProps={{ sx: { paddingX: { xs: 2, md: 0 } } }}
            cardHeaderProps={{
                subheader: (
                    <Button
                        onClick={deleteSelectedItems}
                        disabled={!hasSelected}
                        size="small"
                        variant="contained"
                    >
                        Delete Selected
                    </Button>
                ),
            }}
        >
            <DataGrid
                {...dataGridProps}
                columns={columns}
                autoHeight
                checkboxSelection
                onSelectionModelChange={(newSelectionModel) => {
                    setSelectedRowKeys(newSelectionModel as React.Key[]);
                }}
                rowsPerPageOptions={[10, 20, 50, 100]}
                selectionModel={selectedRowKeys}
            />
        </List>
    );
};
