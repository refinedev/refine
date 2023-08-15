import React from "react";
import { Row, Col } from "antd";
import { ProjectOutlined, TeamOutlined } from "@ant-design/icons";
import { useCustom } from "@refinedev/core";

import { DashboardNumberCard } from "../components/dashboard-number-card";
import { DashboardTasksChart } from "../components/dashboard-tasks-chart";
import { DashboardDealsChart } from "../components/dashboard-deals-chart";
import { DashboardTotalRevenueChart } from "../components/dashboard-total-revenue-chart";

export const DashboardPage: React.FC = () => {
    const { data, isLoading } = useCustom({
        method: "post",
        url: "/graphql",
        meta: {
            rawQuery: `query Dashboard {
                companies {
                  totalCount
                }
                contacts {
                  totalCount
                }
                deals {
                  totalCount
                }
                taskStages {
                  title
                  tasksAggregate {
                    count {
                      id
                    }
                  }
                }
              }`,
        },
    });

    if (isLoading) {
        // TODO: Should be a skeleton
        return null;
    }

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
                            <DashboardNumberCard
                                icon={<ProjectOutlined />}
                                title="Number of companies"
                                number={data?.data?.companies?.totalCount}
                            />
                        </div>
                        <div style={{ gridArea: "2 / 1 / 3 / 2" }}>
                            <DashboardNumberCard
                                icon={<TeamOutlined />}
                                title="Number of contacts"
                                number={data?.data?.contacts?.totalCount}
                            />
                        </div>
                        <div style={{ gridArea: "3 / 1 / 4 / 2" }}>
                            <DashboardNumberCard
                                icon={<ProjectOutlined />}
                                title="Number of deals"
                                number={data?.data?.deals?.totalCount}
                            />
                        </div>
                        <div style={{ gridArea: "1 / 2 / 4 / 3" }}>
                            <DashboardTasksChart />
                        </div>
                    </div>
                </Col>
            </Row>
            <Row gutter={[32, 32]}>
                <Col span={16}>
                    <DashboardDealsChart />
                </Col>
                <Col span={8}>
                    <DashboardTotalRevenueChart />
                </Col>
            </Row>
        </>
    );
};
