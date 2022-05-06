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
                flex: 1,
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
                flex: 1,
            },
            {
                field: "lastName",
                headerName: t("users.fields.lastName"),
                flex: 1,
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
                flex: 1,
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
