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
} from "components";

export const DashboardPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <Row gutter={[16, 16]}>
            <Col md={24}>
                <Row gutter={[16, 16]}>
                    <Col xl={10} md={24}>
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
                    <Col xl={7} md={24}>
                        {" "}
                        <Card
                            bodyStyle={{
                                padding: 10,
                            }}
                            style={{
                                background: "url(images/daily-order.png)",
                                backgroundColor: "#332a4b",
                                backgroundRepeat: "no-repeat",
                                // backgroundPosition: "right",
                            }}
                        >
                            <DailyOrders />
                        </Card>
                    </Col>
                    <Col xl={7} md={24}>
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
