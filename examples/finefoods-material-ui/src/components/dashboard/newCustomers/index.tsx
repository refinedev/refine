import { useApiUrl, useCustom, useTranslate } from "@refinedev/core";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { BarChart, Bar, Tooltip, ResponsiveContainer } from "recharts";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import ArrowDropUp from "@mui/icons-material/ArrowDropUp";

import { ChartTooltip } from "../chartTooltip";
import { ISalesChart } from "../../../interfaces";

export const NewCustomers: React.FC = () => {
    const t = useTranslate();

    const API_URL = useApiUrl();
    const url = `${API_URL}/newCustomers`;

    const { data } = useCustom<{
        data: ISalesChart[];
        total: number;
        trend: number;
    }>({
        url,
        method: "get",
    });

    return (
        <Stack
            justifyContent="space-between"
            sx={{
                height: "230px",
                p: 1,
                background: "url(images/new-orders.png)",
                backgroundColor: "#3d335b",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right",
                backgroundSize: "cover",
            }}
        >
            <Stack direction="row" justifyContent="space-between">
                <Typography
                    variant="h5"
                    sx={{ color: "#fff", fontWeight: 700, mb: 0 }}
                >
                    {t("dashboard.newCustomers.title")}
                </Typography>

                <Stack alignItems="end">
                    <Typography
                        sx={{ fontWeight: 700, fontSize: 24, color: "#fff" }}
                    >
                        {data?.data.total ?? 0}
                    </Typography>
                    <Stack direction="row" alignItems="center">
                        <Typography
                            sx={{
                                fontWeight: 700,
                                color: "#fff",
                                fontSize: 20,
                            }}
                        >
                            {data?.data.trend ?? 0}%
                        </Typography>
                        {(data?.data?.trend ?? 0) > 0 ? (
                            <ArrowDropUp fontSize="large" color="success" />
                        ) : (
                            <ArrowDropDown fontSize="large" color="error" />
                        )}
                    </Stack>
                </Stack>
            </Stack>
            <Box sx={{ height: "130px" }}>
                <ResponsiveContainer width="99%">
                    <BarChart data={data?.data.data} barSize={15}>
                        <Bar
                            type="natural"
                            dataKey="value"
                            fill="rgba(255, 255, 255, 0.5)"
                            radius={[4, 4, 0, 0]}
                        />
                        <Tooltip
                            cursor={{
                                fill: "rgba(255, 255, 255, 0.2)",
                                radius: 4,
                            }}
                            content={<ChartTooltip />}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </Box>
        </Stack>
    );
};
