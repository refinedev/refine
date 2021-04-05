import React, { useState } from "react";

import {
    Drawer,
    Icons,
    // Divider,
    Switch,
    AntdList as List,
    Select,
    Input,
} from "readmin";

import { Group } from "@components/Group";

const handlerStyles: React.CSSProperties = {
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

interface SettingItemProps {
    title: React.ReactNode;
    action: React.ReactElement;
    disabled?: boolean;
}

export const DemoSidebar = () => {
    const [show, setShow] = useState(true);

    return (
        <Drawer
            visible={true}
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
                                        placeholder="Readmin3"
                                        style={{ width: 100 }}
                                    />
                                ),
                            },
                            {
                                title: "Mutation mode",
                                action: (
                                    <Select<string>
                                        size="small"
                                        style={{ width: 100 }}
                                        defaultValue="Fluid"
                                    >
                                        <Select.Option value="Fluid">
                                            asdfasdfa
                                        </Select.Option>
                                    </Select>
                                ),
                            },
                            {
                                title: "Sync with location",
                                action: (
                                    <Switch
                                        size="small"
                                        checked={true}
                                        onChange={(checked) => 0}
                                    />
                                ),
                            },
                            {
                                title: "Warn when there are unsaved changes",
                                action: (
                                    <Switch
                                        size="small"
                                        checked={true}
                                        onChange={(checked) => 0}
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
