import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import humanizeString from "humanize-string";
import { AdminContext } from "@contexts/admin";
import { DashboardOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { IAdminContext, IResourceItem, IMenuItem } from "../../../interfaces";
import {
    useTranslate,
    useResource,
    useWarnAboutChange,
    usePermissions,
    useAllowSideBarResources,
} from "@hooks";

type useMenuReturnType = {
    selectedKey: string;
    resources: IResourceItem[];
    allowSideBarResources: IResourceItem[];
    menuItems?: IMenuItem[];
};

export const useMenu: () => useMenuReturnType = () => {
    const { resources } = useResource();
    const { allowSideBarResources } = useAllowSideBarResources();
    const { data: permissionsData } = usePermissions();

    const { setWarnWhen } = useWarnAboutChange();
    const translate = useTranslate();
    const location = useLocation();
    const { hasDashboard } = useContext<IAdminContext>(AdminContext);

    const selectedResource = resources.find((el) =>
        location.pathname.startsWith(`/resources/${el.route}`),
    );

    setWarnWhen(false); // TODO move!! to RouteChangeHandlerComponent.
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
            ...(allowSideBarResources &&
                allowSideBarResources.map((resource) => {
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
                })),
        ],
        [allowSideBarResources, hasDashboard, permissionsData],
    );

    return {
        selectedKey,
        resources,
        allowSideBarResources,
        menuItems,
    };
};
