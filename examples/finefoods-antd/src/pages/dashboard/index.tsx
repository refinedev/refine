import { Row, Col, Card, Typography } from "antd";
import { useTranslation } from "react-i18next";

import {
    DailyRevenue,
    DailyOrders,
    NewCustomers,
    DeliveryMap,
    OrderTimeline,
    RecentOrders,
    TrendingMenu,
} from "components";

const { Text } = Typography;

export const DashboardPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <Row gutter={[16, 16]}>
            <Col md={24}>
                <Row gutter={[16, 16]}>
                    <Col xl={10} lg={24} md={24} sm={24} xs={24}>
                        <Card
                            bodyStyle={{
                                padding: 10,
                                paddingBottom: 0,
                            }}
                            style={{
                                background: "url(images/daily-revenue.png)",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "right",
                                backgroundSize: "cover",
                            }}
                        >
                            <DailyRevenue />
                        </Card>
                    </Col>
                    <Col xl={7} lg={12} md={24} sm={24} xs={24}>
                        <Card
                            bodyStyle={{
                                padding: 10,
                                paddingBottom: 0,
                            }}
                            style={{
                                background: "url(images/daily-order.png)",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "right",
                                backgroundSize: "cover",
                            }}
                        >
                            <DailyOrders />
                        </Card>
                    </Col>
                    <Col xl={7} lg={12} md={24} sm={24} xs={24}>
                        <Card
                            bodyStyle={{
                                padding: 10,
                                paddingBottom: 0,
                            }}
                            style={{
                                background: "url(images/new-orders.png)",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "right",
                                backgroundSize: "cover",
                            }}
                        >
                            <NewCustomers />
                        </Card>
                    </Col>
                </Row>
            </Col>
            <Col xl={17} lg={16} md={24} sm={24} xs={24}>
                <Card
                    bodyStyle={{
                        height: 550,
                        padding: 0,
                    }}
                    title={
                        <Text
                            strong /* style={{ fontSize: 24, fontWeight: 800 }} */
                        >
                            {t("dashboard.deliveryMap.title")}
                        </Text>
                    }
                >
                    <DeliveryMap />
                </Card>
            </Col>
            <Col xl={7} lg={8} md={24} sm={24} xs={24}>
                <Card
                    bodyStyle={{
                        height: 550,
                        overflowY: "scroll",
                    }}
                    title={
                        <Text strong style={{ textTransform: "capitalize" }}>
                            {t("dashboard.timeline.title")}
                        </Text>
                    }
                >
                    <OrderTimeline />
                </Card>
            </Col>
            <Col xl={17} lg={16} md={24} sm={24} xs={24}>
                <Card
                    title={
                        <Text strong>{t("dashboard.recentOrders.title")}</Text>
                    }
                >
                    <RecentOrders />
                </Card>
            </Col>
            <Col xl={7} lg={8} md={24} sm={24} xs={24}>
                <Card
                    title={
                        <Text strong>{t("dashboard.trendingMenus.title")}</Text>
                    }
                >
                    <TrendingMenu />
                </Card>
            </Col>
        </Row>
    );
};
