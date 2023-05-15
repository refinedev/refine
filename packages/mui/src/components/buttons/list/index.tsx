import React from "react";
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
import { Button } from "@mui/material";
import { ListOutlined } from "@mui/icons-material";

import { ListButtonProps } from "../types";

/**
 * `<ListButton>` is using uses Material UI {@link https://mui.com/components/buttons/ `<Button>`} component.
 * It uses the  {@link https://refine.dev/docs/core/hooks/navigation/useNavigation#list `list`} method from {@link https://refine.dev/docs/core/hooks/navigation/useNavigation `useNavigation`} under the hood.
 * It can be useful when redirecting the app to the list page route of resource}.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/mui/components/buttons/list-button} for more details.
 */
export const ListButton: React.FC<ListButtonProps> = ({
    resource: resourceNameFromProps,
    resourceNameOrRouteName,
    hideText = false,
    accessControl,
    svgIconProps,
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
        resourceNameFromProps ?? resourceNameOrRouteName,
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

    const disabledTitle = () => {
        if (data?.can) return "";
        else if (data?.reason) return data.reason;
        else
            return translate(
                "buttons.notAccessTitle",
                "You don't have permission to access",
            );
    };

    const listUrl = resource ? generateListUrl(resource, meta) : "";

    const { sx, ...restProps } = rest;

    if (accessControlEnabled && hideIfUnauthorized && !data?.can) {
        return null;
    }

    return (
        <ActiveLink
            to={listUrl}
            replace={false}
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                if (data?.can === false) {
                    e.preventDefault();
                    return;
                }
                if (onClick) {
                    e.preventDefault();
                    onClick(e);
                }
            }}
            style={{ textDecoration: "none" }}
        >
            <Button
                disabled={data?.can === false}
                startIcon={!hideText && <ListOutlined {...svgIconProps} />}
                title={disabledTitle()}
                sx={{ minWidth: 0, ...sx }}
                data-testid={RefineButtonTestIds.ListButton}
                className={RefineButtonClassNames.ListButton}
                {...restProps}
            >
                {hideText ? (
                    <ListOutlined fontSize="small" {...svgIconProps} />
                ) : (
                    children ??
                    translate(
                        `${
                            resource?.name ??
                            resourceNameFromProps ??
                            resourceNameOrRouteName
                        }.titles.list`,
                        userFriendlyResourceName(
                            resource?.meta?.label ??
                                resource?.label ??
                                resource?.name ??
                                pickNotDeprecated(
                                    resourceNameFromProps,
                                    resourceNameOrRouteName,
                                ),
                            "plural",
                        ),
                    )
                )}
            </Button>
        </ActiveLink>
    );
};
