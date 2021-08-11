import { Row, Col, Card, Space } from "@pankod/refine";
import { useTranslation } from "react-i18next";

import {
    DailyRevenue,
    DailyOrders,
    NewCustomers,
    DeliveryMap,
    DeliverySchedule,
    Orders,
    OrdersChart,
    RecentActivity,
    SalesChart,
    OrderTimeline,
} from "components";

export const DashboardPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <Row gutter={[16, 16]}>
            <Col md={24}>
                <Row gutter={[16, 16]}>
                    <Col xl={10} lg={24} md={24}>
                        <Card
                            bodyStyle={{
                                padding: 10,
                            }}
                            style={{
                                background: "url(images/daily-revenue.png)",
                                backgroundColor: "#3a233c",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "right",
                            }}
                        >
                            <DailyRevenue />
                        </Card>
                    </Col>
                    <Col xl={7} lg={12} md={24} style={{ width: "100%" }}>
                        <Card
                            bodyStyle={{
                                padding: 10,
                            }}
                            style={{
                                background: "url(images/daily-order.png)",
                                backgroundColor: "#332a4b",
                                backgroundRepeat: "no-repeat",
                            }}
                        >
                            <DailyOrders />
                        </Card>
                    </Col>
                    <Col xl={7} lg={12} md={24} style={{ width: "100%" }}>
                        <Card
                            bodyStyle={{
                                padding: 10,
                            }}
                            style={{
                                background: "url(images/new-orders.png)",
                                backgroundColor: "#3d335b",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "right",
                            }}
                        >
                            <NewCustomers />
                        </Card>
                    </Col>
                </Row>
            </Col>
            <Col md={16}>
                <Card
                    bodyStyle={{
                        height: 550,
                    }}
                    title={t("dashboard:deliveryMap.title")}
                >
                    <DeliveryMap />
                </Card>
            </Col>
            <Col md={8}>
                <Card
                    bodyStyle={{
                        height: 550,
                        overflowY: "scroll",
                    }}
                    title={t("dashboard.timeline.title")}
                >
                    <OrderTimeline />
                </Card>
            </Col>
        </Row>
    );
};
