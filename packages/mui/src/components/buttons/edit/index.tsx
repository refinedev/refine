import React from "react";
import {
    useCan,
    useNavigation,
    useTranslate,
    useResource,
    useRouterContext,
    useRouterType,
    useLink,
} from "@refinedev/core";
import {
    RefineButtonClassNames,
    RefineButtonTestIds,
} from "@refinedev/ui-types";
import { Button } from "@mui/material";
import { EditOutlined } from "@mui/icons-material";

import { EditButtonProps } from "../types";

/**
 * `<EditButton>` uses uses Material UI {@link https://mui.com/components/buttons/ `<Button>`} component.
 * It uses the {@link https://refine.dev/docs/core/hooks/navigation/useNavigation#edit `edit`} method from {@link https://refine.dev/docs/core/hooks/navigation/useNavigation `useNavigation`} under the hood.
 * It can be useful when redirecting the app to the edit page with the record id route of resource}.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/mui/components/buttons/edit-button} for more details.
 */
export const EditButton: React.FC<EditButtonProps> = ({
    resource: resourceNameFromProps,
    resourceNameOrRouteName,
    recordItemId,
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
    const translate = useTranslate();

    const routerType = useRouterType();
    const Link = useLink();
    const { Link: LegacyLink } = useRouterContext();

    const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

    const { editUrl: generateEditUrl } = useNavigation();

    const { id, resource } = useResource(
        resourceNameFromProps ?? resourceNameOrRouteName,
    );

    const { data } = useCan({
        resource: resource?.name,
        action: "edit",
        params: { id: recordItemId ?? id, resource },
        queryOptions: {
            enabled: accessControlEnabled,
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

    const editUrl =
        resource && (recordItemId ?? id)
            ? generateEditUrl(resource, recordItemId! ?? id!, meta)
            : "";

    const { sx, ...restProps } = rest;

    if (accessControlEnabled && hideIfUnauthorized && !data?.can) {
        return null;
    }

    return (
        <ActiveLink
            to={editUrl}
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
                startIcon={
                    !hideText && (
                        <EditOutlined
                            sx={{ selfAlign: "center" }}
                            {...svgIconProps}
                        />
                    )
                }
                title={disabledTitle()}
                sx={{ minWidth: 0, ...sx }}
                data-testid={RefineButtonTestIds.EditButton}
                className={RefineButtonClassNames.EditButton}
                {...restProps}
            >
                {hideText ? (
                    <EditOutlined fontSize="small" {...svgIconProps} />
                ) : (
                    children ?? translate("buttons.edit", "Edit")
                )}
            </Button>
        </ActiveLink>
    );
};
