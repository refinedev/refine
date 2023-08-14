import React from "react";
import { Badge, Popover, Button } from "antd";
import { BellOutlined } from "@ant-design/icons";

export const Notifications: React.FC = () => {
    const content = <div>this is the notifications content</div>;
    return (
        <Popover placement="bottomRight" content={content} trigger="click">
            <Badge color="red" count={1} size="small">
                <Button
                    shape="circle"
                    icon={<BellOutlined />}
                    style={{ border: 0 }}
                />
            </Badge>
        </Popover>
    );
};
