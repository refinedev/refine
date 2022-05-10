import React from "react";
import { Box, Card, CardHeader, Grid } from "@pankod/refine-mui";
import { useTranslate } from "@pankod/refine-core";

import { DeliveryMap } from "components/dashboard";

export const DashboardPage: React.FC = () => {
    const t = useTranslate();

    return (
        <Grid container>
            <Grid item xs={12} lg={9}>
                <Card>
                    <CardHeader title={t("dashboard.deliveryMap.title")} />
                    <Box sx={{ height: 500 }}>
                        <DeliveryMap />
                    </Box>
                </Card>
            </Grid>
            <Grid item xs={12} lg={3}></Grid>
        </Grid>
    );
};
