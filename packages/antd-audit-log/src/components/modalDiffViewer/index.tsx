import React, { useEffect, useRef, useState } from "react";
import * as Icons from "@ant-design/icons";
import {
    Modal,
    Dropdown,
    Menu,
    Button,
    Divider,
    Row,
    Col,
    ModalProps,
    Typography,
    Space,
} from "antd";

import { useLog, ILogData, ILog } from "@refinedev/core";
import ReactDiffViewer, {
    DiffMethod,
    ReactDiffViewerProps,
} from "react-diff-viewer";
import { UseQueryResult } from "@tanstack/react-query";
import stableStringify from "json-stable-stringify";

const { Paragraph } = Typography;

import { EventList } from "../eventList";

export interface ModalDiffViewerProps {
    logQueryResult?: UseQueryResult<ILogData>;
    reactDiffViewerProps?: ReactDiffViewerProps;
    modalProps?: ModalProps;
    selectedLog: ILog;
    setSelectedLog: React.Dispatch<React.SetStateAction<ILog | undefined>>;
    showModal: () => void;
}

export const ModalDiffViewer: React.FC<ModalDiffViewerProps> = ({
    logQueryResult,
    modalProps,
    reactDiffViewerProps,
    selectedLog,
    setSelectedLog,
    showModal,
}) => {
    const [diffView, setDiffView] = useState("split");
    const [name, setName] = useState(selectedLog.name ?? "Name");
    const diffViewerRef = useRef<ReactDiffViewer>(null);

    const { rename } = useLog();
    const { mutate } = rename;

    useEffect(() => {
        diffViewerRef.current?.resetCodeBlocks();
    }, [
        reactDiffViewerProps?.newValue,
        reactDiffViewerProps?.oldValue,
        modalProps?.visible,
    ]);

    const handleRename = (value: string) => {
        mutate(
            {
                id: selectedLog.id,
                name: value,
            },
            {
                onSuccess: () => {
                    setName(value);
                },
            },
        );
    };

    return (
        <Modal footer={null} width={"80%"} {...modalProps}>
            <Space>
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
                    placement="bottom"
                    trigger={["click"]}
                >
                    <Button icon={<Icons.SettingOutlined />}>Diff view</Button>
                </Dropdown>
                <Paragraph
                    editable={{
                        icon: <></>,
                        onChange: handleRename,
                        triggerType: ["text"],
                    }}
                >
                    {name}
                </Paragraph>
            </Space>
            <Divider />
            <Row gutter={[16, 16]}>
                <Col span={20}>
                    <ReactDiffViewer
                        ref={diffViewerRef}
                        leftTitle="Before"
                        rightTitle="After"
                        compareMethod={DiffMethod.WORDS}
                        splitView={diffView === "split"}
                        oldValue={stableStringify(selectedLog.previousData, {
                            space: " ",
                        })}
                        newValue={stableStringify(selectedLog.data, {
                            space: " ",
                        })}
                        {...reactDiffViewerProps}
                    />
                </Col>
                <Col span={4}>
                    <EventList
                        logQueryResult={logQueryResult}
                        setSelectedLog={setSelectedLog}
                        showModal={showModal}
                    />
                </Col>
            </Row>
        </Modal>
    );
};
