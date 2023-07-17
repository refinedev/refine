import React from "react";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import {
    IResourceComponentsProps,
    useModal,
    useNavigation,
    useShow,
    useTranslate,
} from "@refinedev/core";
import {
    BooleanField,
    DateField,
    List,
    TextFieldComponent,
    useDataGrid,
} from "@refinedev/mui";

import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import EditOutlined from "@mui/icons-material/EditOutlined";

import { StoreProducts } from "../../components/store";
import { IStore } from "../../interfaces";

export const StoreList: React.FC<IResourceComponentsProps> = () => {
    const t = useTranslate();
    const { edit } = useNavigation();

    const { show, visible, close } = useModal();

    const { queryResult, setShowId } = useShow<IStore>();

    const { data: showQueryResult } = queryResult;
    const record = showQueryResult?.data;

    const { dataGridProps } = useDataGrid<IStore>({
        initialPageSize: 10,
    });

    const columns = React.useMemo<GridColDef<IStore>[]>(
        () => [
            {
                field: "avatar",
                headerName: "",
                align: "center",
                renderCell: function render() {
                    return (
                        <Avatar
                            sx={{ width: 64, height: 64 }}
                            src="/images/default-store-img.png"
                            alt="Default Store Image"
                        />
                    );
                },
            },
            {
                field: "id",
                align: "center",
                headerName: t("stores.fields.id"),
            },
            {
                field: "title",
                headerName: t("stores.fields.title"),
                flex: 1,
                minWidth: 160,
            },
            {
                field: "email",
                headerName: t("stores.fields.email"),
                flex: 2,
                minWidth: 300,
            },
            {
                field: "gsm",
                headerName: t("stores.fields.gsm"),
                flex: 1,
                minWidth: 150,
            },
            {
                field: "address",
                headerName: t("stores.fields.address"),
                flex: 2,
                minWidth: 300,
                renderCell: function render({ row }) {
                    return <TextFieldComponent value={row.address?.text} />;
                },
            },
            {
                field: "createdAt",
                headerName: t("stores.fields.createdAt"),
                flex: 1,
                minWidth: 100,
                renderCell: function render({ row }) {
                    return <DateField value={row.createdAt} />;
                },
            },
            {
                field: "isActive",
                headerName: t("stores.fields.isActive"),
                flex: 0.5,
                align: "center",
                headerAlign: "center",
                renderCell: function render({ row }) {
                    return (
                        <BooleanField
                            svgIconProps={{
                                sx: { width: "16px", height: "16px" },
                            }}
                            value={row.isActive}
                        />
                    );
                },
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
                    <GridActionsCellItem
                        onClick={() => {
                            show();
                            setShowId(row.id);
                        }}
                        key={2}
                        label={t("stores.buttons.edit")}
                        icon={<EditOutlined />}
                        showInMenu
                    />,
                ],
            },
        ],
        [t],
    );

    return (
        <Paper>
            <List
                canCreate
                wrapperProps={{ sx: { paddingX: { xs: 2, md: 0 } } }}
            >
                <DataGrid
                    {...dataGridProps}
                    columns={columns}
                    rowHeight={80}
                    autoHeight
                    density="comfortable"
                    pageSizeOptions={[10, 20, 50, 100]}
                />
            </List>
            {record && (
                <StoreProducts
                    record={record}
                    close={close}
                    visible={visible}
                />
            )}
        </Paper>
    );
};
