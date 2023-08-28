import React from "react";
import dayjs from "dayjs";
import { Badge } from "antd";
import { useNavigate } from "react-router-dom";
import { useGetToPath } from "@refinedev/core";

import { Text } from "../../../text";
import type { Event } from "../../../../interfaces/graphql";

import styles from "../index.module.css";

type CalendarUpcomingEventProps = {
    item: Event;
};

export const CalendarUpcomingEvent: React.FC<CalendarUpcomingEventProps> = ({
    item,
}) => {
    const navigate = useNavigate();
    const getToPath = useGetToPath();
    const { id, title, startDate, endDate, color } = item;
    const isToday = dayjs.utc(startDate).isSame(dayjs.utc(), "day");
    const isTomorrow = dayjs
        .utc(startDate)
        .isSame(dayjs.utc().add(1, "day"), "day");
    const isAllDayEvent =
        dayjs.utc(startDate).startOf("day").isSame(startDate) &&
        dayjs.utc(endDate).endOf("day").isSame(endDate);

    const renderDate = () => {
        if (isToday) {
            return `Today`;
        }

        if (isTomorrow) {
            return `Tomorrow`;
        }

        return dayjs(startDate).format("MMM DD");
    };

    const renderTime = () => {
        if (isAllDayEvent) {
            return "All day";
        }

        return `${dayjs(startDate).format("HH:mm")} - ${dayjs(endDate).format(
            "HH:mm",
        )}`;
    };

    return (
        <div
            onClick={() => {
                navigate(
                    getToPath({
                        action: "show",
                        meta: {
                            id: item.id,
                        },
                    }) ?? "/calendar",
                    {
                        replace: true,
                    },
                );
            }}
            key={id}
            className={styles.item}
        >
            <div className={styles.date}>
                <Badge color={color} className={styles.badge} />
                <Text size="xs">{`${renderDate()}, ${renderTime()}`}</Text>
            </div>
            <Text ellipsis={{ tooltip: true }} strong className={styles.title}>
                {title}
            </Text>
        </div>
    );
};
