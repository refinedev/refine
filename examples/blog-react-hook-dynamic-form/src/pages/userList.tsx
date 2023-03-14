import React from "react";
import { useDataGrid, List, EditButton, DeleteButton } from "@refinedev/mui";

import { Stack } from "@mui/material";
import { DataGrid, GridColumns } from "@mui/x-data-grid";

interface IPost {
    firstName: string;
    email: string;
    skills: string;
}

function UserList() {
    const { dataGridProps } = useDataGrid<IPost>();

    const columns = React.useMemo<GridColumns<IPost>>(
        () => [
            {
                field: "firstName",
                headerName: "First Name",
                flex: 1,
                minWidth: 250,
            },
            {
                field: "email",
                headerName: "Email",
                minWidth: 220,
                flex: 1,
            },
            {
                field: "skills",
                headerName: "Skills",
                minWidth: 220,
                flex: 1,
            },
            {
                headerName: "Actions",
                headerAlign: "center",
                field: "actions",
                minWidth: 180,
                align: "center",
                flex: 1,
                sortable: false,
                renderCell: function render({ row }: { row: any }) {
                    return (
                        <Stack direction="row" spacing={1}>
                            <EditButton
                                size="small"
                                hideText
                                recordItemId={row.id}
                            />
                            <DeleteButton
                                size="small"
                                hideText
                                recordItemId={row.id}
                            />
                        </Stack>
                    );
                },
            },
        ],
        [],
    );

    return (
        <List>
            <DataGrid {...dataGridProps} columns={columns} autoHeight />
        </List>
    );
}

export default UserList;
