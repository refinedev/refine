import React from "react";
import { Row, Col, Card, theme, Typography } from "antd";
import {
    RightCircleOutlined,
    ProjectOutlined,
    ShopOutlined,
    TeamOutlined,
} from "@ant-design/icons";
import { ListButton } from "@refinedev/antd";

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
                                    <Card>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <div>
                                                <ShopOutlined
                                                    style={{
                                                        color: token.colorPrimary,
                                                    }}
                                                />{" "}
                                                Number of companies
                                            </div>
                                            <div>
                                                <Typography.Title
                                                    level={2}
                                                    style={{ marginBottom: 0 }}
                                                >
                                                    58
                                                </Typography.Title>
                                            </div>
                                        </div>
                                    </Card>
                                </Col>
                                <Col span={24}>
                                    <Card>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <div>
                                                <TeamOutlined
                                                    style={{
                                                        color: token.colorPrimary,
                                                    }}
                                                />{" "}
                                                Number of contacts
                                            </div>
                                            <div>
                                                <Typography.Title
                                                    level={2}
                                                    style={{ marginBottom: 0 }}
                                                >
                                                    1.286
                                                </Typography.Title>
                                            </div>
                                        </div>
                                    </Card>
                                </Col>
                                <Col span={24}>
                                    <Card>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <div>
                                                <TeamOutlined
                                                    style={{
                                                        color: token.colorPrimary,
                                                    }}
                                                />{" "}
                                                Total deals in pipeline
                                            </div>
                                            <div>
                                                <Typography.Title
                                                    level={2}
                                                    style={{ marginBottom: 0 }}
                                                >
                                                    34
                                                </Typography.Title>
                                            </div>
                                        </div>
                                    </Card>
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
