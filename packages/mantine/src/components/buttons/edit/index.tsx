import React from "react";
import {
    useCan,
    useNavigation,
    useTranslate,
    useResource,
    useRouterContext,
} from "@pankod/refine-core";
import { RefineButtonTestIds } from "@pankod/refine-ui-types";
import { ActionIcon, Anchor, Button } from "@mantine/core";
import { IconPencil } from "@tabler/icons";

import { mapButtonVariantToActionIconVariant } from "@definitions/button";
import { EditButtonProps } from "../types";

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

    const { variant, styles, ...commonProps } = rest;

    if (accessControlEnabled && hideIfUnauthorized && !data?.can) {
        return null;
    }

    return (
        <Anchor
            component={Link}
            to={editUrl}
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
                    data-testid={RefineButtonTestIds.EditButton}
                    {...(variant
                        ? {
                              variant:
                                  mapButtonVariantToActionIconVariant(variant),
                          }
                        : { variant: "default" })}
                    {...commonProps}
                >
                    <IconPencil size={18} {...svgIconProps} />
                </ActionIcon>
            ) : (
                <Button
                    variant="default"
                    disabled={data?.can === false}
                    leftIcon={<IconPencil size={18} {...svgIconProps} />}
                    title={disabledTitle()}
                    data-testid={RefineButtonTestIds.EditButton}
                    {...rest}
                >
                    {children ?? translate("buttons.edit", "Edit")}
                </Button>
            )}
        </Anchor>
    );
};
