/* eslint-disable react/display-name */
import React from "react";
import {
    IResourceComponentsProps,
    BaseRecord,
    CrudFilters,
    HttpError,
    useTranslate,
    useNavigation,
    useUpdate,
} from "@pankod/refine-core";
import {
    useDataGrid,
    DataGrid,
    Grid,
    Box,
    MenuItem,
    TextField,
    Card,
    CardContent,
    Button,
    NumberField,
    Tooltip,
    Typography,
    DateField,
    GridColumns,
    GridActionsCellItem,
    Stack,
} from "@pankod/refine-mui";
import { useForm } from "@pankod/refine-react-hook-form";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import { OrderStatus, CustomTooltip } from "components";
import { IOrder, IOrderFilterVariables } from "interfaces";

export const OrderList: React.FC<IResourceComponentsProps> = () => {
    const t = useTranslate();
    const { mutate } = useUpdate();

    const columns = React.useMemo<GridColumns<IOrder>>(
        () => [
            {
                field: "orderNumber",
                headerName: t("orders.fields.orderNumber"),
                description: t("orders.fields.orderNumber"),
                flex: 1,
                headerAlign: "center",
                align: "center",
            },
            {
                field: "status",
                headerName: t("orders.fields.status"),
                flex: 1,
                headerAlign: "center",
                align: "center",
                renderCell: ({ row }) => (
                    <OrderStatus status={row.status.text} />
                ),
            },
            {
                field: "amount",
                headerName: t("orders.fields.amount"),
                flex: 1,
                headerAlign: "center",
                align: "center",
                renderCell: ({ row }) => (
                    <NumberField
                        options={{
                            currency: "USD",
                            style: "currency",
                        }}
                        value={row.amount / 100}
                        sx={{ fontSize: "14px" }}
                    />
                ),
            },
            {
                field: "store",
                headerName: t("orders.fields.store"),
                flex: 1,
                valueGetter: ({ row }) => row.store.title,
            },
            {
                field: "user",
                headerName: t("orders.fields.user"),
                flex: 1,
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
            {
                field: "actions",
                type: "actions",
                headerName: t("table.actions"),
                width: 80,
                getActions: ({ id }) => [
                    <GridActionsCellItem
                        key={1}
                        icon={<CheckOutlinedIcon color="success" />}
                        sx={{ padding: "2px 6px" }}
                        label="Accept"
                        showInMenu
                        onClick={() => {
                            mutate({
                                resource: "orders",
                                id,
                                values: {
                                    status: {
                                        id: 2,
                                        text: "Ready",
                                    },
                                },
                            });
                        }}
                    />,
                    <GridActionsCellItem
                        key={2}
                        icon={<CloseOutlinedIcon color="error" />}
                        sx={{ padding: "2px 6px" }}
                        label="Reject"
                        showInMenu
                        onClick={() =>
                            mutate({
                                resource: "orders",
                                id,
                                values: {
                                    status: {
                                        id: 5,
                                        text: "Cancelled",
                                    },
                                },
                            })
                        }
                    />,
                ],
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
                        />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};
