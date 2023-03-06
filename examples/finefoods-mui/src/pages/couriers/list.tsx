import React from "react";
import {
    useTranslate,
    IResourceComponentsProps,
    useDelete,
    useNavigation,
} from "@refinedev/core";
import { useDataGrid, List } from "@refinedev/mui";
import { Stack, Avatar, Typography, Tooltip } from "@mui/material";
import { DataGrid, GridColumns, GridActionsCellItem } from "@mui/x-data-grid";
import { Edit, Close } from "@mui/icons-material";

import { ICourier } from "interfaces";

export const CourierList: React.FC<IResourceComponentsProps> = () => {
    const { show, edit } = useNavigation();
    const t = useTranslate();
    const { mutate: mutateDelete } = useDelete();

    const { dataGridProps } = useDataGrid<ICourier>({
        initialPageSize: 10,
        initialSorter: [
            {
                field: "id",
                order: "desc",
            },
        ],
    });

    const columns = React.useMemo<GridColumns<ICourier>>(
        () => [
            {
                field: "name",
                headerName: t("couriers.fields.name"),
                renderCell: function render({ row }) {
                    return (
                        <Stack alignItems="center" direction="row" spacing={2}>
                            <Avatar
                                alt={`${row.name} ${row.surname}`}
                                src={row.avatar?.[0]?.url}
                            />
                            <Typography variant="body2">
                                {row.name} {row.surname}
                            </Typography>
                        </Stack>
                    );
                },
                flex: 1,
                minWidth: 200,
            },
            {
                field: "gsm",
                headerName: t("couriers.fields.gsm"),
                flex: 1,
                minWidth: 200,
            },
            {
                field: "email",
                headerName: t("couriers.fields.email"),
                flex: 1,
                minWidth: 300,
            },
            {
                field: "address",
                headerName: t("couriers.fields.address"),
                renderCell: function render({ row }) {
                    return (
                        <Tooltip title={row.address}>
                            <Typography
                                variant="body2"
                                sx={{
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",
                                }}
                            >
                                {row.address}
                            </Typography>
                        </Tooltip>
                    );
                },
                flex: 1,
                minWidth: 300,
            },
            {
                field: "actions",
                headerName: t("table.actions"),
                type: "actions",
                getActions: function render({ row }) {
                    return [
                        // @ts-expect-error `@mui/x-data-grid@5.17.12` broke the props of `GridActionsCellItem` and requires `onResize` and `onResizeCapture` props which should be optional.
                        <GridActionsCellItem
                            key={1}
                            label={t("buttons.edit")}
                            icon={<Edit color="success" />}
                            onClick={() => edit("couriers", row.id)}
                            showInMenu
                        />,
                        // @ts-expect-error `@mui/x-data-grid@5.17.12` broke the props of `GridActionsCellItem` and requires `onResize` and `onResizeCapture` props which should be optional.
                        <GridActionsCellItem
                            key={2}
                            label={t("buttons.delete")}
                            icon={<Close color="error" />}
                            onClick={() => {
                                mutateDelete({
                                    resource: "couriers",
                                    id: row.id,
                                    mutationMode: "undoable",
                                });
                            }}
                            showInMenu
                        />,
                    ];
                },
            },
        ],
        [t],
    );

    return (
        <List wrapperProps={{ sx: { paddingX: { xs: 2, md: 0 } } }}>
            <DataGrid
                {...dataGridProps}
                columns={columns}
                autoHeight
                rowsPerPageOptions={[10, 20, 50, 100]}
                density="comfortable"
                sx={{
                    "& .MuiDataGrid-cell:hover": {
                        cursor: "pointer",
                    },
                }}
                onRowClick={(row) => {
                    show("couriers", row.id);
                }}
            />
        </List>
    );
};
