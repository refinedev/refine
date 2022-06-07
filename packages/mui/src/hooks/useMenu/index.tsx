import React from "react";

import {
    useRefineContext,
    useTranslate,
    useResource,
    useRouterContext,
    userFriendlyResourceName,
    createTreeView,
    ITreeMenu,
} from "@pankod/refine-core";

type useMenuReturnType = {
    defaultOpenKeys: string[];
    selectedKey: string;
    menuItems: ITreeMenu[];
};

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

    const treeMenuItems: any[] = React.useMemo(
        () => [
            ...(hasDashboard
                ? [
                      {
                          name: "Dashboard",
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

    const keys = selectedKey.split("/").filter((x) => x !== "");

    let defaultOpenKeys: any = {};
    let key = "";

    for (let index = 0; index < keys.length - 1; index++) {
        if (keys[index] !== "undefined") {
            key = key + `/${keys[index]}`;
        }

        defaultOpenKeys = {
            ...defaultOpenKeys,
            [key]: !defaultOpenKeys[key],
        };
    }
    return {
        selectedKey,
        defaultOpenKeys,
        menuItems,
    };
};
