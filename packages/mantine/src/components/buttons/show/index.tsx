import React from "react";
import {
    useCan,
    useNavigation,
    useTranslate,
    useResource,
    useRouterContext,
    useRouterType,
    useLink,
} from "@pankod/refine-core";
import { RefineButtonTestIds } from "@pankod/refine-ui-types";
import { ActionIcon, Anchor, Button } from "@mantine/core";
import { IconEye } from "@tabler/icons";

import { mapButtonVariantToActionIconVariant } from "@definitions/button";
import { ShowButtonProps } from "../types";

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
    svgIconProps,
    meta,
    children,
    onClick,
    ...rest
}) => {
    const accessControlEnabled = accessControl?.enabled ?? true;
    const hideIfUnauthorized = accessControl?.hideIfUnauthorized ?? false;
    const { showUrl: generateShowUrl } = useNavigation();
    const routerType = useRouterType();
    const Link = useLink();
    const { Link: LegacyLink } = useRouterContext();

    const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

    const translate = useTranslate();

    const { id, resource } = useResource(resourceNameOrRouteName);

    const { data } = useCan({
        resource: resource?.name,
        action: "show",
        params: { id: recordItemId ?? id, resource },
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

    const showUrl =
        (resource || resourceNameOrRouteName) && (recordItemId || id)
            ? generateShowUrl(
                  resource! ?? resourceNameOrRouteName!,
                  recordItemId! ?? id!,
                  meta,
              )
            : "";

    const { variant, styles, ...commonProps } = rest;

    if (accessControlEnabled && hideIfUnauthorized && !data?.can) {
        return null;
    }

    return (
        <Anchor
            component={ActiveLink as any}
            to={showUrl}
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
                    {...(variant
                        ? {
                              variant:
                                  mapButtonVariantToActionIconVariant(variant),
                          }
                        : { variant: "default" })}
                    disabled={data?.can === false}
                    title={disabledTitle()}
                    data-testid={RefineButtonTestIds.ShowButton}
                    {...commonProps}
                >
                    <IconEye size={18} {...svgIconProps} />
                </ActionIcon>
            ) : (
                <Button
                    variant="default"
                    disabled={data?.can === false}
                    leftIcon={<IconEye size={18} {...svgIconProps} />}
                    title={disabledTitle()}
                    data-testid={RefineButtonTestIds.ShowButton}
                    {...rest}
                >
                    {children ?? translate("buttons.show", "Show")}
                </Button>
            )}
        </Anchor>
    );
};
