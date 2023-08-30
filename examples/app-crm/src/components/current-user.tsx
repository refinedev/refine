import { Popover } from "antd";
import { useGetIdentity } from "@refinedev/core";

import { CustomAvatar } from "./custom-avatar";
import type { User } from "../interfaces/graphql";

export const CurrentUser = () => {
    const { data: user } = useGetIdentity<User>();

    const content = <div>content here</div>;

    return (
        <Popover placement="bottomRight" content={content} trigger="click">
            <CustomAvatar
                name={user?.name}
                size="default"
                style={{ cursor: "pointer" }}
            />
        </Popover>
    );
};
