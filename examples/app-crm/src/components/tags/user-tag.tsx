import { FC } from "react";

import { GetFieldsFromList } from "@refinedev/nestjs-query";

import { Space, Tag } from "antd";

import { UsersSelectQuery } from "@/graphql/types";

import { CustomAvatar } from "../custom-avatar";

type Props = {
    user: GetFieldsFromList<UsersSelectQuery>;
};

export const UserTag: FC<Props> = ({ user }) => {
    return (
        <Tag
            key={user.id}
            style={{
                padding: 2,
                paddingRight: 8,
                borderRadius: 24,
                lineHeight: "unset",
                marginRight: "unset",
            }}
        >
            <Space size={4}>
                <CustomAvatar
                    src={user.avatarUrl}
                    name={user.name}
                    style={{ display: "inline-flex" }}
                />
                {user.name}
            </Space>
        </Tag>
    );
};
