import { FC, memo, useMemo } from "react";

import { useDelete, useNavigation } from "@refinedev/core";

import { DeleteOutlined, EyeOutlined, MoreOutlined } from "@ant-design/icons";
import {
    Button,
    Card,
    ConfigProvider,
    Dropdown,
    MenuProps,
    Skeleton,
    Tooltip,
} from "antd";
import dayjs from "dayjs";

import { CustomAvatar, Text } from "@/components";
import { User } from "@/graphql/schema.types";

type Props = {
    id: string;
    title: string;
    price: string;
    date: string;
    user: {
        name: string;
        avatarUrl?: User["avatarUrl"];
    };
    company: {
        name: string;
        avatarUrl?: string;
    };
    variant?: "default" | "won" | "lost";
};

export const DealKanbanCard: FC<Props> = ({
    id,
    company,
    date,
    price,
    title,
    user,
    variant = "default",
}) => {
    const { replace } = useNavigation();
    const { mutate } = useDelete();

    const dropdownItems = useMemo(() => {
        const dropdownItems: MenuProps["items"] = [
            {
                label: "View card",
                key: "1",
                icon: <EyeOutlined />,
                onClick: () => {
                    replace(`/scrumboard/sales/edit/${id}`);
                },
            },
            {
                danger: true,
                label: "Delete card",
                key: "2",
                icon: <DeleteOutlined />,
                onClick: () => {
                    mutate({
                        resource: "deals",
                        id,
                    });
                },
            },
        ];

        return dropdownItems;
    }, []);

    const variantColors = useMemo(() => {
        const colors = {
            Card: {
                colorBgContainer: "white",
                colorBorderSecondary: "#F0F0F0",
            },
            Typography: {
                colorText: "rgba(0, 0, 0, 0.85)",
                colorTextDescription: "rgba(0, 0, 0, 0.65)",
            },
        };

        if (variant === "won") {
            colors.Card.colorBgContainer = "#F6FFED";
            colors.Card.colorBorderSecondary = "#B7EB8F";
            colors.Typography.colorText = "#135200";
            colors.Typography.colorTextDescription = "#135200";
        }

        if (variant === "lost") {
            colors.Card.colorBgContainer = "#FFF1F0";
            colors.Card.colorBorderSecondary = "#FFA39E";
            colors.Typography.colorText = "#820014";
            colors.Typography.colorTextDescription = "#820014";
        }

        return colors;
    }, [variant]);

    return (
        <ConfigProvider
            theme={{
                token: {
                    marginXS: 0,
                    marginXXS: 0,
                    colorPrimaryText: "red",
                    colorTextSecondary: "red",
                },
                components: {
                    Typography: {
                        ...variantColors.Typography,
                    },
                    Card: {
                        ...variantColors.Card,
                    },
                },
            }}
        >
            <Card
                size="small"
                bordered
                onClick={() => {
                    replace(`/scrumboard/sales/edit/${id}`);
                }}
                actions={[
                    <div
                        key="1"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "0 12px",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                            }}
                        >
                            <Tooltip title={user.name}>
                                <CustomAvatar
                                    src={user?.avatarUrl}
                                    name={user?.name}
                                />
                            </Tooltip>
                            <Tooltip
                                title={dayjs(date).format(
                                    "DD MMMM YYYY, HH:MM",
                                )}
                            >
                                <Text size="xs" type="secondary">
                                    {dayjs(date).fromNow()}
                                </Text>
                            </Tooltip>
                        </div>
                        <Text>{price}</Text>
                    </div>,
                ]}
            >
                <Card.Meta
                    avatar={
                        <CustomAvatar
                            style={{
                                width: "48px",
                                height: "48px",
                            }}
                            shape="square"
                            size="large"
                            src={company?.avatarUrl}
                            name={company?.name}
                        />
                    }
                    title={
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                width: "100%",
                            }}
                        >
                            <Text
                                style={{
                                    fontWeight: 400,
                                }}
                                type="secondary"
                                ellipsis={{ tooltip: title }}
                            >
                                {company.name}
                            </Text>
                            <Dropdown
                                trigger={["click"]}
                                menu={{
                                    items: dropdownItems,
                                    onPointerDown: (e) => {
                                        e.stopPropagation();
                                    },
                                    onClick: (e) => {
                                        e.domEvent.stopPropagation();
                                    },
                                }}
                                placement="bottom"
                                arrow={{ pointAtCenter: true }}
                            >
                                <Button
                                    type="text"
                                    size="small"
                                    shape="circle"
                                    style={{
                                        backgroundColor: "white",
                                    }}
                                    icon={
                                        <MoreOutlined
                                            style={{
                                                transform: "rotate(90deg)",
                                            }}
                                        />
                                    }
                                    onPointerDown={(e) => {
                                        e.stopPropagation();
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    }}
                                />
                            </Dropdown>
                        </div>
                    }
                    description={
                        <Text strong size="md">
                            {title}
                        </Text>
                    }
                />
            </Card>
        </ConfigProvider>
    );
};

export const DealKanbanCardSkeleton = () => {
    return (
        <Card
            size="small"
            actions={[
                <div
                    key={1}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0 12px",
                    }}
                >
                    <div>
                        <Skeleton.Avatar size="small" shape="circle" active />
                        <Skeleton.Button
                            size="small"
                            active
                            style={{
                                width: "50px",
                                marginTop: "4px",
                                marginLeft: "8px",
                                height: "16px",
                            }}
                        />
                    </div>
                    <Skeleton.Button
                        size="small"
                        active
                        style={{
                            width: "100px",
                            marginTop: "4px",
                            height: "16px",
                        }}
                    />
                </div>,
            ]}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "16px",
                    height: "72px",
                }}
            >
                <Skeleton.Avatar
                    active
                    style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "4px",
                    }}
                    shape="square"
                    size="large"
                />
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Skeleton.Button
                        active
                        size="small"
                        style={{
                            height: "22px",
                            width: "125px",
                        }}
                    />
                    <Skeleton.Button
                        active
                        size="small"
                        style={{
                            marginTop: "8px",
                            height: "22px",
                            width: "125px",
                        }}
                    />
                </div>
            </div>
        </Card>
    );
};

export const DealKanbanCardMemo = memo(DealKanbanCard, (prev, next) => {
    return (
        prev.id === next.id &&
        prev.title === next.title &&
        prev.price === next.price &&
        prev.date === next.date &&
        prev.user.name === next.user.name &&
        prev.company.name === next.company.name &&
        prev.variant === next.variant
    );
});
