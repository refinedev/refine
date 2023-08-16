import React from "react";
import { Row, Col } from "antd";
import { ProjectOutlined, TeamOutlined } from "@ant-design/icons";

import { DashboardTotalCountCard } from "../../components/dashboard/total-count-card";
import { DashboardTasksChart } from "../../components/dashboard/tasks-chart";
import { DashboardDealsChart } from "../../components/dashboard/deals-chart";
import { DashboardTotalRevenueChart } from "../../components/dashboard/total-revenue-chart";
import { CalendarUpcomingEvents } from "../../components/calender/upcoming-events";

export const DashboardPage: React.FC = () => {
    return (
        <>
            <Row gutter={[32, 32]} style={{ marginBottom: 32 }}>
                <Col span={24}>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(1fr, 2fr)",
                            gridTemplateRows: "repeat(3, 1fr)",
                            gridColumnGap: "1.5rem",
                            gridRowGap: "1.5rem",
                        }}
                    >
                        <div style={{ gridArea: "1 / 1 / 2 / 2" }}>
                            <DashboardTotalCountCard
                                type="companies"
                                icon={<ProjectOutlined />}
                                title="Number of companies"
                            />
                        </div>
                        <div style={{ gridArea: "2 / 1 / 3 / 2" }}>
                            <DashboardTotalCountCard
                                type="contacts"
                                icon={<TeamOutlined />}
                                title="Number of contacts"
                            />
                        </div>
                        <div style={{ gridArea: "3 / 1 / 4 / 2" }}>
                            <DashboardTotalCountCard
                                type="deals"
                                icon={<ProjectOutlined />}
                                title="Number of deals"
                            />
                        </div>
                        <div style={{ gridArea: "1 / 2 / 4 / 3" }}>
                            <DashboardTasksChart />
                        </div>
                    </div>
                </Col>
            </Row>
            <Row gutter={[32, 32]} style={{ marginBottom: 32 }}>
                <Col span={16}>
                    <DashboardDealsChart />
                </Col>
                <Col span={8}>
                    <DashboardTotalRevenueChart />
                </Col>
            </Row>
            <Row gutter={[32, 32]}>
                <Col span={8}>
                    <CalendarUpcomingEvents limit={5} />
                </Col>
                <Col span={16}>
                    <CalendarUpcomingEvents limit={5} />
                </Col>
            </Row>
        </>
    );
};
