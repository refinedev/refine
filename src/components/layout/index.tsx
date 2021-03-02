import React, { ReactNode, useContext } from "react";
import { Layout as AntLayout, Menu, Button } from "antd";
import {
    DashboardOutlined,
    LogoutOutlined,
    UnorderedListOutlined,
} from "@ant-design/icons";
import { MenuClickEventHandler } from "rc-menu/lib/interface";
import { Link, useHistory, useLocation } from "react-router-dom";
import humanizeString from "humanize-string";

import { AuthContext } from "@contexts/auth";
import { IAuthContext } from "@interfaces";
import { useGetLocale, useResource, useSetLocale, useTranslate } from "@hooks";

export interface LayoutProps {
    title?: ReactNode;
    dashboard?: React.FC;
}

export const ReadminLayout: React.FC<LayoutProps> = ({
    children,
    title,
    dashboard,
}) => {
    const [collapsed, setCollapsed] = React.useState(false);

    const history = useHistory();
    const { logout } = useContext<IAuthContext>(AuthContext);
    const { resources } = useResource();

    const location = useLocation();

    const setLocale = useSetLocale();
    const translate = useTranslate();
    const getLocale = useGetLocale();

    const selectedKey = React.useMemo(() => {
        const selectedResource = resources.find((el) =>
            location.pathname.startsWith(`/resources/${el.name}`),
        );
        return `/resources/${selectedResource ?? ""}`;
    }, [location]);

    const menuOnClick: MenuClickEventHandler = ({ key }) => {
        if (key === "logout") {
            logout({}).then(() => history.push("/login"));
        }
    };

    return (
        <AntLayout style={{ minHeight: "100vh" }}>
            <AntLayout.Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(collapsed: boolean): void =>
                    setCollapsed(collapsed)
                }
            >
                <div
                    style={{
                        color: "#FFF",
                        fontSize: 16,
                        textAlign: "center",
                        height: 60,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {title ?? "Readmin"}
                </div>
                <Menu
                    onClick={menuOnClick}
                    theme="dark"
                    defaultSelectedKeys={["dashboard"]}
                    selectedKeys={[selectedKey]}
                    mode="inline"
                >
                    {dashboard && (
                        <Menu.Item
                            key={`dashboard`}
                            icon={<DashboardOutlined />}
                        >
                            <Link to={`/`}>Dashboard</Link>
                        </Menu.Item>
                    )}

                    {resources.map((item) => (
                        <Menu.Item
                            key={`/resources/${item.name}`}
                            icon={item.icon ?? <UnorderedListOutlined />}
                        >
                            <Link to={`/resources/${item.name}`}>
                                {translate(
                                    `common:resources.${item.name}.${
                                        item.label ?? humanizeString(item.name)
                                    }`,
                                    item.label ?? humanizeString(item.name),
                                )}
                            </Link>
                        </Menu.Item>
                    ))}

                    <Menu.Item key="logout" icon={<LogoutOutlined />}>
                        {translate("common:buttons.logout", "Logout")}
                    </Menu.Item>
                </Menu>
            </AntLayout.Sider>
            <AntLayout className="site-layout">
                <AntLayout.Header
                    style={{ padding: 0, backgroundColor: "#FFF" }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            height: "100%",
                            alignItems: "center",
                            padding: "24px",
                        }}
                    >
                        <Button size="middle" onClick={() => setLocale("en")}>
                            EN
                        </Button>
                        <Button size="middle" onClick={() => setLocale("tr")}>
                            TR
                        </Button>
                    </div>
                </AntLayout.Header>

                <AntLayout.Content>
                    <div style={{ padding: 24, minHeight: 360 }}>
                        {children}
                    </div>
                </AntLayout.Content>
            </AntLayout>
        </AntLayout>
    );
};
