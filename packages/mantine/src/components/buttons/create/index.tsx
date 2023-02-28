import React from "react";
import {
    useNavigation,
    useTranslate,
    useCan,
    useResource,
    useRouterContext,
    useRouterType,
    useLink,
} from "@pankod/refine-core";
import { RefineButtonTestIds } from "@pankod/refine-ui-types";
import { ActionIcon, Anchor, Button } from "@mantine/core";
import { IconSquarePlus } from "@tabler/icons";

import { mapButtonVariantToActionIconVariant } from "@definitions/button";
import { CreateButtonProps } from "../types";

export const CreateButton: React.FC<CreateButtonProps> = ({
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
    const translate = useTranslate();
    const routerType = useRouterType();
    const Link = useLink();
    const { Link: LegacyLink } = useRouterContext();

    const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

    const { createUrl: generateCreateUrl } = useNavigation();

    const { resource } = useResource(resourceNameOrRouteName);

    const { data } = useCan({
        resource: resource?.name,
        action: "create",
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

    const createUrl =
        resource || resourceNameOrRouteName
            ? generateCreateUrl(resource! || resourceNameOrRouteName!, meta)
            : "";

    const { variant, styles, ...commonProps } = rest;

    if (accessControlEnabled && hideIfUnauthorized && !data?.can) {
        return null;
    }

    return (
        <Anchor
            component={ActiveLink as any}
            to={createUrl}
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
            {hideText ? (
                <ActionIcon
                    title={disabledTitle()}
                    disabled={data?.can === false}
                    {...(variant
                        ? {
                              variant:
                                  mapButtonVariantToActionIconVariant(variant),
                          }
                        : { variant: "default" })}
                    data-testid={RefineButtonTestIds.CreateButton}
                    {...commonProps}
                >
                    <IconSquarePlus size={18} {...svgIconProps} />
                </ActionIcon>
            ) : (
                <Button
                    disabled={data?.can === false}
                    leftIcon={<IconSquarePlus size={18} {...svgIconProps} />}
                    title={disabledTitle()}
                    data-testid={RefineButtonTestIds.CreateButton}
                    variant="default"
                    {...rest}
                >
                    {children ?? translate("buttons.create", "Create")}
                </Button>
            )}
        </Anchor>
    );
};
