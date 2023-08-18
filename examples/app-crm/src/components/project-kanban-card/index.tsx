import { useDelete, useNavigation } from "@refinedev/core";
import { memo, useMemo, useState } from "react";
import dayjs from "dayjs";
import {
    Avatar,
    Button,
    Card,
    ConfigProvider,
    Dropdown,
    Space,
    Tag,
    Tooltip,
    theme,
} from "antd";
import type { MenuProps } from "antd";
import {
    MoreOutlined,
    MessageOutlined,
    ClockCircleOutlined,
    CheckSquareOutlined,
    EyeOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import { TextIcon } from "../icon";
import { Text } from "../text";
import { getDateColor, getRandomColor } from "../../utilities";

type ProjectCardProps = {
    id: string;
    title: string;
    commentsCount?: number;
    dueDate?: string;
    users?: {
        id: string;
        name?: string;
        avatar?: string;
    }[];
    checkList?: {
        title: string;
        checked: boolean;
    }[];
};

export const ProjectCard = ({
    id,
    title,
    checkList,
    commentsCount,
    dueDate,
    users,
}: ProjectCardProps) => {
    const [randomColor] = useState(() => getRandomColor());

    const { token } = theme.useToken();
    const { push } = useNavigation();
    const { mutate } = useDelete();

    const dropdownItems = useMemo(() => {
        const dropdownItems: MenuProps["items"] = [
            {
                label: "View card",
                key: "1",
                icon: <EyeOutlined />,
                onClick: () => {
                    push(`${id}`);
                },
            },
            {
                danger: true,
                label: "Delete card",
                key: "2",
                icon: <DeleteOutlined />,
                onClick: () => {
                    mutate({
                        resource: "stages",
                        id,
                        meta: {
                            operation: "task",
                        },
                    });
                },
            },
        ];

        return dropdownItems;
    }, []);

    const dueDateOptions = useMemo(() => {
        if (!dueDate) return null;

        const date = dayjs(dueDate);

        return {
            color: getDateColor({ date: dueDate }) as string,
            text: date.format("MMM D"),
        };
    }, [dueDate]);

    const checkListCompletionCountOptions = useMemo(() => {
        const hasCheckList = checkList && checkList.length > 0;
        if (!hasCheckList) {
            return null;
        }

        const total = checkList.length;
        const checked = checkList?.filter((item) => item.checked).length;

        const defaulOptions = {
            color: "default",
            text: `${checked}/${total}`,
            allCompleted: false,
        };

        if (checked === total) {
            defaulOptions.color = "success";
            defaulOptions.allCompleted = true;
            return defaulOptions;
        }

        return defaulOptions;
    }, [checkList]);

    return (
        <ConfigProvider
            theme={{
                components: {
                    Tag: {
                        colorText: token.colorTextSecondary,
                    },
                    Card: {
                        headerBg: "transparent",
                    },
                },
            }}
        >
            <Card
                size="small"
                title={<Text ellipsis={{ tooltip: title }}>{title}</Text>}
                extra={
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
                            shape="circle"
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
                }
            >
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        gap: "8px",
                    }}
                >
                    <TextIcon
                        style={{
                            marginRight: "4px",
                        }}
                    />
                    {commentsCount && (
                        <Space size={4}>
                            <MessageOutlined
                                style={{
                                    color: token.colorTextSecondary,
                                    fontSize: "12px",
                                }}
                            />
                            <Text size="xs" type="secondary">
                                {commentsCount}
                            </Text>
                        </Space>
                    )}
                    {dueDateOptions && (
                        <Tag
                            icon={
                                <ClockCircleOutlined
                                    style={{
                                        fontSize: "12px",
                                    }}
                                />
                            }
                            style={{
                                padding: "0 4px",
                                marginInlineEnd: "0",
                                backgroundColor:
                                    dueDateOptions.color === "default"
                                        ? "transparent"
                                        : "unset",
                            }}
                            color={dueDateOptions.color}
                            bordered={dueDateOptions.color !== "default"}
                        >
                            {dueDateOptions.text}
                        </Tag>
                    )}
                    {checkListCompletionCountOptions && (
                        <Tag
                            icon={
                                <CheckSquareOutlined
                                    style={{
                                        fontSize: "12px",
                                    }}
                                />
                            }
                            style={{
                                padding: "0 4px",
                                marginInlineEnd: "0",
                                backgroundColor:
                                    checkListCompletionCountOptions.color ===
                                    "default"
                                        ? "transparent"
                                        : "unset",
                            }}
                            color={checkListCompletionCountOptions.color}
                            bordered={
                                checkListCompletionCountOptions.color !==
                                "default"
                            }
                        >
                            {checkListCompletionCountOptions.text}
                        </Tag>
                    )}
                    {!!users?.length && (
                        <Space
                            size={4}
                            wrap
                            direction="horizontal"
                            align="center"
                            style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                marginLeft: "auto",
                                marginRight: "0",
                            }}
                        >
                            {users.map((user) => {
                                return (
                                    <Tooltip key={user.id} title={user.name}>
                                        <Avatar
                                            key={user.id}
                                            alt={user.name}
                                            size="small"
                                            src={user.avatar}
                                            style={{
                                                backgroundColor: randomColor,
                                                objectFit: "contain",
                                                textTransform: "uppercase",
                                            }}
                                        >
                                            {user?.name?.[0]}
                                            {user?.name?.[1]}
                                        </Avatar>
                                    </Tooltip>
                                );
                            })}
                        </Space>
                    )}
                </div>
            </Card>
        </ConfigProvider>
    );
};

export const ProjectCardMemo = memo(ProjectCard);
