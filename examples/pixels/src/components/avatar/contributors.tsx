import React from "react";
import { Icons, Avatar } from "@pankod/refine-antd";
import { Pixel } from "types/pixel";
import { getContributorsAvatarSet } from "utility/getContributorsAvatarSet";

type ContributorsProps = {
    pixels: Pixel[] | undefined;
};

const { UserOutlined } = Icons;

const Contributors: React.FC<ContributorsProps> = ({ pixels }) => {
    const contributors = getContributorsAvatarSet(pixels);

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
            }}
        >
            {contributors?.map((avatar_url: any) => (
                <Avatar
                    key={avatar_url}
                    icon={<UserOutlined />}
                    src={avatar_url}
                    size={{ xs: 24, sm: 32, md: 40 }}
                />
            ))}
        </div>
    );
};

export default Contributors;
