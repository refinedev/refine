import { Row, Col, Card, Typography } from "antd";
import {
    DailyRevenue,
    DailyOrders,
    NewCustomers,
    DeliveryMap,
    OrderTimeline,
} from "components/dashboard";

const { Text } = Typography;

const dashboardCardStyles = {
    dailyRevenue: {
        bodyStyle: {
            padding: 10,
            paddingBottom: 0,
        },
        style: {
            background: "url(images/daily-revenue.png)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right",
            backgroundSize: "cover",
        },
    },

    dailyOrders: {
        bodyStyle: {
            padding: 10,
            paddingBottom: 0,
        },
        style: {
            background: "url(images/daily-order.png)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right",
            backgroundSize: "cover",
        },
    },

    newCustomers: {
        bodyStyle: {
            padding: 10,
            paddingBottom: 0,
        },
        style: {
            background: "url(images/new-orders.png)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right",
            backgroundSize: "cover",
        },
    },

    deliveryMap: {
        bodyStyle: {
            height: 550,
            padding: 0,
        },
    },

    orderTimeline: {
        bodyStyle: {
            height: 550,
            overflow: "scroll",
        },
    },
};

export const DashboardPage: React.FC = () => {
    return (
        <Row gutter={[16, 16]}>
            <Col md={24}>
                <Row gutter={[16, 16]}>
                    <Col xl={10} lg={24} md={24} sm={24} xs={24}>
                        <Card
                            bodyStyle={
                                dashboardCardStyles.dailyRevenue.bodyStyle
                            }
                            style={dashboardCardStyles.dailyRevenue.style}
                        >
                            <DailyRevenue />
                        </Card>
                    </Col>

                    <Col xl={7} lg={12} md={24} sm={24} xs={24}>
                        <Card
                            bodyStyle={
                                dashboardCardStyles.dailyOrders.bodyStyle
                            }
                            style={dashboardCardStyles.dailyOrders.style}
                        >
                            <DailyOrders />
                        </Card>
                    </Col>

                    <Col xl={7} lg={12} md={24} sm={24} xs={24}>
                        <Card
                            bodyStyle={
                                dashboardCardStyles.newCustomers.bodyStyle
                            }
                            style={dashboardCardStyles.newCustomers.style}
                        >
                            <NewCustomers />
                        </Card>
                    </Col>
                </Row>
            </Col>
            <Col xl={17} lg={16} md={24} sm={24} xs={24}>
                <Card
                    bodyStyle={dashboardCardStyles.deliveryMap.bodyStyle}
                    title={<Text strong>Delivery map</Text>}
                >
                    <DeliveryMap />
                </Card>
            </Col>
            <Col xl={7} lg={8} md={24} sm={24} xs={24}>
                <Card
                    bodyStyle={dashboardCardStyles.orderTimeline.bodyStyle}
                    title={
                        <Text strong style={{ textTransform: "capitalize" }}>
                            Timeline
                        </Text>
                    }
                >
                    <OrderTimeline />
                </Card>
            </Col>
        </Row>
    );
};
