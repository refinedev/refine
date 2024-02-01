import { EditButton } from "@refinedev/antd";
import { useNavigation, useResource, useShow } from "@refinedev/core";

import {
    CalendarOutlined,
    ClockCircleOutlined,
    CloseOutlined,
    EditOutlined,
    FlagOutlined,
    InfoCircleOutlined,
    TeamOutlined,
} from "@ant-design/icons";
import { Button, Drawer, Skeleton, Space, Tag } from "antd";
import dayjs from "dayjs";

import { Text, UserTag } from "@/components";
import { Event } from "@/graphql/schema.types";

import { CALENDAR_GET_EVENT_QUERY } from "./queries";

export const CalendarShowPage: React.FC = () => {
    const { id } = useResource();
    const { list } = useNavigation();

    const { queryResult } = useShow<Event>({
        id,
        meta: {
            gqlQuery: CALENDAR_GET_EVENT_QUERY,
        },
    });

    const { data, isLoading, isError, error } = queryResult;

    if (isError) {
        console.error("Error fetching event", error);
        return null;
    }

    const { description, startDate, endDate, category, participants } =
        data?.data ?? {};

    const utcStartDate = dayjs(startDate).utc();
    const utcEndDate = dayjs(endDate).utc();

    // if the event is more than one day, don't show the time
    let allDay = false;
    // check if more then 23 hours
    if (utcEndDate.diff(utcStartDate, "hours") >= 23) {
        allDay = true;
    }

    const handleOnClose = () => {
        list("events");
    };

    return (
        <Drawer
            title={
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
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
            }
            closeIcon={false}
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
                    {allDay ? (
                        <div>
                            <CalendarOutlined
                                style={{ marginRight: ".5rem" }}
                            />
                            <Text>{`${dayjs(utcStartDate).format(
                                "MMMM D",
                            )} - ${dayjs(utcEndDate).format("MMMM D")}`}</Text>
                            <Tag style={{ marginLeft: ".5rem" }} color="blue">
                                All Day
                            </Tag>
                        </div>
                    ) : (
                        <>
                            <div>
                                <CalendarOutlined
                                    style={{ marginRight: ".5rem" }}
                                />
                                <Text>
                                    {dayjs(utcStartDate).format(
                                        "MMMM D, YYYY dddd",
                                    )}
                                </Text>
                            </div>
                            <div>
                                <ClockCircleOutlined
                                    style={{ marginRight: ".5rem" }}
                                />
                                <Text>{`${dayjs(utcStartDate).format(
                                    "h:mma",
                                )} - ${dayjs(utcEndDate).format(
                                    "h:mma",
                                )}`}</Text>
                            </div>
                        </>
                    )}

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
                    <div style={{ display: "flex", alignItems: "start" }}>
                        <InfoCircleOutlined
                            style={{
                                marginRight: ".5rem",
                                marginTop: "0.32rem",
                            }}
                        />
                        <Text>{description}</Text>
                    </div>
                </div>
            )}
        </Drawer>
    );
};
