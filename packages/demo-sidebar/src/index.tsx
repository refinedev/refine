import React, { useState } from "react";

import { Drawer, Icons, Divider, List, Switch, Alert } from "readmin";

const { CloseOutlined, NotificationOutlined, SettingOutlined } = Icons;

interface BodyProps {
    title: string;
}

const Body: React.FC<BodyProps> = ({ children, title }) => (
    <div style={{ marginBottom: 24 }}>
        <h3 className={`ant-drawer-title`}>{title}</h3>
        {children}
    </div>
);

// Delete me
export const Thing = () => {
    const [show, setShow] = useState(false);

    return (
        <Drawer
            visible={show}
            width={300}
            onClose={() => setShow(false)}
            placement="right"
            handler={
                <div
                    className={`ant-drawer-handle`}
                    onClick={() => setShow(!show)}
                >
                    {show ? (
                        <CloseOutlined
                            style={{
                                color: "#fff",
                                fontSize: 20,
                            }}
                        />
                    ) : (
                        <SettingOutlined
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
                <Divider />
                jksfdşalksdfşlkas
                <Divider />
            </div>
        </Drawer>
    );
};
