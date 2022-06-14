import React, { ComponentProps, useEffect, useState } from "react";
import { Layout, Menu, Grid } from "antd";
import { LogoutOutlined, UnorderedListOutlined } from "@ant-design/icons";
import {
    useTranslate,
    useLogout,
    useTitle,
    ITreeMenu,
    useIsExistAuthentication,
    useNavigation,
    useCanWithoutCache,
} from "@pankod/refine-core";

import { Title as DefaultTitle } from "@components";

import { useMenu } from "@hooks";

import { antLayoutSider, antLayoutSiderMobile } from "./styles";

type ItemType = NonNullable<ComponentProps<typeof Menu>["items"]>[number];

export const Sider: React.FC = () => {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const isExistAuthentication = useIsExistAuthentication();
    const { push } = useNavigation();
    const { mutate: logout } = useLogout();
    const Title = useTitle();
    const translate = useTranslate();
    const { menuItems, selectedKey, defaultOpenKeys } = useMenu();
    const breakpoint = Grid.useBreakpoint();
    const { can: checkCan } = useCanWithoutCache();
    const [renderedItems, setRenderedItems] = React.useState<Array<ItemType>>(
        [],
    );

    const isMobile = !breakpoint.lg;

    const RenderToTitle = Title ?? DefaultTitle;

    const handleMenuItem = async (
        item: ITreeMenu,
        selectedKey?: string,
    ): Promise<ItemType | undefined> => {
        if (item.children?.length > 0) {
            const handledChildren = await Promise.all(
                item.children.map((child) =>
                    handleMenuItem(child, selectedKey),
                ),
            );
            // is sub
            if (handledChildren.length > 0) {
                return {
                    key: item.name,
                    label: item.label,
                    icon: item.icon ?? <UnorderedListOutlined />,
                    title: item.label,
                    children: handledChildren,
                } as ItemType;
            }

            return undefined;
        } else {
            const isSelected = item.route === selectedKey;
            const isRoute = !(
                item.parentName !== undefined && item.children.length === 0
            );

            const { can: hasAccess } = checkCan
                ? await checkCan({
                      resource: item.name,
                      action: "list",
                  })
                : { can: true };
            // is leaf
            if (hasAccess) {
                return {
                    key: item.name,
                    label: (
                        <>
                            {item.label}{" "}
                            {!collapsed && isSelected && (
                                <div className="ant-menu-tree-arrow" />
                            )}
                        </>
                    ),
                    icon: item.icon ?? (isRoute && <UnorderedListOutlined />),
                    route: item.route,
                    onClick: () => push(item.route ?? "/"),
                    style: isSelected ? { fontWeight: "bold" } : undefined,
                } as ItemType;
            }
            return undefined;
        }
    };

    const renderTree = React.useCallback(
        async (items: ITreeMenu[], selected: string) => {
            const promises = items.map((item) =>
                handleMenuItem(item, selected),
            );
            setRenderedItems(
                (await Promise.all(promises)).filter(
                    (el) => typeof el !== "undefined",
                ) as ItemType[],
            );
        },
        [],
    );

    useEffect(() => {
        renderTree(menuItems, selectedKey);
    }, [menuItems, selectedKey]);

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
                    ...renderedItems,
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
