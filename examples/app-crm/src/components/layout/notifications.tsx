import React, { useState } from "react";

import { useList, useMany } from "@refinedev/core";
import { GetFieldsFromList } from "@refinedev/nestjs-query";

import { BellOutlined } from "@ant-design/icons";
import { Badge, Button, Divider, Popover, Space, Spin } from "antd";
import dayjs from "dayjs";

import { NotificationsDealsQuery, NotificationsQuery } from "@/graphql/types";

import { CustomAvatar } from "../custom-avatar";
import { Text } from "../text";
import { NotificationMessage } from "./notification-message";
import { NOTIFICATIONS_DEALS_QUERY, NOTIFICATIONS_QUERY } from "./queries";

export const Notifications: React.FC = () => {
    const [open, setOpen] = useState(false);

    const { data, isLoading } = useList<GetFieldsFromList<NotificationsQuery>>({
        resource: "audits",
        pagination: {
            pageSize: 5,
        },
        sorters: [{ field: "createdAt", order: "desc" }],
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
            gqlQuery: NOTIFICATIONS_QUERY,
        },
        queryOptions: {
            enabled: open,
        },
    });

    const targetIds = data?.data?.map((audit) => audit.targetId);
    const { data: dealData } = useMany<
        GetFieldsFromList<NotificationsDealsQuery>
    >({
        resource: "deals",
        ids: targetIds ?? [],
        meta: {
            gqlQuery: NOTIFICATIONS_DEALS_QUERY,
        },
        queryOptions: {
            enabled: Boolean(targetIds?.length),
        },
    });

    const getDeal = (id: string | number) => {
        return dealData?.data?.find((deal) => deal.id == id);
    };

    const content = (
        <Space direction="vertical" split={<Divider style={{ margin: 0 }} />}>
            {data?.data?.map((audit) => (
                <Space key={audit.id}>
                    <CustomAvatar
                        size={48}
                        shape="square"
                        src={getDeal(audit.targetId)?.company?.avatarUrl}
                        name={getDeal(audit.targetId)?.company?.name}
                    />
                    <Space direction="vertical" size={0}>
                        <NotificationMessage
                            audit={audit}
                            deal={getDeal(audit.targetId)}
                        />
                        <Text size="xs" type="secondary">
                            {dayjs(audit?.createdAt).fromNow()}
                        </Text>
                    </Space>
                </Space>
            ))}
        </Space>
    );

    const loadingContent = (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 20,
            }}
        >
            <Spin />
        </div>
    );

    return (
        <Popover
            placement="bottomRight"
            content={isLoading ? loadingContent : content}
            trigger="click"
            onOpenChange={(newOpen) => setOpen(newOpen)}
            overlayStyle={{ width: 400 }}
        >
            <Badge dot>
                <Button
                    shape="circle"
                    icon={<BellOutlined />}
                    style={{ border: 0 }}
                />
            </Badge>
        </Popover>
    );
};
