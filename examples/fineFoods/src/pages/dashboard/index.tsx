import { Row, Col, Card, Space } from "@pankod/refine";
import { useTranslation } from "react-i18next";

import {
    DailyRevenue,
    DeliveryMap,
    DeliverySchedule,
    Orders,
    OrdersChart,
    RecentActivity,
    SalesChart,
} from "components";

export const DashbaordPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <Row gutter={[16, 16]}>
            <Col md={24}>
                <Row>
                    <Col md={12}>
                        <Card
                            style={{
                                background: "url(images/dailyrevenue.png)",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover",
                                backgroundPosition: "right",
                            }}
                        >
                            <DailyRevenue />
                        </Card>
                    </Col>
                </Row>
            </Col>
            <Col md={16}>
                <Card
                    title={t("dashboard:deliveryMap.title")}
                    style={{ marginBottom: 10 }}
                >
                    <Space
                        direction="vertical"
                        size="large"
                        style={{ width: "100%" }}
                    >
                        <DeliveryMap />
                        <DeliverySchedule />
                    </Space>
                </Card>

                <Card style={{ marginBottom: 10 }}>
                    <OrdersChart />
                </Card>

                <Card style={{ marginBottom: 10 }}>
                    <SalesChart />
                </Card>
            </Col>
            <Col md={8} xs={24}>
                <Space direction="vertical" style={{ width: "100%" }}>
                    <Card>
                        <Orders />
                    </Card>
                    <Card>
                        <DailyRevenue />
                    </Card>
                    <Card>
                        <RecentActivity />
                    </Card>
                </Space>
            </Col>
        </Row>
    );
};
