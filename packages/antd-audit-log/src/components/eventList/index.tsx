import React from "react";
import { UseQueryResult } from "@tanstack/react-query";
import * as Icons from "@ant-design/icons";
import {
    List as AntdList,
    Dropdown,
    Menu,
    Button,
    Badge,
    Typography,
} from "antd";
import { ILog, ILogData, useUpdate } from "@refinedev/core";
import dayjs from "dayjs";

const { Text } = Typography;

interface EventListProps {
    logQueryResult?: UseQueryResult<ILogData>;
    showModal: () => void;
    setSelectedLog: React.Dispatch<React.SetStateAction<ILog | undefined>>;
}

export const EventList: React.FC<EventListProps> = ({
    logQueryResult,
    showModal,
    setSelectedLog,
}) => {
    const { mutate } = useUpdate();

    return (
        <AntdList
            dataSource={logQueryResult?.data}
            renderItem={(log) => {
                const {
                    author,
                    name,
                    previousData,
                    createdAt,
                    resource,
                    meta,
                } = log;

                return (
                    <AntdList.Item
                        style={{
                            alignItems: "flex-start",
                            padding: "8px 0px 8px 8px",
                        }}
                        extra={
                            <Dropdown
                                overlay={
                                    <Menu mode="vertical">
                                        <Menu.Item
                                            key="1"
                                            onClick={() => {
                                                mutate({
                                                    resource,
                                                    id: meta?.id,
                                                    values: previousData,
                                                });
                                            }}
                                        >
                                            Restore
                                        </Menu.Item>
                                        <Menu.Item key="2">Rename</Menu.Item>
                                    </Menu>
                                }
                                trigger={["click"]}
                            >
                                <Icons.MoreOutlined
                                    style={{ fontSize: "18px" }}
                                />
                            </Dropdown>
                        }
                    >
                        <Button
                            type="text"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                height: "100%",
                            }}
                            onClick={() => {
                                showModal();
                                setSelectedLog(log);
                            }}
                        >
                            <Text strong>
                                {name ??
                                    dayjs(createdAt).format(
                                        "MM/DD/YYYY, hh:mm",
                                    )}
                            </Text>
                            <Badge color="blue" text={author?.email} />
                        </Button>
                    </AntdList.Item>
                );
            }}
        />
    );
};
