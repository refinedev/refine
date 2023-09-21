import { FC } from "react";

import { PlusCircleOutlined } from "@ant-design/icons";
import { Space, Tooltip } from "antd";

import { User } from "@/interfaces";

import { CustomAvatar } from "../custom-avatar";

type Props = {
    userOne: Pick<User, "id" | "name" | "avatarUrl">;
    userTwo: Pick<User, "id" | "name" | "avatarUrl">;
};

export const Participants: FC<Props> = ({ userOne, userTwo }) => {
    return (
        <Space
            size={4}
            style={{
                textTransform: "uppercase",
            }}
        >
            <Tooltip title={userOne.name}>
                <CustomAvatar
                    size="small"
                    src={userOne.avatarUrl}
                    name={userOne.name}
                />
            </Tooltip>
            <PlusCircleOutlined className="xs tertiary" />
            <Tooltip title={userTwo.name}>
                <CustomAvatar
                    size="small"
                    src={userTwo.avatarUrl}
                    name={userTwo.name}
                />
            </Tooltip>
        </Space>
    );
};
