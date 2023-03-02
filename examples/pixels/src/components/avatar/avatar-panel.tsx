import React from "react";

// It is recommended to use explicit import as seen below to reduce bundle size.
// import { IconName } from "@ant-design/icons";
import * as Icons from "@ant-design/icons";

import { Typography, Space, Avatar } from "antd";

import { getUniqueContributorsAvatarURL } from "utility";
import { Pixel } from "types";

const { Title } = Typography;

type AvatarPanelProps = {
    pixels: Pixel[] | undefined;
};

export const AvatarPanel: React.FC<AvatarPanelProps> = ({ pixels }) => {
    const contributors = getUniqueContributorsAvatarURL(pixels);

    if (contributors.length === 0) {
        return null;
    }

    return (
        <div>
            <Title level={4}>Users</Title>
            <Space wrap>
                {contributors.map((avatar_url) => (
                    <Avatar
                        key={avatar_url}
                        icon={<Icons.UserOutlined />}
                        src={avatar_url}
                    />
                ))}
            </Space>
        </div>
    );
};
