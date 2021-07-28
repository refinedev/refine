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

export const useMenu: () => useMenuReturnType = () => {
    const { resources } = useResource();
    const translate = useTranslate();
    const location = useLocation();
    const { hasDashboard } = useContext<IRefineContext>(RefineContext);

    const selectedResource = resources.find((el) =>
        location.pathname.startsWith(`/resources/${el.route}`),
    );

    let selectedKey: string;
    if (selectedResource?.route) {
        selectedKey = `/resources/${selectedResource?.route}`;
    } else if (location.pathname === "/") {
        selectedKey = "dashboard";
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
                const route = `/resources/${resource.route}`;

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
