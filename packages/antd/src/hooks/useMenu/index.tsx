import React, { ComponentProps, useEffect } from "react";
import { Menu } from "antd";
import {
    ITreeMenu,
    useCanWithoutCache,
    useMenu as useMenuCore,
    useRouterContext,
} from "@pankod/refine-core";
import { UnorderedListOutlined } from "@ant-design/icons";

type ItemType = NonNullable<ComponentProps<typeof Menu>["items"]>[number];

type useMenuReturnType = {
    defaultOpenKeys: string[];
    selectedKey: string;
    menuItems: ItemType[];
};

type useMenuConfigType = {
    collapsed?: boolean;
    handleSubMenuItem?: (context: {
        item: ITreeMenu;
        children: (ItemType | undefined)[];
    }) => ItemType | undefined;
    handleMenuItem?: (context: {
        item: ITreeMenu;
        collapsed: boolean;
        Link: React.FC<any>;
        selectedKey?: string;
    }) => ItemType | undefined;
    DefaultSubMenuIcon?: React.ComponentType;
    DefaultItemIcon?: React.ComponentType;
};

const defaultUseMenuConfig: useMenuConfigType = {
    collapsed: false,
    handleSubMenuItem: ({ item, children }) => {
        if (children.length > 0) {
            return {
                key: item.name,
                label: item.label,
                icon: item.icon ?? <UnorderedListOutlined />,
                title: item.label,
                children: children,
            } as ItemType;
        }

        return undefined;
    },
    handleMenuItem: ({ item, ...context }) => {
        const isSelected = item.route === context.selectedKey;
        const isRoute = !(
            item.parentName !== undefined && item.children.length === 0
        );

        const LabelWrapper = item.route
            ? context.Link
            : (React.Fragment as typeof context.Link);
        return {
            key: item.name,
            label: (
                <LabelWrapper href={item.route} to={item.route}>
                    {item.label}
                    {!context.collapsed && isSelected && (
                        <div className="ant-menu-tree-arrow" />
                    )}
                </LabelWrapper>
            ),
            icon: item.icon ?? (isRoute && <UnorderedListOutlined />),
            style: isSelected ? { fontWeight: "bold" } : undefined,
        } as ItemType;
    },
    DefaultSubMenuIcon: UnorderedListOutlined,
    DefaultItemIcon: UnorderedListOutlined,
};

/**
 * `useMenu` is used to get menu items of the default sidebar.
 * These items include a link to dashboard page (if it exists) and links to the user defined resources
 * (passed as children to {@link https://refine.dev/docs/core/components/refine-config `<Refine>`}).
 * This hook can also be used to build custom menus, which is also used by default sidebar to show menu items.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/hooks/resource/useMenu} for more details.
 */
export const useMenu: (config?: useMenuConfigType) => useMenuReturnType = ({
    collapsed,
    handleMenuItem,
    handleSubMenuItem,
    DefaultSubMenuIcon,
    DefaultItemIcon,
} = defaultUseMenuConfig) => {
    const { defaultOpenKeys, menuItems, selectedKey } = useMenuCore();
    const { Link } = useRouterContext();
    const { can: checkCanAccess } = useCanWithoutCache();
    const [renderedMenuItems, setRenderedMenuItems] = React.useState<
        Array<ItemType>
    >([]);

    const handleTreeMenuItem = React.useCallback(
        async (
            item: ITreeMenu,
            selectedKey?: string,
        ): Promise<ItemType | undefined> => {
            if (item.children?.length > 0) {
                const handledChildren = await Promise.all(
                    item.children.map((child) =>
                        handleTreeMenuItem(child, selectedKey),
                    ),
                );
                // is sub
                return handleSubMenuItem?.({ item, children: handledChildren });
            } else {
                const { can: hasAccess } = checkCanAccess
                    ? await checkCanAccess({
                          resource: item.name,
                          action: "list",
                      })
                    : { can: true };
                // is leaf
                if (hasAccess) {
                    return handleMenuItem?.({
                        item,
                        collapsed: Boolean(collapsed),
                        Link,
                        selectedKey,
                    });
                }
                return undefined;
            }
        },
        [
            collapsed,
            checkCanAccess,
            handleMenuItem,
            handleSubMenuItem,
            DefaultItemIcon,
            DefaultSubMenuIcon,
        ],
    );

    const renderTree = React.useCallback(
        async (items: ITreeMenu[], selected: string) => {
            const promises = items.map((item) =>
                handleTreeMenuItem(item, selected),
            );
            setRenderedMenuItems(
                (await Promise.all(promises)).filter(Boolean) as ItemType[],
            );
        },
        [handleTreeMenuItem],
    );

    useEffect(() => {
        renderTree(menuItems, selectedKey);
    }, [renderTree, menuItems, selectedKey]);

    const values = React.useMemo(() => {
        return {
            defaultOpenKeys,
            selectedKey,
            menuItems: renderedMenuItems,
        };
    }, [defaultOpenKeys, selectedKey, renderedMenuItems]);

    return values;
};
