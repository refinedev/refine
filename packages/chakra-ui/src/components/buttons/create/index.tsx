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
import { Button, IconButton } from "@chakra-ui/react";
import { IconSquarePlus } from "@tabler/icons";

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

    if (accessControlEnabled && hideIfUnauthorized && !data?.can) {
        return null;
    }

    return (
        <ActiveLink
            to={createUrl}
            replace={false}
            onClick={(e: React.PointerEvent<HTMLButtonElement>) => {
                if (onClick) {
                    e.preventDefault();
                    onClick(e);
                }
            }}
        >
            {hideText ? (
                <IconButton
                    variant="outline"
                    aria-label={translate("buttons.create", "Create")}
                    title={disabledTitle()}
                    isDisabled={data?.can === false}
                    data-testid={RefineButtonTestIds.CreateButton}
                    {...rest}
                >
                    <IconSquarePlus size={20} {...svgIconProps} />
                </IconButton>
            ) : (
                <Button
                    variant="outline"
                    isDisabled={data?.can === false}
                    leftIcon={<IconSquarePlus size={20} />}
                    title={disabledTitle()}
                    data-testid={RefineButtonTestIds.CreateButton}
                    {...rest}
                >
                    {children ?? translate("buttons.create", "Create")}
                </Button>
            )}
        </ActiveLink>
    );
};
