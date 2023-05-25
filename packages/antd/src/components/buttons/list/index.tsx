import React from "react";
import { Button } from "antd";
import { BarsOutlined } from "@ant-design/icons";
import {
    useCan,
    useNavigation,
    useTranslate,
    userFriendlyResourceName,
    useResource,
    useRouterContext,
    useRouterType,
    useLink,
    pickNotDeprecated,
} from "@refinedev/core";
import {
    RefineButtonClassNames,
    RefineButtonTestIds,
} from "@refinedev/ui-types";

import { ListButtonProps } from "../types";

/**
 * `<ListButton>` is using Ant Design's {@link https://ant.design/components/button/ `<Button>`} component.
 * It uses the  {@link https://refine.dev/docs/core/hooks/navigation/useNavigation#list `list`} method from {@link https://refine.dev/docs/core/hooks/navigation/useNavigation `useNavigation`} under the hood.
 * It can be useful when redirecting the app to the list page route of resource}.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/buttons/list-button} for more details.
 */
export const ListButton: React.FC<ListButtonProps> = ({
    resource: resourceNameFromProps,
    resourceNameOrRouteName: propResourceNameOrRouteName,
    hideText = false,
    accessControl,
    meta,
    children,
    onClick,
    ...rest
}) => {
    const accessControlEnabled = accessControl?.enabled ?? true;
    const hideIfUnauthorized = accessControl?.hideIfUnauthorized ?? false;
    const { listUrl: generateListUrl } = useNavigation();
    const routerType = useRouterType();
    const Link = useLink();
    const { Link: LegacyLink } = useRouterContext();

    const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

    const translate = useTranslate();

    const { resource } = useResource(
        resourceNameFromProps ?? propResourceNameOrRouteName,
    );

    const { data } = useCan({
        resource: resource?.name,
        action: "list",
        queryOptions: {
            enabled: accessControlEnabled,
        },
        params: {
            resource,
        },
    });

    const createButtonDisabledTitle = () => {
        if (data?.can) return "";
        else if (data?.reason) return data.reason;
        else
            return translate(
                "buttons.notAccessTitle",
                "You don't have permission to access",
            );
    };

    const listUrl = resource ? generateListUrl(resource, meta) : "";

    if (accessControlEnabled && hideIfUnauthorized && !data?.can) {
        return null;
    }

    return (
        <ActiveLink
            to={listUrl}
            replace={false}
            onClick={(e: React.PointerEvent<HTMLButtonElement>) => {
                if (data?.can === false) {
                    e.preventDefault();
                    return;
                }
                if (onClick) {
                    e.preventDefault();
                    onClick(e);
                }
            }}
        >
            <Button
                icon={<BarsOutlined />}
                disabled={data?.can === false}
                title={createButtonDisabledTitle()}
                data-testid={RefineButtonTestIds.ListButton}
                className={RefineButtonClassNames.ListButton}
                {...rest}
            >
                {!hideText &&
                    (children ??
                        translate(
                            `${
                                resource?.name ??
                                resourceNameFromProps ??
                                propResourceNameOrRouteName
                            }.titles.list`,
                            userFriendlyResourceName(
                                resource?.meta?.label ??
                                    resource?.label ??
                                    resource?.name ??
                                    pickNotDeprecated(
                                        resourceNameFromProps,
                                        propResourceNameOrRouteName,
                                    ),
                                "plural",
                            ),
                        ))}
            </Button>
        </ActiveLink>
    );
};
