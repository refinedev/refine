import React from "react";

import { useNavigation } from "@refinedev/core";

import { Badge } from "antd";
import dayjs from "dayjs";

import type { Event } from "@/interfaces";

import { Text } from "@/components";

import styles from "../index.module.css";

type CalendarUpcomingEventProps = {
    item: Event;
};

export const CalendarUpcomingEvent: React.FC<CalendarUpcomingEventProps> = ({
    item,
}) => {
    const { show } = useNavigation();
    const { id, title, startDate, endDate, color } = item;

    const renderDate = () => {
        const start = dayjs(startDate).format("MMM DD, YYYY - HH:mm");
        const end = dayjs(endDate).format("MMM DD, YYYY - HH:mm");

        return `${start} - ${end}`;
    };

    return (
        <div
            onClick={() => {
                show("events", item.id);
            }}
            key={id}
            className={styles.item}
        >
            <div className={styles.date}>
                <Badge color={color} className={styles.badge} />
                <Text size="xs">{`${renderDate()}`}</Text>
            </div>
            <Text ellipsis={{ tooltip: true }} strong className={styles.title}>
                {title}
            </Text>
        </div>
    );
};
