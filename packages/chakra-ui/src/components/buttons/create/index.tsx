import React from "react";
import {
    useNavigation,
    useTranslate,
    useCan,
    useResource,
    useRouterContext,
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
    children,
    onClick,
    ...rest
}) => {
    const accessControlEnabled = accessControl?.enabled;
    const hideIfUnauthorized = accessControl?.hideIfUnauthorized ?? false;
    const { resource, resourceName } = useResource({
        resourceNameOrRouteName,
    });

    const { Link } = useRouterContext();
    const { createUrl: generateCreateUrl } = useNavigation();

    const translate = useTranslate();

    const { data } = useCan({
        resource: resourceName,
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

    const createUrl = generateCreateUrl(resource.route!);

    if (accessControlEnabled && hideIfUnauthorized && !data?.can) {
        return null;
    }

    return (
        <Link
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
                    disabled={data?.can === false}
                    data-testid={RefineButtonTestIds.CreateButton}
                    {...rest}
                >
                    <IconSquarePlus size={20} {...svgIconProps} />
                </IconButton>
            ) : (
                <Button
                    variant="outline"
                    disabled={data?.can === false}
                    leftIcon={<IconSquarePlus size={20} />}
                    title={disabledTitle()}
                    data-testid={RefineButtonTestIds.CreateButton}
                    {...rest}
                >
                    {children ?? translate("buttons.create", "Create")}
                </Button>
            )}
        </Link>
    );
};
