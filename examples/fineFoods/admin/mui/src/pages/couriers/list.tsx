import React from "react";
import {
    useTranslate,
    IResourceComponentsProps,
    useDelete,
    useNavigation,
} from "@pankod/refine-core";
import {
    DataGrid,
    useDataGrid,
    GridColumns,
    GridActionsCellItem,
    List,
    Stack,
    Avatar,
    Typography,
} from "@pankod/refine-mui";
import { Edit, Close } from "@mui/icons-material";

import { ICourier } from "interfaces";

export const CourierList: React.FC<IResourceComponentsProps> = () => {
    const { show, edit } = useNavigation();
    const t = useTranslate();
    const { mutate: mutateDelete } = useDelete();

    const columns = React.useMemo<GridColumns<ICourier>>(
        () => [
            {
                field: "name",
                headerName: t("couriers.fields.name"),
                // eslint-disable-next-line react/display-name
                renderCell: ({ row }) => (
                    <Stack alignItems="center" direction="row" spacing={2}>
                        <Avatar
                            alt={`${row.name} ${row.surname}`}
                            src={row.avatar[0].url}
                        />
                        <Typography>
                            {row.name} {row.surname}
                        </Typography>
                    </Stack>
                ),
                flex: 1,
            },
            {
                field: "gsm",
                headerName: t("couriers.fields.gsm"),
                valueGetter: ({ row }) => row.gsm,
                flex: 1,
            },
            {
                field: "order",
                headerName: t("couriers.fields.email"),
                valueGetter: ({ row }) => row.email,
                flex: 1,
            },
            {
                field: "comment",
                headerName: t("couriers.fields.address"),
                // eslint-disable-next-line react/display-name
                renderCell: ({ row }) => (
                    <Typography sx={{ whiteSpace: "normal" }}>
                        {row.address}
                    </Typography>
                ),
                flex: 1,
            },
            {
                field: "actions",
                headerName: t("table.actions"),
                type: "actions",
                getActions: ({ row }) => [
                    <GridActionsCellItem
                        key={1}
                        label={t("buttons.edit")}
                        icon={<Edit color="success" />}
                        onClick={() => edit("couriers", row.id)}
                        showInMenu
                    />,
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
                ],
            },
        ],
        [],
    );

    const { dataGridProps } = useDataGrid<ICourier>({
        columns,
        permanentFilter: [
            {
                field: "status",
                operator: "eq",
                value: "pending",
            },
        ],
    });

    return (
        <List>
            <DataGrid
                {...dataGridProps}
                autoHeight
                density="comfortable"
                rowsPerPageOptions={[10]}
            />
        </List>
    );
};
