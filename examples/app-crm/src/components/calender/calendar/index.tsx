import React from "react";
import { useList } from "@refinedev/core";
import { Calendar as AntdCalendar, Card, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Dayjs } from "dayjs";

import { Text } from "../../text";
import { Event } from "../../../interfaces/graphql";
import styles from "./index.module.css";

export const Calendar: React.FC<{ categoryId?: string[] }> = ({
    categoryId,
}) => {
    const dateCellRender = (value: Dayjs) => {
        const { data, isLoading, isError } = useList<Event>({
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

        if (isError) {
            console.error("Fetching events failed");
        }

        if (isLoading) {
            return null;
        }

        return (
            <div className={styles.events}>
                {data?.data.map((item) => (
                    <div key={item.id} className={styles.event}>
                        <Text
                            ellipsis={{
                                tooltip: true,
                            }}
                        >
                            <span
                                className={styles.badge}
                                style={{
                                    backgroundColor: item.color,
                                }}
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
