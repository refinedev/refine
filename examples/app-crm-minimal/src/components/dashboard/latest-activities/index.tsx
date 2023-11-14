import React from "react";

import { useList } from "@refinedev/core";

import { UnorderedListOutlined } from "@ant-design/icons";
import { Card, Skeleton as AntdSkeleton, List, Space } from "antd";
import dayjs from "dayjs";

import { CustomAvatar, Text } from "@/components";
import { Audit, Deal } from "@/interfaces";

export const DashboardLatestActivities: React.FC<{ limit?: number }> = ({
    limit = 5,
}) => {
    const { data: deals, isLoading: isLoadingDeals } = useList<Deal>({
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
    const {
        data: audit,
        isLoading: isLoadingAudit,
        isError,
        error,
    } = useList<Audit>({
        resource: "audits",
        pagination: {
            pageSize: limit,
        },
        sorters: [
            {
                field: "createdAt",
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

    const isLoading = isLoadingAudit || isLoadingDeals;

    return (
        <Card
            headStyle={{ padding: "16px" }}
            bodyStyle={{
                padding: "0 1rem",
            }}
            title={
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                    }}
                >
                    <UnorderedListOutlined />
                    <Text size="sm" style={{ marginLeft: ".5rem" }}>
                        Latest activities
                    </Text>
                </div>
            }
        >
            {isLoading ? (
                <List
                    itemLayout="horizontal"
                    dataSource={Array.from({ length: limit }).map(
                        (_, index) => ({ id: index }),
                    )}
                    renderItem={(_item, index) => {
                        return (
                            <List.Item key={index}>
                                <List.Item.Meta
                                    avatar={
                                        <AntdSkeleton.Avatar
                                            active
                                            size={48}
                                            shape="square"
                                            style={{
                                                borderRadius: "4px",
                                            }}
                                        />
                                    }
                                    title={
                                        <AntdSkeleton.Button
                                            active
                                            style={{
                                                height: "16px",
                                            }}
                                        />
                                    }
                                    description={
                                        <AntdSkeleton.Button
                                            active
                                            style={{
                                                width: "300px",
                                                height: "16px",
                                            }}
                                        />
                                    }
                                />
                            </List.Item>
                        );
                    }}
                />
            ) : (
                <List
                    itemLayout="horizontal"
                    dataSource={audit?.data || []}
                    renderItem={(item) => {
                        const deal =
                            deals?.data.find(
                                (task) => task.id === `${item.targetId}`,
                            ) || undefined;

                        return (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={
                                        <CustomAvatar
                                            shape="square"
                                            size={48}
                                            src={deal?.company.avatarUrl}
                                            name={deal?.company.name}
                                        />
                                    }
                                    title={dayjs(deal?.createdAt).format(
                                        "MMM DD, YYYY - HH:mm",
                                    )}
                                    description={
                                        <Space size={4}>
                                            <Text strong>
                                                {item.user?.name}
                                            </Text>
                                            <Text>
                                                {item.action === "CREATE"
                                                    ? "created"
                                                    : "moved"}
                                            </Text>
                                            <Text strong>{deal?.title}</Text>
                                            <Text>deal</Text>
                                            <Text>
                                                {item.action === "CREATE"
                                                    ? "in"
                                                    : "to"}
                                            </Text>
                                            <Text strong>
                                                {deal?.stage?.title ||
                                                    "Unassigned"}
                                                .
                                            </Text>
                                        </Space>
                                    }
                                />
                            </List.Item>
                        );
                    }}
                />
            )}
        </Card>
    );
};
