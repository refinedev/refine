import React, { FC, useContext } from "react";
import { Layout, Menu } from "antd";
import {
    DashboardOutlined,
    LogoutOutlined,
    UnorderedListOutlined,
} from "@ant-design/icons";
import { MenuClickEventHandler } from "rc-menu/lib/interface";
import { Link, useLocation } from "react-router-dom";
import humanizeString from "humanize-string";

import { AuthContext } from "@contexts/auth";
import { AdminContext } from "@contexts/admin";
import { IAuthContext, IAdminContext } from "../../../../interfaces";
import {
    useNavigation,
    useTranslate,
    useResource,
    useWarnAboutChange,
} from "@hooks";

export type SiderProps = {
    dashboard?: boolean;
};

export const Sider: FC<SiderProps> = ({ dashboard }) => {
    const [collapsed, setCollapsed] = React.useState(false);
    const { push } = useNavigation();
    const { logout } = useContext<IAuthContext>(AuthContext);
    const translate = useTranslate();
    const { resources } = useResource();
    const location = useLocation();
    const { setWarnWhen } = useWarnAboutChange();

    const { Title } = useContext<IAdminContext>(AdminContext);

    const menuOnClick: MenuClickEventHandler = ({ key }) => {
        if (key === "logout") {
            logout({}).then(() => push("/login"));
        }
    };

    const selectedKey = React.useMemo(() => {
        const selectedResource = resources.find((el) =>
            location.pathname.startsWith(`/resources/${el.route}`),
        );

        setWarnWhen(false);
        return `/resources/${selectedResource?.route ?? ""}`;
    }, [location]);

    return (
        <Layout.Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(collapsed: boolean): void => setCollapsed(collapsed)}
        >
            {Title && (
                <Link
                    to={`/`}
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
                    <Title collapsed={collapsed} />
                </Link>
            )}
            <Menu
                onClick={menuOnClick}
                theme="dark"
                defaultSelectedKeys={["dashboard"]}
                selectedKeys={[selectedKey]}
                mode="inline"
            >
                {dashboard && (
                    <Menu.Item key={`dashboard`} icon={<DashboardOutlined />}>
                        <Link to={`/`}>
                            {translate(
                                "common:resources.dashboard.title",
                                "Dashboard",
                            )}
                        </Link>
                    </Menu.Item>
                )}

                {resources.map((item) => (
                    <Menu.Item
                        key={`/resources/${item.route}`}
                        icon={item.icon ?? <UnorderedListOutlined />}
                    >
                        <Link to={`/resources/${item.route}`}>
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
        </Layout.Sider>
    );
};
