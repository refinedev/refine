import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { DashboardOutlined, UnorderedListOutlined } from "@ant-design/icons";

import { RefineContext } from "@contexts/refine";
import { IRefineContext, IMenuItem } from "../../../interfaces";
import { useTranslate, useResource } from "@hooks";
import { userFriendlyResourceName } from "@definitions";

type useMenuReturnType = {
    selectedKey: string;
    menuItems: IMenuItem[];
};

/**
 * `useMenu` is used to get menu items of the default sidebar.
 * These items include a link to dashboard page (if it exists) and links to the user defined resources
 * (passed as children to {@link https://refine.dev/docs/api-references/components/refine-config `<Refine>`}).
 * This hook can also be used to build custom menus, which is also used by default sidebar to show menu items.
 *
 * @see {@link https://refine.dev/docs/api-references/hooks/resource/useMenu} for more details.
 */
export const useMenu: () => useMenuReturnType = () => {
    const { resources } = useResource();
    const translate = useTranslate();
    const location = useLocation();
    const { hasDashboard } = useContext<IRefineContext>(RefineContext);

    const selectedResource = resources.find((el) =>
        location.pathname.startsWith(`/${el.route}`),
    );

    let selectedKey: string;
    if (selectedResource?.route) {
        selectedKey = `/${selectedResource?.route}`;
    } else if (location.pathname === "/") {
        selectedKey = "/";
    } else {
        selectedKey = "notfound";
    }

    const menuItems: IMenuItem[] = React.useMemo(
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
                    icon: resource.icon ?? <UnorderedListOutlined />,
                    route: route,
                    key: route,
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

    return {
        selectedKey,
        menuItems,
    };
};
