import { useDelete } from "@refinedev/core";
import { FC, memo, useMemo, useState } from "react";
import {
    Avatar,
    Button,
    Card,
    ConfigProvider,
    Dropdown,
    MenuProps,
    Tooltip,
} from "antd";
import { MoreOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import { Text } from "../text";
import { getRandomColorFromString } from "../../utilities";
import { User } from "../../interfaces/graphql";

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
        avatar?: string;
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
    const [color] = useState(() => {
        return {
            user: getRandomColorFromString(user.name),
            company: getRandomColorFromString(company.name),
        };
    });

    const navigate = useNavigate();
    const { mutate } = useDelete();

    const dropdownItems = useMemo(() => {
        const dropdownItems: MenuProps["items"] = [
            {
                label: "View card",
                key: "1",
                icon: <EyeOutlined />,
                onClick: () => {
                    console.log("view card");
                    navigate(`/scrumboard/sales/edit/${id}`, {
                        replace: true,
                    });
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
                    push(`${id}`);
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
                                <Avatar
                                    style={{
                                        backgroundColor: color.user,
                                        objectFit: "cover",
                                    }}
                                    shape="circle"
                                    size="small"
                                    src={user?.avatarUrl}
                                    alt={user?.name}
                                >
                                    {user?.name[0]}
                                </Avatar>
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
                        <Avatar
                            style={{
                                backgroundColor: color.company,
                                width: "48px",
                                height: "48px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                objectFit: "cover",
                            }}
                            shape="square"
                            size="large"
                            src={company?.avatar}
                            alt={company?.name}
                        >
                            {company?.name[0]}
                        </Avatar>
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
