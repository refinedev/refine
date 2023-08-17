import React from "react";
import { Card, theme, CardProps } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import { useList } from "@refinedev/core";
import dayjs from "dayjs";

import { Text } from "../../text";
import { CalendarUpcomingEvent } from "./event";

import { Event } from "../../../interfaces/graphql";
import styles from "./index.module.css";

type CalendarUpcomingEventsProps = { limit?: number } & CardProps;

export const CalendarUpcomingEvents: React.FC<CalendarUpcomingEventsProps> = ({
    limit = 5,
    ...rest
}) => {
    const { token } = theme.useToken();
    const { data, isLoading, isError } = useList<Event>({
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
            operation: "events",
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
            bodyStyle={{
                padding: "0 1rem",
            }}
            {...rest}
        >
            <div className={styles.container}>
                {data.data.map((item) => (
                    <CalendarUpcomingEvent key={item.id} {...item} />
                ))}
            </div>
        </Card>
    );
};
