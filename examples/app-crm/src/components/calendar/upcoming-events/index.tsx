import React from "react";

import { useList, useNavigation } from "@refinedev/core";
import { GetFieldsFromList } from "@refinedev/nestjs-query";

import { CalendarOutlined, RightCircleOutlined } from "@ant-design/icons";
import type { CardProps } from "antd";
import { Button, Card, Skeleton as AntdSkeleton } from "antd";
import dayjs from "dayjs";

import { UpcomingEventsQuery } from "@/graphql/types";

import { Text } from "../../text";
import { CalendarUpcomingEvent } from "./event";
import styles from "./index.module.css";
import { CALENDAR_UPCOMING_EVENTS_QUERY } from "./queries";

type CalendarUpcomingEventsProps = {
    limit?: number;
    cardProps?: CardProps;
    showGoToListButton?: boolean;
};

const NoEvent: React.FC = () => (
    <span
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "220px",
        }}
    >
        No Upcoming Event
    </span>
);

const Skeleton: React.FC = () => {
    return (
        <div className={styles.item}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    marginLeft: "24px",
                    padding: "1px 0",
                }}
            >
                <AntdSkeleton.Button
                    active
                    style={{
                        height: "14px",
                    }}
                />
                <AntdSkeleton.Button
                    active
                    style={{
                        width: "90%",
                        marginTop: "8px",
                        height: "16px",
                    }}
                />
            </div>
        </div>
    );
};

export const CalendarUpcomingEvents: React.FC<CalendarUpcomingEventsProps> = ({
    limit = 5,
    cardProps,
    showGoToListButton,
}) => {
    const { list } = useNavigation();

    const { data, isLoading } = useList<GetFieldsFromList<UpcomingEventsQuery>>(
        {
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
                gqlQuery: CALENDAR_UPCOMING_EVENTS_QUERY,
            },
        },
    );

    return (
        <Card
            headStyle={{ padding: "8px 16px" }}
            bodyStyle={{
                padding: "0 1rem",
            }}
            title={
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                    }}
                >
                    <CalendarOutlined />
                    <Text size="sm" style={{ marginLeft: ".7rem" }}>
                        Upcoming events
                    </Text>
                </div>
            }
            extra={
                showGoToListButton && (
                    <Button
                        onClick={() => list("events")}
                        icon={<RightCircleOutlined />}
                    >
                        See calendar
                    </Button>
                )
            }
            {...cardProps}
        >
            {isLoading &&
                Array.from({ length: limit }).map((_, index) => (
                    <Skeleton key={index} />
                ))}
            {!isLoading &&
                data?.data.map((item) => (
                    <CalendarUpcomingEvent key={item.id} item={item} />
                ))}
            {!isLoading && data?.data.length === 0 && <NoEvent />}
        </Card>
    );
};
