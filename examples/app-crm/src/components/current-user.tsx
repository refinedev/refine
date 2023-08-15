import React from "react";

import { Avatar, Popover } from "antd";
import { useGetIdentity } from "@refinedev/core";

import type { User } from "../interfaces/graphql";

export const CurrentUser = () => {
    const { data: user } = useGetIdentity<User>();

    const content = <div>content here</div>;

    return (
        <Popover placement="bottomRight" content={content} trigger="click">
            <Avatar
                alt={user?.name}
                size="default"
                style={{
                    verticalAlign: "middle",
                    cursor: "pointer",
                }}
            >
                {user?.name?.split(" ").map((name) => name[0])}
            </Avatar>
        </Popover>
    );
};
