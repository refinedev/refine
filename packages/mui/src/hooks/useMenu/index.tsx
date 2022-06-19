import React from "react";

import { useMenu as useMenuCore, ITreeMenu } from "@pankod/refine-core";

type useMenuReturnType = {
    defaultOpenKeys: Record<string, boolean>;
    selectedKey: string;
    menuItems: ITreeMenu[];
};

/**
 * `useMenu` is used to get menu items of the default sidebar.
 * These items include a link to dashboard page (if it exists) and links to the user defined resources
 * (passed as children to {@link https://refine.dev/docs/core/components/refine-config `<Refine>`}).
 * This hook can also be used to build custom menus, which is also used by default sidebar to show menu items.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/mui/hooks/useMenu} for more details.
 * @deprecated use {@link https://refine.dev/docs/core/hooks/ui/useMenu} instead.
 */
export const useMenu: () => useMenuReturnType = () => {
    const { selectedKey, menuItems } = useMenuCore();

    const defaultOpenKeys = React.useMemo(() => {
        const keys = selectedKey.split("/").filter((x) => x !== "");

        let _defaultOpenKeys: Record<string, boolean> = {};
        let key = "";

        for (let index = 0; index < keys.length - 1; index++) {
            if (keys[index] !== "undefined") {
                key = key + `/${keys[index]}`;
            }

            _defaultOpenKeys = {
                ..._defaultOpenKeys,
                [key]: !_defaultOpenKeys[key],
            };
        }

        return _defaultOpenKeys;
    }, []);

    return {
        selectedKey,
        defaultOpenKeys,
        menuItems,
    };
};
