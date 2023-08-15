import React from "react";
import { Row, Col, Card, theme, Typography } from "antd";
import {
    RightCircleOutlined,
    ProjectOutlined,
    TeamOutlined,
} from "@ant-design/icons";
import { ListButton } from "@refinedev/antd";

import { DashboardNumberCard } from "../components/dashboard-number-card";

const { useToken } = theme;

export const DashboardPage: React.FC = () => {
    const { token } = useToken();

    return (
        <>
            <Row gutter={[32, 32]}>
                <Col span={24}>
                    <Row gutter={[32, 32]}>
                        <Col span={8}>
                            <Row gutter={[32, 32]}>
                                <Col span={24}>
                                    <DashboardNumberCard
                                        icon={<ProjectOutlined />}
                                        title="Number of companies"
                                        number={58}
                                    />
                                </Col>
                                <Col span={24}>
                                    <DashboardNumberCard
                                        icon={<TeamOutlined />}
                                        title="Number of contacts"
                                        number={1286}
                                    />
                                </Col>
                                <Col span={24}>
                                    <DashboardNumberCard
                                        icon={<ProjectOutlined />}
                                        title="Number of deals"
                                        number={34}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col span={16}>
                            <Card
                                title={
                                    <>
                                        <ProjectOutlined
                                            style={{
                                                color: token.colorPrimary,
                                            }}
                                        />
                                        <span style={{ marginLeft: "10px" }}>
                                            Tasks
                                        </span>
                                    </>
                                }
                                extra={
                                    <ListButton
                                        resource="kanban"
                                        type="default"
                                        icon={<RightCircleOutlined />}
                                    >
                                        See kanban board
                                    </ListButton>
                                }
                                style={{
                                    height: "100%",
                                }}
                            >
                                16
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <Col span={24}>
                    <Row gutter={[32, 32]}>
                        <Col span={16}>
                            <Card>16</Card>
                        </Col>
                        <Col span={8}>
                            <Card>8</Card>
                        </Col>
                    </Row>
                </Col>
                <Col span={24}>
                    <Row gutter={[32, 32]}>
                        <Col span={8}>
                            <Card>8</Card>
                        </Col>
                        <Col span={16}>
                            <Card>16</Card>
                        </Col>
                    </Row>
                </Col>
                <Col span={24}>
                    <Card>24</Card>
                </Col>
            </Row>
        </>
    );
};
