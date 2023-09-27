import React from "react";

import { Col, Row } from "antd";

import { CalendarUpcomingEvents } from "@/components";

import {
    CompaniesMap,
    DashboardDealsChart,
    DashboardLatestActivities,
    DashboardTasksChart,
    DashboardTotalCountCard,
    DashboardTotalRevenueChart,
} from "./components";

export const DashboardPage: React.FC = () => {
    return (
        <div className="page-container">
            <Row gutter={[32, 32]}>
                <Col xs={24} sm={24} xl={8}>
                    <DashboardTotalCountCard resource="companies" />
                </Col>
                <Col xs={24} sm={24} xl={8}>
                    <DashboardTotalCountCard resource="contacts" />
                </Col>
                <Col xs={24} sm={24} xl={8}>
                    <DashboardTotalCountCard resource="deals" />
                </Col>
            </Row>

            <Row
                gutter={[32, 32]}
                style={{
                    marginTop: "32px",
                }}
            >
                <Col
                    xs={24}
                    sm={24}
                    xl={8}
                    style={{
                        height: "432px",
                    }}
                >
                    <DashboardTotalRevenueChart />
                </Col>
                <Col
                    xs={24}
                    sm={24}
                    xl={16}
                    style={{
                        height: "432px",
                    }}
                >
                    <DashboardDealsChart />
                </Col>
            </Row>

            <Row
                gutter={[32, 32]}
                style={{
                    marginTop: "32px",
                }}
            >
                <Col xs={24} sm={24} xl={14} xxl={16}>
                    <DashboardLatestActivities />
                </Col>
                <Col xs={24} sm={24} xl={10} xxl={8}>
                    <CalendarUpcomingEvents showGoToListButton />
                </Col>
            </Row>

            <Row
                gutter={[32, 32]}
                style={{
                    marginTop: "32px",
                }}
            >
                <Col
                    xs={24}
                    sm={24}
                    xl={8}
                    style={{
                        height: "448px",
                    }}
                >
                    <DashboardTasksChart />
                </Col>
                <Col
                    xs={24}
                    sm={24}
                    xl={16}
                    style={{
                        height: "448px",
                    }}
                >
                    <CompaniesMap />
                </Col>
            </Row>
        </div>
    );
};
