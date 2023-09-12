import { Space, Typography } from "antd";

import { UserTag } from "../user-tag";
import { Task } from "../../interfaces/graphql";

type Props = {
    users?: Task["users"];
};

export const UsersHeader = ({ users = [] }: Props) => {
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
