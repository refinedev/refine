import React from "react";
import {
    useCan,
    useNavigation,
    useTranslate,
    useResource,
    useRouterContext,
} from "@pankod/refine-core";
import { RefineButtonTestIds } from "@pankod/refine-ui-types";
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
    resourceNameOrRouteName,
    recordItemId,
    hideText = false,
    accessControl,
    svgIconProps,
    children,
    onClick,
    ...rest
}) => {
    const accessControlEnabled = accessControl?.enabled;
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

    return (
        <Link
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
                    {...rest}
                >
                    <IconSquarePlus size={20} {...svgIconProps} />
                </IconButton>
            ) : (
                <Button
                    variant="outline"
                    disabled={data?.can === false}
                    leftIcon={<IconSquarePlus size={20} {...svgIconProps} />}
                    title={disabledTitle()}
                    data-testid={RefineButtonTestIds.CloneButton}
                    {...rest}
                >
                    {children ?? translate("buttons.clone", "Clone")}
                </Button>
            )}
        </Link>
    );
};
