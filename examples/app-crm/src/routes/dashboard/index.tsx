import React from "react";
import { Row, Col, Button } from "antd";
import {
    ProjectOutlined,
    RightCircleOutlined,
    TeamOutlined,
} from "@ant-design/icons";
import { useNavigation } from "@refinedev/core";

import {
    DashboardTotalCountCard,
    DashboardTasksChart,
    DashboardDealsChart,
    DashboardTotalRevenueChart,
    DashboardLatestActivities,
} from "../../components/dashboard";
import { CalendarUpcomingEvents } from "../../components/calendar";
import { CompaniesMap } from "../../components/dashboard/companies-map";

export const DashboardPage: React.FC = () => {
    const { list } = useNavigation();

    return (
        <div className="page-container">
            <Row gutter={[32, 32]}>
                <Col span={24}>
                    <Row gutter={[32, 32]}>
                        <Col span={8}>
                            <Row gutter={[24, 24]}>
                                <Col span={24}>
                                    <DashboardTotalCountCard
                                        type="companies"
                                        icon={<ProjectOutlined />}
                                        title="Number of companies"
                                    />
                                </Col>
                                <Col span={24}>
                                    <DashboardTotalCountCard
                                        type="contacts"
                                        icon={<TeamOutlined />}
                                        title="Number of contacts"
                                    />
                                </Col>
                                <Col span={24}>
                                    <DashboardTotalCountCard
                                        type="deals"
                                        icon={<ProjectOutlined />}
                                        title="Number of deals"
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col span={16}>
                            <DashboardTasksChart />
                        </Col>
                    </Row>
                </Col>
                <Col span={24}>
                    <Row gutter={[32, 32]}>
                        <Col span={16}>
                            <DashboardDealsChart />
                        </Col>
                        <Col span={8}>
                            <DashboardTotalRevenueChart />
                        </Col>
                    </Row>
                </Col>
                <Col span={24}>
                    <Row gutter={[32, 32]}>
                        <Col span={8}>
                            <CalendarUpcomingEvents
                                limit={5}
                                cardProps={{
                                    extra: (
                                        <Button
                                            onClick={() => list("events")}
                                            icon={<RightCircleOutlined />}
                                        >
                                            See calendar
                                        </Button>
                                    ),
                                }}
                            />
                        </Col>
                        <Col span={16}>
                            <DashboardLatestActivities limit={5} />
                        </Col>
                    </Row>
                </Col>
                <Col span={24}>
                    <CompaniesMap />
                </Col>
            </Row>
        </div>
    );
};
