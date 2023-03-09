import React from "react";
import { useDataGrid, List } from "@refinedev/mui";

import { DataGrid, GridColumns } from "@mui/x-data-grid";

import { ICommit } from "interfaces";

export const PostList: React.FC = () => {
    const [next, setNext] = React.useState<string | undefined>(undefined);
    const { dataGridProps, tableQueryResult } = useDataGrid<ICommit>({
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
                    // Github API returns the latest commit date as the next cursor
                    const lastRow = data?.data[data.data.length - 1];
                    const next = lastRow?.commit.committer.date;
                    if (next) {
                        setNext(next);
                    }
                    dataGridProps.onPageChange?.(page, details);
                }}
                columns={columns}
                autoHeight
            />
        </List>
    );
};
