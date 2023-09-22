import React, { useState } from "react";

import { useList, useMany } from "@refinedev/core";

import { BellOutlined } from "@ant-design/icons";
import { Badge, Button, Divider, Popover, Space, Spin } from "antd";
import dayjs from "dayjs";

import { Audit, Deal } from "@/interfaces";

import { CustomAvatar } from "../custom-avatar";
import { Text } from "../text";
import { NotificationMessage } from "./notification-message";

export const Notifications: React.FC = () => {
    const [open, setOpen] = useState(false);

    const { data, isLoading } = useList<Audit>({
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
            fields: [
                "id",
                "action",
                "targetEntity",
                "targetId",
                "createdAt",
                {
                    user: ["id", "name", "avatarUrl"],
                },
            ],
        },
        queryOptions: {
            enabled: open,
        },
    });

    const targetIds = data?.data?.map((audit) => audit.targetId);
    const { data: dealData } = useMany<Deal>({
        resource: "deals",
        ids: targetIds ?? [],
        meta: {
            fields: [
                "id",
                "title",
                { stage: ["id", "title"] },
                {
                    company: ["id", "name", "avatarUrl"],
                },
            ],
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
