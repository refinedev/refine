import React from "react";
import { useList } from "@refinedev/core";
import { Calendar as AntdCalendar, Card, Button, Badge } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Dayjs } from "dayjs";

import { Text } from "../../text";
import { Event } from "../../../interfaces/graphql";
import styles from "./index.module.css";

type CalendarProps = {
    categoryId?: string[];
    onClickEvent?: (event: Event) => void;
};

export const Calendar: React.FC<CalendarProps> = ({
    categoryId,
    onClickEvent,
}) => {
    const dateCellRender = (value: Dayjs) => {
        const { data } = useList<Event>({
            resource: "events",
            filters: [
                {
                    field: "startDate",
                    operator: "gte",
                    value: value.utc().startOf("day").toISOString(),
                },
                {
                    field: "endDate",
                    operator: "lte",
                    value: value.utc().endOf("day").toISOString(),
                },
                {
                    field: "category.id",
                    operator: "in",
                    value: categoryId?.length ? categoryId : undefined,
                },
            ],
            meta: {
                operation: "events",
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
            <div>
                {data?.data.map((item) => (
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

    return (
        <Card>
            <AntdCalendar
                mode="month"
                cellRender={(current) => {
                    return dateCellRender(current);
                }}
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
