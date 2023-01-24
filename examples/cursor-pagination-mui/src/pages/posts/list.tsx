import React from "react";
import { useDataGrid, DataGrid, GridColumns, List } from "@pankod/refine-mui";

import { ICommit } from "interfaces";

export const PostsList: React.FC = () => {
    const [next, setNext] = React.useState(undefined);
    const { dataGridProps, setCurrent, tableQueryResult } =
        useDataGrid<ICommit>({
            initialPageSize: 5,
            metaData: {
                cursor: {
                    next,
                },
            },
        });

    const { data } = tableQueryResult;

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
            minWidth: 140,
            flex: 1,
            filterable: false,
            sortable: false,
            renderCell: ({ row }) => {
                return row.commit.author.date;
            },
        },
    ];

    return (
        <List>
            <DataGrid
                getRowId={(row) => row.sha}
                {...dataGridProps}
                onPageChange={(page, details) => {
                    if (data?.cursor) {
                        setNext(data?.cursor?.next);
                    }
                    dataGridProps.onPageChange?.(page, details);
                }}
                columns={columns}
                autoHeight
            />
        </List>
    );
};
