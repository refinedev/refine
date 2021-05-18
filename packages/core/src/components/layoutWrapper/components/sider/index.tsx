/* eslint-disable @typescript-eslint/ban-ts-ignore */
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
import {
    IAuthContext,
    IAdminContext,
    SiderProps,
    IResourceItem,
    IMenuItem,
} from "../../../../interfaces";
import {
    useNavigation,
    useTranslate,
    useResource,
    useWarnAboutChange,
} from "@hooks";

export type useMenu = {
    (): {
        selectedKey: string;
        resources: IResourceItem[];
        menuItems: IMenuItem[];
    };
};

const useMenu: useMenu = () => {
    const { resources } = useResource();
    const { setWarnWhen } = useWarnAboutChange();
    const translate = useTranslate();
    const location = useLocation();
    const { hasDashboard } = useContext<IAdminContext>(AdminContext);

    const selectedResource = resources.find((el) =>
        location.pathname.startsWith(`/resources/${el.route}`),
    );

    setWarnWhen(false);
    const selectedKey = `/resources/${selectedResource?.route ?? ""}`;

    const menuItems: IMenuItem[] = React.useMemo(
        () => [
            ...(hasDashboard
                ? [
                      {
                          name: "Dashboard",
                          icon: <DashboardOutlined />,
                          route: `/`,
                          key: "dashboard",
                          label: translate(
                              "common:resources.dashboard.title",
                              "Dashboard",
                          ),
                      },
                  ]
                : []),
            ...resources.map((resource) => {
                const route = `/resources/${resource.route}`;

                return {
                    ...resource,
                    icon: resource.icon ?? <UnorderedListOutlined />,
                    route: route,
                    key: route,
                    label: translate(
                        `common:resources.${resource.name}.${
                            resource.label ?? humanizeString(resource.name)
                        }`,
                        resource.label ?? humanizeString(resource.name),
                    ),
                };
            }),
        ],
        [resources, hasDashboard],
    );

    return {
        selectedKey,
        resources,
        menuItems,
    };
};

export const Sider: FC<SiderProps> = () => {
    const [collapsed, setCollapsed] = React.useState(false);
    const { logout } = useContext<IAuthContext>(AuthContext);
    const { Title } = useContext<IAdminContext>(AdminContext);
    const { push } = useNavigation();
    const translate = useTranslate();
    const { menuItems, selectedKey } = useMenu();

    const onLogout: MenuClickEventHandler = ({ key }) => {
        if (key === "logout") {
            logout().then(() => push("/login"));
        }
    };

    return (
        <Layout.Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(collapsed: boolean): void => setCollapsed(collapsed)}
        >
            <Title collapsed={collapsed} />
            <Menu
                theme="dark"
                defaultSelectedKeys={["dashboard"]}
                selectedKeys={[selectedKey]}
                mode="inline"
                onClick={onLogout}
            >
                {menuItems.map(({ icon, route, label }) => (
                    <Menu.Item key={route} icon={icon}>
                        <Link to={route}>{label}</Link>
                    </Menu.Item>
                ))}

                <Menu.Item key="logout" icon={<LogoutOutlined />}>
                    {translate("common:buttons.logout", "Logout")}
                </Menu.Item>
            </Menu>
        </Layout.Sider>
    );
};
