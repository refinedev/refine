import React from "react";
import { Card, theme, CardProps, Skeleton } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import { useList } from "@refinedev/core";
import dayjs from "dayjs";

import { Text } from "../../text";
import { CalendarUpcomingEvent } from "./event";

import { Event } from "../../../interfaces/graphql";

type CalendarUpcomingEventsProps = { limit?: number } & CardProps;

export const CalendarUpcomingEvents: React.FC<CalendarUpcomingEventsProps> = ({
    limit = 5,
    ...rest
}) => {
    const { token } = theme.useToken();
    const { data, isLoading } = useList<Event>({
        resource: "events",
        pagination: {
            pageSize: limit,
        },
        sorters: [
            {
                field: "startDate",
                order: "asc",
            },
        ],
        filters: [
            {
                field: "startDate",
                operator: "gte",
                value: dayjs().format("YYYY-MM-DD"),
            },
        ],
        meta: {
            fields: ["id", "title", "color", "startDate", "endDate"],
        },
    });

    return (
        <Card
            title={
                <span>
                    <CalendarOutlined style={{ color: token.colorPrimary }} />
                    <Text size="sm" style={{ marginLeft: ".7rem" }}>
                        Upcoming events
                    </Text>
                </span>
            }
            headStyle={{
                padding: "0 12px",
            }}
            bodyStyle={{
                padding: "0 1rem",
            }}
            {...rest}
        >
            {isLoading && (
                <Skeleton
                    loading={isLoading}
                    active
                    paragraph={{
                        rows: 3,
                        width: 200,
                    }}
                    style={{
                        padding: "1rem 0",
                    }}
                />
            )}
            {data?.data.map((item) => (
                <CalendarUpcomingEvent key={item.id} item={item} />
            ))}
        </Card>
    );
};
