import React from "react";
import {
    useCan,
    useNavigation,
    useTranslate,
    useResource,
    useRouterContext,
} from "@pankod/refine-core";
import {
    RefineButtonTestIds,
    RefineShowButtonProps,
} from "@pankod/refine-ui-types";
import { IconButton, Button, ButtonProps } from "@chakra-ui/react";
import { IconEye, TablerIconProps } from "@tabler/icons";

export type ShowButtonProps = RefineShowButtonProps<
    ButtonProps,
    {
        svgIconProps?: TablerIconProps;
    }
>;

/**
 * `<ShowButton>` uses Mantine {@link https://mantine.dev/core/button/ `<Button> `} component.
 * It uses the {@link https://refine.dev/docs/core/hooks/navigation/useNavigation#show `show`} method from {@link https://refine.dev/docs/core/hooks/navigation/useNavigation `useNavigation`} under the hood.
 * It can be useful when red sirecting the app to the show page with the record id route of resource.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/mantine/components/buttons/show-button} for more details.
 */
export const ShowButton: React.FC<ShowButtonProps> = ({
    resourceNameOrRouteName,
    recordItemId,
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
    const { resourceName, id, resource } = useResource({
        resourceNameOrRouteName,
        recordItemId,
    });

    const { showUrl: generateShowUrl } = useNavigation();
    const { Link } = useRouterContext();

    const translate = useTranslate();

    const { data } = useCan({
        resource: resourceName,
        action: "show",
        params: { id, resource },
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

    const showUrl = generateShowUrl(resource.route!, id!);

    if (accessControlEnabled && hideIfUnauthorized && !data?.can) {
        return null;
    }

    const btnProps = {
        to: showUrl,
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

    const icon = <IconEye size={18} {...svgIconProps} />;

    const label = children ?? translate("buttons.show", "Show");

    return hideText ? (
        <IconButton
            as={Link}
            isDisabled={data?.can === false}
            aria-label={disabledTitle()}
            icon={icon}
            data-testid={RefineButtonTestIds.ShowButton}
            {...btnProps}
            {...rest}
        />
    ) : (
        <Button
            as={Link}
            isDisabled={data?.can === false}
            leftIcon={icon}
            title={disabledTitle()}
            data-testid={RefineButtonTestIds.ShowButton}
            {...rest}
            {...btnProps}
        >
            {label}
        </Button>
    );
};
