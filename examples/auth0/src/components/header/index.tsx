import { AntdLayout, Button, Avatar, Typography } from "@pankod/refine";
import { useAuth0 } from "@auth0/auth0-react";

export const Header: React.FC = () => {
    const { user, logout } = useAuth0();

    return (
        <AntdLayout.Header
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0px 24px 0px 24px",
                height: "48px",
                backgroundColor: "#FFF",
            }}
        >
            <div>
                <Avatar src={user?.picture} style={{ marginRight: "16px" }} />
                <strong>Welcome, </strong>
                <Typography.Text>{user?.name}</Typography.Text>
            </div>
            <Button type="primary" danger onClick={() => logout()}>
                Logout
            </Button>
        </AntdLayout.Header>
    );
};
