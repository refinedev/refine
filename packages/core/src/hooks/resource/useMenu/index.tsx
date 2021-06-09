import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import humanizeString from "humanize-string";
import { AdminContext } from "@contexts/admin";
import { DashboardOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { IAdminContext, IResourceItem, IMenuItem } from "../../../interfaces";
import { useTranslate, useResource } from "@hooks";

type useMenuReturnType = {
    selectedKey: string;
    resources: IResourceItem[];
    menuItems: IMenuItem[];
};

export const useMenu: () => useMenuReturnType = () => {
    const { resources } = useResource();
    const translate = useTranslate();
    const location = useLocation();
    const { hasDashboard } = useContext<IAdminContext>(AdminContext);

    const selectedResource = resources.find((el) =>
        location.pathname.startsWith(`/resources/${el.route}`),
    );

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
                    label: translate(
                        `${resource.name}.${resource.name}`,
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
