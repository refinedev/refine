import { Tag, Space, Avatar } from "antd";

import { User } from "../interfaces/graphql";

type Props = {
    user: User;
};

export const UserTag = ({ user }: Props) => {
    return (
        <Tag
            key={user.id}
            style={{
                padding: 2,
                paddingRight: 8,
                borderRadius: 24,
                lineHeight: "unset",
            }}
        >
            <Space size={4}>
                <Avatar size={20}>A</Avatar>
                {user.name}
            </Space>
        </Tag>
    );
};
