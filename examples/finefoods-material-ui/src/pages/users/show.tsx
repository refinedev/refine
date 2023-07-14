import React from "react";
import {
    HttpError,
    IResourceComponentsProps,
    useShow,
    useTranslate,
} from "@refinedev/core";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { DateField, List, NumberField, useDataGrid } from "@refinedev/mui";

import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

import { CustomTooltip, OrderStatus } from "../../components";
import { IOrder, IOrderFilterVariables, IUser } from "../../interfaces";

const UserInfoText: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => (
    <Stack
        direction="row"
        alignItems="center"
        justifyContent={{
            sm: "center",
            lg: "flex-start",
        }}
        gap={1}
    >
        {children}
    </Stack>
);

export const UserShow: React.FC<IResourceComponentsProps> = () => {
    const t = useTranslate();

    const { queryResult } = useShow<IUser>();
    const user = queryResult.data?.data;

    const { dataGridProps } = useDataGrid<
        IOrder,
        HttpError,
        IOrderFilterVariables
    >({
        resource: "orders",
        initialSorter: [
            {
                field: "createdAt",
                order: "desc",
            },
        ],
        permanentFilter: [
            {
                field: "user.id",
                operator: "eq",
                value: user?.id,
            },
        ],
        initialPageSize: 4,
        queryOptions: {
            enabled: user !== undefined,
        },
        syncWithLocation: false,
    });

    const columns = React.useMemo<GridColDef<IOrder>[]>(
        () => [
            {
                field: "orderNumber",
                headerName: t("orders.fields.orderNumber"),
                width: 150,
            },
            {
                field: "status.text",
                headerName: t("orders.fields.status"),
                renderCell: function render({ row }) {
                    return <OrderStatus status={row.status.text} />;
                },
                width: 100,
            },
            {
                field: "amount",
                align: "right",
                headerAlign: "right",
                headerName: t("orders.fields.amount"),
                renderCell: function render({ row }) {
                    return (
                        <NumberField
                            options={{
                                currency: "USD",
                                style: "currency",
                                notation: "compact",
                            }}
                            value={row.amount}
                        />
                    );
                },
                width: 100,
            },
            {
                field: "store",
                headerName: t("orders.fields.store"),
                width: 150,
                valueGetter: ({ row }) => row.store.title,
                sortable: false,
            },
            {
                field: "user",
                headerName: t("orders.fields.user"),
                valueGetter: ({ row }) => row.user.fullName,
                sortable: false,
            },
            {
                field: "products",
                headerName: t("orders.fields.products"),
                flex: 1,
                headerAlign: "center",
                align: "center",
                sortable: false,
                renderCell: function render({ row }) {
                    return (
                        <CustomTooltip
                            arrow
                            placement="top"
                            title={
                                <Stack sx={{ padding: "2px" }}>
                                    {row.products.map((product) => (
                                        <li key={product.id}>{product.name}</li>
                                    ))}
                                </Stack>
                            }
                        >
                            <Typography sx={{ fontSize: "14px" }}>
                                {t("orders.fields.itemsAmount", {
                                    amount: row.products.length,
                                })}
                            </Typography>
                        </CustomTooltip>
                    );
                },
            },
            {
                field: "createdAt",
                headerName: t("orders.fields.createdAt"),
                flex: 1,
                renderCell: function render({ row }) {
                    return (
                        <DateField
                            value={row.createdAt}
                            format="LLL"
                            sx={{ whiteSpace: "pre-wrap", fontSize: "14px" }}
                        />
                    );
                },
            },
        ],
        [t],
    );

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} lg={3}>
                <Paper sx={{ p: 2, paddingX: { xs: 4, md: 2 } }}>
                    <Stack alignItems="center" spacing={1}>
                        <Avatar
                            src={user?.avatar?.[0].url}
                            sx={{ width: 120, height: 120 }}
                        />
                        <Typography variant="h6">
                            {user?.firstName} {user?.lastName}
                        </Typography>
                    </Stack>
                    <br />
                    <Stack spacing={1}>
                        <UserInfoText>
                            <PersonOutlineOutlinedIcon />
                            <Typography variant="body1">
                                {t(`users.fields.gender.${user?.gender}`)}
                            </Typography>
                        </UserInfoText>
                        <UserInfoText>
                            <LocalPhoneOutlinedIcon />
                            <Typography variant="body1">{user?.gsm}</Typography>
                        </UserInfoText>
                        <UserInfoText>
                            <DateRangeOutlinedIcon />
                            <Typography variant="body1">
                                {user?.createdAt}
                            </Typography>
                        </UserInfoText>
                        <UserInfoText>
                            <CheckOutlinedIcon />
                            <Typography variant="body1">
                                {user?.isActive
                                    ? t("users.fields.isActive.true")
                                    : t("users.fields.isActive.false")}
                            </Typography>
                        </UserInfoText>
                    </Stack>
                </Paper>
            </Grid>
            <Grid item xs={12} lg={9}>
                <Stack direction="column" spacing={2}>
                    <List
                        headerProps={{ title: t("orders.orders") }}
                        wrapperProps={{ sx: { paddingX: { xs: 2, md: 0 } } }}
                    >
                        <DataGrid
                            {...dataGridProps}
                            columns={columns}
                            autoHeight
                            pageSizeOptions={[4, 10, 20, 100]}
                        />
                    </List>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        {t("users.addresses.address")}
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {user?.addresses.map((row) => (
                                    <TableRow key={row.text}>
                                        <TableCell>{row.text}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Stack>
            </Grid>
        </Grid>
    );
};
