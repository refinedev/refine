import { Badge, Drawer, Space } from "antd";
import { useGetToPath, useResource, useShow } from "@refinedev/core";
import {
    CalendarOutlined,
    FlagOutlined,
    TeamOutlined,
    InfoCircleOutlined,
    EditOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { EditButton } from "@refinedev/antd";
import { useNavigate } from "react-router-dom";

import { Text } from "../../components/text";
import { Event } from "../../interfaces/graphql";

export const CalendarShowPage = () => {
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
                    createdBy: ["id", "name"],
                },
                {
                    category: ["id", "title"],
                },
                {
                    participants: ["id", "name"],
                },
            ],
        },
    });

    const { data, isLoading, isError } = queryResult;

    if (isError) {
        // TODO: handle error message
        return null;
    }

    if (isLoading) {
        // TODO: handle loading state (skeleton)
        return null;
    }

    const {
        color,
        title,
        description,
        startDate,
        endDate,
        category,
        participants,
    } = data.data;

    // if the event is more than one day, don't show the time
    let dateFormat = "dddd, MMMM D, YYYY [at] h:mm A";
    if (dayjs(endDate).diff(dayjs(startDate), "day") > 0) {
        dateFormat = "dddd, MMMM D, YYYY";
    }

    return (
        <Drawer
            title={
                <Space>
                    <Badge color={color} />
                    <Text>{title}</Text>
                </Space>
            }
            open
            onClose={() => {
                navigate(
                    getToPath({
                        action: "list",
                    }) ?? "",
                    {
                        replace: true,
                    },
                );
            }}
            width={560}
            extra={<EditButton icon={<EditOutlined />} hideText />}
        >
            <Space direction="vertical" size="large">
                <div>
                    <CalendarOutlined style={{ marginRight: ".5rem" }} />
                    <Text>{dayjs(startDate).format(dateFormat)}</Text>
                </div>
                <div>
                    <CalendarOutlined style={{ marginRight: ".5rem" }} />
                    <Text>{dayjs(endDate).format(dateFormat)}</Text>
                </div>
                <div>
                    <FlagOutlined style={{ marginRight: ".5rem" }} />
                    <Text>{category.title}</Text>
                </div>
                <div>
                    <TeamOutlined style={{ marginRight: ".5rem" }} />
                    {participants.map((participant) => (
                        <Text key={participant.id}>{participant.name}</Text>
                    ))}
                </div>
                <div>
                    <InfoCircleOutlined style={{ marginRight: ".5rem" }} />
                    <Text>{description}</Text>
                </div>
            </Space>
        </Drawer>
    );
};
