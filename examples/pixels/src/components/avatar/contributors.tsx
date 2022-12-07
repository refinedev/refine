import React from "react";
import { Icons, Avatar } from "@pankod/refine-antd";

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
        <Avatar.Group
            maxCount={2}
            maxStyle={{
                color: "#f56a00",
                backgroundColor: "#fde3cf",
            }}
        >
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
