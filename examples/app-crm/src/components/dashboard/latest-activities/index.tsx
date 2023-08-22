import React from "react";
import { Card, Skeleton, theme } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";
import { useList } from "@refinedev/core";

import { Text } from "../../text";
import { DashboardLatestActivity } from "./activity";

import { Audit } from "../../../interfaces/graphql";

export const DashboardLatestActivities: React.FC<{ limit?: number }> = ({
    limit = 5,
}) => {
    const { token } = theme.useToken();
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
        meta: {
            operation: "audits",
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
                    user: ["id", "name"],
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
