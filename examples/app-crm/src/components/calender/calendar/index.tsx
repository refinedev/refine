import React from "react";
import { useList } from "@refinedev/core";
import { Calendar as AntdCalendar, Card, Button, Badge } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import dayjs, { Dayjs } from "dayjs";

import { Text } from "../../text";
import { Event } from "../../../interfaces/graphql";
import styles from "./index.module.css";

type CalendarProps = {
    categoryId?: string[];
    onClickEvent?: (event: Event) => void;
};

type CalendarCellProps = {
    value: Dayjs;
    events: Event[];
} & CalendarProps;

const CalendarCell: React.FC<CalendarCellProps> = ({
    events,
    value,
    onClickEvent,
}) => {
    const todayEvents = events.filter((event) => {
        const startDate = dayjs(event.startDate);
        const endDate = dayjs(event.endDate);

        return (
            startDate.isSame(value, "day") ||
            endDate.isSame(value, "day") ||
            (startDate.isBefore(value, "day") && endDate.isAfter(value, "day"))
        );
    });

    return (
        <div>
            {todayEvents.map((item) => (
                <div onClick={() => onClickEvent?.(item)} key={item.id}>
                    <Text
                        ellipsis={{
                            tooltip: true,
                        }}
                    >
                        <Badge
                            style={{ marginRight: "0.5rem" }}
                            color={item.color}
                        />
                        {item.title}
                    </Text>
                </div>
            ))}
        </div>
    );
};

export const Calendar: React.FC<CalendarProps> = ({
    categoryId,
    onClickEvent,
}) => {
    const [currentDate, setCurrentDate] = React.useState<Dayjs>(dayjs.utc());
    const filterStartDate = currentDate.startOf("month").subtract(10, "day");
    const filterEndDate = currentDate.endOf("month").add(10, "day");

    const { data } = useList<Event>({
        pagination: {
            pageSize: 9999,
        },
        filters: [
            {
                field: "startDate",
                operator: "gte",
                value: filterStartDate.toISOString(),
            },
            {
                field: "startDate",
                operator: "lte",
                value: filterEndDate.toISOString(),
            },
            {
                field: "category.id",
                operator: "in",
                value: categoryId?.length ? categoryId : undefined,
            },
        ],
        meta: {
            fields: [
                "id",
                "title",
                "description",
                "startDate",
                "endDate",
                "color",
                "createdAt",
                {
                    createdBy: ["id", "name"],
                },
                {
                    category: ["id", "title"],
                },
            ],
        },
    });

    return (
        <Card>
            <AntdCalendar
                mode="month"
                cellRender={(value) => (
                    <CalendarCell
                        events={data?.data || []}
                        onClickEvent={onClickEvent}
                        value={value}
                    />
                )}
                headerRender={({ value, onChange }) => {
                    setCurrentDate(value);
                    return (
                        <div className={styles.calendar_header}>
                            <div className={styles.actions}>
                                <Button
                                    onClick={() => {
                                        onChange(value.subtract(1, "month"));
                                    }}
                                    shape="circle"
                                    icon={<LeftOutlined />}
                                />
                                <Button
                                    onClick={() => {
                                        onChange(value.add(1, "month"));
                                    }}
                                    shape="circle"
                                    icon={<RightOutlined />}
                                />
                            </div>
                            <Text className={styles.title} size="lg">
                                {value.format("MMMM YYYY")}
                            </Text>
                        </div>
                    );
                }}
            />
        </Card>
    );
};
