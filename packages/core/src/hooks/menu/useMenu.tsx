import React from "react";
import { useTranslate, useResource, useParsed, useRouterContext } from "..";
import { userFriendlyResourceName, pickNotDeprecated } from "@definitions";
import { useRouterType } from "../../contexts/router-picker";
import { createResourceKey } from "../../definitions/helpers/menu/create-resource-key";
import { useGetToPath } from "../router/use-get-to-path/index";
import { getParentResource } from "@definitions/helpers/router";
import {
    FlatTreeItem,
    createTree,
} from "@definitions/helpers/menu/create-tree";

type UseMenuReturnType = {
    defaultOpenKeys: string[];
    selectedKey: string;
    menuItems: TreeMenuItem[];
};

export type UseMenuProps = {
    meta?: Record<string, any>;
    hideOnMissingParameter?: boolean;
};

export type TreeMenuItem = FlatTreeItem & {
    route?: string;
    icon?: React.ReactNode;
    label?: string;
    children: TreeMenuItem[];
};

const getCleanPath = (pathname: string) => {
    return pathname
        .split("?")[0]
        .split("#")[0]
        .replace(/(.+)(\/$)/, "$1");
};

/**
 * `useMenu` is used to get menu items of the default sidebar.
 * These items include a link to dashboard page (if it exists) and links to the user defined resources
 * (passed as children to {@link https://refine.dev/docs/core/components/refine-config `<Refine>`}).
 * This hook can also be used to build custom menus, which is also used by default sidebar to show menu items.
 *
 * @see {@link https://refine.dev/docs/core/hooks/ui/useMenu} for more details.
 */
export const useMenu = (
    { meta, hideOnMissingParameter }: UseMenuProps = {
        hideOnMissingParameter: true,
    },
): UseMenuReturnType => {
    const translate = useTranslate();

    const getToPath = useGetToPath();
    const routerType = useRouterType();
    const { resource, resources } = useResource();
    const { pathname } = useParsed();
    const { useLocation } = useRouterContext();
    const { pathname: legacyPath } = useLocation();

    const cleanPathname =
        routerType === "legacy"
            ? getCleanPath(legacyPath)
            : pathname
            ? getCleanPath(pathname)
            : undefined;

    const cleanRoute = `/${(cleanPathname ?? "").replace(/^\//, "")}`;

    const selectedKey = resource
        ? createResourceKey(resource, resources, routerType === "legacy")
        : cleanRoute ?? "";

    const defaultOpenKeys = React.useMemo(() => {
        if (!resource) return [];
        let parent = getParentResource(resource, resources);
        const keys = [createResourceKey(resource, resources)];
        while (parent) {
            keys.push(createResourceKey(parent, resources));
            parent = getParentResource(parent, resources);
        }
        return keys;
    }, []);

    const prepareItem = React.useCallback(
        (item: FlatTreeItem): TreeMenuItem | undefined => {
            if (item?.meta?.hide ?? item?.options?.hide) return undefined;
            if (!item?.list && item.children.length === 0) return undefined;

            const composed = item.list
                ? getToPath({
                      resource: item,
                      action: "list",
                      legacy: routerType === "legacy",
                      meta,
                  })
                : undefined;

            if (
                hideOnMissingParameter &&
                composed &&
                composed.match(/(\/|^):(.+?)(\/|$){1}/)
            )
                return undefined;

            return {
                ...item,
                route: composed,
                icon: pickNotDeprecated(
                    item.meta?.icon,
                    item.options?.icon,
                    item.icon,
                ),
                label:
                    pickNotDeprecated(
                        item?.meta?.label,
                        item?.options?.label,
                    ) ??
                    translate(
                        `${item.name}.${item.name}`,
                        userFriendlyResourceName(item.name, "plural"),
                    ),
            };
        },
        [routerType, meta, translate, hideOnMissingParameter],
    );

    const treeItems = React.useMemo(() => {
        const treeMenuItems = createTree(resources, routerType === "legacy");

        // add paths to items and their nodes recursively
        const prepare = (items: TreeMenuItem[]): TreeMenuItem[] => {
            return items.flatMap((item) => {
                const preparedNodes = prepare(item.children);
                const newItem = prepareItem({
                    ...item,
                    children: preparedNodes,
                });

                if (!newItem) return [];

                return [newItem];
            });
        };

        return prepare(treeMenuItems);
    }, [resources, routerType, prepareItem]);

    return {
        defaultOpenKeys,
        selectedKey,
        menuItems: treeItems,
    };
};
