import React, { useEffect, useRef, useState } from "react";
import {
    Modal,
    Dropdown,
    Menu,
    Button,
    Icons,
    Divider,
    Row,
    Col,
    ModalProps,
} from "@pankod/refine-antd";
import { BaseKey } from "@pankod/refine-core";
import ReactDiffViewer, {
    DiffMethod,
    ReactDiffViewerProps,
} from "react-diff-viewer";
import { UseQueryResult } from "react-query";

import { EventList } from "../eventList";

export interface ModalDiffViewerProps {
    logQueryResult?: UseQueryResult<any>;
    reactDiffViewerProps?: ReactDiffViewerProps;
    modalProps?: ModalProps;
    showModal: () => void;
    setSelectedLog: React.Dispatch<React.SetStateAction<BaseKey | undefined>>;
}

export const ModalDiffViewer: React.FC<ModalDiffViewerProps> = ({
    logQueryResult,
    modalProps,
    reactDiffViewerProps,
    setSelectedLog,
    showModal,
}) => {
    const [diffView, setDiffView] = useState("split");
    const diffViewerRef = useRef<ReactDiffViewer>(null);

    useEffect(() => {
        diffViewerRef.current?.resetCodeBlocks();
    }, [
        reactDiffViewerProps?.newValue,
        reactDiffViewerProps?.oldValue,
        modalProps?.visible,
    ]);

    return (
        <Modal footer={null} width={"80%"} {...modalProps}>
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
                    placement="bottom"
                    trigger={["click"]}
                >
                    <Button icon={<Icons.SettingOutlined />}>Diff view</Button>
                </Dropdown>
            </div>
            <Divider />
            <Row gutter={[16, 16]}>
                <Col span={20}>
                    <ReactDiffViewer
                        ref={diffViewerRef}
                        leftTitle="Before"
                        rightTitle="After"
                        compareMethod={DiffMethod.WORDS}
                        splitView={diffView === "split"}
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
