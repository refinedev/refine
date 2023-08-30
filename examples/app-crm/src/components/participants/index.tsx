import { PlusCircleOutlined } from "@ant-design/icons";
import { Avatar, Space, Tooltip } from "antd";
import { FC } from "react";
import { getNameInitials, getRandomColorFromString } from "../../utilities";
import { User } from "../../interfaces/graphql";

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
                <Avatar
                    size="small"
                    src={userOne.avatarUrl}
                    style={{
                        backgroundColor: getRandomColorFromString(userOne.name),
                    }}
                >
                    {getNameInitials(userOne.name)}
                </Avatar>
            </Tooltip>
            <PlusCircleOutlined className="xs tertiary" />
            <Tooltip title={userTwo.name}>
                <Avatar
                    size="small"
                    src={userTwo.avatarUrl}
                    style={{
                        backgroundColor: getRandomColorFromString(userTwo.name),
                    }}
                >
                    {getNameInitials(userOne.name)}
                </Avatar>
            </Tooltip>
        </Space>
    );
};
