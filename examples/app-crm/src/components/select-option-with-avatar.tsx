import { Avatar, Space } from "antd";

import { Text } from "./text";

type Props = {
    name: string;
    avatarUrl?: string;
    shape?: "circle" | "square";
};

export const SelectOptionWithAvatar = ({ avatarUrl, name, shape }: Props) => {
    return (
        <Space>
            <Avatar shape={shape} size={20} src={avatarUrl} alt={name}>
                {name.charAt(0)}
            </Avatar>
            <Text>{name}</Text>
        </Space>
    );
};
