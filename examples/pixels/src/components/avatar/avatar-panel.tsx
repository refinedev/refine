import React from "react";
import { Typography, Space, Avatar, Icons } from "@pankod/refine-antd";

import { getUniqueContributorsAvatarURL } from "utility";
import { Pixel } from "types";

const { Title } = Typography;

type AvatarPanelProps = {
    pixels: Pixel[];
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
