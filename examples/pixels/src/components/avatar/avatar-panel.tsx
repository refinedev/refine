import { Avatar, Icons } from "@pankod/refine-antd";
import React from "react";
import { Pixel } from "types/pixel";
import { getContributorsAvatarSet } from "utility/getContributorsAvatarSet";

type AvatarPanelProps = {
    pixels: Pixel[] | undefined;
};

const AvatarPanel: React.FC<AvatarPanelProps> = ({ pixels }) => {
    const contributors = getContributorsAvatarSet(pixels);

    return (
        <div style={{ padding: "0 24px" }}>
            <h2
                style={{
                    textTransform: "uppercase",
                    fontSize: "12px",
                    fontWeight: 800,
                }}
            >
                Users
            </h2>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    justifyContent: "center",
                    alignItems: "start",
                    gap: "8px",
                }}
            >
                {contributors?.map((avatar_url: any) => (
                    <Avatar
                        key={avatar_url}
                        icon={<Icons.UserOutlined />}
                        src={avatar_url}
                        size={{ xs: 24, sm: 32, md: 40 }}
                    />
                ))}
            </div>
        </div>
    );
};

export default AvatarPanel;
