/* eslint-disable react/display-name */
import React from "react";
import { useTranslate, useNavigation } from "@pankod/refine-core";
import {
    Avatar,
    DataGrid,
    List,
    useDataGrid,
    GridColumns,
    GridActionsCellItem,
    DateField,
    BooleanField,
    TextFieldComponent,
} from "@pankod/refine-mui";
import { EditOutlined } from "@mui/icons-material";

import { IStore } from "interfaces";

export const StoreList: React.FC = () => {
    const t = useTranslate();
    const { edit, create } = useNavigation();

    const columns = React.useMemo<GridColumns<IStore>>(
        () => [
            {
                field: "avatar",
                headerName: "",
                align: "center",
                renderCell: () => (
                    <Avatar
                        sx={{ width: 64, height: 64 }}
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
                renderCell: ({ row }) => (
                    <TextFieldComponent
                        fontSize={14}
                        value={row.address.text}
                    />
                ),
            },
            {
                field: "createdAt",
                headerName: t("stores.fields.createdAt"),
                flex: 1,
                renderCell: ({ row }) => (
                    <DateField fontSize={14} value={row.createdAt} />
                ),
            },
            {
                field: "isActive",
                headerName: t("stores.fields.isActive"),
                flex: 0.5,
                align: "center",
                headerAlign: "center",
                renderCell: ({ row }) => (
                    <BooleanField
                        sx={{ fontSize: "0.875rem" }}
                        value={row.isActive}
                    />
                ),
            },
            {
                field: "actions",
                headerName: t("table.actions"),
                type: "actions",
                getActions: ({ row }) => [
                    <GridActionsCellItem
                        key={1}
                        label={t("buttons.edit")}
                        icon={<EditOutlined />}
                        showInMenu
                        onClick={() => edit("stores", row.id)}
                    />,
                    // <GridActionsCellItem
                    //     onClick={() => {
                    //         console.log("clicked");
                    //     }}
                    //     key={2}
                    //     label={t("buttons.reject")}
                    //     icon={<EditOutlined />}
                    //     showInMenu
                    // />,
                ],
            },
        ],
        [],
    );

    const { dataGridProps } = useDataGrid<IStore>({
        initialPageSize: 10,
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
            <DataGrid
                rowHeight={80}
                autoHeight
                density="comfortable"
                {...dataGridProps}
            />
        </List>
    );
};
