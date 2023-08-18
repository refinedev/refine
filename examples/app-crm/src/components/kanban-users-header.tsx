import { Space, Typography } from "antd";

import { Task } from "../interfaces/graphql";
import { UserTag } from "./user-tag";

type Props = {
    users?: Task["users"];
};

export const KanbanUsersHeader = ({ users = [] }: Props) => {
    if (users.length > 0) {
        return (
            <Space size={[0, 8]} wrap>
                {users.map((user) => (
                    <UserTag key={user.id} user={user} />
                ))}
            </Space>
        );
    }

    return <Typography.Link>Assign to users</Typography.Link>;
};
