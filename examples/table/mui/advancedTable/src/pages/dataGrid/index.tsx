import React from "react";
import { useMany } from "@pankod/refine-core";
import {
    useDataGrid,
    DataGrid,
    GridColumns,
    GridToolbar,
    GridActionsCellItem,
} from "@pankod/refine-mui";

import { ICategory, IPost } from "interfaces";

export const BasicDataGrid: React.FC = () => {
    const { dataGridProps } = useDataGrid<IPost>();

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
                maxWidth: 70,
            },
            { field: "title", headerName: "Title", flex: 1, minWidth: 350 },
            {
                field: "category.id",
                headerName: "Category",
                flex: 1,
                type: "number",
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
            { field: "status", headerName: "Status", flex: 1 },
            {
                field: "actions",
                type: "actions",
                headerName: "Actions",
                getActions: () => [
                    <GridActionsCellItem key={1} label="Delete" showInMenu />,
                    <GridActionsCellItem key={2} label="Print" showInMenu />,
                ],
            },
        ],
        [],
    );

    return (
        <DataGrid
            {...dataGridProps}
            columns={columns}
            components={{
                Toolbar: GridToolbar,
            }}
            autoHeight
        />
    );
};
