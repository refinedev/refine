import React from "react";
import { useGetIdentity, useLogout } from "@pankod/refine-core";
import {
    AntdLayout,
    Typography,
    Avatar,
    Space,
    Icons,
    Menu,
    Button,
} from "@pankod/refine-antd";

const { Text } = Typography;
const { UserOutlined, LogoutOutlined } = Icons;

export const Header: React.FC = () => {
    const { data: user } = useGetIdentity();
    const { mutate: mutateLogout } = useLogout();

    // const shouldRenderHeader = user?.name && (user.name || user.avatar);

    // return shouldRenderHeader ? (
    return (
        <AntdLayout.Header
            style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                padding: "0px 24px",
                height: "64px",
                backgroundColor: "#FFF",
            }}
        >
            <Space>
                {user?.name ? (
                    <Text ellipsis strong>
                        {user.name}
                    </Text>
                ) : null}
                {user?.avatar_url ? (
                    <Avatar
                        size="large"
                        icon={<UserOutlined />}
                        src={user?.avatar_url}
                        alt={user?.name}
                    />
                ) : null}

                {user?.name ? (
                    <Button
                        type="primary"
                        danger
                        onClick={() => {
                            mutateLogout();
                        }}
                        icon={<LogoutOutlined />}
                    >
                        Logout
                    </Button>
                ) : null}
            </Space>
        </AntdLayout.Header>
    );
    // ) : null;
};
