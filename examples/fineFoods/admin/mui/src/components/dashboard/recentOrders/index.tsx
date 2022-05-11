/* eslint-disable react/display-name */
import React from "react";
import { useNavigation, useTranslate, useUpdate } from "@pankod/refine-core";

import { IOrder } from "interfaces";
import {
    Avatar,
    Button,
    DataGrid,
    GridActionsCellItem,
    GridColumns,
    NumberField,
    Stack,
    Typography,
    useDataGrid,
} from "@pankod/refine-mui";

import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import { OrderStatus } from "components/orderStatus";

export const RecentOrders: React.FC = () => {
    const t = useTranslate();
    const { show } = useNavigation();
    const { mutate } = useUpdate();

    const columns = React.useMemo<GridColumns<IOrder>>(
        () => [
            {
                field: "avatar",
                renderCell: ({ row }) => (
                    <Avatar
                        sx={{ width: 144, height: 144 }}
                        src={row?.products[0]?.images[0].url}
                    />
                ),
                width: 200,
            },
            {
                field: "summary",
                renderCell: ({ row }) => (
                    <Stack spacing={1} sx={{ height: "100%", mt: 2 }}>
                        <Typography
                            sx={{ fontWeight: 800, whiteSpace: "pre-wrap" }}
                        >
                            {row.products[0]?.name}
                        </Typography>
                        <Typography
                            sx={{
                                whiteSpace: "pre-wrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: "3",
                                WebkitBoxOrient: "vertical",
                            }}
                        >
                            {row.products[0]?.description}
                        </Typography>
                        <Button
                            variant="text"
                            onClick={() => show("orders", row.id)}
                            size="small"
                            sx={{ width: 80 }}
                        >
                            <Typography
                                sx={{ color: "text.primary", fontWeight: 700 }}
                            >
                                #{row.orderNumber}
                            </Typography>
                        </Button>
                    </Stack>
                ),
                flex: 1,
            },
            {
                field: "summary2",
                renderCell: ({ row }) => (
                    <Stack
                        spacing={1}
                        sx={{
                            whiteSpace: "pre-wrap",
                            height: "100%",
                            mt: 2,
                        }}
                    >
                        <Typography
                            sx={{ fontWeight: 800 }}
                        >{`${row.courier.name} ${row.courier.surname}`}</Typography>
                        <Typography>{row.adress.text}</Typography>
                    </Stack>
                ),
                width: 200,
            },
            {
                field: "amount",
                renderCell: ({ row }) => (
                    <NumberField
                        options={{
                            currency: "USD",
                            style: "currency",
                            notation: "standard",
                        }}
                        sx={{ fontWeight: 800 }}
                        value={row.amount / 100}
                    />
                ),
                width: 80,
            },
            {
                field: "status",
                headerAlign: "center",
                align: "center",
                renderCell: ({ row }) => (
                    <OrderStatus status={row.status.text} />
                ),
            },
            {
                field: "actions",
                type: "actions",
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

    const { dataGridProps } = useDataGrid<IOrder>({
        columns,
        resource: "orders",
        initialSorter: [
            {
                field: "createdAt",
                order: "desc",
            },
        ],
        initialPageSize: 4,
        permanentFilter: [
            {
                field: "status.text",
                operator: "eq",
                value: "Pending",
            },
        ],
        syncWithLocation: false,
    });

    return (
        <DataGrid
            {...dataGridProps}
            autoHeight
            headerHeight={0}
            rowHeight={170}
        />
    );
};
