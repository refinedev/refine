import React from "react";

// It is recommended to use explicit import as seen below to reduce bundle size.
// import { IconName } from "@ant-design/icons";
import * as Icons from "@ant-design/icons";

import { Avatar } from "antd";

import { getUniqueContributorsAvatarURL } from "utility";
import { Pixel } from "types";

type ContributorsProps = {
    pixels: Pixel[];
};

const { UserOutlined } = Icons;

export const Contributors: React.FC<ContributorsProps> = ({ pixels }) => {
    const avatarURls = getUniqueContributorsAvatarURL(pixels);

    if (avatarURls.length === 0) {
        return null;
    }

    return (
        <Avatar.Group maxCount={2}>
            {avatarURls.map((avatar_url) => (
                <Avatar
                    key={avatar_url}
                    icon={<UserOutlined />}
                    src={avatar_url}
                />
            ))}
        </Avatar.Group>
    );
};
