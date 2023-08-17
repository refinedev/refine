import { Space, Tag, Typography } from "antd";

import { Task } from "../interfaces/graphql";

type Props = {
    users?: Task["users"];
};

export const KanbanUsersHeader = ({ users = [] }: Props) => {
    if (users.length > 0) {
        return (
            <Space>
                {users?.map((user) => (
                    <Tag key={user.id}>{user.name}</Tag>
                ))}
            </Space>
        );
    }

    return <Typography.Link>Assign to users</Typography.Link>;
};
