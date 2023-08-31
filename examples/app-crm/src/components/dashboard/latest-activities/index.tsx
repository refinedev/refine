import React from "react";
import { Card, theme } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";
import { useList } from "@refinedev/core";

import { Text } from "../../text";
import { DashboardLatestActivity } from "./activity";

import { Audit, Task } from "../../../interfaces/graphql";

export const DashboardLatestActivities: React.FC<{ limit?: number }> = ({
    limit = 5,
}) => {
    const { token } = theme.useToken();
    const { data: tasks } = useList<Task>({
        resource: "tasks",
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
            ],
        },
    });
    const { data, isLoading, isError } = useList<Audit>({
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
                operator: "eq",
                value: "UPDATE",
            },
            {
                field: "targetEntity",
                operator: "eq",
                value: "Task",
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
        console.error("Error fetching latest activities", isError);
        return null;
    }

    const renderContent = () => {
        return (
            <>
                {data?.data.map((item) => (
                    <DashboardLatestActivity
                        isLoading={isLoading}
                        key={item.id}
                        item={item}
                        task={
                            tasks?.data.find(
                                (task) => task.id === `${item.targetId}`,
                            ) || undefined
                        }
                    />
                ))}
            </>
        );
    };

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
            {renderContent()}
        </Card>
    );
};
