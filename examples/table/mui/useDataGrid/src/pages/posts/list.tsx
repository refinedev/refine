import React from "react";
import { useMany } from "@pankod/refine-core";
import { useDataGrid, DataGrid, GridColumns, List } from "@pankod/refine-mui";

import { ICategory, IPost } from "interfaces";

export const PostsList: React.FC = () => {
    const { dataGridProps } = useDataGrid<IPost>({
        initialCurrent: 2,
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
        <List>
            <DataGrid
                {...dataGridProps}
                columns={columns}
                autoHeight
                rowsPerPageOptions={[10, 20, 30, 50, 100]}
            />
        </List>
    );
};
