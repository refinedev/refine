import React from "react";

import { useTranslate } from "@pankod/refine-core";

import {
    Avatar,
    DataGrid,
    List,
    useDataGrid,
    GridColumns,
    GridActionsCellItem,
    DateField,
} from "@pankod/refine-mui";

import { IStore } from "interfaces";

import { Check, Clear } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";

export const StoreList: React.FC = () => {
    const t = useTranslate();

    const columns = React.useMemo<GridColumns<IStore>>(
        () => [
            {
                field: "avatar",
                headerName: "Avatar",
                // eslint-disable-next-line react/display-name
                renderCell: () => (
                    <Avatar
                        src="/images/default-store-img.png"
                        alt="Default Store Image"
                    />
                ),
            },
            {
                field: "id",
                headerName: t("stores.fields.id"),
            },
            {
                field: "title",
                headerName: t("stores.fields.title"),
                flex: 1,
            },
            {
                field: "email",
                headerName: t("stores.fields.email"),
                flex: 1,
            },
            {
                field: "gsm",
                headerName: t("stores.fields.gsm"),
                flex: 1,
            },
            {
                field: "address",
                headerName: t("stores.fields.address"),
                flex: 2,
                // eslint-disable-next-line react/display-name
                renderCell: ({ row }) => <div>{row.address.text}</div>,
            },
            {
                field: "createdAt",
                headerName: t("stores.fields.createdAt"),
                flex: 1,
                // eslint-disable-next-line react/display-name
                renderCell: ({ row }) => {
                    return <DateField value={row.createdAt} />;
                },
            },
            {
                field: "isActive",
                headerName: t("stores.fields.isActive"),
                flex: 0.5,
                // eslint-disable-next-line react/display-name
                renderCell: ({ row }) => {
                    return row.isActive ? <Check /> : <Clear />;
                },
            },
            {
                field: "actions",
                headerName: t("table.actions"),
                type: "actions",
                getActions: () => [
                    <GridActionsCellItem
                        key={1}
                        label={t("buttons.edit")}
                        icon={<EditIcon />}
                        showInMenu
                    />,
                    <GridActionsCellItem
                        key={2}
                        label={t("buttons.reject")}
                        icon={<EditIcon />}
                        showInMenu
                    />,
                ],
            },
        ],
        [],
    );

    const { dataGridProps } = useDataGrid<IStore>({
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
        <List canCreate>
            <DataGrid autoHeight density="comfortable" {...dataGridProps} />
        </List>
    );
};
