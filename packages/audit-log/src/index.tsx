import React from "react";
import { UseQueryResult } from "react-query";
import {
    Card,
    AntdList,
    Typography,
    Icons,
    Dropdown,
    Menu,
    Tag,
    Badge,
} from "@pankod/refine-antd";

const { Text } = Typography;
export interface AuditLogListProps {
    logQueryResult?: UseQueryResult<any>;
}

export const AuditLogList: React.FC<AuditLogListProps> = ({
    logQueryResult,
}) => {
    return (
        <Card loading={logQueryResult?.isLoading} bodyStyle={{ padding: 0 }}>
            <AntdList
                dataSource={logQueryResult?.data?.data}
                renderItem={(item: any) => (
                    <AntdList.Item
                        style={{
                            alignItems: "flex-start",
                            padding: "8px 0px 8px 8px",
                        }}
                        extra={
                            <Dropdown
                                overlay={
                                    <Menu mode="vertical">
                                        <Menu.Item key="1">Restore</Menu.Item>
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
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <Text strong>{item.timestamp}</Text>

                            <Badge color="blue" text={item.author.name} />
                        </div>
                    </AntdList.Item>
                )}
            />
        </Card>
    );
};
