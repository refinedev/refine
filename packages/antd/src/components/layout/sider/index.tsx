import React, { ComponentProps, useState } from "react";
import { Layout, Menu, Grid } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import {
    useTranslate,
    useLogout,
    useTitle,
    useIsExistAuthentication,
} from "@pankod/refine-core";

import { Title as DefaultTitle } from "@components";

import { useMenu } from "@hooks";

import { antLayoutSider, antLayoutSiderMobile } from "./styles";

type ItemType = NonNullable<ComponentProps<typeof Menu>["items"]>[number];

export const Sider: React.FC = () => {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const isExistAuthentication = useIsExistAuthentication();
    const { mutate: logout } = useLogout();
    const Title = useTitle();
    const translate = useTranslate();
    const { menuItems, selectedKey, defaultOpenKeys } = useMenu();

    const breakpoint = Grid.useBreakpoint();

    const isMobile = !breakpoint.lg;

    const RenderToTitle = Title ?? DefaultTitle;

    return (
        <Layout.Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(collapsed: boolean): void => setCollapsed(collapsed)}
            collapsedWidth={isMobile ? 0 : 80}
            breakpoint="lg"
            style={isMobile ? antLayoutSiderMobile : antLayoutSider}
        >
            <RenderToTitle collapsed={collapsed} />
            <Menu
                selectedKeys={[selectedKey]}
                defaultOpenKeys={defaultOpenKeys}
                mode="inline"
                onClick={() => {
                    if (!breakpoint.lg) {
                        setCollapsed(true);
                    }
                }}
                items={[
                    ...menuItems,
                    ...(isExistAuthentication
                        ? [
                              {
                                  key: "logout",
                                  label: translate("buttons.logout", "Logout"),
                                  onClick: () => logout(),
                                  icon: <LogoutOutlined />,
                              } as ItemType,
                          ]
                        : []),
                ]}
            />
        </Layout.Sider>
    );
};
