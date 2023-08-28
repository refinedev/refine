import { Space } from "antd";

import { Text } from "./text";
import { CustomAvatar } from "./custom-avatar";

type Props = {
    name: string;
    avatarUrl?: string;
    shape?: "circle" | "square";
};

export const SelectOptionWithAvatar = ({ avatarUrl, name, shape }: Props) => {
    return (
        <Space>
            <CustomAvatar shape={shape} name={name} src={avatarUrl} />
            <Text>{name}</Text>
        </Space>
    );
};
