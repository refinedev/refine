import { useGetIdentity } from "@refinedev/core";
import { Layout as AntdLayout, Avatar, Space, Switch, Typography } from "antd";
import { useContext } from "react";
import { ColorModeContext } from "../../contexts/color-mode";

const { Text } = Typography;

type IUser = {
    id: number;
    name: string;
    avatar: string;
};

export const Header: React.FC = () => {
    const { data: user } = useGetIdentity<IUser>();
    const { mode, setMode } = useContext(ColorModeContext);

    return (
        <AntdLayout.Header
            style={{
                display: "flex",
                justifyContent: "flex-end",

                alignItems: "center",
                padding: "0px 24px",
                height: "64px",
            }}
        >
            <Space>
                <Switch
                    checkedChildren="🌛"
                    unCheckedChildren="🔆"
                    onChange={() =>
                        setMode(mode === "light" ? "dark" : "light")
                    }
                    defaultChecked={mode === "dark"}
                />
                <Space style={{ marginLeft: "8px" }}>
                    {user?.name && (
                        <Text style={{ color: "white" }} strong>
                            {user.name}
                        </Text>
                    )}
                    {user?.avatar && (
                        <Avatar src={user?.avatar} alt={user?.name} />
                    )}
                </Space>
            </Space>
        </AntdLayout.Header>
    );
};
