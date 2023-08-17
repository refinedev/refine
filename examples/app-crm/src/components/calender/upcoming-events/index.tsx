import React from "react";
import { Card, Button, theme } from "antd";
import { CalendarOutlined, RightCircleOutlined } from "@ant-design/icons";
import { useList, useNavigation } from "@refinedev/core";

import { Text } from "../../text";
import { CalendarUpcomingEvent } from "./event";

import { Event } from "../../../interfaces/graphql";

export const CalendarUpcomingEvents: React.FC<{ limit: number }> = () => {
    const { token } = theme.useToken();
    const { list } = useNavigation();
    const { data, isLoading, isError } = useList<Event>({
        resource: "events",
        pagination: {
            pageSize: 5,
        },
        sorters: [
            {
                field: "startDate",
                order: "asc",
            },
        ],
        meta: {
            fields: ["id", "title", "color", "startDate", "endDate"],
        },
    });

    if (isError) {
        // TODO: handle error message
        return null;
    }

    if (isLoading) {
        // TODO: handle loading state (skeleton)
        return null;
    }

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
                padding: "0 1rem",
            }}
        >
            {data.data.map((item) => (
                <CalendarUpcomingEvent key={item.id} {...item} />
            ))}
        </Card>
    );
};
