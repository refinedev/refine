import React from "react";
import { Card, CardHeader, Grid } from "@pankod/refine-mui";
import { useTranslate } from "@pankod/refine-core";

import { DeliveryMap, OrderTimeline, RecentOrders } from "components/dashboard";

export const DashboardPage: React.FC = () => {
    const t = useTranslate();

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} lg={9}>
                <Card sx={{ height: 600 }}>
                    <CardHeader title={t("dashboard.deliveryMap.title")} />
                    <DeliveryMap />
                </Card>
            </Grid>
            <Grid item xs={12} lg={3}>
                <Card sx={{ maxHeight: 600, overflowY: "scroll" }}>
                    <CardHeader title={t("dashboard.timeline.title")} />
                    <OrderTimeline />
                </Card>
            </Grid>
            <Grid item xs={12} lg={9}>
                <Card>
                    <CardHeader title={t("dashboard.recentOrders.title")} />
                    <RecentOrders />
                </Card>
            </Grid>
        </Grid>
    );
};
