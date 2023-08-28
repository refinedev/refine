import { Button, Drawer, Skeleton, Space, Tag } from "antd";
import { useGetToPath, useResource, useShow } from "@refinedev/core";
import {
    CalendarOutlined,
    FlagOutlined,
    TeamOutlined,
    InfoCircleOutlined,
    EditOutlined,
    CloseOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { EditButton } from "@refinedev/antd";
import { useNavigate } from "react-router-dom";

import { Text } from "../../components/text";
import { Event } from "../../interfaces/graphql";
import { UserTag } from "../../components/user-tag";

export const CalendarShowPage: React.FC = () => {
    const { id } = useResource();
    const navigate = useNavigate();
    const getToPath = useGetToPath();
    const { queryResult } = useShow<Event>({
        id,
        meta: {
            fields: [
                "id",
                "title",
                "description",
                "startDate",
                "endDate",
                "color",
                "createdAt",
                {
                    createdBy: ["id", "name", "avatarUrl"],
                },
                {
                    category: ["id", "title"],
                },
                {
                    participants: ["id", "name", "avatarUrl"],
                },
            ],
        },
    });

    const { data, isLoading, isError } = queryResult;

    if (isError) {
        console.error("Error fetching event", isError);
        return null;
    }

    const { description, startDate, endDate, category, participants } =
        data?.data ?? {};

    // if the event is more than one day, don't show the time
    let dateFormat = "dddd, MMMM D, YYYY [at] h:mm A";
    let allDay = false;
    if (dayjs(endDate).diff(dayjs(startDate), "day") > 0) {
        dateFormat = "dddd, MMMM D, YYYY";
        allDay = true;
    }

    const handleOnClose = () => {
        navigate(
            getToPath({
                action: "list",
            }) ?? "",
            {
                replace: true,
            },
        );
    };

    return (
        <Drawer
            headerStyle={{ display: "none" }}
            open
            onClose={handleOnClose}
            width={378}
        >
            {isLoading ? (
                <Skeleton
                    loading={isLoading}
                    active
                    avatar
                    paragraph={{
                        rows: 3,
                    }}
                    style={{
                        padding: 0,
                    }}
                />
            ) : (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "24px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <div style={{ display: "flex", gap: "8px" }}>
                            <div
                                style={{
                                    backgroundColor: data?.data.color,
                                    flexShrink: 0,
                                    borderRadius: "50%",
                                    width: "10px",
                                    height: "10px",
                                    marginTop: "8px",
                                }}
                            />
                            <Text strong size="md">
                                {data?.data.title}
                            </Text>
                        </div>
                        <div style={{ display: "flex", gap: "4px" }}>
                            <EditButton
                                icon={<EditOutlined />}
                                hideText
                                type="text"
                            />
                            <Button
                                icon={<CloseOutlined />}
                                type="text"
                                onClick={handleOnClose}
                            />
                        </div>
                    </div>
                    <div>
                        <CalendarOutlined style={{ marginRight: ".5rem" }} />
                        <Text>{dayjs(startDate).format(dateFormat)}</Text>
                        {allDay && (
                            <Tag style={{ marginLeft: ".5rem" }} color="blue">
                                All Day
                            </Tag>
                        )}
                    </div>
                    <div>
                        <CalendarOutlined style={{ marginRight: ".5rem" }} />
                        <Text>{dayjs(endDate).format(dateFormat)}</Text>
                    </div>
                    <div>
                        <FlagOutlined style={{ marginRight: ".5rem" }} />
                        <Text>{category?.title}</Text>
                    </div>
                    <div style={{ display: "flex", alignItems: "start" }}>
                        <TeamOutlined style={{ marginRight: ".5rem" }} />
                        <Space size={4} wrap style={{ marginTop: "-8px" }}>
                            {participants?.map((participant) => (
                                <UserTag
                                    key={participant.id}
                                    user={participant}
                                />
                            ))}
                        </Space>
                    </div>
                    <div>
                        <InfoCircleOutlined style={{ marginRight: ".5rem" }} />
                        <Text>{description}</Text>
                    </div>
                </div>
            )}
        </Drawer>
    );
};
