import { FC } from "react";

import { Space } from "antd";

import { CustomAvatar } from "./custom-avatar";
import { Text } from "./text";

type Props = {
    name: string;
    avatarUrl?: string;
    shape?: "circle" | "square";
};

export const SelectOptionWithAvatar: FC<Props> = ({
    avatarUrl,
    name,
    shape,
}) => {
    return (
        <Space>
            <CustomAvatar shape={shape} name={name} src={avatarUrl} />
            <Text>{name}</Text>
        </Space>
    );
};
