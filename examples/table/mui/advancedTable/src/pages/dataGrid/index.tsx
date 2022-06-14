import React from "react";
import { useOne } from "@pankod/refine-core";
import {
    useDataGrid,
    DataGrid,
    GridColumns,
    GridToolbar,
    GridActionsCellItem,
} from "@pankod/refine-mui";

import { IPost } from "interfaces";

export const BasicDataGrid: React.FC = () => {
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
                valueGetter: (params) => {
                    const { data } = useOne({
                        resource: "categories",
                        id: params.row.category.id,
                    });
                    return data?.data.title;
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
    const { dataGridProps } = useDataGrid({
        columns,
    });

    return (
        <DataGrid
            {...dataGridProps}
            components={{
                Toolbar: GridToolbar,
            }}
            autoHeight
        />
    );
};
