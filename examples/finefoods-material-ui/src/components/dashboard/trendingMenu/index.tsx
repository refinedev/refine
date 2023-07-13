import { useList } from "@refinedev/core";
import { NumberField } from "@refinedev/mui";

import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { IOrder } from "../../../interfaces";

export const TrendingMenu: React.FC = () => {
    const { data } = useList<IOrder>({
        resource: "orders",
        config: {
            pagination: { pageSize: 5 },
        },
    });

    return (
        <Stack spacing={3} sx={{ p: 3 }}>
            {data?.data.map((order, index) => (
                <Stack
                    key={order.id}
                    direction="row"
                    alignItems="center"
                    spacing={3}
                    paddingY={1}
                >
                    <Box sx={{ position: "relative" }}>
                        <Avatar
                            sx={{
                                width: {
                                    xs: 64,
                                    md: 108,
                                },
                                height: {
                                    xs: 64,
                                    md: 108,
                                },
                            }}
                            src={order?.products[0]?.images[0].url}
                        />
                        <Box
                            sx={{
                                position: "absolute",
                                bgcolor: "primary.main",
                                color: "primary.contrastText",
                                fontWeight: 800,
                                transform: "translate(-50%, -50%)",
                                top: "100%",
                                left: "50%",
                                border: "4px solid #ffffff",
                                borderRadius: "50%",
                                width: "44px",
                                height: "44px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            #{index + 1}
                        </Box>
                    </Box>
                    <Stack spacing={1}>
                        <Typography sx={{ fontWeight: 700 }}>
                            {order.products[0]?.name}
                        </Typography>
                        <NumberField
                            sx={{ fontWeight: 700 }}
                            options={{
                                currency: "USD",
                                style: "currency",
                                notation: "standard",
                            }}
                            value={order.amount / 100}
                        />
                    </Stack>
                </Stack>
            ))}
        </Stack>
    );
};
