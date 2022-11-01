import React from "react";
import {
    useCan,
    useNavigation,
    useTranslate,
    userFriendlyResourceName,
    useResource,
    useRouterContext,
} from "@pankod/refine-core";
import {
    RefineButtonTestIds,
    RefineListButtonProps,
} from "@pankod/refine-ui-types";
import { IconButton, Button, ButtonProps } from "@chakra-ui/react";
import { IconList, TablerIconProps } from "@tabler/icons";

export type ListButtonProps = RefineListButtonProps<
    ButtonProps,
    {
        svgIconProps?: TablerIconProps;
    }
>;

/**
 * `<ListButton>` is using uses Mantine {@link https://mantine.dev/core/button/ `<Button> `} component.
 * It uses the  {@link https://refine.dev/docs/core/hooks/navigation/useNavigation#list `list`} method from {@link https://refine.dev/docs/core/hooks/navigation/useNavigation `useNavigation`} under the hood.
 * It can be useful when redirecting the app to the list page route of resource}.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/mantine/components/buttons/list-button} for more details.
 **/
export const ListButton: React.FC<ListButtonProps> = ({
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

    const { listUrl: generateListUrl } = useNavigation();
    const { Link } = useRouterContext();

    const translate = useTranslate();

    const { data } = useCan({
        resource: resourceName,
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

    const listUrl = generateListUrl(resource.route!);

    if (accessControlEnabled && hideIfUnauthorized && !data?.can) {
        return null;
    }

    const btnProps = {
        to: listUrl,
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

    const icon = <IconList size={18} {...svgIconProps} />;

    const label =
        children ??
        translate(
            `${resourceName}.titles.list`,
            userFriendlyResourceName(resource.label ?? resourceName, "plural"),
        );

    return hideText ? (
        <IconButton
            as={Link}
            isDisabled={data?.can === false}
            aria-label={disabledTitle()}
            icon={icon}
            data-testid={RefineButtonTestIds.ListButton}
            {...btnProps}
            {...rest}
        />
    ) : (
        <Button
            as={Link}
            isDisabled={data?.can === false}
            leftIcon={icon}
            title={disabledTitle()}
            data-testid={RefineButtonTestIds.ListButton}
            {...rest}
            {...btnProps}
        >
            {label}
        </Button>
    );
};
