import React from "react";
import { useCustom } from "@refinedev/core";
import { Calendar as AntdCalendar, Card, Button, Badge } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Dayjs } from "dayjs";

import { Text } from "../../text";
import { Event, EventConnection } from "../../../interfaces/graphql";
import styles from "./index.module.css";

type CalendarProps = {
    categoryId?: string[];
    onClickEvent?: (event: Event) => void;
};

type CalendarCellProps = {
    value: Dayjs;
} & CalendarProps;

const CalendarCell: React.FC<CalendarCellProps> = ({
    value,
    categoryId,
    onClickEvent,
}) => {
    const { data } = useCustom<{ events: EventConnection }>({
        method: "post",
        url: "/graphql",
        meta: {
            rawQuery: `query Events($startDate: DateTime!, $endDate: DateTime!, $categoryId: [ID!]) {
                    events(
                        paging: { limit: 1 }
                        filter: {
                            or: [
                                {
                                    and: [
                                        { startDate: { lte: $startDate } }
                                        { endDate: { gte: $startDate } }
                                    ]
                                }
                                {
                                    and: [
                                        { startDate: { gte: $startDate } }
                                        { startDate: { lte: $endDate } }
                                    ]
                                }
                                {
                                    and: [
                                        { endDate: { gte: $startDate } }
                                        { endDate: { lte: $endDate } }
                                    ]
                                }
                            ], category: { id: { in: $categoryId } }
                        }
                    ) {
                        nodes {
                            id
                            title
                            description
                            startDate
                            endDate
                            color
                            createdAt
                            createdBy {
                                id
                                name
                            }
                            category {
                                id
                                title
                            }
                        }
                    }
                }`,
            variables: {
                startDate: value.utc().startOf("day").toISOString(),
                endDate: value.utc().endOf("day").toISOString(),
                categoryId: categoryId?.length ? categoryId : undefined,
            },
        },
    });

    return (
        <div>
            {data?.data.events.nodes.map((item) => (
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
    return (
        <Card>
            <AntdCalendar
                mode="month"
                cellRender={(value) => (
                    <CalendarCell
                        categoryId={categoryId}
                        onClickEvent={onClickEvent}
                        value={value}
                    />
                )}
                headerRender={({ value, onChange }) => {
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
