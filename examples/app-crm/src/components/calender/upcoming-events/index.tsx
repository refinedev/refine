import React from "react";
import { Card, Button, List as SimpleList, theme } from "antd";
import { CalendarOutlined, RightCircleOutlined } from "@ant-design/icons";
import { useNavigation } from "@refinedev/core";
import { useSimpleList } from "@refinedev/antd";

import { Text } from "../../text";
import { CalendarUpcomingEvent } from "./event";

import { Event } from "../../../interfaces/graphql";

export const CalendarUpcomingEvents: React.FC<{ limit: number }> = () => {
    const { token } = theme.useToken();
    const { list } = useNavigation();
    const { listProps } = useSimpleList<Event>({
        resource: "events",
        syncWithLocation: false,
        pagination: {
            // mode: "off",
            pageSize: 5,
        },
        sorters: {
            initial: [
                {
                    field: "startDate",
                    order: "asc",
                },
            ],
        },
        meta: {
            fields: ["id", "title", "color", "startDate", "endDate"],
        },
    });

    return (
        <Card
            title={
                <span>
                    <CalendarOutlined style={{ color: token.colorPrimary }} />
                    <Text size="sm" style={{ marginLeft: ".5rem" }}>
                        Upcoming events
                    </Text>
                </span>
            }
            extra={
                <Button
                    onClick={() => list("calendar")}
                    icon={<RightCircleOutlined />}
                >
                    See calendar
                </Button>
            }
            bodyStyle={{
                paddingTop: 0,
                // paddingBottom: 0,
            }}
        >
            <SimpleList
                {...listProps}
                pagination={undefined}
                renderItem={(item) => <CalendarUpcomingEvent {...item} />}
            />
        </Card>
    );
};
