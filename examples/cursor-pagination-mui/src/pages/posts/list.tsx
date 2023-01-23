import React from "react";
import {
    useDataGrid,
    DataGrid,
    GridColumns,
    List,
    DateField,
} from "@pankod/refine-mui";

import { ICommit } from "interfaces";

export const PostsList: React.FC = () => {
    const { dataGridProps } = useDataGrid<ICommit>();

    const columns: GridColumns<ICommit> = [
        {
            field: "sha",
            headerName: "SHA",
            type: "string",
            width: 100,
            filterable: false,
            sortable: false,
        },
        {
            field: "message",
            headerName: "Message",
            minWidth: 400,
            flex: 1,
            filterable: false,
            sortable: false,
            renderCell: ({ row }) => {
                return row.commit.message;
            },
        },
        {
            field: "author",
            headerName: "Author",
            minWidth: 140,
            flex: 1,
            filterable: false,
            sortable: false,
            renderCell: ({ row }) => {
                return row.commit.author.name;
            },
        },
        {
            field: "date",
            headerName: "Date",
            minWidth: 100,
            flex: 1,
            filterable: false,
            sortable: false,
            renderCell: ({ row }) => {
                return (
                    <DateField value={row.commit.author.date} format="lll" />
                );
            },
        },
    ];

    return (
        <List>
            <DataGrid
                getRowId={(row) => row.sha}
                {...dataGridProps}
                columns={columns}
                autoHeight
            />
        </List>
    );
};
