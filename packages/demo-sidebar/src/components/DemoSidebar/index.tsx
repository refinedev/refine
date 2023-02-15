import React, { useState } from "react";
import { DemoSidebarProps } from "./types";
import { handlerStyles, formItemStyles } from "./styles";

import * as Icons from "@ant-design/icons";
import { Drawer, Switch, Select, Form, InputNumber } from "antd";

import { Group } from "..";

export const DemoSidebar: React.FC<DemoSidebarProps> = ({
    mutationMode,
    syncWithLocation,
    warnWhenUnsavedChanges,
    undoableTimeout,
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
            extra={
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
                                    onChange={(value) =>
                                        onUndoableTimeoutChange(value ?? 0)
                                    }
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
