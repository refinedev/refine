/* eslint-disable react/display-name */
import React from "react";
import {
    IResourceComponentsProps,
    BaseRecord,
    CrudFilters,
    HttpError,
    useTranslate,
    useNavigation,
} from "@pankod/refine-core";
import {
    useDataGrid,
    DataGrid,
    GridColDef,
    Grid,
    Box,
    MenuItem,
    TextField,
    Card,
    CardContent,
    Button,
    GridRenderCellParams,
    NumberField,
    Tooltip,
    Typography,
    DateField,
} from "@pankod/refine-mui";
import { useForm } from "@pankod/refine-react-hook-form";

import { OrderStatus } from "components";
import {
    IOrder,
    IOrderFilterVariables,
    IOrderStatus,
    IProduct,
} from "interfaces";

export const OrderList: React.FC<IResourceComponentsProps> = () => {
    const t = useTranslate();

    const columns: GridColDef[] = React.useMemo(
        () => [
            {
                field: "orderNumber",
                headerName: t("orders.fields.orderNumber"),
                description: t("orders.fields.orderNumber"),
                flex: 1,
            },
            {
                field: "status",
                headerName: t("orders.fields.status"),
                flex: 1,
                renderCell: (params: GridRenderCellParams<IOrderStatus>) => (
                    <OrderStatus status={params.value?.text} />
                ),
            },
            {
                field: "amount",
                headerName: t("orders.fields.amount"),
                flex: 1,
                renderCell: (params: GridRenderCellParams<number>) =>
                    params.value && (
                        <NumberField
                            options={{
                                currency: "USD",
                                style: "currency",
                            }}
                            value={params.value / 100}
                        />
                    ),
            },
            {
                field: "store",
                headerName: t("orders.fields.store"),
                flex: 1,
                valueGetter: ({ value }) => value.title,
            },
            {
                field: "user",
                headerName: t("orders.fields.user"),
                flex: 1,
                valueGetter: ({ value }) => value.fullName,
            },
            {
                field: "products",
                headerName: t("orders.fields.products"),
                flex: 1,
                renderCell: (params: GridRenderCellParams<IProduct[]>) =>
                    params.value && (
                        <Tooltip
                            title={
                                <ul>
                                    {params.value.map((product) => (
                                        <li key={product.id}>{product.name}</li>
                                    ))}
                                </ul>
                            }
                        >
                            <Typography>
                                {t("orders.fields.itemsAmount", {
                                    amount: params.value.length,
                                })}
                            </Typography>
                        </Tooltip>
                    ),
            },
            {
                field: "createdAt",
                headerName: t("orders.fields.createdAt"),
                flex: 1,
                renderCell: (params: GridRenderCellParams<string>) =>
                    params.value && (
                        <DateField value={params.value} format="LLL" />
                    ),
            },
            {
                field: "actions",
                headerName: t("table.actions"),
                width: 100,
            },
        ],
        [],
    );

    const { dataGridProps, onSearch } = useDataGrid<
        IOrder,
        HttpError,
        IOrderFilterVariables
    >({
        columns,
        initialPageSize: 10,
        onSearch: (params) => {
            const filters: CrudFilters = [];
            const { q, store, user, createdAt, status } = params;

            if (q) {
                filters.push({
                    field: "q",
                    operator: "eq",
                    value: q,
                });
            }

            if (store) {
                filters.push({
                    field: "store.id",
                    operator: "eq",
                    value: store,
                });
            }

            if (user) {
                filters.push({
                    field: "user.id",
                    operator: "eq",
                    value: user,
                });
            }

            if (status) {
                filters.push({
                    field: "status.text",
                    operator: "in",
                    value: status,
                });
            }

            if (createdAt) {
                filters.push({
                    field: "createdAt",
                    operator: "eq",
                    value: createdAt,
                });
            }

            return filters;
        },
    });

    const { register, handleSubmit } =
        useForm<BaseRecord, HttpError, IOrderFilterVariables>();

    const { show } = useNavigation();

    return (
        <Grid container spacing={2}>
            <Grid item xs={2}>
                <Card>
                    <CardContent>
                        <Box
                            component="form"
                            sx={{ display: "flex", flexDirection: "column" }}
                            autoComplete="off"
                            onSubmit={handleSubmit(onSearch)}
                        >
                            <TextField
                                {...register("q")}
                                label={t("orders.filter.search.label")}
                                placeholder={t(
                                    "orders.filter.search.placeholder",
                                )}
                                margin="normal"
                                fullWidth
                                autoFocus
                            />
                            <TextField
                                {...register("status")}
                                label={t("orders.filter.status.label")}
                                placeholder={t(
                                    "orders.filter.status.placeholder",
                                )}
                                margin="normal"
                                select
                            >
                                <MenuItem value="published">Published</MenuItem>
                                <MenuItem value="draft">Draft</MenuItem>
                                <MenuItem value="rejected">Rejected</MenuItem>
                            </TextField>
                            <TextField
                                {...register("store")}
                                label={t("orders.filter.store.label")}
                                placeholder={t(
                                    "orders.filter.store.placeholder",
                                )}
                                margin="normal"
                                select
                            >
                                <MenuItem value="published">Published</MenuItem>
                                <MenuItem value="draft">Draft</MenuItem>
                                <MenuItem value="rejected">Rejected</MenuItem>
                            </TextField>
                            <TextField
                                {...register("user")}
                                label={t("orders.filter.user.label")}
                                placeholder={t(
                                    "orders.filter.user.placeholder",
                                )}
                                margin="normal"
                                select
                            >
                                <MenuItem value="published">Published</MenuItem>
                                <MenuItem value="draft">Draft</MenuItem>
                                <MenuItem value="rejected">Rejected</MenuItem>
                            </TextField>
                            <TextField
                                {...register("createdAt")}
                                label={t("orders.filter.createdAt.label")}
                                placeholder={t(
                                    "orders.filter.store.placeholder",
                                )}
                                margin="normal"
                                select
                            >
                                <MenuItem value="published">Published</MenuItem>
                                <MenuItem value="draft">Draft</MenuItem>
                                <MenuItem value="rejected">Rejected</MenuItem>
                            </TextField>
                            <br />
                            <Button type="submit" variant="contained">
                                {t("orders.filter.submit")}
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={10}>
                <Card>
                    <CardContent sx={{ height: "700px" }}>
                        <DataGrid
                            {...dataGridProps}
                            rowsPerPageOptions={[10, 20, 50, 100]}
                            autoHeight
                        />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};
