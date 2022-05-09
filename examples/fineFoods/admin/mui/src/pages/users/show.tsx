/* eslint-disable react/display-name */
import React from "react";
import {
    Avatar,
    DataGrid,
    DateField,
    Grid,
    GridColumns,
    NumberField,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    useDataGrid,
} from "@pankod/refine-mui";
import { HttpError, useShow, useTranslate } from "@pankod/refine-core";

import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

import { CustomTooltip, OrderStatus } from "components";

import { IOrder, IOrderFilterVariables, IUser } from "interfaces";

export const UserShow: React.FC = () => {
    const t = useTranslate();

    const { queryResult } = useShow<IUser>();
    const user = queryResult.data?.data;

    const columns = React.useMemo<GridColumns<IOrder>>(
        () => [
            {
                field: "orderNumber",
                headerName: t("orders.fields.orderNumber"),
                width: 150,
            },
            {
                field: "status",
                headerName: t("orders.fields.status"),
                renderCell: ({ row }) => (
                    <OrderStatus status={row.status.text} />
                ),
                width: 100,
            },
            {
                field: "amount",
                align: "right",
                headerAlign: "right",
                headerName: t("orders.fields.amount"),
                renderCell: ({ row }) => (
                    <NumberField
                        options={{
                            currency: "USD",
                            style: "currency",
                            notation: "compact",
                        }}
                        value={row.amount}
                    />
                ),
                width: 100,
            },
            {
                field: "store",
                headerName: t("orders.fields.store"),
                width: 150,
                valueGetter: ({ row }) => row.store.title,
            },
            {
                field: "user",
                headerName: t("orders.fields.user"),
                valueGetter: ({ row }) => row.user.fullName,
            },
            {
                field: "products",
                headerName: t("orders.fields.products"),
                flex: 1,
                headerAlign: "center",
                align: "center",
                renderCell: ({ row }) => (
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
                ),
            },
            {
                field: "createdAt",
                headerName: t("orders.fields.createdAt"),
                flex: 1,
                renderCell: ({ row }) => (
                    <DateField
                        value={row.createdAt}
                        format="LLL"
                        sx={{ whiteSpace: "pre-wrap", fontSize: "14px" }}
                    />
                ),
            },
        ],
        [],
    );

    const { dataGridProps } = useDataGrid<
        IOrder,
        HttpError,
        IOrderFilterVariables
    >({
        columns,
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

    return (
        <Grid container spacing={2}>
            <Grid item xs={3}>
                <Paper sx={{ p: 2 }}>
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
                        <Stack direction="row" alignItems="center" gap={1}>
                            <PersonOutlineOutlinedIcon />
                            <Typography variant="body1">
                                {t(`users.fields.gender.${user?.gender}`)}
                            </Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" gap={1}>
                            <LocalPhoneOutlinedIcon />
                            <Typography variant="body1">{user?.gsm}</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" gap={1}>
                            <DateRangeOutlinedIcon />
                            <Typography variant="body1">
                                {user?.createdAt}
                            </Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" gap={1}>
                            <CheckOutlinedIcon />
                            <Typography variant="body1">
                                {user?.isActive
                                    ? t("users.fields.isActive.true")
                                    : t("users.fields.isActive.false")}
                            </Typography>
                        </Stack>
                    </Stack>
                </Paper>
            </Grid>
            <Grid item xs={9}>
                <Grid container direction={"column"} spacing={2}>
                    <Grid item>
                        <Paper>
                            <DataGrid
                                {...dataGridProps}
                                autoHeight
                                rowsPerPageOptions={[4, 10, 20, 100]}
                            />
                        </Paper>
                    </Grid>
                    <Grid item>
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
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};
