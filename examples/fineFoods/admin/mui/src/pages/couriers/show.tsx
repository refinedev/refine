import React from "react";
import {
    HttpError,
    useNavigation,
    useShow,
    useTranslate,
} from "@pankod/refine-core";

import {
    Avatar,
    DataGrid,
    Grid,
    GridColumns,
    List,
    Paper,
    Stack,
    Typography,
    useDataGrid,
    Button,
    Tooltip,
    Rating,
} from "@pankod/refine-mui";
import {
    LocalPhoneOutlined,
    MapOutlined,
    DirectionsCarFilledOutlined,
    EmailOutlined,
    AccountBalanceOutlined,
    StoreOutlined,
} from "@mui/icons-material";

import { ICourier, IReview } from "interfaces";

export const CourierShow: React.FC = () => {
    const t = useTranslate();
    const { show } = useNavigation();

    const {
        queryResult: { data },
    } = useShow<ICourier>();
    const courier = data?.data;

    const CourierInfoText: React.FC<{ icon: React.ReactNode; text?: string }> =
        ({ icon, text }) => (
            <Stack
                direction="row"
                alignItems="center"
                justifyContent={{
                    sm: "center",
                    lg: "flex-start",
                }}
                gap={1}
            >
                {icon}
                <Typography variant="body1">{text}</Typography>
            </Stack>
        );

    const columns = React.useMemo<GridColumns<IReview>>(
        () => [
            {
                field: "id",
                headerName: t("reviews.fields.orderId"),
                // eslint-disable-next-line react/display-name
                renderCell: ({ row }) => (
                    <Button
                        onClick={() => {
                            show("orders", row.order.id);
                        }}
                    >
                        #{row.order.id}
                    </Button>
                ),
                width: 150,
            },

            {
                field: "comment",
                headerName: t("reviews.fields.review"),
                // eslint-disable-next-line react/display-name
                renderCell: ({ row }) => (
                    <Tooltip title={row.comment[0]}>
                        <Typography
                            sx={{
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                            }}
                        >
                            {row.comment[0]}
                        </Typography>
                    </Tooltip>
                ),
                flex: 1,
            },
            {
                field: "review",
                headerName: t("reviews.fields.rating"),
                headerAlign: "center",
                flex: 1,
                align: "center",
                // eslint-disable-next-line react/display-name
                renderCell: ({ row }) => (
                    <Stack alignItems="center">
                        <Typography variant="h5" fontWeight="bold">
                            {row.star}
                        </Typography>
                        <Rating
                            name="rating"
                            defaultValue={row.star}
                            readOnly
                        />
                    </Stack>
                ),
            },
        ],
        [],
    );

    const { dataGridProps } = useDataGrid<IReview, HttpError>({
        columns,
        resource: "reviews",
        initialSorter: [
            {
                field: "id",
                order: "desc",
            },
        ],
        permanentFilter: [
            {
                field: "order.courier.id",
                operator: "eq",
                value: courier?.id,
            },
        ],
        initialPageSize: 4,
        queryOptions: {
            enabled: courier !== undefined,
        },
        syncWithLocation: false,
    });

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} lg={3}>
                <Paper sx={{ p: 2 }}>
                    <Stack alignItems="center" spacing={1}>
                        <Avatar
                            src={courier?.avatar?.[0].url}
                            sx={{ width: 120, height: 120 }}
                        />
                        <Typography variant="h6">
                            {courier?.name} {courier?.surname}
                        </Typography>
                    </Stack>
                    <br />
                    <Stack spacing={1}>
                        <CourierInfoText
                            icon={<StoreOutlined />}
                            text={courier?.store.title}
                        />
                        <CourierInfoText
                            icon={<LocalPhoneOutlined />}
                            text={courier?.gsm}
                        />
                        <CourierInfoText
                            icon={<EmailOutlined />}
                            text={courier?.email}
                        />
                        <CourierInfoText
                            icon={<AccountBalanceOutlined />}
                            text={courier?.accountNumber}
                        />
                        <CourierInfoText
                            icon={<MapOutlined />}
                            text={courier?.address}
                        />
                        <CourierInfoText
                            icon={<DirectionsCarFilledOutlined />}
                            text={courier?.licensePlate}
                        />
                    </Stack>
                </Paper>
            </Grid>
            <Grid item xs={12} lg={9}>
                <Stack direction="column" spacing={2}>
                    <List cardHeaderProps={{ title: t("orders.orders") }}>
                        <DataGrid
                            {...dataGridProps}
                            autoHeight
                            rowHeight={80}
                            rowsPerPageOptions={[4, 10, 20, 100]}
                        />
                    </List>
                </Stack>
            </Grid>
        </Grid>
    );
};
