import React from "react";
import { useOne } from "@pankod/refine-core";
import { useDataGrid, List } from "@pankod/refine-mui";
import { DataGridPro, GridColumns } from "@mui/x-data-grid-pro";

import { ICategory, IPost } from "interfaces";

export const PostsList: React.FC = () => {
    const columns = React.useMemo<GridColumns<IPost>>(
        () => [
            {
                field: "id",
                headerName: "ID",
                type: "number",
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
                valueGetter: ({ row }) => {
                    const { data } = useOne<ICategory>({
                        resource: "categories",
                        id: row.category.id,
                    });
                    return data?.data.title;
                },
            },
            { field: "status", headerName: "Status", minWidth: 120, flex: 0.3 },
        ],
        [],
    );

    const { dataGridProps } = useDataGrid<IPost>({
        columns,
        initialCurrent: 2,
        initialPageSize: 10,
        initialSorter: [
            {
                field: "title",
                order: "asc",
            },
            {
                field: "id",
                order: "asc",
            },
        ],
        initialFilter: [
            {
                field: "status",
                operator: "eq",
                value: "draft",
            },
            {
                field: "title",
                operator: "contains",
                value: "A",
            },
        ],
        syncWithLocation: true,
    });

    return (
        <List>
            <DataGridPro
                {...dataGridProps}
                autoHeight
                rowsPerPageOptions={[10, 20, 30, 50, 100]}
            />
        </List>
    );
};
