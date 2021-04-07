import React, { ReactNode, useContext, useEffect } from "react";
import { Layout as AntLayout, Menu, Button } from "antd";
import {
    DashboardOutlined,
    LogoutOutlined,
    UnorderedListOutlined,
} from "@ant-design/icons";
import { MenuClickEventHandler } from "rc-menu/lib/interface";
import { Link, Prompt, useLocation } from "react-router-dom";
import humanizeString from "humanize-string";

import { AuthContext } from "@contexts/auth";
import { IAuthContext, IComponentsContext } from "../../interfaces";
import {
    useNavigation,
    useResource,
    useSetLocale,
    useTranslate,
    useWarnAboutChange,
} from "@hooks";
import { ComponentsContext } from "@contexts/components";
import { AdminContext } from "@contexts/admin/";
import { IAdminContext } from "@contexts/admin/IAdminContext";

export interface LayoutProps {
    dashboard?: React.FC;
}

export const Layout: React.FC<LayoutProps> = ({ children, dashboard }) => {
    const [collapsed, setCollapsed] = React.useState(false);

    const { push } = useNavigation();
    const { logout } = useContext<IAuthContext>(AuthContext);
    const { components } = useContext<IComponentsContext>(ComponentsContext);
    const { title } = useContext<IAdminContext>(AdminContext);
    const { resources } = useResource();

    const location = useLocation();

    const setLocale = useSetLocale();
    const translate = useTranslate();

    const { warnWhen, setWarnWhen } = useWarnAboutChange();

    const selectedKey = React.useMemo(() => {
        const selectedResource = resources.find((el) =>
            location.pathname.startsWith(`/resources/${el.route}`),
        );

        setWarnWhen(false);
        return `/resources/${selectedResource?.route ?? ""}`;
    }, [location]);

    const menuOnClick: MenuClickEventHandler = ({ key }) => {
        if (key === "logout") {
            logout({}).then(() => push("/login"));
        }
    };

    const warnWhenListener = (e: {
        preventDefault: () => void;
        returnValue: string;
    }) => {
        e.preventDefault();

        e.returnValue = translate(
            "common:warnWhenUnsavedChanges",
            "Are you sure you want to leave? You have with unsaved changes.",
        );

        return e.returnValue;
    };

    if (warnWhen) {
        window.addEventListener("beforeunload", warnWhenListener);
    }

    useEffect(() => {
        return window.removeEventListener("beforeunload", warnWhenListener);
    }, []);

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
                    {components}
                </AntLayout.Content>
            </AntLayout>
            <Prompt
                when={warnWhen}
                message={translate(
                    "common:warnWhenUnsavedChanges",
                    "Are you sure you want to leave? You have with unsaved changes.",
                )}
            />
        </AntLayout>
    );
};
