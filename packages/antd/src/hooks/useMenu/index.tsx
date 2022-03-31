import React from "react";
import { DashboardOutlined } from "@ant-design/icons";
import {
    useRefineContext,
    useTranslate,
    useResource,
    useRouterContext,
    userFriendlyResourceName,
    createTreeView,
    ITreeMenu,
} from "@pankod/refine-core";
import { IMenuItem } from "../../interfaces";

type useMenuReturnType = {
    defaultOpenKeys: string[];
    selectedKey: string;
    menuItems: ITreeMenu[];
};

/**
 * `useMenu` is used to get menu items of the default sidebar.
 * These items include a link to dashboard page (if it exists) and links to the user defined resources
 * (passed as children to {@link https://refine.dev/docs/core/components/refine-config `<Refine>`}).
 * This hook can also be used to build custom menus, which is also used by default sidebar to show menu items.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/hooks/resource/useMenu} for more details.
 */
export const useMenu: () => useMenuReturnType = () => {
    const { resources } = useResource();
    const translate = useTranslate();

    const { useLocation, useParams } = useRouterContext();
    const location = useLocation();
    const params = useParams<{ resource: string }>();

    const { hasDashboard } = useRefineContext();

    let selectedResource = resources.find(
        (el) => location?.pathname === `/${el.route}`,
    );

    // for no ssr
    if (!selectedResource) {
        selectedResource = resources.find(
            (el) => params?.resource === (el.route as string),
        );
    }

    let selectedKey: string;
    if (selectedResource?.route) {
        selectedKey = `/${selectedResource?.route}`;
    } else if (location.pathname === "/") {
        selectedKey = "/";
    } else {
        selectedKey = location?.pathname;
    }

    const treeMenuItems: IMenuItem[] = React.useMemo(
        () => [
            ...(hasDashboard
                ? [
                      {
                          name: "Dashboard",
                          icon: <DashboardOutlined />,
                          route: `/`,
                          key: "dashboard",
                          label: translate("dashboard.title", "Dashboard"),
                      },
                  ]
                : []),
            ...resources.map((resource) => {
                const route = `/${resource.route}`;

                return {
                    ...resource,
                    icon: resource.icon,
                    route: route,
                    key: resource.key ?? route,
                    label:
                        resource.label ??
                        translate(
                            `${resource.name}.${resource.name}`,
                            userFriendlyResourceName(resource.name, "plural"),
                        ),
                };
            }),
        ],
        [resources, hasDashboard],
    );
    const menuItems: ITreeMenu[] = createTreeView(treeMenuItems);

    const defaultOpenKeys = selectedKey.split("/").filter((x) => x !== "");
    return {
        selectedKey,
        defaultOpenKeys,
        menuItems,
    };
};
