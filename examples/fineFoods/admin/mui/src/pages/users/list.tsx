/* eslint-disable react/display-name */
import React from "react";
import { useTranslate } from "@pankod/refine-core";
import {
    DataGrid,
    Grid,
    GridColumns,
    Paper,
    Avatar,
    useDataGrid,
    BooleanField,
    DateField,
    ShowButton,
} from "@pankod/refine-mui";

import { IUser } from "interfaces";

export const UserList: React.FC = () => {
    const t = useTranslate();

    const columns = React.useMemo<GridColumns<IUser>>(
        () => [
            {
                field: "gsm",
                headerName: t("users.fields.gsm"),
                width: 150,
            },
            {
                field: "avatar",
                headerName: t("users.fields.avatar.label"),
                renderCell: ({ row }) => <Avatar src={row.avatar[0].url} />,
                width: 100,
            },
            {
                field: "firstName",
                headerName: t("users.fields.firstName"),
                width: 150,
            },
            {
                field: "lastName",
                headerName: t("users.fields.lastName"),
                width: 150,
            },
            {
                field: "gender",
                headerName: t("users.fields.gender.label"),
                valueGetter: ({ row }) =>
                    t(`users.fields.gender.${row.gender}`),
            },
            {
                field: "isActive",
                headerName: t("users.fields.isActive.label"),
                renderCell: ({ row }) => <BooleanField value={row.isActive} />,
            },
            {
                field: "createdAt",
                headerName: t("users.fields.createdAt"),
                renderCell: ({ row }) => (
                    <DateField value={row.createdAt} format="LLL" />
                ),
                width: 200,
            },
            {
                field: "actions",
                headerName: t("table.actions"),
                renderCell: ({ row }) => (
                    <ShowButton
                        variant="outlined"
                        size="small"
                        hideText
                        recordItemId={row.id}
                    />
                ),
                align: "center",
                headerAlign: "center",
                flex: 1,
            },
        ],
        [],
    );

    const { dataGridProps } = useDataGrid<IUser>({
        columns,
    });

    return (
        <Grid container spacing={2}>
            <Grid item xs={3}></Grid>
            <Grid item xs={9}>
                <Paper sx={{ height: "700px" }}>
                    <DataGrid {...dataGridProps} filterModel={undefined} />
                </Paper>
            </Grid>
        </Grid>
    );
};
