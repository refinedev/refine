import React from "react";
import { Row, Col } from "antd";
import { ProjectOutlined, TeamOutlined } from "@ant-design/icons";

import { DashboardTotalCountCard } from "../../components/dashboard/total-count-card";
import { DashboardTasksChart } from "../../components/dashboard/tasks-chart";
import { DashboardDealsChart } from "../../components/dashboard/deals-chart";
import { DashboardTotalRevenueChart } from "../../components/dashboard/total-revenue-chart";
import { CalendarUpcomingEvents } from "../../components/calendar/upcoming-events";
import { DashboardLatestActivities } from "../../components/dashboard/latest-activities";

export const DashboardPage: React.FC = () => {
    return (
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
                        <CalendarUpcomingEvents limit={5} />
                    </Col>
                    <Col span={16}>
                        <DashboardLatestActivities limit={5} />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};
