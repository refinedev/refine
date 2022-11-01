import React from "react";
import {
    useCan,
    useNavigation,
    useTranslate,
    useResource,
    useRouterContext,
} from "@pankod/refine-core";
import {
    RefineCloneButtonProps,
    RefineButtonTestIds,
} from "@pankod/refine-ui-types";
import { Button, ButtonProps, IconButton } from "@chakra-ui/react";
import { IconSquarePlus, TablerIconProps } from "@tabler/icons";

export type CloneButtonProps = RefineCloneButtonProps<
    ButtonProps,
    {
        svgIconProps?: TablerIconProps;
    }
>;

/**
 * `<CloneButton>` uses Mantine {@link https://mantine.dev/core/button/ `<Button> component`}.
 * It uses the {@link https://refine.dev/docs/core/hooks/navigation/useNavigation#clone `clone`} method from {@link https://refine.dev/docs/core/hooks/navigation/useNavigation useNavigation} under the hood.
 * It can be useful when redirecting the app to the create page with the record id route of resource.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/mantine/components/buttons/clone-button} for more details.
 *
 */
export const CloneButton: React.FC<CloneButtonProps> = ({
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
    const { resourceName, resource, id } = useResource({
        resourceNameOrRouteName,
        recordItemId,
    });

    const { cloneUrl: generateCloneUrl } = useNavigation();
    const { Link } = useRouterContext();

    const translate = useTranslate();

    const { data } = useCan({
        resource: resourceName,
        action: "create",
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

    const cloneUrl = generateCloneUrl(resource.route!, id!);

    if (accessControlEnabled && hideIfUnauthorized && !data?.can) {
        return null;
    }

    const btnProps = {
        to: cloneUrl,
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

    const label = children ?? translate("buttons.clone", "Clone");

    return hideText ? (
        <IconButton
            as={Link}
            isDisabled={data?.can === false}
            aria-label={disabledTitle()}
            icon={icon}
            data-testid={RefineButtonTestIds.CloneButton}
            {...btnProps}
            {...rest}
        />
    ) : (
        <Button
            as={Link}
            isDisabled={data?.can === false}
            leftIcon={icon}
            title={disabledTitle()}
            data-testid={RefineButtonTestIds.CloneButton}
            {...rest}
            {...btnProps}
        >
            {label}
        </Button>
    );
};
