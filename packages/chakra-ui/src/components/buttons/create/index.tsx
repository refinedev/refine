import React from "react";
import {
    useNavigation,
    useTranslate,
    useCan,
    useResource,
    useRouterContext,
    useRouterType,
    useLink,
} from "@refinedev/core";
import {
    RefineButtonClassNames,
    RefineButtonTestIds,
} from "@refinedev/ui-types";
import { Button, IconButton } from "@chakra-ui/react";
import { IconSquarePlus } from "@tabler/icons";

import { CreateButtonProps } from "../types";

export const CreateButton: React.FC<CreateButtonProps> = ({
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
    const translate = useTranslate();
    const routerType = useRouterType();
    const Link = useLink();
    const { Link: LegacyLink } = useRouterContext();

    const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

    const { createUrl: generateCreateUrl } = useNavigation();

    const { resource } = useResource(
        resourceNameFromProps ?? resourceNameOrRouteName,
    );

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

    const createUrl = resource ? generateCreateUrl(resource, meta) : "";

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
                    colorScheme="brand"
                    variant="outline"
                    aria-label={translate("buttons.create", "Create")}
                    title={disabledTitle()}
                    isDisabled={data?.can === false}
                    data-testid={RefineButtonTestIds.CreateButton}
                    className={RefineButtonClassNames.CreateButton}
                    {...rest}
                >
                    <IconSquarePlus size={20} {...svgIconProps} />
                </IconButton>
            ) : (
                <Button
                    colorScheme="brand"
                    isDisabled={data?.can === false}
                    leftIcon={<IconSquarePlus size={20} />}
                    title={disabledTitle()}
                    data-testid={RefineButtonTestIds.CreateButton}
                    className={RefineButtonClassNames.CreateButton}
                    {...rest}
                >
                    {children ?? translate("buttons.create", "Create")}
                </Button>
            )}
        </ActiveLink>
    );
};
