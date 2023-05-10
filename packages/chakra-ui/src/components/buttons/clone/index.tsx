import React from "react";
import {
    useCan,
    useNavigation,
    useTranslate,
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

import { CloneButtonProps } from "../types";

/**
 * `<CloneButton>` uses Mantine {@link https://chakra-ui.com/docs/components/button `<Button> component`}.
 * It uses the {@link https://refine.dev/docs/core/hooks/navigation/useNavigation#clone `clone`} method from {@link https://refine.dev/docs/core/hooks/navigation/useNavigation useNavigation} under the hood.
 * It can be useful when redirecting the app to the create page with the record id route of resource.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/chakra-ui/components/buttons/clone-button} for more details.
 *
 */
export const CloneButton: React.FC<CloneButtonProps> = ({
    resource: resourceNameFromProps,
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
    const { cloneUrl: generateCloneUrl } = useNavigation();
    const routerType = useRouterType();
    const Link = useLink();
    const { Link: LegacyLink } = useRouterContext();

    const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

    const { id, resource } = useResource(
        resourceNameFromProps ?? resourceNameOrRouteName,
    );

    const translate = useTranslate();

    const { data } = useCan({
        resource: resource?.name,
        action: "create",
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

    const cloneUrl =
        resource && (recordItemId || id)
            ? generateCloneUrl(resource, recordItemId! ?? id!, meta)
            : "";

    if (accessControlEnabled && hideIfUnauthorized && !data?.can) {
        return null;
    }

    return (
        <ActiveLink
            to={cloneUrl}
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
                    aria-label={translate("buttons.clone", "Clone")}
                    title={disabledTitle()}
                    data-testid={RefineButtonTestIds.CloneButton}
                    className={RefineButtonClassNames.CloneButton}
                    {...rest}
                >
                    <IconSquarePlus size={20} {...svgIconProps} />
                </IconButton>
            ) : (
                <Button
                    variant="outline"
                    isDisabled={data?.can === false}
                    leftIcon={<IconSquarePlus size={20} {...svgIconProps} />}
                    title={disabledTitle()}
                    data-testid={RefineButtonTestIds.CloneButton}
                    className={RefineButtonClassNames.CloneButton}
                    {...rest}
                >
                    {children ?? translate("buttons.clone", "Clone")}
                </Button>
            )}
        </ActiveLink>
    );
};
