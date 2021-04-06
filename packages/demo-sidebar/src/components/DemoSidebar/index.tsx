import React, { useState } from "react";

import {
    Drawer,
    Icons,
    Switch,
    AntdList as List,
    Select,
    Input,
    MutationMode,
} from "readmin";

import { Group } from "..";

const handlerStyles: React.CSSProperties = {
    position: "absolute",
    top: "240px",
    right: "360px",
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

interface SettingItemProps {
    title: React.ReactNode;
    action: React.ReactElement;
    disabled?: boolean;
}

export interface DemoSidebarProps {
    title: string;
    mutationMode: MutationMode;
    syncWithLocation: boolean;
    warnWhenUnsavedChanges: boolean;
    onTitleChange: React.Dispatch<React.SetStateAction<string>>;
    onMutationModeChange: React.Dispatch<React.SetStateAction<MutationMode>>;
    onSyncWithLocationChange: React.Dispatch<React.SetStateAction<boolean>>;
    onWarnWhenUnsavedChangesChange: React.Dispatch<
        React.SetStateAction<boolean>
    >;
}

export const DemoSidebar: React.FC<DemoSidebarProps> = ({
    title,
    mutationMode,
    syncWithLocation,
    warnWhenUnsavedChanges,
    onTitleChange,
    onMutationModeChange,
    onSyncWithLocationChange,
    onWarnWhenUnsavedChangesChange,
}) => {
    const [show, setShow] = useState<boolean>(false);

    return (
        <Drawer
            visible={show}
            width={360}
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
                    <List
                        split={false}
                        renderItem={(item: SettingItemProps) => {
                            const action = React.cloneElement(item.action, {
                                disabled: item.disabled,
                            });

                            return (
                                <List.Item actions={[action]}>
                                    <span
                                        style={{
                                            opacity: item.disabled ? 0.5 : 1,
                                        }}
                                    >
                                        {item.title}
                                    </span>
                                </List.Item>
                            );
                        }}
                        dataSource={[
                            {
                                title: "Title",
                                action: (
                                    <Input
                                        size="small"
                                        placeholder="Readmin"
                                        style={{ width: 140 }}
                                        value={title}
                                        onChange={(e) =>
                                            onTitleChange(e.target.value)
                                        }
                                    />
                                ),
                            },
                            {
                                title: "Mutation mode",
                                action: (
                                    <Select<MutationMode>
                                        size="small"
                                        style={{ width: 140 }}
                                        value={mutationMode}
                                        onChange={onMutationModeChange}
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
                                ),
                            },
                            {
                                title: "Sync with location",
                                action: (
                                    <Switch
                                        size="small"
                                        checked={syncWithLocation}
                                        onChange={onSyncWithLocationChange}
                                    />
                                ),
                            },
                            {
                                title: "Warn when there are unsaved changes",
                                action: (
                                    <Switch
                                        size="small"
                                        checked={warnWhenUnsavedChanges}
                                        onChange={
                                            onWarnWhenUnsavedChangesChange
                                        }
                                    />
                                ),
                            },
                        ]}
                    />
                </Group>
            </div>
        </Drawer>
    );
};

export default DemoSidebar;
