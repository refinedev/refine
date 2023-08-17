import React from "react";
import { EditButton, ShowButton } from "@refinedev/antd";
import { Calendar, Card } from "antd";
import { useList } from "@refinedev/core";

export const CalendarListPage: React.FC<{ categoryId?: string[] }> = ({
    categoryId = [],
}) => {
    const { data, isLoading, isError } = useList({
        resource: "events",
        pagination: {
            pageSize: 9999,
        },
        // filters: [{ field: "category.id", operator: "in", value: ["1"] }],
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
        // TODO: handle error message
        return null;
    }

    if (isLoading) {
        // TODO: handle loading state (skeleton)
        return null;
    }

    return (
        <Card>
            <pre>
                <code>{JSON.stringify(data, null, 2)}</code>
            </pre>
            <Calendar />
        </Card>
    );
};
