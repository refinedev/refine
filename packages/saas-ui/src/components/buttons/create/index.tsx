import React from "react";
import {
    useNavigation,
    useTranslate,
    useCan,
    useResource,
    useRouterContext,
} from "@pankod/refine-core";
import {
    RefineCreateButtonProps,
    RefineButtonTestIds,
} from "@pankod/refine-ui-types";
import { IconButton, Button, ButtonProps } from "@chakra-ui/react";
import { IconSquarePlus, TablerIconProps } from "@tabler/icons";

export type CreateButtonProps = RefineCreateButtonProps<
    ButtonProps,
    {
        svgIconProps?: TablerIconProps;
    }
>;

export const CreateButton: React.FC<CreateButtonProps> = ({
    resourceNameOrRouteName,
    hideText = false,
    accessControl,
    ignoreAccessControlProvider = false,
    svgIconProps,
    children,
    onClick,
    ...rest
}) => {
    const accessControlEnabled =
        accessControl?.enabled ?? !ignoreAccessControlProvider;
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

    const btnProps = {
        to: createUrl,
        replace: false,
        onClick: (e: React.PointerEvent<HTMLButtonElement>) => {
            if (data?.can === false) {
                e.preventDefault();
                return;
            }
            if (onClick) {
                e.preventDefault();
                onClick(e);
            }
        },
    };

    const icon = <IconSquarePlus size={18} {...svgIconProps} />;

    const label = children ?? translate("buttons.create", "Create");

    return hideText ? (
        <IconButton
            as={Link}
            isDisabled={data?.can === false}
            aria-label={disabledTitle()}
            icon={icon}
            data-testid={RefineButtonTestIds.CreateButton}
            {...btnProps}
            {...rest}
        />
    ) : (
        <Button
            as={Link}
            isDisabled={data?.can === false}
            leftIcon={icon}
            title={disabledTitle()}
            data-testid={RefineButtonTestIds.CreateButton}
            {...rest}
            {...btnProps}
        >
            {label}
        </Button>
    );
};
