import React from "react";
import { Button, Card, Col, Row, App } from "antd";
import {
    CalendarOutlined,
    FlagOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { CreateButton } from "@refinedev/antd";

import { CalendarTypeSwitch } from "../../components/calendar-type-switch";
import { CalendarUpcomingEvents } from "../../components/calender/upcoming-events";
import { CalendarCategories } from "../../components/calender/categories";

import { CalendarListPage } from "./list";
import { CalendarMonthPage } from "./month";

type Props = React.PropsWithChildren<{}>;

export const CalendarPageWrapper = ({ children }: Props) => {
    const { type } = useParams();

    const Component = type === "list" ? CalendarListPage : CalendarMonthPage;

    return (
        <App>
            <Row gutter={[32, 32]}>
                <Col span={6}>
                    <CreateButton
                        block
                        size="large"
                        style={{ marginBottom: "1rem" }}
                    >
                        Create event
                    </CreateButton>

                    <CalendarUpcomingEvents
                        limit={3}
                        style={{ marginBottom: "1rem" }}
                    />

                    <CalendarCategories />
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
