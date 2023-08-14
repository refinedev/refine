import React from "react";
import { Button, Card, Col, Row, App } from "antd";
import {
    CalendarOutlined,
    FlagOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { CalendarListPage } from "./list";
import { CalendarMonthPage } from "./month";
import { CalendarTypeSwitch } from "../../components/calendar-type-switch";
import { CreateButton } from "@refinedev/antd";

type Props = React.PropsWithChildren<{}>;

export const CalendarPageWrapper = ({ children }: Props) => {
    const { type } = useParams();

    const Component = type === "list" ? CalendarListPage : CalendarMonthPage;

    return (
        <App>
            <Row gutter={[32, 32]}>
                <Col span={6}>
                    <Row gutter={[32, 32]}>
                        <Col span={24}>
                            <CreateButton style={{ width: "100%" }}>
                                Create event
                            </CreateButton>
                        </Col>
                        <Col span={24}>
                            <Card
                                title={
                                    <>
                                        <CalendarOutlined />
                                        <span style={{ marginLeft: 10 }}>
                                            Upcoming events
                                        </span>
                                    </>
                                }
                            >
                                lorem ipsum dolor sit amet
                            </Card>
                        </Col>
                        <Col span={24}>
                            <Card
                                title={
                                    <>
                                        <FlagOutlined />
                                        <span style={{ marginLeft: 10 }}>
                                            Categories
                                        </span>
                                    </>
                                }
                                extra={
                                    <Button
                                        shape="circle"
                                        type="default"
                                        icon={<SettingOutlined />}
                                    />
                                }
                            >
                                lorem ipsum dolor sit amet
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <Col span={18}>
                    <CalendarTypeSwitch />
                    <Component />
                    {children}
                </Col>
            </Row>
        </App>
    );
};
