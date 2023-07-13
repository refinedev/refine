import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import { useTranslate } from "@refinedev/core";

import {
    DailyOrders,
    DailyRevenue,
    DeliveryMap,
    NewCustomers,
    OrderTimeline,
    RecentOrders,
    TrendingMenu,
} from "../../components/dashboard";

export const DashboardPage: React.FC = () => {
    const t = useTranslate();

    return (
        <Grid container columns={24} spacing={2}>
            <Grid item xs={24} sm={24} md={24} lg={24} xl={10}>
                <Card>
                    <DailyRevenue />
                </Card>
            </Grid>
            <Grid item xs={24} sm={24} md={24} lg={12} xl={7}>
                <Card>
                    <DailyOrders />
                </Card>
            </Grid>
            <Grid item xs={24} sm={24} md={24} lg={12} xl={7}>
                <Card>
                    <NewCustomers />
                </Card>
            </Grid>
            <Grid item xs={24} md={16} xl={18}>
                <Card
                    sx={{
                        height: "100%",
                        minHeight: "600px",
                    }}
                >
                    <CardHeader
                        sx={{
                            paddingX: { xs: 4 },
                        }}
                        title={t("dashboard.deliveryMap.title")}
                    />
                    <DeliveryMap />
                </Card>
            </Grid>
            <Grid item xs={24} md={8} xl={6}>
                <Card
                    sx={{
                        paddingX: { xs: 2 },
                        fontSize: { xs: "16px" },
                    }}
                >
                    <CardHeader title={t("dashboard.timeline.title")} />
                    <OrderTimeline />
                </Card>
            </Grid>
            <Grid item xs={24} lg={16} xl={18}>
                <Card sx={{ height: "100%", paddingX: { xs: 2 } }}>
                    <CardHeader title={t("dashboard.recentOrders.title")} />
                    <RecentOrders />
                </Card>
            </Grid>
            <Grid item xs={24} lg={8} xl={6}>
                <Card
                    sx={{
                        height: "100%",
                        paddingX: { xs: 2 },
                    }}
                >
                    <CardHeader title={t("dashboard.trendingMenus.title")} />
                    <TrendingMenu />
                </Card>
            </Grid>
        </Grid>
    );
};
