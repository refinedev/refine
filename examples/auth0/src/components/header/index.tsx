import { AntdLayout, Avatar, Typography, useGetIdentity } from "@pankod/refine";
import { User } from "@auth0/auth0-react";

export const Header: React.FC = () => {
    const { data: user } = useGetIdentity<User>();

    return (
        <AntdLayout.Header
            style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                padding: "0px 24px 0px 24px",
                height: "48px",
                backgroundColor: "#FFF",
            }}
        >
            <Typography.Text strong>{user?.name}</Typography.Text>
            <Avatar src={user?.picture} style={{ marginLeft: "16px" }} />
        </AntdLayout.Header>
    );
};
