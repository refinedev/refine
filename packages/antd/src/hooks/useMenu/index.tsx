import React from "react";
import {
    useMenu as useMenuCore,
    ITreeMenu,
    useRefineContext,
    useTranslate,
} from "@pankod/refine-core";
import { DashboardOutlined } from "@ant-design/icons";

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
 * @deprecated use {@link https://refine.dev/docs/core/hooks/ui/useMenu} instead.
 */
export const useMenu: () => useMenuReturnType = () => {
    const values = useMenuCore();
    const translate = useTranslate();
    const { hasDashboard } = useRefineContext();

    const menuValues = React.useMemo(() => {
        return {
            ...values,
            menuItems: [
                ...(hasDashboard
                    ? [
                          {
                              name: "Dashboard",
                              icon: <DashboardOutlined />,
                              route: `/`,
                              key: "dashboard",
                              label: translate("dashboard.title", "Dashboard"),
                              children: [],
                          },
                      ]
                    : []),
                ...values.menuItems,
            ],
            defaultOpenKeys: values.selectedKey
                .split("/")
                .filter((x) => x !== ""),
        };
    }, [values]);

    return menuValues;
};
