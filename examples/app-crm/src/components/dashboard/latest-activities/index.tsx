import React from "react";
import { Card, theme } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";
import { useList } from "@refinedev/core";

import { Text } from "../../text";
import { DashboardLatestActivity } from "./activity";

import { Audit, Deal } from "../../../interfaces/graphql";

export const DashboardLatestActivities: React.FC<{ limit?: number }> = ({
    limit = 5,
}) => {
    const { token } = theme.useToken();
    const { data: deals } = useList<Deal>({
        resource: "deals",
        pagination: {
            mode: "off",
        },
        meta: {
            fields: [
                "id",
                "title",
                {
                    stage: ["id", "title"],
                },
                {
                    company: ["id", "name", "avatarUrl"],
                },
            ],
        },
    });
    const { data, isLoading, isError, error } = useList<Audit>({
        resource: "audits",
        pagination: {
            pageSize: limit,
        },
        sorters: [
            {
                field: "id",
                order: "desc",
            },
        ],
        filters: [
            {
                field: "action",
                operator: "in",
                value: ["CREATE", "UPDATE"],
            },
            {
                field: "targetEntity",
                operator: "eq",
                value: "Deal",
            },
        ],
        meta: {
            fields: [
                "id",
                "action",
                "targetEntity",
                "targetId",
                {
                    changes: ["field", "from", "to"],
                },
                "createdAt",
                {
                    user: ["id", "name", "avatarUrl"],
                },
            ],
        },
    });

    if (isError) {
        console.error("Error fetching latest activities", error);
        return null;
    }

    return (
        <Card
            title={
                <span>
                    <UnorderedListOutlined
                        style={{ color: token.colorPrimary }}
                    />
                    <Text size="sm" style={{ marginLeft: ".5rem" }}>
                        Latest activities
                    </Text>
                </span>
            }
            bodyStyle={{
                padding: "0 1rem",
            }}
        >
            {data?.data.map((item) => (
                <DashboardLatestActivity
                    isLoading={isLoading}
                    key={item.id}
                    item={item}
                    deal={
                        deals?.data.find(
                            (task) => task.id === `${item.targetId}`,
                        ) || undefined
                    }
                />
            ))}
        </Card>
    );
};
