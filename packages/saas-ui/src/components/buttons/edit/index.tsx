import React from "react";
import {
    useCan,
    useNavigation,
    useTranslate,
    useResource,
    useRouterContext,
} from "@pankod/refine-core";
import {
    RefineEditButtonProps,
    RefineButtonTestIds,
} from "@pankod/refine-ui-types";
import { IconButton, Button, ButtonProps } from "@chakra-ui/react";
import { IconPencil, TablerIconProps } from "@tabler/icons";

export type EditButtonProps = RefineEditButtonProps<
    ButtonProps,
    {
        svgIconProps?: TablerIconProps;
    }
>;

/**
 * `<EditButton>` uses Mantine {@link https://mantine.dev/core/button/ `<Button> component`}.
 * It uses the {@link https://refine.dev/docs/core/hooks/navigation/useNavigation#edit `edit`} method from {@link https://refine.dev/docs/core/hooks/navigation/useNavigation `useNavigation`} under the hood.
 * It can be useful when redirecting the app to the edit page with the record id route of resource}.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/mantine/components/buttons/edit-button} for more details.
 */
export const EditButton: React.FC<EditButtonProps> = ({
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

    const translate = useTranslate();

    const { editUrl: generateEditUrl } = useNavigation();
    const { Link } = useRouterContext();

    const { data } = useCan({
        resource: resourceName,
        action: "edit",
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

    const editUrl = generateEditUrl(resource.route!, id!);

    if (accessControlEnabled && hideIfUnauthorized && !data?.can) {
        return null;
    }

    const btnProps = {
        to: editUrl,
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

    const icon = <IconPencil size={18} {...svgIconProps} />;

    const label = children ?? translate("buttons.edit", "Edit");

    return hideText ? (
        <IconButton
            as={Link}
            isDisabled={data?.can === false}
            aria-label={disabledTitle()}
            icon={icon}
            data-testid={RefineButtonTestIds.EditButton}
            {...btnProps}
            {...rest}
        />
    ) : (
        <Button
            as={Link}
            isDisabled={data?.can === false}
            leftIcon={icon}
            title={disabledTitle()}
            data-testid={RefineButtonTestIds.EditButton}
            {...rest}
            {...btnProps}
        >
            {label}
        </Button>
    );
};
