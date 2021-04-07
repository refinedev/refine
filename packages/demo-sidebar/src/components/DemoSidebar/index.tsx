import React, { useState, CSSProperties } from "react";

import {
    Drawer,
    Icons,
    Switch,
    AntdList as List,
    Select,
    Input,
    MutationMode,
    Form,
    InputNumber,
} from "readmin";

import { Group } from "..";

const handlerStyles: CSSProperties = {
    position: "absolute",
    top: "240px",
    right: "300px",
    zIndex: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "48px",
    height: "48px",
    fontSize: "16px",
    textAlign: "center",
    background: "var(--antd-wave-shadow-color)",
    borderRadius: "4px 0 0 4px",
    cursor: "pointer",
};

const formItemStyles: CSSProperties = {
    marginBottom: "16px",
};

export interface DemoSidebarProps {
    title: string;
    mutationMode: MutationMode;
    syncWithLocation: boolean;
    warnWhenUnsavedChanges: boolean;
    undoableTimeout: number;
    onTitleChange: React.Dispatch<React.SetStateAction<string>>;
    onMutationModeChange: React.Dispatch<React.SetStateAction<MutationMode>>;
    onSyncWithLocationChange: React.Dispatch<React.SetStateAction<boolean>>;
    onWarnWhenUnsavedChangesChange: React.Dispatch<
        React.SetStateAction<boolean>
    >;
    onUndoableTimeoutChange: React.Dispatch<React.SetStateAction<number>>;
}

export const DemoSidebar: React.FC<DemoSidebarProps> = ({
    title,
    mutationMode,
    syncWithLocation,
    warnWhenUnsavedChanges,
    undoableTimeout,
    onTitleChange,
    onMutationModeChange,
    onSyncWithLocationChange,
    onWarnWhenUnsavedChangesChange,
    onUndoableTimeoutChange,
}) => {
    const [show, setShow] = useState<boolean>(false);

    return (
        <Drawer
            visible={show}
            width={300}
            onClose={() => setShow(false)}
            placement="right"
            handler={
                <div
                    style={handlerStyles}
                    className="ant-drawer-handle"
                    onClick={() => setShow(!show)}
                >
                    {show ? (
                        <Icons.CloseOutlined
                            style={{
                                color: "#fff",
                                fontSize: 20,
                            }}
                        />
                    ) : (
                        <Icons.SettingOutlined
                            style={{
                                color: "#fff",
                                fontSize: 20,
                            }}
                        />
                    )}
                </div>
            }
            style={{
                zIndex: 999,
            }}
        >
            <div className="ant-drawer-content">
                <Group title="Settings">
                    <Form
                        colon={false}
                        labelCol={{
                            flex: 1,
                            style: {
                                overflow: "visible",
                                whiteSpace: "pre-wrap",
                                textAlign: "left",
                            },
                        }}
                        wrapperCol={{
                            flex: 1,
                            style: {
                                marginRight: 5,
                                alignItems: "flex-end",
                            },
                        }}
                    >
                        <Form.Item label="Title" style={formItemStyles}>
                            <Input
                                size="small"
                                placeholder="Readmin"
                                value={title}
                                onChange={(e) => onTitleChange(e.target.value)}
                                data-testid="title"
                            />
                        </Form.Item>
                        <Form.Item label="Mutation mode" style={formItemStyles}>
                            <Select
                                size="small"
                                value={mutationMode}
                                onChange={onMutationModeChange}
                                data-testid="mutationMode"
                            >
                                <Select.Option value="pessimistic">
                                    Pessimistic
                                </Select.Option>
                                <Select.Option value="optimistic">
                                    Optimistic
                                </Select.Option>
                                <Select.Option value="undoable">
                                    Undoable
                                </Select.Option>
                            </Select>
                        </Form.Item>
                        {mutationMode === "undoable" && (
                            <Form.Item
                                label="Timeout to revert"
                                style={formItemStyles}
                            >
                                <InputNumber<number>
                                    size="small"
                                    min={0}
                                    step={1000}
                                    value={undoableTimeout}
                                    onChange={onUndoableTimeoutChange}
                                />
                            </Form.Item>
                        )}
                        <Form.Item
                            label="Sync with location"
                            style={formItemStyles}
                        >
                            <Switch
                                size="small"
                                checked={syncWithLocation}
                                onChange={onSyncWithLocationChange}
                                data-testId="location"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Warn if unsaved changes"
                            style={formItemStyles}
                        >
                            <Switch
                                size="small"
                                checked={warnWhenUnsavedChanges}
                                onChange={onWarnWhenUnsavedChangesChange}
                                data-testId="warnWhenUnsavedChanges"
                            />
                        </Form.Item>
                    </Form>
                </Group>
            </div>
        </Drawer>
    );
};

export default DemoSidebar;
