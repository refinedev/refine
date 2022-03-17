import React, { useState } from "react";
import { UseQueryResult } from "react-query";
import { useModal, useUpdate } from "@pankod/refine-core";
import {
    Card,
    AntdList,
    Typography,
    Icons,
    Dropdown,
    Menu,
    Badge,
    Modal,
    Button,
    Divider,
    Col,
    Row,
} from "@pankod/refine-antd";
import dayjs from "dayjs";
import ReactDiffViewer, { DiffMethod } from "react-diff-viewer";
import stableStringify from "json-stable-stringify";

const { Text } = Typography;
export interface AuditLogListProps {
    logQueryResult?: UseQueryResult<any>;
}

export const AuditLogList: React.FC<AuditLogListProps> = ({
    logQueryResult,
}) => {
    const [selectedLog, setSelectedLog] = useState();
    const [diffView, setDiffView] = useState("split");

    const { close, show, visible } = useModal();
    const { mutate } = useUpdate();

    return (
        <>
            <Card
                loading={logQueryResult?.isLoading}
                bodyStyle={{ padding: 0 }}
            >
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
                                            <Menu.Item
                                                key="1"
                                                onClick={() => {
                                                    mutate({
                                                        resource: "posts",
                                                        id: item.data.id,
                                                        values: item.previousData,
                                                    });
                                                }}
                                            >
                                                Restore
                                            </Menu.Item>
                                            <Menu.Item key="2">
                                                Rename
                                            </Menu.Item>
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
                                    show();
                                    setSelectedLog(item.id);
                                }}
                            >
                                <Text strong>
                                    {dayjs(item.timestamp).format(
                                        "MM/DD/YYYY, hh:mm",
                                    )}
                                </Text>
                                <Badge color="blue" text={item.author.name} />
                            </Button>
                        </AntdList.Item>
                    )}
                />
            </Card>
            <Modal
                visible={visible}
                onCancel={close}
                footer={null}
                width={"80%"}
            >
                <div style={{ display: "flex" }}>
                    <Dropdown
                        overlay={
                            <Menu selectedKeys={[diffView]}>
                                <Menu.Item
                                    key="split"
                                    onClick={(info) => setDiffView(info.key)}
                                >
                                    Split
                                </Menu.Item>
                                <Menu.Item
                                    key="unified"
                                    onClick={(info) => setDiffView(info.key)}
                                >
                                    Unified
                                </Menu.Item>
                            </Menu>
                        }
                        placement="bottomCenter"
                        trigger={["click"]}
                    >
                        <Button icon={<Icons.SettingOutlined />}>
                            Diff view
                        </Button>
                    </Dropdown>
                </div>
                <Divider />
                <Row gutter={[16, 16]}>
                    <Col span={20}>
                        <ReactDiffViewer
                            leftTitle="Before"
                            oldValue={stableStringify(
                                logQueryResult?.data?.data.find(
                                    (item: any) => item.id === selectedLog,
                                )?.previousData,
                                { space: " " },
                            )}
                            rightTitle="After"
                            newValue={stableStringify(
                                logQueryResult?.data?.data.find(
                                    (item: any) => item.id === selectedLog,
                                )?.data,
                                { space: " " },
                            )}
                            compareMethod={DiffMethod.WORDS}
                            splitView={diffView === "split"}
                        />
                    </Col>
                    <Col span={4}>
                        <AntdList
                            dataSource={logQueryResult?.data?.data}
                            renderItem={(item: any) => (
                                <AntdList.Item
                                    style={{
                                        alignItems: "flex-start",
                                        padding: "8px 0px 8px 8px",
                                        backgroundColor:
                                            item.id === selectedLog
                                                ? "#f5f5f5"
                                                : "",
                                    }}
                                    extra={
                                        <Dropdown
                                            overlay={
                                                <Menu mode="vertical">
                                                    <Menu.Item
                                                        key="1"
                                                        onClick={() => {
                                                            mutate({
                                                                resource:
                                                                    "posts",
                                                                id: item.data
                                                                    .id,
                                                                values: item.previousData,
                                                            });
                                                            close();
                                                        }}
                                                    >
                                                        Restore
                                                    </Menu.Item>
                                                    <Menu.Item key="2">
                                                        Rename
                                                    </Menu.Item>
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
                                        type="link"
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            height: "100%",
                                        }}
                                        onClick={() => {
                                            show();
                                            setSelectedLog(item.id);
                                        }}
                                    >
                                        <Text strong>
                                            {dayjs(item.timestamp).format(
                                                "MM/DD/YYYY, hh:mm",
                                            )}
                                        </Text>
                                        <Badge
                                            color="blue"
                                            text={item.author.name}
                                        />
                                    </Button>
                                </AntdList.Item>
                            )}
                        />
                    </Col>
                </Row>
            </Modal>
        </>
    );
};
